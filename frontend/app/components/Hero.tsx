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
}

export default function Hero({
  marqueeItems = DEFAULT_HOME_DATA.marquee_items,
  heroLeft = DEFAULT_HOME_DATA.hero_left,
  heroCenter = DEFAULT_HOME_DATA.hero_center,
  heroRight = DEFAULT_HOME_DATA.hero_right,
  showMarquee = true,
  showHero = true,
}: HeroProps) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
  const apiBase = apiUrl.replace(/\/api$/, "");

  const resolveImage = (imgUrl: string) => {
    if (!imgUrl) return "";
    if (imgUrl.startsWith("http") || imgUrl.startsWith("/") || imgUrl.startsWith("blob:") || imgUrl.startsWith("data:")) return imgUrl;
    return `${apiBase}/${imgUrl.replace(/^\//, "")}`;
  };

  const leftBg = resolveImage(heroLeft.bg_image);
  const centerBg = resolveImage(heroCenter.bg_image);
  const rightBg = resolveImage(heroRight.bg_image);

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
          <Link href={heroLeft.link || "/products"} className="triptych-panel panel-hardware" title={heroLeft.title || "Thiết bị DJ"}>
            <div className="triptych-bg" style={{ backgroundImage: `url('${leftBg}')` }} />
            <div className="triptych-overlay" />

            <div className="triptych-content">
              <div className="triptych-tag">{heroLeft.tag}</div>
              <h2 className="triptych-title">{heroLeft.title}</h2>
              <p className="triptych-desc">{heroLeft.desc}</p>
              <span className="triptych-cta-link">
                {heroLeft.button_text || "Khám phá thiết bị"} <span>→</span>
              </span>
            </div>
          </Link>

          {/* KHUNG 2 (Ở GIỮA - NỔI BẬT): BIỂU DIỄN & CHO THUÊ SỰ KIỆN */}
          <Link href={heroCenter.link || "/products"} className="triptych-panel panel-featured" title={heroCenter.headline || "Cho thuê DJ"}>
            <div className="triptych-bg" style={{ backgroundImage: `url('${centerBg}')` }} />
            <div className="triptych-overlay featured-overlay" />

            <div className="triptych-content featured-content">
              <div className="triptych-badge">
                <span />
                {heroCenter.badge || "THIẾT BỊ DJ CHÍNH HÃNG"}
              </div>
              <h2 className="triptych-headline">{heroCenter.headline}</h2>
              <p className="triptych-desc">{heroCenter.desc}</p>

              <div className="triptych-center-btn">
                <span>{heroCenter.button_text || "THUÊ THIẾT BỊ NGAY"}</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </div>
          </Link>

          {/* KHUNG 3 (BÊN PHẢI): TRẢI NGHIỆM & SHOWROOM */}
          <Link href={heroRight.link || "/contact"} className="triptych-panel panel-showroom" title={heroRight.title || "Trải nghiệm Showroom"}>
            <div className="triptych-bg" style={{ backgroundImage: `url('${rightBg}')` }} />
            <div className="triptych-overlay" />

            <div className="triptych-content">
              <div className="triptych-tag">{heroRight.tag}</div>
              <h2 className="triptych-title">{heroRight.title}</h2>
              <p className="triptych-desc">{heroRight.desc}</p>
              <span className="triptych-cta-link">
                {heroRight.button_text || "Ghé thăm showroom"} <span>→</span>
              </span>
            </div>
          </Link>
        </div>
      )}
    </section>
  );
}