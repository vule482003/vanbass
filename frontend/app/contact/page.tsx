"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      alert("Vui lòng điền đầy đủ họ tên, số điện thoại và nội dung cần tư vấn.");
      return;
    }
    setSent(true);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <main style={{ flex: 1, paddingTop: "120px", paddingBottom: "100px" }}>
        <div className="container">
          <div style={{ marginBottom: "48px" }}>
            <p className="section-kicker">KẾT NỐI VỚI CHÚNG TÔI</p>
            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                margin: "0 0 16px 0",
              }}
            >
              Liên hệ VanBass Music Center
            </h1>
            <p style={{ color: "#a1a1aa", maxWidth: "600px", margin: 0, fontSize: "16px" }}>
              Chúng tôi luôn sẵn sàng lắng nghe và tư vấn giải pháp thiết bị DJ, âm thanh biểu diễn và dịch vụ thuê máy tốt nhất cho bạn.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "48px",
              alignItems: "start",
            }}
          >
            {/* Info Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ padding: "28px", backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
                  📍 Showroom & Trung tâm kỹ thuật
                </h3>
                <p style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
                  Thành phố Đà Nẵng, Việt Nam
                  <br />
                  <span style={{ color: "#71717a", fontSize: "13px" }}>Mở cửa: 08:30 - 21:00 (Thứ 2 - Chủ Nhật)</span>
                </p>
              </div>

              <div style={{ padding: "28px", backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
                  📞 Hotline tư vấn & Đặt thuê thiết bị
                </h3>
                <p style={{ margin: "0 0 6px 0" }}>
                  <a
                    href="tel:0706067799"
                    style={{ fontSize: "20px", fontWeight: 800, color: "#22c55e", textDecoration: "none" }}
                  >
                    0706 067 799
                  </a>
                </p>
                <span style={{ color: "#71717a", fontSize: "13px" }}>Hỗ trợ kỹ thuật 24/7 cho các sự kiện</span>
              </div>

              <div style={{ padding: "28px", backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
                  ✉️ Email hợp tác & Báo giá
                </h3>
                <p style={{ color: "#d4d4d8", fontSize: "14px", margin: 0 }}>
                  vanbass.musiccenter@gmail.com
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div style={{ padding: "36px", backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px" }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div style={{ fontSize: "40px", marginBottom: "16px" }}>💌</div>
                  <h3 style={{ fontSize: "20px", color: "#fff", marginBottom: "12px" }}>
                    Cảm ơn bạn đã liên hệ!
                  </h3>
                  <p style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: 1.6 }}>
                    Yêu cầu tư vấn của bạn đã được gửi thành công. Chuyên viên VanBass sẽ gọi điện hỗ trợ bạn trong ít phút.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, margin: 0, color: "#ffffff" }}>
                    Gửi tin nhắn tư vấn
                  </h3>

                  <div>
                    <label style={{ display: "block", fontSize: "12px", color: "#a1a1aa", marginBottom: "6px" }}>
                      Họ và tên:
                    </label>
                    <input
                      type="text"
                      placeholder="Nguyễn Văn A"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        backgroundColor: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        borderRadius: "6px",
                        color: "#fff",
                        fontSize: "13px",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "12px", color: "#a1a1aa", marginBottom: "6px" }}>
                      Số điện thoại liên hệ:
                    </label>
                    <input
                      type="tel"
                      placeholder="0706 067 799"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        backgroundColor: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        borderRadius: "6px",
                        color: "#fff",
                        fontSize: "13px",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "12px", color: "#a1a1aa", marginBottom: "6px" }}>
                      Email (không bắt buộc):
                    </label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        backgroundColor: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        borderRadius: "6px",
                        color: "#fff",
                        fontSize: "13px",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "12px", color: "#a1a1aa", marginBottom: "6px" }}>
                      Nội dung cần hỗ trợ (mua máy, thuê máy, setup âm thanh...):
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Nhập nội dung cần tư vấn..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        backgroundColor: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        borderRadius: "6px",
                        color: "#fff",
                        fontSize: "13px",
                        outline: "none",
                        boxSizing: "border-box",
                        fontFamily: "inherit",
                      }}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="button button-primary"
                    style={{ width: "100%", justifyContent: "center", cursor: "pointer" }}
                  >
                    Gửi tin nhắn ngay
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
