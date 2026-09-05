import asyncio
import uuid
from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException, UploadFile, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.dependencies import get_db, require_admin
from app.models.home_config import HomeConfig
from app.models.user import User
from app.schemas.home_config import HomeConfigResponse, HomeConfigUpdate, HomeData

router = APIRouter(
    prefix="/home-config",
    tags=["Home Config"],
)

UPLOAD_DIR = Path("static/uploads/homepage")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB


@router.get(
    "",
    response_model=HomeConfigResponse,
)
def get_home_config(
    db: Session = Depends(get_db),
) -> HomeConfigResponse:
    config = db.execute(
        select(HomeConfig).order_by(HomeConfig.updated_at.desc()).limit(1)
    ).scalar_one_or_none()

    if config is None:
        return HomeConfigResponse(
            id=None,
            data=HomeData(),
            updated_at=None,
        )

    try:
        data = HomeData(**config.data) if isinstance(config.data, dict) else HomeData()
    except (TypeError, ValueError):
        data = HomeData()

    return HomeConfigResponse(
        id=config.id,
        data=data,
        updated_at=config.updated_at,
    )


@router.put(
    "",
    response_model=HomeConfigResponse,
)
def update_home_config(
    payload: HomeConfigUpdate,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> HomeConfigResponse:
    config = db.execute(
        select(HomeConfig).order_by(HomeConfig.updated_at.desc()).limit(1)
    ).scalar_one_or_none()

    dumped_data = payload.data.model_dump()

    if config is None:
        config = HomeConfig(
            id=uuid.uuid4(),
            data=dumped_data,
            updated_by=current_user.id,
        )
        db.add(config)
    else:
        config.data = dumped_data
        config.updated_by = current_user.id

    db.commit()
    db.refresh(config)

    return HomeConfigResponse(
        id=config.id,
        data=HomeData(**config.data),
        updated_at=config.updated_at,
    )


@router.post(
    "/upload-image",
    response_model=dict[str, str],
)
async def upload_homepage_image(
    file: UploadFile,
    current_user: User = Depends(require_admin),
) -> dict[str, str]:
    if not file.filename:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Tên file không hợp lệ",
        )

    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Định dạng không được hỗ trợ. Cho phép: {', '.join(ALLOWED_EXTENSIONS)}",
        )

    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Dung lượng ảnh vượt quá 10MB",
        )

    unique_filename = f"hp_{uuid.uuid4().hex[:12]}{ext}"
    target_path = UPLOAD_DIR / unique_filename

    await asyncio.to_thread(target_path.write_bytes, content)

    return {
        "url": f"/static/uploads/homepage/{unique_filename}",
        "filename": unique_filename,
    }


@router.post(
    "/reset",
    response_model=HomeConfigResponse,
)
def reset_home_config(
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> HomeConfigResponse:
    config = db.execute(
        select(HomeConfig).order_by(HomeConfig.updated_at.desc()).limit(1)
    ).scalar_one_or_none()

    default_data = HomeData().model_dump()

    if config is None:
        config = HomeConfig(
            id=uuid.uuid4(),
            data=default_data,
            updated_by=current_user.id,
        )
        db.add(config)
    else:
        config.data = default_data
        config.updated_by = current_user.id

    db.commit()
    db.refresh(config)

    return HomeConfigResponse(
        id=config.id,
        data=HomeData(**config.data),
        updated_at=config.updated_at,
    )
