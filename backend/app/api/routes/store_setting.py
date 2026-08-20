from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.dependencies import get_db, require_admin
from app.models.store_setting import StoreSettings
from app.models.user import User
from app.schemas.store_setting import (
    StoreSettingsResponse,
    StoreSettingsUpdate,
)


router = APIRouter(
    prefix="/store-settings",
    tags=["Store Settings"],
)


@router.get(
    "",
    response_model=StoreSettingsResponse,
)
def get_store_settings(
    db: Session = Depends(get_db),
) -> StoreSettings:
    settings = db.execute(
        select(StoreSettings)
        .order_by(StoreSettings.updated_at.desc())
        .limit(1)
    ).scalar_one_or_none()

    if settings is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Store settings not configured",
        )

    return settings


@router.put(
    "",
    response_model=StoreSettingsResponse,
)
def update_store_settings(
    data: StoreSettingsUpdate,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> StoreSettings:
    settings = db.execute(
        select(StoreSettings)
        .order_by(StoreSettings.updated_at.desc())
        .limit(1)
    ).scalar_one_or_none()

    if settings is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Store settings not configured",
        )

    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(settings, field, value)

    settings.updated_by = current_user.id

    db.commit()
    db.refresh(settings)

    return settings