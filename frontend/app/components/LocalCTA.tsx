import Link from "next/link";
import { DEFAULT_HOME_DATA, LocalCtaConfig } from "../types/home_config";

interface LocalCTAProps {
  config?: LocalCtaConfig;
}

export default function LocalCTA({
  config = DEFAULT_HOME_DATA.local_cta,
}: LocalCTAProps) {
  return (
    <section className="local-section reveal-on-scroll" id="contact-cta">
      <div className="container local-content">
        <p className="section-kicker" data-cms-key="local_cta.kicker" data-cms-label="Tag Phụ Showroom" data-cms-type="text">
          {config.kicker || "SHOWROOM ĐÀ NẴNG"}
        </p>

        <h2 style={{ fontSize: "clamp(32px, 4.2vw, 56px)", fontWeight: 900, letterSpacing: "-0.03em", margin: "0 0 16px 0", color: "#ffffff" }}>
          <span data-cms-key="local_cta.headline_top" data-cms-label="Tiêu Đề Trên Showroom" data-cms-type="text">{config.headline_top}</span>
          <br />
          <span style={{ color: "#71717a" }} data-cms-key="local_cta.headline_bottom" data-cms-label="Tiêu Đề Dưới Showroom" data-cms-type="text">{config.headline_bottom}</span>
        </h2>

        <p style={{ fontSize: "15px", color: "#a1a1aa", maxWidth: "580px", margin: "0 auto 26px auto", lineHeight: 1.7 }} data-cms-key="local_cta.desc" data-cms-label="Đoạn Mô Tả Showroom" data-cms-type="textarea">
          {config.desc}
        </p>

        <div className="local-actions" style={{ gap: "14px", marginTop: "0" }}>
          <Link href={config.primary_btn_link || "/products"} className="button button-primary" data-cms-key="local_cta.primary_btn_text" data-cms-label="Chữ Nút Chính Showroom" data-cms-type="text">
            {config.primary_btn_text || "Khám phá sản phẩm"} <span>→</span>
          </Link>

          <Link href={config.secondary_btn_link || "/contact"} className="button button-outline" data-cms-key="local_cta.secondary_btn_text" data-cms-label="Chữ Nút Phụ Showroom" data-cms-type="text">
            {config.secondary_btn_text || "Liên hệ tư vấn / Showroom"}
          </Link>
        </div>
      </div>
    </section>
  );
}