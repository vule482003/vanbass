import uuid
from datetime import UTC, datetime
from decimal import Decimal
from typing import TYPE_CHECKING

from sqlalchemy import (
    Boolean,
    CheckConstraint,
    DateTime,
    ForeignKey,
    Integer,
    Numeric,
    String,
    Text,
    Uuid,
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

if TYPE_CHECKING:
    from app.models.category import Category
    from app.models.order_item import OrderItem
    from app.models.product_image import ProductImage
    from app.models.rental_request_item import RentalRequestItem


class Product(Base):
    __tablename__ = "products"

    __table_args__ = (
        CheckConstraint(
            "stock_quantity >= 0",
            name="ck_products_stock_non_negative",
        ),
        CheckConstraint(
            "NOT sale_enabled OR sale_price > 0",
            name="ck_products_sale_price_required",
        ),
        CheckConstraint(
            "NOT rental_enabled OR rental_price > 0",
            name="ck_products_rental_price_required",
        ),
        CheckConstraint(
            "discount_percent IS NULL OR (discount_percent > 0 AND discount_percent < 100)",
            name="ck_products_discount_percent_range",
        ),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    category_id: Mapped[uuid.UUID] = mapped_column(
        Uuid(as_uuid=True),
        ForeignKey("categories.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,
    )

    name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    slug: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False,
        index=True,
    )

    sku: Mapped[str] = mapped_column(
        String(100),
        unique=True,
        nullable=False,
        index=True,
    )

    brand: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    specifications: Mapped[dict | None] = mapped_column(
        JSONB,
        nullable=True,
    )

    sale_enabled: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
    )

    sale_price: Mapped[Decimal | None] = mapped_column(
        Numeric(18, 2),
        nullable=True,
    )

    discount_percent: Mapped[int | None] = mapped_column(
        Integer,
        nullable=True,
        default=None,
    )

    rental_enabled: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
    )

    rental_price: Mapped[Decimal | None] = mapped_column(
        Numeric(18, 2),
        nullable=True,
    )

    stock_quantity: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
    )

    meta_title: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    meta_description: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    meta_keywords: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    canonical_url: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(UTC),
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(UTC),
        onupdate=lambda: datetime.now(UTC),
    )

    category: Mapped["Category"] = relationship(
        back_populates="products",
    )

    images: Mapped[list["ProductImage"]] = relationship(
        back_populates="product",
        cascade="all, delete-orphan",
    )

    order_items: Mapped[list["OrderItem"]] = relationship(
        back_populates="product",
    )

    rental_request_items: Mapped[list["RentalRequestItem"]] = relationship(
        back_populates="product",
    )

    @property
    def original_price(self) -> Decimal | None:
        """
        Calculate original price before promotional discount.
        Formula: original_price = sale_price / (1 - discount_percent / 100)
        Rounded to nearest 1,000 VND.
        """
        if self.sale_enabled and self.sale_price and self.sale_price > 0 and self.discount_percent and self.discount_percent > 0:
            multiplier = Decimal("1") - (Decimal(self.discount_percent) / Decimal("100"))
            raw = self.sale_price / multiplier
            # Round to nearest 1,000 VND
            return (raw / Decimal("1000")).quantize(Decimal("1"), rounding="ROUND_HALF_UP") * Decimal("1000")
        return None
