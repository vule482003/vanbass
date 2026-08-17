import random
import string
from datetime import datetime, timezone
from decimal import Decimal
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user, get_db, require_admin
from app.models.product import Product
from app.models.rental_request import (
    RentalPaymentStatus,
    RentalRequest,
    RentalRequestStatus,
)
from app.models.rental_request_item import RentalRequestItem
from app.models.user import User
from app.schemas.rental_request import (
    RentalRequestCreate,
    RentalRequestListResponse,
    RentalRequestResponse,
)

router = APIRouter(prefix="/rental-requests", tags=["Rental Requests"])


def generate_rental_request_number() -> str:
    now_str = datetime.now(timezone.utc).strftime("%Y%m%d")
    rand_chars = "".join(random.choices(string.digits, k=4))
    return f"RENT-{now_str}-{rand_chars}"


@router.post("", response_model=RentalRequestResponse, status_code=status.HTTP_201_CREATED)
def create_rental_request(
    payload: RentalRequestCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> RentalRequest:
    if payload.end_date < payload.start_date:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ngày trả máy phải sau hoặc bằng ngày nhận máy",
        )

    rental_days = max((payload.end_date - payload.start_date).days + 1, 1)
    rental_total = Decimal(0)
    total_deposit = Decimal(0)
    request_items: list[RentalRequestItem] = []

    for item_in in payload.items:
        product = db.get(Product, item_in.product_id)
        if not product or not product.is_active or not product.rental_enabled:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Sản phẩm {item_in.product_id} không hỗ trợ cho thuê",
            )

        daily_rate = item_in.daily_rate if item_in.daily_rate > 0 else (product.rental_price or Decimal(0))
        deposit_rate = item_in.deposit_rate if item_in.deposit_rate > 0 else (product.rental_deposit or Decimal(0))
        line_total = daily_rate * rental_days * item_in.quantity
        rental_total += line_total
        total_deposit += deposit_rate * item_in.quantity

        rental_item = RentalRequestItem(
            product_id=product.id,
            product_name=product.name,
            product_sku=product.sku,
            quantity=item_in.quantity,
            daily_rate=daily_rate,
            deposit_rate=deposit_rate,
            line_total=line_total,
        )
        request_items.append(rental_item)

    rental_req = RentalRequest(
        user_id=current_user.id,
        request_number=generate_rental_request_number(),
        start_date=payload.start_date,
        end_date=payload.end_date,
        status=RentalRequestStatus.PENDING,
        payment_status=RentalPaymentStatus.UNPAID,
        rental_total=rental_total,
        deposit_amount=total_deposit,
        pickup_location=payload.pickup_location,
        pickup_note=payload.pickup_note,
        customer_note=payload.customer_note,
        items=request_items,
    )

    db.add(rental_req)
    db.commit()
    db.refresh(rental_req)
    return rental_req


@router.get("/me", response_model=RentalRequestListResponse)
def get_my_rental_requests(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> dict:
    rentals = (
        db.query(RentalRequest)
        .filter(RentalRequest.user_id == current_user.id)
        .order_by(RentalRequest.created_at.desc())
        .all()
    )
    return {"items": rentals, "total": len(rentals)}


@router.get("/{request_id}", response_model=RentalRequestResponse)
def get_rental_request_by_id(
    request_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> RentalRequest:
    rental_req = db.get(RentalRequest, request_id)
    if not rental_req:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Không tìm thấy yêu cầu thuê máy",
        )
    if rental_req.user_id != current_user.id and current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Bạn không có quyền xem yêu cầu thuê này",
        )
    return rental_req


@router.get("", response_model=RentalRequestListResponse)
def list_all_rental_requests_admin(
    _: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> dict:
    rentals = db.query(RentalRequest).order_by(RentalRequest.created_at.desc()).all()
    return {"items": rentals, "total": len(rentals)}
