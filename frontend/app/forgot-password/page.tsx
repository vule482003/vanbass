"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../lib/auth-context";
import { useLanguage } from "../lib/language-context";

function ForgotPasswordForm() {
  const router = useRouter();
  const { requestPasswordReset, confirmPasswordReset } = useAuth();
  const { t } = useLanguage();

  const [step, setStep] = useState<"EMAIL" | "OTP" | "SUCCESS">("EMAIL");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  // Cooldown countdown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Handle Step 1: Request OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg("Vui lòng nhập địa chỉ email tài khoản của bạn.");
      return;
    }

    setErrorMsg("");
    setInfoMsg("");
    setIsLoading(true);

    try {
      const res = await requestPasswordReset(email.trim());
      if (res.success) {
        setStep("OTP");
        setInfoMsg(res.message || "Mã xác thực 6 số đã được gửi tới email của bạn.");
        setResendCooldown(60);
      } else {
        setErrorMsg(res.error || "Không thể gửi mã xác thực. Vui lòng thử lại.");
      }
    } catch {
      setErrorMsg("Lỗi kết nối máy chủ. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Resend OTP
  const handleResendOtp = async () => {
    if (resendCooldown > 0 || isLoading) return;
    setErrorMsg("");
    setIsLoading(true);

    try {
      const res = await requestPasswordReset(email.trim());
      if (res.success) {
        setInfoMsg("Đã gửi lại mã xác thực mới vào email của bạn.");
        setResendCooldown(60);
      } else {
        setErrorMsg(res.error || "Gửi lại mã không thành công.");
      }
    } catch {
      setErrorMsg("Lỗi kết nối máy chủ. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Step 2: Confirm OTP & Set New Password
  const handleConfirmReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const cleanOtp = otp.trim().replace(/\D/g, "");
    if (cleanOtp.length !== 6) {
      setErrorMsg("Mã OTP phải bao gồm đúng 6 chữ số.");
      return;
    }

    if (!newPassword || newPassword.length < 8) {
      setErrorMsg(t.auth.passwordShort || "Mật khẩu phải có độ dài tối thiểu 8 ký tự.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg(t.auth.passwordMismatch || "Mật khẩu xác nhận không trùng khớp.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await confirmPasswordReset(email.trim(), cleanOtp, newPassword);
      if (res.success) {
        setStep("SUCCESS");
      } else {
        setErrorMsg(res.error || "Mã xác thực không chính xác hoặc đã hết hạn.");
      }
    } catch {
      setErrorMsg("Lỗi kết nối máy chủ. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "460px",
        backgroundColor: "var(--surface, #121212)",
        border: "1px solid var(--border)",
        borderRadius: "14px",
        padding: "40px 32px",
        boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6)",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 800, margin: "0 0 10px 0", color: "#fff", letterSpacing: "-0.03em" }}>
          {step === "SUCCESS" ? t.auth.resetSuccessTitle || "Đổi Mật Khẩu Thành Công!" : t.auth.forgotPasswordTitle || "Quên Mật Khẩu"}
        </h1>
        <p style={{ fontSize: "14px", color: "#a1a1aa", margin: 0, lineHeight: 1.6 }}>
          {step === "EMAIL" && (t.auth.forgotPasswordSubtitle || "Nhập email tài khoản của bạn để nhận mã OTP 6 số đặt lại mật khẩu")}
          {step === "OTP" && `Mã xác thực đã được gửi tới ${email}. Vui lòng nhập mã và mật khẩu mới bên dưới.`}
          {step === "SUCCESS" && (t.auth.resetSuccessDesc || "Mật khẩu của bạn đã được cập nhật thành công. Bạn có thể đăng nhập ngay bây giờ.")}
        </p>
      </div>

      {/* Error Alert */}
      {errorMsg && (
        <div
          style={{
            backgroundColor: "rgba(239, 68, 68, 0.12)",
            border: "1px solid #ef4444",
            color: "#fca5a5",
            padding: "12px 16px",
            fontSize: "13px",
            marginBottom: "20px",
            borderRadius: "6px",
            lineHeight: 1.5,
          }}
        >
          {errorMsg}
        </div>
      )}

      {/* Info Notice */}
      {infoMsg && !errorMsg && step === "OTP" && (
        <div
          style={{
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            border: "1px solid rgba(34, 197, 94, 0.4)",
            color: "#86efac",
            padding: "12px 16px",
            fontSize: "13px",
            marginBottom: "20px",
            borderRadius: "6px",
            lineHeight: 1.5,
          }}
        >
          {infoMsg}
        </div>
      )}

      {/* STEP 1: ENTER EMAIL */}
      {step === "EMAIL" && (
        <form onSubmit={handleRequestOtp}>
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#d4d4d8", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {t.auth.emailLabel || "Địa chỉ Email của bạn"}
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
                border: "1px solid rgba(255, 255, 255, 0.14)",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
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
            {isLoading ? t.auth.sendingOtp || "Đang gửi mã..." : t.auth.sendOtpBtn || "Gửi Mã Xác Thực OTP"}
          </button>
        </form>
      )}

      {/* STEP 2: ENTER OTP & NEW PASSWORD */}
      {step === "OTP" && (
        <form onSubmit={handleConfirmReset}>
          {/* OTP Input */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <label style={{ fontSize: "13px", fontWeight: 700, color: "#d4d4d8", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>
                {t.auth.otpLabel || "Mã xác thực OTP (6 số)"}
              </label>
              {resendCooldown > 0 ? (
                <span style={{ fontSize: "12px", color: "#a1a1aa" }}>
                  {t.auth.resendOtpWait || "Gửi lại sau"} {resendCooldown}s
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#22c55e",
                    fontSize: "12.5px",
                    fontWeight: 700,
                    cursor: "pointer",
                    padding: 0,
                    textDecoration: "underline",
                  }}
                >
                  {t.auth.resendOtpBtn || "Gửi lại mã"}
                </button>
              )}
            </div>
            <input
              type="text"
              required
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="123456"
              style={{
                width: "100%",
                padding: "14px 16px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "2px solid rgba(34, 197, 94, 0.5)",
                borderRadius: "8px",
                color: "#4ade80",
                fontSize: "22px",
                fontWeight: 900,
                letterSpacing: "8px",
                textAlign: "center",
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "monospace",
              }}
            />
          </div>

          {/* New Password */}
          <div style={{ marginBottom: "18px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#d4d4d8", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {t.auth.newPasswordLabel || "Mật khẩu mới (Tối thiểu 8 ký tự)"}
            </label>
            <div style={{ position: "relative", width: "100%" }}>
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "14px 44px 14px 16px",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.14)",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
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
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" y1="2" x2="22" y2="22" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm New Password */}
          <div style={{ marginBottom: "26px" }}>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#d4d4d8", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {t.auth.confirmNewPasswordLabel || "Xác nhận mật khẩu mới"}
            </label>
            <input
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "14px 16px",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.14)",
                borderRadius: "8px",
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
            {isLoading ? t.auth.resettingPassword || "Đang đổi mật khẩu..." : t.auth.resetPasswordBtn || "Xác Nhận & Đổi Mật Khẩu"}
          </button>
        </form>
      )}

      {/* STEP 3: SUCCESS */}
      {step === "SUCCESS" && (
        <div style={{ textAlign: "center", padding: "10px 0" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              backgroundColor: "rgba(34, 197, 94, 0.15)",
              border: "2px solid #22c55e",
              borderRadius: "50%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              color: "#22c55e",
              marginBottom: "24px",
            }}
          >
            ✓
          </div>
          <button
            onClick={() => router.push("/login")}
            className="button button-primary"
            style={{
              width: "100%",
              padding: "15px",
              fontSize: "14px",
              fontWeight: 800,
              letterSpacing: "0.06em",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            {t.auth.loginBtn || "Đăng Nhập Ngay"}
          </button>
        </div>
      )}

      {/* Back to Login Footer */}
      <div style={{ textAlign: "center", marginTop: "28px", paddingTop: "20px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "14px" }}>
        <Link
          href="/login"
          style={{ color: "#a1a1aa", fontWeight: 600, textDecoration: "none", transition: "color 150ms ease" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#a1a1aa")}
        >
          {t.auth.backToLogin || "Quay lại Đăng nhập"}
        </Link>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  const { t } = useLanguage();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#090909" }}>
      <Header />

      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "140px 16px 80px 16px" }}>
        <Suspense fallback={<div style={{ color: "#fff" }}>{t.common.loading}</div>}>
          <ForgotPasswordForm />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
