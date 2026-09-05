"""add_staff_role_to_user_role_enum

Revision ID: 5c9381b458d5
Revises: c6a4e9f1b2d7
Create Date: 2026-09-05 11:31:47.113493

"""

from collections.abc import Sequence

from alembic import op

# revision identifiers, used by Alembic.
revision: str = "5c9381b458d5"
down_revision: str | Sequence[str] | None = "c6a4e9f1b2d7"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    """Upgrade schema."""
    op.execute("ALTER TYPE user_role ADD VALUE IF NOT EXISTS 'STAFF'")


def downgrade() -> None:
    """Downgrade schema."""
