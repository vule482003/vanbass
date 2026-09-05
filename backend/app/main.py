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
    home_config_router,
    order_router,
    product_image_router,
    product_router,
    store_settings_router,
    upload_router,
    vnpay_router,
)
from app.core.config import settings
from app.db.base import Base
from app.db.session import engine

# Ensure tables are created
Base.metadata.create_all(bind=engine)

# Safe schema upgrade for store_settings
try:
    with engine.connect() as conn:
        conn.execute(
            text(
                "ALTER TABLE store_settings ADD COLUMN IF NOT EXISTS facebook_page_id VARCHAR(255) DEFAULT 'vanbassmusiccenter';"
            )
        )
        conn.commit()
except SQLAlchemyError:
    pass

# Ensure static/uploads exists
Path("static/uploads").mkdir(
    parents=True,
    exist_ok=True,
)
Path("static/uploads/homepage").mkdir(
    parents=True,
    exist_ok=True,
)

TAGS_METADATA = [
    {"name": "Auth", "description": "Xác thực và phân quyền người dùng (JWT)."},
    {"name": "Customer", "description": "Hồ sơ và thông tin khách hàng."},
    {"name": "Category", "description": "Quản lý danh mục sản phẩm."},
    {"name": "Product", "description": "Quản lý danh mục thiết bị và sản phẩm."},
    {"name": "Product Images", "description": "Quản lý hình ảnh sản phẩm."},
    {"name": "Cart", "description": "Giỏ hàng lai và đồng bộ đa thiết bị."},
    {"name": "Orders", "description": "Quản lý đặt hàng và trạng thái đơn."},
    {"name": "VNPAY", "description": "Tích hợp cổng thanh toán VNPAY & QR."},
    {
        "name": "Home Config",
        "description": "Cấu hình giao diện và CMS trực quan trang chủ.",
    },
    {
        "name": "Admin",
        "description": "Thống kê tổng quan và quản lý tài khoản nhân viên.",
    },
    {
        "name": "Store Settings",
        "description": "Cấu hình thông tin liên hệ và mạng xã hội cửa hàng.",
    },
    {"name": "Upload", "description": "Xử lý tải lên tệp tin và hình ảnh."},
    {"name": "Health", "description": "Kiểm tra tình trạng hoạt động hệ thống."},
]

app = FastAPI(
    title=settings.app_name,
    description=(
        "Backend API for VanBass Music Center "
        "with SEO optimizations & High-performance Caching."
    ),
    version=settings.app_version,
    openapi_tags=TAGS_METADATA,
)


# Configure CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Mount Static Files (Uploads)
app.mount(
    "/static",
    StaticFiles(directory="static"),
    name="static",
)


# Register Active API Routers
app.include_router(auth_router, prefix="/api")
app.include_router(customer_router, prefix="/api")
app.include_router(category_router, prefix="/api")
app.include_router(product_router, prefix="/api")
app.include_router(product_image_router, prefix="/api")
app.include_router(cart_router, prefix="/api")
app.include_router(order_router, prefix="/api")
app.include_router(vnpay_router, prefix="/api")
app.include_router(store_settings_router, prefix="/api")
app.include_router(upload_router, prefix="/api")
app.include_router(home_config_router, prefix="/api")
app.include_router(admin_router, prefix="/api")


@app.get(
    "/health",
    tags=["Health"],
)
def health_check() -> dict[str, str]:
    return {
        "status": "ok",
        "service": "vanbass-api",
    }


@app.get(
    "/health/db",
    tags=["Health"],
)
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
