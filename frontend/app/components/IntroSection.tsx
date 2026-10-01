"use client";

import Link from "next/link";
import { DEFAULT_HOME_DATA, IntroSectionConfig } from "../types/home_config";
import { useLanguage } from "../lib/language-context";

interface IntroSectionProps {
  config?: IntroSectionConfig;
}

export default function IntroSection({
  config = DEFAULT_HOME_DATA.intro,
}: IntroSectionProps) {
  const { t, lang } = useLanguage();

  const kicker = lang === "en" ? t.intro.kicker : (config.kicker || t.intro.kicker);
  const headlineTop = lang === "en" ? t.intro.headline_top : (config.headline_top || t.intro.headline_top);
  const headlineBottom = lang === "en" ? t.intro.headline_bottom : (config.headline_bottom || t.intro.headline_bottom);
  const desc = lang === "en" ? t.intro.desc : (config.desc || t.intro.desc);
  const buttonText = lang === "en" ? t.intro.button_text : (config.button_text || t.intro.button_text);

  const stats = (config.stats && config.stats.length > 0) ? config.stats : [
    { value: "100%", label: "Chính Hãng" },
    { value: "24/7", label: "Hỗ Trợ Kỹ Thuật" },
    { value: "#1", label: "Đà Nẵng & Miền Trung" },
  ];

  // Clean kicker without leading number
  const rawKicker = kicker ? kicker.replace(/^\s*\d+\s*[-—/.]\s*/, "") : "VANBASS MUSIC CENTER • ĐÀ NẴNG";

  return (
    <section className="intro-section webhound-intro reveal-on-scroll" id="about-intro">
      <div className="webhound-container">
        {/* Minimalist Pure Typography Eyebrow */}
        <div
          className="webhound-kicker-wrap"
          data-cms-key="intro.kicker"
          data-cms-label="Tag Phụ Về VanBass"
          data-cms-type="text"
        >
          <span className="webhound-kicker-text">{rawKicker}</span>
        </div>

        {/* Main Headline (Webhound Serif Elegance) */}
        <h2 className="webhound-headline">
          <span
            data-cms-key="intro.headline_top"
            data-cms-label="Tiêu Đề Trên Về VanBass"
            data-cms-type="text"
          >
            {headlineTop}
          </span>{" "}
          <span
            data-cms-key="intro.headline_bottom"
            data-cms-label="Tiêu Đề Dưới Về VanBass"
            data-cms-type="text"
          >
            {headlineBottom}
          </span>
        </h2>

        {/* Description / Lead paragraph */}
        <p
          className="webhound-desc"
          data-cms-key="intro.desc"
          data-cms-label="Đoạn Mô Tả Về VanBass"
          data-cms-type="textarea"
        >
          {desc}
        </p>

        {/* Stats Segmented Box */}
        <div
          className="webhound-stats-card"
          style={{
            gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))`,
          }}
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="webhound-stat-col">
              <div className="webhound-stat-value">{stat.value}</div>
              <div className="webhound-stat-label">
                {lang === "en" ? (
                  idx === 0 ? (stat.label || t.intro.stat_years) :
                  idx === 1 ? (stat.label || t.intro.stat_clients) :
                  idx === 2 ? (stat.label || t.intro.stat_devices) :
                  (stat.label || t.intro.stat_rating)
                ) : stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Primary CTA Button */}
        <div>
          <Link
            href={config.button_link || "/about"}
            className="webhound-btn-primary"
            data-cms-key="intro.button_text"
            data-cms-label="Chữ Nút Về VanBass"
            data-cms-type="text"
          >
            {buttonText} <span>→</span>
          </Link>
        </div>

        {/* Subtext info below button */}
        <div className="webhound-subtext">
          {lang === "en"
            ? "100% GENUINE GEAR — ON-SITE SETUP — 24/7 TECHNICAL SUPPORT"
            : "CAM KẾT CHÍNH HÃNG 100% — BÀN GIAO TẬN NƠI — HỖ TRỢ KỸ THUẬT 24/7"}
        </div>

        {/* Secondary Dotted Link */}
        <Link href="/rental" className="webhound-secondary-link">
          {lang === "en"
            ? "Explore rental rates & event equipment"
            : "Xem bảng giá dịch vụ cho thuê & thiết bị biểu diễn"}
        </Link>
      </div>
    </section>
  );
}