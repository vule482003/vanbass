"""
VNPAY Payment Gateway Service
Tài liệu: https://sandbox.vnpayment.vn/apis/docs/
"""

import hashlib
import hmac
import urllib.parse
from datetime import datetime, timezone
from decimal import Decimal
from uuid import UUID

from app.core.config import settings


class VnpayService:
    """
    Cổng thanh toán VNPAY — tạo URL, xác thực chữ ký HMAC-SHA512.

    Tham chiếu:
    - Số tiền (vnp_Amount) phải nhân 100 (VNPAY không dùng số thập phân).
    - Params phải sort theo alphabet trước khi hash.
    - Chữ ký dùng HMAC-SHA512 với vnp_HashSecret.
    """

    # Response codes từ VNPAY
    RESPONSE_SUCCESS = "00"
    RESPONSE_INVALID_SIGNATURE = "97"
    RESPONSE_ORDER_NOT_FOUND = "01"
    RESPONSE_ALREADY_CONFIRMED = "02"
    RESPONSE_INVALID_AMOUNT = "04"
    RESPONSE_SYSTEM_ERROR = "99"

    @classmethod
    def build_payment_url(
        cls,
        order_number: str,
        amount: Decimal,
        order_info: str,
        client_ip: str,
        locale: str = "vn",
        bank_code: str | None = None,
    ) -> str:
        """
        Tạo URL thanh toán VNPAY.

        Args:
            order_number: Mã đơn hàng (vnp_TxnRef) — dùng để khớp khi nhận IPN.
            amount: Số tiền VND (sẽ được nhân 100 theo yêu cầu VNPAY).
            order_info: Mô tả giao dịch hiển thị cho user.
            client_ip: IP của client (bắt buộc theo VNPAY).
            locale: "vn" hoặc "en".
            bank_code: Mã ngân hàng (nếu muốn chọn sẵn, để None = user tự chọn).

        Returns:
            URL đầy đủ để redirect hoặc hiển thị QR.
        """
        now = datetime.now(timezone.utc).astimezone()

        params: dict[str, str] = {
            "vnp_Version": "2.1.0",
            "vnp_Command": "pay",
            "vnp_TmnCode": settings.vnpay_tmn_code,
            "vnp_Amount": str(int(amount * 100)),  # VNPAY yêu cầu x100
            "vnp_CurrCode": "VND",
            "vnp_TxnRef": order_number,  # Mã đơn hàng — dùng để khớp IPN
            "vnp_OrderInfo": order_info,
            "vnp_OrderType": "other",
            "vnp_Locale": locale,
            "vnp_ReturnUrl": settings.vnpay_backend_return_url or "http://localhost:8000/api/orders/vnpay/return",
            "vnp_IpAddr": client_ip,
            "vnp_CreateDate": now.strftime("%Y%m%d%H%M%S"),
        }

        if bank_code:
            params["vnp_BankCode"] = bank_code

        secure_hash = cls._compute_hmac_sha512(params)
        params["vnp_SecureHash"] = secure_hash

        query_string = urllib.parse.urlencode(params)
        return f"{settings.vnpay_payment_url}?{query_string}"

    @classmethod
    def verify_ipn_signature(cls, params: dict[str, str]) -> bool:
        """
        Xác thực chữ ký HMAC-SHA512 từ VNPAY IPN / Return URL.

        Args:
            params: Toàn bộ query params nhận được từ VNPAY (bao gồm vnp_SecureHash).

        Returns:
            True nếu chữ ký hợp lệ, False nếu bị giả mạo.
        """
        received_hash = params.get("vnp_SecureHash", "")

        # Loại bỏ hash fields trước khi tính lại
        signing_params = {
            k: v for k, v in params.items()
            if k not in ("vnp_SecureHash", "vnp_SecureHashType")
        }

        expected_hash = cls._compute_hmac_sha512(signing_params)

        # So sánh constant-time để tránh timing attack
        return hmac.compare_digest(
            received_hash.lower(),
            expected_hash.lower(),
        )

    @staticmethod
    def is_payment_success(params: dict[str, str]) -> bool:
        """Kiểm tra giao dịch thành công (response code 00)."""
        return params.get("vnp_ResponseCode") == "00"

    @staticmethod
    def parse_ipn_params(params: dict[str, str]) -> dict:
        """
        Trích xuất các thông tin cốt lõi từ IPN params.

        Returns:
            dict với các key: order_number, amount, transaction_id,
            response_code, bank_code, transaction_no.
        """
        raw_amount = params.get("vnp_Amount", "0")
        # Chia 100 để về số tiền thực
        amount = Decimal(raw_amount) / 100 if raw_amount else Decimal("0")

        return {
            "order_number": params.get("vnp_TxnRef", ""),
            "amount": amount,
            "transaction_id": params.get("vnp_TransactionNo", ""),
            "response_code": params.get("vnp_ResponseCode", ""),
            "bank_code": params.get("vnp_BankCode", ""),
            "pay_date": params.get("vnp_PayDate", ""),
            "card_type": params.get("vnp_CardType", ""),
        }

    @staticmethod
    def _compute_hmac_sha512(params: dict[str, str]) -> str:
        """
        Tạo HMAC-SHA512 từ params theo đúng quy tắc VNPAY:
        1. Sort params theo key alphabet.
        2. URL-encode values (VNPAY dùng quote_plus).
        3. Join thành query string.
        4. HMAC-SHA512 với vnp_HashSecret.
        """
        # Bước 1: Sort theo alphabet
        sorted_params = sorted(params.items())

        # Bước 2 & 3: Build query string (urllib encode nhưng KHÔNG encode dấu &=)
        hash_data = "&".join(
            f"{urllib.parse.quote_plus(str(k))}={urllib.parse.quote_plus(str(v))}"
            for k, v in sorted_params
        )

        # Bước 4: HMAC-SHA512
        secret = settings.vnpay_hash_secret.encode("utf-8")
        message = hash_data.encode("utf-8")
        return hmac.new(secret, message, hashlib.sha512).hexdigest()
