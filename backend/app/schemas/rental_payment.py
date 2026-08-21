from datetime import datetime
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from app.models.payment import (
    PaymentMethod,
    PaymentTransactionStatus,
)


class RentalPaymentCreate(BaseModel):
    payment_method: PaymentMethod
    provider: str = Field(
        min_length=1,
        max_length=100,
    )
    amount: Decimal = Field(
        gt=0,
    )


class RentalPaymentResponse(BaseModel):
    id: UUID
    rental_request_id: UUID
    payment_method: PaymentMethod
    provider: str
    transaction_id: str | None
    amount: Decimal
    currency: str
    status: PaymentTransactionStatus
    payment_url: str | None
    paid_at: datetime | None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True,
    )


class RentalPaymentStatusUpdate(BaseModel):
    status: PaymentTransactionStatus
    transaction_id: str | None = Field(
        default=None,
        max_length=255,
    )
