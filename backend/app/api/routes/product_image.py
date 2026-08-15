from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.dependencies import get_db, require_admin
from app.models.product import Product
from app.models.product_image import ProductImage
from app.models.user import User
from app.schemas.product_image import (
    ProductImageCreate,
    ProductImageResponse,
    ProductImageUpdate,
)


router = APIRouter(
    prefix="/products/{product_id}/images",
    tags=["Product Image"],
)


def get_product_or_404(
    product_id: UUID,
    db: Session,
) -> Product:
    product = db.get(Product, product_id)

    if product is None or not product.is_active:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    return product


@router.get(
    "",
    response_model=list[ProductImageResponse],
)
def list_product_images(
    product_id: UUID,
    db: Session = Depends(get_db),
) -> list[ProductImage]:
    get_product_or_404(product_id, db)

    result = db.execute(
        select(ProductImage)
        .where(ProductImage.product_id == product_id)
        .order_by(
            ProductImage.sort_order.asc(),
            ProductImage.created_at.asc(),
        )
    )

    return list(result.scalars().all())


@router.post(
    "",
    response_model=ProductImageResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_product_image(
    product_id: UUID,
    data: ProductImageCreate,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> ProductImage:
    get_product_or_404(product_id, db)

    image = ProductImage(
        product_id=product_id,
        image_url=data.image_url,
        alt_text=data.alt_text,
        sort_order=data.sort_order,
    )

    db.add(image)
    db.commit()
    db.refresh(image)

    return image


@router.put(
    "/{image_id}",
    response_model=ProductImageResponse,
)
def update_product_image(
    product_id: UUID,
    image_id: UUID,
    data: ProductImageUpdate,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> ProductImage:
    get_product_or_404(product_id, db)

    image = db.execute(
        select(ProductImage).where(
            ProductImage.id == image_id,
            ProductImage.product_id == product_id,
        )
    ).scalar_one_or_none()

    if image is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product image not found",
        )

    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(image, field, value)

    db.commit()
    db.refresh(image)

    return image


@router.delete(
    "/{image_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_product_image(
    product_id: UUID,
    image_id: UUID,
    current_user: User = Depends(require_admin),
    db: Session = Depends(get_db),
) -> None:
    get_product_or_404(product_id, db)

    image = db.execute(
        select(ProductImage).where(
            ProductImage.id == image_id,
            ProductImage.product_id == product_id,
        )
    ).scalar_one_or_none()

    if image is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product image not found",
        )

    db.delete(image)
    db.commit()