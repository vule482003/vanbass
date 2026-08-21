import uuid
from datetime import UTC, date, datetime
from decimal import Decimal
from enum import Enum

from sqlalchemy import (
    CheckConstraint,
    Date,
    DateTime,
    ForeignKey,
    Numeric,
    String,
    Text,
    Uuid,
)
from sqlalchemy import (
    Enum as SQLEnum,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class RentalRequestStatus(str, Enum):
    PENDING = "pending"
    CONTACTED = "contacted"
    CONFIRMED = "confirmed"
    REJECTED = "rejected"
    CANCELLED = "cancelled"
    COMPLETED = "completed"


class RentalPaymentStatus(str, Enum):
    NOT_REQUIRED = "not_required"
    UNPAID = "unpaid"
    PARTIALLY_PAID = "partially_paid"
    PAID = "paid"
    REFUNDED = "refunded"


class RentalRequest(Base):
    __tablename__ = "rental_requests"

    __table_args__ = (
        CheckConstraint(
            "end_date >= start_date",
            name="ck_rental_requests_valid_date_range",
        ),
        CheckConstraint(
            "rental_total >= 0",
            name="ck_rental_requests_total_non_negative",
        ),
        CheckConstraint(
            "deposit_amount >= 0",
            name="ck_rental_requests_deposit_non_negative",
        ),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        Uuid(as_uuid=True),
        ForeignKey("users.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,
    )

    request_number: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        nullable=False,
        index=True,
    )

    start_date: Mapped[date] = mapped_column(
        Date,
        nullable=False,
    )

    end_date: Mapped[date] = mapped_column(
        Date,
        nullable=False,
    )

    status: Mapped[RentalRequestStatus] = mapped_column(
        SQLEnum(
            RentalRequestStatus,
            name="rental_request_status",
        ),
        nullable=False,
        default=RentalRequestStatus.PENDING,
    )

    payment_status: Mapped[RentalPaymentStatus] = mapped_column(
        SQLEnum(
            RentalPaymentStatus,
            name="rental_payment_status",
        ),
        nullable=False,
        default=RentalPaymentStatus.NOT_REQUIRED,
    )

    rental_total: Mapped[Decimal] = mapped_column(
        Numeric(18, 2),
        nullable=False,
        default=0,
    )

    deposit_amount: Mapped[Decimal] = mapped_column(
        Numeric(18, 2),
        nullable=False,
        default=0,
    )

    currency: Mapped[str] = mapped_column(
        String(3),
        nullable=False,
        default="VND",
    )

    pickup_location: Mapped[str] = mapped_column(
        String(500),
        nullable=False,
    )

    pickup_note: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    customer_note: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    admin_note: Mapped[str | None] = mapped_column(
        Text,
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

    user: Mapped["User"] = relationship(
        back_populates="rental_requests",
    )

    items: Mapped[list["RentalRequestItem"]] = relationship(
        back_populates="rental_request",
        cascade="all, delete-orphan",
    )

    payments: Mapped[list["Payment"]] = relationship(
        back_populates="rental_request",
    )
