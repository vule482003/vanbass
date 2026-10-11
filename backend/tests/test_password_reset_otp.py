import json
import smtplib
from unittest.mock import MagicMock, patch

import pytest
from fastapi import status
from fastapi.testclient import TestClient

from app.api.dependencies import get_db
from app.core.rate_limit import rate_limit_auth
from app.core.security import verify_password
from app.main import app
from app.models.user import User, UserRole
from app.services.email_service import EmailService

client = TestClient(app)


@pytest.fixture(autouse=True)
def override_rate_limit():
    app.dependency_overrides[rate_limit_auth] = lambda: None
    yield
    app.dependency_overrides.pop(rate_limit_auth, None)


# =========================================================================
# 1. SMTP unconfigured: does not falsely report success
# =========================================================================
def test_smtp_unconfigured_returns_503():
    with patch.object(EmailService, "is_configured", return_value=False):
        res = client.post(
            "/api/auth/forgot-password",
            json={"email": "user@vanbass.vn"},
        )
        assert res.status_code == status.HTTP_503_SERVICE_UNAVAILABLE
        assert "Dịch vụ gửi email hiện chưa khả dụng" in res.json()["detail"]


def test_send_sync_returns_false_when_unconfigured():
    with patch.object(EmailService, "is_configured", return_value=False):
        result = EmailService._send_sync(
            to_emails=["test@example.com"],
            subject="Test",
            html_content="<p>Test</p>",
        )
        assert result is False


# =========================================================================
# 2. SMTP configured and send successful: full flow works
# =========================================================================
def test_smtp_configured_and_successful_send():
    mock_db = MagicMock()
    mock_user = User(
        id="usr-123",
        email="test_success@vanbass.vn",
        password_hash="hashed_old_password",
        role=UserRole.CUSTOMER,
        is_active=True,
    )
    mock_db.scalar.return_value = mock_user

    mock_redis = MagicMock()
    mock_redis.get.return_value = None  # No cooldown

    app.dependency_overrides[get_db] = lambda: mock_db
    try:
        with (
            patch.object(EmailService, "is_configured", return_value=True),
            patch.object(EmailService, "send_password_reset_otp", return_value=True) as mock_send,
            patch("app.api.routes.auth.redis_client", mock_redis),
        ):
            res = client.post(
                "/api/auth/forgot-password",
                json={"email": "test_success@vanbass.vn"},
            )
            assert res.status_code == status.HTTP_200_OK
            assert res.json()["success"] is True
            assert res.json()["expires_in"] == 300
            assert "Nếu email tồn tại trong hệ thống" in res.json()["message"]

            # Verify OTP saved to Redis
            assert mock_redis.set.call_count == 2  # OTP payload + cooldown
            mock_send.assert_called_once()
    finally:
        app.dependency_overrides.pop(get_db, None)


# =========================================================================
# 3. SMTP authentication error / timeout / connection failure handled
# =========================================================================
def test_send_sync_catches_smtp_authentication_error():
    with (
        patch.object(EmailService, "is_configured", return_value=True),
        patch("smtplib.SMTP") as mock_smtp,
    ):
        instance = mock_smtp.return_value.__enter__.return_value
        instance.login.side_effect = smtplib.SMTPAuthenticationError(535, b"Auth failed")

        result = EmailService._send_sync(
            to_emails=["test@example.com"],
            subject="Test Auth Error",
            html_content="<p>Test</p>",
        )
        assert result is False


def test_send_sync_catches_smtp_connect_error():
    with (
        patch.object(EmailService, "is_configured", return_value=True),
        patch("smtplib.SMTP", side_effect=smtplib.SMTPConnectError(421, "Connection refused")),
    ):
        result = EmailService._send_sync(
            to_emails=["test@example.com"],
            subject="Test Connect Error",
            html_content="<p>Test</p>",
        )
        assert result is False


def test_send_sync_catches_timeout_error():
    with (
        patch.object(EmailService, "is_configured", return_value=True),
        patch("smtplib.SMTP", side_effect=TimeoutError("Connection timed out")),
    ):
        result = EmailService._send_sync(
            to_emails=["test@example.com"],
            subject="Test Timeout",
            html_content="<p>Test</p>",
        )
        assert result is False


# =========================================================================
# 4. Redis cannot save OTP: does not report success
# =========================================================================
def test_redis_save_failure_returns_503():
    mock_db = MagicMock()
    mock_user = User(
        id="usr-456",
        email="redis_fail@vanbass.vn",
        password_hash="hashed_old_password",
        role=UserRole.CUSTOMER,
        is_active=True,
    )
    mock_db.scalar.return_value = mock_user

    mock_redis = MagicMock()
    mock_redis.get.return_value = None
    mock_redis.set.side_effect = Exception("Redis connection refused")

    app.dependency_overrides[get_db] = lambda: mock_db
    try:
        with (
            patch.object(EmailService, "is_configured", return_value=True),
            patch.object(EmailService, "send_password_reset_otp") as mock_send,
            patch("app.api.routes.auth.redis_client", mock_redis),
        ):
            res = client.post(
                "/api/auth/forgot-password",
                json={"email": "redis_fail@vanbass.vn"},
            )
            assert res.status_code == status.HTTP_503_SERVICE_UNAVAILABLE
            assert "Hệ thống xác thực tạm thời gián đoạn" in res.json()["detail"]
            # Email must NOT be sent if Redis failed to store OTP
            mock_send.assert_not_called()
    finally:
        app.dependency_overrides.pop(get_db, None)


# =========================================================================
# 5. Redis saves OTP but SMTP fails: OTP rolled back, cooldown not stuck
# =========================================================================
def test_smtp_send_failure_rolls_back_otp():
    mock_db = MagicMock()
    mock_user = User(
        id="usr-789",
        email="smtp_fail@vanbass.vn",
        password_hash="hashed_old_password",
        role=UserRole.CUSTOMER,
        is_active=True,
    )
    mock_db.scalar.return_value = mock_user

    mock_redis = MagicMock()
    mock_redis.get.return_value = None

    app.dependency_overrides[get_db] = lambda: mock_db
    try:
        with (
            patch.object(EmailService, "is_configured", return_value=True),
            patch.object(EmailService, "send_password_reset_otp", return_value=False),
            patch("app.api.routes.auth.redis_client", mock_redis),
        ):
            res = client.post(
                "/api/auth/forgot-password",
                json={"email": "smtp_fail@vanbass.vn"},
            )
            assert res.status_code == status.HTTP_503_SERVICE_UNAVAILABLE
            assert "Không thể gửi email xác thực" in res.json()["detail"]

            # Verify OTP and cooldown were deleted to avoid stuck user
            deleted_keys = [call.args[0] for call in mock_redis.delete.call_args_list]
            assert "pwd_reset:smtp_fail@vanbass.vn" in deleted_keys
            assert "pwd_reset_cooldown:smtp_fail@vanbass.vn" in deleted_keys
    finally:
        app.dependency_overrides.pop(get_db, None)


# =========================================================================
# 6. Non-existent email: public response does not reveal account existence
# =========================================================================
def test_nonexistent_email_does_not_reveal_existence():
    mock_db = MagicMock()
    mock_db.scalar.return_value = None  # User does not exist

    mock_redis = MagicMock()
    mock_redis.get.return_value = None

    app.dependency_overrides[get_db] = lambda: mock_db
    try:
        with (
            patch.object(EmailService, "is_configured", return_value=True),
            patch.object(EmailService, "send_password_reset_otp") as mock_send,
            patch("app.api.routes.auth.redis_client", mock_redis),
        ):
            res = client.post(
                "/api/auth/forgot-password",
                json={"email": "nonexistent_account@vanbass.vn"},
            )
            assert res.status_code == status.HTTP_200_OK
            assert res.json()["success"] is True
            assert "Nếu email tồn tại trong hệ thống" in res.json()["message"]
            # No email sent, no OTP stored
            mock_send.assert_not_called()
            mock_redis.set.assert_not_called()
    finally:
        app.dependency_overrides.pop(get_db, None)


# =========================================================================
# 7. Expired OTP, wrong OTP > 5 times, and invalid OTP
# =========================================================================
def test_reset_password_expired_or_missing_otp():
    mock_redis = MagicMock()
    mock_redis.get.return_value = None

    with patch("app.api.routes.auth.redis_client", mock_redis):
        res = client.post(
            "/api/auth/reset-password",
            json={"email": "any@vanbass.vn", "otp": "123456", "new_password": "NewPassword123!"},
        )
        assert res.status_code == status.HTTP_400_BAD_REQUEST
        assert "hết hạn hoặc không tồn tại" in res.json()["detail"]


def test_reset_password_wrong_otp_increments_attempts():
    mock_redis = MagicMock()
    mock_redis.get.return_value = json.dumps({"otp": "654321", "attempts": 1})
    mock_redis.ttl.return_value = 250

    with patch("app.api.routes.auth.redis_client", mock_redis):
        res = client.post(
            "/api/auth/reset-password",
            json={"email": "any@vanbass.vn", "otp": "000000", "new_password": "NewPassword123!"},
        )
        assert res.status_code == status.HTTP_400_BAD_REQUEST
        assert "Mã xác thực không chính xác. Bạn còn 3 lần thử." in res.json()["detail"]


def test_reset_password_exceeds_max_attempts():
    mock_redis = MagicMock()
    mock_redis.get.return_value = json.dumps({"otp": "654321", "attempts": 5})

    with patch("app.api.routes.auth.redis_client", mock_redis):
        res = client.post(
            "/api/auth/reset-password",
            json={"email": "any@vanbass.vn", "otp": "000000", "new_password": "NewPassword123!"},
        )
        assert res.status_code == status.HTTP_400_BAD_REQUEST
        assert "quá 5 lần" in res.json()["detail"]
        mock_redis.delete.assert_called_with("pwd_reset:any@vanbass.vn")


# =========================================================================
# 8. Successful password reset invalidates OTP and updates password
# =========================================================================
def test_reset_password_success():
    mock_db = MagicMock()
    user = User(
        id="usr-reset-ok",
        email="reset_ok@vanbass.vn",
        password_hash="old_hashed_password",
        role=UserRole.CUSTOMER,
        is_active=True,
    )
    mock_db.scalar.return_value = user

    mock_redis = MagicMock()
    mock_redis.get.return_value = json.dumps({"otp": "123456", "attempts": 0})

    app.dependency_overrides[get_db] = lambda: mock_db
    try:
        with patch("app.api.routes.auth.redis_client", mock_redis):
            res = client.post(
                "/api/auth/reset-password",
                json={"email": "reset_ok@vanbass.vn", "otp": "123456", "new_password": "NewBrandPassword123!"},
            )
            assert res.status_code == status.HTTP_200_OK
            assert res.json()["success"] is True

            # Password was updated
            assert user.password_hash != "old_hashed_password"
            assert verify_password("NewBrandPassword123!", user.password_hash)

            # OTP & cooldown purged from Redis
            deleted_keys = [call.args[0] for call in mock_redis.delete.call_args_list]
            assert "pwd_reset:reset_ok@vanbass.vn" in deleted_keys
            assert "pwd_reset_cooldown:reset_ok@vanbass.vn" in deleted_keys
    finally:
        app.dependency_overrides.pop(get_db, None)


# =========================================================================
# 9. Email test endpoint and async failure callback
# =========================================================================
def test_send_test_email_unconfigured():
    with patch.object(EmailService, "is_configured", return_value=False):
        result = EmailService.send_test_email("admin@vanbass.vn")
        assert result["success"] is False
        assert result["smtp_configured"] is False
        assert "Vui lòng cấu hình" in result["message"]


def test_send_test_email_configured_success():
    with (
        patch.object(EmailService, "is_configured", return_value=True),
        patch.object(EmailService, "_send_sync", return_value=True),
    ):
        result = EmailService.send_test_email("admin@vanbass.vn")
        assert result["success"] is True
        assert result["smtp_configured"] is True
        assert "thành công" in result["message"]
