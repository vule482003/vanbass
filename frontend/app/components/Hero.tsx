"use client";

import Link from "next/link";

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

export default function Hero() {
  return (
    <section className="hero-triptych-section" id="hero">
      {/* 1. TOP GLOWING INFINITE MARQUEE TICKER (NIGHTLIFE & BRAND PARTNERS) */}
      <div className="hero-marquee-bar">
        <div className="hero-marquee-track">
          <span className="marquee-item">⚡ PIONEER DJ OFFICIAL DISTRIBUTOR</span>
          <VuMeter />
          <span className="marquee-dot">•</span>
          <span className="marquee-item">ALPHATHETA</span>
          <span className="marquee-dot">•</span>
          <span className="marquee-item">ALLEN &amp; HEATH</span>
          <VuMeter />
          <span className="marquee-dot">•</span>
          <span className="marquee-item">DENON DJ</span>
          <span className="marquee-dot">•</span>
          <span className="marquee-item">🎧 SHOWROOM TEST MÁY ĐÀ NẴNG</span>
          <VuMeter />
          <span className="marquee-dot">•</span>
          <span className="marquee-item">⚡ HỖ TRỢ KỸ THUẬT 24/7</span>
          <span className="marquee-dot">•</span>
          <span className="marquee-item">GIAO HÀNG HỎA TỐC</span>
          <span className="marquee-dot">•</span>
          <span className="marquee-item">🔥 CHO THUÊ THIẾT BỊ SỰ KIỆN 24/7</span>
          <VuMeter />
          <span className="marquee-dot">•</span>

          {/* Seamless Loop duplication */}
          <span className="marquee-item">⚡ PIONEER DJ OFFICIAL DISTRIBUTOR</span>
          <VuMeter />
          <span className="marquee-dot">•</span>
          <span className="marquee-item">ALPHATHETA</span>
          <span className="marquee-dot">•</span>
          <span className="marquee-item">ALLEN &amp; HEATH</span>
          <VuMeter />
          <span className="marquee-dot">•</span>
          <span className="marquee-item">DENON DJ</span>
          <span className="marquee-dot">•</span>
          <span className="marquee-item">🎧 SHOWROOM TEST MÁY ĐÀ NẴNG</span>
          <VuMeter />
          <span className="marquee-dot">•</span>
          <span className="marquee-item">⚡ HỖ TRỢ KỸ THUẬT 24/7</span>
          <span className="marquee-dot">•</span>
          <span className="marquee-item">GIAO HÀNG HỎA TỐC</span>
          <span className="marquee-dot">•</span>
          <span className="marquee-item">🔥 CHO THUÊ THIẾT BỊ SỰ KIỆN 24/7</span>
          <VuMeter />
          <span className="marquee-dot">•</span>
        </div>
      </div>

      {/* 2. 3-COLUMN FULL-BLEED DYNAMIC ACCORDION HERO */}
      <div className="hero-triptych-container">
        {/* KHUNG 1 (BÊN TRÁI): THIẾT BỊ & HARDWARE */}
        <Link href="/products" className="triptych-panel panel-hardware" title="Khám phá thiết bị DJ chính hãng">
          <div className="triptych-bg" style={{ backgroundImage: "url('/images/hero/hero_hardware.jpg')" }} />
          <div className="triptych-overlay" />

          <div className="triptych-content">
            <div className="triptych-tag">01 / HARDWARE &amp; AUDIO</div>
            <h2 className="triptych-title">THIẾT BỊ DJ</h2>
            <p className="triptych-desc">
              Phân phối chính hãng Pioneer DJ, AlphaTheta, Mixer &amp; Loa kiểm âm cao cấp.
            </p>
            <span className="triptych-cta-link">
              Khám phá thiết bị <span>→</span>
            </span>
          </div>
        </Link>

        {/* KHUNG 2 (Ở GIỮA - NỔI BẬT): BIỂU DIỄN & CHO THUÊ SỰ KIỆN */}
        <Link href="/products" className="triptych-panel panel-featured" title="Dịch vụ cho thuê thiết bị DJ biểu diễn sự kiện">
          <div className="triptych-bg" style={{ backgroundImage: "url('/images/hero/hero_performance.jpg')" }} />
          <div className="triptych-overlay featured-overlay" />

          <div className="triptych-content featured-content">
            <div className="triptych-badge">
              <span />
              VANBASS MUSIC CENTER • ĐÀ NẴNG
            </div>
            <h2 className="triptych-headline">
              HỆ THỐNG ÂM THANH &amp; CHO THUÊ DJ
            </h2>
            <p className="triptych-desc">
              Giải pháp thiết bị biểu diễn sân khấu, party, club &amp; sự kiện hàng đầu miền Trung.
            </p>

            <div className="triptych-center-btn">
              <span>THUÊ THIẾT BỊ NGAY</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </div>
        </Link>

        {/* KHUNG 3 (BÊN PHẢI): TRẢI NGHIỆM & SHOWROOM */}
        <Link href="/contact" className="triptych-panel panel-showroom" title="Trải nghiệm thực tế tại Showroom Đà Nẵng">
          <div className="triptych-bg" style={{ backgroundImage: "url('/images/hero/hero_showroom.jpg')" }} />
          <div className="triptych-overlay" />

          <div className="triptych-content">
            <div className="triptych-tag">03 / SHOWROOM &amp; STUDIO</div>
            <h2 className="triptych-title">TRẢI NGHIỆM</h2>
            <p className="triptych-desc">
              Nghe thử âm thanh trực tiếp tại Showroom Đà Nẵng &amp; hỗ trợ kỹ thuật 24/7.
            </p>
            <span className="triptych-cta-link">
              Ghé thăm showroom <span>→</span>
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}