"""add_home_configs_and_store_settings_facebook_page_id

Revision ID: 4a09c0346330
Revises: 5c9381b458d5
Create Date: 2026-09-06 17:49:42.297858

"""
from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "4a09c0346330"
down_revision: str | Sequence[str] | None = "5c9381b458d5"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    """Upgrade schema."""
    conn = op.get_bind()
    inspector = sa.inspect(conn)
    tables = inspector.get_table_names()

    if "home_configs" not in tables:
        op.create_table(
            "home_configs",
            sa.Column("id", sa.Uuid(), nullable=False),
            sa.Column("data", sa.JSON(), nullable=False),
            sa.Column("updated_by", sa.Uuid(), nullable=True),
            sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
            sa.ForeignKeyConstraint(["updated_by"], ["users.id"], ondelete="SET NULL"),
            sa.PrimaryKeyConstraint("id"),
        )

    columns = [c["name"] for c in inspector.get_columns("store_settings")]
    if "facebook_page_id" not in columns:
        op.add_column(
            "store_settings",
            sa.Column("facebook_page_id", sa.String(length=255), nullable=True),
        )


def downgrade() -> None:
    """Downgrade schema."""
    conn = op.get_bind()
    inspector = sa.inspect(conn)

    columns = [c["name"] for c in inspector.get_columns("store_settings")]
    if "facebook_page_id" in columns:
        op.drop_column("store_settings", "facebook_page_id")

    tables = inspector.get_table_names()
    if "home_configs" in tables:
        op.drop_table("home_configs")
