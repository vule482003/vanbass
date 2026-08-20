import os
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from app.api.routes import (
    admin_router,
    auth_router,
    cart_router,
    category_router,
    customer_router,
    order_router,
    product_image_router,
    product_router,
    rental_request_router,
<<<<<<< HEAD
    store_settings_router,
    cart_router,
    order_router,
    payment_router,
    rental_payment_router,
)
from app.db.session import engine

=======
    upload_router,
)
from app.core.config import settings
from app.db.session import engine

# Ensure static/uploads exists
Path("static/uploads").mkdir(parents=True, exist_ok=True)
>>>>>>> 201b4c121c9fbc2f3e1a969c00b0a2a178f68102

app = FastAPI(
    title=settings.app_name,
    description="Backend API for VanBass Music Center with SEO optimizations & High-performance Caching.",
    version=settings.app_version,
)

<<<<<<< HEAD
app.include_router(
    rental_payment_router,
    prefix="/api",
)

app.include_router(
    payment_router,
    prefix="/api",
)

app.include_router(
    order_router,
    prefix="/api",
)

app.include_router(
    rental_request_router,
    prefix="/api",
)

app.include_router(
    cart_router,
    prefix="/api",
)

app.include_router(
    store_settings_router,
    prefix="/api",
)

app.include_router(
    product_image_router,
    prefix="/api",
=======
# Configure CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
>>>>>>> 201b4c121c9fbc2f3e1a969c00b0a2a178f68102
)

# Mount Static Files (Uploads)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Register API Routers
app.include_router(auth_router, prefix="/api")
app.include_router(customer_router, prefix="/api")
app.include_router(category_router, prefix="/api")
app.include_router(product_router, prefix="/api")
app.include_router(product_image_router, prefix="/api")
app.include_router(cart_router, prefix="/api")
app.include_router(order_router, prefix="/api")
app.include_router(rental_request_router, prefix="/api")
app.include_router(upload_router, prefix="/api")
app.include_router(admin_router, prefix="/api")


<<<<<<< HEAD
app.include_router(
    auth_router,
    prefix="/api",
)

app.include_router(
    customer_router,
    prefix="/api",
)


@app.get("/health")
=======
@app.get("/health", tags=["Health"])
>>>>>>> 201b4c121c9fbc2f3e1a969c00b0a2a178f68102
def health_check() -> dict[str, str]:
    return {
        "status": "ok",
        "service": "vanbass-api",
    }


@app.get("/health/db", tags=["Health"])
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