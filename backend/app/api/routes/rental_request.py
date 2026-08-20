from datetime import date, timedelta
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.dependencies import get_db, get_optional_current_user, require_admin
from app.core.rate_limit import rate_limit_rental
from app.models.rental_request import RentalRequest, RentalRequestStatus
from app.models.user import User, UserRole
from app.schemas.rental_request import (
    ProductAvailabilityResponse,
    RentalCancelRequest,
    RentalRequestCreate,
    RentalRequestListResponse,
    RentalRequestResponse,
    RentalStatusUpdate,
)
from app.services.rental_service import RentalService
from app.services.user_service import UserService

router = APIRouter(prefix="/rental-requests", tags=["Rental Requests"])


@router.post(
    "",
    response_model=RentalRequestResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(rate_limit_rental)],
)
def create_rental_request(
    payload: RentalRequestCreate,
    current_user: User | None = Depends(get_optional_current_user),
    db: Session = Depends(get_db),
) -> RentalRequest:
    user_id = UserService.resolve_user_id(
        db=db,
        current_user=current_user,
        phone=payload.customer_phone or "guest",
        email=payload.customer_email,
    )

    return RentalService.create_rental_request(
        payload=payload,
        user_id=user_id,
        db=db,
    )


@router.get(
    "/availability/{product_id}",
    response_model=ProductAvailabilityResponse,
)
def get_product_availability(
    product_id: UUID,
    start_date: date | None = None,
    end_date: date | None = None,
    db: Session = Depends(get_db),
) -> ProductAvailabilityResponse:
    today = date.today()
    s_date = start_date if start_date and start_date >= today else today
    e_date = end_date if end_date and end_date >= s_date else s_date + timedelta(days=30)

    if (e_date - s_date).days > 90:
        e_date = s_date + timedelta(days=90)

    return RentalService.get_product_availability(
        product_id=product_id,
        start_date=s_date,
        end_date=e_date,
        db=db,
    )


@router.get("", response_model=RentalRequestListResponse)
def list_rental_requests(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    status_filter: RentalRequestStatus | None = Query(None, alias="status"),
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> RentalRequestListResponse:
    query = select(RentalRequest)
    if status_filter:
        query = query.where(RentalRequest.status == status_filter)

    query = query.order_by(RentalRequest.created_at.desc()).offset(skip).limit(limit)
    results = db.execute(query).scalars().all()
    return RentalRequestListResponse(items=list(results), total=len(results))


@router.get("/me", response_model=RentalRequestListResponse)
def list_my_rental_requests(
    current_user: User = Depends(get_optional_current_user),
    db: Session = Depends(get_db),
) -> RentalRequestListResponse:
    if not current_user:
        return RentalRequestListResponse(items=[], total=0)

    query = select(RentalRequest).where(RentalRequest.user_id == current_user.id).order_by(RentalRequest.created_at.desc())
    results = db.execute(query).scalars().all()
    return RentalRequestListResponse(items=list(results), total=len(results))


@router.get("/{request_id}", response_model=RentalRequestResponse)
def get_rental_request(
    request_id: UUID,
    current_user: User = Depends(get_optional_current_user),
    db: Session = Depends(get_db),
) -> RentalRequest:
    rental_req = db.get(RentalRequest, request_id)
    if not rental_req:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Không tìm thấy yêu cầu thuê",
        )

    if current_user and current_user.role != UserRole.ADMIN and rental_req.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Bạn không có quyền xem yêu cầu thuê này",
        )

    return rental_req


@router.patch("/{request_id}/status", response_model=RentalRequestResponse)
def update_rental_status(
    request_id: UUID,
    payload: RentalStatusUpdate,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> RentalRequest:
    return RentalService.update_rental_status(
        request_id=request_id,
        db=db,
        new_status=payload.status,
        new_payment_status=payload.payment_status,
        admin_note=payload.note,
    )


@router.post(
    "/{request_id}/cancel",
    response_model=RentalRequestResponse,
    dependencies=[Depends(rate_limit_rental)],
)
def cancel_rental_request(
    request_id: UUID,
    payload: RentalCancelRequest | None = None,
    current_user: User = Depends(get_optional_current_user),
    db: Session = Depends(get_db),
) -> RentalRequest:
    is_admin = current_user.role == UserRole.ADMIN if current_user else False
    current_user_id = current_user.id if current_user else None
    reason = payload.reason if payload else None

    return RentalService.cancel_rental_request(
        request_id=request_id,
        current_user_id=current_user_id,
        is_admin=is_admin,
        reason=reason,
        db=db,
    )