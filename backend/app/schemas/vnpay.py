from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel


class VnpayCreatePaymentResponse(BaseModel):
    """Response trả về cho client sau khi tạo URL thanh toán VNPAY."""

    payment_url: str
    order_id: UUID
    order_number: str
    amount: Decimal


class VnpayIpnResponse(BaseModel):
    """
    Response đúng định dạng VNPAY yêu cầu cho IPN endpoint.
    VNPAY sẽ retry nếu không nhận được RspCode="00".
    """

    RspCode: str
    Message: str
