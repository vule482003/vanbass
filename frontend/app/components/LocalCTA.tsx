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
        <p className="section-kicker" style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#4ade80", marginBottom: "12px" }}>
          {config.kicker}
        </p>

        <h2 style={{ fontSize: "clamp(32px, 4.2vw, 56px)", fontWeight: 900, letterSpacing: "-0.03em", margin: "0 0 16px 0" }}>
          {config.headline_top}
          <br />
          <span style={{ color: "#71717a" }}>{config.headline_bottom}</span>
        </h2>

        <p style={{ fontSize: "15px", color: "#a1a1aa", maxWidth: "580px", margin: "0 auto 26px auto", lineHeight: 1.7 }}>
          {config.desc}
        </p>

        <div className="local-actions" style={{ gap: "14px", marginTop: "0" }}>
          <Link href={config.primary_btn_link || "/products"} className="button button-primary" style={{ background: "#ffffff", color: "#000000" }}>
            {config.primary_btn_text || "Khám phá sản phẩm"} <span>→</span>
          </Link>

          <Link href={config.secondary_btn_link || "/contact"} className="button button-outline" style={{ borderColor: "#3f3f46", color: "#ffffff" }}>
            {config.secondary_btn_text || "Liên hệ tư vấn / Showroom"}
          </Link>
        </div>
      </div>
    </section>
  );
}