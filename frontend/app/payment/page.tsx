"use client";

import { useState, useEffect, Suspense, startTransition } from "react";
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

function PaymentBridgeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("order_id") || "";
  const { token } = useAuth();

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

  const handlePayVnpay = async () => {
    if (!orderId) return;
    setIsConnecting(true);
    setErrorMessage("");

    try {
      const headers: Record<string, string> = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`${apiUrl}/orders/${orderId}/vnpay/create-payment`, {
        method: "POST",
        headers,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.payment_url) {
          window.location.href = data.payment_url;
          return;
        }
      }

      const err = await res.json().catch(() => ({ detail: "Không thể kết nối cổng VNPAY" }));
      setErrorMessage(err.detail || "Không thể tạo liên kết VNPAY. Vui lòng thử lại.");
    } catch {
      setErrorMessage("Không thể kết nối tới máy chủ thanh toán.");
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const loadOrder = async () => {
      if (!orderId) {
        startTransition(() => {
          if (isMounted) setIsLoading(false);
        });
        return;
      }

      try {
        const headers: Record<string, string> = {};
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch(`${apiUrl}/orders/${orderId}?_t=${Date.now()}`, {
          headers,
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            startTransition(() => {
              setOrder(data);
            });
          }
        }
      } catch (e) {
        console.error("Failed to load order for payment bridge:", e);
      } finally {
        if (isMounted) {
          startTransition(() => {
            setIsLoading(false);
          });
        }
      }
    };

    loadOrder();
    return () => {
      isMounted = false;
    };
  }, [orderId, token, apiUrl]);

  if (isLoading) {
    return (
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <p style={{ color: "#a1a1aa", fontSize: "15px" }}>⏳ Đang tải thông tin đơn hàng...</p>
      </div>
    );
  }

  if (!orderId) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", padding: "20px", textAlign: "center" }}>
        <p style={{ color: "#ef4444", fontSize: "16px", marginBottom: "16px" }}>Không tìm thấy mã đơn hàng cần thanh toán.</p>
        <Link href="/cart?tab=history" className="button" style={{ backgroundColor: "#27272a", color: "#fff" }}>
          ← Quay lại Lịch sử Đơn Mua
        </Link>
      </div>
    );
  }

  const isPaid = order?.payment_status === "paid";

  return (
    <main
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        minHeight: "75vh",
      }}
    >
      <div
        style={{
          maxWidth: "540px",
          width: "100%",
          backgroundColor: "#121214",
          border: "1px solid #27272a",
          borderRadius: "14px",
          padding: "36px 28px",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.6)",
        }}
      >
        {isPaid ? (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                backgroundColor: "rgba(34, 197, 94, 0.15)",
                border: "2px solid #22c55e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px auto",
                fontSize: "32px",
                color: "#22c55e",
              }}
            >
              ✓
            </div>
            <h1 style={{ fontSize: "22px", color: "#fff", fontWeight: 800, marginBottom: "10px" }}>
              Đơn Hàng Đã Thanh Toán
            </h1>
            <p style={{ color: "#a1a1aa", fontSize: "14px", marginBottom: "28px", lineHeight: 1.6 }}>
              Đơn hàng <strong style={{ color: "#22c55e" }}>#{order?.order_number}</strong> đã được thanh toán thành công và đang được xử lý.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <Link href="/cart?tab=history" className="button button-primary" style={{ backgroundColor: "#22c55e", color: "#000" }}>
                📦 Xem Lịch Sử Đơn Hàng
              </Link>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div style={{ fontSize: "36px", marginBottom: "8px" }}>⚡</div>
              <h1 style={{ fontSize: "22px", color: "#fff", fontWeight: 800, margin: "0 0 6px 0" }}>
                Cổng Thanh Toán Trực Tuyến VNPAY
              </h1>
              <p style={{ color: "#a1a1aa", fontSize: "13.5px", margin: 0 }}>
                Hệ thống xác thực giao dịch tự động & an toàn 100%
              </p>
            </div>

            {/* Order Summary Box */}
            <div
              style={{
                backgroundColor: "#18181b",
                borderRadius: "10px",
                padding: "18px 20px",
                border: "1px solid #27272a",
                marginBottom: "24px",
                fontSize: "14px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#71717a" }}>Mã đơn hàng:</span>
                <span style={{ color: "#fff", fontWeight: 700, fontFamily: "monospace" }}>
                  #{order?.order_number || orderId.slice(0, 8)}
                </span>
              </div>
              {order?.shipping_name && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#71717a" }}>Người nhận:</span>
                  <span style={{ color: "#fff" }}>{order.shipping_name} ({order.shipping_phone})</span>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "8px",
                  borderTop: "1px dashed #27272a",
                  marginTop: "4px",
                }}
              >
                <span style={{ color: "#a1a1aa", fontWeight: 600 }}>Tổng thanh toán:</span>
                <strong style={{ color: "#22c55e", fontSize: "18px", fontWeight: 900 }}>
                  {(order?.total_amount || 0).toLocaleString("vi-VN")} đ
                </strong>
              </div>
            </div>

            {/* Payment methods supported */}
            <div
              style={{
                backgroundColor: "rgba(2, 132, 199, 0.08)",
                border: "1px solid rgba(2, 132, 199, 0.25)",
                borderRadius: "10px",
                padding: "14px 16px",
                marginBottom: "24px",
                fontSize: "12.5px",
                color: "#7dd3fc",
                lineHeight: 1.6,
              }}
            >
              <strong style={{ display: "block", color: "#38bdf8", marginBottom: "4px", fontSize: "13px" }}>
                Phương thức được hỗ trợ trên Cổng VNPAY:
              </strong>
              • Quét QR từ 40+ ứng dụng ngân hàng & Ví điện tử (VietQR, VNPAY, Momo, ZaloPay)<br />
              • Thẻ ATM nội địa / Internet Banking tất cả ngân hàng<br />
              • Thẻ thanh toán quốc tế Visa, MasterCard, JCB
            </div>

            {errorMessage && (
              <div
                style={{
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  borderRadius: "8px",
                  padding: "12px 14px",
                  color: "#fca5a5",
                  fontSize: "13px",
                  marginBottom: "20px",
                  textAlign: "center",
                }}
              >
                ❌ {errorMessage}
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <button
                type="button"
                disabled={isConnecting}
                onClick={handlePayVnpay}
                style={{
                  width: "100%",
                  padding: "14px 20px",
                  backgroundColor: "#22c55e",
                  color: "#000000",
                  fontWeight: 900,
                  fontSize: "15px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: isConnecting ? "not-allowed" : "pointer",
                  boxShadow: "0 4px 20px rgba(34, 197, 94, 0.35)",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <span>{isConnecting ? "⏳" : "⚡"}</span>
                {isConnecting ? "Đang Chuyển Sang Cổng VNPAY..." : "Mở Cổng Thanh Toán VNPAY →"}
              </button>

              <button
                type="button"
                onClick={() => router.push("/cart?tab=history")}
                style={{
                  width: "100%",
                  padding: "12px 20px",
                  backgroundColor: "transparent",
                  border: "1px solid #27272a",
                  color: "#a1a1aa",
                  fontWeight: 600,
                  fontSize: "13.5px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                ← Quay lại danh sách đơn hàng
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
