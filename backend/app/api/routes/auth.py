import json
import logging
import secrets
from datetime import UTC, datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user, get_db
from app.core.rate_limit import rate_limit_auth
from app.core.redis import redis_client
from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_refresh_token,
    hash_password,
    verify_password,
)
from app.models.user import User, UserRole
from app.schemas.auth import (
    ForgotPasswordRequest,
    LoginRequest,
    RefreshTokenRequest,
    RegisterRequest,
    ResetPasswordRequest,
    TokenResponse,
    UserResponse,
)
from app.services.email_service import EmailService

logger = logging.getLogger("auth")

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=TokenResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(rate_limit_auth)],
)
def register(
    data: RegisterRequest,
    db: Session = Depends(get_db),
) -> TokenResponse:
    email = data.email.lower().strip()

    existing_user = db.scalar(select(User).where(User.email == email))
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email này đã được đăng ký",
        )

    user = User(
        email=email,
        password_hash=hash_password(data.password),
        role=UserRole.CUSTOMER,
        is_active=True,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    access_token = create_access_token(user.id)
    refresh_token = create_refresh_token(user.id)

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        expires_in=900,
        user=user,
    )


@router.post(
    "/login",
    response_model=TokenResponse,
    dependencies=[Depends(rate_limit_auth)],
)
def login(
    data: LoginRequest,
    db: Session = Depends(get_db),
) -> TokenResponse:
    identifier = data.identifier.lower().strip()
    if not identifier:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Vui lòng nhập Email hoặc Tên đăng nhập",
        )

    # 1. Search exact email match
    user = db.scalar(select(User).where(func.lower(User.email) == identifier))

    # 2. If not found and identifier has no '@', search by email prefix (e.g. 'admin' for 'admin@vanbass.vn')
    if user is None and "@" not in identifier:
        matching_users = db.scalars(
            select(User).where(User.email.ilike(f"{identifier}@%"))
        ).all()
        if len(matching_users) == 1:
            user = matching_users[0]

    if user is None or not verify_password(data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email/Tên đăng nhập hoặc mật khẩu không chính xác",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Tài khoản này đã bị tạm khóa",
        )

    access_token = create_access_token(user.id)
    refresh_token = create_refresh_token(user.id)

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        expires_in=900,
        user=user,
    )


@router.post(
    "/forgot-password",
    dependencies=[Depends(rate_limit_auth)],
)
def forgot_password(
    data: ForgotPasswordRequest,
    db: Session = Depends(get_db),
):
    email = data.email.lower().strip()
    cooldown_key = f"pwd_reset_cooldown:{email}"
    otp_key = f"pwd_reset:{email}"

    # 1. Verify email service is configured on this server
    if not EmailService.is_configured():
        logger.error("Password reset requested for %s, but SMTP service is not configured.", email)
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Dịch vụ gửi email hiện chưa khả dụng. Vui lòng liên hệ quản trị viên.",
        )

    # 2. Check cooldown in Redis (fail fast if Redis is unavailable)
    try:
        if redis_client.get(cooldown_key):
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Vui lòng đợi 60 giây trước khi yêu cầu mã xác thực mới.",
            )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Redis check cooldown error: {e}")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Hệ thống xác thực tạm thời gián đoạn. Vui lòng thử lại sau.",
        )

    # 3. Lookup user
    user = db.scalar(select(User).where(func.lower(User.email) == email))

    # Standard public response preserving anti-enumeration (OWASP guidelines)
    success_response = {
        "success": True,
        "message": "Nếu email tồn tại trong hệ thống, mã xác thực 6 số đã được gửi tới email của bạn. Vui lòng kiểm tra hộp thư (bao gồm cả thư rác/spam).",
        "expires_in": 300,
    }

    # If user does not exist or is inactive, return standard response without generating/sending OTP
    if not user or not user.is_active:
        return success_response

    # 4. Generate 6-digit OTP
    otp = f"{secrets.randbelow(900000) + 100000}"

    # 5. Save OTP to Redis (must succeed before sending email)
    try:
        payload = json.dumps({"otp": otp, "attempts": 0})
        redis_client.set(otp_key, payload, ex=300)  # 5 minutes TTL
        redis_client.set(cooldown_key, "1", ex=60)  # 60s cooldown
    except Exception as e:
        logger.error(f"Redis set OTP error: {e}")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Hệ thống xác thực tạm thời gián đoạn. Vui lòng thử lại sau.",
        )

    # 6. Dispatch email via SMTP synchronously to verify SMTP server acceptance
    email_sent = EmailService.send_password_reset_otp(email, otp)
    if not email_sent:
        logger.error("Failed to send password reset email to %s", email)
        # Roll back OTP and cooldown so user is not locked out with an unsent OTP
        try:
            redis_client.delete(otp_key)
            redis_client.delete(cooldown_key)
        except Exception as e:
            logger.warning("Failed to clean up OTP after email send failure: %s", e)

        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Không thể gửi email xác thực lúc này do sự cố kết nối máy chủ thư. Vui lòng thử lại sau.",
        )

    return success_response


@router.post(
    "/reset-password",
    dependencies=[Depends(rate_limit_auth)],
)
def reset_password(
    data: ResetPasswordRequest,
    db: Session = Depends(get_db),
):
    email = data.email.lower().strip()
    input_otp = data.otp.strip()
    new_password = data.new_password

    otp_key = f"pwd_reset:{email}"
    raw_data = None
    try:
        raw_data = redis_client.get(otp_key)
    except Exception as e:
        logger.error(f"Redis get error: {e}")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Hệ thống xác thực tạm thời gián đoạn. Vui lòng thử lại sau.",
        )

    if not raw_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Mã xác thực đã hết hạn hoặc không tồn tại. Vui lòng yêu cầu mã mới.",
        )

    try:
        otp_info = json.loads(raw_data)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Mã xác thực không hợp lệ. Vui lòng yêu cầu mã mới.",
        )

    attempts = otp_info.get("attempts", 0)
    stored_otp = otp_info.get("otp", "")

    if attempts >= 5:
        try:
            redis_client.delete(otp_key)
        except Exception as e:
            logger.debug("Redis delete failed: %s", e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Bạn đã nhập sai mã quá 5 lần. Mã xác thực đã bị hủy vì lý do bảo mật. Vui lòng yêu cầu mã mới.",
        )

    if not secrets.compare_digest(str(stored_otp), str(input_otp)):
        otp_info["attempts"] = attempts + 1
        remaining = max(0, 5 - otp_info["attempts"])
        try:
            ttl = redis_client.ttl(otp_key)
            if ttl > 0:
                redis_client.set(otp_key, json.dumps(otp_info), ex=ttl)
        except Exception as e:
            logger.debug("Redis set failed: %s", e)

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Mã xác thực không chính xác. Bạn còn {remaining} lần thử.",
        )

    # Valid OTP -> Update password
    user = db.scalar(select(User).where(func.lower(User.email) == email))
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Người dùng không tồn tại.",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Tài khoản này đã bị khóa.",
        )

    user.password_hash = hash_password(new_password)
    user.updated_at = datetime.now(UTC)
    db.commit()

    # Clear OTP
    try:
        redis_client.delete(otp_key)
        redis_client.delete(f"pwd_reset_cooldown:{email}")
    except Exception as e:
        logger.debug("Redis clear failed: %s", e)

    return {
        "success": True,
        "message": "Đặt lại mật khẩu thành công! Bạn có thể đăng nhập bằng mật khẩu mới ngay bây giờ.",
    }


@router.post(
    "/refresh",
    response_model=TokenResponse,
)
def refresh_token(
    payload: RefreshTokenRequest,
    db: Session = Depends(get_db),
) -> TokenResponse:
    try:
        user_id = decode_refresh_token(payload.refresh_token)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Refresh token không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = db.get(User, user_id)
    if user is None or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Người dùng không tồn tại hoặc tài khoản bị khóa.",
        )

    new_access_token = create_access_token(user.id)
    new_refresh_token = create_refresh_token(user.id)

    return TokenResponse(
        access_token=new_access_token,
        refresh_token=new_refresh_token,
        expires_in=900,
        user=user,
    )


@router.get(
    "/me",
    response_model=UserResponse,
)
def get_me(
    current_user: User = Depends(get_current_user),
) -> UserResponse:
    return current_user
