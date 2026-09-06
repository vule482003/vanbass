import uuid
from datetime import date, timedelta
from decimal import Decimal
from unittest.mock import MagicMock, patch

import pytest
from fastapi import HTTPException

from app.core.rate_limit import RedisDistributedRateLimiter
from app.models.order import Order, OrderStatus, PaymentStatus
from app.models.order_item import OrderItem
from app.models.product import Product
from app.models.rental_request import (
    RentalPaymentStatus,
    RentalRequest,
    RentalRequestStatus,
)
from app.models.rental_request_item import RentalRequestItem
from app.schemas.order import OrderCreateRequest, OrderItemCreate
from app.schemas.rental_request import RentalRequestCreate, RentalRequestItemCreate
from app.services.order_service import OrderService
from app.services.rental_service import RentalService

# ==========================================
# 1. ORDER & STOCK ENGINE TESTS
# ==========================================


def test_order_create_success_deducts_stock():
    mock_db = MagicMock()
    prod_id = uuid.uuid4()

    fake_product = Product(
        id=prod_id,
        category_id=uuid.uuid4(),
        name="Fender Jazz Bass",
        slug="fender-jazz-bass",
        sku="FJB-001",
        sale_enabled=True,
        sale_price=Decimal("15000000.00"),
        stock_quantity=5,
        is_active=True,
    )

    mock_db.execute.return_value.scalars.return_value.all.return_value = [fake_product]

    payload = OrderCreateRequest(
        shipping_name="Nguyen Van A",
        shipping_phone="0912345678",
        shipping_address="123 Tran Phu, Da Nang",
        items=[OrderItemCreate(product_id=prod_id, quantity=2)],
    )

    order = OrderService.create_order(payload=payload, user_id=uuid.uuid4(), db=mock_db)

    assert order.status == OrderStatus.PENDING
    assert order.payment_status == PaymentStatus.UNPAID
    assert order.subtotal == Decimal("30000000.00")
    # Stock should be deducted from 5 to 3
    assert fake_product.stock_quantity == 3
    assert len(order.items) == 1
    assert order.items[0].quantity == 2
    assert mock_db.commit.called


def test_order_create_insufficient_stock_fails():
    mock_db = MagicMock()
    prod_id = uuid.uuid4()

    fake_product = Product(
        id=prod_id,
        category_id=uuid.uuid4(),
        name="Ibanez SR500E Bass",
        slug="ibanez-sr500e",
        sku="IBA-SR500E",
        sale_enabled=True,
        sale_price=Decimal("18000000.00"),
        stock_quantity=1,
        is_active=True,
    )

    mock_db.execute.return_value.scalars.return_value.all.return_value = [fake_product]

    payload = OrderCreateRequest(
        shipping_name="Tran Van B",
        shipping_phone="0987654321",
        shipping_address="456 Le Duan, Da Nang",
        items=[OrderItemCreate(product_id=prod_id, quantity=2)],
    )

    with pytest.raises(HTTPException) as exc_info:
        OrderService.create_order(payload=payload, user_id=uuid.uuid4(), db=mock_db)

    assert exc_info.value.status_code == 400
    assert "chỉ còn 1 trong kho" in exc_info.value.detail


def test_order_state_machine_invalid_transition():
    mock_db = MagicMock()
    order_id = uuid.uuid4()

    fake_order = Order(
        id=order_id,
        user_id=uuid.uuid4(),
        order_number="VB-20260818-1111",
        status=OrderStatus.PENDING,
        payment_status=PaymentStatus.UNPAID,
        subtotal=Decimal("1000000.00"),
        shipping_fee=Decimal("50000.00"),
        total_amount=Decimal("1050000.00"),
        currency="VND",
        shipping_name="Test",
        shipping_phone="0912345678",
        shipping_address="Da Nang",
    )
    mock_db.get.return_value = fake_order

    # PENDING -> COMPLETED directly is invalid (must go through CONFIRMED/SHIPPED)
    with pytest.raises(HTTPException) as exc_info:
        OrderService.update_order_status(
            order_id=order_id, db=mock_db, new_status=OrderStatus.COMPLETED
        )

    assert exc_info.value.status_code == 400
    assert "Không thể chuyển trạng thái" in exc_info.value.detail


def test_order_update_payment_status_independently():
    mock_db = MagicMock()
    order_id = uuid.uuid4()

    fake_order = Order(
        id=order_id,
        user_id=uuid.uuid4(),
        order_number="VB-20260818-3333",
        status=OrderStatus.PENDING,
        payment_status=PaymentStatus.UNPAID,
        subtotal=Decimal("1000000.00"),
        shipping_fee=Decimal("50000.00"),
        total_amount=Decimal("1050000.00"),
        currency="VND",
        shipping_name="Test",
        shipping_phone="0912345678",
        shipping_address="Da Nang",
    )
    mock_db.get.return_value = fake_order

    # Update payment_status to PAID while keeping status PENDING
    updated = OrderService.update_order_status(
        order_id=order_id,
        db=mock_db,
        new_payment_status=PaymentStatus.PAID,
    )

    assert updated.payment_status == PaymentStatus.PAID
    assert updated.status == OrderStatus.PENDING
    assert mock_db.commit.called


def test_order_cancel_restocks_inventory():
    mock_db = MagicMock()
    prod_id = uuid.uuid4()
    order_id = uuid.uuid4()

    fake_product = Product(
        id=prod_id,
        category_id=uuid.uuid4(),
        name="Yamaha TRBX304",
        slug="yamaha-trbx304",
        sku="YAM-TRBX304",
        sale_enabled=True,
        sale_price=Decimal("9000000.00"),
        stock_quantity=3,
        is_active=True,
    )

    fake_item = OrderItem(
        id=uuid.uuid4(),
        order_id=order_id,
        product_id=prod_id,
        product_name="Yamaha TRBX304",
        sku="YAM-TRBX304",
        unit_price=Decimal("9000000.00"),
        quantity=2,
        subtotal=Decimal("18000000.00"),
    )

    fake_order = Order(
        id=order_id,
        user_id=uuid.uuid4(),
        order_number="VB-20260818-2222",
        status=OrderStatus.CONFIRMED,
        payment_status=PaymentStatus.UNPAID,
        subtotal=Decimal("18000000.00"),
        shipping_fee=Decimal("0.00"),
        total_amount=Decimal("18000000.00"),
        currency="VND",
        shipping_name="Test User",
        shipping_phone="0905123456",
        shipping_address="Da Nang",
        items=[fake_item],
    )

    mock_db.get.return_value = fake_order
    mock_db.execute.return_value.scalars.return_value.all.return_value = [fake_product]

    # Cancel order
    OrderService.cancel_order(
        order_id=order_id,
        current_user_id=fake_order.user_id,
        is_admin=False,
        reason="Đổi ý không mua nữa",
        db=mock_db,
    )

    # Stock was 3, restored +2 -> 5
    assert fake_product.stock_quantity == 5
    mock_db.delete.assert_called_once_with(fake_order)
    assert mock_db.commit.called


# ==========================================
# 2. SMART RENTAL ENGINE TESTS
# ==========================================


def test_rental_tiered_pricing():
    assert RentalService.get_tier_discount_multiplier(1) == Decimal("1.00")
    assert RentalService.get_tier_discount_multiplier(2) == Decimal("1.00")
    assert RentalService.get_tier_discount_multiplier(5) == Decimal("0.90")
    assert RentalService.get_tier_discount_multiplier(14) == Decimal("0.80")
    assert RentalService.get_tier_discount_multiplier(35) == Decimal("0.65")


def test_rental_create_success_with_deposit():
    mock_db = MagicMock()
    prod_id = uuid.uuid4()

    fake_product = Product(
        id=prod_id,
        category_id=uuid.uuid4(),
        name="Ampeg SVT Bass Amp",
        slug="ampeg-svt-bass-amp",
        sku="AMP-SVT",
        rental_enabled=True,
        rental_price=Decimal("500000.00"),
        sale_price=Decimal("20000000.00"),
        stock_quantity=2,
        is_active=True,
    )
    mock_db.get.return_value = fake_product
    # No existing overlapping bookings
    mock_db.execute.return_value.all.return_value = []

    today = date.today() + timedelta(days=2)
    end_day = today + timedelta(days=4)  # 5 days -> 10% discount

    payload = RentalRequestCreate(
        start_date=today,
        end_date=end_day,
        customer_name="Le Van C",
        customer_phone="0935123456",
        items=[RentalRequestItemCreate(product_id=prod_id, quantity=1)],
    )

    rental_req = RentalService.create_rental_request(
        payload=payload,
        user_id=uuid.uuid4(),
        db=mock_db,
    )

    assert rental_req.status == RentalRequestStatus.PENDING
    # 5 days with 10% off on 500,000 = 450,000 * 5 = 2,250,000
    assert rental_req.rental_total == Decimal("2250000.00")
    # Deposit: 30% of 20,000,000 = 6,000,000
    assert rental_req.deposit_amount == Decimal("6000000.00")


def test_rental_update_deposit_payment_status():
    mock_db = MagicMock()
    rental_id = uuid.uuid4()

    fake_rental = RentalRequest(
        id=rental_id,
        user_id=uuid.uuid4(),
        request_number="RENT-2026-0002",
        start_date=date.today(),
        end_date=date.today() + timedelta(days=3),
        status=RentalRequestStatus.PENDING,
        payment_status=RentalPaymentStatus.UNPAID,
        rental_total=Decimal("1500000.00"),
        deposit_amount=Decimal("3000000.00"),
        currency="VND",
        pickup_location="Showroom",
    )
    mock_db.get.return_value = fake_rental

    # Admin marks deposit as PAID
    updated = RentalService.update_rental_status(
        request_id=rental_id,
        db=mock_db,
        new_payment_status=RentalPaymentStatus.PAID,
    )

    assert updated.payment_status == RentalPaymentStatus.PAID
    assert updated.status == RentalRequestStatus.PENDING
    assert mock_db.commit.called

    # Admin marks deposit as REFUNDED upon return
    updated_refund = RentalService.update_rental_status(
        request_id=rental_id,
        db=mock_db,
        new_payment_status=RentalPaymentStatus.REFUNDED,
    )
    assert updated_refund.payment_status == RentalPaymentStatus.REFUNDED


def test_rental_date_collision_detected_and_rejected():
    mock_db = MagicMock()
    prod_id = uuid.uuid4()

    fake_product = Product(
        id=prod_id,
        category_id=uuid.uuid4(),
        name="Roland TD-17KVX E-Drums",
        slug="roland-td-17kvx",
        sku="ROL-TD17",
        rental_enabled=True,
        rental_price=Decimal("800000.00"),
        sale_price=Decimal("35000000.00"),
        stock_quantity=1,  # Only 1 unit in stock
        is_active=True,
    )
    mock_db.get.return_value = fake_product

    # Mock an existing active booking from Sept 10 to Sept 15
    d_start = date.today() + timedelta(days=5)
    d_end = date.today() + timedelta(days=10)

    existing_req = RentalRequest(
        id=uuid.uuid4(),
        user_id=uuid.uuid4(),
        request_number="RENT-2026-0001",
        start_date=d_start,
        end_date=d_end,
        status=RentalRequestStatus.CONFIRMED,
    )
    existing_item = RentalRequestItem(
        id=uuid.uuid4(),
        rental_request_id=existing_req.id,
        product_id=prod_id,
        quantity=1,
    )

    # Return existing booking in DB query
    mock_db.execute.return_value.all.return_value = [(existing_item, existing_req)]

    # New customer tries to book overlapping interval: d_start + 2 to d_end + 3
    new_start = d_start + timedelta(days=2)
    new_end = d_end + timedelta(days=3)

    payload = RentalRequestCreate(
        start_date=new_start,
        end_date=new_end,
        customer_name="Hoang D",
        customer_phone="0901234567",
        items=[RentalRequestItemCreate(product_id=prod_id, quantity=1)],
    )

    with pytest.raises(HTTPException) as exc_info:
        RentalService.create_rental_request(
            payload=payload,
            user_id=uuid.uuid4(),
            db=mock_db,
        )

    assert exc_info.value.status_code == 400
    assert "không đủ số lượng khả dụng" in exc_info.value.detail


# ==========================================
# 3. DISTRIBUTED RATE LIMITER TESTS
# ==========================================


def test_rate_limiter_fallback_in_memory():
    limiter = RedisDistributedRateLimiter(
        requests_limit=3, window_seconds=10, prefix="test:rl"
    )

    with patch("app.core.rate_limit.redis_client") as mock_redis:
        # Simulate Redis connection failure
        mock_redis.pipeline.side_effect = Exception("Redis connection lost")

        # 3 requests allowed
        assert limiter.is_rate_limited("client_ip_1") is False
        assert limiter.is_rate_limited("client_ip_1") is False
        assert limiter.is_rate_limited("client_ip_1") is False

        # 4th request exceeds limit -> True (blocked)
        assert limiter.is_rate_limited("client_ip_1") is True

        # Different client IP is unaffected
        assert limiter.is_rate_limited("client_ip_2") is False


def test_order_response_and_list_response_serialization():
    from datetime import UTC, datetime

    from app.schemas.order import OrderListResponse, OrderResponse

    prod_id = uuid.uuid4()
    order_id = uuid.uuid4()

    fake_item = OrderItem(
        id=uuid.uuid4(),
        order_id=order_id,
        product_id=prod_id,
        product_name="Pioneer DJ DDJ-FLX4",
        sku="DDJ-FLX4-PIO",
        unit_price=Decimal("10000000.00"),
        quantity=1,
        subtotal=Decimal("10000000.00"),
    )

    fake_order = Order(
        id=order_id,
        user_id=uuid.uuid4(),
        order_number="VB-20260821-0001",
        status=OrderStatus.PENDING,
        payment_status=PaymentStatus.UNPAID,
        subtotal=Decimal("10000000.00"),
        shipping_fee=Decimal("0.00"),
        total_amount=Decimal("10000000.00"),
        currency="VND",
        shipping_name="Nguyen Van A",
        shipping_phone="0905123456",
        shipping_address="123 Nguyen Van Linh, Da Nang",
        customer_note="Giao gio hanh chinh",
        created_at=datetime.now(UTC),
        updated_at=datetime.now(UTC),
        items=[fake_item],
    )

    # Test single OrderResponse
    order_resp = OrderResponse.model_validate(fake_order)
    assert len(order_resp.items) == 1
    assert order_resp.items[0].product_sku == "DDJ-FLX4-PIO"
    assert order_resp.items[0].sku == "DDJ-FLX4-PIO"
    assert order_resp.items[0].line_total == Decimal("10000000.00")
    assert order_resp.items[0].subtotal == Decimal("10000000.00")

    # Test OrderListResponse
    list_resp = OrderListResponse(items=[fake_order], total=1)
    assert len(list_resp.items) == 1
    assert list_resp.items[0].items[0].product_sku == "DDJ-FLX4-PIO"
    assert list_resp.items[0].items[0].line_total == Decimal("10000000.00")
