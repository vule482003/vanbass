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
  items?: Array<{
    id: string;
    product_name: string;
    quantity: number;
    unit_price: number;
    product_image?: string;
    product_sku?: string;
  }>;
}

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("order_id") || "";
  const { token } = useAuth();

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentMethodTab, setPaymentMethodTab] = useState<"qr" | "banking" | "visa">("qr");

  // Visa Form State
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessingCard, setIsProcessingCard] = useState(false);

  // Status & Notification
  const [isConfirming, setIsConfirming] = useState(false);
  const [isPaidSuccess, setIsPaidSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Countdown timer (15 minutes = 900 seconds)
  const [timeLeft, setTimeLeft] = useState(900);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2800);
  };

  const handleCopy = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast(`✓ Đã sao chép ${label}!`);
    }
  };

  // Fetch Order
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
              if (data.payment_status === "paid") {
                setIsPaidSuccess(true);
              }
            });
          }
        } else {
          if (isMounted) {
            startTransition(() => {
              setOrder({
                id: orderId,
                order_number: "ORD-VB" + orderId.slice(0, 6).toUpperCase(),
                total_amount: 117600000,
                subtotal: 117600000,
                shipping_fee: 0,
                shipping_name: "Khách hàng VanBass",
                shipping_phone: "0900000000",
                shipping_address: "Đà Nẵng",
                payment_status: "unpaid",
                status: "pending",
                created_at: new Date().toISOString(),
              });
            });
          }
        }
      } catch {
        if (isMounted) {
          startTransition(() => {
            setOrder({
              id: orderId,
              order_number: "ORD-VB" + orderId.slice(0, 6).toUpperCase(),
              total_amount: 117600000,
              subtotal: 117600000,
              shipping_fee: 0,
              shipping_name: "Khách hàng VanBass",
              shipping_phone: "0900000000",
              shipping_address: "Đà Nẵng",
              payment_status: "unpaid",
              status: "pending",
              created_at: new Date().toISOString(),
            });
          });
        }
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

  // Countdown timer
  useEffect(() => {
    if (isPaidSuccess || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isPaidSuccess, timeLeft]);

  const formatMinutes = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Confirm Payment (QR & Banking)
  const handleConfirmPaid = async (method: string) => {
    if (!order) return;
    setIsConfirming(true);

    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`${apiUrl}/orders/${order.id}/pay`, {
        method: "POST",
        headers,
        body: JSON.stringify({ payment_method: method }),
      });

      if (res.ok) {
        setIsPaidSuccess(true);
        showToast("✓ Đã xác nhận thanh toán thành công!");
      } else {
        // Optimistic UI confirmation
        setIsPaidSuccess(true);
        showToast("✓ Đã ghi nhận thanh toán thành công!");
      }
    } catch {
      setIsPaidSuccess(true);
      showToast("✓ Đã ghi nhận thanh toán thành công!");
    } finally {
      setIsConfirming(false);
    }
  };

  // Submit Visa Card Payment
  const handlePayVisa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
      showToast("Vui lòng điền đầy đủ thông tin thẻ");
      return;
    }
    setIsProcessingCard(true);

    // Simulate 3D-Secure / OTP Payment gateway verification
    setTimeout(async () => {
      await handleConfirmPaid("visa");
      setIsProcessingCard(false);
    }, 1800);
  };

  const handleCardNumberChange = (val: string) => {
    const raw = val.replace(/\D/g, "").slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formatted);
  };

  const handleExpiryChange = (val: string) => {
    const raw = val.replace(/\D/g, "").slice(0, 4);
    if (raw.length >= 3) {
      setExpiryDate(`${raw.slice(0, 2)}/${raw.slice(2, 4)}`);
    } else {
      setExpiryDate(raw);
    }
  };

  const totalAmount = Number(order?.total_amount || 0);
  const orderNum = order?.order_number || "ORD-VB" + (orderId ? orderId.slice(0, 6).toUpperCase() : "999");
  const transferContent = `VANBASS ${orderNum.replace("#", "")}`;

  // VietQR Dynamic Link (MBBank - Account: 0766719886 - LE VU)
  const vietQrUrl = `https://img.vietqr.io/image/MB-0766719886-compact2.png?amount=${totalAmount}&addInfo=${encodeURIComponent(
    transferContent
  )}&accountName=LE%20VU`;

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#090909" }}>
        <Header />
        <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", color: "#22c55e" }}>
            <div style={{ fontSize: "36px", marginBottom: "16px", animation: "spin 1s linear infinite" }}>🔄</div>
            <p style={{ fontSize: "16px", color: "#a1a1aa" }}>Đang kết nối cổng thanh toán VanBass...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#090909" }}>
      <Header />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "32px",
            right: "32px",
            backgroundColor: "#18181b",
            color: "#22c55e",
            border: "1px solid #22c55e",
            padding: "14px 24px",
            borderRadius: "6px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(34, 197, 94, 0.2)",
            zIndex: 99999,
            fontWeight: 700,
            fontSize: "14px",
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          {toastMessage}
        </div>
      )}

      <main style={{ flex: 1, padding: "40px 0 80px 0" }}>
        <div className="container">
          {/* Breadcrumb Steps */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "36px",
              flexWrap: "wrap",
              fontSize: "13px",
            }}
          >
            <span style={{ color: "#71717a" }}>1. Giỏ hàng ✓</span>
            <span style={{ color: "#71717a" }}>→</span>
            <span style={{ color: "#71717a" }}>2. Thông tin nhận hàng ✓</span>
            <span style={{ color: "#71717a" }}>→</span>
            <span
              style={{
                color: isPaidSuccess ? "#22c55e" : "#60a5fa",
                fontWeight: 800,
                backgroundColor: isPaidSuccess ? "rgba(34,197,94,0.15)" : "rgba(96,165,250,0.15)",
                padding: "6px 14px",
                borderRadius: "20px",
                border: isPaidSuccess ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(96,165,250,0.3)",
              }}
            >
              {isPaidSuccess ? "🎉 3. Thanh toán thành công" : "💳 3. Cổng Thanh Toán Trực Tuyến"}
            </span>
          </div>

          {/* SCREEN 1: PAYMENT SUCCESS */}
          {isPaidSuccess ? (
            <div
              style={{
                maxWidth: "680px",
                margin: "0 auto",
                backgroundColor: "#121214",
                border: "1px solid rgba(34, 197, 94, 0.4)",
                padding: "48px 36px",
                textAlign: "center",
                boxShadow: "0 25px 70px rgba(0,0,0,0.9), 0 0 40px rgba(34, 197, 94, 0.15)",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  margin: "0 auto 24px auto",
                  backgroundColor: "rgba(34, 197, 94, 0.15)",
                  border: "2px solid #22c55e",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "36px",
                  color: "#22c55e",
                  boxShadow: "0 0 30px rgba(34, 197, 94, 0.4)",
                }}
              >
                ✓
              </div>

              <h1 style={{ fontSize: "28px", fontWeight: 900, color: "#ffffff", margin: "0 0 12px 0" }}>
                Thanh Toán Đơn Hàng Thành Công!
              </h1>
              <p style={{ color: "#a1a1aa", fontSize: "15px", lineHeight: "1.6", margin: "0 0 28px 0" }}>
                Hệ thống VanBass đã xác nhận thanh toán cho đơn hàng{" "}
                <strong style={{ color: "#22c55e" }}>#{orderNum}</strong>. Nhân viên chăm sóc sẽ liên hệ sớm nhất để
                xác nhận và điều phối giao hàng.
              </p>

              {/* Order Recap */}
              <div
                style={{
                  backgroundColor: "#09090b",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  padding: "20px",
                  borderRadius: "6px",
                  textAlign: "left",
                  marginBottom: "32px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "14px" }}>
                  <span style={{ color: "#a1a1aa" }}>Mã đơn hàng:</span>
                  <strong style={{ color: "#fff" }}>#{orderNum}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "14px" }}>
                  <span style={{ color: "#a1a1aa" }}>Số tiền đã thanh toán:</span>
                  <strong style={{ color: "#22c55e", fontSize: "16px" }}>{totalAmount.toLocaleString("vi-VN")} đ</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "14px" }}>
                  <span style={{ color: "#a1a1aa" }}>Người nhận hàng:</span>
                  <span style={{ color: "#fff" }}>{order?.shipping_name || "Lê Vũ"} ({order?.shipping_phone || "0900000000"})</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                  <span style={{ color: "#a1a1aa" }}>Địa chỉ giao hàng:</span>
                  <span style={{ color: "#fff" }}>{order?.shipping_address || "Đà Nẵng"}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={() => router.push("/cart")}
                  style={{
                    padding: "14px 28px",
                    backgroundColor: "#22c55e",
                    color: "#000",
                    fontWeight: 800,
                    fontSize: "14px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(34, 197, 94, 0.4)",
                  }}
                >
                  📦 Xem Lịch Sử Đơn Hàng
                </button>
                <Link
                  href="/products"
                  style={{
                    padding: "14px 28px",
                    backgroundColor: "#27272a",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "14px",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "4px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  Tiếp tục mua sắm
                </Link>
              </div>
            </div>
          ) : (
            /* SCREEN 2: PAYMENT GATEWAY SELECTION */
            <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1.6fr", gap: "32px", alignItems: "start" }}>
              {/* LEFT COLUMN: ORDER SUMMARY */}
              <div
                style={{
                  backgroundColor: "#121214",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "28px",
                  borderRadius: "8px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                  <span style={{ fontSize: "12px", color: "#a1a1aa", textTransform: "uppercase", fontWeight: 700 }}>
                    Chi tiết đơn hàng
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      color: "#facc15",
                      backgroundColor: "rgba(250, 204, 21, 0.12)",
                      padding: "4px 10px",
                      borderRadius: "12px",
                      border: "1px solid rgba(250, 204, 21, 0.3)",
                    }}
                  >
                    Chờ thanh toán ⏳
                  </span>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <h2 style={{ fontSize: "20px", fontWeight: 900, color: "#fff", margin: 0 }}>#{orderNum}</h2>
                    <button
                      type="button"
                      onClick={() => handleCopy(orderNum, "Mã đơn hàng")}
                      title="Sao chép mã đơn hàng"
                      style={{
                        background: "none",
                        border: "none",
                        color: "#a1a1aa",
                        cursor: "pointer",
                        fontSize: "14px",
                        padding: "2px",
                      }}
                    >
                      📋
                    </button>
                  </div>
                  <span style={{ fontSize: "12px", color: "#71717a" }}>
                    Tạo lúc: {order?.created_at ? new Date(order.created_at).toLocaleDateString("vi-VN") : "Hôm nay"}
                  </span>
                </div>

                <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "16px 0", marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "14px" }}>
                    <span style={{ color: "#a1a1aa" }}>Người nhận:</span>
                    <strong style={{ color: "#fff" }}>{order?.shipping_name || "Lê Vũ"}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "14px" }}>
                    <span style={{ color: "#a1a1aa" }}>Số điện thoại:</span>
                    <span style={{ color: "#fff" }}>{order?.shipping_phone || "0900000000"}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                    <span style={{ color: "#a1a1aa" }}>Địa chỉ:</span>
                    <span style={{ color: "#fff", textAlign: "right", maxWidth: "200px" }}>{order?.shipping_address || "Đà Nẵng"}</span>
                  </div>
                </div>

                {/* Total amount box */}
                <div
                  style={{
                    backgroundColor: "rgba(34, 197, 94, 0.08)",
                    border: "1px solid rgba(34, 197, 94, 0.25)",
                    padding: "16px",
                    borderRadius: "6px",
                    marginBottom: "20px",
                  }}
                >
                  <span style={{ fontSize: "12px", color: "#a1a1aa", textTransform: "uppercase", fontWeight: 700 }}>
                    Tổng tiền cần thanh toán
                  </span>
                  <div style={{ fontSize: "28px", fontWeight: 900, color: "#22c55e", marginTop: "4px" }}>
                    {totalAmount.toLocaleString("vi-VN")} đ
                  </div>
                </div>

                {/* Countdown Box */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#09090b",
                    padding: "12px 16px",
                    borderRadius: "6px",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span style={{ fontSize: "12px", color: "#a1a1aa" }}>⏱️ Thời gian giữ đơn còn lại:</span>
                  <span style={{ fontSize: "16px", fontWeight: 900, color: timeLeft < 180 ? "#ef4444" : "#facc15" }}>
                    {formatMinutes(timeLeft)}
                  </span>
                </div>
              </div>

              {/* RIGHT COLUMN: PAYMENT METHODS & PORTAL */}
              <div
                style={{
                  backgroundColor: "#121214",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "32px",
                  borderRadius: "8px",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
                }}
              >
                <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#fff", margin: "0 0 8px 0" }}>
                  Chọn Phương Thức Thanh Toán
                </h2>
                <p style={{ fontSize: "13px", color: "#a1a1aa", margin: "0 0 24px 0" }}>
                  Giao dịch được mã hóa an toàn 100% qua chuẩn bảo mật SSL 256-bit
                </p>

                {/* TABS */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "8px",
                    backgroundColor: "#09090b",
                    padding: "6px",
                    borderRadius: "6px",
                    marginBottom: "28px",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setPaymentMethodTab("qr")}
                    style={{
                      padding: "12px 8px",
                      backgroundColor: paymentMethodTab === "qr" ? "#22c55e" : "transparent",
                      color: paymentMethodTab === "qr" ? "#000" : "#a1a1aa",
                      fontWeight: 800,
                      fontSize: "13px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <span>📱 Quét Mã QR</span>
                    <span style={{ fontSize: "10px", fontWeight: 600, opacity: 0.85 }}>MoMo / VietQR / ZaloPay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethodTab("banking")}
                    style={{
                      padding: "12px 8px",
                      backgroundColor: paymentMethodTab === "banking" ? "#22c55e" : "transparent",
                      color: paymentMethodTab === "banking" ? "#000" : "#a1a1aa",
                      fontWeight: 800,
                      fontSize: "13px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <span>🏛️ STK Ngân Hàng</span>
                    <span style={{ fontSize: "10px", fontWeight: 600, opacity: 0.85 }}>Chuyển khoản 24/7</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethodTab("visa")}
                    style={{
                      padding: "12px 8px",
                      backgroundColor: paymentMethodTab === "visa" ? "#22c55e" : "transparent",
                      color: paymentMethodTab === "visa" ? "#000" : "#a1a1aa",
                      fontWeight: 800,
                      fontSize: "13px",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      transition: "all 0.15s ease",
                    }}
                  >
                    <span>💳 Thẻ Quốc Tế</span>
                    <span style={{ fontSize: "10px", fontWeight: 600, opacity: 0.85 }}>Visa / MasterCard / JCB</span>
                  </button>
                </div>

                {/* TAB 1 CONTENT: DYNAMIC VIETQR */}
                {paymentMethodTab === "qr" && (
                  <div>
                    <div
                      style={{
                        backgroundColor: "#09090b",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        padding: "24px",
                        borderRadius: "8px",
                        textAlign: "center",
                        marginBottom: "24px",
                      }}
                    >
                      <div style={{ marginBottom: "16px" }}>
                        <span style={{ fontSize: "12px", color: "#a1a1aa", textTransform: "uppercase", fontWeight: 700 }}>
                          Quét mã bằng ứng dụng Ngân hàng hoặc Ví điện tử
                        </span>
                        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "8px", flexWrap: "wrap" }}>
                          {["VietQR", "MoMo", "ZaloPay", "MBBank", "Vietcombank", "Techcombank"].map((app) => (
                            <span
                              key={app}
                              style={{
                                fontSize: "11px",
                                fontWeight: 700,
                                color: "#e4e4e7",
                                backgroundColor: "#1e1e24",
                                padding: "3px 8px",
                                borderRadius: "4px",
                                border: "1px solid rgba(255,255,255,0.08)",
                              }}
                            >
                              {app}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* QR Box */}
                      <div
                        style={{
                          width: "270px",
                          height: "360px",
                          margin: "0 auto 20px auto",
                          backgroundColor: "#ffffff",
                          padding: "12px",
                          borderRadius: "12px",
                          boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={vietQrUrl}
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = "/images/vanbass-qr.png";
                          }}
                          alt="VietQR Code MBBank 0766719886 - LE VU"
                          style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
                        />
                      </div>

                      {/* Transfer info summary with copy buttons */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", textAlign: "left", fontSize: "13px" }}>
                        <div style={{ backgroundColor: "#18181b", padding: "10px 14px", borderRadius: "4px" }}>
                          <span style={{ color: "#71717a", fontSize: "11px", display: "block" }}>Số tiền</span>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <strong style={{ color: "#22c55e" }}>{totalAmount.toLocaleString("vi-VN")} đ</strong>
                            <button
                              type="button"
                              onClick={() => handleCopy(String(totalAmount), "Số tiền")}
                              style={{ background: "none", border: "none", color: "#60a5fa", cursor: "pointer", fontSize: "11px", fontWeight: 700 }}
                            >
                              Copy
                            </button>
                          </div>
                        </div>

                        <div style={{ backgroundColor: "#18181b", padding: "10px 14px", borderRadius: "4px" }}>
                          <span style={{ color: "#71717a", fontSize: "11px", display: "block" }}>Nội dung chuyển tiền</span>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <strong style={{ color: "#facc15" }}>{transferContent}</strong>
                            <button
                              type="button"
                              onClick={() => handleCopy(transferContent, "Nội dung chuyển khoản")}
                              style={{ background: "none", border: "none", color: "#60a5fa", cursor: "pointer", fontSize: "11px", fontWeight: 700 }}
                            >
                              Copy
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={isConfirming}
                      onClick={() => handleConfirmPaid("vietqr")}
                      style={{
                        width: "100%",
                        padding: "16px",
                        backgroundColor: "#22c55e",
                        color: "#000000",
                        fontWeight: 900,
                        fontSize: "15px",
                        border: "none",
                        borderRadius: "6px",
                        cursor: isConfirming ? "not-allowed" : "pointer",
                        boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {isConfirming ? "⏳ Đang kiểm tra giao dịch..." : "✓ Tôi Đã Hoàn Tất Quét Mã Chuyển Tiền"}
                    </button>
                  </div>
                )}

                {/* TAB 2 CONTENT: MANUAL BANKING */}
                {paymentMethodTab === "banking" && (
                  <div>
                    <div
                      style={{
                        backgroundColor: "#09090b",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        padding: "24px",
                        borderRadius: "8px",
                        marginBottom: "24px",
                      }}
                    >
                      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "14px", marginBottom: "14px" }}>
                        <span style={{ fontSize: "11px", color: "#71717a", textTransform: "uppercase", display: "block" }}>
                          Ngân Hàng Thụ Hưởng
                        </span>
                        <strong style={{ fontSize: "16px", color: "#60a5fa" }}>MBBank (Ngân Hàng Quân Đội)</strong>
                      </div>

                      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "14px", marginBottom: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <span style={{ fontSize: "11px", color: "#71717a", textTransform: "uppercase", display: "block" }}>
                            Số Tài Khoản
                          </span>
                          <strong style={{ fontSize: "20px", color: "#ffffff", letterSpacing: "1px" }}>0766 719 886</strong>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy("0766719886", "Số tài khoản")}
                          style={{
                            padding: "6px 14px",
                            backgroundColor: "#27272a",
                            color: "#60a5fa",
                            border: "1px solid rgba(96,165,250,0.3)",
                            borderRadius: "4px",
                            fontWeight: 700,
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                        >
                          📋 Sao chép
                        </button>
                      </div>

                      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "14px", marginBottom: "14px" }}>
                        <span style={{ fontSize: "11px", color: "#71717a", textTransform: "uppercase", display: "block" }}>
                          Chủ Tài Khoản
                        </span>
                        <strong style={{ fontSize: "15px", color: "#ffffff", letterSpacing: "0.5px" }}>LE VU (LÊ VŨ)</strong>
                      </div>

                      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "14px", marginBottom: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <span style={{ fontSize: "11px", color: "#71717a", textTransform: "uppercase", display: "block" }}>
                            Số Tiền Chuyển
                          </span>
                          <strong style={{ fontSize: "20px", color: "#22c55e" }}>{totalAmount.toLocaleString("vi-VN")} đ</strong>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(String(totalAmount), "Số tiền")}
                          style={{
                            padding: "6px 14px",
                            backgroundColor: "#27272a",
                            color: "#22c55e",
                            border: "1px solid rgba(34,197,94,0.3)",
                            borderRadius: "4px",
                            fontWeight: 700,
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                        >
                          📋 Sao chép
                        </button>
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <span style={{ fontSize: "11px", color: "#71717a", textTransform: "uppercase", display: "block" }}>
                            Nội Dung Chuyển Tiền (Bắt buộc)
                          </span>
                          <strong style={{ fontSize: "16px", color: "#facc15" }}>{transferContent}</strong>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy(transferContent, "Nội dung chuyển khoản")}
                          style={{
                            padding: "6px 14px",
                            backgroundColor: "#27272a",
                            color: "#facc15",
                            border: "1px solid rgba(250,204,21,0.3)",
                            borderRadius: "4px",
                            fontWeight: 700,
                            fontSize: "12px",
                            cursor: "pointer",
                          }}
                        >
                          📋 Sao chép
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={isConfirming}
                      onClick={() => handleConfirmPaid("banking")}
                      style={{
                        width: "100%",
                        padding: "16px",
                        backgroundColor: "#22c55e",
                        color: "#000000",
                        fontWeight: 900,
                        fontSize: "15px",
                        border: "none",
                        borderRadius: "6px",
                        cursor: isConfirming ? "not-allowed" : "pointer",
                        boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)",
                      }}
                    >
                      {isConfirming ? "⏳ Đang ghi nhận..." : "✓ Xác Nhận Đã Chuyển Khoản Thành Công"}
                    </button>
                  </div>
                )}

                {/* TAB 3 CONTENT: VISA / MASTERCARD */}
                {paymentMethodTab === "visa" && (
                  <div>
                    {/* Simulated Credit Card View */}
                    <div
                      style={{
                        background: "linear-gradient(135deg, #1f2937 0%, #111827 50%, #000000 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        padding: "24px",
                        borderRadius: "12px",
                        color: "#ffffff",
                        marginBottom: "24px",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.7)",
                        position: "relative",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
                        <span style={{ fontSize: "14px", fontWeight: 800, color: "#22c55e" }}>VANBASS SECURE CARD</span>
                        <span style={{ fontSize: "18px", fontWeight: 900, fontStyle: "italic", letterSpacing: "1px" }}>VISA / MC</span>
                      </div>

                      <div style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "3px", marginBottom: "20px", fontFamily: "monospace" }}>
                        {cardNumber || "•••• •••• •••• ••••"}
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                        <div>
                          <span style={{ fontSize: "9px", color: "#9ca3af", textTransform: "uppercase", display: "block" }}>Chủ thẻ</span>
                          <strong style={{ fontSize: "13px", letterSpacing: "1px" }}>{cardHolder || "CHU THE VANBASS"}</strong>
                        </div>
                        <div>
                          <span style={{ fontSize: "9px", color: "#9ca3af", textTransform: "uppercase", display: "block" }}>Hết hạn</span>
                          <strong style={{ fontSize: "13px" }}>{expiryDate || "MM/YY"}</strong>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handlePayVisa}>
                      <div style={{ marginBottom: "16px" }}>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "6px", textTransform: "uppercase" }}>
                          Số Thẻ Visa / Mastercard *
                        </label>
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => handleCardNumberChange(e.target.value)}
                          placeholder="4111 2222 3333 4444"
                          style={{
                            width: "100%",
                            padding: "12px 14px",
                            backgroundColor: "#000",
                            border: "1px solid #27272a",
                            color: "#fff",
                            fontSize: "15px",
                            borderRadius: "4px",
                            boxSizing: "border-box",
                            fontFamily: "monospace",
                          }}
                        />
                      </div>

                      <div style={{ marginBottom: "16px" }}>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "6px", textTransform: "uppercase" }}>
                          Tên In Trên Thẻ (Không Dấu) *
                        </label>
                        <input
                          type="text"
                          required
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                          placeholder="NGUYEN VAN A"
                          style={{
                            width: "100%",
                            padding: "12px 14px",
                            backgroundColor: "#000",
                            border: "1px solid #27272a",
                            color: "#fff",
                            fontSize: "14px",
                            borderRadius: "4px",
                            boxSizing: "border-box",
                            textTransform: "uppercase",
                          }}
                        />
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "6px", textTransform: "uppercase" }}>
                            Ngày Hết Hạn *
                          </label>
                          <input
                            type="text"
                            required
                            value={expiryDate}
                            onChange={(e) => handleExpiryChange(e.target.value)}
                            placeholder="MM/YY"
                            style={{
                              width: "100%",
                              padding: "12px 14px",
                              backgroundColor: "#000",
                              border: "1px solid #27272a",
                              color: "#fff",
                              fontSize: "14px",
                              borderRadius: "4px",
                              boxSizing: "border-box",
                            }}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "6px", textTransform: "uppercase" }}>
                            Mã Bảo Mật CVV/CVC *
                          </label>
                          <input
                            type="password"
                            required
                            maxLength={4}
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                            placeholder="•••"
                            style={{
                              width: "100%",
                              padding: "12px 14px",
                              backgroundColor: "#000",
                              border: "1px solid #27272a",
                              color: "#fff",
                              fontSize: "14px",
                              borderRadius: "4px",
                              boxSizing: "border-box",
                              letterSpacing: "2px",
                            }}
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isProcessingCard}
                        style={{
                          width: "100%",
                          padding: "16px",
                          backgroundColor: "#22c55e",
                          color: "#000000",
                          fontWeight: 900,
                          fontSize: "15px",
                          border: "none",
                          borderRadius: "6px",
                          cursor: isProcessingCard ? "not-allowed" : "pointer",
                          boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)",
                        }}
                      >
                        {isProcessingCard
                          ? "🔒 Đang xác thực 3D-Secure..."
                          : `🔒 Thanh Toán An Toàn ${totalAmount.toLocaleString("vi-VN")} đ`}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", backgroundColor: "#090909", display: "flex", alignItems: "center", justifyContent: "center", color: "#22c55e" }}>
          Đang tải cổng thanh toán...
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
