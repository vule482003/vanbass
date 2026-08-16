from datetime import datetime
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from app.models.payment import PaymentMethod, PaymentTransactionStatus


class PaymentCreate(BaseModel):
    payment_method: PaymentMethod
    provider: str = Field(default="manual", min_length=1, max_length=100)


class PaymentStatusUpdate(BaseModel):
    status: PaymentTransactionStatus
    transaction_id: str | None = Field(
        default=None,
        max_length=255,
    )
    payment_url: str | None = Field(
        default=None,
        max_length=2000,
    )


class PaymentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    order_id: UUID | None
    rental_request_id: UUID | None
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