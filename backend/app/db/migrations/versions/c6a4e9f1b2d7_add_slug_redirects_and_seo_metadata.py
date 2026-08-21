"""add slug redirects and seo metadata

Revision ID: c6a4e9f1b2d7
Revises: f44b8cea730f
Create Date: 2026-08-21

"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

revision: str = "c6a4e9f1b2d7"
down_revision: str | Sequence[str] | None = "f44b8cea730f"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "slug_redirects",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("entity_type", sa.String(length=50), nullable=False),
        sa.Column("old_slug", sa.String(length=255), nullable=False),
        sa.Column("new_slug", sa.String(length=255), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_slug_redirects_old_slug"),
        "slug_redirects",
        ["old_slug"],
        unique=True,
    )
    op.add_column("categories", sa.Column("meta_title", sa.String(length=255)))
    op.add_column("categories", sa.Column("meta_description", sa.String(length=500)))
    op.add_column("categories", sa.Column("meta_keywords", sa.String(length=255)))
    op.add_column("products", sa.Column("meta_title", sa.String(length=255)))
    op.add_column("products", sa.Column("meta_description", sa.String(length=500)))
    op.add_column("products", sa.Column("meta_keywords", sa.String(length=255)))
    op.add_column("products", sa.Column("canonical_url", sa.String(length=500)))


def downgrade() -> None:
    op.drop_column("products", "canonical_url")
    op.drop_column("products", "meta_keywords")
    op.drop_column("products", "meta_description")
    op.drop_column("products", "meta_title")
    op.drop_column("categories", "meta_keywords")
    op.drop_column("categories", "meta_description")
    op.drop_column("categories", "meta_title")
    op.drop_index(op.f("ix_slug_redirects_old_slug"), table_name="slug_redirects")
    op.drop_table("slug_redirects")