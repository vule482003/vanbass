"use client";

import Link from "next/link";
import { DEFAULT_HOME_DATA, RentalSectionConfig } from "../types/home_config";
import { useLanguage } from "../lib/language-context";

interface RentalSectionProps {
  config?: RentalSectionConfig;
}

export default function RentalSection({
  config = DEFAULT_HOME_DATA.rental,
}: RentalSectionProps) {
  const { t, lang } = useLanguage();

  const kicker = lang === "en" ? t.rental.kicker : (config.kicker || t.rental.kicker);
  const headlineTop = lang === "en" ? t.rental.headline_top : (config.headline_top || t.rental.headline_top);
  const headlineBottom = lang === "en" ? t.rental.headline_bottom : (config.headline_bottom || t.rental.headline_bottom);
  const desc = lang === "en" ? t.rental.desc : (config.desc || t.rental.desc);
  const buttonText = lang === "en" ? t.rental.button_text : (config.button_text || t.rental.button_text);
  const features = lang === "en" ? t.rental.features : (config.features && config.features.length > 0 ? config.features : t.rental.features);

  return (
    <section className="rental-section reveal-on-scroll" id="rental">
      <div className="container rental-grid">
        <div className="rental-visual">
          <div className="rental-grid-pattern" />

          <div className="rental-card-main">
            <span>VANBASS RENTAL</span>
            <strong>
              DJ
              <br />
              RENTAL
            </strong>
            <small>ĐÀ NẴNG / VIETNAM</small>
          </div>

          <div className="rental-card-small">
            <span>AVAILABLE</span>
            <strong>DJ</strong>
            <small>EQUIPMENT</small>
          </div>
        </div>

        <div className="rental-content">
          <p className="section-kicker" data-cms-key="rental.kicker" data-cms-label="Tag Kicker Cho Thuê" data-cms-type="text">{kicker}</p>

          <h2>
            <span data-cms-key="rental.headline_top" data-cms-label="Tiêu Đề Trên Cho Thuê" data-cms-type="text">{headlineTop}</span>
            <br />
            <span data-cms-key="rental.headline_bottom" data-cms-label="Tiêu Đề Nổi Bật Cho Thuê" data-cms-type="text">{headlineBottom}</span>
          </h2>

          <p data-cms-key="rental.desc" data-cms-label="Mô Tả Cho Thuê" data-cms-type="textarea">{desc}</p>

          <ul className="check-list">
            {features.map((feature, idx) => (
              <li key={idx}>
                <span>✓</span>
                {feature}
              </li>
            ))}
          </ul>

          <Link
            href={
              !config.button_link || config.button_link === "/products" || config.button_link.startsWith("/rental") || config.button_link === "/products?mode=rental"
                ? "/thue-ban-dj"
                : config.button_link
            }
            className="button button-primary"
            style={{ alignSelf: "flex-start" }}
            data-cms-key="rental.button_text"
            data-cms-label="Chữ Nút Cho Thuê"
            data-cms-type="text"
          >
            {buttonText}
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}