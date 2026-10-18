import uuid
from decimal import Decimal
from unittest.mock import MagicMock, patch

from app.api.routes.order import notify_staff_and_customer_of_order
from app.models.order import Order, OrderStatus, PaymentStatus
from app.models.user import User, UserRole
from app.services.email_service import EmailService, is_routable_email


def test_is_routable_email():
    assert is_routable_email("levu482003@gmail.com") is True
    assert is_routable_email("staff@company.com") is True
    assert is_routable_email("admin@vanbass.vn") is False
    assert is_routable_email("test@domain.local") is False
    assert is_routable_email("invalid_email") is False
    assert is_routable_email("") is False


def test_notify_staff_and_customer_of_order():
    mock_db = MagicMock()
    order = Order(
        id=uuid.uuid4(),
        order_number="VB-TEST123",
        status=OrderStatus.CONFIRMED,
        payment_status=PaymentStatus.PAID,
        total_amount=Decimal("500000"),
        shipping_name="Test Customer",
        shipping_phone="0901234567",
        shipping_address="123 Street",
    )

    # Mock DB active staff users query
    mock_db.execute.return_value.scalars.return_value.all.return_value = [
        "levu482003@gmail.com",
        "admin@vanbass.vn",
        "inactive_staff@test.local",
    ]

    with (
        patch.object(EmailService, "send_order_confirmation_to_customer") as mock_customer_email,
        patch.object(EmailService, "send_order_notification_to_staff") as mock_staff_email,
    ):
        notify_staff_and_customer_of_order(
            order=order,
            db=mock_db,
            customer_email="customer@example.org",
        )

        mock_customer_email.assert_called_once_with(
            order=order,
            customer_email="customer@example.org",
        )

        mock_staff_email.assert_called_once()
        _, kwargs = mock_staff_email.call_args
        assert kwargs["order"] == order
        # staff_emails passed should contain valid staff emails
        assert "levu482003@gmail.com" in kwargs["extra_notify_emails"]
