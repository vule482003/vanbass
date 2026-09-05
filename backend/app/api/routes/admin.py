import json
import logging
from decimal import Decimal
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field
from redis.exceptions import RedisError
from sqlalchemy import func, select
from sqlalchemy.orm import Session, selectinload

from app.api.dependencies import get_db, require_admin, require_staff_or_admin
from app.core.redis import redis_client
from app.core.security import hash_password
from app.models.customer_profile import CustomerProfile
from app.models.order import Order, PaymentStatus
from app.models.order_item import OrderItem
from app.models.payment import Payment, PaymentMethod, PaymentTransactionStatus
from app.models.product import Product
from app.models.rental_request import RentalRequest
from app.models.user import User, UserRole

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
)


class CreateStaffRequest(BaseModel):
    email: str = Field(min_length=5, max_length=255)
    phone: str = Field(min_length=8, max_length=30)
    full_name: str = Field(min_length=1, max_length=255)
    password: str = Field(min_length=6, max_length=100)
    role: str = Field(default="staff")


class UpdateStaffRequest(BaseModel):
    phone: str | None = None
    full_name: str | None = None
    role: str | None = None
    is_active: bool | None = None
    password: str | None = None


@router.get("/dashboard")
def get_admin_dashboard(
    current_user: User = Depends(require_staff_or_admin),
    db: Session = Depends(get_db),
) -> dict:
    cache_key = "cache:admin:dashboard"
    try:
        cached_data = redis_client.get(cache_key)
        if cached_data:
            return json.loads(cached_data)
    except (RedisError, json.JSONDecodeError) as err:
        logger.debug("Redis cache miss or read error: %s", err)

    total_users = db.scalar(select(func.count(User.id))) or 0

    total_products = db.scalar(select(func.count(Product.id))) or 0

    active_products = (
        db.scalar(select(func.count(Product.id)).where(Product.is_active.is_(True)))
        or 0
    )

    # Only count valid orders: either PAID or COD (exclude abandoned online payment spam)
    online_unpaid_order_ids = select(Payment.order_id).where(
        Payment.order_id.is_not(None),
        Payment.payment_method.in_(
            [
                PaymentMethod.VIETQR,
                PaymentMethod.BANK_TRANSFER,
                PaymentMethod.CARD,
            ]
        ),
    )
    total_orders = (
        db.scalar(
            select(func.count(Order.id)).where(
                (Order.payment_status == PaymentStatus.PAID)
                | (~Order.id.in_(online_unpaid_order_ids))
            )
        )
        or 0
    )

    total_rental_requests = db.scalar(select(func.count(RentalRequest.id))) or 0

    pending_rental_requests = (
        db.scalar(
            select(func.count(RentalRequest.id)).where(
                RentalRequest.status == "pending"
            )
        )
        or 0
    )

    paid_revenue = db.scalar(
        select(func.coalesce(func.sum(Payment.amount), 0)).where(
            Payment.status == PaymentTransactionStatus.PAID,
            Payment.order_id.is_not(None),
        )
    ) or Decimal(0)

    rental_revenue = db.scalar(
        select(func.coalesce(func.sum(Payment.amount), 0)).where(
            Payment.status == PaymentTransactionStatus.PAID,
            Payment.rental_request_id.is_not(None),
        )
    ) or Decimal(0)

    # Recent 5 orders with items loaded
    recent_orders_stmt = (
        select(Order)
        .options(selectinload(Order.items))
        .order_by(Order.created_at.desc())
        .limit(5)
    )
    recent_orders_db = db.scalars(recent_orders_stmt).all()
    recent_orders = [
        {
            "id": str(o.id),
            "order_number": o.order_number,
            "shipping_name": o.shipping_name,
            "shipping_phone": o.shipping_phone,
            "shipping_address": o.shipping_address,
            "customer_note": o.customer_note,
            "subtotal": float(o.subtotal),
            "shipping_fee": float(o.shipping_fee),
            "total_amount": float(o.total_amount),
            "status": o.status.value if hasattr(o.status, "value") else str(o.status),
            "payment_status": (
                o.payment_status.value
                if hasattr(o.payment_status, "value")
                else str(o.payment_status)
            ),
            "created_at": o.created_at.isoformat() if o.created_at else None,
            "items": [
                {
                    "id": str(item.id),
                    "product_id": str(item.product_id),
                    "product_name": item.product_name,
                    "sku": item.sku,
                    "quantity": item.quantity,
                    "unit_price": float(item.unit_price),
                    "subtotal": float(item.subtotal),
                }
                for item in o.items
            ],
        }
        for o in recent_orders_db
    ]

    # Top 5 selling products aggregated from OrderItem
    top_items_stmt = (
        select(
            OrderItem.product_id,
            OrderItem.product_name,
            OrderItem.sku,
            func.sum(OrderItem.quantity).label("units_sold"),
            func.sum(OrderItem.subtotal).label("revenue"),
        )
        .group_by(OrderItem.product_id, OrderItem.product_name, OrderItem.sku)
        .order_by(func.sum(OrderItem.quantity).desc())
        .limit(5)
    )
    top_items_db = db.execute(top_items_stmt).all()

    top_selling_products = []
    seen_ids: set[str] = set()

    for item in top_items_db:
        pid_str = str(item.product_id)
        seen_ids.add(pid_str)
        prod = db.scalars(
            select(Product)
            .options(selectinload(Product.images))
            .where(Product.id == item.product_id)
        ).first()
        top_selling_products.append(
            {
                "id": pid_str,
                "name": item.product_name,
                "sku": item.sku,
                "slug": prod.slug if prod else "",
                "units_sold": int(item.units_sold),
                "revenue": float(item.revenue),
                "image_url": prod.images[0].image_url if prod and prod.images else None,
                "sale_price": float(prod.sale_price)
                if prod and prod.sale_price
                else 0.0,
                "rental_enabled": prod.rental_enabled if prod else False,
                "stock_quantity": prod.stock_quantity if prod else 0,
            }
        )

    # If fewer than 5 items have been ordered, pad with active products
    if len(top_selling_products) < 5:
        fallback_prods = db.scalars(
            select(Product)
            .options(selectinload(Product.images))
            .where(Product.is_active.is_(True))
            .order_by(Product.created_at.desc())
            .limit(5 - len(top_selling_products))
        ).all()
        for p in fallback_prods:
            pid_str = str(p.id)
            if pid_str not in seen_ids:
                seen_ids.add(pid_str)
                top_selling_products.append(
                    {
                        "id": pid_str,
                        "name": p.name,
                        "sku": p.sku,
                        "slug": p.slug,
                        "units_sold": 0,
                        "revenue": 0.0,
                        "image_url": p.images[0].image_url if p.images else None,
                        "sale_price": float(p.sale_price) if p.sale_price else 0.0,
                        "rental_enabled": p.rental_enabled,
                        "stock_quantity": p.stock_quantity,
                    }
                )

    result = {
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
            "order": float(paid_revenue),
            "rental": float(rental_revenue),
            "total": float(paid_revenue + rental_revenue),
            "currency": "VND",
        },
        "recent_orders": recent_orders,
        "top_selling_products": top_selling_products,
    }

    try:
        redis_client.setex(cache_key, 45, json.dumps(result))
    except RedisError as err:
        logger.debug("Failed to set dashboard Redis cache: %s", err)

    return result


# ---------------------------------------------------------------------------
# Account / Staff Management Endpoints
# ---------------------------------------------------------------------------


@router.get("/users")
def list_admin_users(
    role: str | None = Query(None),
    search: str | None = Query(None),
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> dict:
    if role and role.lower() in ["admin", "staff"]:
        query = (
            select(User)
            .where(User.role == UserRole(role.lower()))
            .order_by(User.created_at.desc())
        )
    elif role and role.lower() == "customer":
        query = (
            select(User)
            .where(User.role == UserRole.CUSTOMER)
            .order_by(User.created_at.desc())
        )
    else:
        # Mặc định bảng quản lý nhân sự: chỉ trả về tài khoản admin và staff
        query = (
            select(User)
            .where(User.role.in_([UserRole.ADMIN, UserRole.STAFF]))
            .order_by(User.created_at.desc())
        )

    users = db.execute(query).scalars().all()
    results = []
    for u in users:
        p = u.profile
        full_name = (
            p.full_name if p and p.full_name else u.email.split("@")[0]
        ).strip()
        phone = (p.phone if p and p.phone else "").strip()
        if search:
            s = search.lower().strip()
            if (
                s not in u.email.lower()
                and s not in full_name.lower()
                and s not in phone.lower()
            ):
                continue
        results.append(
            {
                "id": str(u.id),
                "email": u.email,
                "role": u.role.value if hasattr(u.role, "value") else str(u.role),
                "is_active": u.is_active,
                "full_name": full_name,
                "phone": phone,
                "created_at": u.created_at.isoformat() if u.created_at else None,
            }
        )
    return {"items": results, "total": len(results)}


@router.post("/users", status_code=status.HTTP_201_CREATED)
def create_staff_user(
    data: CreateStaffRequest,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> dict:
    clean_email = data.email.strip().lower()
    existing = db.execute(
        select(User).where(User.email == clean_email)
    ).scalar_one_or_none()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Email '{clean_email}' đã tồn tại trong hệ thống.",
        )

    role_str = (data.role or "staff").lower().strip()
    assigned_role = UserRole.ADMIN if role_str == "admin" else UserRole.STAFF
    new_user = User(
        email=clean_email,
        password_hash=hash_password(data.password),
        role=assigned_role,
        is_active=True,
    )
    db.add(new_user)
    db.flush()

    new_profile = CustomerProfile(
        user_id=new_user.id,
        full_name=data.full_name.strip(),
        phone=data.phone.strip(),
        country="Vietnam",
        city="Đà Nẵng",
        address="Văn phòng VanBass",
    )
    db.add(new_profile)
    db.commit()
    db.refresh(new_user)

    return {
        "id": str(new_user.id),
        "email": new_user.email,
        "role": new_user.role.value
        if hasattr(new_user.role, "value")
        else str(new_user.role),
        "is_active": new_user.is_active,
        "full_name": data.full_name.strip(),
        "phone": data.phone.strip(),
        "created_at": new_user.created_at.isoformat() if new_user.created_at else None,
        "message": "Tạo tài khoản nhân viên thành công.",
    }


@router.patch("/users/{user_id}")
def update_staff_user(
    user_id: UUID,
    data: UpdateStaffRequest,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> dict:
    target_user = db.get(User, user_id)
    if not target_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Không tìm thấy người dùng."
        )

    if target_user.id == current_user.id:
        if data.is_active is not None and not data.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Không thể tự khóa hoặc xóa chính mình",
            )
        if data.role is not None and data.role.lower() != current_user.role.value:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Không thể tự khóa hoặc xóa chính mình",
            )

    if data.is_active is not None:
        target_user.is_active = data.is_active

    if data.role is not None:
        role_str = data.role.lower().strip()
        target_user.role = (
            UserRole.ADMIN
            if role_str == "admin"
            else (UserRole.STAFF if role_str == "staff" else UserRole.CUSTOMER)
        )

    if data.password:
        target_user.password_hash = hash_password(data.password)

    if data.full_name is not None or data.phone is not None:
        if target_user.profile:
            if data.full_name is not None:
                target_user.profile.full_name = data.full_name.strip()
            if data.phone is not None:
                target_user.profile.phone = data.phone.strip()
        else:
            new_profile = CustomerProfile(
                user_id=target_user.id,
                full_name=(data.full_name or target_user.email.split("@")[0]).strip(),
                phone=(data.phone or "").strip(),
                country="Vietnam",
                city="Đà Nẵng",
                address="Văn phòng VanBass",
            )
            db.add(new_profile)

    db.commit()
    db.refresh(target_user)
    return {"message": "Cập nhật tài khoản thành công."}


@router.delete("/users/{user_id}")
def delete_staff_user(
    user_id: UUID,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> dict:
    target_user = db.get(User, user_id)
    if not target_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Không tìm thấy người dùng."
        )

    if target_user.id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Không thể tự khóa hoặc xóa chính mình",
        )

    db.delete(target_user)
    db.commit()
    return {"message": "Đã xóa tài khoản thành công."}
