"use client";

import Image from "next/image";
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
        backgroundColor: "#09090b",
        color: "#f4f4f5",
        fontFamily: "var(--font-primary)",
      }}
    >
      <Header />

      <main style={{ flex: 1 }}>
        {/* =========================================================================
            1. HERO SECTION: Giới thiệu về VanBass Music Center
           ========================================================================= */}
        <section
          style={{
            position: "relative",
            minHeight: "75vh",
            display: "flex",
            alignItems: "center",
            padding: "130px 0 80px 0",
            overflow: "hidden",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          {/* Background Studio Photography with Dark Cinematic Gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url('/images/about/studio_hero.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center 45%",
              filter: "brightness(0.32) contrast(1.15)",
              transform: "scale(1.02)",
              zIndex: 0,
            }}
          />

          {/* Luxury Gradient Vignette Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 50% 35%, rgba(9, 9, 11, 0.45) 0%, rgba(9, 9, 11, 0.88) 70%, #09090b 100%)",
              zIndex: 1,
            }}
          />

          <div
            className="container"
            style={{
              position: "relative",
              zIndex: 2,
              textAlign: "center",
              maxWidth: "920px",
              margin: "0 auto",
            }}
          >
            {/* Minimalist Architectural Kicker Tag */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 18px",
                borderRadius: "999px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(12px)",
                color: "#e6dec9",
                fontSize: "12px",
                fontWeight: 600,
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
                  backgroundColor: "#e6dec9",
                }}
              />
              VANBASS MUSIC CENTER
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "clamp(32px, 5vw, 58px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.18,
                margin: "0 auto 24px auto",
                color: "#ffffff",
                maxWidth: "880px",
              }}
            >
              {lang === "en"
                ? "About VanBass Music Center"
                : "Giới thiệu về VanBass Music Center"}
            </h1>

            {/* Subtitle / Lead Narrative */}
            <p
              style={{
                fontSize: "clamp(15px, 1.9vw, 18px)",
                color: "#a1a1aa",
                lineHeight: 1.8,
                maxWidth: "760px",
                margin: "0 auto 36px auto",
                fontWeight: 400,
              }}
            >
              {lang === "en"
                ? "Central Vietnam's premier destination for high-end DJ equipment, club audio engineering, and authorized stage rental solutions."
                : "Trung tâm phân phối thiết bị DJ chính hãng, cung cấp giải pháp âm thanh biểu diễn chuyên nghiệp và cho thuê thiết bị sự kiện hàng đầu tại Đà Nẵng & Miền Trung."}
            </p>

            {/* Action Buttons */}
            <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
              <a
                href="#showroom"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "13px 28px",
                  borderRadius: "10px",
                  backgroundColor: "#e6dec9",
                  color: "#09090b",
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  textDecoration: "none",
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
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
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
        </section>

        {/* =========================================================================
            2. THREE FEATURE CARDS
           ========================================================================= */}
        <section
          style={{
            padding: "90px 0",
            backgroundColor: "#09090b",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div className="container">
            <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 50px auto" }}>
              <span
                style={{
                  color: "#e6dec9",
                  fontSize: "12px",
                  fontWeight: 600,
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
                  backgroundColor: "#111114",
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
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(230, 222, 201, 0.1)",
                    border: "1px solid rgba(230, 222, 201, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#e6dec9",
                    fontWeight: 700,
                    fontSize: "15px",
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
                  backgroundColor: "#111114",
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
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(230, 222, 201, 0.1)",
                    border: "1px solid rgba(230, 222, 201, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#e6dec9",
                    fontWeight: 700,
                    fontSize: "15px",
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
                  backgroundColor: "#111114",
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
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(230, 222, 201, 0.1)",
                    border: "1px solid rgba(230, 222, 201, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#e6dec9",
                    fontWeight: 700,
                    fontSize: "15px",
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
            3. SHOWROOM TRẢI NGHIỆM THỰC TẾ (SPLIT LAYOUT)
           ========================================================================= */}
        <section
          id="showroom"
          style={{
            padding: "95px 0",
            backgroundColor: "#0d0e12",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "50px",
                alignItems: "center",
              }}
            >
              {/* Left Column: Text narrative */}
              <div>
                <span
                  style={{
                    color: "#e6dec9",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "12px",
                  }}
                >
                  {lang === "en" ? "HANDS-ON AUDITION SPACE" : "KHÔNG GIAN TRẢI NGHIỆM THỰC TẾ"}
                </span>

                <h2
                  style={{
                    fontSize: "clamp(26px, 3.6vw, 40px)",
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.22,
                    margin: "0 0 20px 0",
                  }}
                >
                  {lang === "en"
                    ? "Showroom Trải Nghiệm Thực Tế Tại Đà Nẵng"
                    : "Showroom Trải Nghiệm Thực Tế"}
                </h2>

                <p style={{ color: "#a1a1aa", fontSize: "15px", lineHeight: 1.8, margin: "0 0 20px 0" }}>
                  {lang === "en"
                    ? "At VanBass Music Center, we believe sound must be felt directly. Our acoustic studio showroom allows DJs, producers, and audio engineers to test and audition hardware under professional studio acoustics."
                    : "Tại VanBass, chúng tôi hiểu rằng thiết bị âm thanh cần được trực tiếp trải nghiệm và kiểm chứng. Không gian showroom được xử lý tiêu âm chuyên nghiệp cho phép khách hàng test máy, xoay jogwheel và cảm nhận chất âm chân thực nhất."}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "30px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(230, 222, 201, 0.15)",
                        color: "#e6dec9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        marginTop: "2px",
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </div>
                    <span style={{ color: "#d4d4d8", fontSize: "14.5px", lineHeight: 1.6 }}>
                      {lang === "en"
                        ? "Test full Pioneer DJ & AlphaTheta flagship lineup freely"
                        : "Trực tiếp trải nghiệm đầy đủ các dòng máy Pioneer DJ & AlphaTheta mới nhất"}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(230, 222, 201, 0.15)",
                        color: "#e6dec9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        marginTop: "2px",
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </div>
                    <span style={{ color: "#d4d4d8", fontSize: "14.5px", lineHeight: 1.6 }}>
                      {lang === "en"
                        ? "1-on-1 technical advisory and workflow setup support"
                        : "Tư vấn kỹ thuật 1-1 bởi các kỹ sư âm thanh và DJ nhiều năm kinh nghiệm"}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(230, 222, 201, 0.15)",
                        color: "#e6dec9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        marginTop: "2px",
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </div>
                    <span style={{ color: "#d4d4d8", fontSize: "14.5px", lineHeight: 1.6 }}>
                      {lang === "en"
                        ? "Dedicated testing booth for live streaming and recording"
                        : "Phòng test máy riêng biệt phục vụ thu âm, livestream và sound check"}
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <Link
                    href="/contact"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 24px",
                      borderRadius: "10px",
                      backgroundColor: "#e6dec9",
                      color: "#09090b",
                      fontSize: "14px",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    <span>{lang === "en" ? "Visit Showroom" : "Đặt lịch ghé thăm"}</span>
                    <span>→</span>
                  </Link>

                  <a
                    href="tel:0706067799"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 22px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
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

              {/* Right Column: Showroom Image */}
              <div
                style={{
                  position: "relative",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  minHeight: "420px",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "url('/images/hero/hero_showroom.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(9,9,11,0.85) 0%, rgba(9,9,11,0.1) 60%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "24px",
                    left: "24px",
                    right: "24px",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      borderRadius: "6px",
                      backgroundColor: "rgba(230, 222, 201, 0.15)",
                      border: "1px solid rgba(230, 222, 201, 0.3)",
                      color: "#e6dec9",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: "6px",
                    }}
                  >
                    ĐÀ NẴNG STUDIO
                  </span>
                  <p style={{ color: "#ffffff", fontSize: "15px", fontWeight: 600, margin: 0 }}>
                    VanBass Music Center — 77 Nguyễn Tất Thành, Đà Nẵng
                  </p>
                </div>
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
            backgroundColor: "#09090b",
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
                  backgroundColor: "#111114",
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
                    color: "#e6dec9",
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
                  backgroundColor: "#111114",
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
                    color: "#e6dec9",
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
                  backgroundColor: "#111114",
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
                    color: "#e6dec9",
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
                  backgroundColor: "#111114",
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
                    color: "#e6dec9",
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
            backgroundColor: "#09090b",
          }}
        >
          <div className="container" style={{ maxWidth: "960px", margin: "0 auto" }}>
            <div
              style={{
                position: "relative",
                padding: "60px 48px",
                backgroundColor: "#111114",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "16px",
                textAlign: "center",
                overflow: "hidden",
              }}
            >
              {/* Subtle ambient light glow */}
              <div
                style={{
                  position: "absolute",
                  top: "-50%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "360px",
                  height: "240px",
                  background: "radial-gradient(circle, rgba(230, 222, 201, 0.12) 0%, transparent 70%)",
                  pointerEvents: "none",
                  filter: "blur(50px)",
                }}
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                <span
                  style={{
                    color: "#e6dec9",
                    fontSize: "12px",
                    fontWeight: 600,
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
                      backgroundColor: "#e6dec9",
                      color: "#09090b",
                      fontSize: "14px",
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "opacity 0.2s ease",
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
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
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
    </div>
  );
}
