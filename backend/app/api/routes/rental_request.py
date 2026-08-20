<<<<<<< HEAD
import uuid
from datetime import date
from decimal import Decimal
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session, selectinload

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
    RentalRequestResponse,
    RentalRequestStatusUpdate,
)


router = APIRouter(
    prefix="/rental-requests",
    tags=["Rental Request"],
)


def generate_request_number() -> str:
    return f"VR-{uuid.uuid4().hex[:12].upper()}"


def calculate_number_of_days(
    start_date: date,
    end_date: date,
) -> int:
    return (end_date - start_date).days + 1


def get_reserved_quantity(
    db: Session,
    product_id: UUID,
    start_date: date,
    end_date: date,
) -> int:
    reserved_quantity = db.execute(
        select(
            func.coalesce(
                func.sum(RentalRequestItem.quantity),
                0,
            )
        )
        .join(
            RentalRequest,
            RentalRequest.id == RentalRequestItem.rental_request_id,
        )
        .where(
            RentalRequestItem.product_id == product_id,
            RentalRequest.status.in_(
                {
                    RentalRequestStatus.CONTACTED,
                    RentalRequestStatus.CONFIRMED,
                }
            ),
            RentalRequest.start_date <= end_date,
            RentalRequest.end_date >= start_date,
        )
    ).scalar_one()

    return int(reserved_quantity or 0)


def is_product_available(
    db: Session,
    product: Product,
    quantity: int,
    start_date: date,
    end_date: date,
) -> bool:
    reserved_quantity = get_reserved_quantity(
        db=db,
        product_id=product.id,
        start_date=start_date,
        end_date=end_date,
    )

    return reserved_quantity + quantity <= product.stock_quantity


def get_rental_request_for_user(
    rental_request_id: UUID,
    current_user: User,
    db: Session,
) -> RentalRequest:
    rental_request = db.execute(
        select(RentalRequest)
        .options(selectinload(RentalRequest.items))
        .where(
            RentalRequest.id == rental_request_id,
            RentalRequest.user_id == current_user.id,
        )
    ).scalar_one_or_none()

    if rental_request is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Rental request not found",
        )

    return rental_request


def get_rental_request_for_admin(
    rental_request_id: UUID,
    db: Session,
) -> RentalRequest:
    rental_request = db.execute(
        select(RentalRequest)
        .options(selectinload(RentalRequest.items))
        .where(
            RentalRequest.id == rental_request_id,
        )
    ).scalar_one_or_none()

    if rental_request is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Rental request not found",
        )

    return rental_request
=======
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
>>>>>>> 201b4c121c9fbc2f3e1a969c00b0a2a178f68102


@router.post(
    "",
    response_model=RentalRequestResponse,
    status_code=status.HTTP_201_CREATED,
<<<<<<< HEAD
)
def create_rental_request(
    data: RentalRequestCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> RentalRequest:
    if data.end_date < data.start_date:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="End date must be greater than or equal to start date",
        )

    number_of_days = calculate_number_of_days(
        data.start_date,
        data.end_date,
    )

    product_ids = [item.product_id for item in data.items]

    if len(product_ids) != len(set(product_ids)):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Duplicate products are not allowed",
        )

    result = db.execute(
        select(Product).where(
            Product.id.in_(product_ids),
            Product.is_active.is_(True),
        )
    )

    products = {
        product.id: product
        for product in result.scalars().all()
    }

    if len(products) != len(product_ids):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="One or more products are unavailable",
        )

    rental_items: list[RentalRequestItem] = []
    rental_total = Decimal("0")

    for item_data in data.items:
        product = products[item_data.product_id]

        if not product.rental_enabled:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=(
                    f"Product '{product.name}' "
                    "is not available for rental"
                ),
            )

        if product.rental_price is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=(
                    f"Product '{product.name}' "
                    "has no rental price"
                ),
            )

        if item_data.quantity > product.stock_quantity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=(
                    f"Requested quantity for '{product.name}' "
                    "exceeds available stock"
                ),
            )

        if not is_product_available(
            db=db,
            product=product,
            quantity=item_data.quantity,
            start_date=data.start_date,
            end_date=data.end_date,
        ):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=(
                    f"Product '{product.name}' "
                    "does not have enough stock during "
                    "the requested rental period"
                ),
            )

        subtotal = (
            product.rental_price
            * item_data.quantity
            * number_of_days
        )

        rental_total += subtotal

        rental_items.append(
            RentalRequestItem(
                product_id=product.id,
                product_name=product.name,
                quantity=item_data.quantity,
                rental_price=product.rental_price,
                number_of_days=number_of_days,
                subtotal=subtotal,
            )
        )

    rental_request = RentalRequest(
        user_id=current_user.id,
        request_number=generate_request_number(),
        start_date=data.start_date,
        end_date=data.end_date,
        status=RentalRequestStatus.PENDING,
        payment_status=RentalPaymentStatus.NOT_REQUIRED,
        rental_total=rental_total,
        deposit_amount=Decimal("0"),
        currency="VND",
        pickup_location=data.pickup_location,
        pickup_note=data.pickup_note,
        customer_note=data.customer_note,
    )

    rental_request.items.extend(rental_items)

    db.add(rental_request)
    db.commit()
    db.refresh(rental_request)

    return rental_request


@router.get(
    "",
    response_model=list[RentalRequestResponse],
)
def list_my_rental_requests(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> list[RentalRequest]:
    result = db.execute(
        select(RentalRequest)
        .options(selectinload(RentalRequest.items))
        .where(
            RentalRequest.user_id == current_user.id,
        )
        .order_by(RentalRequest.created_at.desc())
    )

    return list(result.scalars().all())


@router.get(
    "/admin",
    response_model=list[RentalRequestResponse],
)
def list_all_rental_requests(
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> list[RentalRequest]:
    result = db.execute(
        select(RentalRequest)
        .options(selectinload(RentalRequest.items))
        .order_by(RentalRequest.created_at.desc())
    )

    return list(result.scalars().all())


@router.get(
    "/admin/{rental_request_id}",
    response_model=RentalRequestResponse,
)
def get_admin_rental_request(
    rental_request_id: UUID,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> RentalRequest:
    return get_rental_request_for_admin(
        rental_request_id=rental_request_id,
        db=db,
    )


@router.put(
    "/admin/{rental_request_id}/status",
    response_model=RentalRequestResponse,
)
def update_rental_request_status(
    rental_request_id: UUID,
    data: RentalRequestStatusUpdate,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> RentalRequest:
    rental_request = get_rental_request_for_admin(
        rental_request_id=rental_request_id,
        db=db,
    )

    current_status = rental_request.status
    new_status = data.status

    allowed_transitions = {
        RentalRequestStatus.PENDING: {
            RentalRequestStatus.CONTACTED,
            RentalRequestStatus.REJECTED,
            RentalRequestStatus.CANCELLED,
        },
        RentalRequestStatus.CONTACTED: {
            RentalRequestStatus.CONFIRMED,
            RentalRequestStatus.REJECTED,
            RentalRequestStatus.CANCELLED,
        },
        RentalRequestStatus.CONFIRMED: {
            RentalRequestStatus.COMPLETED,
            RentalRequestStatus.CANCELLED,
        },
        RentalRequestStatus.REJECTED: set(),
        RentalRequestStatus.CANCELLED: set(),
        RentalRequestStatus.COMPLETED: set(),
    }

    if new_status not in allowed_transitions[current_status]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                f"Cannot change rental request status "
                f"from '{current_status.value}' "
                f"to '{new_status.value}'"
            ),
        )

    rental_request.status = new_status
    rental_request.admin_note = data.admin_note

    db.commit()
    db.refresh(rental_request)

    return rental_request


@router.get(
    "/{rental_request_id}",
    response_model=RentalRequestResponse,
)
def get_rental_request(
    rental_request_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> RentalRequest:
    return get_rental_request_for_user(
        rental_request_id=rental_request_id,
        current_user=current_user,
=======
    dependencies=[Depends(rate_limit_rental)],
)
def create_rental_request(
    payload: RentalRequestCreate,
    current_user: User | None = Depends(get_optional_current_user),
    db: Session = Depends(get_db),
) -> RentalRequest:
    """
    Create a new rental contract with date collision verification and tiered pricing calculation.
    """
    user_id = UserService.resolve_user_id(
        db=db,
        current_user=current_user,
        phone=payload.customer_phone or "guest",
        email=payload.customer_email,
    )

    return RentalService.create_rental_request(
        payload=payload,
        user_id=user_id,
>>>>>>> 201b4c121c9fbc2f3e1a969c00b0a2a178f68102
        db=db,
    )


<<<<<<< HEAD
@router.put(
    "/{rental_request_id}/cancel",
    response_model=RentalRequestResponse,
)
def cancel_rental_request(
    rental_request_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> RentalRequest:
    rental_request = get_rental_request_for_user(
        rental_request_id=rental_request_id,
        current_user=current_user,
        db=db,
    )

    if rental_request.status not in {
        RentalRequestStatus.PENDING,
        RentalRequestStatus.CONTACTED,
    }:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                "Rental request cannot be cancelled "
                "in its current status"
            ),
        )

    rental_request.status = RentalRequestStatus.CANCELLED

    db.commit()
    db.refresh(rental_request)

    return rental_request
=======
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
    """
    Query real-time availability calendar for a rental instrument across a date range.
    """
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
    """
    Admin: List all rental requests with pagination and optional status filter.
    """
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
    """
    Customer: List current user's rental requests history.
    """
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
    """
    Get detailed rental request information by ID.
    """
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
    """
    Admin: Advance rental status and/or deposit/payment status according to state machine rules.
    """
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
    """
    Cancel rental request and immediately release booked calendar days.
    """
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
>>>>>>> 201b4c121c9fbc2f3e1a969c00b0a2a178f68102
