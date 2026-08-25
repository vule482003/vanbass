import Link from "next/link";
import { DEFAULT_HOME_DATA, IntroSectionConfig } from "../types/home_config";

interface IntroSectionProps {
  config?: IntroSectionConfig;
}

export default function IntroSection({
  config = DEFAULT_HOME_DATA.intro,
}: IntroSectionProps) {
  return (
    <section className="intro-section reveal-on-scroll" id="about-intro">
      <div className="container intro-grid">
        <div>
          <p className="section-kicker" style={{ fontSize: "11px", letterSpacing: "0.2em", marginBottom: "12px" }}>
            {config.kicker}
          </p>
          <h2 style={{ fontSize: "clamp(34px, 4.4vw, 58px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.04em", margin: "0 0 20px 0" }}>
            {config.headline_top}
            <br />
            <span style={{ color: "#71717a" }}>{config.headline_bottom}</span>
          </h2>
          <div style={{ display: "flex", gap: "28px", marginTop: "24px", flexWrap: "wrap" }}>
            {(config.stats || []).map((stat, idx) => (
              <div key={idx}>
                <div style={{ fontSize: "28px", fontWeight: 900, color: "#0b0b0b" }}>{stat.value}</div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.08em" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="intro-copy">
          <p style={{ fontSize: "15.5px", lineHeight: 1.75, color: "#444", marginBottom: "28px" }}>
            {config.desc}
          </p>

          <Link href={config.button_link || "/about"} className="button button-primary" style={{ display: "inline-flex", background: "#0b0b0b", color: "#ffffff" }}>
            {config.button_text || "Tìm hiểu về VanBass"} <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}