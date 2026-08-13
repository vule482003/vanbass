from fastapi import FastAPI
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from app.db.session import engine


app = FastAPI(
    title="VanBass Music Center API",
    description="Backend API for VanBass Music Center.",
    version="0.1.0",
)


@app.get("/health")
def health_check() -> dict[str, str]:
    return {
        "status": "ok",
        "service": "vanbass-api",
    }


@app.get("/health/db")
def database_health_check() -> dict[str, str]:
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "status": "ok",
            "database": "connected",
        }

    except SQLAlchemyError:
        return {
            "status": "error",
            "database": "disconnected",
        }