import uuid
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Response, status
from fastapi.responses import RedirectResponse
from sqlalchemy import delete, or_, select
from sqlalchemy.orm import Session, selectinload

from app.api.dependencies import get_db, require_admin
from app.models.cart_item import CartItem
from app.models.category import Category
from app.models.product import Product
from app.models.product_image import ProductImage
from app.models.slug_redirect import SlugRedirect
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
    response: Response,
    category_slug: str | None = None,
    category_id: UUID | None = None,
    sale_only: bool = False,
    rental_only: bool = False,
    search: str | None = None,
    db: Session = Depends(get_db),
) -> list[Product]:
    if sale_only and rental_only:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="sale_only and rental_only cannot both be true",
        )

    # Real-time fresh data: disable aggressive browser caching
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate, max-age=0"

    query = (
        select(Product)
        .options(selectinload(Product.images))
        .where(Product.is_active.is_(True))
    )

    if category_id is not None:
        query = query.where(Product.category_id == category_id)
    elif category_slug is not None:
        cat = db.execute(
            select(Category).where(Category.slug == category_slug)
        ).scalar_one_or_none()
        if cat:
            query = query.where(Product.category_id == cat.id)

    if sale_only:
        query = query.where(Product.sale_enabled.is_(True))

    if rental_only:
        query = query.where(Product.rental_enabled.is_(True))

    if search and search.strip():
        term = f"%{search.strip()}%"
        query = query.where(
            or_(
                Product.name.ilike(term),
                Product.brand.ilike(term),
                Product.description.ilike(term),
                Product.sku.ilike(term),
            )
        )

    query = query.order_by(Product.name.asc())
    result = db.execute(query)
    return list(result.scalars().all())


@router.get(
    "/by-slug/{slug}",
    response_model=ProductResponse,
)
def get_product_by_slug(
    slug: str,
    response: Response,
    db: Session = Depends(get_db),
) -> Product:
    product = db.execute(
        select(Product)
        .options(selectinload(Product.images))
        .where(Product.slug == slug, Product.is_active.is_(True))
    ).scalar_one_or_none()

    if product is not None:
        response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate, max-age=0"
        return product

    # Check 301 Redirect history
    redirect_record = db.execute(
        select(SlugRedirect).where(
            SlugRedirect.old_slug == slug,
            SlugRedirect.entity_type == "product",
        )
    ).scalar_one_or_none()

    if redirect_record:
        # HTTP 301 Permanent Redirect to new slug
        return RedirectResponse(
            url=f"/api/products/by-slug/{redirect_record.new_slug}",
            status_code=status.HTTP_301_MOVED_PERMANENTLY,
        )

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Product not found",
    )


@router.get(
    "/{product_id}",
    response_model=ProductResponse,
)
def get_product(
    product_id: UUID,
    response: Response,
    db: Session = Depends(get_db),
) -> Product:
    product = db.execute(
        select(Product)
        .options(selectinload(Product.images))
        .where(Product.id == product_id, Product.is_active.is_(True))
    ).scalar_one_or_none()

    if product is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    response.headers["Cache-Control"] = (
        "public, max-age=120, stale-while-revalidate=600"
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

    if "slug" in update_data and update_data["slug"] != product.slug:
        new_slug = update_data["slug"]
        existing = db.execute(
            select(Product).where(
                Product.slug == new_slug,
                Product.id != product_id,
            )
        ).scalar_one_or_none()

        if existing is not None:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Product slug already exists",
            )

        # 301 Redirect Record: Preserve SEO score of old slug
        old_slug = product.slug
        existing_redirect = db.execute(
            select(SlugRedirect).where(SlugRedirect.old_slug == old_slug)
        ).scalar_one_or_none()

        if existing_redirect:
            existing_redirect.new_slug = new_slug
        else:
            db.add(
                SlugRedirect(
                    id=uuid.uuid4(),
                    entity_type="product",
                    old_slug=old_slug,
                    new_slug=new_slug,
                )
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

    # 1. Clean up cart items for this product
    db.execute(delete(CartItem).where(CartItem.product_id == product_id))

    # 2. Clean up product images
    db.execute(delete(ProductImage).where(ProductImage.product_id == product_id))

    # 3. Permanently hard delete product from DB
    try:
        db.delete(product)
        db.commit()
    except Exception:
        # Fallback to soft delete if existing order history references foreign key
        db.rollback()
        product = db.get(Product, product_id)
        if product:
            product.is_active = False
            db.commit()
