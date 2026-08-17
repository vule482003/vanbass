from decimal import Decimal
from unittest.mock import MagicMock, patch
import uuid
import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.models.product import Product
from app.models.user import User, UserRole
from app.schemas.cart import CartItemAdd, CartItemResponse, CartItemUpdate, CartResponse
from app.services.cart_service import CartService

client = TestClient(app)


def test_cart_schemas():
    prod_id = uuid.uuid4()
    item_add = CartItemAdd(product_id=prod_id, quantity=2)
    assert item_add.quantity == 2
    assert item_add.product_id == prod_id

    item_update = CartItemUpdate(quantity=5)
    assert item_update.quantity == 5


def test_cart_service_empty_redis():
    mock_db = MagicMock()
    with patch("app.services.cart_service.redis_client") as mock_redis:
        mock_redis.hgetall.return_value = {}
        cart = CartService.get_cart("guest:12345", mock_db)
        assert cart.total_items == 0
        assert cart.subtotal == Decimal("0.00")
        assert len(cart.items) == 0


def test_cart_service_with_items():
    mock_db = MagicMock()
    prod_id = uuid.uuid4()

    fake_product = Product(
        id=prod_id,
        category_id=uuid.uuid4(),
        name="Pioneer DDJ-FLX4",
        slug="pioneer-ddj-flx4",
        sku="DDJ-FLX4",
        sale_enabled=True,
        sale_price=Decimal("8500000.00"),
        stock_quantity=10,
        is_active=True,
    )
    fake_product.images = []

    # Mock DB query
    mock_db.scalars.return_value.all.return_value = [fake_product]

    with patch("app.services.cart_service.redis_client") as mock_redis:
        mock_redis.hgetall.return_value = {str(prod_id): "2"}

        cart = CartService.get_cart("guest:12345", mock_db)

        assert cart.total_items == 2
        assert cart.subtotal == Decimal("17000000.00")
        assert len(cart.items) == 1
        assert cart.items[0].name == "Pioneer DDJ-FLX4"
        assert cart.items[0].is_available is True


def test_cart_service_add_item_stock_validation():
    mock_db = MagicMock()
    prod_id = uuid.uuid4()

    fake_product = Product(
        id=prod_id,
        category_id=uuid.uuid4(),
        name="AlphaTheta XDJ-AZ",
        slug="alphatheta-xdj-az",
        sku="XDJ-AZ",
        sale_enabled=True,
        sale_price=Decimal("80000000.00"),
        stock_quantity=2,
        is_active=True,
    )
    mock_db.get.return_value = fake_product

    with patch("app.services.cart_service.redis_client") as mock_redis:
        mock_redis.hget.return_value = "1"

        # Trying to add 2 more when only 2 total in stock (1 + 2 = 3 > 2) should fail
        with pytest.raises(Exception) as exc_info:
            CartService.add_item("guest:12345", prod_id, quantity=2, db=mock_db)

        assert "vượt quá tồn kho" in str(exc_info.value.detail).lower()


def test_cart_api_endpoints_registered():
    from app.api.routes.cart import router as cart_router
    cart_routes = [route.path for route in cart_router.routes if hasattr(route, "path")]
    assert "/cart" in cart_routes
    assert "/cart/items" in cart_routes
    assert "/cart/items/{product_id}" in cart_routes
    assert "/cart/merge" in cart_routes


