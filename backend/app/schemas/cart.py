<<<<<<< HEAD
from datetime import datetime
=======
>>>>>>> 201b4c121c9fbc2f3e1a969c00b0a2a178f68102
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


<<<<<<< HEAD
class CartItemCreate(BaseModel):
    product_id: UUID
    quantity: int = Field(default=1, ge=1)


class CartItemUpdate(BaseModel):
    quantity: int = Field(ge=1)
=======
class CartItemAdd(BaseModel):
    product_id: UUID
    quantity: int = Field(default=1, ge=1, le=100, description="Quantity to add (1-100)")


class CartItemUpdate(BaseModel):
    quantity: int = Field(ge=0, le=100, description="New quantity (0 removes item)")
>>>>>>> 201b4c121c9fbc2f3e1a969c00b0a2a178f68102


class CartItemResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

<<<<<<< HEAD
    id: UUID
    product_id: UUID
    quantity: int
    created_at: datetime
    updated_at: datetime


class CartResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    user_id: UUID
    items: list[CartItemResponse]
    created_at: datetime
    updated_at: datetime
=======
    product_id: UUID
    name: str
    slug: str
    sku: str
    image_url: str | None = None
    sale_price: Decimal
    stock_quantity: int
    quantity: int
    subtotal: Decimal
    is_available: bool = True
    error_message: str | None = None


class CartResponse(BaseModel):
    items: list[CartItemResponse] = []
    total_items: int = 0
    subtotal: Decimal = Decimal("0.00")
    currency: str = "VND"
>>>>>>> 201b4c121c9fbc2f3e1a969c00b0a2a178f68102
