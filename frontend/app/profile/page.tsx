"use client";

import { startTransition, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../lib/auth-context";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout, updateProfile } = useAuth();

  // Form states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Đà Nẵng");
  const [address, setAddress] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login?redirect=/profile");
    }
    if (user) {
      startTransition(() => {
        setFullName(user.full_name || "");
        setPhone(user.phone || "");
        setCity(user.city || "Đà Nẵng");
        setAddress(user.address || "");
      });
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
              marginBottom: "36px",
            }}
          >
            <div>
              <span className="section-kicker">HỒ SƠ THÀNH VIÊN</span>
              <h1
                style={{
                  fontSize: "clamp(24px, 3.5vw, 36px)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  margin: "4px 0 0 0",
                  color: "#fff",
                }}
              >
                Xin chào, {user.full_name || user.email.split("@")[0]}
              </h1>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              {(user.role === "admin" || user.role === "staff") && (
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
                    borderRadius: "6px",
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
                  borderRadius: "6px",
                  transition: "background 180ms ease",
                }}
              >
                Đăng xuất
              </button>
            </div>
          </div>

          {/* Grid Layout: Sidebar + Content */}
          <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "36px" }} className="profile-layout mobile-stack">
            {/* Sidebar Navigation */}
            <div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "14px 18px",
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    fontWeight: 700,
                    fontSize: "14px",
                    borderRadius: "4px",
                  }}
                >
                  <span>👤</span> Thông tin &amp; Địa chỉ
                </div>
                <Link
                  href="/cart"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "14px 18px",
                    backgroundColor: "transparent",
                    color: "#a1a1aa",
                    fontWeight: 700,
                    fontSize: "14px",
                    textDecoration: "none",
                    borderRadius: "4px",
                    transition: "all 180ms ease",
                  }}
                >
                  <span>🛒</span> Giỏ hàng
                </Link>
                
              </div>
            </div>

            {/* Main Content: PROFILE INFO FORM */}
            <div>
              <div style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "32px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 24px 0", color: "#fff" }}>
                  Thông tin giao hàng mặc định
                </h2>

                {saveSuccess && (
                  <div style={{ padding: "12px 16px", backgroundColor: "rgba(34, 197, 94, 0.15)", border: "1px solid #22c55e", color: "#4ade80", fontSize: "14px", marginBottom: "20px", borderRadius: "6px" }}>
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
                            backgroundColor: "rgba(255, 255, 255, 0.04)",
                            border: "1px solid rgba(255, 255, 255, 0.12)",
                            borderRadius: "6px",
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
                            backgroundColor: "rgba(255, 255, 255, 0.04)",
                            border: "1px solid rgba(255, 255, 255, 0.12)",
                            borderRadius: "6px",
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
                            backgroundColor: "rgba(255, 255, 255, 0.02)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            borderRadius: "6px",
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
                            backgroundColor: "rgba(255, 255, 255, 0.04)",
                            border: "1px solid rgba(255, 255, 255, 0.12)",
                            borderRadius: "6px",
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
                        placeholder="VD: 123 Nguyễn Văn Linh, Phường Nam Dương, Quận Hải Châu"
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          backgroundColor: "rgba(255, 255, 255, 0.04)",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          borderRadius: "6px",
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
                      className="button button-primary"
                      style={{
                        padding: "13px 28px",
                        fontSize: "13px",
                        cursor: isSaving ? "not-allowed" : "pointer",
                      }}
                    >
                      {isSaving ? "Đang lưu..." : "Lưu thông tin hồ sơ"}
                    </button>
                  </form>
                </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
