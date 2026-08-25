from app.api.routes.admin import router as admin_router
from app.api.routes.auth import router as auth_router
from app.api.routes.cart import router as cart_router
from app.api.routes.category import router as category_router
from app.api.routes.customer import router as customer_router
from app.api.routes.home_config import router as home_config_router
from app.api.routes.order import router as order_router
from app.api.routes.payment import router as payment_router
from app.api.routes.product import router as product_router
from app.api.routes.product_image import router as product_image_router
from app.api.routes.rental_payment import router as rental_payment_router
from app.api.routes.rental_request import router as rental_request_router
from app.api.routes.store_setting import router as store_settings_router
from app.api.routes.upload import router as upload_router
from app.api.routes.vnpay import router as vnpay_router

__all__ = [
    "admin_router",
    "auth_router",
    "cart_router",
    "category_router",
    "customer_router",
    "home_config_router",
    "order_router",
    "payment_router",
    "product_image_router",
    "product_router",
    "rental_payment_router",
    "rental_request_router",
    "store_settings_router",
    "upload_router",
    "vnpay_router",
]
