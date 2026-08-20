from datetime import date, datetime
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

<<<<<<< HEAD
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
=======
from app.models.rental_request import RentalPaymentStatus, RentalRequestStatus


class RentalRequestItemCreate(BaseModel):
    product_id: str | UUID
    quantity: int = Field(gt=0, default=1)
    daily_rate: Decimal = Field(ge=0, default=0)
    rental_price: Decimal | None = Field(default=None, ge=0)


class RentalRequestItemResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

>>>>>>> 201b4c121c9fbc2f3e1a969c00b0a2a178f68102
    id: UUID
    product_id: UUID
    product_name: str
    quantity: int
    rental_price: Decimal
    number_of_days: int
    subtotal: Decimal

<<<<<<< HEAD
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
=======

class RentalRequestCreate(BaseModel):
    start_date: date
    end_date: date
    customer_name: str | None = None
    customer_phone: str | None = None
    customer_email: str | None = None
    delivery_address: str | None = None
    pickup_location: str | None = "Showroom VanBass - Đà Nẵng"
    note: str | None = None
    customer_note: str | None = None
    items: list[RentalRequestItemCreate] = Field(min_length=1)


class RentalStatusUpdate(BaseModel):
    status: RentalRequestStatus | None = None
    payment_status: RentalPaymentStatus | None = None
    note: str | None = None


class RentalCancelRequest(BaseModel):
    reason: str | None = Field(default=None, max_length=500)


class RentalRequestResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

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
    pickup_note: str | None = None
    customer_note: str | None = None
    created_at: datetime
    updated_at: datetime
    items: list[RentalRequestItemResponse] = []


class RentalRequestListResponse(BaseModel):
    items: list[RentalRequestResponse]
    total: int


class DayAvailability(BaseModel):
    date: date
    total_stock: int
    booked_count: int
    available_count: int


class ProductAvailabilityResponse(BaseModel):
    product_id: UUID
    product_name: str
    total_stock: int
    calendar: list[DayAvailability]
>>>>>>> 201b4c121c9fbc2f3e1a969c00b0a2a178f68102
