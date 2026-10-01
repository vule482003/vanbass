"use client";

import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../lib/language-context";

export default function AboutPage() {
  const { lang } = useLanguage();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#08090c",
        color: "#f4f4f5",
        fontFamily: "var(--font-primary)",
      }}
    >
      <Header />

      <main style={{ flex: 1 }}>
        {/* =========================================================================
            1. HERO SECTION: FULL-BLEED IMAGE + GRADIENT FADE + TEXT OVER DARK CANVAS
           ========================================================================= */}
        <section className="fullbleed-hero-section">
          {/* Full-Bleed Image Background (Right 62% on Desktop) */}
          <div
            className="fullbleed-hero-image"
            style={{
              backgroundImage: "url('/images/about/studio_hero.jpg')",
            }}
          />

          {/* Deep Dark Multi-Stop Gradient Mask Overlay */}
          <div className="fullbleed-hero-overlay" />

          {/* Subtle Ambient Blue Lighting Glow */}
          <div className="fullbleed-ambient-glow" />

          {/* Content Layer (Left Aligned directly on dark canvas) */}
          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <div className="fullbleed-content-col">
              {/* Eyebrow */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 16px",
                  borderRadius: "999px",
                  backgroundColor: "rgba(22, 131, 255, 0.1)",
                  border: "1px solid rgba(22, 131, 255, 0.25)",
                  color: "#1683FF",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: "24px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "#1683FF",
                    boxShadow: "0 0 8px #1683FF",
                  }}
                />
                VANBASS MUSIC CENTER
              </div>

              {/* Main Headline */}
              <h1
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "clamp(34px, 4.8vw, 56px)",
                  fontWeight: 700,
                  letterSpacing: "-0.035em",
                  lineHeight: 1.15,
                  margin: "0 0 24px 0",
                  color: "#ffffff",
                }}
              >
                {lang === "en" ? (
                  <>
                    About <span style={{ color: "#1683FF" }}>VanBass</span> Music Center
                  </>
                ) : (
                  <>
                    Giới thiệu về <span style={{ color: "#1683FF" }}>VanBass</span> Music Center
                  </>
                )}
              </h1>

              {/* Description */}
              <p
                style={{
                  fontSize: "clamp(15px, 1.8vw, 17px)",
                  color: "#a1a1aa",
                  lineHeight: 1.8,
                  margin: "0 0 36px 0",
                  fontWeight: 400,
                }}
              >
                {lang === "en"
                  ? "Central Vietnam's premier destination for high-end DJ equipment, club audio engineering, and authorized stage rental solutions."
                  : "Trung tâm phân phối thiết bị DJ chính hãng, cung cấp giải pháp âm thanh biểu diễn chuyên nghiệp và cho thuê thiết bị sự kiện hàng đầu tại Đà Nẵng & Miền Trung."}
              </p>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <a
                  href="#showroom"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "13px 28px",
                    borderRadius: "10px",
                    backgroundColor: "#1683FF",
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: 600,
                    textDecoration: "none",
                    boxShadow: "0 4px 20px rgba(22, 131, 255, 0.35)",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span>{lang === "en" ? "Explore Showroom" : "Khám phá Showroom"}</span>
                  <span>↓</span>
                </a>

                <Link
                  href="/products"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "13px 26px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#f4f4f5",
                    fontSize: "14px",
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span>{lang === "en" ? "View Products" : "Xem sản phẩm"}</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. THREE FEATURE CARDS
           ========================================================================= */}
        <section
          style={{
            padding: "90px 0",
            backgroundColor: "#08090c",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div className="container">
            <div style={{ maxWidth: "680px", marginBottom: "50px" }}>
              <span
                style={{
                  color: "#1683FF",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                {lang === "en" ? "CORE COMPETENCIES" : "NĂNG LỰC CỐT LÕI"}
              </span>
              <h2
                style={{
                  fontSize: "clamp(24px, 3.2vw, 36px)",
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "-0.025em",
                  margin: 0,
                }}
              >
                {lang === "en" ? "What VanBass Delivers" : "Giá Trị Khác Biệt Tại VanBass"}
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "24px",
              }}
            >
              {/* Feature 1: Sản phẩm chính hãng */}
              <div
                style={{
                  backgroundColor: "#0d0f15",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "36px 30px",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s ease, border-color 0.2s ease",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(22, 131, 255, 0.1)",
                    border: "1px solid rgba(22, 131, 255, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1683FF",
                    fontWeight: 700,
                    fontSize: "14px",
                    marginBottom: "22px",
                  }}
                >
                  01
                </div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginBottom: "12px",
                    letterSpacing: "-0.015em",
                  }}
                >
                  {lang === "en" ? "100% Genuine Products" : "Sản phẩm chính hãng"}
                </h3>
                <p style={{ color: "#a1a1aa", fontSize: "14.5px", lineHeight: 1.7, margin: 0 }}>
                  {lang === "en"
                    ? "Official authorized distribution of Pioneer DJ, AlphaTheta, Allen & Heath with genuine manufacturer warranty and technical certificate."
                    : "Cam kết 100% thiết bị Pioneer DJ, AlphaTheta, Allen & Heath chính hãng, đầy đủ CO/CQ, tem bảo hành chính thức và hỗ trợ kỹ thuật trọn đời."}
                </p>
              </div>

              {/* Feature 2: Giải pháp âm thanh toàn diện */}
              <div
                style={{
                  backgroundColor: "#0d0f15",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "36px 30px",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s ease, border-color 0.2s ease",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(22, 131, 255, 0.1)",
                    border: "1px solid rgba(22, 131, 255, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1683FF",
                    fontWeight: 700,
                    fontSize: "14px",
                    marginBottom: "22px",
                  }}
                >
                  02
                </div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginBottom: "12px",
                    letterSpacing: "-0.015em",
                  }}
                >
                  {lang === "en" ? "Comprehensive Sound Solutions" : "Giải pháp âm thanh toàn diện"}
                </h3>
                <p style={{ color: "#a1a1aa", fontSize: "14.5px", lineHeight: 1.7, margin: 0 }}>
                  {lang === "en"
                    ? "Expert acoustic consulting, setup, and sound reinforcement system engineering for Clubs, Lounges, Studios, and VIP events."
                    : "Tư vấn thiết kế, thi công tiêu âm và lắp đặt trọn gói hệ thống âm thanh sân khấu, Club, Bar, Lounge cao cấp theo tiêu chuẩn quốc tế."}
                </p>
              </div>

              {/* Feature 3: Cho thuê thiết bị DJ */}
              <div
                style={{
                  backgroundColor: "#0d0f15",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "36px 30px",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s ease, border-color 0.2s ease",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(22, 131, 255, 0.1)",
                    border: "1px solid rgba(22, 131, 255, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#1683FF",
                    fontWeight: 700,
                    fontSize: "14px",
                    marginBottom: "22px",
                  }}
                >
                  03
                </div>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginBottom: "12px",
                    letterSpacing: "-0.015em",
                  }}
                >
                  {lang === "en" ? "Professional DJ Rental" : "Cho thuê thiết bị DJ"}
                </h3>
                <p style={{ color: "#a1a1aa", fontSize: "14.5px", lineHeight: 1.7, margin: 0 }}>
                  {lang === "en"
                    ? "State-of-the-art Pioneer DJ rigs (CDJ-3000, DJM-A9, XDJ-RX3, XDJ-XZ) with prompt delivery and 24/7 technical crew support."
                    : "Cung cấp dàn máy DJ sự kiện đẳng cấp với hệ thống CDJ-3000, DJM-A9, XDJ-RX3, OPUS-QUAD sẵn sàng đáp ứng nhanh mọi show diễn."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. SHOWROOM TRẢI NGHIỆM THỰC TẾ: FULL-BLEED IMAGE + GRADIENT FADE
           ========================================================================= */}
        <section id="showroom" className="fullbleed-showroom-section">
          {/* Full-Bleed Showroom Image across entire right side (No Card Container) */}
          <div
            className="fullbleed-showroom-image"
            style={{
              backgroundImage: "url('/images/hero/hero_showroom.jpg')",
            }}
          />

          {/* Seamless Multi-Layer Gradient Fade to Background */}
          <div className="fullbleed-showroom-overlay" />

          {/* Subtle Ambient Blue Aura Glow */}
          <div className="fullbleed-showroom-glow" />

          {/* Left Content Composition */}
          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <div className="fullbleed-content-col">
              {/* Eyebrow */}
              <span
                style={{
                  color: "#1683FF",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "12px",
                }}
              >
                {lang === "en" ? "HANDS-ON AUDITION SPACE" : "KHÔNG GIAN TRẢI NGHIỆM THỰC TẾ"}
              </span>

              {/* Large Heading */}
              <h2
                style={{
                  fontSize: "clamp(26px, 3.6vw, 42px)",
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.2,
                  margin: "0 0 20px 0",
                }}
              >
                {lang === "en"
                  ? "Showroom Trải Nghiệm Thực Tế Tại Đà Nẵng"
                  : "Showroom Trải Nghiệm Thực Tế"}
              </h2>

              {/* Narrative Description */}
              <p
                style={{
                  color: "#a1a1aa",
                  fontSize: "15px",
                  lineHeight: 1.8,
                  margin: "0 0 26px 0",
                }}
              >
                {lang === "en"
                  ? "At VanBass Music Center, we believe sound must be felt directly. Our acoustic studio showroom allows DJs, producers, and audio engineers to test and audition hardware under professional studio acoustics."
                  : "Tại VanBass, chúng tôi hiểu rằng thiết bị âm thanh cần được trực tiếp trải nghiệm và kiểm chứng. Không gian showroom được xử lý tiêu âm chuyên nghiệp cho phép khách hàng test máy, xoay jogwheel và cảm nhận chất âm chân thực nhất."}
              </p>

              {/* Features with checkmarks */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  marginBottom: "36px",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(22, 131, 255, 0.15)",
                      color: "#1683FF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: 700,
                      marginTop: "2px",
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </div>
                  <span style={{ color: "#d4d4d8", fontSize: "14.5px", lineHeight: 1.6 }}>
                    {lang === "en"
                      ? "Directly experience full Pioneer DJ & AlphaTheta lineup"
                      : "Trực tiếp trải nghiệm các dòng máy Pioneer DJ & AlphaTheta mới nhất"}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(22, 131, 255, 0.15)",
                      color: "#1683FF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: 700,
                      marginTop: "2px",
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </div>
                  <span style={{ color: "#d4d4d8", fontSize: "14.5px", lineHeight: 1.6 }}>
                    {lang === "en"
                      ? "1-on-1 technical advisory by professional sound engineers"
                      : "Tư vấn kỹ thuật 1-1 bởi các kỹ sư âm thanh và DJ nhiều năm kinh nghiệm"}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(22, 131, 255, 0.15)",
                      color: "#1683FF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "11px",
                      fontWeight: 700,
                      marginTop: "2px",
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </div>
                  <span style={{ color: "#d4d4d8", fontSize: "14.5px", lineHeight: 1.6 }}>
                    {lang === "en"
                      ? "Dedicated private testing booth for streaming and auditioning"
                      : "Phòng test máy riêng biệt phục vụ thu âm, livestream và sound check"}
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <Link
                  href="/contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "13px 28px",
                    borderRadius: "10px",
                    backgroundColor: "#1683FF",
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: 600,
                    textDecoration: "none",
                    boxShadow: "0 4px 20px rgba(22, 131, 255, 0.35)",
                  }}
                >
                  <span>{lang === "en" ? "Book a Visit" : "Đặt lịch ghé thăm"}</span>
                  <span>→</span>
                </Link>

                <a
                  href="tel:0706067799"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "13px 22px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#f4f4f5",
                    fontSize: "14px",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  <span>Hotline: 0706.067.799</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. STATISTICS SECTION
           ========================================================================= */}
        <section
          style={{
            padding: "80px 0",
            backgroundColor: "#08090c",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "24px",
              }}
            >
              {/* Stat 1 */}
              <div
                style={{
                  backgroundColor: "#0d0f15",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "32px 24px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(32px, 4vw, 44px)",
                    fontWeight: 700,
                    color: "#1683FF",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                    marginBottom: "8px",
                  }}
                >
                  5+
                </div>
                <div style={{ color: "#a1a1aa", fontSize: "14px", fontWeight: 500 }}>
                  {lang === "en" ? "Years of Experience" : "Năm kinh nghiệm"}
                </div>
              </div>

              {/* Stat 2 */}
              <div
                style={{
                  backgroundColor: "#0d0f15",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "32px 24px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(32px, 4vw, 44px)",
                    fontWeight: 700,
                    color: "#1683FF",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                    marginBottom: "8px",
                  }}
                >
                  10.000+
                </div>
                <div style={{ color: "#a1a1aa", fontSize: "14px", fontWeight: 500 }}>
                  {lang === "en" ? "Trusted Customers" : "Khách hàng tin tưởng"}
                </div>
              </div>

              {/* Stat 3 */}
              <div
                style={{
                  backgroundColor: "#0d0f15",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "32px 24px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(32px, 4vw, 44px)",
                    fontWeight: 700,
                    color: "#1683FF",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                    marginBottom: "8px",
                  }}
                >
                  100%
                </div>
                <div style={{ color: "#a1a1aa", fontSize: "14px", fontWeight: 500 }}>
                  {lang === "en" ? "Genuine Equipment" : "Sản phẩm chính hãng"}
                </div>
              </div>

              {/* Stat 4 */}
              <div
                style={{
                  backgroundColor: "#0d0f15",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "32px 24px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(32px, 4vw, 44px)",
                    fontWeight: 700,
                    color: "#1683FF",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                    marginBottom: "8px",
                  }}
                >
                  24/7
                </div>
                <div style={{ color: "#a1a1aa", fontSize: "14px", fontWeight: 500 }}>
                  {lang === "en" ? "Technical Advisory" : "Hỗ trợ tư vấn"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. BOTTOM CTA: Đồng hành cùng đam mê âm nhạc
           ========================================================================= */}
        <section
          style={{
            padding: "90px 0 100px 0",
            backgroundColor: "#08090c",
          }}
        >
          <div className="container" style={{ maxWidth: "960px", margin: "0 auto" }}>
            <div
              style={{
                position: "relative",
                padding: "60px 48px",
                backgroundColor: "#0d0f15",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "16px",
                textAlign: "center",
                overflow: "hidden",
              }}
            >
              {/* Subtle ambient blue light glow */}
              <div
                style={{
                  position: "absolute",
                  top: "-50%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "400px",
                  height: "260px",
                  background: "radial-gradient(circle, rgba(22, 131, 255, 0.15) 0%, transparent 70%)",
                  pointerEvents: "none",
                  filter: "blur(50px)",
                }}
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                <span
                  style={{
                    color: "#1683FF",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "12px",
                  }}
                >
                  VANBASS MUSIC CENTER
                </span>

                <h2
                  style={{
                    fontSize: "clamp(26px, 3.6vw, 38px)",
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "-0.025em",
                    lineHeight: 1.25,
                    margin: "0 auto 16px auto",
                    maxWidth: "680px",
                  }}
                >
                  {lang === "en"
                    ? "Empowering Your Musical Journey"
                    : "Đồng hành cùng đam mê âm nhạc"}
                </h2>

                <p
                  style={{
                    color: "#a1a1aa",
                    fontSize: "15px",
                    lineHeight: 1.8,
                    maxWidth: "620px",
                    margin: "0 auto 32px auto",
                  }}
                >
                  {lang === "en"
                    ? "Whether you are taking your first steps or performing on festival stages, VanBass is always ready with the finest hardware and dedicated support."
                    : "Dù bạn là người mới bắt đầu hành trình DJ hay nghệ sĩ biểu diễn chuyên nghiệp, VanBass luôn sẵn sàng đồng hành với những thiết bị đỉnh cao và sự tận tâm nhất."}
                </p>

                <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
                  <Link
                    href="/contact"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "13px 30px",
                      borderRadius: "10px",
                      backgroundColor: "#1683FF",
                      color: "#ffffff",
                      fontSize: "14px",
                      fontWeight: 600,
                      textDecoration: "none",
                      boxShadow: "0 4px 20px rgba(22, 131, 255, 0.35)",
                    }}
                  >
                    <span>{lang === "en" ? "Contact Us" : "Liên hệ ngay"}</span>
                    <span>→</span>
                  </Link>

                  <Link
                    href="/ban-dj"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "13px 26px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      color: "#f4f4f5",
                      fontSize: "14px",
                      fontWeight: 500,
                      textDecoration: "none",
                    }}
                  >
                    <span>{lang === "en" ? "Explore DJ Gear" : "Xem bàn DJ"}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Scoped Full-Bleed Composition Styles & Media Queries */}
      <style jsx>{`
        .fullbleed-hero-section {
          position: relative;
          min-height: 82vh;
          display: flex;
          align-items: center;
          padding: 130px 0 90px 0;
          overflow: hidden;
          background-color: #08090c;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .fullbleed-hero-image {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 62%;
          background-size: cover;
          background-position: center 45%;
          filter: brightness(0.75) contrast(1.1);
          z-index: 0;
        }

        .fullbleed-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
              to right,
              #08090c 0%,
              #08090c 35%,
              rgba(8, 9, 12, 0.88) 55%,
              rgba(8, 9, 12, 0.35) 75%,
              rgba(8, 9, 12, 0.2) 100%
            ),
            linear-gradient(to top, #08090c 0%, transparent 25%),
            linear-gradient(to bottom, #08090c 0%, transparent 20%);
          z-index: 1;
        }

        .fullbleed-ambient-glow {
          position: absolute;
          top: 20%;
          right: 25%;
          width: 420px;
          height: 420px;
          background: radial-gradient(circle, rgba(22, 131, 255, 0.12) 0%, transparent 70%);
          pointer-events: none;
          filter: blur(60px);
          z-index: 1;
        }

        .fullbleed-content-col {
          max-width: 620px;
        }

        .fullbleed-showroom-section {
          position: relative;
          min-height: 560px;
          display: flex;
          align-items: center;
          padding: 100px 0;
          background-color: #08090c;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
        }

        .fullbleed-showroom-image {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 60%;
          background-size: cover;
          background-position: center;
          filter: brightness(0.75) contrast(1.1);
          z-index: 0;
        }

        .fullbleed-showroom-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
              to right,
              #08090c 0%,
              #08090c 35%,
              rgba(8, 9, 12, 0.9) 55%,
              rgba(8, 9, 12, 0.3) 78%,
              rgba(8, 9, 12, 0.15) 100%
            ),
            linear-gradient(to top, #08090c 0%, transparent 20%),
            linear-gradient(to bottom, #08090c 0%, transparent 20%);
          z-index: 1;
        }

        .fullbleed-showroom-glow {
          position: absolute;
          top: 30%;
          right: 20%;
          width: 380px;
          height: 380px;
          background: radial-gradient(circle, rgba(22, 131, 255, 0.14) 0%, transparent 65%);
          pointer-events: none;
          filter: blur(50px);
          z-index: 1;
        }

        @media (max-width: 900px) {
          .fullbleed-hero-section,
          .fullbleed-showroom-section {
            min-height: auto;
            padding: 100px 0 60px 0;
          }

          .fullbleed-hero-image,
          .fullbleed-showroom-image {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            opacity: 0.38;
          }

          .fullbleed-hero-overlay,
          .fullbleed-showroom-overlay {
            background: linear-gradient(
              to bottom,
              rgba(8, 9, 12, 0.7) 0%,
              rgba(8, 9, 12, 0.95) 70%,
              #08090c 100%
            );
          }

          .fullbleed-content-col {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
