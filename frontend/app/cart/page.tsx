"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../lib/cart-context";
import { useAuth } from "../lib/auth-context";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export default function CartPage() {
  const { items, totalItems, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const { user, token } = useAuth();

  const [checkoutMode, setCheckoutMode] = useState(false);
  const [shippingName, setShippingName] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("vietqr");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Auto-fill user info if logged in
  useEffect(() => {
    if (user) {
      if (!shippingName && user.full_name) setShippingName(user.full_name);
      if (!shippingPhone && user.phone) setShippingPhone(user.phone);
      if (!shippingAddress && user.address) setShippingAddress(user.address);
    }
  }, [user, shippingName, shippingPhone, shippingAddress]);

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingName || !shippingPhone || !shippingAddress) {
      setErrorMsg("Vui lòng điền đầy đủ họ tên, số điện thoại và địa chỉ nhận hàng.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
      const payload = {
        shipping_name: shippingName.trim(),
        shipping_phone: shippingPhone.trim(),
        shipping_address: shippingAddress.trim(),
        payment_method: paymentMethod,
        items: items.map((i) => ({
          product_id: i.product_id,
          quantity: i.quantity,
          unit_price: i.sale_price,
        })),
      };

      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(`${apiUrl}/orders`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const orderData = await res.json();
        setOrderNumber(orderData.order_number);
        setOrderSuccess(true);
        clearCart();
      } else {
        const err = await res.json().catch(() => ({ detail: "Không thể tạo đơn hàng" }));
        let msg = "Đã xảy ra lỗi khi tạo đơn hàng. Vui lòng thử lại.";
        if (typeof err.detail === "string") {
          msg = err.detail;
        } else if (Array.isArray(err.detail)) {
          msg = err.detail.map((d: any) => d.msg || "Lỗi dữ liệu").join(", ");
        } else if (typeof err.detail === "object" && err.detail !== null) {
          msg = JSON.stringify(err.detail);
        }
        setErrorMsg(msg);
      }
    } catch {
      setErrorMsg("Không thể kết nối đến máy chủ Backend (FastAPI).");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <main style={{ flex: 1, paddingTop: "120px", paddingBottom: "100px" }}>
        <div className="container">
          <div style={{ marginBottom: "36px" }}>
            <p className="section-kicker">GIỎ HÀNG CỦA BẠN</p>
            <h1
              style={{
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                margin: "0 0 8px 0",
              }}
            >
              {orderSuccess
                ? "Đặt hàng thành công!"
                : items.length > 0
                ? `Giỏ hàng (${totalItems} món)`
                : "Giỏ hàng đang trống"}
            </h1>
          </div>

          {orderSuccess ? (
            <div
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid #22c55e",
                padding: "48px 32px",
                textAlign: "center",
                maxWidth: "600px",
                margin: "40px auto",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
              <h2 style={{ fontSize: "22px", color: "#fff", marginBottom: "12px" }}>
                Cảm ơn bạn đã đặt hàng tại VanBass Music Center!
              </h2>
              <p style={{ color: "#a1a1aa", lineHeight: 1.7, marginBottom: "24px" }}>
                Mã đơn hàng chính thức: <strong style={{ color: "#22c55e", fontSize: "18px" }}>{orderNumber}</strong>
                <br />
                Đơn hàng đã được lưu vào hệ thống. Nhân viên tư vấn sẽ gọi điện xác nhận địa chỉ giao hàng và phương thức ({paymentMethod.toUpperCase()}) với bạn ngay.
              </p>
              <Link href="/products" className="button button-primary">
                Tiếp tục mua sắm
              </Link>
            </div>
          ) : items.length === 0 ? (
            <div
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                padding: "60px 24px",
                textAlign: "center",
              }}
            >
              <p style={{ color: "#a1a1aa", fontSize: "16px", marginBottom: "24px" }}>
                Bạn chưa thêm sản phẩm nào vào giỏ hàng.
              </p>
              <Link href="/products" className="button button-primary">
                Khám phá thiết bị DJ & Âm thanh ngay <span>→</span>
              </Link>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "40px",
                alignItems: "start",
              }}
            >
              {/* Items List */}
              <div>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {items.map((item) => (
                    <div
                      key={item.product_id}
                      style={{
                        display: "flex",
                        gap: "20px",
                        padding: "20px",
                        backgroundColor: "var(--surface)",
                        border: "1px solid var(--border)",
                        alignItems: "center",
                      }}
                    >
                      {/* Product Placeholder */}
                      <div
                        style={{
                          width: "72px",
                          height: "72px",
                          backgroundColor: "#000",
                          border: "1px solid rgba(255,255,255,0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "10px",
                          fontWeight: 800,
                          color: "#666",
                          flexShrink: 0,
                        }}
                      >
                        DJ
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ fontSize: "11px", color: "#71717a", textTransform: "uppercase", fontWeight: 700 }}>
                          {item.sku || "VanBass"}
                        </span>
                        <h3 style={{ fontSize: "15px", fontWeight: 700, margin: "2px 0 6px 0", color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          <Link href={`/products/${item.slug}`} style={{ color: "#fff", textDecoration: "none" }}>
                            {item.name}
                          </Link>
                        </h3>
                        <span style={{ fontSize: "14px", fontWeight: 800, color: "#fff" }}>
                          {formatCurrency(item.sale_price)}
                        </span>
                      </div>

                      {/* Quantity selector */}
                      <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border)", backgroundColor: "#000" }}>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          style={{ padding: "6px 12px", background: "none", border: "none", color: "#fff", cursor: "pointer" }}
                        >
                          -
                        </button>
                        <span style={{ padding: "6px 10px", color: "#fff", fontSize: "13px", fontWeight: 700 }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          style={{ padding: "6px 12px", background: "none", border: "none", color: "#fff", cursor: "pointer" }}
                        >
                          +
                        </button>
                      </div>

                      {/* Line Total & Remove */}
                      <div style={{ textAlign: "right", minWidth: "90px" }}>
                        <strong style={{ display: "block", color: "#fff", fontSize: "15px", marginBottom: "4px" }}>
                          {formatCurrency(item.sale_price * item.quantity)}
                        </strong>
                        <button
                          onClick={() => removeItem(item.product_id)}
                          style={{ background: "none", border: "none", color: "#ef4444", fontSize: "12px", cursor: "pointer", padding: 0 }}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button
                    onClick={clearCart}
                    style={{ background: "none", border: "none", color: "#71717a", fontSize: "13px", cursor: "pointer" }}
                  >
                    Xóa tất cả giỏ hàng
                  </button>
                  <Link href="/products" style={{ color: "#a1a1aa", fontSize: "13px", textDecoration: "none" }}>
                    ← Chọn thêm thiết bị khác
                  </Link>
                </div>
              </div>

              {/* Order Summary & Checkout Form */}
              <div
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  padding: "32px",
                }}
              >
                <h3 style={{ fontSize: "18px", fontWeight: 800, margin: "0 0 20px 0", color: "#fff" }}>
                  Tóm Tắt Đơn Hàng
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px", fontSize: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#a1a1aa" }}>
                    <span>Tổng tiền hàng ({totalItems} món)</span>
                    <span style={{ color: "#fff", fontWeight: 600 }}>{formatCurrency(subtotal)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#a1a1aa" }}>
                    <span>Phí vận chuyển</span>
                    <span style={{ color: "#22c55e", fontWeight: 600 }}>Miễn phí giao hàng</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#a1a1aa" }}>
                    <span>Bảo hành chính hãng</span>
                    <span style={{ color: "#fff", fontWeight: 600 }}>12 tháng</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingTop: "16px",
                      borderTop: "1px solid rgba(255,255,255,0.1)",
                      fontSize: "18px",
                      fontWeight: 800,
                      color: "#fff",
                    }}
                  >
                    <span>Tổng thanh toán</span>
                    <span style={{ color: "#fff" }}>{formatCurrency(subtotal)}</span>
                  </div>
                </div>

                {errorMsg && (
                  <div style={{ padding: "10px 14px", backgroundColor: "rgba(239,68,68,0.15)", border: "1px solid #ef4444", color: "#fca5a5", fontSize: "13px", marginBottom: "16px" }}>
                    {errorMsg}
                  </div>
                )}

                {/* Toggle Checkout Form */}
                {!checkoutMode ? (
                  <button
                    onClick={() => setCheckoutMode(true)}
                    className="button button-primary button-lg"
                    style={{ width: "100%" }}
                  >
                    Tiến hành Đặt hàng →
                  </button>
                ) : (
                  <form onSubmit={handleCheckoutSubmit}>
                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "6px", textTransform: "uppercase" }}>
                        Họ và tên người nhận *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingName}
                        onChange={(e) => setShippingName(e.target.value)}
                        placeholder="Nguyễn Văn A"
                        style={{ width: "100%", padding: "10px 14px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "14px", boxSizing: "border-box" }}
                      />
                    </div>

                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "6px", textTransform: "uppercase" }}>
                        Số điện thoại nhận hàng *
                      </label>
                      <input
                        type="tel"
                        required
                        value={shippingPhone}
                        onChange={(e) => setShippingPhone(e.target.value)}
                        placeholder="0905 123 456"
                        style={{ width: "100%", padding: "10px 14px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "14px", boxSizing: "border-box" }}
                      />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "6px", textTransform: "uppercase" }}>
                        Địa chỉ nhận hàng (Đà Nẵng & Toàn quốc) *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        placeholder="Số nhà, Tên đường, Phường/Xã, Quận/Huyện"
                        style={{ width: "100%", padding: "10px 14px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "14px", boxSizing: "border-box" }}
                      />
                    </div>

                    <div style={{ marginBottom: "24px" }}>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "8px", textTransform: "uppercase" }}>
                        Phương thức thanh toán
                      </label>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", backgroundColor: "#0a0a0c", border: "1px solid #27272a", color: "#fff", fontSize: "13px", cursor: "pointer" }}>
                          <input
                            type="radio"
                            name="payment"
                            value="vietqr"
                            checked={paymentMethod === "vietqr"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          Chuyển khoản VietQR (Kèm xác nhận tự động)
                        </label>
                        <label style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", backgroundColor: "#0a0a0c", border: "1px solid #27272a", color: "#fff", fontSize: "13px", cursor: "pointer" }}>
                          <input
                            type="radio"
                            name="payment"
                            value="cod"
                            checked={paymentMethod === "cod"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          Thanh toán khi nhận hàng (COD)
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="button button-primary button-lg"
                      style={{ width: "100%", cursor: isSubmitting ? "not-allowed" : "pointer" }}
                    >
                      {isSubmitting ? "Đang xử lý đơn hàng..." : `Xác Nhận Đặt Hàng (${formatCurrency(subtotal)})`}
                    </button>
                  </form>
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
