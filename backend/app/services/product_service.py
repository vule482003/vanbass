from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.product import Product


class ProductService:
    @classmethod
    def get_by_identifier(cls, db: Session, identifier: str | UUID) -> Product | None:
        """
        Lookup a product by UUID, slug, or SKU.
        """
        if isinstance(identifier, UUID):
            return db.get(Product, identifier)

        raw_str = str(identifier).strip()
        try:
            val_uuid = UUID(raw_str)
            prod = db.get(Product, val_uuid)
            if prod:
                return prod
        except (ValueError, AttributeError):
            pass

        return db.execute(
            select(Product).where((Product.slug == raw_str) | (Product.sku == raw_str))
        ).scalar_one_or_none()

    @classmethod
    def get_active_rental_product(cls, db: Session, identifier: str | UUID) -> Product:
        """
        Lookup product and ensure it is active and supports rental.
        """
        product = cls.get_by_identifier(db, identifier)
        if not product or not product.is_active or not product.rental_enabled:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Sản phẩm (ID/Slug: {identifier}) không tồn tại hoặc không hỗ trợ cho thuê",
            )
        return product
