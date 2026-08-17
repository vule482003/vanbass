from decimal import Decimal
from uuid import UUID

from fastapi import HTTPException, status
from redis.exceptions import RedisError
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.core.redis import redis_client
from app.models.product import Product
from app.schemas.cart import CartItemResponse, CartResponse

USER_CART_TTL_SECONDS = 30 * 24 * 60 * 60  # 30 days
GUEST_CART_TTL_SECONDS = 7 * 24 * 60 * 60  # 7 days


class CartService:
    @staticmethod
    def _get_cart_key(cart_id: str) -> str:
        return f"cart:{cart_id}"

    @classmethod
    def get_cart(cls, cart_id: str, db: Session) -> CartResponse:
        key = cls._get_cart_key(cart_id)
        try:
            raw_items = redis_client.hgetall(key)
        except RedisError:
            # If Redis connection fails, return empty cart gracefully
            return CartResponse()

        if not raw_items:
            return CartResponse()

        product_ids = []
        quantities: dict[UUID, int] = {}
        for pid_str, qty_str in raw_items.items():
            try:
                pid = UUID(pid_str)
                qty = int(qty_str)
                if qty > 0:
                    product_ids.append(pid)
                    quantities[pid] = qty
            except (ValueError, TypeError):
                continue

        if not product_ids:
            return CartResponse()

        # Query all products from DB in one batch with images
        stmt = (
            select(Product)
            .where(Product.id.in_(product_ids))
            .options(selectinload(Product.images))
        )
        products = db.scalars(stmt).all()
        product_map = {p.id: p for p in products}

        cart_items: list[CartItemResponse] = []
        total_items = 0
        subtotal = Decimal("0.00")

        # Process each product maintaining item validation
        for pid, qty in quantities.items():
            product = product_map.get(pid)
            if product is None or not product.is_active:
                # Product was deleted or disabled, keep in response as unavailable
                cart_items.append(
                    CartItemResponse(
                        product_id=pid,
                        name="Sản phẩm không còn kinh doanh",
                        slug="not-available",
                        sku="N/A",
                        image_url=None,
                        sale_price=Decimal("0.00"),
                        stock_quantity=0,
                        quantity=qty,
                        subtotal=Decimal("0.00"),
                        is_available=False,
                        error_message="Sản phẩm hiện không khả dụng",
                    )
                )
                continue

            # First image if exists
            first_image = sorted(product.images, key=lambda img: img.sort_order)[0] if product.images else None
            image_url = first_image.image_url if first_image else None

            sale_price = product.sale_price or Decimal("0.00")
            item_subtotal = sale_price * qty

            is_available = True
            error_message = None

            if not product.sale_enabled:
                is_available = False
                error_message = "Sản phẩm hiện không mở bán"
            elif product.stock_quantity < qty:
                is_available = False
                error_message = f"Chỉ còn {product.stock_quantity} sản phẩm trong kho"

            if is_available:
                total_items += qty
                subtotal += item_subtotal

            cart_items.append(
                CartItemResponse(
                    product_id=product.id,
                    name=product.name,
                    slug=product.slug,
                    sku=product.sku,
                    image_url=image_url,
                    sale_price=sale_price,
                    stock_quantity=product.stock_quantity,
                    quantity=qty,
                    subtotal=item_subtotal,
                    is_available=is_available,
                    error_message=error_message,
                )
            )

        return CartResponse(
            items=cart_items,
            total_items=total_items,
            subtotal=subtotal,
            currency="VND",
        )

    @classmethod
    def add_item(
        cls,
        cart_id: str,
        product_id: UUID,
        quantity: int,
        db: Session,
    ) -> CartResponse:
        # 1. Validate product in database
        product = db.get(Product, product_id)
        if product is None or not product.is_active:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Sản phẩm không tồn tại hoặc đã ngừng kinh doanh",
            )

        if not product.sale_enabled:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Sản phẩm hiện không mở bán",
            )

        key = cls._get_cart_key(cart_id)
        try:
            current_qty_str = redis_client.hget(key, str(product_id))
            current_qty = int(current_qty_str) if current_qty_str else 0
            new_qty = current_qty + quantity

            if new_qty > product.stock_quantity:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Số lượng yêu cầu ({new_qty}) vượt quá tồn kho hiện tại ({product.stock_quantity})",
                )

            redis_client.hset(key, str(product_id), new_qty)
            ttl = USER_CART_TTL_SECONDS if cart_id.startswith("user:") else GUEST_CART_TTL_SECONDS
            redis_client.expire(key, ttl)
        except RedisError as e:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Dịch vụ giỏ hàng tạm thời không khả dụng, vui lòng thử lại sau.",
            ) from e

        return cls.get_cart(cart_id, db)

    @classmethod
    def update_item(
        cls,
        cart_id: str,
        product_id: UUID,
        quantity: int,
        db: Session,
    ) -> CartResponse:
        key = cls._get_cart_key(cart_id)
        if quantity <= 0:
            try:
                redis_client.hdel(key, str(product_id))
            except RedisError as e:
                raise HTTPException(
                    status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                    detail="Dịch vụ giỏ hàng tạm thời không khả dụng",
                ) from e
            return cls.get_cart(cart_id, db)

        product = db.get(Product, product_id)
        if product is None or not product.is_active:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Sản phẩm không tồn tại hoặc đã ngừng kinh doanh",
            )

        if quantity > product.stock_quantity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Số lượng yêu cầu ({quantity}) vượt quá tồn kho hiện tại ({product.stock_quantity})",
            )

        try:
            redis_client.hset(key, str(product_id), quantity)
            ttl = USER_CART_TTL_SECONDS if cart_id.startswith("user:") else GUEST_CART_TTL_SECONDS
            redis_client.expire(key, ttl)
        except RedisError as e:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Dịch vụ giỏ hàng tạm thời không khả dụng",
            ) from e

        return cls.get_cart(cart_id, db)

    @classmethod
    def remove_item(cls, cart_id: str, product_id: UUID, db: Session) -> CartResponse:
        key = cls._get_cart_key(cart_id)
        try:
            redis_client.hdel(key, str(product_id))
        except RedisError as e:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Dịch vụ giỏ hàng tạm thời không khả dụng",
            ) from e

        return cls.get_cart(cart_id, db)

    @classmethod
    def clear_cart(cls, cart_id: str) -> None:
        key = cls._get_cart_key(cart_id)
        try:
            redis_client.delete(key)
        except RedisError:
            pass

    @classmethod
    def merge_guest_cart(cls, guest_session_id: str, user_id: UUID, db: Session) -> None:
        guest_key = cls._get_cart_key(f"guest:{guest_session_id}")
        user_key = cls._get_cart_key(f"user:{user_id}")
        try:
            guest_items = redis_client.hgetall(guest_key)
            if not guest_items:
                return

            for pid_str, qty_str in guest_items.items():
                guest_qty = int(qty_str)
                user_qty_str = redis_client.hget(user_key, pid_str)
                user_qty = int(user_qty_str) if user_qty_str else 0
                combined_qty = user_qty + guest_qty
                redis_client.hset(user_key, pid_str, combined_qty)

            redis_client.expire(user_key, USER_CART_TTL_SECONDS)
            redis_client.delete(guest_key)
        except RedisError:
            pass
