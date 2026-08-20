<<<<<<< HEAD
import uuid
from decimal import Decimal
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.api.dependencies import get_current_user, get_db, require_admin
from app.models.cart import Cart
from app.models.cart_item import CartItem
from app.models.order import Order, OrderStatus
from app.models.order_item import OrderItem
from app.models.product import Product
from app.models.user import User
from app.schemas.order import (
    OrderCreate,
    OrderResponse,
    OrderStatusUpdate,
)


router = APIRouter(
    prefix="/orders",
    tags=["Order"],
)


def generate_order_number() -> str:
    return f"VB-{uuid.uuid4().hex[:12].upper()}"
=======
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.dependencies import get_db, get_optional_current_user, require_admin
from app.core.rate_limit import rate_limit_order
from app.models.order import Order, OrderStatus
from app.models.user import User, UserRole
from app.schemas.order import (
    OrderCancelRequest,
    OrderCreateRequest,
    OrderListResponse,
    OrderResponse,
    OrderStatusUpdate,
)
from app.services.order_service import OrderService
from app.services.user_service import UserService

router = APIRouter(prefix="/orders", tags=["Orders"])
>>>>>>> 201b4c121c9fbc2f3e1a969c00b0a2a178f68102


@router.post(
    "",
    response_model=OrderResponse,
    status_code=status.HTTP_201_CREATED,
<<<<<<< HEAD
)
def create_order(
    data: OrderCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Order:
    cart = db.execute(
        select(Cart)
        .options(
            selectinload(Cart.items).selectinload(CartItem.product)
        )
        .where(Cart.user_id == current_user.id)
    ).scalar_one_or_none()

    if cart is None or not cart.items:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cart is empty",
        )

    subtotal = Decimal("0")
    order_items: list[OrderItem] = []

    for cart_item in cart.items:
        product = cart_item.product

        if product is None or not product.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Product {cart_item.product_id} is unavailable",
            )

        if not product.sale_enabled:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Product '{product.name}' is not available for sale",
            )

        if product.sale_price is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Product '{product.name}' has no sale price",
            )

        if product.stock_quantity < cart_item.quantity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Insufficient stock for '{product.name}'",
            )

        item_subtotal = product.sale_price * cart_item.quantity
        subtotal += item_subtotal

        order_items.append(
            OrderItem(
                product_id=product.id,
                product_name=product.name,
                sku=product.sku,
                quantity=cart_item.quantity,
                unit_price=product.sale_price,
                subtotal=item_subtotal,
            )
        )

    total_amount = subtotal + data.shipping_fee

    order = Order(
        user_id=current_user.id,
        order_number=generate_order_number(),
        status=OrderStatus.PENDING,
        subtotal=subtotal,
        shipping_fee=data.shipping_fee,
        total_amount=total_amount,
        currency="VND",
        shipping_name=data.shipping_name,
        shipping_phone=data.shipping_phone,
        shipping_address=data.shipping_address,
        customer_note=data.customer_note,
    )

    for order_item in order_items:
        order.items.append(order_item)

    for cart_item in cart.items:
        cart_item.product.stock_quantity -= cart_item.quantity

    db.add(order)

    for cart_item in list(cart.items):
        db.delete(cart_item)

    db.commit()

    db.refresh(order)

    return order


@router.get(
    "",
    response_model=list[OrderResponse],
)
def list_my_orders(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[Order]:
    result = db.execute(
        select(Order)
        .options(selectinload(Order.items))
        .where(Order.user_id == current_user.id)
        .order_by(Order.created_at.desc())
    )

    return list(result.scalars().all())


@router.get(
    "/admin",
    response_model=list[OrderResponse],
)
def list_all_orders(
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> list[Order]:
    result = db.execute(
        select(Order)
        .options(selectinload(Order.items))
        .order_by(Order.created_at.desc())
    )

    return list(result.scalars().all())


@router.get(
    "/{order_id}",
    response_model=OrderResponse,
)
def get_order(
    order_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Order:
    order = db.execute(
        select(Order)
        .options(selectinload(Order.items))
        .where(
            Order.id == order_id,
            Order.user_id == current_user.id,
        )
    ).scalar_one_or_none()

    if order is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found",
=======
    dependencies=[Depends(rate_limit_order)],
)
def create_order(
    payload: OrderCreateRequest,
    current_user: User | None = Depends(get_optional_current_user),
    db: Session = Depends(get_db),
) -> Order:
    """
    Create a new order with atomic stock deduction and race condition protection.
    """
    user_id = UserService.resolve_user_id(
        db=db,
        current_user=current_user,
        phone=payload.shipping_phone,
    )
    return OrderService.create_order(payload=payload, user_id=user_id, db=db)


@router.get("", response_model=OrderListResponse)
def list_orders(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    status_filter: OrderStatus | None = Query(None, alias="status"),
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> OrderListResponse:
    """
    Admin: List all orders with pagination and optional status filter.
    """
    query = select(Order)
    if status_filter:
        query = query.where(Order.status == status_filter)

    orders = db.execute(query.order_by(Order.created_at.desc()).offset(skip).limit(limit)).scalars().all()
    return OrderListResponse(items=list(orders), total=len(orders))


@router.get("/me", response_model=OrderListResponse)
def list_my_orders(
    current_user: User = Depends(get_optional_current_user),
    db: Session = Depends(get_db),
) -> OrderListResponse:
    """
    Customer: List current user's order history.
    """
    if not current_user:
        return OrderListResponse(items=[], total=0)

    query = select(Order).where(Order.user_id == current_user.id).order_by(Order.created_at.desc())
    orders = db.execute(query).scalars().all()
    return OrderListResponse(items=list(orders), total=len(orders))


@router.get("/{order_id}", response_model=OrderResponse)
def get_order(
    order_id: UUID,
    current_user: User | None = Depends(get_optional_current_user),
    db: Session = Depends(get_db),
) -> Order:
    """
    Get detailed order information by ID.
    """
    order = db.get(Order, order_id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Không tìm thấy đơn hàng",
        )

    if current_user and current_user.role != UserRole.ADMIN and order.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Bạn không có quyền xem đơn hàng này",
>>>>>>> 201b4c121c9fbc2f3e1a969c00b0a2a178f68102
        )

    return order


<<<<<<< HEAD
@router.put(
    "/{order_id}/cancel",
    response_model=OrderResponse,
)
def cancel_order(
    order_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Order:
    order = db.execute(
        select(Order)
        .options(selectinload(Order.items))
        .where(
            Order.id == order_id,
            Order.user_id == current_user.id,
        )
    ).scalar_one_or_none()

    if order is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found",
        )

    if order.status not in {
        OrderStatus.PENDING,
        OrderStatus.CONFIRMED,
    }:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Order cannot be cancelled in its current status",
        )

    products = {}

    for item in order.items:
        product = db.get(Product, item.product_id)

        if product is not None:
            product.stock_quantity += item.quantity
            products[item.product_id] = product

    order.status = OrderStatus.CANCELLED

    db.commit()
    db.refresh(order)

    return order


@router.put(
    "/{order_id}/status",
    response_model=OrderResponse,
)
def update_order_status(
    order_id: UUID,
    data: OrderStatusUpdate,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> Order:
    order = db.execute(
        select(Order)
        .options(selectinload(Order.items))
        .where(Order.id == order_id)
    ).scalar_one_or_none()

    if order is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found",
        )

    try:
        new_status = OrderStatus(data.status)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid order status",
        )

    order.status = new_status

    db.commit()
    db.refresh(order)

    return order
=======
@router.patch("/{order_id}/status", response_model=OrderResponse)
def update_order_status(
    order_id: UUID,
    payload: OrderStatusUpdate,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> Order:
    """
    Admin: Advance or transition order status and/or payment status.
    """
    return OrderService.update_order_status(
        order_id=order_id,
        db=db,
        new_status=payload.status,
        new_payment_status=payload.payment_status,
        admin_note=payload.note,
    )


@router.post(
    "/{order_id}/cancel",
    response_model=OrderResponse,
    dependencies=[Depends(rate_limit_order)],
)
def cancel_order(
    order_id: UUID,
    payload: OrderCancelRequest | None = None,
    current_user: User = Depends(get_optional_current_user),
    db: Session = Depends(get_db),
) -> Order:
    """
    Cancel an order and trigger immediate inventory restock.
    """
    is_admin = current_user.role == UserRole.ADMIN if current_user else False
    current_user_id = current_user.id if current_user else None
    reason = payload.reason if payload else None

    return OrderService.cancel_order(
        order_id=order_id,
        current_user_id=current_user_id,
        is_admin=is_admin,
        reason=reason,
        db=db,
    )
>>>>>>> 201b4c121c9fbc2f3e1a969c00b0a2a178f68102
