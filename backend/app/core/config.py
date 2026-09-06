from functools import lru_cache
from typing import Any

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "VanBass Music Center API"
    app_version: str = "0.1.0"

    database_url: str
    redis_url: str

    debug: bool = True

    jwt_secret_key: str
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 15
    refresh_token_expire_days: int = 7

    # VNPAY Payment Gateway
    vnpay_tmn_code: str = ""
    vnpay_hash_secret: str = ""
    vnpay_payment_url: str = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"
    vnpay_ipn_url: str = "http://localhost:8000/api/orders/vnpay/ipn"
    vnpay_backend_return_url: str = "http://localhost:8000/api/orders/vnpay/return"
    vnpay_return_url: str = "http://localhost:3000/payment/result"

    # SMTP / Email Notifications
    smtp_host: str = "smtp.gmail.com"
    smtp_port: int = 587
    smtp_user: str = ""
    smtp_password: str = ""
    smtp_from_email: str = ""
    smtp_from_name: str = "VanBass Music Center"
    smtp_use_tls: bool = True
    shop_notify_emails: str = "admin@vanbass.vn"

    cors_origins: Any = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
    ]

    @field_validator("database_url", mode="before")
    @classmethod
    def assemble_database_url(cls, v: Any) -> Any:
        if isinstance(v, str):
            if v.startswith("postgres://"):
                return v.replace("postgres://", "postgresql+psycopg://", 1)
            if v.startswith("postgresql://") and not v.startswith("postgresql+psycopg://"):
                return v.replace("postgresql://", "postgresql+psycopg://", 1)
        return v

    @field_validator("cors_origins", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Any) -> list[str]:
        if isinstance(v, str):
            clean_v = v.strip()
            if clean_v.startswith("[") and clean_v.endswith("]"):
                clean_v = clean_v[1:-1]
            return [
                item.strip().strip('"').strip("'")
                for item in clean_v.split(",")
                if item.strip().strip('"').strip("'")
            ]
        if isinstance(v, (list, tuple, set)):
            return [str(item) for item in v]
        return []

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
