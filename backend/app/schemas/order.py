from datetime import datetime
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field

<<<<<<< HEAD

class OrderCreate(BaseModel):
    shipping_name: str = Field(min_length=1, max_length=255)
    shipping_phone: str = Field(min_length=1, max_length=30)
    shipping_address: str = Field(min_length=1, max_length=1000)
    customer_note: str | None = None
    shipping_fee: Decimal = Field(default=Decimal("0"), ge=0)
=======
from app.models.order import OrderStatus, PaymentStatus


class OrderItemCreate(BaseModel):
    product_id: UUID
    quantity: int = Field(gt=0)
>>>>>>> 201b4c121c9fbc2f3e1a969c00b0a2a178f68102


class OrderItemResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    product_id: UUID
    product_name: str
<<<<<<< HEAD
    sku: str
    quantity: int
    unit_price: Decimal
    subtotal: Decimal
=======
    product_sku: str
    unit_price: Decimal
    quantity: int
    line_total: Decimal


class OrderCreateRequest(BaseModel):
    shipping_name: str = Field(min_length=1, max_length=255)
    shipping_phone: str = Field(min_length=1, max_length=30)
    shipping_address: str = Field(min_length=1, max_length=1000)
    customer_note: str | None = None
    note: str | None = None
    items: list[OrderItemCreate] = Field(min_length=1)


class OrderStatusUpdate(BaseModel):
    status: OrderStatus | None = None
    payment_status: PaymentStatus | None = None
    note: str | None = None


class OrderPaymentStatusUpdate(BaseModel):
    payment_status: PaymentStatus
    note: str | None = None


class OrderCancelRequest(BaseModel):
    reason: str | None = Field(default=None, max_length=500)


class OrderTrackRequest(BaseModel):
    order_number: str = Field(min_length=1, max_length=50)
    phone: str = Field(min_length=1, max_length=30)
>>>>>>> 201b4c121c9fbc2f3e1a969c00b0a2a178f68102


class OrderResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    user_id: UUID
    order_number: str
<<<<<<< HEAD
    status: str
    payment_status: str
=======
    status: OrderStatus
    payment_status: PaymentStatus
>>>>>>> 201b4c121c9fbc2f3e1a969c00b0a2a178f68102
    subtotal: Decimal
    shipping_fee: Decimal
    total_amount: Decimal
    currency: str
    shipping_name: str
    shipping_phone: str
    shipping_address: str
<<<<<<< HEAD
    customer_note: str | None
    created_at: datetime
    updated_at: datetime
    items: list[OrderItemResponse]


class OrderStatusUpdate(BaseModel):
    status: str
=======
    customer_note: str | None = None
    created_at: datetime
    updated_at: datetime
    items: list[OrderItemResponse] = []


class OrderListResponse(BaseModel):
    items: list[OrderResponse]
    total: int
>>>>>>> 201b4c121c9fbc2f3e1a969c00b0a2a178f68102
