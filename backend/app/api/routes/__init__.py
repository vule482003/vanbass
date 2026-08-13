from app.api.routes.auth import router as auth_router
from app.api.routes.customer import router as customer_router

__all__ = [
    "auth_router",
    "customer_router",
]