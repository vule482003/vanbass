from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.api.dependencies import get_db, require_staff_or_admin
from app.models.category import Category
from app.models.product import Product
from app.models.user import User
from app.schemas.category import (
    CategoryCreate,
    CategoryResponse,
    CategoryUpdate,
)

router = APIRouter(
    prefix="/categories",
    tags=["Category"],
)


@router.get(
    "",
    response_model=list[CategoryResponse],
)
def list_categories(
    db: Session = Depends(get_db),
) -> list[Category]:
    result = db.execute(
        select(Category)
        .where(Category.is_active.is_(True))
        .order_by(Category.name.asc())
    )

    return list(result.scalars().all())


@router.get(
    "/{category_id}",
    response_model=CategoryResponse,
)
def get_category(
    category_id: UUID,
    db: Session = Depends(get_db),
) -> Category:
    category = db.get(Category, category_id)

    if category is None or not category.is_active:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found",
        )

    return category


@router.post(
    "",
    response_model=CategoryResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_category(
    data: CategoryCreate,
    current_user: User = Depends(require_staff_or_admin),
    db: Session = Depends(get_db),
) -> Category:
    existing = db.execute(
        select(Category).where(Category.slug == data.slug)
    ).scalar_one_or_none()

    if existing is not None:
        if not existing.is_active:
            # Tái kích hoạt và cập nhật danh mục đã xóa mềm trước đó
            existing.name = data.name
            existing.description = data.description
            existing.image_url = data.image_url
            existing.is_active = True
            db.commit()
            db.refresh(existing)
            return existing

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Category slug already exists",
        )

    category = Category(
        name=data.name,
        slug=data.slug,
        description=data.description,
        image_url=data.image_url,
        is_active=True,
    )

    db.add(category)
    db.commit()
    db.refresh(category)

    return category


@router.put(
    "/{category_id}",
    response_model=CategoryResponse,
)
def update_category(
    category_id: UUID,
    data: CategoryUpdate,
    current_user: User = Depends(require_staff_or_admin),
    db: Session = Depends(get_db),
) -> Category:
    category = db.get(Category, category_id)

    if category is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found",
        )

    update_data = data.model_dump(exclude_unset=True)

    if "slug" in update_data:
        existing = db.execute(
            select(Category).where(
                Category.slug == update_data["slug"],
                Category.id != category_id,
            )
        ).scalar_one_or_none()

        if existing is not None:
            if not existing.is_active:
                # Xóa bản ghi không hoạt động đang chiếm slug này
                db.delete(existing)
                db.flush()
            else:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Category slug already exists",
                )

    for field, value in update_data.items():
        setattr(category, field, value)

    db.commit()
    db.refresh(category)

    return category


@router.delete(
    "/{category_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_category(
    category_id: UUID,
    current_user: User = Depends(require_staff_or_admin),
    db: Session = Depends(get_db),
) -> None:
    category = db.get(Category, category_id)

    if category is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found",
        )

    # Check if there are active products linked to this category
    active_product_count = (
        db.scalar(
            select(func.count(Product.id)).where(
                Product.category_id == category_id,
                Product.is_active.is_(True),
            )
        )
        or 0
    )

    if active_product_count > 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                f"Không thể xóa danh mục vì đang có {active_product_count} sản phẩm đang hoạt động. "
                "Vui lòng chuyển hoặc xóa sản phẩm trước."
            ),
        )

    # Thực sự xóa khỏi DB (Hard Delete) nếu không vướng ràng buộc
    try:
        db.delete(category)
        db.commit()
    except SQLAlchemyError:
        # Fallback soft delete nếu có sản phẩm cũ trong lịch sử đơn hàng trỏ tới
        db.rollback()
        cat_to_soft_delete = db.get(Category, category_id)
        if cat_to_soft_delete:
            cat_to_soft_delete.is_active = False
            db.commit()


