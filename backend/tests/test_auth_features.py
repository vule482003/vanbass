import json
import logging

from fastapi.testclient import TestClient
from sqlalchemy import select

from app.core.redis import redis_client
from app.core.security import hash_password
from app.db.session import SessionLocal
from app.main import app
from app.models.user import User, UserRole

logger = logging.getLogger(__name__)

client = TestClient(app)


def test_login_with_username_and_email():
    """Test that a user can login using either their full email or username prefix"""
    db = SessionLocal()
    test_email = "testuser_dj@vanbass.vn"
    password = "TestPassword123!"

    # Clean up or create test user
    user = db.scalar(select(User).where(User.email == test_email))
    if not user:
        user = User(
            email=test_email,
            password_hash=hash_password(password),
            role=UserRole.CUSTOMER,
            is_active=True,
        )
        db.add(user)
        db.commit()
    db.close()

    # 1. Login with full email
    res1 = client.post(
        "/api/auth/login",
        json={"email": test_email, "password": password},
    )
    assert res1.status_code == 200
    assert "access_token" in res1.json()

    # 2. Login with username prefix (without @vanbass.vn)
    res2 = client.post(
        "/api/auth/login",
        json={"login_id": "testuser_dj", "password": password},
    )
    assert res2.status_code == 200
    assert "access_token" in res2.json()

    # 3. Login with wrong password
    res3 = client.post(
        "/api/auth/login",
        json={"login_id": "testuser_dj", "password": "WrongPassword999"},
    )
    assert res3.status_code == 401


def test_forgot_and_reset_password_flow():
    """Test forgot-password OTP generation and reset-password flow"""
    db = SessionLocal()
    test_email = "reset_user@vanbass.vn"
    old_password = "OldPassword123!"
    new_password = "NewPassword456!"

    user = db.scalar(select(User).where(User.email == test_email))
    if not user:
        user = User(
            email=test_email,
            password_hash=hash_password(old_password),
            role=UserRole.CUSTOMER,
            is_active=True,
        )
        db.add(user)
        db.commit()
    db.close()

    # 1. Request OTP
    try:
        redis_client.delete(f"pwd_reset_cooldown:{test_email}")
        redis_client.delete(f"pwd_reset:{test_email}")
    except (ConnectionError, TimeoutError) as err:
        logger.warning("Redis cleanup warning: %s", err)

    res_forgot = client.post(
        "/api/auth/forgot-password",
        json={"email": test_email},
    )
    assert res_forgot.status_code == 200
    assert res_forgot.json()["success"] is True

    # Check OTP stored in Redis
    raw_otp = redis_client.get(f"pwd_reset:{test_email}")
    assert raw_otp is not None
    otp_data = json.loads(raw_otp)
    otp = otp_data["otp"]
    assert len(otp) == 6

    # 2. Test wrong OTP
    res_wrong = client.post(
        "/api/auth/reset-password",
        json={"email": test_email, "otp": "000000", "new_password": new_password},
    )
    assert res_wrong.status_code == 400
    assert "không chính xác" in res_wrong.json()["detail"]

    # 3. Test correct OTP
    res_reset = client.post(
        "/api/auth/reset-password",
        json={"email": test_email, "otp": otp, "new_password": new_password},
    )
    assert res_reset.status_code == 200
    assert res_reset.json()["success"] is True

    # 4. Login with new password
    res_login_new = client.post(
        "/api/auth/login",
        json={"email": test_email, "password": new_password},
    )
    assert res_login_new.status_code == 200

    # 5. Login with old password fails
    res_login_old = client.post(
        "/api/auth/login",
        json={"email": test_email, "password": old_password},
    )
    assert res_login_old.status_code == 401
