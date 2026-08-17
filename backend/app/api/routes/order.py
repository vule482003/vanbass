import random
import string
from datetime import datetime, timezone
from decimal import Decimal
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user, get_db, require_admin
from app.models.order import Order, OrderStatus, PaymentStatus
from app.models.order_item import OrderItem
from app.models.product import Product
from app.models.user import User
from app.schemas.order import OrderCreateRequest, OrderListResponse, OrderResponse

router = APIRouter(prefix="/orders", tags=["Orders"])


def generate_order_number() -> str:
    now_str = datetime.now(timezone.utc).strftime("%Y%m%d")
    rand_chars = "".join(random.choices(string.digits, k=4))
    return f"VB-{now_str}-{rand_chars}"


@router.post("", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
def create_order(
    payload: OrderCreateRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Order:
    subtotal = Decimal(0)
    order_items: list[OrderItem] = []

    for item_in in payload.items:
        product = db.get(Product, item_in.product_id)
        if not product or not product.is_active:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Sản phẩm {item_in.product_id} không tồn tại hoặc đã ngừng kinh doanh",
            )
        if product.stock_quantity < item_in.quantity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Sản phẩm {product.name} chỉ còn {product.stock_quantity} cái trong kho",
            )

        unit_price = product.sale_price if product.sale_price is not None else Decimal(0)
        line_total = unit_price * item_in.quantity
        subtotal += line_total

        # Deduct stock
        product.stock_quantity -= item_in.quantity

        order_item = OrderItem(
            product_id=product.id,
            product_name=product.name,
            product_sku=product.sku,
            unit_price=unit_price,
            quantity=item_in.quantity,
            line_total=line_total,
        )
        order_items.append(order_item)

    shipping_fee = Decimal(0)
    total_amount = subtotal + shipping_fee

    order = Order(
        user_id=current_user.id,
        order_number=generate_order_number(),
        status=OrderStatus.PENDING,
        payment_status=PaymentStatus.UNPAID,
        subtotal=subtotal,
        shipping_fee=shipping_fee,
        total_amount=total_amount,
        shipping_name=payload.shipping_name,
        shipping_phone=payload.shipping_phone,
        shipping_address=payload.shipping_address,
        customer_note=payload.customer_note,
        items=order_items,
    )

    db.add(order)
    db.commit()
    db.refresh(order)
    return order


@router.get("/me", response_model=OrderListResponse)
def get_my_orders(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    orders = (
        db.query(Order)
        .filter(Order.user_id == current_user.id)
        .order_date(Order.created_at.desc()) if hasattr(db.query(Order), "order_date") else db.query(Order).filter(Order.user_id == current_user.id).order_by(Order.created_at.desc()).all()
    )
    return {"items": orders, "total": len(orders)}


@router.get("/{order_id}", response_model=OrderResponse)
def get_order_by_id(
    order_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Order:
    order = db.get(Order, order_id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Không tìm thấy đơn hàng",
        )
    if order.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Bạn không có quyền xem đơn hàng này",
        )
    return order


@router.get("", response_model=OrderListResponse)
def list_all_orders_admin(
    _: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> dict:
    orders = db.query(Order).order_by(Order.created_at.desc()).all()
    return {"items": orders, "total": len(orders)}
