import uuid
from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.helpers import clean_phone_number
from app.core.security import hash_password
from app.models.user import User, UserRole


class UserService:
    @classmethod
    def get_or_create_guest_user(
        cls,
        db: Session,
        phone: str,
        email: str | None = None,
        default_password: str = "vanbass123",
    ) -> User:
        """
        Resolve an existing customer or create a new guest user based on phone/email.
        """
        cleaned_phone = clean_phone_number(phone)
        guest_email = email.strip() if email and email.strip() else f"guest_{cleaned_phone}@vanbass.vn"

        user = db.execute(select(User).where(User.email == guest_email)).scalar_one_or_none()
        if not user:
            user = User(
                id=uuid.uuid4(),
                email=guest_email,
                password_hash=hash_password(default_password),
                role=UserRole.CUSTOMER,
                is_active=True,
            )
            db.add(user)
            db.flush()

        return user

    @classmethod
    def resolve_user_id(
        cls,
        db: Session,
        current_user: User | None,
        phone: str,
        email: str | None = None,
    ) -> UUID:
        """
        Returns current_user.id if logged in, otherwise resolves/creates a guest user.
        """
        if current_user:
            return current_user.id
        guest = cls.get_or_create_guest_user(db, phone=phone, email=email)
        return guest.id
