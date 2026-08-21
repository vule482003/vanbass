"""align rental and store schema

Revision ID: 0842d9ed40b3
Revises: fb171e65b445
Create Date: 2026-08-13 10:21:58.758202

"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "0842d9ed40b3"
down_revision: str | Sequence[str] | None = "fb171e65b445"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    """Upgrade schema safely for existing data."""

    # customer_profiles
    op.add_column(
        "customer_profiles",
        sa.Column(
            "country",
            sa.String(length=100),
            nullable=False,
            server_default="Vietnam",
        ),
    )
    op.alter_column(
        "customer_profiles",
        "district",
        existing_type=sa.VARCHAR(length=100),
        nullable=True,
    )
    op.alter_column(
        "customer_profiles",
        "ward",
        existing_type=sa.VARCHAR(length=100),
        nullable=True,
    )
    op.drop_constraint(
        "customer_profiles_user_id_key",
        "customer_profiles",
        type_="unique",
    )
    op.create_index(
        "ix_customer_profiles_user_id",
        "customer_profiles",
        ["user_id"],
        unique=True,
    )
    op.alter_column(
        "customer_profiles",
        "country",
        server_default=None,
    )

    # orders
    op.create_check_constraint(
        "ck_orders_shipping_fee_non_negative",
        "orders",
        "shipping_fee >= 0",
    )
    op.create_check_constraint(
        "ck_orders_subtotal_non_negative",
        "orders",
        "subtotal >= 0",
    )
    op.create_check_constraint(
        "ck_orders_total_non_negative",
        "orders",
        "total_amount >= 0",
    )

    # payments
    op.add_column(
        "payments",
        sa.Column("rental_request_id", sa.Uuid(), nullable=True),
    )
    op.alter_column(
        "payments",
        "order_id",
        existing_type=sa.UUID(),
        nullable=True,
    )
    op.create_index(
        "ix_payments_rental_request_id",
        "payments",
        ["rental_request_id"],
        unique=False,
    )
    op.create_unique_constraint(
        "uq_payments_provider_transaction",
        "payments",
        ["provider", "transaction_id"],
    )
    op.create_foreign_key(
        "fk_payments_rental_request_id",
        "payments",
        "rental_requests",
        ["rental_request_id"],
        ["id"],
        ondelete="CASCADE",
    )
    op.create_check_constraint(
        "ck_payments_amount_positive",
        "payments",
        "amount > 0",
    )
    op.create_check_constraint(
        "ck_payments_single_owner",
        "payments",
        """
        (order_id IS NOT NULL AND rental_request_id IS NULL)
        OR
        (order_id IS NULL AND rental_request_id IS NOT NULL)
        """,
    )

    # products
    op.alter_column(
        "products",
        "specifications",
        existing_type=postgresql.JSON(astext_type=sa.Text()),
        type_=postgresql.JSONB(astext_type=sa.Text()),
        existing_nullable=True,
    )
    op.create_check_constraint(
        "ck_products_rental_price_required",
        "products",
        "NOT rental_enabled OR rental_price > 0",
    )
    op.create_check_constraint(
        "ck_products_sale_price_required",
        "products",
        "NOT sale_enabled OR sale_price > 0",
    )
    op.create_check_constraint(
        "ck_products_stock_non_negative",
        "products",
        "stock_quantity >= 0",
    )

    # rental_requests
    rental_payment_status = postgresql.ENUM(
        "NOT_REQUIRED",
        "UNPAID",
        "PARTIALLY_PAID",
        "PAID",
        "REFUNDED",
        name="rental_payment_status",
    )
    rental_payment_status.create(op.get_bind(), checkfirst=True)

    op.add_column(
        "rental_requests",
        sa.Column(
            "payment_status",
            rental_payment_status,
            nullable=False,
            server_default="NOT_REQUIRED",
        ),
    )
    op.add_column(
        "rental_requests",
        sa.Column(
            "rental_total",
            sa.Numeric(precision=18, scale=2),
            nullable=False,
            server_default="0",
        ),
    )
    op.add_column(
        "rental_requests",
        sa.Column(
            "deposit_amount",
            sa.Numeric(precision=18, scale=2),
            nullable=False,
            server_default="0",
        ),
    )
    op.add_column(
        "rental_requests",
        sa.Column(
            "currency",
            sa.String(length=3),
            nullable=False,
            server_default="VND",
        ),
    )
    op.add_column(
        "rental_requests",
        sa.Column(
            "pickup_location",
            sa.String(length=500),
            nullable=False,
            server_default="VanBass Music Center",
        ),
    )
    op.add_column(
        "rental_requests",
        sa.Column("pickup_note", sa.Text(), nullable=True),
    )
    op.create_check_constraint(
        "ck_rental_requests_deposit_non_negative",
        "rental_requests",
        "deposit_amount >= 0",
    )
    op.create_check_constraint(
        "ck_rental_requests_total_non_negative",
        "rental_requests",
        "rental_total >= 0",
    )
    op.create_check_constraint(
        "ck_rental_requests_valid_date_range",
        "rental_requests",
        "end_date >= start_date",
    )

    op.alter_column(
        "rental_requests",
        "payment_status",
        server_default=None,
    )
    op.alter_column(
        "rental_requests",
        "rental_total",
        server_default=None,
    )
    op.alter_column(
        "rental_requests",
        "deposit_amount",
        server_default=None,
    )
    op.alter_column(
        "rental_requests",
        "currency",
        server_default=None,
    )
    op.alter_column(
        "rental_requests",
        "pickup_location",
        server_default=None,
    )

    # store_settings
    op.add_column(
        "store_settings",
        sa.Column("rental_phone", sa.String(length=30), nullable=True),
    )
    op.add_column(
        "store_settings",
        sa.Column("rental_email", sa.String(length=255), nullable=True),
    )
    op.add_column(
        "store_settings",
        sa.Column(
            "city",
            sa.String(length=100),
            nullable=False,
            server_default="Da Nang",
        ),
    )
    op.add_column(
        "store_settings",
        sa.Column(
            "country",
            sa.String(length=100),
            nullable=False,
            server_default="Vietnam",
        ),
    )
    op.add_column(
        "store_settings",
        sa.Column(
            "business_hours",
            sa.String(length=500),
            nullable=True,
        ),
    )
    op.add_column(
        "store_settings",
        sa.Column(
            "rental_information",
            sa.Text(),
            nullable=True,
        ),
    )

    # Preserve existing store contact information before removing legacy fields.
    op.execute(
        sa.text(
            """
            UPDATE store_settings
            SET
                rental_phone = phone,
                rental_email = email,
                business_hours = opening_hours
            """
        )
    )

    op.alter_column(
        "store_settings",
        "address",
        existing_type=sa.VARCHAR(length=1000),
        type_=sa.String(length=500),
        existing_nullable=False,
    )

    op.alter_column(
        "store_settings",
        "city",
        server_default=None,
    )
    op.alter_column(
        "store_settings",
        "country",
        server_default=None,
    )

    # Legacy fields are no longer represented by the current StoreSettings model.
    op.drop_column("store_settings", "logo_url")
    op.drop_column("store_settings", "zalo_url")
    op.drop_column("store_settings", "opening_hours")
    op.drop_column("store_settings", "google_maps_url")
    op.drop_column("store_settings", "facebook_url")


def downgrade() -> None:
    """Downgrade schema."""

    # store_settings
    op.add_column(
        "store_settings",
        sa.Column(
            "facebook_url",
            sa.VARCHAR(length=2000),
            autoincrement=False,
            nullable=True,
        ),
    )
    op.add_column(
        "store_settings",
        sa.Column(
            "google_maps_url",
            sa.VARCHAR(length=2000),
            autoincrement=False,
            nullable=True,
        ),
    )
    op.add_column(
        "store_settings",
        sa.Column(
            "opening_hours",
            sa.VARCHAR(length=1000),
            autoincrement=False,
            nullable=True,
        ),
    )
    op.add_column(
        "store_settings",
        sa.Column(
            "zalo_url",
            sa.VARCHAR(length=2000),
            autoincrement=False,
            nullable=True,
        ),
    )
    op.add_column(
        "store_settings",
        sa.Column(
            "logo_url",
            sa.VARCHAR(length=2000),
            autoincrement=False,
            nullable=True,
        ),
    )
    op.execute(
        sa.text(
            """
            UPDATE store_settings
            SET opening_hours = business_hours
            """
        )
    )
    op.alter_column(
        "store_settings",
        "address",
        existing_type=sa.String(length=500),
        type_=sa.VARCHAR(length=1000),
        existing_nullable=False,
    )
    op.drop_column("store_settings", "rental_information")
    op.drop_column("store_settings", "business_hours")
    op.drop_column("store_settings", "country")
    op.drop_column("store_settings", "city")
    op.drop_column("store_settings", "rental_email")
    op.drop_column("store_settings", "rental_phone")

    # rental_requests
    op.drop_constraint(
        "ck_rental_requests_valid_date_range",
        "rental_requests",
        type_="check",
    )
    op.drop_constraint(
        "ck_rental_requests_total_non_negative",
        "rental_requests",
        type_="check",
    )
    op.drop_constraint(
        "ck_rental_requests_deposit_non_negative",
        "rental_requests",
        type_="check",
    )
    op.drop_column("rental_requests", "pickup_note")
    op.drop_column("rental_requests", "pickup_location")
    op.drop_column("rental_requests", "currency")
    op.drop_column("rental_requests", "deposit_amount")
    op.drop_column("rental_requests", "rental_total")
    op.drop_column("rental_requests", "payment_status")

    rental_payment_status = postgresql.ENUM(
        "NOT_REQUIRED",
        "UNPAID",
        "PARTIALLY_PAID",
        "PAID",
        "REFUNDED",
        name="rental_payment_status",
    )
    rental_payment_status.drop(op.get_bind(), checkfirst=True)

    # products
    op.drop_constraint(
        "ck_products_stock_non_negative",
        "products",
        type_="check",
    )
    op.drop_constraint(
        "ck_products_sale_price_required",
        "products",
        type_="check",
    )
    op.drop_constraint(
        "ck_products_rental_price_required",
        "products",
        type_="check",
    )
    op.alter_column(
        "products",
        "specifications",
        existing_type=postgresql.JSONB(astext_type=sa.Text()),
        type_=postgresql.JSON(astext_type=sa.Text()),
        existing_nullable=True,
    )

    # payments
    op.drop_constraint(
        "ck_payments_single_owner",
        "payments",
        type_="check",
    )
    op.drop_constraint(
        "ck_payments_amount_positive",
        "payments",
        type_="check",
    )
    op.drop_constraint(
        "fk_payments_rental_request_id",
        "payments",
        type_="foreignkey",
    )
    op.drop_constraint(
        "uq_payments_provider_transaction",
        "payments",
        type_="unique",
    )
    op.drop_index(
        "ix_payments_rental_request_id",
        table_name="payments",
    )
    op.alter_column(
        "payments",
        "order_id",
        existing_type=sa.UUID(),
        nullable=False,
    )
    op.drop_column("payments", "rental_request_id")

    # orders
    op.drop_constraint(
        "ck_orders_total_non_negative",
        "orders",
        type_="check",
    )
    op.drop_constraint(
        "ck_orders_subtotal_non_negative",
        "orders",
        type_="check",
    )
    op.drop_constraint(
        "ck_orders_shipping_fee_non_negative",
        "orders",
        type_="check",
    )

    # customer_profiles
    op.drop_index(
        "ix_customer_profiles_user_id",
        table_name="customer_profiles",
    )
    op.create_unique_constraint(
        "customer_profiles_user_id_key",
        "customer_profiles",
        ["user_id"],
    )
    op.alter_column(
        "customer_profiles",
        "ward",
        existing_type=sa.VARCHAR(length=100),
        nullable=False,
    )
    op.alter_column(
        "customer_profiles",
        "district",
        existing_type=sa.VARCHAR(length=100),
        nullable=False,
    )
    op.drop_column("customer_profiles", "country")
