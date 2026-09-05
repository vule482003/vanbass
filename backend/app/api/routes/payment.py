from datetime import UTC, datetime
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user, get_db, require_admin
from app.models.order import Order, PaymentStatus
from app.models.payment import Payment, PaymentTransactionStatus
from app.models.user import User
from app.schemas.payment import (
    PaymentCreate,
    PaymentResponse,
    PaymentStatusUpdate,
)

router = APIRouter(
    prefix="/payments",
    tags=["Payment"],
)


@router.post(
    "/orders/{order_id}",
    response_model=PaymentResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_order_payment(
    order_id: UUID,
    data: PaymentCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Payment:
    order = db.get(Order, order_id)

    if order is None or order.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found",
        )

    if order.status.value == "cancelled":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create payment for a cancelled order",
        )

    if order.payment_status == PaymentStatus.PAID:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Order is already paid",
        )

    existing_payment = db.execute(
        select(Payment).where(
            Payment.order_id == order.id,
            Payment.status.in_(
                [
                    PaymentTransactionStatus.PENDING,
                    PaymentTransactionStatus.PROCESSING,
                    PaymentTransactionStatus.PAID,
                ]
            ),
        )
    ).scalar_one_or_none()

    if existing_payment is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Order already has an active payment",
        )

    payment = Payment(
        order_id=order.id,
        payment_method=data.payment_method,
        provider=data.provider,
        amount=order.total_amount,
        currency=order.currency,
        status=PaymentTransactionStatus.PENDING,
    )

    db.add(payment)
    db.commit()
    db.refresh(payment)

    return payment


@router.get(
    "",
    response_model=list[PaymentResponse],
)
def list_my_payments(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[Payment]:
    result = db.execute(
        select(Payment)
        .join(Order, Payment.order_id == Order.id)
        .where(Order.user_id == current_user.id)
        .order_by(Payment.created_at.desc())
    )

    return list(result.scalars().all())


@router.get(
    "/{payment_id}",
    response_model=PaymentResponse,
)
def get_payment(
    payment_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Payment:
    payment = db.execute(
        select(Payment)
        .join(Order, Payment.order_id == Order.id)
        .where(
            Payment.id == payment_id,
            Order.user_id == current_user.id,
        )
    ).scalar_one_or_none()

    if payment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payment not found",
        )

    return payment


@router.get(
    "/admin",
    response_model=list[PaymentResponse],
)
def list_all_payments(
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> list[Payment]:
    result = db.execute(select(Payment).order_by(Payment.created_at.desc()))

    return list(result.scalars().all())


@router.put(
    "/{payment_id}/status",
    response_model=PaymentResponse,
)
def update_payment_status(
    payment_id: UUID,
    data: PaymentStatusUpdate,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> Payment:
    payment = db.get(Payment, payment_id)

    if payment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Payment not found",
        )

    if payment.order_id is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This payment is not associated with an order",
        )

    order = db.get(Order, payment.order_id)

    if order is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found",
        )

    new_status = data.status

    if new_status == PaymentTransactionStatus.PAID:
        payment.paid_at = datetime.now(UTC)
        order.payment_status = PaymentStatus.PAID

    elif new_status == PaymentTransactionStatus.REFUNDED:
        payment.paid_at = None
        order.payment_status = PaymentStatus.REFUNDED

    elif new_status in {
        PaymentTransactionStatus.PENDING,
        PaymentTransactionStatus.PROCESSING,
        PaymentTransactionStatus.FAILED,
        PaymentTransactionStatus.CANCELLED,
        PaymentTransactionStatus.EXPIRED,
    }:
        order.payment_status = PaymentStatus.UNPAID

    payment.status = new_status

    if data.transaction_id is not None:
        payment.transaction_id = data.transaction_id

    if data.payment_url is not None:
        payment.payment_url = data.payment_url

    db.commit()
    db.refresh(payment)

    return payment
