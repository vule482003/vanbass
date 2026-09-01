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
          <p className="section-kicker" data-cms-key="intro.kicker" data-cms-label="Tag Phụ Về VanBass" data-cms-type="text">
            {config.kicker || "VỀ CHÚNG TÔI"}
          </p>
          <h2 style={{ fontSize: "clamp(32px, 4.2vw, 54px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.03em", margin: "0 0 20px 0" }}>
            <span data-cms-key="intro.headline_top" data-cms-label="Tiêu Đề Trên Về VanBass" data-cms-type="text">{config.headline_top}</span>
            <br />
            <span style={{ color: "#71717a" }} data-cms-key="intro.headline_bottom" data-cms-label="Tiêu Đề Dưới Về VanBass" data-cms-type="text">{config.headline_bottom}</span>
          </h2>
          <div style={{ display: "flex", gap: "20px", marginTop: "28px", flexWrap: "wrap" }}>
            {(config.stats || []).map((stat, idx) => (
              <div key={idx} style={{ padding: "16px 20px", backgroundColor: "rgba(255, 255, 255, 0.03)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "8px", minWidth: "120px" }}>
                <div style={{ fontSize: "28px", fontWeight: 900, color: "#22c55e", lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "6px" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="intro-copy">
          <p style={{ fontSize: "15.5px", lineHeight: 1.75, color: "#a1a1aa", marginBottom: "28px" }} data-cms-key="intro.desc" data-cms-label="Đoạn Mô Tả Về VanBass" data-cms-type="textarea">
            {config.desc}
          </p>

          <Link href={config.button_link || "/about"} className="button button-primary" data-cms-key="intro.button_text" data-cms-label="Chữ Nút Về VanBass" data-cms-type="text">
            {config.button_text || "Tìm hiểu về VanBass"} <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}