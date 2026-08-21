"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../lib/auth-context";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

interface MyOrderItem {
  id: string;
  order_number: string;
  created_at: string;
  status: string;
  payment_status: string;
  total_amount: number;
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  customer_note?: string;
  items?: Array<{
    id: string;
    product_name: string;
    product_sku: string;
    quantity: number;
    unit_price: number;
    line_total: number;
  }>;
}

interface MyRentalItem {
  id: string;
  request_number: string;
  created_at: string;
  start_date: string;
  end_date: string;
  status: string;
  payment_status: string;
  rental_total: number;
  deposit_amount: number;
  pickup_location: string;
  customer_note?: string;
  items?: Array<{
    id: string;
    product_name: string;
    quantity: number;
    rental_price: number;
    number_of_days: number;
    subtotal: number;
  }>;
}

function getOrderStatusBadge(status: string) {
  const st = status.toLowerCase();
  switch (st) {
    case "pending":
      return { label: "Chờ xác nhận", bg: "rgba(234, 179, 8, 0.15)", color: "#facc15" };
    case "confirmed":
      return { label: "Đã xác nhận", bg: "rgba(59, 130, 246, 0.15)", color: "#60a5fa" };
    case "processing":
      return { label: "Đang chuẩn bị hàng", bg: "rgba(168, 85, 247, 0.15)", color: "#c084fc" };
    case "shipped":
      return { label: "Đang giao hàng", bg: "rgba(6, 182, 212, 0.15)", color: "#22d3ee" };
    case "completed":
      return { label: "Hoàn thành", bg: "rgba(34, 197, 94, 0.15)", color: "#4ade80" };
    case "cancelled":
      return { label: "Đã hủy", bg: "rgba(239, 68, 68, 0.15)", color: "#f87171" };
    default:
      return { label: status.toUpperCase(), bg: "rgba(255, 255, 255, 0.1)", color: "#fff" };
  }
}

function getRentalStatusBadge(status: string) {
  const st = status.toLowerCase();
  switch (st) {
    case "pending":
      return { label: "Chờ kỹ thuật liên hệ", bg: "rgba(234, 179, 8, 0.15)", color: "#facc15" };
    case "contacted":
      return { label: "Đã liên hệ tư vấn", bg: "rgba(59, 130, 246, 0.15)", color: "#60a5fa" };
    case "confirmed":
      return { label: "Đã xác nhận cọc", bg: "rgba(34, 197, 94, 0.15)", color: "#4ade80" };
    case "completed":
      return { label: "Đã trả máy", bg: "rgba(113, 113, 122, 0.2)", color: "#a1a1aa" };
    case "cancelled":
      return { label: "Đã hủy", bg: "rgba(239, 68, 68, 0.15)", color: "#f87171" };
    default:
      return { label: status.toUpperCase(), bg: "rgba(255, 255, 255, 0.1)", color: "#fff" };
  }
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, token, isAuthenticated, isLoading, logout, updateProfile } = useAuth();

  const [activeTab, setActiveTab] = useState<"info" | "orders" | "rentals">("info");

  // Form states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Đà Nẵng");
  const [address, setAddress] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Real Database Lists
  const [myOrders, setMyOrders] = useState<MyOrderItem[]>([]);
  const [myRentals, setMyRentals] = useState<MyRentalItem[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
    if (user) {
      setFullName(user.full_name || "");
      setPhone(user.phone || "");
      setCity(user.city || "Đà Nẵng");
      setAddress(user.address || "");
    }
  }, [user, isAuthenticated, isLoading, router]);

  // Fetch real orders & rental requests
  useEffect(() => {
    const fetchUserActivities = async () => {
      if (!token) return;
      setIsDataLoading(true);
      try {
        const [orderRes, rentRes] = await Promise.all([
          fetch(`${apiUrl}/orders/me`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${apiUrl}/rental-requests/me`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (orderRes.ok) {
          const orderData = await orderRes.json();
          setMyOrders(orderData.items || []);
        }

        if (rentRes.ok) {
          const rentData = await rentRes.json();
          setMyRentals(rentData.items || []);
        }
      } catch (err) {
        console.error("Failed to fetch user orders/rentals:", err);
      } finally {
        setIsDataLoading(false);
      }
    };

    if (token) {
      fetchUserActivities();
    }
  }, [token, apiUrl]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      await updateProfile({
        full_name: fullName,
        phone: phone,
        city: city,
        address: address,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (isLoading || !user) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#090909" }}>
        <Header />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ color: "#a1a1aa" }}>Đang tải thông tin tài khoản...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#090909" }}>
      <Header />

      <main style={{ flex: 1, paddingTop: "140px", paddingBottom: "100px" }}>
        <div className="container">
          {/* Header Profile */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "20px",
              paddingBottom: "32px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
              marginBottom: "40px",
            }}
          >
            <div>
              <p className="section-kicker" style={{ fontSize: "12px", color: "#a1a1aa", letterSpacing: "0.15em", margin: "0 0 6px 0" }}>
                TRUNG TÂM TÀI KHOẢN
              </p>
              <h1 style={{ fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 800, margin: 0, color: "#fff" }}>
                Xin chào, {user.full_name || user.email}
              </h1>
              <p style={{ fontSize: "14px", color: "#71717a", margin: "6px 0 0 0" }}>
                {user.email} • {user.role === "admin" ? "Quản trị viên (Admin)" : "Khách hàng thân thiết"}
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    fontSize: "13px",
                    fontWeight: 800,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  👑 Mở Trang Quản Trị (Admin) →
                </Link>
              )}
              <button
                onClick={handleLogout}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "transparent",
                  border: "1px solid rgba(239, 68, 68, 0.5)",
                  color: "#f87171",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "background 180ms ease",
                }}
              >
                Đăng xuất
              </button>
            </div>
          </div>

          {/* Grid Layout: Tabs + Content */}
          <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "40px" }} className="profile-layout mobile-stack">
            {/* Sidebar Navigation */}
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <button
                  onClick={() => setActiveTab("info")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "14px 18px",
                    textAlign: "left",
                    backgroundColor: activeTab === "info" ? "#ffffff" : "transparent",
                    color: activeTab === "info" ? "#000000" : "#a1a1aa",
                    fontWeight: 700,
                    fontSize: "14px",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 180ms ease",
                  }}
                >
                  <span>👤</span> Thông tin & Địa chỉ
                </button>

                <button
                  onClick={() => setActiveTab("orders")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "14px 18px",
                    textAlign: "left",
                    backgroundColor: activeTab === "orders" ? "#ffffff" : "transparent",
                    color: activeTab === "orders" ? "#000000" : "#a1a1aa",
                    fontWeight: 700,
                    fontSize: "14px",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 180ms ease",
                  }}
                >
                  <span>📦</span> Đơn mua hàng ({myOrders.length})
                </button>

                <button
                  onClick={() => setActiveTab("rentals")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "14px 18px",
                    textAlign: "left",
                    backgroundColor: activeTab === "rentals" ? "#ffffff" : "transparent",
                    color: activeTab === "rentals" ? "#000000" : "#a1a1aa",
                    fontWeight: 700,
                    fontSize: "14px",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 180ms ease",
                  }}
                >
                  <span>📅</span> Thiết bị thuê ({myRentals.length})
                </button>
              </div>
            </div>

            {/* Main Tab Content */}
            <div>
              {/* Tab 1: Profile Info Form */}
              {activeTab === "info" && (
                <div style={{ backgroundColor: "#111111", border: "1px solid rgba(255,255,255,0.1)", padding: "36px" }}>
                  <h2 style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 24px 0", color: "#fff" }}>
                    Thông tin giao hàng mặc định
                  </h2>

                  {saveSuccess && (
                    <div style={{ padding: "12px 16px", backgroundColor: "rgba(34, 197, 94, 0.15)", border: "1px solid #22c55e", color: "#4ade80", fontSize: "14px", marginBottom: "20px" }}>
                      ✓ Đã lưu thông tin hồ sơ vào cơ sở dữ liệu thành công!
                    </div>
                  )}

                  <form onSubmit={handleSaveProfile}>
                    <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "8px", textTransform: "uppercase" }}>
                          Họ và tên
                        </label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Họ và tên"
                          style={{
                            width: "100%",
                            padding: "12px 14px",
                            backgroundColor: "#000",
                            border: "1px solid #27272a",
                            color: "#fff",
                            fontSize: "14px",
                            outline: "none",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "8px", textTransform: "uppercase" }}>
                          Số điện thoại
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="09xx xxx xxx"
                          style={{
                            width: "100%",
                            padding: "12px 14px",
                            backgroundColor: "#000",
                            border: "1px solid #27272a",
                            color: "#fff",
                            fontSize: "14px",
                            outline: "none",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                    </div>

                    <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "8px", textTransform: "uppercase" }}>
                          Email tài khoản
                        </label>
                        <input
                          type="email"
                          disabled
                          value={user.email}
                          style={{
                            width: "100%",
                            padding: "12px 14px",
                            backgroundColor: "#18181b",
                            border: "1px solid #27272a",
                            color: "#71717a",
                            fontSize: "14px",
                            cursor: "not-allowed",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "8px", textTransform: "uppercase" }}>
                          Tỉnh / Thành phố
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Đà Nẵng"
                          style={{
                            width: "100%",
                            padding: "12px 14px",
                            backgroundColor: "#000",
                            border: "1px solid #27272a",
                            color: "#fff",
                            fontSize: "14px",
                            outline: "none",
                            boxSizing: "border-box",
                          }}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: "28px" }}>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "8px", textTransform: "uppercase" }}>
                        Địa chỉ nhận hàng (Số nhà, Tên đường, Phường/Xã)
                      </label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Số 123 đường Hải Phòng, P. Thạch Thang, Q. Hải Châu"
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          backgroundColor: "#000",
                          border: "1px solid #27272a",
                          color: "#fff",
                          fontSize: "14px",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSaving}
                      style={{
                        padding: "14px 28px",
                        backgroundColor: "#ffffff",
                        color: "#000000",
                        fontWeight: 800,
                        fontSize: "13px",
                        textTransform: "uppercase",
                        border: "none",
                        cursor: isSaving ? "not-allowed" : "pointer",
                      }}
                    >
                      {isSaving ? "Đang lưu..." : "Lưu thông tin hồ sơ"}
                    </button>
                  </form>
                </div>
              )}

              {/* Tab 2: Orders History */}
              {activeTab === "orders" && (
                <div style={{ backgroundColor: "#111111", border: "1px solid rgba(255,255,255,0.1)", padding: "36px" }}>
                  <h2 style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 24px 0", color: "#fff" }}>
                    Lịch sử đơn hàng ({myOrders.length})
                  </h2>

                  {isDataLoading ? (
                    <div style={{ color: "#a1a1aa", padding: "20px 0" }}>Đang tải lịch sử đơn hàng...</div>
                  ) : myOrders.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "40px 20px", backgroundColor: "#0a0a0c", border: "1px solid #27272a" }}>
                      <p style={{ color: "#a1a1aa", fontSize: "15px", marginBottom: "16px" }}>
                        Bạn chưa đặt mua đơn hàng nào tại VanBass.
                      </p>
                      <Link href="/products" className="button button-primary button-sm">
                        Khám phá thiết bị DJ ngay →
                      </Link>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      {myOrders.map((ord) => {
                        const badge = getOrderStatusBadge(ord.status);
                        return (
                          <div
                            key={ord.id}
                            style={{
                              border: "1px solid #27272a",
                              padding: "24px",
                              backgroundColor: "#0a0a0a",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexWrap: "wrap",
                                gap: "12px",
                                marginBottom: "16px",
                                borderBottom: "1px solid #1f1f23",
                                paddingBottom: "14px",
                              }}
                            >
                              <div>
                                <strong style={{ color: "#fff", fontSize: "16px", display: "block" }}>
                                  Đơn hàng #{ord.order_number}
                                </strong>
                                <span style={{ fontSize: "13px", color: "#71717a" }}>
                                  Ngày đặt: {new Date(ord.created_at).toLocaleString("vi-VN")}
                                </span>
                              </div>
                              <span
                                style={{
                                  padding: "6px 12px",
                                  backgroundColor: badge.bg,
                                  color: badge.color,
                                  fontSize: "12px",
                                  fontWeight: 800,
                                  textTransform: "uppercase",
                                  borderRadius: "2px",
                                }}
                              >
                                {badge.label}
                              </span>
                            </div>

                            {/* Order Items */}
                            {ord.items && ord.items.length > 0 ? (
                              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
                                {ord.items.map((it) => (
                                  <div
                                    key={it.id}
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      fontSize: "14px",
                                      color: "#d4d4d8",
                                    }}
                                  >
                                    <span>
                                      {it.quantity} x {it.product_name}
                                    </span>
                                    <strong style={{ color: "#fff" }}>{formatCurrency(it.line_total)}</strong>
                                  </div>
                                ))}
                              </div>
                            ) : null}

                            {/* Total Amount & Address */}
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "baseline",
                                paddingTop: "12px",
                                borderTop: "1px solid rgba(255,255,255,0.06)",
                              }}
                            >
                              <span style={{ fontSize: "13px", color: "#a1a1aa" }}>
                                Giao đến: {ord.shipping_name} ({ord.shipping_phone}) - {ord.shipping_address}
                              </span>
                              <div>
                                <span style={{ fontSize: "12px", color: "#a1a1aa", marginRight: "8px" }}>Tổng thanh toán:</span>
                                <strong style={{ color: "#22c55e", fontSize: "17px", fontWeight: 800 }}>
                                  {formatCurrency(ord.total_amount)}
                                </strong>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Rental History */}
              {activeTab === "rentals" && (
                <div style={{ backgroundColor: "#111111", border: "1px solid rgba(255,255,255,0.1)", padding: "36px" }}>
                  <h2 style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 24px 0", color: "#fff" }}>
                    Thiết bị & Hợp đồng đang thuê ({myRentals.length})
                  </h2>

                  {isDataLoading ? (
                    <div style={{ color: "#a1a1aa", padding: "20px 0" }}>Đang tải hợp đồng thuê thiết bị...</div>
                  ) : myRentals.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "40px 20px", backgroundColor: "#0a0a0c", border: "1px solid #27272a" }}>
                      <p style={{ color: "#a1a1aa", fontSize: "15px", marginBottom: "16px" }}>
                        Bạn chưa có yêu cầu thuê thiết bị nào.
                      </p>
                      <Link href="/rental" className="button button-primary button-sm">
                        Thuê thiết bị biểu diễn ngay →
                      </Link>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      {myRentals.map((rent) => {
                        const badge = getRentalStatusBadge(rent.status);
                        return (
                          <div
                            key={rent.id}
                            style={{
                              border: "1px solid #27272a",
                              padding: "24px",
                              backgroundColor: "#0a0a0a",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexWrap: "wrap",
                                gap: "12px",
                                marginBottom: "16px",
                                borderBottom: "1px solid #1f1f23",
                                paddingBottom: "14px",
                              }}
                            >
                              <div>
                                <strong style={{ color: "#fff", fontSize: "16px", display: "block" }}>
                                  Hợp đồng thuê #{rent.request_number}
                                </strong>
                                <span style={{ fontSize: "13px", color: "#71717a" }}>
                                  Thời gian thuê: {rent.start_date} → {rent.end_date}
                                </span>
                              </div>
                              <span
                                style={{
                                  padding: "6px 12px",
                                  backgroundColor: badge.bg,
                                  color: badge.color,
                                  fontSize: "12px",
                                  fontWeight: 800,
                                  textTransform: "uppercase",
                                  borderRadius: "2px",
                                }}
                              >
                                {badge.label}
                              </span>
                            </div>

                            {/* Rental Items */}
                            {rent.items && rent.items.length > 0 ? (
                              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
                                {rent.items.map((it) => (
                                  <div
                                    key={it.id}
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      fontSize: "14px",
                                      color: "#d4d4d8",
                                    }}
                                  >
                                    <span>
                                      {it.quantity} x {it.product_name} ({it.number_of_days} ngày)
                                    </span>
                                    <strong style={{ color: "#fff" }}>{formatCurrency(it.subtotal)}</strong>
                                  </div>
                                ))}
                              </div>
                            ) : null}

                            {/* Total & Deposit */}
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "baseline",
                                flexWrap: "wrap",
                                gap: "12px",
                                paddingTop: "12px",
                                borderTop: "1px solid rgba(255,255,255,0.06)",
                              }}
                            >
                              <span style={{ fontSize: "13px", color: "#a1a1aa" }}>
                                Địa điểm: {rent.pickup_location}
                              </span>
                              <div style={{ display: "flex", gap: "16px", alignItems: "baseline" }}>
                                <span style={{ fontSize: "13px", color: "#eab308" }}>
                                  Tiền cọc: <strong>{formatCurrency(rent.deposit_amount)}</strong>
                                </span>
                                <span style={{ fontSize: "13px", color: "#a1a1aa" }}>
                                  Tổng tiền thuê:{" "}
                                  <strong style={{ color: "#22c55e", fontSize: "16px" }}>
                                    {formatCurrency(rent.rental_total)}
                                  </strong>
                                </span>
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
