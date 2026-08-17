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

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout, updateProfile } = useAuth();

  const [activeTab, setActiveTab] = useState<"info" | "orders" | "rentals">("info");

  // Form states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Đà Nẵng");
  const [address, setAddress] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

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

          {/* Grid Layout: Tabs + Content */}
          <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "40px" }} className="profile-layout">
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
                  <span>📦</span> Đơn mua hàng (1)
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
                  <span>📅</span> Thiết bị thuê (1)
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
                      ✓ Đã lưu thông tin hồ sơ thành công!
                    </div>
                  )}

                  <form onSubmit={handleSaveProfile}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
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

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
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
                    Lịch sử đơn hàng
                  </h2>

                  <div style={{ border: "1px solid #27272a", padding: "20px", marginBottom: "16px", backgroundColor: "#0a0a0a" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", marginBottom: "12px", borderBottom: "1px solid #1f1f23", paddingBottom: "12px" }}>
                      <div>
                        <strong style={{ color: "#fff", fontSize: "15px" }}>Đơn hàng #VB-89241</strong>
                        <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#71717a" }}>Ngày đặt: 17/08/2026</p>
                      </div>
                      <span style={{ padding: "4px 10px", backgroundColor: "rgba(34, 197, 94, 0.15)", color: "#4ade80", fontSize: "12px", fontWeight: 700, height: "fit-content" }}>
                        Đang vận chuyển
                      </span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "14px", color: "#d4d4d8" }}>
                      <span>1 x DJ Controller Pioneer DJ DDJ-FLX4-W (White)</span>
                      <strong style={{ color: "#fff" }}>{formatCurrency(12270000)}</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Rental History */}
              {activeTab === "rentals" && (
                <div style={{ backgroundColor: "#111111", border: "1px solid rgba(255,255,255,0.1)", padding: "36px" }}>
                  <h2 style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 24px 0", color: "#fff" }}>
                    Thiết bị đang đặt thuê
                  </h2>

                  <div style={{ border: "1px solid #27272a", padding: "20px", backgroundColor: "#0a0a0a" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", marginBottom: "12px", borderBottom: "1px solid #1f1f23", paddingBottom: "12px" }}>
                      <div>
                        <strong style={{ color: "#fff", fontSize: "15px" }}>Hợp đồng thuê #RENT-1092</strong>
                        <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#71717a" }}>
                          Thời gian: 18/08/2026 → 20/08/2026 (2 ngày)
                        </p>
                      </div>
                      <span style={{ padding: "4px 10px", backgroundColor: "rgba(59, 130, 246, 0.15)", color: "#60a5fa", fontSize: "12px", fontWeight: 700, height: "fit-content" }}>
                        Đã xác nhận cọc
                      </span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "14px", color: "#d4d4d8" }}>
                      <span>1 x Máy DJ AlphaTheta XDJ-AN (2 ngày)</span>
                      <strong style={{ color: "#fff" }}>{formatCurrency(2400000)} (Cọc: {formatCurrency(10000000)})</strong>
                    </div>
                  </div>
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
