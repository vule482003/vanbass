from datetime import datetime
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class OrderCreate(BaseModel):
    shipping_name: str = Field(min_length=1, max_length=255)
    shipping_phone: str = Field(min_length=1, max_length=30)
    shipping_address: str = Field(min_length=1, max_length=1000)
    customer_note: str | None = None
    shipping_fee: Decimal = Field(default=Decimal("0"), ge=0)


class OrderItemResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    product_id: UUID
    product_name: str
    sku: str
    quantity: int
    unit_price: Decimal
    subtotal: Decimal


class OrderResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    user_id: UUID
    order_number: str
    status: str
    payment_status: str
    subtotal: Decimal
    shipping_fee: Decimal
    total_amount: Decimal
    currency: str
    shipping_name: str
    shipping_phone: str
    shipping_address: str
    customer_note: str | None
    created_at: datetime
    updated_at: datetime
    items: list[OrderItemResponse]


class OrderStatusUpdate(BaseModel):
    status: str