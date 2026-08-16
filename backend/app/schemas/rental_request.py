from datetime import date, datetime
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from app.models.rental_request import (
    RentalPaymentStatus,
    RentalRequestStatus,
)


class RentalRequestItemCreate(BaseModel):
    product_id: UUID
    quantity: int = Field(
        gt=0,
        description="Number of products to rent",
    )


class RentalRequestCreate(BaseModel):
    start_date: date
    end_date: date

    items: list[RentalRequestItemCreate] = Field(
        min_length=1,
    )

    pickup_location: str = Field(
        min_length=1,
        max_length=500,
    )

    pickup_note: str | None = Field(
        default=None,
        max_length=1000,
    )

    customer_note: str | None = Field(
        default=None,
        max_length=2000,
    )


class RentalRequestItemResponse(BaseModel):
    id: UUID
    product_id: UUID
    product_name: str
    quantity: int
    rental_price: Decimal
    number_of_days: int
    subtotal: Decimal

    model_config = ConfigDict(
        from_attributes=True,
    )


class RentalRequestResponse(BaseModel):
    id: UUID
    user_id: UUID
    request_number: str

    start_date: date
    end_date: date

    status: RentalRequestStatus
    payment_status: RentalPaymentStatus

    rental_total: Decimal
    deposit_amount: Decimal
    currency: str

    pickup_location: str
    pickup_note: str | None

    customer_note: str | None
    admin_note: str | None

    created_at: datetime
    updated_at: datetime

    items: list[RentalRequestItemResponse]

    model_config = ConfigDict(
        from_attributes=True,
    )


class RentalRequestStatusUpdate(BaseModel):
    status: RentalRequestStatus

    admin_note: str | None = Field(
        default=None,
        max_length=2000,
    )