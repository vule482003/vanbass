"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../lib/auth-context";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    if (password.length < 8) {
      setErrorMsg("Mật khẩu phải có độ dài tối thiểu 8 ký tự.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Mật khẩu xác nhận không trùng khớp.");
      return;
    }

    setErrorMsg("");
    setIsLoading(true);

    try {
      const res = await register(email, password, fullName);
      if (res.success) {
        router.push("/profile");
      } else {
        setErrorMsg(res.error || "Đăng ký không thành công. Email có thể đã tồn tại.");
      }
    } catch {
      setErrorMsg("Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#090909" }}>
      <Header />

      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "140px 16px 80px 16px" }}>
        <div
          style={{
            width: "100%",
            maxWidth: "460px",
            backgroundColor: "var(--surface, #121212)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
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
              }}
            >
              VB
            </div>
            <h1 style={{ fontSize: "26px", fontWeight: 800, margin: "0 0 8px 0", color: "#fff", letterSpacing: "-0.03em" }}>
              Tạo tài khoản VanBass
            </h1>
            <p style={{ fontSize: "14px", color: "#a1a1aa", margin: 0 }}>
              Đăng ký để tích điểm mua hàng và nhận ưu đãi thuê máy
            </p>
          </div>

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
            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#d4d4d8", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Họ và tên
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nguyễn Văn A"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  backgroundColor: "#0d0d0d",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#fff",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "18px" }}>
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
                  backgroundColor: "#0d0d0d",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#fff",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "18px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#d4d4d8", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Mật khẩu (Tối thiểu 8 ký tự)
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  backgroundColor: "#0d0d0d",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#fff",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "26px" }}>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#d4d4d8", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  backgroundColor: "#0d0d0d",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#fff",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "16px",
                backgroundColor: "#f5f5f0",
                color: "#0a0a0a",
                border: "none",
                fontSize: "14px",
                fontWeight: 800,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.7 : 1,
                transition: "background 180ms ease",
              }}
            >
              {isLoading ? "Đang tạo tài khoản..." : "Đăng ký thành viên"}
            </button>
          </form>

          {/* Footer Navigation */}
          <div style={{ textAlign: "center", marginTop: "28px", paddingTop: "20px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "14px", color: "#a1a1aa" }}>
            Đã có tài khoản?{" "}
            <Link href="/login" style={{ color: "#fff", fontWeight: 700, textDecoration: "underline" }}>
              Đăng nhập tại đây
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
