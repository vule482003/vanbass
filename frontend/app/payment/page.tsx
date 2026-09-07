"use client";

import { useState, useEffect, useCallback, Suspense, startTransition } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../lib/auth-context";

interface OrderDetail {
  id: string;
  order_number: string;
  total_amount: number;
  subtotal: number;
  shipping_fee: number;
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  payment_status: "unpaid" | "paid" | "refunded";
  payment_method?: string;
  status: string;
  created_at: string;
}

const BANK_INFO = {
  bankId: "mbbank",
  bankName: "Ngân hàng TMCP Quân Đội (MBBank)",
  shortName: "MBBank",
  accountNumber: "0766719886",
  accountName: "LE VU",
};

function PaymentBridgeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("order_id") || "";
  const { token } = useAuth();

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const fetchOrder = useCallback(
    async (isManual = false) => {
      if (!orderId) {
        startTransition(() => setIsLoading(false));
        return;
      }
      if (isManual) setIsChecking(true);

      try {
        const headers: Record<string, string> = {};
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch(`${apiUrl}/orders/${orderId}?_t=${Date.now()}`, {
          headers,
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          startTransition(() => {
            setOrder(data);
          });
        }
      } catch (e) {
        console.error("Failed to load order:", e);
      } finally {
        if (isManual) setIsChecking(false);
        startTransition(() => {
          setIsLoading(false);
        });
      }
    },
    [orderId, token, apiUrl]
  );

  // Initial load
  useEffect(() => {
    let isCancelled = false;

    async function loadInitial() {
      if (!orderId) {
        startTransition(() => setIsLoading(false));
        return;
      }

      try {
        const headers: Record<string, string> = {};
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch(`${apiUrl}/orders/${orderId}?_t=${Date.now()}`, {
          headers,
          cache: "no-store",
        });

        if (res.ok && !isCancelled) {
          const data = await res.json();
          startTransition(() => {
            setOrder(data);
          });
        }
      } catch (e) {
        console.error("Failed to load order:", e);
      } finally {
        if (!isCancelled) {
          startTransition(() => {
            setIsLoading(false);
          });
        }
      }
    }

    loadInitial();

    return () => {
      isCancelled = true;
    };
  }, [orderId, token, apiUrl]);

  // Real-time polling while unpaid (every 3 seconds)
  useEffect(() => {
    if (!orderId || order?.payment_status === "paid") return;

    const interval = setInterval(() => {
      fetchOrder(false);
    }, 3000);

    return () => clearInterval(interval);
  }, [orderId, order?.payment_status, fetchOrder]);

  if (isLoading) {
    return (
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <p style={{ color: "#a1a1aa", fontSize: "15px" }}>⏳ Đang tải thông tin thanh toán...</p>
      </div>
    );
  }

  if (!orderId || !order) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", padding: "20px", textAlign: "center" }}>
        <p style={{ color: "#ef4444", fontSize: "16px", marginBottom: "16px" }}>Không tìm thấy đơn hàng cần thanh toán.</p>
        <Link href="/cart?tab=history" className="button" style={{ backgroundColor: "#27272a", color: "#fff", padding: "10px 20px", borderRadius: "6px" }}>
          ← Quay lại Lịch sử Đơn Mua
        </Link>
      </div>
    );
  }

  const isPaid = order.payment_status === "paid";
  const amount = Math.round(order.total_amount || 0);
  const transferContent = order.order_number;
  const qrUrl = `https://img.vietqr.io/image/${BANK_INFO.bankId}-${BANK_INFO.accountNumber}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(transferContent)}&accountName=${encodeURIComponent(BANK_INFO.accountName)}`;

  return (
    <main
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 16px",
        minHeight: "80vh",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          backgroundColor: "#121214",
          border: "1px solid #27272a",
          borderRadius: "16px",
          padding: "32px 24px",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.7)",
        }}
      >
        {isPaid ? (
          /* =========================================================
             THÀNH CÔNG: ĐƠN HÀNG ĐÃ THANH TOÁN
             ========================================================= */
          <div style={{ textAlign: "center", padding: "20px 10px" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "rgba(34, 197, 94, 0.15)",
                border: "3px solid #22c55e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px auto",
                fontSize: "38px",
                color: "#22c55e",
                boxShadow: "0 0 30px rgba(34, 197, 94, 0.4)",
              }}
            >
              ✓
            </div>
            <h1 style={{ fontSize: "24px", color: "#fff", fontWeight: 800, marginBottom: "10px" }}>
              Thanh Toán Thành Công!
            </h1>
            <p style={{ color: "#a1a1aa", fontSize: "14.5px", marginBottom: "8px", lineHeight: 1.6 }}>
              Hệ thống đã tự động ghi nhận thanh toán cho đơn hàng{" "}
              <strong style={{ color: "#22c55e" }}>#{order.order_number}</strong>.
            </p>
            <p style={{ color: "#71717a", fontSize: "13.5px", marginBottom: "28px" }}>
              Cảm ơn bạn đã tin tưởng mua sắm tại VanBass Music Center! Đơn hàng đang được chuẩn bị đóng gói.
            </p>

            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/cart?tab=history"
                className="button button-primary"
                style={{
                  backgroundColor: "#22c55e",
                  color: "#000",
                  fontWeight: 800,
                  padding: "12px 24px",
                  borderRadius: "8px",
                  textDecoration: "none",
                }}
              >
                📦 Xem Lịch Sử Đơn Mua
              </Link>
              <Link
                href="/"
                className="button"
                style={{
                  backgroundColor: "#27272a",
                  color: "#fff",
                  fontWeight: 600,
                  padding: "12px 24px",
                  borderRadius: "8px",
                  textDecoration: "none",
                }}
              >
                Trang Chủ VanBass
              </Link>
            </div>
          </div>
        ) : (
          /* =========================================================
             CHỜ THANH TOÁN: HIỂN THỊ VIETQR MBBANK
             ========================================================= */
          <div>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor: "rgba(34, 197, 94, 0.1)",
                  border: "1px solid rgba(34, 197, 94, 0.3)",
                  color: "#22c55e",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "12.5px",
                  fontWeight: 700,
                  marginBottom: "12px",
                }}
              >
                <span>⚡</span> QUÉT MÃ VIETQR TỰ ĐỘNG
              </div>
              <h1 style={{ fontSize: "22px", color: "#fff", fontWeight: 800, margin: "0 0 6px 0" }}>
                Chuyển Khoản Ngân Hàng
              </h1>
              <p style={{ color: "#a1a1aa", fontSize: "13.5px", margin: 0 }}>
                Quét mã VietQR bằng bất kỳ App ngân hàng nào (MB, VCB, Techcombank, Momo,...)
              </p>
            </div>

            {/* VietQR Code Frame */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#ffffff",
                padding: "20px",
                borderRadius: "14px",
                marginBottom: "20px",
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.5)",
              }}
            >
              <Image
                src={qrUrl}
                alt="VietQR MBBank"
                width={340}
                height={340}
                unoptimized
                style={{
                  width: "100%",
                  maxWidth: "340px",
                  height: "auto",
                  borderRadius: "8px",
                  display: "block",
                }}
              />
              <p style={{ color: "#52525b", fontSize: "12px", marginTop: "10px", textAlign: "center", fontWeight: 500 }}>
                💡 Quét bằng ứng dụng ngân hàng để tự động điền STK, Số tiền và Nội dung
              </p>
            </div>

            {/* Bank Details with Copy Buttons */}
            <div
              style={{
                backgroundColor: "#18181b",
                borderRadius: "12px",
                border: "1px solid #27272a",
                padding: "16px 18px",
                marginBottom: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {/* Ngân hàng */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#71717a", fontSize: "13.5px" }}>Ngân hàng:</span>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: "14px" }}>
                  {BANK_INFO.bankName}
                </span>
              </div>

              {/* Số tài khoản */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#71717a", fontSize: "13.5px" }}>Số tài khoản:</span>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#22c55e", fontWeight: 800, fontSize: "16px", letterSpacing: "0.5px" }}>
                    {BANK_INFO.accountNumber}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(BANK_INFO.accountNumber, "account")}
                    style={{
                      padding: "3px 8px",
                      backgroundColor: copiedField === "account" ? "#22c55e" : "#27272a",
                      color: copiedField === "account" ? "#000" : "#d4d4d8",
                      border: "none",
                      borderRadius: "4px",
                      fontSize: "11px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {copiedField === "account" ? "✓ Đã chép" : "Sao chép"}
                  </button>
                </div>
              </div>

              {/* Chủ tài khoản */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#71717a", fontSize: "13.5px" }}>Chủ tài khoản:</span>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: "14px" }}>
                  {BANK_INFO.accountName}
                </span>
              </div>

              {/* Số tiền */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#71717a", fontSize: "13.5px" }}>Số tiền:</span>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#fff", fontWeight: 800, fontSize: "16px" }}>
                    {amount.toLocaleString("vi-VN")} đ
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(amount.toString(), "amount")}
                    style={{
                      padding: "3px 8px",
                      backgroundColor: copiedField === "amount" ? "#22c55e" : "#27272a",
                      color: copiedField === "amount" ? "#000" : "#d4d4d8",
                      border: "none",
                      borderRadius: "4px",
                      fontSize: "11px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {copiedField === "amount" ? "✓ Đã chép" : "Sao chép"}
                  </button>
                </div>
              </div>

              {/* Nội dung chuyển khoản (BẮT BUỘC) */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "10px",
                  borderTop: "1px dashed #27272a",
                }}
              >
                <div>
                  <span style={{ color: "#f59e0b", fontSize: "13.5px", fontWeight: 700, display: "block" }}>
                    Nội dung chuyển khoản:
                  </span>
                  <span style={{ color: "#71717a", fontSize: "11px" }}>
                    (Bắt buộc để tự động kích hoạt)
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span
                    style={{
                      color: "#f59e0b",
                      fontWeight: 900,
                      fontSize: "15px",
                      backgroundColor: "rgba(245, 158, 11, 0.1)",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      border: "1px solid rgba(245, 158, 11, 0.3)",
                      fontFamily: "monospace",
                    }}
                  >
                    {transferContent}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(transferContent, "content")}
                    style={{
                      padding: "4px 9px",
                      backgroundColor: copiedField === "content" ? "#f59e0b" : "#27272a",
                      color: copiedField === "content" ? "#000" : "#d4d4d8",
                      border: "none",
                      borderRadius: "4px",
                      fontSize: "11px",
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {copiedField === "content" ? "✓ Đã chép" : "Sao chép"}
                  </button>
                </div>
              </div>
            </div>

            {/* Waiting Pulse Status */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                backgroundColor: "rgba(34, 197, 94, 0.08)",
                border: "1px solid rgba(34, 197, 94, 0.2)",
                padding: "12px 16px",
                borderRadius: "10px",
                marginBottom: "20px",
                color: "#22c55e",
                fontSize: "13.5px",
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                  display: "inline-block",
                  boxShadow: "0 0 10px #22c55e",
                }}
              />
              Đang chờ hệ thống ghi nhận chuyển khoản tự động...
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                type="button"
                disabled={isChecking}
                onClick={() => fetchOrder(true)}
                style={{
                  width: "100%",
                  padding: "13px 20px",
                  backgroundColor: "#27272a",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "14px",
                  borderRadius: "8px",
                  border: "1px solid #3f3f46",
                  cursor: isChecking ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "all 0.15s ease",
                }}
              >
                <span>{isChecking ? "⏳" : "🔄"}</span>
                {isChecking ? "Đang kiểm tra giao dịch..." : "Tôi Đã Chuyển Khoản Xong (Kiểm tra lại)"}
              </button>

              <button
                type="button"
                onClick={() => router.push("/cart?tab=history")}
                style={{
                  width: "100%",
                  padding: "11px 20px",
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#a1a1aa",
                  fontWeight: 600,
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                ← Quay lại danh sách đơn mua
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function PaymentPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#09090b" }}>
      <Header />
      <Suspense
        fallback={
          <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p style={{ color: "#a1a1aa" }}>Đang tải...</p>
          </main>
        }
      >
        <PaymentBridgeContent />
      </Suspense>
      <Footer />
    </div>
  );
}
