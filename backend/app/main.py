from fastapi import FastAPI
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from app.api.routes import auth_router
from app.db.session import engine
from app.api.routes import auth_router, customer_router

from app.api.routes import (
    admin_router,
    auth_router,
    category_router,
    customer_router,
    product_router,
    product_image_router,
)

app = FastAPI(
    title="VanBass Music Center API",
    description="Backend API for VanBass Music Center.",
    version="0.1.0",
)

app.include_router(
    product_image_router,
    prefix="/api",
)

app.include_router(
    product_router,
    prefix="/api",
)

app.include_router(
    category_router,
    prefix="/api",
)

app.include_router(
    admin_router,
    prefix="/api",
)

app.include_router(
    auth_router,
    prefix="/api",
)

app.include_router(
    auth_router,
    prefix="/api",
)

app.include_router(
    customer_router,
    prefix="/api",
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