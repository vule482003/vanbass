"use client";

import { startTransition, useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../lib/cart-context";
import { useAuth } from "../lib/auth-context";
import { useLanguage } from "../lib/language-context";
import { getTranslatedProductName } from "../lib/product-i18n";

function formatCurrency(amount?: number, lang: "vi" | "en" = "vi") {
  if (amount === undefined || amount === null) return "0 ₫";
  return new Intl.NumberFormat(lang === "en" ? "en-US" : "vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

interface MyOrderItemLine {
  id?: string;
  product_id: string;
  product_name: string;
  sku?: string;
  product_sku?: string;
  quantity: number;
  unit_price: number;
  subtotal?: number;
  line_total?: number;
  product_slug?: string;
  product_image?: string;
}

interface MyOrderItem {
  id: string;
  order_number: string;
  created_at: string;
  status: string;
  payment_status: string;
  payment_method?: string;
  subtotal?: number;
  shipping_fee?: number;
  total_amount: number;
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  customer_note?: string;
  items?: MyOrderItemLine[];
}

function CartContent() {
  const { t, lang } = useLanguage();
  const searchParams = useSearchParams();
  const { items, totalItems, subtotal, updateQuantity, removeItem, clearCart, addItem } = useCart();
  const { user, token, isAuthenticated } = useAuth();

  const ORDER_STATUS_CONFIG: Record<
    string,
    { label: string; bg: string; color: string; stepText: string }
  > = {
    pending: {
      label: lang === "en" ? "Pending Confirmation" : "Chờ xác nhận",
      bg: "rgba(234, 179, 8, 0.15)",
      color: "#facc15",
      stepText: lang === "en" ? "⏳ Awaiting VanBass confirmation" : "⏳ Đang chờ VanBass tiếp nhận",
    },
    confirmed: {
      label: lang === "en" ? "Confirmed" : "Đã xác nhận",
      bg: "rgba(59, 130, 246, 0.15)",
      color: "#60a5fa",
      stepText: lang === "en" ? "✓ Order confirmed" : "✓ Đơn hàng đã được xác nhận",
    },
    processing: {
      label: lang === "en" ? "Preparing Gear" : "Đang chuẩn bị hàng",
      bg: "rgba(168, 85, 247, 0.15)",
      color: "#c084fc",
      stepText: lang === "en" ? "📦 Technicians packaging equipment" : "📦 Kỹ thuật đang đóng gói thiết bị",
    },
    shipped: {
      label: lang === "en" ? "In Transit" : "Đang giao hàng",
      bg: "rgba(6, 182, 212, 0.15)",
      color: "#22d3ee",
      stepText: lang === "en" ? "🚚 Out for delivery" : "🚚 Đang trên đường vận chuyển",
    },
    completed: {
      label: lang === "en" ? "Completed" : "Hoàn thành",
      bg: "rgba(34, 197, 94, 0.15)",
      color: "#4ade80",
      stepText: lang === "en" ? "🎉 Delivery successful" : "🎉 Giao hàng thành công",
    },
    cancelled: {
      label: lang === "en" ? "Cancelled" : "Đã hủy",
      bg: "rgba(239, 68, 68, 0.15)",
      color: "#f87171",
      stepText: lang === "en" ? "✕ Order has been cancelled" : "✕ Đơn hàng đã bị hủy",
    },
  };

  const getOrderStatusBadge = (status: string) => {
    const st = status.toLowerCase();
    return (
      ORDER_STATUS_CONFIG[st] || {
        label: status.toUpperCase(),
        bg: "rgba(255, 255, 255, 0.1)",
        color: "#fff",
        stepText: "",
      }
    );
  };

  const CANCEL_REASONS = lang === "en" ? [
    "I want to update delivery address",
    "I want to change payment method",
    "I changed my mind / no longer need it",
    "Found better price elsewhere",
    "Estimated delivery time too long",
    "Other reason",
  ] : [
    "Tôi muốn cập nhật lại địa chỉ nhận hàng",
    "Tôi muốn đổi phương thức thanh toán",
    "Tôi đổi ý, không có nhu cầu mua nữa",
    "Tôi tìm thấy sản phẩm với giá ưu đãi hơn",
    "Thời gian giao hàng dự kiến quá lâu",
    "Lý do khác",
  ];

  // Tab: "cart" or "history"
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<"cart" | "history">(() => (tabParam === "history" ? "history" : "cart"));
  const [historyStatusFilter, setHistoryStatusFilter] = useState<string>("all");

  const [checkoutMode, setCheckoutMode] = useState(false);
  const [shippingName, setShippingName] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");
  const [shippingEmail, setShippingEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("vietqr");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [createdOrderId, setCreatedOrderId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Orders History list
  const [myOrders, setMyOrders] = useState<MyOrderItem[]>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [payingOrderId, setPayingOrderId] = useState<string | null>(null);

  // Cancellation Modal
  const [cancelModal, setCancelModal] = useState<{
    orderId: string;
    orderNumber: string;
    reason: string;
  } | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelError, setCancelError] = useState("");
  const [cancelSuccessMsg, setCancelSuccessMsg] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

  // Auto-fill user info if logged in
  useEffect(() => {
    if (user) {
      startTransition(() => {
        if (!shippingName && user.full_name) setShippingName(user.full_name);
        if (!shippingPhone && user.phone) setShippingPhone(user.phone);
        if (!shippingEmail && user.email) setShippingEmail(user.email);
        if (!shippingAddress && user.address) setShippingAddress(user.address);
      });
    }
  }, [user, shippingName, shippingPhone, shippingEmail, shippingAddress]);

  // Load orders history
  const fetchMyOrders = useCallback(async () => {
    if (!token) return;
    startTransition(() => {
      setIsHistoryLoading(true);
    });
    try {
      const res = await fetch(`${apiUrl}/orders/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        startTransition(() => {
          setMyOrders(data.items || []);
        });
      }
    } catch (e) {
      console.error("Failed to load cart orders history:", e);
    } finally {
      startTransition(() => {
        setIsHistoryLoading(false);
      });
    }
  }, [token, apiUrl]);

  // Load orders history whenever token or activeTab changes
  useEffect(() => {
    if (token || activeTab === "history") {
      void fetchMyOrders();
    }
  }, [token, activeTab, fetchMyOrders]);

  // Pay directly via VNPAY
  const handlePayOrderVnpay = async (orderId: string) => {
    setPayingOrderId(orderId);
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
      const err = await res.json().catch(() => ({ detail: "Không thể khởi tạo cổng VNPAY" }));
      alert(err.detail || "Không thể kết nối đến VNPAY. Vui lòng thử lại sau.");
    } catch (e) {
      console.error("VNPAY pay error:", e);
      alert("Lỗi kết nối đến máy chủ thanh toán.");
    } finally {
      setPayingOrderId(null);
    }
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingName || !shippingPhone || !shippingAddress) {
      setErrorMsg(t.checkout.fillRequiredError);
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const payload = {
        shipping_name: shippingName.trim(),
        shipping_phone: shippingPhone.trim(),
        shipping_email: shippingEmail.trim() || undefined,
        customer_email: shippingEmail.trim() || undefined,
        shipping_address: shippingAddress.trim(),
        payment_method: paymentMethod,
        payment_status: "unpaid",
        items: items.map((i) => ({
          product_id: i.product_id,
          quantity: i.quantity,
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
        setCreatedOrderId(orderData.id);
        clearCart();
        fetchMyOrders();

        if (paymentMethod === "vietqr" || paymentMethod === "vnpay" || paymentMethod === "online" || paymentMethod === "banking" || paymentMethod === "visa") {
          try {
            const vnpayRes = await fetch(`${apiUrl}/orders/${orderData.id}/vnpay/create-payment`, {
              method: "POST",
              headers,
            });
            if (vnpayRes.ok) {
              const vnpayData = await vnpayRes.json();
              if (vnpayData.payment_url) {
                window.location.href = vnpayData.payment_url;
                return;
              }
            }
          } catch (vnpayErr) {
            console.error("VNPAY payment initiation error:", vnpayErr);
          }
          setActiveTab("history");
          setErrorMsg(lang === "en" ? "Order recorded. You can click 'Pay via VNPay' below." : "Đơn hàng đã được ghi nhận. Bạn có thể bấm nút 'Thanh Toán VNPAY' bên dưới để thanh toán.");
        } else {
          setOrderSuccess(true);
        }
      } else {
        const err = await res.json().catch(() => ({ detail: "Không thể tạo đơn hàng" }));
        let msg = "Đã xảy ra lỗi khi tạo đơn hàng. Vui lòng thử lại.";
        if (typeof err.detail === "string") {
          msg = err.detail;
        } else if (Array.isArray(err.detail)) {
          msg = err.detail.map((d: { msg?: string }) => d.msg || "Lỗi dữ liệu").join(", ");
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

  // Re-order handler
  const handleReorder = (ord: MyOrderItem) => {
    if (ord.items && ord.items.length > 0) {
      ord.items.forEach((it) => {
        addItem(
          {
            id: it.product_id,
            category_id: "",
            name: it.product_name,
            slug: it.product_slug || "",
            sale_enabled: true,
            sale_price: it.unit_price,
            rental_enabled: false,
            sku: it.product_sku || it.sku || "VB-PROD",
            stock_quantity: 99,
            is_active: true,
          },
          it.quantity
        );
      });
      setActiveTab("cart");
      setOrderSuccess(false);
    }
  };

  // Cancel order handler
  const handleConfirmCancelOrder = async () => {
    if (!cancelModal) return;
    setIsCancelling(true);
    setCancelError("");

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(`${apiUrl}/orders/${cancelModal.orderId}/cancel`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          reason: cancelModal.reason || "Khách hàng yêu cầu hủy đơn",
        }),
      });

      if (res.ok) {
        const cancelledId = cancelModal.orderId;
        setCancelModal(null);
        setCancelSuccessMsg(lang === "en" ? "✓ Order cancelled successfully!" : "✓ Đã hủy đơn hàng thành công!");
        setMyOrders((prev) => prev.filter((o) => o.id !== cancelledId));
        setTimeout(() => setCancelSuccessMsg(""), 3000);
        void fetchMyOrders();
      } else {
        const err = await res.json().catch(() => ({ detail: "Lỗi khi hủy đơn" }));
        let msg = "Không thể hủy đơn hàng này.";
        if (typeof err.detail === "string") {
          msg = err.detail;
        } else if (Array.isArray(err.detail)) {
          msg = err.detail.map((d: { msg?: string }) => d.msg || "Lỗi").join(", ");
        }
        setCancelError(msg);
      }
    } catch (err) {
      console.error("Cancel order network error:", err);
      setCancelError("Không thể kết nối đến máy chủ.");
    } finally {
      setIsCancelling(false);
    }
  };

  const filteredHistoryOrders = myOrders.filter((ord) => {
    if (historyStatusFilter === "all") return true;
    return ord.status.toLowerCase() === historyStatusFilter.toLowerCase();
  });

  const getFilterCount = (statusKey: string) => {
    if (statusKey === "all") return myOrders.length;
    return myOrders.filter((o) => o.status.toLowerCase() === statusKey.toLowerCase()).length;
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#090909" }}>
      <Header />

      <main style={{ flex: 1, paddingTop: "120px", paddingBottom: "100px" }}>
        <div className="container">
          {/* Main Cart & Order History View Tabs */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
              paddingBottom: "20px",
              marginBottom: "36px",
            }}
          >
            <div>
              <p className="section-kicker">{t.cart.kicker}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px" }}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("cart");
                    setOrderSuccess(false);
                  }}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: activeTab === "cart" ? "#ffffff" : "rgba(255, 255, 255, 0.04)",
                    color: activeTab === "cart" ? "#000000" : "#a1a1aa",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: 800,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 150ms ease",
                  }}
                >
                  <span>{t.cart.currentCartTab}</span>
                  {totalItems > 0 && (
                    <span
                      style={{
                        fontSize: "11px",
                        padding: "2px 7px",
                        borderRadius: "10px",
                        backgroundColor: activeTab === "cart" ? "#000" : "#22c55e",
                        color: "#fff",
                      }}
                    >
                      {totalItems}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("history");
                    setOrderSuccess(false);
                  }}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: activeTab === "history" ? "#ffffff" : "rgba(255, 255, 255, 0.04)",
                    color: activeTab === "history" ? "#000000" : "#a1a1aa",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: 800,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 150ms ease",
                  }}
                >
                  <span>{t.cart.historyTab}</span>
                  {myOrders.length > 0 && (
                    <span
                      style={{
                        fontSize: "11px",
                        padding: "2px 7px",
                        borderRadius: "10px",
                        backgroundColor: activeTab === "history" ? "#000" : "rgba(255,255,255,0.15)",
                        color: activeTab === "history" ? "#fff" : "#a1a1aa",
                      }}
                    >
                      {myOrders.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {isAuthenticated ? (
              <div style={{ fontSize: "13px", color: "#a1a1aa" }}>
                {t.cart.accountLabel} <strong style={{ color: "#fff" }}>{user?.email}</strong>
              </div>
            ) : (
              <Link
                href="/login?redirect=/cart"
                style={{
                  fontSize: "13px",
                  color: "#22c55e",
                  fontWeight: 700,
                  textDecoration: "underline",
                }}
              >
                {t.cart.loginPrompt}
              </Link>
            )}
          </div>

          {/* Cancellation notification */}
          {cancelSuccessMsg && (
            <div
              style={{
                padding: "14px 20px",
                backgroundColor: "rgba(34, 197, 94, 0.15)",
                border: "1px solid #22c55e",
                color: "#4ade80",
                fontSize: "14px",
                marginBottom: "24px",
                borderRadius: "4px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{cancelSuccessMsg}</span>
              <button
                onClick={() => setCancelSuccessMsg("")}
                style={{ background: "none", border: "none", color: "#4ade80", cursor: "pointer", fontSize: "16px" }}
              >
                ✕
              </button>
            </div>
          )}

          {/* ========================================================
              VIEW 1: SHOPPING CART
             ======================================================== */}
          {activeTab === "cart" && (
            <div>
              {orderSuccess ? (
                <div
                  style={{
                    backgroundColor: "var(--surface, #121214)",
                    border: "1px solid #22c55e",
                    padding: "48px 32px",
                    textAlign: "center",
                    maxWidth: "640px",
                    margin: "20px auto 40px auto",
                    borderRadius: "6px",
                  }}
                >
                  <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
                  <h2 style={{ fontSize: "22px", color: "#fff", marginBottom: "12px", fontWeight: 800 }}>
                    {t.checkout.orderSuccessTitle}
                  </h2>
                  <p style={{ color: "#a1a1aa", lineHeight: 1.7, marginBottom: "28px", fontSize: "14.5px" }}>
                    {t.checkout.orderNumberLabel} <strong style={{ color: "#22c55e", fontSize: "18px" }}>#{orderNumber}</strong>
                    <br />
                    {paymentMethod === "cod" ? t.checkout.orderStatusCod : t.checkout.orderStatusVnpay}
                  </p>
                  <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
                    {createdOrderId && paymentMethod !== "cod" && (
                      <button
                        type="button"
                        disabled={payingOrderId === createdOrderId}
                        onClick={() => handlePayOrderVnpay(createdOrderId)}
                        className="button button-primary"
                        style={{ cursor: "pointer", backgroundColor: "#22c55e", color: "#000", fontWeight: 800 }}
                      >
                        {payingOrderId === createdOrderId ? (lang === "en" ? "⏳ Connecting..." : "⏳ Đang kết nối...") : t.checkout.payVnpayNow}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setOrderSuccess(false);
                        setActiveTab("history");
                      }}
                      className="button"
                      style={{ cursor: "pointer", backgroundColor: "#27272a", color: "#fff" }}
                    >
                      {t.checkout.viewHistoryBtn}
                    </button>
                    <Link href="/products" className="button" style={{ backgroundColor: "#1e1e24", color: "#a1a1aa" }}>
                      {t.checkout.continueBtn}
                    </Link>
                  </div>
                </div>
              ) : items.length === 0 ? (
                <div>
                  <div
                    style={{
                      backgroundColor: "var(--surface, #121214)",
                      border: "1px solid var(--border, rgba(255,255,255,0.1))",
                      padding: "60px 24px",
                      textAlign: "center",
                      borderRadius: "6px",
                      marginBottom: "40px",
                    }}
                  >
                    <div style={{ fontSize: "42px", marginBottom: "12px" }}>🛒</div>
                    <h3 style={{ fontSize: "18px", color: "#fff", margin: "0 0 10px 0", fontWeight: 700 }}>
                      {t.cart.emptyTitle}
                    </h3>
                    <p style={{ color: "#a1a1aa", fontSize: "14.5px", marginBottom: "24px" }}>
                      {t.cart.emptySubtitle}
                    </p>
                    <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
                      <Link href="/products" className="button button-primary">
                        {t.cart.exploreBtn} <span>→</span>
                      </Link>
                      {myOrders.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setActiveTab("history")}
                          style={{
                            padding: "12px 20px",
                            backgroundColor: "#27272a",
                            color: "#fff",
                            border: "1px solid rgba(255,255,255,0.15)",
                            borderRadius: "4px",
                            fontWeight: 700,
                            fontSize: "14px",
                            cursor: "pointer",
                          }}
                        >
                          📦 {t.cart.viewPastOrdersBtn} ({myOrders.length})
                        </button>
                      )}
                    </div>
                  </div>
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
                            backgroundColor: "var(--surface, #121214)",
                            border: "1px solid var(--border, rgba(255,255,255,0.1))",
                            borderRadius: "6px",
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
                              borderRadius: "4px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "12px",
                              fontWeight: 900,
                              color: "#22c55e",
                              flexShrink: 0,
                            }}
                          >
                            VB
                          </div>

                          {/* Info */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <span style={{ fontSize: "11px", color: "#71717a", textTransform: "uppercase", fontWeight: 700 }}>
                              {item.sku || "VanBass"}
                            </span>
                            <h3 style={{ fontSize: "15px", fontWeight: 700, margin: "2px 0 6px 0", color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              <Link href={`/products/${item.slug}`} style={{ color: "#fff", textDecoration: "none" }}>
                                {getTranslatedProductName(item, lang)}
                              </Link>
                            </h3>
                            <span style={{ fontSize: "14px", fontWeight: 800, color: "#fff" }}>
                              {formatCurrency(item.sale_price, lang)}
                            </span>
                          </div>

                          {/* Quantity selector */}
                          <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border, rgba(255,255,255,0.15))", backgroundColor: "#000", borderRadius: "4px" }}>
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
                              {formatCurrency(item.sale_price * item.quantity, lang)}
                            </strong>
                            <button
                              onClick={() => removeItem(item.product_id)}
                              style={{ background: "none", border: "none", color: "#ef4444", fontSize: "12px", cursor: "pointer", padding: 0 }}
                            >
                              {t.cart.removeItem}
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
                        {t.cart.clearCart}
                      </button>
                      <Link href="/products" style={{ color: "#a1a1aa", fontSize: "13px", textDecoration: "none" }}>
                        {t.cart.continueShopping}
                      </Link>
                    </div>
                  </div>

                  {/* Order Summary & Checkout Form */}
                  <div
                    style={{
                      backgroundColor: "var(--surface, #121214)",
                      border: "1px solid var(--border, rgba(255,255,255,0.1))",
                      padding: "32px",
                      borderRadius: "6px",
                    }}
                  >
                    <h3 style={{ fontSize: "18px", fontWeight: 800, margin: "0 0 20px 0", color: "#fff" }}>
                      {t.cart.summaryTitle}
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px", fontSize: "14px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", color: "#a1a1aa" }}>
                        <span>{t.cart.itemsSubtotal} ({totalItems} {t.cart.itemsUnit})</span>
                        <span style={{ color: "#fff", fontWeight: 600 }}>{formatCurrency(subtotal, lang)}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", color: "#a1a1aa" }}>
                        <span>{t.cart.shippingFee}</span>
                        <span style={{ color: "#22c55e", fontWeight: 600 }}>{t.cart.shippingFree}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", color: "#a1a1aa" }}>
                        <span>{t.cart.warrantyOfficial}</span>
                        <span style={{ color: "#fff", fontWeight: 600 }}>{t.cart.warranty12Months}</span>
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
                        <span>{t.cart.total}</span>
                        <span style={{ color: "#22c55e" }}>{formatCurrency(subtotal, lang)}</span>
                      </div>
                    </div>

                    {errorMsg && (
                      <div style={{ padding: "10px 14px", backgroundColor: "rgba(239,68,68,0.15)", border: "1px solid #ef4444", color: "#fca5a5", fontSize: "13px", marginBottom: "16px", borderRadius: "4px" }}>
                        {errorMsg}
                      </div>
                    )}

                    {/* Toggle Checkout Form */}
                    {!checkoutMode ? (
                      <button
                        onClick={() => setCheckoutMode(true)}
                        className="button button-primary button-lg"
                        style={{ width: "100%", cursor: "pointer" }}
                      >
                        {t.cart.proceedCheckout}
                      </button>
                    ) : (
                      <form onSubmit={handleCheckoutSubmit}>
                        <div style={{ marginBottom: "16px" }}>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "6px", textTransform: "uppercase" }}>
                            {t.checkout.fullName}
                          </label>
                          <input
                            type="text"
                            required
                            value={shippingName}
                            onChange={(e) => setShippingName(e.target.value)}
                            placeholder="Nguyễn Văn A"
                            style={{ width: "100%", padding: "10px 14px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "14px", boxSizing: "border-box", borderRadius: "4px" }}
                          />
                        </div>

                        <div style={{ marginBottom: "16px" }}>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "6px", textTransform: "uppercase" }}>
                            {t.checkout.phone}
                          </label>
                          <input
                            type="tel"
                            required
                            value={shippingPhone}
                            onChange={(e) => setShippingPhone(e.target.value)}
                            placeholder="0905 123 456"
                            style={{ width: "100%", padding: "10px 14px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "14px", boxSizing: "border-box", borderRadius: "4px" }}
                          />
                        </div>

                        <div style={{ marginBottom: "16px" }}>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "6px", textTransform: "uppercase" }}>
                            {t.checkout.email}
                          </label>
                          <input
                            type="email"
                            value={shippingEmail}
                            onChange={(e) => setShippingEmail(e.target.value)}
                            placeholder="khachhang@gmail.com"
                            style={{ width: "100%", padding: "10px 14px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "14px", boxSizing: "border-box", borderRadius: "4px" }}
                          />
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "6px", textTransform: "uppercase" }}>
                            {t.checkout.address}
                          </label>
                          <input
                            type="text"
                            required
                            value={shippingAddress}
                            onChange={(e) => setShippingAddress(e.target.value)}
                            placeholder="Số nhà, Tên đường, Phường/Xã, Quận/Huyện"
                            style={{ width: "100%", padding: "10px 14px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "14px", boxSizing: "border-box", borderRadius: "4px" }}
                          />
                        </div>

                        <div style={{ marginBottom: "24px" }}>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "8px", textTransform: "uppercase" }}>
                            {t.checkout.paymentMethod}
                          </label>
                          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 16px", backgroundColor: paymentMethod === "vietqr" ? "rgba(34,197,94,0.08)" : "#0a0a0c", border: paymentMethod === "vietqr" ? "1.5px solid #22c55e" : "1px solid #27272a", color: "#fff", fontSize: "13.5px", cursor: "pointer", borderRadius: "8px" }}>
                              <input
                                type="radio"
                                name="payment"
                                value="vietqr"
                                checked={paymentMethod === "vietqr"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                style={{ marginTop: "4px" }}
                              />
                              <div>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                                  <strong style={{ fontSize: "14px", color: "#fff" }}>⚡ {t.checkout.vietqrOnline}</strong>
                                  <span style={{ fontSize: "10.5px", padding: "2px 7px", backgroundColor: "rgba(34,197,94,0.2)", color: "#4ade80", borderRadius: "4px", fontWeight: 700 }}>100% AUTO</span>
                                </div>
                                <span style={{ display: "block", fontSize: "12px", color: "#a1a1aa", marginTop: "4px", lineHeight: 1.5 }}>
                                  {t.checkout.vietqrDesc}
                                </span>
                              </div>
                            </label>
                            <label style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "14px 16px", backgroundColor: paymentMethod === "cod" ? "rgba(234,179,8,0.08)" : "#0a0a0c", border: paymentMethod === "cod" ? "1.5px solid #eab308" : "1px solid #27272a", color: "#fff", fontSize: "13.5px", cursor: "pointer", borderRadius: "8px" }}>
                              <input
                                type="radio"
                                name="payment"
                                value="cod"
                                checked={paymentMethod === "cod"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                style={{ marginTop: "4px" }}
                              />
                              <div>
                                <strong style={{ fontSize: "14px", color: "#fff" }}>💵 {t.checkout.cod}</strong>
                                <span style={{ display: "block", fontSize: "12px", color: "#a1a1aa", marginTop: "4px", lineHeight: 1.5 }}>
                                  {t.checkout.codDesc}
                                </span>
                              </div>
                            </label>
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="button button-primary button-lg"
                          style={{ width: "100%", cursor: isSubmitting ? "not-allowed" : "pointer" }}
                        >
                          {isSubmitting ? t.checkout.submitting : `${t.checkout.confirmOrder} (${formatCurrency(subtotal, lang)})`}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================
              VIEW 2: ORDER HISTORY TAB
             ======================================================== */}
          {activeTab === "history" && (
            <div>
              {/* Order Status Filter Tabs */}
              <div
                style={{
                  display: "flex",
                  overflowX: "auto",
                  backgroundColor: "#121214",
                  borderBottom: "2px solid rgba(255,255,255,0.08)",
                  marginBottom: "24px",
                  borderRadius: "4px 4px 0 0",
                }}
              >
                {[
                  { key: "all", label: t.orderHistory.filterAll },
                  { key: "pending", label: t.orderHistory.filterPending },
                  { key: "confirmed", label: t.orderHistory.filterConfirmed },
                  { key: "processing", label: t.orderHistory.filterProcessing },
                  { key: "shipped", label: t.orderHistory.filterShipped },
                  { key: "completed", label: t.orderHistory.filterCompleted },
                ].map((tab) => {
                  const count = getFilterCount(tab.key);
                  const isSelected = historyStatusFilter === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setHistoryStatusFilter(tab.key)}
                      style={{
                        padding: "14px 18px",
                        backgroundColor: "transparent",
                        border: "none",
                        borderBottom: isSelected ? "2.5px solid #22c55e" : "2.5px solid transparent",
                        color: isSelected ? "#22c55e" : "#a1a1aa",
                        fontWeight: isSelected ? 800 : 600,
                        fontSize: "13.5px",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        transition: "all 150ms ease",
                      }}
                    >
                      <span>{tab.label}</span>
                      {count > 0 && (
                        <span
                          style={{
                            fontSize: "11px",
                            padding: "1px 6px",
                            borderRadius: "10px",
                            backgroundColor: isSelected ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.08)",
                            color: isSelected ? "#4ade80" : "#71717a",
                          }}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {isHistoryLoading ? (
                <div style={{ color: "#a1a1aa", padding: "40px 0", textAlign: "center" }}>
                  {t.common.loading}
                </div>
              ) : !isAuthenticated ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "60px 20px",
                    backgroundColor: "#111113",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "6px",
                  }}
                >
                  <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔒</div>
                  <h3 style={{ fontSize: "18px", color: "#fff", margin: "0 0 10px 0", fontWeight: 700 }}>
                    {t.cart.loginPrompt}
                  </h3>
                  <Link href="/login?redirect=/cart" className="button button-primary">
                    {t.auth.loginBtn} →
                  </Link>
                </div>
              ) : filteredHistoryOrders.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "60px 20px",
                    backgroundColor: "#111113",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "6px",
                  }}
                >
                  <div style={{ fontSize: "40px", marginBottom: "12px" }}>📦</div>
                  <p style={{ color: "#a1a1aa", fontSize: "15px", marginBottom: "18px" }}>
                    {t.orderHistory.emptyHistory}
                  </p>
                  <Link href="/products" className="button button-primary button-sm">
                    {t.cart.exploreBtn} →
                  </Link>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {filteredHistoryOrders.map((ord) => {
                    const badge = getOrderStatusBadge(ord.status);
                    const canCancel =
                      (ord.status.toLowerCase() === "pending" ||
                        ord.status.toLowerCase() === "confirmed") &&
                      ord.payment_status?.toLowerCase() !== "paid";

                    return (
                      <div
                        key={ord.id}
                        style={{
                          backgroundColor: "#121214",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: "6px",
                          overflow: "hidden",
                          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                        }}
                      >
                        {/* Order Card Header */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: "12px",
                            padding: "14px 20px",
                            backgroundColor: "#17171a",
                            borderBottom: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span
                              style={{
                                backgroundColor: "#22c55e",
                                color: "#000",
                                fontSize: "10px",
                                fontWeight: 900,
                                padding: "2px 6px",
                                borderRadius: "2px",
                                textTransform: "uppercase",
                              }}
                            >
                              Mall
                            </span>
                            <strong style={{ color: "#fff", fontSize: "14px" }}>
                              VanBass Music Center
                            </strong>
                            <span style={{ color: "#71717a", fontSize: "12px" }}>|</span>
                            <span style={{ fontSize: "12px", color: "#a1a1aa" }}>
                              #{ord.order_number}
                            </span>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: 800,
                                textTransform: "uppercase",
                                color: badge.color,
                              }}
                            >
                              {badge.stepText || badge.label}
                            </span>
                            <span style={{ color: "#71717a", fontSize: "12px" }}>|</span>
                            <span
                              style={{
                                padding: "3px 8px",
                                borderRadius: "3px",
                                fontSize: "11px",
                                fontWeight: 700,
                                backgroundColor:
                                  ord.payment_status === "paid"
                                    ? "rgba(34,197,94,0.15)"
                                    : ord.payment_method === "cod"
                                    ? "rgba(234,179,8,0.15)"
                                    : "rgba(56,189,248,0.15)",
                                color:
                                  ord.payment_status === "paid"
                                    ? "#4ade80"
                                    : ord.payment_method === "cod"
                                    ? "#facc15"
                                    : "#38bdf8",
                              }}
                            >
                              {ord.payment_status === "paid"
                                ? (lang === "en" ? "PAID" : "ĐÃ THANH TOÁN")
                                : ord.payment_method === "cod"
                                ? (lang === "en" ? "UNPAID (COD)" : "CHƯA THANH TOÁN (COD)")
                                : (lang === "en" ? "AWAITING VNPAY" : "CHỜ THANH TOÁN VNPAY")}
                            </span>
                          </div>
                        </div>

                        {/* Items list */}
                        <div style={{ padding: "16px 20px" }}>
                          {ord.items && ord.items.length > 0 ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                              {ord.items.map((it, idx) => (
                                <div
                                  key={idx}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: "16px",
                                    paddingBottom: "12px",
                                    borderBottom:
                                      idx < (ord.items?.length || 0) - 1
                                        ? "1px solid rgba(255,255,255,0.04)"
                                        : "none",
                                  }}
                                >
                                  {/* Left: Image + Name */}
                                  <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1, minWidth: 0 }}>
                                    <div
                                      style={{
                                        width: "60px",
                                        height: "60px",
                                        backgroundColor: "#000",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        borderRadius: "4px",
                                        overflow: "hidden",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                      }}
                                    >
                                      {it.product_image ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                          src={it.product_image}
                                          alt={getTranslatedProductName(it.product_name, lang)}
                                          style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                        />
                                      ) : (
                                        <span style={{ fontSize: "11px", fontWeight: 800, color: "#22c55e" }}>
                                          VB
                                        </span>
                                      )}
                                    </div>

                                    <div style={{ minWidth: 0 }}>
                                      <h4
                                        style={{
                                          margin: "0 0 4px 0",
                                          fontSize: "14px",
                                          fontWeight: 700,
                                          color: "#fff",
                                          whiteSpace: "nowrap",
                                          overflow: "hidden",
                                          textOverflow: "ellipsis",
                                        }}
                                      >
                                        {it.product_slug ? (
                                          <Link
                                            href={`/products/${it.product_slug}`}
                                            style={{ color: "#fff", textDecoration: "none" }}
                                          >
                                            {getTranslatedProductName(it.product_name, lang)}
                                          </Link>
                                        ) : (
                                          getTranslatedProductName(it.product_name, lang)
                                        )}
                                      </h4>
                                      <div style={{ fontSize: "12px", color: "#71717a" }}>
                                        SKU: {it.product_sku || it.sku || "VanBass"} • {lang === "en" ? "Quantity:" : "Số lượng:"} x{it.quantity}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Right: Price */}
                                  <div style={{ textAlign: "right" }}>
                                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>
                                      {formatCurrency(it.line_total || it.subtotal || it.unit_price * it.quantity, lang)}
                                    </div>
                                    {it.quantity > 1 && (
                                      <span style={{ fontSize: "11px", color: "#71717a" }}>
                                        ({formatCurrency(it.unit_price, lang)} / {lang === "en" ? "pc" : "cái"})
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div style={{ color: "#71717a", fontSize: "13px" }}>
                              {lang === "en" ? "Order details processing." : "Chi tiết món hàng đang được xử lý."}
                            </div>
                          )}
                        </div>

                        {/* Card Footer: Address + Total + Actions */}
                        <div
                          style={{
                            padding: "16px 20px",
                            backgroundColor: "#0d0e10",
                            borderTop: "1px solid rgba(255,255,255,0.06)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "14px",
                          }}
                        >
                          {/* Metadata row */}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              flexWrap: "wrap",
                              gap: "10px",
                              fontSize: "12px",
                              color: "#71717a",
                            }}
                          >
                            <div>
                              📍 {t.orderHistory.recipient} <strong style={{ color: "#cbd5e1" }}>{ord.shipping_name} ({ord.shipping_phone})</strong> - {ord.shipping_address}
                            </div>
                            <div>
                              {t.orderHistory.orderDate} {new Date(ord.created_at).toLocaleString(lang === "en" ? "en-US" : "vi-VN")}
                            </div>
                          </div>

                          {/* Total & Action Buttons Bar */}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              flexWrap: "wrap",
                              gap: "16px",
                              paddingTop: "12px",
                              borderTop: "1px dashed rgba(255,255,255,0.08)",
                            }}
                          >
                            <div>
                              <span style={{ fontSize: "13px", color: "#a1a1aa", marginRight: "8px" }}>
                                {t.orderHistory.totalAmt}
                              </span>
                              <strong style={{ fontSize: "20px", color: "#22c55e", fontWeight: 900 }}>
                                {formatCurrency(ord.total_amount, lang)}
                              </strong>
                            </div>

                            <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                              {/* Pay Now Button via VNPAY if Unpaid */}
                              {ord.payment_status === "unpaid" && ord.status !== "cancelled" && (
                                <button
                                  type="button"
                                  disabled={payingOrderId === ord.id}
                                  onClick={() => handlePayOrderVnpay(ord.id)}
                                  style={{
                                    padding: "8px 18px",
                                    backgroundColor: "#22c55e",
                                    color: "#000000",
                                    border: "none",
                                    fontSize: "13px",
                                    fontWeight: 900,
                                    borderRadius: "4px",
                                    cursor: payingOrderId === ord.id ? "not-allowed" : "pointer",
                                    boxShadow: "0 0 14px rgba(34, 197, 94, 0.4)",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "6px",
                                    transition: "all 0.2s ease",
                                  }}
                                >
                                  <span>{payingOrderId === ord.id ? "⏳" : "⚡"}</span>
                                  {payingOrderId === ord.id ? (lang === "en" ? "Connecting VNPAY..." : "Đang mở VNPAY...") : t.orderHistory.payNowBtn}
                                </button>
                              )}

                              {/* Cancel button if pending/confirmed */}
                              {canCancel && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setCancelModal({
                                      orderId: ord.id,
                                      orderNumber: ord.order_number,
                                      reason: CANCEL_REASONS[0],
                                    })
                                  }
                                  style={{
                                    padding: "8px 16px",
                                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                                    border: "1px solid rgba(239, 68, 68, 0.5)",
                                    color: "#f87171",
                                    fontSize: "13px",
                                    fontWeight: 700,
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    transition: "all 150ms ease",
                                  }}
                                >
                                  {t.orderHistory.cancelOrderBtn}
                                </button>
                              )}

                              {/* Re-order button */}
                              <button
                                type="button"
                                onClick={() => handleReorder(ord)}
                                style={{
                                  padding: "8px 18px",
                                  backgroundColor: "#ffffff",
                                  color: "#000000",
                                  border: "none",
                                  fontSize: "13px",
                                  fontWeight: 800,
                                  borderRadius: "4px",
                                  cursor: "pointer",
                                }}
                              >
                                {t.orderHistory.reorderBtn}
                              </button>

                              {/* Contact Shop */}
                              <a
                                href="https://zalo.me/0706067799"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  padding: "8px 14px",
                                  backgroundColor: "#27272a",
                                  color: "#fff",
                                  border: "1px solid rgba(255,255,255,0.1)",
                                  fontSize: "13px",
                                  fontWeight: 600,
                                  borderRadius: "4px",
                                  textDecoration: "none",
                                }}
                              >
                                {lang === "en" ? "Contact Support" : "Liên hệ Shop"}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* MODAL: CANCEL ORDER DIALOG */}
      {cancelModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(6px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            animation: "fadeIn 0.2s ease-out",
          }}
          onClick={() => !isCancelling && setCancelModal(null)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "480px",
              backgroundColor: "#16181a",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "8px",
              padding: "28px 24px",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
              boxSizing: "border-box",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(239, 68, 68, 0.15)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  flexShrink: 0,
                }}
              >
                ✕
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 800, color: "#ffffff" }}>
                  {t.orderHistory.cancelModalTitle} #{cancelModal.orderNumber}
                </h3>
                <p style={{ margin: "2px 0 0 0", fontSize: "13px", color: "#a1a1aa" }}>
                  {t.orderHistory.cancelModalReasonLabel}
                </p>
              </div>
            </div>

            {cancelError && (
              <div
                style={{
                  padding: "10px 14px",
                  backgroundColor: "rgba(239, 68, 68, 0.15)",
                  border: "1px solid #ef4444",
                  color: "#fca5a5",
                  fontSize: "13px",
                  marginBottom: "16px",
                  borderRadius: "4px",
                }}
              >
                {cancelError}
              </div>
            )}

            {/* Reason selector */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
              {CANCEL_REASONS.map((r, idx) => (
                <label
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 14px",
                    backgroundColor: cancelModal.reason === r ? "rgba(34,197,94,0.1)" : "#0e0f11",
                    border:
                      cancelModal.reason === r
                        ? "1px solid #22c55e"
                        : "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "13.5px",
                    cursor: "pointer",
                    transition: "all 150ms ease",
                  }}
                >
                  <input
                    type="radio"
                    name="cancel_reason"
                    value={r}
                    checked={cancelModal.reason === r}
                    onChange={(e) => setCancelModal({ ...cancelModal, reason: e.target.value })}
                  />
                  <span>{r}</span>
                </label>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <button
                type="button"
                disabled={isCancelling}
                onClick={() => setCancelModal(null)}
                style={{
                  padding: "10px 18px",
                  backgroundColor: "#27272a",
                  color: "#e4e4e7",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "4px",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: isCancelling ? "not-allowed" : "pointer",
                }}
              >
                {t.orderHistory.cancelModalCloseBtn}
              </button>
              <button
                type="button"
                disabled={isCancelling}
                onClick={handleConfirmCancelOrder}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#ef4444",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "13px",
                  fontWeight: 800,
                  cursor: isCancelling ? "not-allowed" : "pointer",
                  opacity: isCancelling ? 0.7 : 1,
                }}
              >
                {isCancelling ? (lang === "en" ? "Cancelling..." : "Đang hủy đơn...") : t.orderHistory.cancelModalConfirmBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function CartPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#09090b" }}>
          <p style={{ color: "#a1a1aa" }}>Loading...</p>
        </div>
      }
    >
      <CartContent />
    </Suspense>
  );
}
