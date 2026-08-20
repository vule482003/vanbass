import uuid
from datetime import datetime, timezone
from decimal import Decimal
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user, get_db, require_admin
from app.models.payment import (
    Payment,
    PaymentTransactionStatus,
)
from app.models.rental_request import (
    RentalPaymentStatus,
    RentalRequest,
    RentalRequestStatus,
)
from app.models.user import User
from app.schemas.rental_payment import (
    RentalPaymentCreate,
    RentalPaymentResponse,
    RentalPaymentStatusUpdate,
)


router = APIRouter(
    prefix="/rental-requests",
    tags=["Rental Payment"],
)


def get_rental_request_for_user(
    rental_request_id: UUID,
    current_user: User,
    db: Session,
) -> RentalRequest:
    rental_request = db.execute(
        select(RentalRequest).where(
            RentalRequest.id == rental_request_id,
            RentalRequest.user_id == current_user.id,
        )
    ).scalar_one_or_none()

    if rental_request is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Rental request not found",
        )

    return rental_request


def get_rental_payment(
    payment_id: UUID,
    db: Session,
) -> Payment:
    payment = db.execute(
        select(Payment).where(
            Payment.id == payment_id,
            Payment.rental_request_id.is_not(None),
        )
    ).scalar_one_or_none()

    if payment is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Rental payment not found",
        )

    return payment


@router.post(
    "/{rental_request_id}/payments",
    response_model=RentalPaymentResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_rental_payment(
    rental_request_id: UUID,
    data: RentalPaymentCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Payment:
    rental_request = get_rental_request_for_user(
        rental_request_id=rental_request_id,
        current_user=current_user,
        db=db,
    )

    if rental_request.status != RentalRequestStatus.CONFIRMED:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Rental request must be confirmed before payment",
        )

    if rental_request.payment_status == RentalPaymentStatus.PAID:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Rental request has already been fully paid",
        )

    remaining_amount = (
        rental_request.rental_total
        - sum(
            payment.amount
            for payment in rental_request.payments
            if payment.status
            in {
                PaymentTransactionStatus.PAID,
                PaymentTransactionStatus.PROCESSING,
            }
        )
    )

    if data.amount > remaining_amount:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Payment amount exceeds remaining amount",
        )

    payment = Payment(
        rental_request_id=rental_request.id,
        payment_method=data.payment_method,
        provider=data.provider,
        amount=data.amount,
        currency=rental_request.currency,
        status=PaymentTransactionStatus.PENDING,
    )

    db.add(payment)
    db.commit()
    db.refresh(payment)

    return payment


@router.get(
    "/{rental_request_id}/payments",
    response_model=list[RentalPaymentResponse],
)
def list_rental_payments(
    rental_request_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[Payment]:
    rental_request = get_rental_request_for_user(
        rental_request_id=rental_request_id,
        current_user=current_user,
        db=db,
    )

    result = db.execute(
        select(Payment)
        .where(
            Payment.rental_request_id == rental_request.id,
        )
        .order_by(Payment.created_at.desc())
    )

    return list(result.scalars().all())


@router.get(
    "/payments/{payment_id}",
    response_model=RentalPaymentResponse,
)
def get_rental_payment_for_user(
    payment_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> Payment:
    payment = get_rental_payment(
        payment_id=payment_id,
        db=db,
    )

    rental_request = get_rental_request_for_user(
        rental_request_id=payment.rental_request_id,
        current_user=current_user,
        db=db,
    )

    return payment


@router.get(
    "/admin/{rental_request_id}/payments",
    response_model=list[RentalPaymentResponse],
)
def list_rental_payments_admin(
    rental_request_id: UUID,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> list[Payment]:
    rental_request = db.execute(
        select(RentalRequest).where(
            RentalRequest.id == rental_request_id,
        )
    ).scalar_one_or_none()

    if rental_request is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Rental request not found",
        )

    result = db.execute(
        select(Payment)
        .where(
            Payment.rental_request_id == rental_request.id,
        )
        .order_by(Payment.created_at.desc())
    )

    return list(result.scalars().all())


@router.put(
    "/admin/payments/{payment_id}/status",
    response_model=RentalPaymentResponse,
)
def update_rental_payment_status(
    payment_id: UUID,
    data: RentalPaymentStatusUpdate,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> Payment:
    payment = get_rental_payment(
        payment_id=payment_id,
        db=db,
    )

    rental_request = db.execute(
        select(RentalRequest).where(
            RentalRequest.id == payment.rental_request_id,
        )
    ).scalar_one_or_none()

    if rental_request is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Rental request not found",
        )

    payment.status = data.status

    if data.transaction_id is not None:
        payment.transaction_id = data.transaction_id

    if data.status == PaymentTransactionStatus.PAID:
        payment.paid_at = datetime.now(timezone.utc)

        paid_amount = db.execute(
            select(Payment.amount).where(
                Payment.rental_request_id == rental_request.id,
                Payment.status == PaymentTransactionStatus.PAID,
            )
        ).scalars().all()

        total_paid = sum(paid_amount, Decimal("0"))

        total_paid += payment.amount

        if total_paid >= rental_request.rental_total:
            rental_request.payment_status = RentalPaymentStatus.PAID
        else:
            rental_request.payment_status = (
                RentalPaymentStatus.PARTIALLY_PAID
            )

    elif data.status in {
        PaymentTransactionStatus.FAILED,
        PaymentTransactionStatus.CANCELLED,
        PaymentTransactionStatus.EXPIRED,
    }:
        payment.paid_at = None

    db.commit()
    db.refresh(payment)

    return payment