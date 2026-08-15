from app.api.routes.admin import router as admin_router
from app.api.routes.auth import router as auth_router
from app.api.routes.category import router as category_router
from app.api.routes.customer import router as customer_router
from app.api.routes.product import router as product_router
from app.api.routes.product_image import router as product_image_router
from app.api.routes.store_setting import router as store_settings_router
from app.api.routes.cart import router as cart_router


__all__ = [
    "admin_router",
    "auth_router",
    "category_router",
    "customer_router",
    "product_router",
    "product_image_router",
    "store_settings_router",
    "cart_router",
]