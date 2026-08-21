from collections.abc import Generator

from fastapi import Depends, Header, HTTPException, Query, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.core.i18n import translate
from app.core.security import decode_access_token
from app.db.session import SessionLocal
from app.models.user import User, UserRole

bearer_scheme = HTTPBearer()
optional_bearer_scheme = HTTPBearer(auto_error=False)

SUPPORTED_LANGUAGES = {"vi", "en"}
DEFAULT_LANGUAGE = "vi"


def get_language(
    accept_language: str | None = Header(default=None, alias="Accept-Language"),
    lang: str | None = Query(default=None),
) -> str:
    if lang and lang.lower() in SUPPORTED_LANGUAGES:
        return lang.lower()
    if accept_language:
        primary_lang = accept_language.split(",")[0].split("-")[0].lower()
        if primary_lang in SUPPORTED_LANGUAGES:
            return primary_lang
    return DEFAULT_LANGUAGE


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_optional_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(optional_bearer_scheme),
    db: Session = Depends(get_db),
) -> User | None:
    if credentials is None:
        return None

    try:
        user_id = decode_access_token(credentials.credentials)
    except Exception:
        return None

    user = db.get(User, user_id)
    if user is None or not user.is_active:
        return None

    return user


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db),
    lang: str = Depends(get_language),
) -> User:
    try:
        user_id = decode_access_token(credentials.credentials)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=translate("session_expired", lang),
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = db.get(User, user_id)

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=translate("user_not_found", lang),
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=translate("account_inactive", lang),
        )

    return user


def require_admin(
    current_user: User = Depends(get_current_user),
    lang: str = Depends(get_language),
) -> User:
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=translate("admin_required", lang),
        )

    return current_user


def get_cart_id(
    x_session_id: str | None = Header(default=None, alias="X-Session-ID"),
    current_user: User | None = Depends(get_optional_current_user),
) -> str:
    if current_user is not None:
        return f"user:{current_user.id}"
    if x_session_id and x_session_id.strip():
        return f"guest:{x_session_id.strip()}"
    return "guest:anonymous"
