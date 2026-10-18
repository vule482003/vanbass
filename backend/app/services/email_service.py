import logging
import smtplib
from concurrent.futures import ThreadPoolExecutor
from decimal import Decimal
from email.header import Header
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from typing import Any

from app.core.config import settings

logger = logging.getLogger("email_service")

# Thread pool for non-blocking asynchronous email dispatching
email_executor = ThreadPoolExecutor(max_workers=3, thread_name_prefix="email_worker")


def format_currency(val: Decimal | float | None) -> str:
    if val is None:
        return "0 đ"
    try:
        return f"{int(val):,}".replace(",", ".") + " đ"
    except (ValueError, TypeError, OverflowError):
        return f"{val} đ"


def is_routable_email(email: str | None) -> bool:
    """
    Check if an email address is valid and routable for actual notifications,
    excluding empty, invalid, .local or placeholder emails like admin@vanbass.vn.
    """
    if not email or "@" not in email:
        return False
    clean = email.strip()
    return not (clean.endswith(".local") or clean.lower() == "admin@vanbass.vn")


class EmailService:
    @classmethod
    def is_configured(cls) -> bool:
        """
        Check if SMTP host, user, and password are configured.
        Returns False if any required setting is missing or empty.
        """
        return bool(
            settings.smtp_host
            and settings.smtp_host.strip()
            and settings.smtp_user
            and settings.smtp_user.strip()
            and settings.smtp_password
            and settings.smtp_password.strip()
        )

    @classmethod
    def _send_sync(
        cls,
        to_emails: list[str],
        subject: str,
        html_content: str,
        text_content: str | None = None,
    ) -> bool:
        """
        Synchronous SMTP sender using smtplib.
        Runs inside worker thread to prevent blocking FastAPI async event loop.
        """
        if not to_emails:
            logger.warning("No recipient emails provided. Skipping email dispatch.")
            return False

        # Filter out empty or whitespace-only emails
        clean_recipients = [e.strip() for e in to_emails if e and e.strip()]
        if not clean_recipients:
            return False

        if not cls.is_configured():
            logger.warning(
                "Cannot send email '%s' to %s: SMTP credentials not configured in settings.",
                subject,
                clean_recipients,
            )
            return False

        smtp_user = settings.smtp_user.strip()
        smtp_password = settings.smtp_password.strip()
        smtp_host = settings.smtp_host.strip()
        smtp_port = settings.smtp_port

        from_email = (
            settings.smtp_from_email.strip()
            if settings.smtp_from_email
            else smtp_user or "no-reply@vanbass.vn"
        )
        from_name = settings.smtp_from_name or "VanBass Music Center"

        try:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = Header(subject, "utf-8")
            msg["From"] = f"{Header(from_name, 'utf-8').encode()} <{from_email}>"
            msg["To"] = ", ".join(clean_recipients)

            if text_content:
                msg.attach(MIMEText(text_content, "plain", "utf-8"))
            if html_content:
                msg.attach(MIMEText(html_content, "html", "utf-8"))

            if smtp_port == 465:
                # SSL connection
                with smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=15) as server:
                    server.login(smtp_user, smtp_password)
                    server.sendmail(from_email, clean_recipients, msg.as_string())
            else:
                # STARTTLS connection (standard for Gmail port 587)
                with smtplib.SMTP(smtp_host, smtp_port, timeout=15) as server:
                    if settings.smtp_use_tls:
                        server.starttls()
                    server.login(smtp_user, smtp_password)
                    server.sendmail(from_email, clean_recipients, msg.as_string())

            logger.info(
                "Successfully sent email '%s' to %s", subject, clean_recipients
            )
            return True

        except smtplib.SMTPAuthenticationError as e:
            logger.error("SMTP authentication failed for user '%s': %s", smtp_user, e)
            return False
        except smtplib.SMTPConnectError as e:
            logger.error("SMTP connection failed to %s:%s: %s", smtp_host, smtp_port, e)
            return False
        except (TimeoutError, smtplib.SMTPServerDisconnected) as e:
            logger.error("SMTP timeout or disconnected (%s:%s): %s", smtp_host, smtp_port, e)
            return False
        except smtplib.SMTPRecipientsRefused as e:
            logger.error("SMTP recipients refused for %s: %s", clean_recipients, e)
            return False
        except smtplib.SMTPException as e:
            logger.error("SMTP protocol error while sending '%s': %s", subject, e)
            return False
        except Exception as e:  # noqa: BLE001
            logger.error("Unexpected error while sending email '%s': %s", subject, e)
            return False

    @classmethod
    def send_async(
        cls,
        to_emails: list[str] | str,
        subject: str,
        html_content: str,
        text_content: str | None = None,
    ):
        """
        Non-blocking async email dispatcher with failure logging.
        """
        recipients = [to_emails] if isinstance(to_emails, str) else to_emails
        future = email_executor.submit(
            cls._send_sync,
            recipients,
            subject,
            html_content,
            text_content,
        )

        def _on_complete(fut):
            try:
                success = fut.result()
                if not success:
                    logger.warning("Async email dispatch finished with failure status for '%s'", subject)
            except Exception as e:  # noqa: BLE001
                logger.error("Async email dispatch encountered an exception for '%s': %s", subject, e)

        future.add_done_callback(_on_complete)
        return future

    # =========================================================================
    # EMAIL TEMPLATES
    # =========================================================================

    @classmethod
    def send_order_confirmation_to_customer(
        cls,
        order: Any,
        customer_email: str,
    ):
        """
        Send Order Confirmation Email to the Buyer (Clean Minimal Template - Sample 4).
        """
        if not customer_email:
            return

        order_number = getattr(order, "order_number", "VB-ORDER")
        customer_name = getattr(order, "shipping_name", "Quý khách") or "Quý khách"
        phone = getattr(order, "shipping_phone", "") or ""
        address = getattr(order, "shipping_address", "") or ""
        total_amount = getattr(order, "total_amount", 0)
        items = getattr(order, "items", [])

        # Build items list
        items_html = ""
        for item in items:
            p_name = getattr(item, "product_name", "Sản phẩm")
            p_qty = getattr(item, "quantity", 1)
            p_sub = format_currency(getattr(item, "subtotal", 0))
            items_html += f"""
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 8px;">
              <tr>
                <td style="vertical-align: top; padding: 4px 0;">
                  <div style="font-size: 14px; font-weight: 600; color: #111827;">{p_name}</div>
                  <div style="font-size: 13px; color: #6b7280; margin-top: 2px;">Số lượng: {p_qty}</div>
                </td>
                <td style="vertical-align: top; text-align: right; padding: 4px 0; font-size: 14px; font-weight: 500; color: #111827; white-space: nowrap;">
                  {p_sub}
                </td>
              </tr>
            </table>
            """

        formatted_total = format_currency(total_amount)

        html_body = f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Xác nhận đơn hàng #{order_number}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111827; -webkit-font-smoothing: antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; width: 100%; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <tr>
            <td style="padding: 32px;">
              
              <!-- Header -->
              <div style="margin-bottom: 16px;">
                <div style="font-size: 16px; font-weight: 700; color: #15803d; text-transform: uppercase; letter-spacing: 0.5px;">VANBASS MUSIC CENTER</div>
                <div style="font-size: 13px; color: #6b7280; margin-top: 4px;">Xác nhận đơn hàng</div>
              </div>
              
              <div style="border-bottom: 1px solid #e5e7eb; margin: 16px 0 20px 0;"></div>

              <!-- Greeting -->
              <div style="font-size: 17px; font-weight: 700; color: #111827; margin-bottom: 8px;">Xin chào {customer_name},</div>
              <p style="font-size: 14px; color: #374151; line-height: 1.6; margin: 0 0 20px 0;">
                Cảm ơn bạn đã đặt hàng tại VanBass Music Center. Chúng tôi đã tiếp nhận đơn hàng của bạn.
              </p>

              <!-- Order Summary Box -->
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px 20px; margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">MÃ ĐƠN HÀNG</div>
                <div style="font-size: 20px; font-weight: 800; color: #111827; margin-bottom: 6px;">{order_number}</div>
                <div style="font-size: 13.5px; color: #4b5563;">Trạng thái: Đã tiếp nhận</div>
              </div>

              <!-- Shipping Info -->
              <div style="margin-bottom: 24px;">
                <div style="font-size: 15px; font-weight: 700; color: #111827; margin-bottom: 10px;">Thông tin giao hàng</div>
                <div style="font-size: 14px; color: #374151; margin-bottom: 6px;">Người nhận: {customer_name}</div>
                <div style="font-size: 14px; color: #374151; margin-bottom: 6px;">Điện thoại: {phone}</div>
                <div style="font-size: 14px; color: #374151;">Địa chỉ: {address}</div>
              </div>

              <!-- Order Details -->
              <div style="margin-bottom: 20px;">
                <div style="font-size: 15px; font-weight: 700; color: #111827; margin-bottom: 12px;">Chi tiết đơn hàng</div>
                {items_html}
              </div>

              <!-- Total Breakdown -->
              <div style="border-top: 1px solid #e5e7eb; margin: 16px 0; padding-top: 16px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size: 15px; font-weight: 700; color: #111827;">Tổng thanh toán</td>
                    <td style="text-align: right; font-size: 16px; font-weight: 700; color: #15803d; white-space: nowrap;">{formatted_total}</td>
                  </tr>
                </table>
              </div>

              <!-- Support Info -->
              <p style="font-size: 13.5px; color: #4b5563; line-height: 1.5; margin: 24px 0 24px 0;">
                Nếu cần hỗ trợ về đơn hàng, vui lòng liên hệ bộ phận chăm sóc khách hàng của chúng tôi.
              </p>

              <!-- Footer -->
              <div style="border-top: 1px solid #e5e7eb; margin-top: 24px; padding-top: 16px;">
                <div style="font-size: 12.5px; color: #6b7280; margin-bottom: 4px;">VanBass Music Center · Đà Nẵng</div>
                <div style="font-size: 12px; color: #9ca3af;">Email tự động xác nhận giao dịch của bạn.</div>
              </div>

            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        """

        cls.send_async(
            to_emails=customer_email,
            subject=f"[VanBass] Xác nhận đơn hàng thành công #{order_number}",
            html_content=html_body,
        )

    @classmethod
    def send_order_notification_to_staff(
        cls,
        order: Any,
        extra_notify_emails: list[str] | None = None,
    ):
        """
        Send New Order Alert Email to Shop Admins and Staff (Clean Minimal Template - Sample 3).
        """
        # Determine recipients: settings.shop_notify_emails + extra_notify_emails
        raw_list = (
            [e.strip() for e in settings.shop_notify_emails.split(",") if e.strip()]
            if settings.shop_notify_emails
            else []
        )
        if extra_notify_emails:
            raw_list.extend(extra_notify_emails)

        recipients = list(set(raw_list))
        if not recipients:
            return

        order_number = getattr(order, "order_number", "VB-ORDER")
        customer_name = getattr(order, "shipping_name", "Khách hàng") or "Khách hàng"
        phone = getattr(order, "shipping_phone", "") or ""
        address = getattr(order, "shipping_address", "") or ""
        total_amount = getattr(order, "total_amount", 0)
        items = getattr(order, "items", [])
        customer_note = getattr(order, "customer_note", "") or ""

        # Format products and quantity for card summary
        if len(items) == 1:
            product_line = f'<div style="font-size: 14px; color: #374151; margin-bottom: 6px;">Sản phẩm: {getattr(items[0], "product_name", "Sản phẩm")}</div>'
            qty_line = f'<div style="font-size: 14px; color: #374151; margin-bottom: 6px;">Số lượng: {getattr(items[0], "quantity", 1)}</div>'
        elif len(items) > 1:
            items_text = ", ".join([f"{getattr(i, 'product_name', 'Sản phẩm')} (x{getattr(i, 'quantity', 1)})" for i in items])
            total_qty = sum(getattr(i, "quantity", 1) for i in items)
            product_line = f'<div style="font-size: 14px; color: #374151; margin-bottom: 6px;">Sản phẩm: {items_text}</div>'
            qty_line = f'<div style="font-size: 14px; color: #374151; margin-bottom: 6px;">Số lượng: {total_qty}</div>'
        else:
            product_line = '<div style="font-size: 14px; color: #374151; margin-bottom: 6px;">Sản phẩm: Đơn hàng</div>'
            qty_line = '<div style="font-size: 14px; color: #374151; margin-bottom: 6px;">Số lượng: 1</div>'

        formatted_total = format_currency(total_amount)

        # Optional phone & address & note lines if available
        phone_html = f'<div style="font-size: 14px; color: #374151; margin-bottom: 6px;">Điện thoại: {phone}</div>' if phone and phone != "Chưa có" else ""
        address_html = f'<div style="font-size: 14px; color: #374151; margin-bottom: 6px;">Địa chỉ: {address}</div>' if address and address != "Chưa có" else ""
        note_html = f'<div style="font-size: 14px; color: #374151; margin-bottom: 6px;">Ghi chú: {customer_note}</div>' if customer_note else ""

        html_body = f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Đơn hàng #{order_number}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111827; -webkit-font-smoothing: antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 560px; width: 100%; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <tr>
            <td style="padding: 32px;">
              
              <!-- Header -->
              <div style="margin-bottom: 16px;">
                <div style="font-size: 16px; font-weight: 700; color: #111827;">VanBass Music Center</div>
                <div style="font-size: 12.5px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 4px;">THÔNG BÁO ĐƠN HÀNG MỚI</div>
              </div>
              
              <div style="border-bottom: 1px solid #e5e7eb; margin: 16px 0 20px 0;"></div>

              <!-- Heading -->
              <div style="font-size: 20px; font-weight: 700; color: #111827; margin-bottom: 6px;">Đơn hàng {order_number}</div>
              <p style="font-size: 14px; color: #4b5563; margin: 0 0 20px 0;">
                Có đơn hàng mới cần được kiểm tra và xử lý.
              </p>

              <!-- Customer Info Card -->
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 18px 20px; margin-bottom: 20px;">
                <div style="font-size: 15px; font-weight: 700; color: #111827; margin-bottom: 12px;">Thông tin khách hàng</div>
                <div style="font-size: 14px; color: #374151; margin-bottom: 6px;">Họ tên: {customer_name}</div>
                {phone_html}
                {address_html}
                {note_html}
                {product_line}
                {qty_line}
                <div style="font-size: 14px; color: #374151;">Tổng tiền: {formatted_total}</div>
              </div>

              <!-- Instruction -->
              <p style="font-size: 14px; color: #4b5563; margin: 0 0 16px 0;">
                Vui lòng đăng nhập trang quản trị để xem chi tiết và xử lý đơn hàng.
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td>
                    <a href="http://localhost:3000/admin" style="display: block; width: 100%; box-sizing: border-box; text-align: center; background-color: #15803d; color: #ffffff; font-size: 15px; font-weight: 600; padding: 13px 20px; border-radius: 6px; text-decoration: none;">
                      Xem đơn hàng trong quản trị
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Footer -->
              <div style="border-top: 1px solid #e5e7eb; padding-top: 16px;">
                <div style="font-size: 12.5px; color: #6b7280;">Email tự động từ hệ thống VanBass Music Center.</div>
              </div>

            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        """

        cls.send_async(
            to_emails=recipients,
            subject=f"[ĐƠN HÀNG MỚI #{order_number}] {customer_name} - {formatted_total}",
            html_content=html_body,
        )

    @classmethod
    def send_test_email(cls, to_email: str) -> dict[str, Any]:
        """
        Send a real test email to verify SMTP configuration.
        """
        clean_to = to_email.strip()
        is_configured = cls.is_configured()

        if not is_configured:
            return {
                "success": False,
                "to_email": clean_to,
                "smtp_configured": False,
                "message": "Chưa thể gửi email: Vui lòng cấu hình SMTP_USER và SMTP_PASSWORD trong biến môi trường.",
            }

        html_body = f"""
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Test Email VanBass</title></head>
<body style="background: #09090b; color: #f4f4f5; font-family: sans-serif; padding: 30px; text-align: center;">
  <div style="max-width: 500px; margin: auto; background: #181c18; padding: 30px; border-radius: 12px; border: 1px solid #22c55e;">
    <h2 style="color: #22c55e; margin-top: 0;"> KẾT NỐI EMAIL THÀNH CÔNG!</h2>
    <p style="color: #d4d4d8; font-size: 15px;">
      Đây là email kiểm tra từ hệ thống <strong>VanBass Music Center</strong>.
    </p>
    <p style="color: #a1a1aa; font-size: 13px;">
      Hệ thống thông báo tự động cho Khách hàng &amp; Nhân viên đã hoạt động bình thường.
    </p>
    <div style="margin-top: 20px; padding: 10px; background: #000; border-radius: 6px; font-size: 12px; color: #4ade80;">
      Gửi tới: {clean_to} | Máy chủ: {settings.smtp_host}:{settings.smtp_port}
    </div>
  </div>
</body>
</html>
        """

        success = cls._send_sync(
            to_emails=[clean_to],
            subject="[VanBass] Kiểm tra cấu hình gửi Email thành công! 🎉",
            html_content=html_body,
        )

        return {
            "success": success,
            "to_email": clean_to,
            "smtp_configured": True,
            "message": (
                "Đã gửi email thực tế qua Gmail SMTP thành công!"
                if success
                else "Gửi email thất bại. Vui lòng kiểm tra lại thông tin SMTP_USER và SMTP_PASSWORD."
            ),
        }

    @classmethod
    def send_password_reset_otp(cls, to_email: str, otp: str) -> bool:
        """
        Send a secure 6-digit OTP for password reset synchronously.
        Returns True if accepted by the SMTP server, False otherwise.
        """
        clean_to = to_email.strip()
        if not clean_to:
            return False

        html_body = f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mã xác thực đặt lại mật khẩu - VanBass</title>
</head>
<body style="margin: 0; padding: 0; background-color: #09090b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f4f4f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #09090b; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 540px; width: 100%; background-color: #121412; border: 1px solid #27272a; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.8);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #181c18 0%, #0d120d 100%); padding: 32px 24px; text-align: center; border-bottom: 2px solid #22c55e;">
              <h1 style="margin: 0; color: #22c55e; font-size: 22px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase;">
                VANBASS MUSIC CENTER
              </h1>
              <p style="margin: 6px 0 0 0; color: #a1a1aa; font-size: 13px; font-weight: 600;">
                YÊU CẦU ĐẶT LẠI MẬT KHẨU
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 36px 28px; text-align: center;">
              <p style="margin: 0 0 16px 0; font-size: 15px; color: #d4d4d8; line-height: 1.6;">
                Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản liên kết với địa chỉ <strong>{clean_to}</strong>.
              </p>
              
              <p style="margin: 0 0 24px 0; font-size: 14px; color: #a1a1aa;">
                Vui lòng sử dụng mã xác thực bên dưới để hoàn tất việc đổi mật khẩu:
              </p>

              <!-- OTP Display Box -->
              <div style="background-color: #181a18; border: 2px dashed #22c55e; border-radius: 12px; padding: 22px 16px; margin: 0 auto 28px auto; max-width: 320px;">
                <span style="font-family: 'Courier New', Courier, monospace; font-size: 38px; font-weight: 900; letter-spacing: 10px; color: #22c55e; display: inline-block;">
                  {otp}
                </span>
              </div>

              <!-- Security Notices -->
              <div style="background-color: rgba(239, 68, 68, 0.08); border-left: 4px solid #ef4444; border-radius: 6px; padding: 14px 18px; text-align: left; margin-bottom: 24px;">
                <p style="margin: 0; font-size: 13px; color: #fca5a5; line-height: 1.5;">
                   Mã xác thực này có hiệu lực trong <strong>5 phút</strong> và chỉ được sử dụng một lần.
                </p>
                <p style="margin: 6px 0 0 0; font-size: 12.5px; color: #a1a1aa; line-height: 1.5;">
                   Tuyệt đối không chia sẻ mã này với bất kỳ ai (kể cả nhân viên VanBass). Nếu bạn không yêu cầu đặt lại mật khẩu, bạn có thể yên tâm bỏ qua email này.
                </p>
              </div>

              <p style="margin: 0; font-size: 13px; color: #71717a;">
                Hotline hỗ trợ kỹ thuật (Mr. Vân): <a href="tel:0706067799" style="color: #4ade80; text-decoration: none; font-weight: 700;">0706.067.799</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0d0f0d; padding: 18px; text-align: center; border-top: 1px solid #27272a; color: #71717a; font-size: 12px;">
              <p style="margin: 0;">© 2026 VanBass Music Center Đà Nẵng. Mọi quyền được bảo lưu.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        """
        text_body = (
            f"VANBASS MUSIC CENTER - YÊU CẦU ĐẶT LẠI MẬT KHẨU\n\n"
            f"Mã xác thực của bạn là: {otp}\n\n"
            f"Mã này có hiệu lực trong 5 phút. Vui lòng không chia sẻ mã này cho bất kỳ ai."
        )

        return cls._send_sync(
            to_emails=[clean_to],
            subject="[VanBass] Mã xác thực đặt lại mật khẩu của bạn",
            html_content=html_body,
            text_content=text_body,
        )

