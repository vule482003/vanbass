"use client";

import React from "react";
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

  const headlineTop =
    lang === "en"
      ? t.rental.headline_top
      : config.headline_top || "Cần thiết bị DJ";
  const headlineBottom =
    lang === "en"
      ? t.rental.headline_bottom
      : config.headline_bottom || "cho sự kiện?";
  const desc =
    lang === "en"
      ? t.rental.desc
      : config.desc ||
        "Sẵn sàng giao máy, lắp đặt tận nơi và hỗ trợ kỹ thuật sound-man 24/7 tại Đà Nẵng, Hội An và khu vực miền Trung.";
  const buttonText =
    lang === "en"
      ? t.rental.button_text
      : config.button_text || "Xem bảng giá & danh mục thiết bị";

  return (
    <section className="rental-section reveal-on-scroll" id="rental">
      <div className="container">
        {/* Header - Full Page Natural Flow */}
        <div className="rental-header">
          <h2 className="rental-title">
            <span
              data-cms-key="rental.headline_top"
              data-cms-label="Tiêu Đề Trên Cho Thuê"
              data-cms-type="text"
            >
              {headlineTop}
            </span>{" "}
            <span
              data-cms-key="rental.headline_bottom"
              data-cms-label="Tiêu Đề Nổi Bật Cho Thuê"
              data-cms-type="text"
            >
              {headlineBottom}
            </span>
          </h2>

          <p
            className="rental-subtitle"
            data-cms-key="rental.desc"
            data-cms-label="Mô Tả Cho Thuê"
            data-cms-type="textarea"
          >
            {desc}
          </p>
        </div>

        {/* Full-width Panoramic Stage Visual */}
        <div className="rental-visual-banner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={config.stage_image || "/images/rental/rental_stage_setup.jpg"}
            alt="Hệ thống âm thanh & bàn DJ cho thuê VanBass"
            className="rental-banner-image"
            data-cms-key="rental.stage_image"
            data-cms-label="Ảnh sân khấu thuê bàn DJ"
            data-cms-type="image"
          />
          <div className="rental-banner-gradient" />
        </div>

        {/* 3 Technical Spec Columns with + Crosshairs */}
        <div className="rental-specs-container">
          <div className="rental-spec-item">
            <h3
              className="spec-label"
              data-cms-key="rental.spec_setup_label"
              data-cms-label="Nhãn Spec 1 (Thời gian Setup)"
              data-cms-type="text"
            >
              {lang === "en" ? "SETUP SPEED" : (config.spec_setup_label || "THỜI GIAN SETUP")}
            </h3>
            <p
              className="spec-value"
              data-cms-key="rental.spec_setup_value"
              data-cms-label="Giá trị Spec 1 (Thời gian Setup)"
              data-cms-type="text"
            >
              {lang === "en" ? "Delivery & setup within 2 hours" : (config.spec_setup_value || "Giao và lắp đặt trong 2 giờ")}
            </p>
          </div>

          <div className="spec-crosshair" aria-hidden="true">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <line x1="12" y1="3" x2="12" y2="21" />
              <line x1="3" y1="12" x2="21" y2="12" />
            </svg>
          </div>

          <div className="rental-spec-item">
            <h3
              className="spec-label"
              data-cms-key="rental.spec_equipment_label"
              data-cms-label="Nhãn Spec 2 (Thiết bị)"
              data-cms-type="text"
            >
              {lang === "en" ? "EQUIPMENT" : (config.spec_equipment_label || "THIẾT BỊ")}
            </h3>
            <p
              className="spec-value"
              data-cms-key="rental.spec_equipment_value"
              data-cms-label="Giá trị Spec 2 (Thiết bị)"
              data-cms-type="text"
            >
              {lang === "en" ? "100% Genuine Pioneer DJ" : (config.spec_equipment_value || "100% Pioneer DJ nguyên bản")}
            </p>
          </div>

          <div className="spec-crosshair" aria-hidden="true">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <line x1="12" y1="3" x2="12" y2="21" />
              <line x1="3" y1="12" x2="21" y2="12" />
            </svg>
          </div>

          <div className="rental-spec-item">
            <h3
              className="spec-label"
              data-cms-key="rental.spec_support_label"
              data-cms-label="Nhãn Spec 3 (Hỗ trợ)"
              data-cms-type="text"
            >
              {lang === "en" ? "SUPPORT" : (config.spec_support_label || "HỖ TRỢ")}
            </h3>
            <p
              className="spec-value"
              data-cms-key="rental.spec_support_value"
              data-cms-label="Giá trị Spec 3 (Hỗ trợ)"
              data-cms-type="text"
            >
              {lang === "en" ? "24/7 on-site sound engineer" : (config.spec_support_value || "Kỹ thuật viên sound-man 24/7")}
            </p>
          </div>
        </div>

        {/* Bottom CTA Action Link */}
        <div className="rental-cta-row">
          <Link
            href={
              !config.button_link ||
              config.button_link === "/products" ||
              config.button_link.startsWith("/rental") ||
              config.button_link === "/products?mode=rental"
                ? "/thue-ban-dj"
                : config.button_link
            }
            className="rental-link-action"
            data-cms-key="rental.button_text"
            data-cms-label="Chữ Nút Cho Thuê"
            data-cms-type="text"
          >
            <span>{buttonText}</span>
            <span>→</span>
          </Link>
        </div>
      </div>

      {/* Scoped Full-Page Styling */}
      <style jsx>{`
        .rental-section {
          padding: 80px 0 95px 0;
          position: relative;
          background: #09090b;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .rental-header {
          margin-bottom: 34px;
        }


        .rental-title {
          font-family: var(--font-montserrat), "Montserrat", -apple-system,
            BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
          font-size: clamp(30px, 3.8vw, 46px);
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.2;
          color: #ffffff;
          margin: 0 0 14px 0;
          text-transform: none;
        }

        .rental-subtitle {
          font-size: 15.5px;
          color: #a1a1aa;
          margin: 0;
          line-height: 1.65;
          max-width: 680px;
          font-weight: 400;
        }

        /* Full-Width Panoramic Stage Banner */
        .rental-visual-banner {
          position: relative;
          width: 100%;
          aspect-ratio: 21 / 8.5;
          min-height: 260px;
          max-height: 440px;
          border-radius: 14px;
          overflow: hidden;
          margin-bottom: 38px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6);
        }

        .rental-banner-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 38%;
          display: block;
        }

        .rental-banner-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(9, 9, 11, 0.7) 0%,
            rgba(9, 9, 11, 0.1) 40%,
            rgba(9, 9, 11, 0) 70%
          );
          pointer-events: none;
        }


        /* 3 Tech Spec Columns */
        .rental-specs-container {
          display: grid;
          grid-template-columns: 1fr auto 1fr auto 1fr;
          align-items: center;
          padding: 10px 0 28px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .rental-spec-item {
          padding: 0 14px;
        }

        .rental-spec-item:first-child {
          padding-left: 0;
        }

        .spec-label {
          font-family: var(--font-montserrat), "Montserrat", -apple-system,
            BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
          font-size: clamp(15px, 1.4vw, 17px);
          font-weight: 700;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          color: #ffffff;
          margin: 0 0 6px 0;
        }

        .spec-value {
          font-family: var(--font-montserrat), "Montserrat", -apple-system,
            BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #a1a1aa;
          line-height: 1.5;
          margin: 0;
        }

        .spec-crosshair {
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.22);
          padding: 0 16px;
        }

        /* Bottom Action Link */
        .rental-cta-row {
          display: flex;
          justify-content: flex-end;
          padding-top: 24px;
        }

        .rental-link-action {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-montserrat), "Montserrat", -apple-system,
            BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #a1a1aa;
          text-decoration: none;
          letter-spacing: 0.03em;
          transition: color 0.2s ease;
        }

        .rental-link-action:hover {
          color: #ffffff;
        }

        .rental-link-action span:last-child {
          color: #22c55e;
          font-size: 16px;
          transition: transform 0.2s ease;
        }

        .rental-link-action:hover span:last-child {
          transform: translateX(5px);
        }

        /* Mobile / Tablet Responsive */
        @media (max-width: 860px) {
          .rental-section {
            padding: 55px 0 65px 0;
          }
          .rental-visual-banner {
            aspect-ratio: 16 / 9;
            min-height: 200px;
            margin-bottom: 24px;
          }
          .rental-specs-container {
            grid-template-columns: 1fr;
            gap: 20px;
            padding-bottom: 22px;
          }
          .spec-crosshair {
            display: none;
          }
          .rental-spec-item {
            padding: 0;
          }
          .rental-cta-row {
            justify-content: flex-start;
          }
        }
      `}</style>
    </section>
  );
}