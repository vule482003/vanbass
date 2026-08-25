from decimal import Decimal
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.dependencies import get_db, get_optional_current_user, require_admin
from app.core.rate_limit import rate_limit_order
from app.models.order import Order, OrderStatus, PaymentStatus
from app.models.user import User, UserRole
from app.schemas.order import (
    OrderCancelRequest,
    OrderCreateRequest,
    OrderListResponse,
    OrderResponse,
    OrderStatusUpdate,
)
from app.services.email_service import EmailService
from app.services.order_service import OrderService
from app.services.user_service import UserService


class OrderPayRequest(BaseModel):
    payment_method: str | None = "vietqr"
    transaction_ref: str | None = None


class BankWebhookPayload(BaseModel):
    id: int | str | None = None
    content: str | None = None
    description: str | None = None
    order_number: str | None = None
    code: str | None = None
    amount: Decimal | None = None
    transferAmount: Decimal | None = None
    transferType: str | None = "in"
    accountNumber: str | None = None
    gateway: str | None = "MBBank"


router = APIRouter(prefix="/orders", tags=["Orders"])


@router.post(
    "",
    response_model=OrderResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(rate_limit_order)],
)
def create_order(
    payload: OrderCreateRequest,
    current_user: User | None = Depends(get_optional_current_user),
    db: Session = Depends(get_db),
) -> Order:
    user_id = UserService.resolve_user_id(
        db=db,
        current_user=current_user,
        phone=payload.shipping_phone,
    )
    order = OrderService.create_order(payload=payload, user_id=user_id, db=db)

    # Determine customer email from payload or user record
    customer_email = (
        payload.customer_email
        or payload.shipping_email
        or (current_user.email if current_user else None)
    )
    if not customer_email and user_id:
        user_record = db.get(User, user_id)
        if (
            user_record
            and user_record.email
            and "@" in user_record.email
            and not user_record.email.endswith("@vanbass.local")
        ):
            customer_email = user_record.email

    # Dispatch email confirmation to customer
    if customer_email:
        EmailService.send_order_confirmation_to_customer(
            order=order,
            customer_email=customer_email,
        )

    # Dispatch alert email to shop & staff
    EmailService.send_order_notification_to_staff(
        order=order,
    )

    return order


@router.get("", response_model=OrderListResponse)
def list_orders(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    status_filter: OrderStatus | None = Query(None, alias="status"),
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> OrderListResponse:
    query = select(Order)
    if status_filter:
        query = query.where(Order.status == status_filter)

    orders = (
        db.execute(query.order_by(Order.created_at.desc()).offset(skip).limit(limit))
        .scalars()
        .all()
    )
    return OrderListResponse(items=list(orders), total=len(orders))


@router.get("/me", response_model=OrderListResponse)
def list_my_orders(
    current_user: User = Depends(get_optional_current_user),
    db: Session = Depends(get_db),
) -> OrderListResponse:
    if not current_user:
        return OrderListResponse(items=[], total=0)

    query = (
        select(Order)
        .where(Order.user_id == current_user.id)
        .where(Order.status != OrderStatus.CANCELLED)
        .order_by(Order.created_at.desc())
    )
    orders = db.execute(query).scalars().all()
    return OrderListResponse(items=list(orders), total=len(orders))


@router.get("/{order_id}", response_model=OrderResponse)
def get_order(
    order_id: UUID,
    current_user: User | None = Depends(get_optional_current_user),
    db: Session = Depends(get_db),
) -> Order:
    order = db.get(Order, order_id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Không tìm thấy đơn hàng",
        )

    if (
        current_user
        and current_user.role != UserRole.ADMIN
        and order.user_id != current_user.id
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Bạn không có quyền xem đơn hàng này",
        )

    return order


@router.patch("/{order_id}/status", response_model=OrderResponse)
def update_order_status(
    order_id: UUID,
    payload: OrderStatusUpdate,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> Order:
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


@router.post(
    "/{order_id}/pay",
    response_model=OrderResponse,
)
def pay_order(
    order_id: UUID,
    payload: OrderPayRequest | None = None,
    current_user: User | None = Depends(get_optional_current_user),
    db: Session = Depends(get_db),
) -> Order:
    order = db.get(Order, order_id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Không tìm thấy đơn hàng",
        )

    order.payment_status = PaymentStatus.PAID
    if payload and payload.payment_method:
        order.payment_method = payload.payment_method
    if order.status == OrderStatus.PENDING:
        order.status = OrderStatus.CONFIRMED

    db.commit()
    db.refresh(order)
    return order


@router.post(
    "/webhook/bank-transfer",
    response_model=OrderResponse,
)
def bank_transfer_webhook(
    payload: BankWebhookPayload,
    db: Session = Depends(get_db),
) -> Order:
    text_content = (payload.content or payload.description or payload.code or "").strip()

    target_order = None
    if payload.order_number:
        clean_num = payload.order_number.strip().replace("#", "")
        target_order = db.execute(
            select(Order).where(Order.order_number.ilike(f"%{clean_num}%"))
        ).scalars().first()

    if not target_order and text_content:
        unpaid_orders = db.execute(
            select(Order).where(Order.payment_status == PaymentStatus.UNPAID)
        ).scalars().all()
        for ord in unpaid_orders:
            clean_ord_num = ord.order_number.replace("-", "").replace("#", "").upper()
            clean_text = text_content.replace("-", "").replace("#", "").upper()
            if ord.order_number.upper() in text_content.upper() or clean_ord_num in clean_text:
                target_order = ord
                break

    if not target_order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Không tìm thấy đơn hàng tương ứng với nội dung chuyển khoản",
        )

    target_order.payment_status = PaymentStatus.PAID
    target_order.payment_method = payload.gateway or "vietqr"
    if target_order.status == OrderStatus.PENDING:
        target_order.status = OrderStatus.CONFIRMED

    db.commit()
    db.refresh(target_order)
    return target_order
