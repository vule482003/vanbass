from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user, get_db
from app.models.customer_profile import CustomerProfile
from app.models.user import User
from app.schemas.customer import (
    CustomerProfileRequest,
    CustomerProfileResponse,
    CustomerProfileStatusResponse,
)


router = APIRouter(
    prefix="/customers",
    tags=["Customer"],
)


@router.get(
    "/me/profile",
    response_model=CustomerProfileStatusResponse,
)
def get_my_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> CustomerProfileStatusResponse:
    profile = db.query(CustomerProfile).filter(
        CustomerProfile.user_id == current_user.id
    ).first()

    if profile is None:
        return CustomerProfileStatusResponse(
            profile_completed=False,
            profile=None,
        )

    return CustomerProfileStatusResponse(
        profile_completed=True,
        profile=profile,
    )


@router.put(
    "/me/profile",
    response_model=CustomerProfileResponse,
)
def upsert_my_profile(
    data: CustomerProfileRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> CustomerProfileResponse:
    profile = db.query(CustomerProfile).filter(
        CustomerProfile.user_id == current_user.id
    ).first()

    if profile is None:
        profile = CustomerProfile(
            user_id=current_user.id,
            **data.model_dump(),
        )
        db.add(profile)
    else:
        for field, value in data.model_dump().items():
            setattr(profile, field, value)

    db.commit()
    db.refresh(profile)

    return profile