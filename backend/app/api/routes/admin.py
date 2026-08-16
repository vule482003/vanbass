from decimal import Decimal

from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.api.dependencies import get_db, require_admin
from app.models.order import Order
from app.models.payment import Payment, PaymentTransactionStatus
from app.models.product import Product
from app.models.rental_request import RentalRequest
from app.models.user import User


router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
)


@router.get("/me")
def get_admin_me(
    current_user: User = Depends(require_admin),
) -> dict[str, str]:
    return {
        "message": "Admin access granted",
        "email": current_user.email,
        "role": current_user.role.value,
    }


@router.get("/dashboard")
def get_admin_dashboard(
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> dict:
    total_users = db.scalar(
        select(func.count(User.id))
    ) or 0

    total_products = db.scalar(
        select(func.count(Product.id))
    ) or 0

    active_products = db.scalar(
        select(func.count(Product.id)).where(
            Product.is_active.is_(True)
        )
    ) or 0

    total_orders = db.scalar(
        select(func.count(Order.id))
    ) or 0

    total_rental_requests = db.scalar(
        select(func.count(RentalRequest.id))
    ) or 0

    pending_rental_requests = db.scalar(
        select(func.count(RentalRequest.id)).where(
            RentalRequest.status == "pending"
        )
    ) or 0

    paid_revenue = db.scalar(
        select(func.coalesce(func.sum(Payment.amount), 0)).where(
            Payment.status == PaymentTransactionStatus.PAID,
            Payment.order_id.is_not(None),
        )
    ) or Decimal("0")

    rental_revenue = db.scalar(
        select(func.coalesce(func.sum(Payment.amount), 0)).where(
            Payment.status == PaymentTransactionStatus.PAID,
            Payment.rental_request_id.is_not(None),
        )
    ) or Decimal("0")

    return {
        "users": {
            "total": total_users,
        },
        "products": {
            "total": total_products,
            "active": active_products,
        },
        "orders": {
            "total": total_orders,
        },
        "rental_requests": {
            "total": total_rental_requests,
            "pending": pending_rental_requests,
        },
        "revenue": {
            "order": paid_revenue,
            "rental": rental_revenue,
            "total": paid_revenue + rental_revenue,
            "currency": "VND",
        },
    }