from functools import lru_cache

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

    cors_origins: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
    ]

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()