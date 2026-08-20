import uuid
from datetime import datetime, timezone
from decimal import Decimal

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
        default=lambda: datetime.now(timezone.utc),
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
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