"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const VNPAY_ERROR_MESSAGES: Record<string, string> = {
  "00": "Giao dịch thanh toán thành công.",
  "07": "Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).",
  "09": "Thẻ/Tài khoản chưa đăng ký dịch vụ InternetBanking tại ngân hàng.",
  "10": "Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần.",
  "11": "Đã hết hạn chờ thanh toán. Vui lòng thực hiện lại giao dịch.",
  "12": "Thẻ/Tài khoản của khách hàng bị khóa.",
  "13": "Quý khách nhập sai mật khẩu xác thực giao dịch (OTP).",
  "24": "Quý khách đã hủy giao dịch thanh toán.",
  "51": "Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.",
  "65": "Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.",
  "75": "Ngân hàng thanh toán đang bảo trì.",
  "79": "Khách hàng nhập sai mật khẩu thanh toán quá số lần quy định.",
  "97": "Chữ ký bảo mật không hợp lệ (Checksum mismatch).",
  "99": "Giao dịch không thành công do lỗi hệ thống ngân hàng.",
};

function PaymentResultContent() {
  const searchParams = useSearchParams();

  // Handle both formats: VNPAY direct query params (vnp_*) and backend redirect params
  const vnpResponseCode = searchParams.get("vnp_ResponseCode") || searchParams.get("code") || "";
  const isSuccess = searchParams.get("success") === "true" || vnpResponseCode === "00";
  
  const orderNumber =
    searchParams.get("vnp_TxnRef") ||
    searchParams.get("order") ||
    "";
  
  const rawAmount = searchParams.get("vnp_Amount");
  const amount = rawAmount ? Number(rawAmount) / 100 : null;
  const bankCode = searchParams.get("vnp_BankCode") || "";
  const transactionNo = searchParams.get("vnp_TransactionNo") || "";

  const reasonParam = searchParams.get("reason") || "";
  const cleanCode = vnpResponseCode || (reasonParam.startsWith("code_") ? reasonParam.replace("code_", "") : "");
  
  const explanation =
    VNPAY_ERROR_MESSAGES[cleanCode] ||
    (reasonParam === "invalid_signature"
      ? "Chữ ký bảo mật không hợp lệ. Vui lòng kiểm tra lại cấu hình."
      : "Giao dịch chưa được hoàn tất hoặc đã bị hủy trên Cổng VNPAY.");

  return (
    <main
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
        minHeight: "70vh",
      }}
    >
      <div
        style={{
          maxWidth: "560px",
          width: "100%",
          backgroundColor: "#121214",
          border: isSuccess ? "1px solid rgba(34, 197, 94, 0.3)" : "1px solid rgba(239, 68, 68, 0.3)",
          borderRadius: "12px",
          padding: "40px 32px",
          textAlign: "center",
          boxShadow: isSuccess
            ? "0 20px 50px rgba(34, 197, 94, 0.08)"
            : "0 20px 50px rgba(239, 68, 68, 0.08)",
        }}
      >
        {/* Status Icon */}
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: isSuccess ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.15)",
            border: isSuccess ? "2px solid #22c55e" : "2px solid #ef4444",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px auto",
            fontSize: "36px",
            color: isSuccess ? "#22c55e" : "#ef4444",
          }}
        >
          {isSuccess ? "✓" : "✕"}
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "24px",
            fontWeight: 800,
            color: "#fff",
            margin: "0 0 12px 0",
          }}
        >
          {isSuccess ? "Thanh Toán Thành Công!" : "Thanh Toán Chưa Thành Công"}
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: "14px",
            color: isSuccess ? "#86efac" : "#fca5a5",
            lineHeight: "1.6",
            margin: "0 0 24px 0",
            backgroundColor: isSuccess ? "rgba(34, 197, 94, 0.08)" : "rgba(239, 68, 68, 0.08)",
            padding: "12px 16px",
            borderRadius: "6px",
            border: isSuccess ? "1px solid rgba(34, 197, 94, 0.2)" : "1px solid rgba(239, 68, 68, 0.2)",
          }}
        >
          {isSuccess
            ? "Đơn hàng của bạn đã được thanh toán thành công qua Cổng VNPAY. Hệ thống đã xác nhận giao dịch."
            : `Lý do: ${explanation}`}
        </p>

        {/* Order Details Box */}
        {(orderNumber || transactionNo || amount) && (
          <div
            style={{
              backgroundColor: "#18181b",
              borderRadius: "8px",
              padding: "16px 20px",
              marginBottom: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              fontSize: "14px",
              border: "1px solid #27272a",
              textAlign: "left",
            }}
          >
            {orderNumber && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#71717a" }}>Mã đơn hàng:</span>
                <span style={{ color: isSuccess ? "#4ade80" : "#fff", fontWeight: 700, fontFamily: "monospace" }}>
                  {orderNumber}
                </span>
              </div>
            )}

            {amount !== null && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#71717a" }}>Số tiền:</span>
                <span style={{ color: "#fff", fontWeight: 700 }}>
                  {amount.toLocaleString("vi-VN")} đ
                </span>
              </div>
            )}

            {bankCode && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#71717a" }}>Ngân hàng:</span>
                <span style={{ color: "#fff", fontWeight: 600 }}>{bankCode}</span>
              </div>
            )}

            {transactionNo && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#71717a" }}>Mã giao dịch VNPAY:</span>
                <span style={{ color: "#94a3b8", fontFamily: "monospace", fontSize: "12px" }}>{transactionNo}</span>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Link
            href="/cart?tab=history"
            style={{
              display: "block",
              width: "100%",
              padding: "14px 20px",
              backgroundColor: isSuccess ? "#22c55e" : "#27272a",
              color: isSuccess ? "#000" : "#fff",
              fontWeight: 800,
              fontSize: "14px",
              borderRadius: "6px",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
          >
            Xem Lịch Sử Đơn Hàng
          </Link>

          {!isSuccess && orderNumber && (
            <Link
              href="/cart"
              style={{
                display: "block",
                width: "100%",
                padding: "14px 20px",
                backgroundColor: "#0284c7",
                color: "#fff",
                fontWeight: 700,
                fontSize: "14px",
                borderRadius: "6px",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              Thử Thanh Toán Lại
            </Link>
          )}

          <Link
            href="/products"
            style={{
              display: "block",
              width: "100%",
              padding: "14px 20px",
              backgroundColor: "transparent",
              border: "1px solid #27272a",
              color: "#a1a1aa",
              fontWeight: 600,
              fontSize: "14px",
              borderRadius: "6px",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
          >
            Tiếp Tục Mua Sắm
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function PaymentResultPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#09090b" }}>
      <Header />
      <Suspense
        fallback={
          <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p style={{ color: "#a1a1aa" }}>Đang tải kết quả thanh toán...</p>
          </main>
        }
      >
        <PaymentResultContent />
      </Suspense>
      <Footer />
    </div>
  );
}
