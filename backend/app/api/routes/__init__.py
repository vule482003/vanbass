from app.api.routes.admin import router as admin_router
from app.api.routes.auth import router as auth_router
from app.api.routes.cart import router as cart_router
from app.api.routes.category import router as category_router
from app.api.routes.customer import router as customer_router
from app.api.routes.order import router as order_router
from app.api.routes.product import router as product_router
from app.api.routes.product_image import router as product_image_router
<<<<<<< HEAD
from app.api.routes.store_setting import router as store_settings_router
from app.api.routes.cart import router as cart_router
from app.api.routes.order import router as order_router
from app.api.routes.rental_request import router as rental_request_router
from app.api.routes.payment import router as payment_router
from app.api.routes.rental_payment import router as rental_payment_router

=======
from app.api.routes.rental_request import router as rental_request_router
from app.api.routes.upload import router as upload_router
>>>>>>> 201b4c121c9fbc2f3e1a969c00b0a2a178f68102

__all__ = [
    "admin_router",
    "auth_router",
    "cart_router",
    "category_router",
    "customer_router",
    "order_router",
    "product_router",
    "product_image_router",
<<<<<<< HEAD
    "store_settings_router",
    "cart_router",
    "order_router",
    "rental_request_router",
    "payment_router",
    "rental_payment_router",
=======
    "rental_request_router",
    "upload_router",
>>>>>>> 201b4c121c9fbc2f3e1a969c00b0a2a178f68102
]