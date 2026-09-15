"use client";

import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../lib/language-context";

export default function AboutPage() {
  const { t, lang } = useLanguage();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#09090b",
        color: "#f4f4f5",
        fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
      }}
    >
      <Header />

      <main style={{ flex: 1 }}>
        {/* =========================================================================
            SECTION 1: HERO SECTION - LUXURY EDITORIAL & ACOUSTIC STUDIO
           ========================================================================= */}
        <section
          style={{
            position: "relative",
            minHeight: "85vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "140px 0 90px 0",
            overflow: "hidden",
          }}
        >
          {/* Background Studio Photography with Dark Cinematic Gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url('/images/about/studio_hero.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center 40%",
              filter: "brightness(0.38) contrast(1.1)",
              transform: "scale(1.03)",
              zIndex: 0,
            }}
          />

          {/* Luxury Gradient Vignette Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 50% 30%, rgba(9, 9, 11, 0.4) 0%, rgba(9, 9, 11, 0.88) 70%, #09090b 100%)",
              zIndex: 1,
            }}
          />

          <div
            className="container"
            style={{
              position: "relative",
              zIndex: 2,
              textAlign: "center",
              maxWidth: "960px",
              margin: "0 auto",
            }}
          >
            {/* Minimalist Architectural Kicker Tag */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "6px 20px",
                borderRadius: "999px",
                backgroundColor: "rgba(18, 18, 24, 0.7)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(12px)",
                color: "#4ade80",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                marginBottom: "28px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                  boxShadow: "0 0 8px #22c55e",
                }}
              />
              VANBASS MUSIC CENTER • {t.about.kicker}
            </div>

            {/* Main Headline - Architectural High-Contrast Typography */}
            <h1
              style={{
                fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                fontSize: "clamp(34px, 5.2vw, 64px)",
                fontWeight: 900,
                letterSpacing: "-0.035em",
                lineHeight: 1.15,
                margin: "0 auto 28px auto",
                color: "#ffffff",
                maxWidth: "900px",
              }}
            >
              {t.about.title}
            </h1>

            {/* Lead Narrative Description */}
            <p
              style={{
                fontSize: "clamp(16px, 2vw, 19px)",
                color: "#d4d4d8",
                lineHeight: 1.8,
                maxWidth: "780px",
                margin: "0 auto 36px auto",
                fontWeight: 400,
              }}
            >
              {t.about.desc}
            </p>

            {/* CTA Discover Pill */}
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
              <a
                href="#studio-gallery"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "13px 28px",
                  borderRadius: "999px",
                  backgroundColor: "rgba(34, 197, 94, 0.14)",
                  border: "1px solid rgba(34, 197, 94, 0.4)",
                  backdropFilter: "blur(10px)",
                  color: "#4ade80",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  transition: "all 0.2s ease",
                  boxShadow: "0 0 20px rgba(34, 197, 94, 0.18)",
                }}
              >
                <span>{lang === "en" ? "Explore Studio & Showroom" : "Khám Phá Không Gian Studio"}</span>
                <span style={{ fontSize: "16px" }}>↓</span>
              </a>

              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "13px 26px",
                  borderRadius: "999px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  backdropFilter: "blur(10px)",
                  color: "#f4f4f5",
                  fontSize: "14px",
                  fontWeight: 600,
                  transition: "all 0.2s ease",
                }}
              >
                <span>{t.about.ctaBtn}</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </section>


        {/* =========================================================================
            SECTION 2: VISUAL GALLERY & ACOUSTIC STUDIO SHOWCASE
           ========================================================================= */}
        <section
          id="studio-gallery"
          style={{
            padding: "85px 0 95px 0",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            backgroundColor: "#0d0d11",
          }}
        >
          <div className="container">
            {/* Top Minimalist Metadata Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexWrap: "wrap",
                gap: "20px",
                marginBottom: "40px",
                paddingBottom: "20px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <div>
                <span
                  style={{
                    color: "#22c55e",
                    fontSize: "12px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  ACOUSTIC SHOWROOM & AUDITION LAB
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                    fontSize: "clamp(24px, 3.2vw, 36px)",
                    fontWeight: 800,
                    color: "#ffffff",
                    letterSpacing: "-0.025em",
                    margin: 0,
                  }}
                >
                  {lang === "en" ? "Where Acoustic Engineering Meets Art" : "Nơi Kỹ Thuật Âm Học Gặp Gỡ Nghệ Thuật"}
                </h2>
              </div>

              <span style={{ fontSize: "13px", color: "#71717a", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                ĐÀ NẴNG • VIỆT NAM
              </span>
            </div>

            {/* Asymmetric 2-Column Luxury Editorial Showcase */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "32px",
                alignItems: "stretch",
              }}
            >
              {/* Left Column: Atmospheric Studio & Da Nang Night View */}
              <div
                style={{
                  position: "relative",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  minHeight: "440px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "36px",
                }}
              >
                {/* Background Image */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "url('/images/about/studio_hero.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    zIndex: 0,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(9, 9, 11, 0.95) 0%, rgba(9, 9, 11, 0.2) 60%)",
                    zIndex: 1,
                  }}
                />
                <div style={{ position: "relative", zIndex: 2 }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      borderRadius: "999px",
                      backgroundColor: "rgba(34, 197, 94, 0.16)",
                      border: "1px solid rgba(34, 197, 94, 0.35)",
                      color: "#4ade80",
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: "12px",
                    }}
                  >
                    SHOWROOM & AUDITION BOOTH
                  </span>
                  <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#ffffff", margin: "0 0 8px 0" }}>
                    {lang === "en" ? "Private Audition Environment" : "Phòng Nghe & Test Máy Tiêu Âm Chuẩn"}
                  </h3>
                  <p style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
                    {lang === "en"
                      ? "Experience high-fidelity Pioneer DJ flagship gear in a dedicated acoustic wooden studio environment."
                      : "Trải nghiệm thực tế các dòng máy DJ đầu bảng của Pioneer DJ trong không gian tiêu âm gỗ ấm áp, chuyên nghiệp."}
                  </p>
                </div>
              </div>

              {/* Right Column: Macro Hardware Precision Detail */}
              <div
                style={{
                  position: "relative",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  minHeight: "440px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "36px",
                }}
              >
                {/* Background Image */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "url('/images/about/hardware_detail.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    zIndex: 0,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(9, 9, 11, 0.95) 0%, rgba(9, 9, 11, 0.2) 60%)",
                    zIndex: 1,
                  }}
                />
                <div style={{ position: "relative", zIndex: 2 }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      borderRadius: "999px",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.18)",
                      color: "#f4f4f5",
                      fontSize: "11px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: "12px",
                    }}
                  >
                    FLAGSHIP HARDWARE
                  </span>
                  <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#ffffff", margin: "0 0 8px 0" }}>
                    {lang === "en" ? "Precision in Every Jogwheel" : "Độ Chuẩn Xác Trên Từng Nốt Fader"}
                  </h3>
                  <p style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
                    {lang === "en"
                      ? "100% genuine Pioneer DJ and AlphaTheta gear, tuned to studio perfection for performers and sound engineers."
                      : "100% thiết bị chính hãng Pioneer DJ & AlphaTheta, bảo dưỡng định kỳ với tiêu chuẩn khắt khe nhất."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* =========================================================================
            SECTION 3: 3 TRỤ CỘT CỐT LÕI (EDITORIAL SWISS-STYLE TYPOGRAPHY)
           ========================================================================= */}
        <section
          style={{
            padding: "95px 0 100px 0",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            backgroundColor: "#09090b",
          }}
        >
          <div className="container">
            {/* Section Header */}
            <div style={{ maxWidth: "720px", marginBottom: "60px" }}>
              <span
                style={{
                  color: "#22c55e",
                  fontSize: "12px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  display: "inline-block",
                  marginBottom: "8px",
                }}
              >
                {lang === "en" ? "CORE PILLARS OF EXCELLENCE" : "3 TRỤ CỘT NỀN TẢNG"}
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                  fontSize: "clamp(26px, 3.8vw, 42px)",
                  fontWeight: 900,
                  color: "#ffffff",
                  letterSpacing: "-0.03em",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {lang === "en"
                  ? "Engineering Excellence for Modern Sound & Performance"
                  : "Định Hình Chuẩn Mực Thiết Bị & Trải Nghiệm Âm Nhạc"}
              </h2>
            </div>

            {/* 3 Pillars - Borderless Editorial Grid with Hairline Dividers */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "40px",
              }}
            >
              {/* PILLAR 1 */}
              <div
                style={{
                  position: "relative",
                  paddingTop: "24px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.12)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 800,
                    color: "#22c55e",
                    letterSpacing: "0.12em",
                    marginBottom: "16px",
                    display: "block",
                  }}
                >
                  01 / HARDWARE
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                    fontSize: "21px",
                    fontWeight: 800,
                    color: "#ffffff",
                    marginBottom: "14px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t.about.pillar1Title}
                </h3>
                <p
                  style={{
                    color: "#a1a1aa",
                    fontSize: "14.5px",
                    lineHeight: 1.75,
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {t.about.pillar1Desc}
                </p>
              </div>

              {/* PILLAR 2 */}
              <div
                style={{
                  position: "relative",
                  paddingTop: "24px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.12)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 800,
                    color: "#22c55e",
                    letterSpacing: "0.12em",
                    marginBottom: "16px",
                    display: "block",
                  }}
                >
                  02 / LIVE SOUND
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                    fontSize: "21px",
                    fontWeight: 800,
                    color: "#ffffff",
                    marginBottom: "14px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t.about.pillar2Title}
                </h3>
                <p
                  style={{
                    color: "#a1a1aa",
                    fontSize: "14.5px",
                    lineHeight: 1.75,
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {t.about.pillar2Desc}
                </p>
              </div>

              {/* PILLAR 3 */}
              <div
                style={{
                  position: "relative",
                  paddingTop: "24px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.12)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 800,
                    color: "#22c55e",
                    letterSpacing: "0.12em",
                    marginBottom: "16px",
                    display: "block",
                  }}
                >
                  03 / RENTAL & PRODUCTION
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                    fontSize: "21px",
                    fontWeight: 800,
                    color: "#ffffff",
                    marginBottom: "14px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t.about.pillar3Title}
                </h3>
                <p
                  style={{
                    color: "#a1a1aa",
                    fontSize: "14.5px",
                    lineHeight: 1.75,
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {t.about.pillar3Desc}
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* =========================================================================
            SECTION 4: BRAND PHILOSOPHY & STORYTELLING (PHÁT TRIỂN CHIỀU SÂU)
           ========================================================================= */}
        <section
          style={{
            padding: "90px 0",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            backgroundColor: "#0c0c10",
          }}
        >
          <div className="container" style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "50px",
                alignItems: "center",
              }}
            >
              {/* Left Column: Big Philosophy Quote */}
              <div>
                <span
                  style={{
                    color: "#22c55e",
                    fontSize: "12px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    display: "block",
                    marginBottom: "12px",
                  }}
                >
                  {lang === "en" ? "OUR PHILOSOPHY" : "TRIẾT LÝ HOẠT ĐỘNG"}
                </span>
                <blockquote
                  style={{
                    fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                    fontSize: "clamp(24px, 3.2vw, 36px)",
                    fontWeight: 800,
                    lineHeight: 1.3,
                    color: "#ffffff",
                    letterSpacing: "-0.025em",
                    margin: "0 0 20px 0",
                    borderLeft: "3px solid #22c55e",
                    paddingLeft: "24px",
                  }}
                >
                  {lang === "en"
                    ? "“Great music is born from artists, but shaped to perfection through uncompromising hardware.”"
                    : "“Âm nhạc đỉnh cao bắt nguồn từ cảm xúc nghệ sĩ, nhưng được hoàn thiện trọn vẹn nhờ phần cứng chuẩn xác.”"}
                </blockquote>
              </div>

              {/* Right Column: Expanded Brand Narrative */}
              <div style={{ display: "flex", flexDirection: "column", gap: "18px", color: "#a1a1aa", fontSize: "15px", lineHeight: 1.8 }}>
                <p style={{ margin: 0 }}>
                  {lang === "en"
                    ? "Founded in Da Nang — the thriving coastal hub of nightlife, luxury hospitality, and music culture — VanBass Music Center was created to bridge the gap between world-class audio gear and Central Vietnam's creative community."
                    : "Được thành lập tại Đà Nẵng — tâm điểm phát triển sôi động của các lễ hội âm nhạc, resort cao cấp và văn hóa nightlife miền Trung — VanBass Music Center ra đời nhằm mang những chuẩn mực âm thanh biểu diễn quốc tế đến gần hơn với cộng đồng nghệ sĩ và doanh nghiệp giải trí."}
                </p>
                <p style={{ margin: 0 }}>
                  {lang === "en"
                    ? "Every Pioneer DJ console, stage audio line array, and studio monitor distributed by VanBass is meticulously inspected and calibrated by seasoned sound engineers, ensuring flawless operation across any performance venue."
                    : "Mỗi dàn máy Pioneer DJ, hệ thống loa biểu diễn sân khấu hay thiết bị phòng thu do VanBass cung cấp đều được kiểm tra, cân chỉnh kỹ thuật cẩn thận bởi đội ngũ am hiểu chuyên sâu, sẵn sàng phục vụ mọi show diễn và dự án âm thanh khắt khe nhất."}
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* =========================================================================
            SECTION 5: SHOWROOM EXPERIENCE CTA (NÂNG TẦM KHÔNG GIAN SHOWROOM ĐÀ NẴNG)
           ========================================================================= */}
        <section style={{ padding: "85px 0 100px 0", backgroundColor: "#09090b" }}>
          <div className="container" style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div
              style={{
                position: "relative",
                padding: "50px 44px",
                backgroundColor: "rgba(18, 18, 24, 0.75)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(34, 197, 94, 0.35)",
                borderRadius: "20px",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "36px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.5), 0 0 30px rgba(34, 197, 94, 0.1)",
                overflow: "hidden",
              }}
            >
              {/* Ambient Glow in Corner */}
              <div
                style={{
                  position: "absolute",
                  top: "-50px",
                  right: "-50px",
                  width: "250px",
                  height: "250px",
                  background: "radial-gradient(circle, rgba(34, 197, 94, 0.18) 0%, transparent 70%)",
                  pointerEvents: "none",
                  filter: "blur(40px)",
                }}
              />

              <div style={{ maxWidth: "600px", position: "relative", zIndex: 1 }}>
                <p
                  className="section-kicker"
                  style={{
                    color: "#22c55e",
                    fontSize: "12px",
                    fontWeight: 800,
                    letterSpacing: "0.14em",
                    marginBottom: "10px",
                  }}
                >
                  {t.about.ctaKicker}
                </p>

                <h2
                  style={{
                    fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                    fontSize: "clamp(24px, 3.2vw, 34px)",
                    fontWeight: 900,
                    margin: "0 0 12px 0",
                    color: "#ffffff",
                    letterSpacing: "-0.025em",
                  }}
                >
                  {t.about.ctaTitle}
                </h2>

                <p style={{ color: "#a1a1aa", margin: "0 0 20px 0", fontSize: "15px", lineHeight: 1.7 }}>
                  {t.about.ctaDesc}
                </p>

                {/* Practical Showroom Details */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", fontSize: "13px", color: "#d4d4d8" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#22c55e" }}>📍</span>
                    <span>Thành phố Đà Nẵng, Việt Nam</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#22c55e" }}>⏰</span>
                    <span>08:30 - 21:00 (Thứ 2 - Chủ Nhật)</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#22c55e" }}>📞</span>
                    <span>Hotline: 0706.067.799</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", minWidth: "220px", position: "relative", zIndex: 1 }}>
                <Link
                  href="/contact"
                  className="button button-primary"
                  style={{
                    textAlign: "center",
                    padding: "14px 28px",
                    borderRadius: "999px",
                    fontWeight: 800,
                    fontSize: "14px",
                    boxShadow: "0 0 20px rgba(34, 197, 94, 0.4)",
                  }}
                >
                  {t.about.ctaBtn} <span>→</span>
                </Link>

                <a
                  href="https://m.me/vanbassmusiccenter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-secondary"
                  style={{
                    textAlign: "center",
                    padding: "12px 24px",
                    borderRadius: "999px",
                    fontWeight: 600,
                    fontSize: "13.5px",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#f4f4f5",
                  }}
                >
                  Chat Messenger 💬
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
