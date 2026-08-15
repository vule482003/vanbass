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


@router.post(
    "",
    response_model=OrderResponse,
    status_code=status.HTTP_201_CREATED,
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
        )

    return order


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