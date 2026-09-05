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
        return "0 ₫"
    try:
        return f"{int(val):,}".replace(",", ".") + " ₫"
    except (ValueError, TypeError, OverflowError):
        return f"{val} ₫"


class EmailService:
    @staticmethod
    def _send_sync(
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

        # Check if SMTP credentials are configured
        if not smtp_user or not smtp_password:
            logger.info(
                "===========================================================\n"
                "[MOCK EMAIL - SMTP credentials not yet set in .env]\n"
                f"From: {from_name} <{from_email}>\n"
                f"To: {', '.join(clean_recipients)}\n"
                f"Subject: {subject}\n"
                "-----------------------------------------------------------\n"
                f"Preview: {html_content[:300]}...\n"
                "==========================================================="
            )
            return True

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
                f"Successfully sent email '{subject}' to {', '.join(clean_recipients)}"
            )
            return True

        except Exception:
            logger.exception(
                f"Failed to send email '{subject}' to {clean_recipients}"
            )
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
        Non-blocking async email dispatcher.
        """
        recipients = [to_emails] if isinstance(to_emails, str) else to_emails
        email_executor.submit(
            cls._send_sync,
            recipients,
            subject,
            html_content,
            text_content,
        )

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
        Send Order Confirmation Email to the Buyer.
        """
        if not customer_email:
            return

        order_number = getattr(order, "order_number", "VB-ORDER")
        customer_name = getattr(order, "shipping_name", "Quý khách")
        phone = getattr(order, "shipping_phone", "")
        address = getattr(order, "shipping_address", "")
        total_amount = getattr(order, "total_amount", 0)
        items = getattr(order, "items", [])

        # Build items table rows
        rows_html = ""
        for item in items:
            p_name = getattr(item, "product_name", "Sản phẩm")
            p_qty = getattr(item, "quantity", 1)
            p_price = format_currency(getattr(item, "unit_price", 0))
            p_sub = format_currency(getattr(item, "subtotal", 0))
            rows_html += f"""
            <tr>
              <td style="padding: 12px; border-bottom: 1px solid #27272a; color: #f4f4f5; font-size: 14px;">
                <strong>{p_name}</strong>
              </td>
              <td style="padding: 12px; border-bottom: 1px solid #27272a; text-align: center; color: #a1a1aa; font-size: 14px;">
                {p_qty}
              </td>
              <td style="padding: 12px; border-bottom: 1px solid #27272a; text-align: right; color: #a1a1aa; font-size: 14px;">
                {p_price}
              </td>
              <td style="padding: 12px; border-bottom: 1px solid #27272a; text-align: right; color: #22c55e; font-weight: 700; font-size: 14px;">
                {p_sub}
              </td>
            </tr>
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
<body style="margin: 0; padding: 0; background-color: #09090b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f4f4f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #09090b; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #121412; border: 1px solid #27272a; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.8);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #181c18 0%, #0d120d 100%); padding: 32px 24px; text-align: center; border-bottom: 2px solid #22c55e;">
              <h1 style="margin: 0; color: #22c55e; font-size: 24px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase;">
                VANBASS MUSIC CENTER
              </h1>
              <p style="margin: 6px 0 0 0; color: #a1a1aa; font-size: 13px; font-weight: 600;">
                ÂM THANH &amp; THIẾT BỊ DJ CHUYÊN NGHIỆP ĐÀ NẴNG
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 32px 24px;">
              <h2 style="margin: 0 0 12px 0; font-size: 18px; color: #ffffff;">
                Xin chào {customer_name},
              </h2>
              <p style="margin: 0 0 24px 0; color: #a1a1aa; font-size: 14px; line-height: 1.6;">
                Cảm ơn bạn đã tin tưởng đặt hàng tại <strong>VanBass Music Center</strong>. Chúng tôi đã tiếp nhận đơn hàng <strong>#{order_number}</strong> và đang tiến hành xử lý đóng gói chuyển cho bạn.
              </p>

              <!-- Order Summary Card -->
              <div style="background-color: #1c1f1c; border-radius: 12px; padding: 20px; margin-bottom: 24px; border: 1px solid #2d332d;">
                <h3 style="margin: 0 0 12px 0; font-size: 14px; color: #4ade80; text-transform: uppercase; letter-spacing: 1px;">
                  📦 Thông tin giao hàng
                </h3>
                <p style="margin: 4px 0; font-size: 13.5px; color: #d4d4d8;">
                  <strong>Người nhận:</strong> {customer_name}
                </p>
                <p style="margin: 4px 0; font-size: 13.5px; color: #d4d4d8;">
                  <strong>Số điện thoại:</strong> {phone}
                </p>
                <p style="margin: 4px 0; font-size: 13.5px; color: #d4d4d8;">
                  <strong>Địa chỉ nhận hàng:</strong> {address}
                </p>
              </div>

              <!-- Product Table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px; border-collapse: collapse;">
                <thead>
                  <tr style="background-color: #181a18;">
                    <th style="padding: 10px 12px; text-align: left; color: #a1a1aa; font-size: 12px; text-transform: uppercase;">Sản phẩm</th>
                    <th style="padding: 10px 12px; text-align: center; color: #a1a1aa; font-size: 12px; text-transform: uppercase;">SL</th>
                    <th style="padding: 10px 12px; text-align: right; color: #a1a1aa; font-size: 12px; text-transform: uppercase;">Đơn giá</th>
                    <th style="padding: 10px 12px; text-align: right; color: #a1a1aa; font-size: 12px; text-transform: uppercase;">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {rows_html}
                </tbody>
              </table>

              <!-- Total Breakdown -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 28px;">
                <tr>
                  <td style="padding: 6px 0; color: #a1a1aa; font-size: 14px;">Phí vận chuyển toàn quốc:</td>
                  <td style="padding: 6px 0; text-align: right; color: #4ade80; font-weight: 700; font-size: 14px;">MIỄN PHÍ</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0 0 0; color: #ffffff; font-size: 16px; font-weight: 700; border-top: 1px solid #27272a;">Tổng thanh toán:</td>
                  <td style="padding: 12px 0 0 0; text-align: right; color: #22c55e; font-size: 20px; font-weight: 900; border-top: 1px solid #27272a;">{formatted_total}</td>
                </tr>
              </table>

              <!-- Hotline Support Box -->
              <div style="background: rgba(34, 197, 94, 0.08); border-left: 4px solid #22c55e; padding: 14px 18px; border-radius: 6px;">
                <p style="margin: 0; font-size: 13.5px; color: #d4d4d8; line-height: 1.5;">
                  📞 <strong>Cần hỗ trợ gấp?</strong> Vui lòng liên hệ Hotline/Zalo tư vấn 24/7: <a href="tel:0706067799" style="color: #4ade80; font-weight: 700; text-decoration: none;">0706.067.799</a>
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0d0f0d; padding: 20px; text-align: center; border-top: 1px solid #27272a; color: #71717a; font-size: 12px;">
              <p style="margin: 0 0 4px 0;">© 2026 VanBass Music Center Đà Nẵng. Mọi quyền được bảo lưu.</p>
              <p style="margin: 0;">Showroom: 104/1A Dũng Sĩ Thanh Khê, Q. Thanh Khê, TP. Đà Nẵng</p>
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
        Send New Order Alert Email to Shop Admins and Staff.
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
        customer_name = getattr(order, "shipping_name", "Khách hàng")
        phone = getattr(order, "shipping_phone", "Chưa có")
        address = getattr(order, "shipping_address", "Chưa có")
        total_amount = getattr(order, "total_amount", 0)
        items = getattr(order, "items", [])
        customer_note = getattr(order, "customer_note", "")

        # Build items table rows
        rows_html = ""
        for item in items:
            p_name = getattr(item, "product_name", "Sản phẩm")
            p_qty = getattr(item, "quantity", 1)
            p_price = format_currency(getattr(item, "unit_price", 0))
            p_sub = format_currency(getattr(item, "subtotal", 0))
            rows_html += f"""
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #3f3f46; color: #ffffff; font-size: 13.5px;">
                <strong>{p_name}</strong>
              </td>
              <td style="padding: 10px; border-bottom: 1px solid #3f3f46; text-align: center; color: #fbbf24; font-weight: 800; font-size: 14px;">
                x{p_qty}
              </td>
              <td style="padding: 10px; border-bottom: 1px solid #3f3f46; text-align: right; color: #a1a1aa; font-size: 13.5px;">
                {p_price}
              </td>
              <td style="padding: 10px; border-bottom: 1px solid #3f3f46; text-align: right; color: #34d399; font-weight: 700; font-size: 13.5px;">
                {p_sub}
              </td>
            </tr>
            """

        formatted_total = format_currency(total_amount)

        html_body = f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>🔥 [ĐƠN HÀNG MỚI] #{order_number}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #09090b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #f4f4f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #09090b; padding: 30px 10px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #18181b; border: 1px solid #3f3f46; border-radius: 12px; overflow: hidden;">
          
          <!-- Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #b91c1c 0%, #dc2626 100%); padding: 20px; text-align: center;">
              <h2 style="margin: 0; color: #ffffff; font-size: 18px; font-weight: 900; letter-spacing: 1px; text-transform: uppercase;">
                🔥 THÔNG BÁO: CÓ ĐƠN HÀNG MỚI CẦN XỬ LÝ!
              </h2>
              <p style="margin: 4px 0 0 0; color: #fef2f2; font-size: 13px;">
                Mã đơn: <strong>#{order_number}</strong>
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 24px;">
              <div style="background-color: #27272a; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 10px 0; font-size: 14px; color: #38bdf8;">👤 Thông tin khách mua:</h3>
                <p style="margin: 4px 0; font-size: 13.5px;"><strong>Khách hàng:</strong> {customer_name}</p>
                <p style="margin: 4px 0; font-size: 13.5px;"><strong>Điện thoại:</strong> <a href="tel:{phone}" style="color: #4ade80; font-weight: 700;">{phone}</a></p>
                <p style="margin: 4px 0; font-size: 13.5px;"><strong>Địa chỉ giao:</strong> {address}</p>
                {f'<p style="margin: 4px 0; font-size: 13.5px; color: #fbbf24;"><strong>Ghi chú:</strong> {customer_note}</p>' if customer_note else ''}
              </div>

              <h3 style="margin: 0 0 10px 0; font-size: 14px; color: #a1a1aa; text-transform: uppercase;">Danh sách sản phẩm cần xuất kho:</h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px; border-collapse: collapse;">
                <thead>
                  <tr style="background-color: #27272a;">
                    <th style="padding: 8px 10px; text-align: left; font-size: 12px; color: #a1a1aa;">Sản phẩm</th>
                    <th style="padding: 8px 10px; text-align: center; font-size: 12px; color: #a1a1aa;">SL</th>
                    <th style="padding: 8px 10px; text-align: right; font-size: 12px; color: #a1a1aa;">Đơn giá</th>
                    <th style="padding: 8px 10px; text-align: right; font-size: 12px; color: #a1a1aa;">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {rows_html}
                </tbody>
              </table>

              <div style="text-align: right; padding: 12px 0; border-top: 1px solid #3f3f46; margin-bottom: 20px;">
                <span style="font-size: 14px; color: #a1a1aa;">Tổng tiền đơn hàng: </span>
                <span style="font-size: 20px; font-weight: 900; color: #22c55e; margin-left: 8px;">{formatted_total}</span>
              </div>

              <div style="text-align: center;">
                <a href="http://localhost:3000/admin" style="display: inline-block; background-color: #22c55e; color: #000000; font-weight: 800; font-size: 14px; padding: 12px 28px; border-radius: 8px; text-decoration: none;">
                  👉 MỞ TRANG QUẢN TRỊ ADMIN ĐỂ DUYỆT ĐƠN
                </a>
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
            subject=f"🔥 [ĐƠN HÀNG MỚI #{order_number}] {customer_name} - {formatted_total}",
            html_content=html_body,
        )

    @classmethod
    def send_test_email(cls, to_email: str) -> dict[str, Any]:
        """
        Send a real or mock test email to verify SMTP configuration.
        """
        clean_to = to_email.strip()
        smtp_user = settings.smtp_user.strip()
        is_configured = bool(smtp_user and settings.smtp_password.strip())

        html_body = f"""
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Test Email VanBass</title></head>
<body style="background: #09090b; color: #f4f4f5; font-family: sans-serif; padding: 30px; text-align: center;">
  <div style="max-width: 500px; margin: auto; background: #181c18; padding: 30px; border-radius: 12px; border: 1px solid #22c55e;">
    <h2 style="color: #22c55e; margin-top: 0;">🎉 KẾT NỐI EMAIL THÀNH CÔNG!</h2>
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
            "smtp_configured": is_configured,
            "message": (
                "Đã gửi email thực tế qua Gmail SMTP thành công!"
                if is_configured and success
                else "Đã tạo mock email thành công (Nhập SMTP_USER và SMTP_PASSWORD trong .env để gửi email thật qua Gmail)."
            ),
        }
