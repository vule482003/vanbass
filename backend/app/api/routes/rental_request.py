import uuid
from decimal import Decimal
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
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


@router.post(
    "",
    response_model=RentalRequestResponse,
    status_code=status.HTTP_201_CREATED,
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

    number_of_days = (data.end_date - data.start_date).days + 1

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
                detail=f"Product '{product.name}' is not available for rental",
            )

        if product.rental_price is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Product '{product.name}' has no rental price",
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
    "/{rental_request_id}",
    response_model=RentalRequestResponse,
)
def get_rental_request(
    rental_request_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
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


@router.put(
    "/{rental_request_id}/cancel",
    response_model=RentalRequestResponse,
)
def cancel_rental_request(
    rental_request_id: UUID,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
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

    if rental_request.status not in {
        RentalRequestStatus.PENDING,
        RentalRequestStatus.CONTACTED,
    }:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Rental request cannot be cancelled in its current status",
        )

    rental_request.status = RentalRequestStatus.CANCELLED

    db.commit()
    db.refresh(rental_request)

    return rental_request


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
    rental_request = db.execute(
        select(RentalRequest)
        .options(selectinload(RentalRequest.items))
        .where(RentalRequest.id == rental_request_id)
    ).scalar_one_or_none()

    if rental_request is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Rental request not found",
        )

    if rental_request.status in {
        RentalRequestStatus.CANCELLED,
        RentalRequestStatus.COMPLETED,
    }:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Rental request cannot be updated in its current status",
        )

    rental_request.status = data.status
    rental_request.admin_note = data.admin_note

    db.commit()
    db.refresh(rental_request)

    return rental_request