import uuid
from decimal import Decimal
from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.helpers import append_timestamped_note, generate_reference_code
from app.models.order import Order, OrderStatus, PaymentStatus
from app.models.order_item import OrderItem
from app.models.product import Product
from app.schemas.order import OrderCreateRequest

# Business Constants (VanBass provides 100% Free Shipping nationwide)
FREE_SHIPPING_THRESHOLD = Decimal("0.00")
STANDARD_SHIPPING_FEE = Decimal("0.00")

# Order State Machine Transition Matrix
VALID_ORDER_TRANSITIONS: dict[OrderStatus, set[OrderStatus]] = {
    OrderStatus.PENDING: {OrderStatus.CONFIRMED, OrderStatus.CANCELLED},
    OrderStatus.CONFIRMED: {OrderStatus.PROCESSING, OrderStatus.CANCELLED},
    OrderStatus.PROCESSING: {OrderStatus.SHIPPED, OrderStatus.CANCELLED},
    OrderStatus.SHIPPED: {OrderStatus.COMPLETED, OrderStatus.CANCELLED},
    OrderStatus.COMPLETED: set(),  # Terminal state
    OrderStatus.CANCELLED: set(),  # Terminal state
}


class OrderService:
    @staticmethod
    def calculate_shipping_fee(subtotal: Decimal) -> Decimal:
        return Decimal("0.00")

    @classmethod
    def create_order(
        cls, payload: OrderCreateRequest, user_id: UUID, db: Session
    ) -> Order:
        """
        Create order with atomic inventory reservation using SELECT FOR UPDATE.
        Eliminates race conditions and prevents overselling.
        """
        if not payload.items:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Đơn hàng phải chứa ít nhất 1 sản phẩm",
            )

        # 1. Aggregate quantities per product
        item_qty_map: dict[UUID, int] = {}
        for item in payload.items:
            item_qty_map[item.product_id] = (
                item_qty_map.get(item.product_id, 0) + item.quantity
            )

        sorted_product_ids = sorted(item_qty_map.keys())

        # 2. Lock product rows in DB (ordered by ID to avoid deadlocks)
        stmt = (
            select(Product).where(Product.id.in_(sorted_product_ids)).with_for_update()
        )
        products = db.execute(stmt).scalars().all()
        product_map = {p.id: p for p in products}

        # 3. Validate products & inventory
        for pid, requested_qty in item_qty_map.items():
            product = product_map.get(pid)
            if not product or not product.is_active:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Sản phẩm (ID: {pid}) không tồn tại hoặc đã ngừng kinh doanh",
                )
            if not product.sale_enabled:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Sản phẩm '{product.name}' hiện không mở bán",
                )
            if product.stock_quantity < requested_qty:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=(
                        f"Sản phẩm '{product.name}' chỉ còn {product.stock_quantity} trong kho, "
                        f"không đủ số lượng yêu cầu ({requested_qty})"
                    ),
                )

        # 4. Deduct stock and build line items
        subtotal = Decimal("0.00")
        order_items: list[OrderItem] = []

        for pid, requested_qty in item_qty_map.items():
            product = product_map[pid]
            unit_price = (
                product.sale_price
                if product.sale_price is not None
                else Decimal("0.00")
            )
            line_total = unit_price * requested_qty
            subtotal += line_total

            # Deduct stock atomically
            product.stock_quantity -= requested_qty

            order_items.append(
                OrderItem(
                    id=uuid.uuid4(),
                    product_id=product.id,
                    product_name=product.name,
                    sku=product.sku,
                    unit_price=unit_price,
                    quantity=requested_qty,
                    subtotal=line_total,
                )
            )

        shipping_fee = cls.calculate_shipping_fee(subtotal)
        total_amount = subtotal + shipping_fee
        order_number = generate_reference_code("VB")
        note = (payload.customer_note or payload.note or "").strip()

        # Determine initial payment status (default to UNPAID for new orders until paid via gateway)
        initial_payment_status = PaymentStatus.UNPAID
        if payload.payment_status == PaymentStatus.PAID:
            initial_payment_status = PaymentStatus.PAID

        order = Order(
            id=uuid.uuid4(),
            user_id=user_id,
            order_number=order_number,
            status=OrderStatus.PENDING,
            payment_status=initial_payment_status,
            subtotal=subtotal,
            shipping_fee=shipping_fee,
            total_amount=total_amount,
            currency="VND",
            shipping_name=payload.shipping_name.strip(),
            shipping_phone=payload.shipping_phone.strip(),
            shipping_address=payload.shipping_address.strip(),
            customer_note=note if note else None,
            items=order_items,
        )

        db.add(order)
        db.commit()
        db.refresh(order)

        return order

    @classmethod
    def update_order_status(
        cls,
        order_id: UUID,
        db: Session,
        new_status: OrderStatus | None = None,
        new_payment_status: PaymentStatus | None = None,
        admin_note: str | None = None,
    ) -> Order:
        """
        Advance order status and/or payment status with state machine validation and auto-restock.
        """
        order = db.get(Order, order_id)
        if not order:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Không tìm thấy đơn hàng",
            )

        if new_status is not None and new_status != order.status:
            allowed_next = VALID_ORDER_TRANSITIONS.get(order.status, set())
            if new_status not in allowed_next:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=(
                        f"Không thể chuyển trạng thái đơn hàng từ '{order.status.value}' "
                        f"sang '{new_status.value}'. Quy trình hợp lệ: "
                        f"{', '.join([s.value for s in allowed_next]) or 'Không thể thay đổi (trạng thái cuối)'}"
                    ),
                )

            # Auto-restock on cancellation
            if new_status == OrderStatus.CANCELLED:
                cls._restock_order_items(order, db)

            if (
                new_status == OrderStatus.COMPLETED
                and order.payment_status == PaymentStatus.UNPAID
            ):
                order.payment_status = PaymentStatus.PAID

            order.status = new_status

        if new_payment_status is not None:
            order.payment_status = new_payment_status

        if admin_note:
            order.customer_note = append_timestamped_note(
                order.customer_note, admin_note
            )

        db.commit()
        db.refresh(order)
        return order

    @classmethod
    def cancel_order(
        cls,
        order_id: UUID,
        current_user_id: UUID | None,
        is_admin: bool,
        reason: str | None,
        db: Session,
    ) -> Order:
        """
        Cancel an order and return inventory.
        """
        order = db.get(Order, order_id)
        if not order:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Không tìm thấy đơn hàng",
            )

        if not is_admin:
            if order.user_id != current_user_id:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Bạn không có quyền hủy đơn hàng này",
                )
            if order.status not in {OrderStatus.PENDING, OrderStatus.CONFIRMED}:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Đơn hàng đang ở trạng thái '{order.status.value}', không thể tự hủy.",
                )

        actor = "Admin" if is_admin else "Khách hàng"
        cancel_note = f"Hủy bởi {actor}" + (
            f": {reason.strip()}" if reason and reason.strip() else ""
        )

        # 1. Restock items back to inventory safely
        cls._restock_order_items(order, db)

        # 2. Hard delete order so it is cleanly removed from order list
        db.delete(order)
        db.commit()
        return order

    @classmethod
    def _restock_order_items(cls, order: Order, db: Session) -> None:
        """
        Restock items from a cancelled order safely.
        """
        product_ids = sorted([item.product_id for item in order.items])
        if not product_ids:
            return

        stmt = select(Product).where(Product.id.in_(product_ids)).with_for_update()
        products = db.execute(stmt).scalars().all()
        product_map = {p.id: p for p in products}

        for item in order.items:
            product = product_map.get(item.product_id)
            if product:
                product.stock_quantity += item.quantity
