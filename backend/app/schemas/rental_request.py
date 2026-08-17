from datetime import date, datetime
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

from app.models.rental_request import RentalPaymentStatus, RentalRequestStatus


class RentalRequestItemCreate(BaseModel):
    product_id: UUID
    quantity: int = Field(gt=0, default=1)
    daily_rate: Decimal = Field(ge=0)
    deposit_rate: Decimal = Field(ge=0, default=0)


class RentalRequestItemResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    product_id: UUID
    product_name: str
    product_sku: str
    quantity: int
    daily_rate: Decimal
    deposit_rate: Decimal
    line_total: Decimal


class RentalRequestCreate(BaseModel):
    start_date: date
    end_date: date
    pickup_location: str = Field(default="Showroom VanBass - Đà Nẵng")
    pickup_note: str | None = None
    customer_note: str | None = None
    items: list[RentalRequestItemCreate] = Field(min_length=1)


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
    pickup_note: str | None
    customer_note: str | None
    created_at: datetime
    updated_at: datetime
    items: list[RentalRequestItemResponse] = []


class RentalRequestListResponse(BaseModel):
    items: list[RentalRequestResponse]
    total: int
