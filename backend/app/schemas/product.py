from datetime import datetime
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, model_validator

from app.schemas.product_image import ProductImageResponse


class ProductCreate(BaseModel):
    category_id: UUID
    name: str = Field(min_length=1, max_length=255)
    slug: str = Field(min_length=1, max_length=255)
    sku: str = Field(min_length=1, max_length=100)
    brand: str | None = Field(default=None, max_length=255)
    description: str | None = None
    specifications: dict | None = None

    meta_title: str | None = Field(default=None, max_length=255)
    meta_description: str | None = Field(default=None, max_length=500)
    meta_keywords: str | None = Field(default=None, max_length=255)
    canonical_url: str | None = Field(default=None, max_length=500)

    sale_enabled: bool = False
    sale_price: Decimal | None = Field(default=None, gt=0)

    rental_enabled: bool = False
    rental_price: Decimal | None = Field(default=None, gt=0)

    stock_quantity: int = Field(default=0, ge=0)

    @model_validator(mode="after")
    def validate_pricing(self):
        if self.sale_enabled and self.sale_price is None:
            raise ValueError("sale_price is required when sale_enabled is true")

        if not self.sale_enabled and self.sale_price is not None:
            raise ValueError("sale_price must be null when sale_enabled is false")

        if self.rental_enabled and self.rental_price is None:
            raise ValueError("rental_price is required when rental_enabled is true")

        if not self.rental_enabled and self.rental_price is not None:
            raise ValueError("rental_price must be null when rental_enabled is false")

        if not self.sale_enabled and not self.rental_enabled:
            raise ValueError("Product must be enabled for sale or rental")

        return self


class ProductUpdate(BaseModel):
    category_id: UUID | None = None
    name: str | None = Field(default=None, min_length=1, max_length=255)
    slug: str | None = Field(default=None, min_length=1, max_length=255)
    sku: str | None = Field(default=None, min_length=1, max_length=100)
    brand: str | None = Field(default=None, max_length=255)
    description: str | None = None
    specifications: dict | None = None

    meta_title: str | None = Field(default=None, max_length=255)
    meta_description: str | None = Field(default=None, max_length=500)
    meta_keywords: str | None = Field(default=None, max_length=255)
    canonical_url: str | None = Field(default=None, max_length=500)

    sale_enabled: bool | None = None
    sale_price: Decimal | None = Field(default=None, gt=0)

    rental_enabled: bool | None = None
    rental_price: Decimal | None = Field(default=None, gt=0)

    stock_quantity: int | None = Field(default=None, ge=0)
    is_active: bool | None = None


class ProductResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    category_id: UUID
    name: str
    slug: str
    sku: str
    brand: str | None
    description: str | None
    specifications: dict | None

    meta_title: str | None = None
    meta_description: str | None = None
    meta_keywords: str | None = None
    canonical_url: str | None = None

    sale_enabled: bool
    sale_price: Decimal | None

    rental_enabled: bool
    rental_price: Decimal | None

    stock_quantity: int
    is_active: bool

    images: list[ProductImageResponse] = []

    created_at: datetime
    updated_at: datetime
