from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.dependencies import get_db, require_admin
from app.models.category import Category
from app.models.product import Product
from app.models.user import User
from app.schemas.product import (
    ProductCreate,
    ProductResponse,
    ProductUpdate,
)


router = APIRouter(
    prefix="/products",
    tags=["Product"],
)


@router.get(
    "",
    response_model=list[ProductResponse],
)
def list_products(
    category_id: UUID | None = None,
    sale_only: bool = False,
    rental_only: bool = False,
    db: Session = Depends(get_db),
) -> list[Product]:
    if sale_only and rental_only:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="sale_only and rental_only cannot both be true",
        )

    query = select(Product).where(Product.is_active.is_(True))

    if category_id is not None:
        query = query.where(Product.category_id == category_id)

    if sale_only:
        query = query.where(Product.sale_enabled.is_(True))

    if rental_only:
        query = query.where(Product.rental_enabled.is_(True))

    query = query.order_by(Product.name.asc())

    result = db.execute(query)

    return list(result.scalars().all())


@router.get(
    "/{product_id}",
    response_model=ProductResponse,
)
def get_product(
    product_id: UUID,
    db: Session = Depends(get_db),
) -> Product:
    product = db.get(Product, product_id)

    if product is None or not product.is_active:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    return product


@router.post(
    "",
    response_model=ProductResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_product(
    data: ProductCreate,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> Product:
    category = db.get(Category, data.category_id)

    if category is None or not category.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Category not found or inactive",
        )

    existing_slug = db.execute(
        select(Product).where(Product.slug == data.slug)
    ).scalar_one_or_none()

    if existing_slug is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Product slug already exists",
        )

    existing_sku = db.execute(
        select(Product).where(Product.sku == data.sku)
    ).scalar_one_or_none()

    if existing_sku is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Product SKU already exists",
        )

    product = Product(**data.model_dump())

    db.add(product)
    db.commit()
    db.refresh(product)

    return product


@router.put(
    "/{product_id}",
    response_model=ProductResponse,
)
def update_product(
    product_id: UUID,
    data: ProductUpdate,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> Product:
    product = db.get(Product, product_id)

    if product is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    update_data = data.model_dump(exclude_unset=True)

    if "category_id" in update_data:
        category = db.get(Category, update_data["category_id"])

        if category is None or not category.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Category not found or inactive",
            )

    if "slug" in update_data:
        existing = db.execute(
            select(Product).where(
                Product.slug == update_data["slug"],
                Product.id != product_id,
            )
        ).scalar_one_or_none()

        if existing is not None:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Product slug already exists",
            )

    if "sku" in update_data:
        existing = db.execute(
            select(Product).where(
                Product.sku == update_data["sku"],
                Product.id != product_id,
            )
        ).scalar_one_or_none()

        if existing is not None:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Product SKU already exists",
            )

    for field, value in update_data.items():
        setattr(product, field, value)

    db.commit()
    db.refresh(product)

    return product


@router.delete(
    "/{product_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_product(
    product_id: UUID,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> None:
    product = db.get(Product, product_id)

    if product is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    product.is_active = False

    db.commit()