"""add discount_percent to products

Revision ID: a9f3b7c2d1e0
Revises: e728e94fe5ae
Create Date: 2026-10-23 17:35:00.000000

"""
from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = 'a9f3b7c2d1e0'
down_revision: str | Sequence[str] | None = 'e728e94fe5ae'
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    """Upgrade schema: add discount_percent column and range check constraint."""
    op.add_column('products', sa.Column('discount_percent', sa.Integer(), nullable=True))
    op.create_check_constraint(
        'ck_products_discount_percent_range',
        'products',
        'discount_percent IS NULL OR (discount_percent > 0 AND discount_percent < 100)'
    )


def downgrade() -> None:
    """Downgrade schema: drop constraint and column."""
    op.drop_constraint('ck_products_discount_percent_range', 'products', type_='check')
    op.drop_column('products', 'discount_percent')
