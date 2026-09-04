from decimal import Decimal
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.api.dependencies import get_db, require_admin
from app.core.security import hash_password
from app.models.customer_profile import CustomerProfile
from app.models.order import Order, PaymentStatus
from app.models.payment import Payment, PaymentMethod, PaymentTransactionStatus
from app.models.product import Product
from app.models.rental_request import RentalRequest
from app.models.user import User, UserRole

router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
)


class CreateStaffRequest(BaseModel):
    email: str = Field(min_length=5, max_length=255)
    phone: str = Field(min_length=8, max_length=30)
    full_name: str = Field(min_length=1, max_length=255)
    password: str = Field(min_length=6, max_length=100)
    role: str = Field(default="admin")


class UpdateStaffRequest(BaseModel):
    phone: str | None = None
    full_name: str | None = None
    role: str | None = None
    is_active: bool | None = None
    password: str | None = None


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
    total_users = db.scalar(select(func.count(User.id))) or 0

    total_products = db.scalar(select(func.count(Product.id))) or 0

    active_products = (
        db.scalar(select(func.count(Product.id)).where(Product.is_active.is_(True)))
        or 0
    )

    # Only count valid orders: either PAID or COD (exclude abandoned online payment spam)
    online_unpaid_order_ids = select(Payment.order_id).where(
        Payment.order_id.is_not(None),
        Payment.payment_method.in_([
            PaymentMethod.VIETQR,
            PaymentMethod.BANK_TRANSFER,
            PaymentMethod.CARD,
        ]),
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
    query = select(User).order_by(User.created_at.desc())
    if role and role in ["admin", "customer"]:
        query = query.where(User.role == UserRole(role))

    users = db.execute(query).scalars().all()
    results = []
    for u in users:
        p = u.profile
        full_name = (p.full_name if p and p.full_name else u.email.split("@")[0]).strip()
        phone = (p.phone if p and p.phone else "").strip()
        if search:
            s = search.lower().strip()
            if s not in u.email.lower() and s not in full_name.lower() and s not in phone.lower():
                continue
        results.append({
            "id": str(u.id),
            "email": u.email,
            "role": u.role.value if hasattr(u.role, "value") else str(u.role),
            "is_active": u.is_active,
            "full_name": full_name,
            "phone": phone,
            "created_at": u.created_at.isoformat() if u.created_at else None,
        })
    return {"items": results, "total": len(results)}


@router.post("/users", status_code=status.HTTP_201_CREATED)
def create_staff_user(
    data: CreateStaffRequest,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> dict:
    clean_email = data.email.strip().lower()
    existing = db.execute(select(User).where(User.email == clean_email)).scalar_one_or_none()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Email '{clean_email}' đã tồn tại trong hệ thống.",
        )

    assigned_role = UserRole.ADMIN if data.role.lower() in ["admin", "staff"] else UserRole.CUSTOMER
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
        "role": new_user.role.value if hasattr(new_user.role, "value") else str(new_user.role),
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
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Không tìm thấy người dùng.")

    if data.is_active is not None:
        if target_user.id == current_user.id and not data.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Không thể khóa tài khoản đang đăng nhập của chính bạn.",
            )
        target_user.is_active = data.is_active

    if data.role is not None:
        target_user.role = UserRole.ADMIN if data.role.lower() in ["admin", "staff"] else UserRole.CUSTOMER

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
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Không tìm thấy người dùng.")

    if target_user.id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Không thể xóa tài khoản của chính bạn.",
        )

    db.delete(target_user)
    db.commit()
    return {"message": "Đã xóa tài khoản thành công."}
