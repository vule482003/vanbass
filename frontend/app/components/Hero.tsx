"use client";

import Link from "next/link";
import { DEFAULT_HOME_DATA, HeroPanelCenter, HeroPanelLeft, HeroPanelRight } from "../types/home_config";

function VuMeter() {
  return (
    <span className="vu-meter" aria-hidden="true">
      <span className="vu-bar bar-1" />
      <span className="vu-bar bar-2" />
      <span className="vu-bar bar-3" />
      <span className="vu-bar bar-4" />
    </span>
  );
}

interface HeroProps {
  marqueeItems?: string[];
  heroLeft?: HeroPanelLeft;
  heroCenter?: HeroPanelCenter;
  heroRight?: HeroPanelRight;
  showMarquee?: boolean;
  showHero?: boolean;
  isInsideIframe?: boolean;
}

export default function Hero({
  marqueeItems = DEFAULT_HOME_DATA.marquee_items,
  heroLeft = DEFAULT_HOME_DATA.hero_left,
  heroCenter = DEFAULT_HOME_DATA.hero_center,
  heroRight = DEFAULT_HOME_DATA.hero_right,
  showMarquee = true,
  showHero = true,
  isInsideIframe = false,
}: HeroProps) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
  const apiBase = apiUrl.replace(/\/api$/, "");

  const resolveImage = (imgUrl: string | undefined, defaultFallback: string) => {
    if (!imgUrl || !imgUrl.trim()) return defaultFallback;
    if (imgUrl.startsWith("http:") || imgUrl.startsWith("https:") || imgUrl.startsWith("blob:") || imgUrl.startsWith("data:")) {
      return imgUrl;
    }
    return imgUrl.startsWith("/") ? imgUrl : `/${imgUrl}`;
  };

  const leftBg = resolveImage(heroLeft?.bg_image, "/images/hero/hero_hardware.jpg");
  const centerBg = resolveImage(heroCenter?.bg_image, "/images/hero/hero_performance.jpg");
  const rightBg = resolveImage(heroRight?.bg_image, "/images/hero/hero_showroom.jpg");

  return (
    <section className="hero-triptych-section" id="hero">
      {/* 1. TOP GLOWING INFINITE MARQUEE TICKER (NIGHTLIFE & BRAND PARTNERS) */}
      {showMarquee && marqueeItems.length > 0 && (
        <div className="hero-marquee-bar">
          <div className="hero-marquee-track">
            {marqueeItems.map((item, idx) => (
              <span key={`mq1-${idx}`} style={{ display: "inline-flex", alignItems: "center", gap: "16px" }}>
                <span className="marquee-item">{item}</span>
                {idx % 2 === 0 ? <VuMeter /> : <span className="marquee-dot">•</span>}
              </span>
            ))}

            {/* Seamless Loop duplication */}
            {marqueeItems.map((item, idx) => (
              <span key={`mq2-${idx}`} style={{ display: "inline-flex", alignItems: "center", gap: "16px" }}>
                <span className="marquee-item">{item}</span>
                {idx % 2 === 0 ? <VuMeter /> : <span className="marquee-dot">•</span>}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 2. 3-COLUMN FULL-BLEED DYNAMIC ACCORDION HERO */}
      {showHero && (
        <div className="hero-triptych-container">
          {/* KHUNG 1 (BÊN TRÁI): THIẾT BỊ & HARDWARE */}
          <div className="triptych-panel panel-hardware" style={{ position: "relative", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={leftBg}
              alt="Thiết bị DJ & Hardware"
              className="triptych-bg"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                zIndex: 0,
                pointerEvents: "none",
              }}
            />
            <div className="triptych-overlay" style={{ zIndex: 1, pointerEvents: "none" }} />

            {isInsideIframe && (
              <button
                type="button"
                data-cms-key="hero_left.bg_image"
                data-cms-label="Ảnh Banner Trái"
                data-cms-type="image"
                className="triptych-edit-img-btn"
                title="Bấm để đổi ảnh banner trái"
                style={{
                  position: "absolute",
                  top: "18px",
                  right: "18px",
                  zIndex: 60,
                  padding: "6px 14px",
                  backgroundColor: "rgba(18, 18, 20, 0.88)",
                  backdropFilter: "blur(10px)",
                  border: "1.5px solid #22c55e",
                  color: "#4ade80",
                  fontSize: "12px",
                  fontWeight: 800,
                  borderRadius: "20px",
                  cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.9), 0 0 12px rgba(34, 197, 94, 0.4)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>📷</span>
                <span>Đổi ảnh</span>
              </button>
            )}

            <div className="triptych-content" style={{ zIndex: 2 }}>
              <div className="triptych-tag" data-cms-key="hero_left.tag" data-cms-label="Tag Phụ Banner Trái" data-cms-type="text">{heroLeft.tag}</div>
              <h2 className="triptych-title" data-cms-key="hero_left.title" data-cms-label="Tiêu Đề Banner Trái" data-cms-type="text">{heroLeft.title}</h2>
              <p className="triptych-desc" data-cms-key="hero_left.desc" data-cms-label="Mô Tả Banner Trái" data-cms-type="textarea">{heroLeft.desc}</p>
              <span className="triptych-cta-link" data-cms-key="hero_left.button_text" data-cms-label="Chữ Nút Banner Trái" data-cms-type="text">
                {heroLeft.button_text || "Khám phá thiết bị"} <span>→</span>
              </span>
            </div>
          </div>

          {/* KHUNG 2 (Ở GIỮA - NỔI BẬT): BIỂU DIỄN & CHO THUÊ SỰ KIỆN */}
          <div className="triptych-panel panel-featured" style={{ position: "relative", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={centerBg}
              alt="Hệ thống âm thanh & Cho thuê DJ"
              className="triptych-bg"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                zIndex: 0,
                pointerEvents: "none",
              }}
            />
            <div className="triptych-overlay featured-overlay" style={{ zIndex: 1, pointerEvents: "none" }} />

            {isInsideIframe && (
              <button
                type="button"
                data-cms-key="hero_center.bg_image"
                data-cms-label="Ảnh Banner Chính (DJ Rental)"
                data-cms-type="image"
                className="triptych-edit-img-btn"
                title="Bấm để đổi ảnh banner chính"
                style={{
                  position: "absolute",
                  top: "18px",
                  right: "18px",
                  zIndex: 60,
                  padding: "6px 14px",
                  backgroundColor: "rgba(18, 18, 20, 0.88)",
                  backdropFilter: "blur(10px)",
                  border: "1.5px solid #22c55e",
                  color: "#4ade80",
                  fontSize: "12px",
                  fontWeight: 800,
                  borderRadius: "20px",
                  cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.9), 0 0 12px rgba(34, 197, 94, 0.4)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>📷</span>
                <span>Đổi ảnh</span>
              </button>
            )}

            <div className="triptych-content featured-content" style={{ zIndex: 2 }}>
              <div className="triptych-badge" data-cms-key="hero_center.badge" data-cms-label="Huy Hiệu Banner Chính" data-cms-type="text">
                <span />
                {heroCenter.badge || "THIẾT BỊ DJ CHÍNH HÃNG"}
              </div>
              <h2 className="triptych-headline" data-cms-key="hero_center.headline" data-cms-label="Tiêu Đề Banner Chính" data-cms-type="text">{heroCenter.headline}</h2>
              <p className="triptych-desc" data-cms-key="hero_center.desc" data-cms-label="Mô Tả Banner Chính" data-cms-type="textarea">{heroCenter.desc}</p>

              <div className="triptych-center-btn" data-cms-key="hero_center.button_text" data-cms-label="Nút Nổi Bật Banner Chính" data-cms-type="text">
                <span>{heroCenter.button_text || "THUÊ THIẾT BỊ NGAY"}</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          </div>

          {/* KHUNG 3 (BÊN PHẢI): TRẢI NGHIỆM & SHOWROOM */}
          <div className="triptych-panel panel-showroom" style={{ position: "relative", overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={rightBg}
              alt="Showroom & Studio"
              className="triptych-bg"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                zIndex: 0,
                pointerEvents: "none",
              }}
            />
            <div className="triptych-overlay" style={{ zIndex: 1, pointerEvents: "none" }} />

            {isInsideIframe && (
              <button
                type="button"
                data-cms-key="hero_right.bg_image"
                data-cms-label="Ảnh Banner Phải (Showroom)"
                data-cms-type="image"
                className="triptych-edit-img-btn"
                title="Bấm để đổi ảnh banner phải"
                style={{
                  position: "absolute",
                  top: "18px",
                  right: "18px",
                  zIndex: 60,
                  padding: "6px 14px",
                  backgroundColor: "rgba(18, 18, 20, 0.88)",
                  backdropFilter: "blur(10px)",
                  border: "1.5px solid #22c55e",
                  color: "#4ade80",
                  fontSize: "12px",
                  fontWeight: 800,
                  borderRadius: "20px",
                  cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.9), 0 0 12px rgba(34, 197, 94, 0.4)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>📷</span>
                <span>Đổi ảnh</span>
              </button>
            )}

            <div className="triptych-content">
              <div className="triptych-tag" data-cms-key="hero_right.tag" data-cms-label="Tag Phụ Banner Phải" data-cms-type="text">{heroRight.tag}</div>
              <h2 className="triptych-title" data-cms-key="hero_right.title" data-cms-label="Tiêu Đề Banner Phải" data-cms-type="text">{heroRight.title}</h2>
              <p className="triptych-desc" data-cms-key="hero_right.desc" data-cms-label="Mô Tả Banner Phải" data-cms-type="textarea">{heroRight.desc}</p>
              <span className="triptych-cta-link" data-cms-key="hero_right.button_text" data-cms-label="Chữ Nút Banner Phải" data-cms-type="text">
                {heroRight.button_text || "Ghé thăm showroom"} <span>→</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}