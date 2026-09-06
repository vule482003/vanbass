import uuid
from datetime import UTC, datetime
from decimal import Decimal
from enum import Enum
from typing import TYPE_CHECKING

from sqlalchemy import (
    CheckConstraint,
    DateTime,
    ForeignKey,
    Numeric,
    String,
    UniqueConstraint,
    Uuid,
)
from sqlalchemy import (
    Enum as SQLEnum,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base

if TYPE_CHECKING:
    from app.models.order import Order
    from app.models.rental_request import RentalRequest


class PaymentMethod(str, Enum):
    BANK_TRANSFER = "bank_transfer"
    VIETQR = "vietqr"
    CARD = "card"
    COD = "cod"


class PaymentTransactionStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    PAID = "paid"
    FAILED = "failed"
    CANCELLED = "cancelled"
    EXPIRED = "expired"
    REFUNDED = "refunded"


class Payment(Base):
    __tablename__ = "payments"

    __table_args__ = (
        CheckConstraint(
            "amount > 0",
            name="ck_payments_amount_positive",
        ),
        CheckConstraint(
            """
            (order_id IS NOT NULL AND rental_request_id IS NULL)
            OR
            (order_id IS NULL AND rental_request_id IS NOT NULL)
            """,
            name="ck_payments_single_owner",
        ),
        UniqueConstraint(
            "provider",
            "transaction_id",
            name="uq_payments_provider_transaction",
        ),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    order_id: Mapped[uuid.UUID | None] = mapped_column(
        Uuid(as_uuid=True),
        ForeignKey("orders.id", ondelete="CASCADE"),
        nullable=True,
        index=True,
    )

    rental_request_id: Mapped[uuid.UUID | None] = mapped_column(
        Uuid(as_uuid=True),
        ForeignKey("rental_requests.id", ondelete="CASCADE"),
        nullable=True,
        index=True,
    )

    payment_method: Mapped[PaymentMethod] = mapped_column(
        SQLEnum(
            PaymentMethod,
            name="payment_method",
        ),
        nullable=False,
    )

    provider: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    transaction_id: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
        index=True,
    )

    amount: Mapped[Decimal] = mapped_column(
        Numeric(18, 2),
        nullable=False,
    )

    currency: Mapped[str] = mapped_column(
        String(3),
        nullable=False,
        default="VND",
    )

    status: Mapped[PaymentTransactionStatus] = mapped_column(
        SQLEnum(
            PaymentTransactionStatus,
            name="payment_transaction_status",
        ),
        nullable=False,
        default=PaymentTransactionStatus.PENDING,
    )

    payment_url: Mapped[str | None] = mapped_column(
        String(2000),
        nullable=True,
    )

    paid_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
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

    order: Mapped["Order | None"] = relationship(
        back_populates="payments",
    )

    rental_request: Mapped["RentalRequest | None"] = relationship(
        back_populates="payments",
    )
