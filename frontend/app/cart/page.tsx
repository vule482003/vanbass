"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../lib/cart-context";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export default function CartPage() {
  const { items, totalItems, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  const [checkoutMode, setCheckoutMode] = useState(false);
  const [shippingName, setShippingName] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("vietqr");
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingName || !shippingPhone || !shippingAddress) {
      alert("Vui lòng điền đầy đủ họ tên, số điện thoại và địa chỉ nhận hàng.");
      return;
    }

    setOrderSuccess(true);
    clearCart();
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
                Mã đơn hàng: <strong style={{ color: "#fff" }}>VB-ORD-{Math.floor(100000 + Math.random() * 900000)}</strong>
                <br />
                Nhân viên hỗ trợ sẽ gọi điện xác nhận địa chỉ giao hàng và phương thức thanh toán ({paymentMethod.toUpperCase()}) với bạn ngay.
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
                      {/* Product Placeholder / Thumbnail */}
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
                        VB
                      </div>

                      {/* Item Details */}
                      <div style={{ flex: 1 }}>
                        <Link
                          href={`/products/${item.slug}`}
                          style={{
                            fontSize: "15px",
                            fontWeight: 700,
                            color: "#fff",
                            display: "block",
                            marginBottom: "4px",
                          }}
                        >
                          {item.name}
                        </Link>
                        <span style={{ fontSize: "12px", color: "#888" }}>SKU: {item.sku}</span>
                        <div style={{ marginTop: "6px", fontSize: "13px", color: "#d4d4d8" }}>
                          Đơn giá: {formatCurrency(item.sale_price)}
                        </div>
                      </div>

                      {/* Quantity Modifier */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid var(--border)",
                          backgroundColor: "#000",
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          style={{
                            padding: "6px 12px",
                            background: "none",
                            border: "none",
                            color: "#fff",
                            cursor: "pointer",
                          }}
                        >
                          -
                        </button>
                        <span style={{ padding: "0 8px", fontSize: "13px", fontWeight: 700 }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          style={{
                            padding: "6px 12px",
                            background: "none",
                            border: "none",
                            color: "#fff",
                            cursor: "pointer",
                          }}
                        >
                          +
                        </button>
                      </div>

                      {/* Line Subtotal & Remove */}
                      <div style={{ textAlign: "right", minWidth: "120px" }}>
                        <div style={{ fontSize: "15px", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>
                          {formatCurrency(item.subtotal)}
                        </div>
                        <button
                          onClick={() => removeItem(item.product_id)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#ef4444",
                            fontSize: "11px",
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
                  <Link href="/products" className="text-link">
                    ← Tiếp tục mua thêm sản phẩm
                  </Link>
                  <button
                    onClick={clearCart}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#888",
                      fontSize: "12px",
                      cursor: "pointer",
                    }}
                  >
                    Xóa tất cả
                  </button>
                </div>
              </div>

              {/* Order Summary / Checkout Column */}
              <div
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  padding: "32px",
                }}
              >
                {!checkoutMode ? (
                  <>
                    <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "20px" }}>
                      Tóm tắt đơn hàng
                    </h3>

                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "14px" }}>
                      <span style={{ color: "#888" }}>Tạm tính ({totalItems} sản phẩm):</span>
                      <span style={{ color: "#fff", fontWeight: 600 }}>{formatCurrency(subtotal)}</span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", fontSize: "14px" }}>
                      <span style={{ color: "#888" }}>Phí vận chuyển:</span>
                      <span style={{ color: "#22c55e", fontWeight: 600 }}>Miễn phí (Nội thành)</span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderTop: "1px solid rgba(255,255,255,0.1)",
                        paddingTop: "16px",
                        marginBottom: "28px",
                      }}
                    >
                      <strong style={{ fontSize: "16px", color: "#fff" }}>Tổng cộng:</strong>
                      <strong style={{ fontSize: "22px", color: "#fff", fontWeight: 800 }}>
                        {formatCurrency(subtotal)}
                      </strong>
                    </div>

                    <button
                      onClick={() => setCheckoutMode(true)}
                      className="button button-primary"
                      style={{ width: "100%", justifyContent: "center", cursor: "pointer" }}
                    >
                      Tiến hành đặt hàng
                    </button>
                  </>
                ) : (
                  <form onSubmit={handleCheckoutSubmit}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                      <h3 style={{ fontSize: "18px", fontWeight: 700, margin: 0 }}>
                        Thông tin giao hàng
                      </h3>
                      <button
                        type="button"
                        onClick={() => setCheckoutMode(false)}
                        style={{ background: "none", border: "none", color: "#888", fontSize: "12px", cursor: "pointer" }}
                      >
                        ← Quay lại giỏ
                      </button>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", color: "#888", marginBottom: "6px" }}>
                          Họ và tên người nhận:
                        </label>
                        <input
                          type="text"
                          placeholder="Nguyễn Văn A"
                          value={shippingName}
                          onChange={(e) => setShippingName(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "10px 14px",
                            backgroundColor: "#000",
                            border: "1px solid var(--border)",
                            color: "#fff",
                            fontSize: "13px",
                            outline: "none",
                          }}
                          required
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "12px", color: "#888", marginBottom: "6px" }}>
                          Số điện thoại nhận hàng:
                        </label>
                        <input
                          type="tel"
                          placeholder="0706 067 799"
                          value={shippingPhone}
                          onChange={(e) => setShippingPhone(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "10px 14px",
                            backgroundColor: "#000",
                            border: "1px solid var(--border)",
                            color: "#fff",
                            fontSize: "13px",
                            outline: "none",
                          }}
                          required
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "12px", color: "#888", marginBottom: "6px" }}>
                          Địa chỉ giao hàng chi tiết:
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                          value={shippingAddress}
                          onChange={(e) => setShippingAddress(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "10px 14px",
                            backgroundColor: "#000",
                            border: "1px solid var(--border)",
                            color: "#fff",
                            fontSize: "13px",
                            outline: "none",
                          }}
                          required
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "12px", color: "#888", marginBottom: "6px" }}>
                          Phương thức thanh toán:
                        </label>
                        <select
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "10px 14px",
                            backgroundColor: "#000",
                            border: "1px solid var(--border)",
                            color: "#fff",
                            fontSize: "13px",
                            outline: "none",
                          }}
                        >
                          <option value="vietqr">Quét mã VietQR / Chuyển khoản ngân hàng</option>
                          <option value="cod">Thanh toán tiền mặt khi nhận hàng (COD)</option>
                        </select>
                      </div>
                    </div>

                    <div
                      style={{
                        padding: "16px",
                        backgroundColor: "rgba(255,255,255,0.04)",
                        marginBottom: "20px",
                        fontSize: "13px",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "#888" }}>Tổng thanh toán:</span>
                        <strong style={{ color: "#fff", fontSize: "16px" }}>{formatCurrency(subtotal)}</strong>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="button button-primary"
                      style={{ width: "100%", justifyContent: "center", cursor: "pointer" }}
                    >
                      Xác nhận đặt hàng ngay
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
