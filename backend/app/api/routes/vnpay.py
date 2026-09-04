"""
VNPAY Payment Routes
POST /api/orders/{order_id}/vnpay/create-payment  — Tạo URL thanh toán
GET  /api/orders/vnpay/ipn                         — Webhook server-to-server từ VNPAY
GET  /api/orders/vnpay/return                      — Redirect user sau khi thanh toán
"""

import logging
from datetime import UTC, datetime
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.responses import RedirectResponse
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.dependencies import get_db, get_optional_current_user
from app.core.config import settings
from app.models.order import Order, OrderStatus, PaymentStatus
from app.models.payment import Payment, PaymentMethod, PaymentTransactionStatus
from app.models.user import User
from app.schemas.vnpay import VnpayCreatePaymentResponse, VnpayIpnResponse
from app.services.email_service import EmailService
from app.services.vnpay_service import VnpayService

logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/orders",
    tags=["VNPAY Payment"],
)


# ---------------------------------------------------------------------------
# 1. Tạo URL thanh toán VNPAY
# ---------------------------------------------------------------------------

@router.post(
    "/{order_id}/vnpay/create-payment",
    response_model=VnpayCreatePaymentResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Tạo URL thanh toán VNPAY (QR hoặc redirect)",
)
def create_vnpay_payment(
    order_id: UUID,
    request: Request,
    current_user: User | None = Depends(get_optional_current_user),
    db: Session = Depends(get_db),
) -> VnpayCreatePaymentResponse:
    """
    Tạo Payment record (PENDING) và trả về URL thanh toán VNPAY.
    Frontend mở URL này để hiển thị QR hoặc redirect tới cổng VNPAY.
    """
    if not settings.vnpay_tmn_code or not settings.vnpay_hash_secret:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Cổng thanh toán VNPAY chưa được cấu hình",
        )

    order = db.get(Order, order_id)
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Không tìm thấy đơn hàng",
        )

    # Kiểm tra quyền: user chỉ được tạo payment cho đơn của mình
    if current_user and order.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Bạn không có quyền thanh toán đơn hàng này",
        )

    if order.status == OrderStatus.CANCELLED:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Không thể thanh toán đơn hàng đã bị hủy",
        )

    if order.payment_status == PaymentStatus.PAID:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Đơn hàng đã được thanh toán",
        )

    # Hủy/đánh dấu FAILED các giao dịch PENDING cũ chưa hoàn tất nếu user thử thanh toán lại
    existing_pendings = db.execute(
        select(Payment).where(
            Payment.order_id == order.id,
            Payment.status.in_([
                PaymentTransactionStatus.PENDING,
                PaymentTransactionStatus.PROCESSING,
            ]),
        )
    ).scalars().all()
    for old_p in existing_pendings:
        old_p.status = PaymentTransactionStatus.FAILED
    db.flush()

    # Tạo Payment record PENDING
    payment = Payment(
        order_id=order.id,
        payment_method=PaymentMethod.VIETQR,
        provider="vnpay",
        amount=order.total_amount,
        currency=order.currency,
        status=PaymentTransactionStatus.PENDING,
    )
    db.add(payment)
    db.commit()
    db.refresh(payment)

    # Lấy IP client (ưu tiên header X-Forwarded-For khi qua proxy/ngrok)
    client_ip = (
        request.headers.get("X-Forwarded-For", "").split(",")[0].strip()
        or (request.client.host if request.client else "127.0.0.1")
    )

    order_info = f"Thanh toan don hang {order.order_number}"
    payment_url = VnpayService.build_payment_url(
        order_number=order.order_number,
        amount=order.total_amount,
        order_info=order_info,
        client_ip=client_ip,
    )

    logger.info(
        "VNPAY payment created | order=%s amount=%s payment_id=%s",
        order.order_number,
        order.total_amount,
        payment.id,
    )

    return VnpayCreatePaymentResponse(
        payment_url=payment_url,
        order_id=order.id,
        order_number=order.order_number,
        amount=order.total_amount,
    )


# ---------------------------------------------------------------------------
# 2. IPN — VNPAY gọi về đây server-to-server sau khi thanh toán
# ---------------------------------------------------------------------------

@router.get(
    "/vnpay/ipn",
    response_model=VnpayIpnResponse,
    summary="VNPAY IPN Webhook (server-to-server)",
)
def vnpay_ipn(
    request: Request,
    db: Session = Depends(get_db),
) -> VnpayIpnResponse:
    """
    Endpoint VNPAY gọi để xác nhận kết quả giao dịch (server-to-server).
    KHÔNG phải redirect của user — đây là background call từ VNPAY.

    VNPAY yêu cầu trả về {"RspCode": "00", "Message": "Confirm Success"}
    nếu xử lý thành công, hoặc mã lỗi khác để VNPAY retry.
    """
    params = dict(request.query_params)

    # 1. Xác thực chữ ký
    if not VnpayService.verify_ipn_signature(params):
        logger.warning("VNPAY IPN: Invalid signature | params=%s", params)
        return VnpayIpnResponse(
            RspCode=VnpayService.RESPONSE_INVALID_SIGNATURE,
            Message="Invalid Signature",
        )

    # 2. Parse thông tin giao dịch
    parsed = VnpayService.parse_ipn_params(params)
    order_number = parsed["order_number"]
    vnpay_amount = parsed["amount"]
    transaction_id = parsed["transaction_id"]
    response_code = parsed["response_code"]

    logger.info(
        "VNPAY IPN received | order=%s txn=%s code=%s amount=%s",
        order_number, transaction_id, response_code, vnpay_amount,
    )

    # 3. Tìm đơn hàng theo order_number (vnp_TxnRef)
    order = db.execute(
        select(Order).where(Order.order_number == order_number)
    ).scalar_one_or_none()

    if not order:
        logger.error("VNPAY IPN: Order not found | order_number=%s", order_number)
        return VnpayIpnResponse(
            RspCode=VnpayService.RESPONSE_ORDER_NOT_FOUND,
            Message="Order not found",
        )

    # 4. Kiểm tra đơn đã được xác nhận chưa (idempotency)
    if order.payment_status == PaymentStatus.PAID:
        logger.info("VNPAY IPN: Order already confirmed | order=%s", order_number)
        return VnpayIpnResponse(
            RspCode=VnpayService.RESPONSE_ALREADY_CONFIRMED,
            Message="Order already confirmed",
        )

    # 5. Kiểm tra số tiền khớp (tránh gian lận)
    if abs(vnpay_amount - order.total_amount) > 0:
        logger.error(
            "VNPAY IPN: Amount mismatch | order=%s expected=%s got=%s",
            order_number, order.total_amount, vnpay_amount,
        )
        return VnpayIpnResponse(
            RspCode=VnpayService.RESPONSE_INVALID_AMOUNT,
            Message="Invalid Amount",
        )

    # 6. Nếu VNPAY báo giao dịch thành công → cập nhật DB
    if VnpayService.is_payment_success(params):
        _confirm_payment(
            order=order,
            transaction_id=transaction_id,
            bank_code=parsed.get("bank_code", ""),
            db=db,
        )
        return VnpayIpnResponse(
            RspCode=VnpayService.RESPONSE_SUCCESS,
            Message="Confirm Success",
        )

    # Giao dịch thất bại — cập nhật Payment FAILED, giữ Order chưa paid
    _fail_payment(order=order, db=db)
    logger.info(
        "VNPAY IPN: Payment failed | order=%s response_code=%s",
        order_number, response_code,
    )
    return VnpayIpnResponse(
        RspCode=VnpayService.RESPONSE_SUCCESS,  # Vẫn trả 00 để VNPAY không retry
        Message="Payment failed — order not updated",
    )


# ---------------------------------------------------------------------------
# 3. Return URL — VNPAY redirect user về đây sau khi thanh toán xong
# ---------------------------------------------------------------------------

@router.get(
    "/vnpay/return",
    summary="VNPAY Return URL (user redirect)",
)
def vnpay_return(
    request: Request,
    db: Session = Depends(get_db),
) -> RedirectResponse:
    """
    VNPAY redirect user về đây sau khi thanh toán.
    Xác thực chữ ký rồi redirect về frontend với kết quả.
    """
    params = dict(request.query_params)
    is_valid = VnpayService.verify_ipn_signature(params)
    is_success = VnpayService.is_payment_success(params)
    parsed = VnpayService.parse_ipn_params(params)
    order_number = parsed["order_number"]
    response_code = parsed["response_code"]
    transaction_id = parsed["transaction_id"]

    if is_valid and is_success:
        order = db.execute(
            select(Order).where(Order.order_number == order_number)
        ).scalar_one_or_none()

        if order and order.payment_status != PaymentStatus.PAID:
            _confirm_payment(
                order=order,
                transaction_id=transaction_id,
                bank_code=parsed.get("bank_code", ""),
                db=db,
            )

        redirect_url = (
            f"{settings.vnpay_return_url}"
            f"?success=true&order={order_number}&code={response_code}"
        )
    else:
        reason = "invalid_signature" if not is_valid else f"code_{response_code}"
        redirect_url = (
            f"{settings.vnpay_return_url}"
            f"?success=false&order={order_number}&reason={reason}&code={response_code}"
        )

    return RedirectResponse(url=redirect_url, status_code=302)


# ---------------------------------------------------------------------------
# Internal helpers
# ---------------------------------------------------------------------------

def _confirm_payment(
    order: Order,
    transaction_id: str,
    bank_code: str,
    db: Session,
) -> None:
    """Cập nhật Order và Payment record khi giao dịch thành công."""
    # Cập nhật trạng thái đơn hàng
    order.payment_status = PaymentStatus.PAID
    if order.status == OrderStatus.PENDING:
        order.status = OrderStatus.CONFIRMED

    # Tìm Payment PENDING gần nhất để cập nhật
    pending_payment = db.execute(
        select(Payment).where(
            Payment.order_id == order.id,
            Payment.status == PaymentTransactionStatus.PENDING,
        ).order_by(Payment.created_at.desc())
    ).scalar_one_or_none()

    if pending_payment:
        pending_payment.status = PaymentTransactionStatus.PAID
        pending_payment.paid_at = datetime.now(UTC)
        pending_payment.transaction_id = transaction_id or None

    db.commit()
    logger.info(
        "Payment confirmed | order=%s txn=%s bank=%s",
        order.order_number, transaction_id, bank_code,
    )

    # Dispatch email confirmation to customer & notification to staff now that online payment succeeded
    try:
        user_record = db.get(User, order.user_id) if order.user_id else None
        cust_email = (
            user_record.email
            if user_record and user_record.email and "@" in user_record.email and not user_record.email.endswith("@vanbass.local")
            else None
        )
        if cust_email:
            EmailService.send_order_confirmation_to_customer(
                order=order,
                customer_email=cust_email,
            )
        EmailService.send_order_notification_to_staff(
            order=order,
        )
    except Exception as email_err:
        logger.warning("VNPAY confirmation email dispatch error: %s", email_err)


def _fail_payment(order: Order, db: Session) -> None:
    """Đánh dấu Payment FAILED khi VNPAY báo giao dịch thất bại."""
    pending_payment = db.execute(
        select(Payment).where(
            Payment.order_id == order.id,
            Payment.status == PaymentTransactionStatus.PENDING,
        ).order_by(Payment.created_at.desc())
    ).scalar_one_or_none()

    if pending_payment:
        pending_payment.status = PaymentTransactionStatus.FAILED

    db.commit()
