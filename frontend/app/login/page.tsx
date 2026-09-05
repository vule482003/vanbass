"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../lib/auth-context";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");
  const isLoggedOut = searchParams.get("logged_out") === "1";
  const { user, isAuthenticated, isLoading: isAuthLoading, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Auto redirect if already logged in
  useEffect(() => {
    if (!isAuthLoading && isAuthenticated && user) {
      if (user.role === "admin" || user.role === "staff") {
        router.push("/admin");
      } else if (redirectUrl && redirectUrl.startsWith("/") && redirectUrl !== "/login") {
        router.push(redirectUrl);
      } else {
        router.push("/");
      }
    }
  }, [user, isAuthenticated, isAuthLoading, redirectUrl, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Vui lòng điền đầy đủ Email và Mật khẩu.");
      return;
    }
    setErrorMsg("");
    setIsLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        if (res.role === "admin" || res.user?.role === "admin" || res.role === "staff" || res.user?.role === "staff") {
          router.push("/admin");
        } else if (redirectUrl && redirectUrl.startsWith("/") && redirectUrl !== "/login") {
          router.push(redirectUrl);
        } else {
          router.push("/");
        }
      } else {
        setErrorMsg(res.error || "Email hoặc mật khẩu không chính xác.");
      }
    } catch {
      setErrorMsg("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "440px",
        backgroundColor: "var(--surface, #121212)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "40px 32px",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "48px",
            height: "48px",
            backgroundColor: "#fff",
            color: "#000",
            fontWeight: 900,
            fontSize: "18px",
            letterSpacing: "-0.05em",
            marginBottom: "16px",
            borderRadius: "8px",
          }}
        >
          VB
        </div>
        <h1 style={{ fontSize: "26px", fontWeight: 800, margin: "0 0 8px 0", color: "#fff", letterSpacing: "-0.03em" }}>
          Đăng nhập VanBass
        </h1>
        <p style={{ fontSize: "14px", color: "#a1a1aa", margin: 0 }}>
          {redirectUrl
            ? "Vui lòng đăng nhập để tiếp tục mua hàng & thanh toán"
            : "Quản lý đơn hàng và thiết bị DJ cho thuê của bạn"}
        </p>
      </div>

      {/* Logged out notification */}
      {isLoggedOut && !errorMsg && (
        <div
          style={{
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            border: "1px solid rgba(34, 197, 94, 0.4)",
            color: "#86efac",
            padding: "12px 16px",
            fontSize: "13px",
            marginBottom: "24px",
            borderRadius: "2px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>✓</span>
          <span>Bạn đã đăng xuất tài khoản thành công.</span>
        </div>
      )}

      {/* Error message */}
      {errorMsg && (
        <div
          style={{
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            border: "1px solid #ef4444",
            color: "#fca5a5",
            padding: "12px 16px",
            fontSize: "13px",
            marginBottom: "24px",
            borderRadius: "2px",
          }}
        >
          {errorMsg}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#d4d4d8", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            style={{
              width: "100%",
              padding: "14px 16px",
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

        <div style={{ marginBottom: "24px" }}>
          <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#d4d4d8", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Mật khẩu
          </label>
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "14px 44px 14px 16px",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "6px",
                color: "#fff",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "#a1a1aa",
                cursor: "pointer",
                padding: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 150ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#a1a1aa")}
            >
              {showPassword ? (
                /* Eye Off (gạch chéo) */
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                  <line x1="2" y1="2" x2="22" y2="22" />
                </svg>
              ) : (
                /* Eye Open (con mắt) */
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="button button-primary"
          style={{
            width: "100%",
            padding: "15px",
            fontSize: "14px",
            fontWeight: 800,
            letterSpacing: "0.06em",
            justifyContent: "center",
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.7 : 1,
          }}
        >
          {isLoading ? "Đang đăng nhập..." : "Đăng nhập ngay"}
        </button>
      </form>

      {/* Footer Navigation */}
      <div style={{ textAlign: "center", marginTop: "28px", paddingTop: "20px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "14px", color: "#a1a1aa" }}>
        Chưa có tài khoản?{" "}
        <Link
          href={redirectUrl ? `/register?redirect=${encodeURIComponent(redirectUrl)}` : "/register"}
          style={{ color: "#fff", fontWeight: 700, textDecoration: "underline" }}
        >
          Đăng ký ngay
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#090909" }}>
      <Header />

      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "140px 16px 80px 16px" }}>
        <Suspense fallback={<div style={{ color: "#fff" }}>Đang tải...</div>}>
          <LoginForm />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
