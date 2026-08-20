import Link from "next/link";

export default function LocalCTA() {
  return (
    <section className="local-section" id="contact-cta">
      <div className="container local-content">
        <p className="section-kicker" style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#4ade80", marginBottom: "12px" }}>
          SHOWROOM &amp; TRẢI NGHIỆM THỰC TẾ
        </p>

        <h2 style={{ fontSize: "clamp(32px, 4.2vw, 56px)", fontWeight: 900, letterSpacing: "-0.03em", margin: "0 0 16px 0" }}>
          Trải nghiệm thiết bị DJ
          <br />
          <span style={{ color: "#71717a" }}>ngay tại Showroom Đà Nẵng.</span>
        </h2>

        <p style={{ fontSize: "15px", color: "#a1a1aa", maxWidth: "580px", margin: "0 auto 26px auto", lineHeight: 1.7 }}>
          Ghé thăm không gian trải nghiệm thực tế các dòng máy DJ mới nhất, nhận tư vấn chuyên sâu và giải pháp âm thanh sự kiện tối ưu.
        </p>

        <div className="local-actions" style={{ gap: "14px", marginTop: "0" }}>
          <Link href="/products" className="button button-primary" style={{ background: "#ffffff", color: "#000000" }}>
            Khám phá sản phẩm <span>→</span>
          </Link>

          <Link href="/contact" className="button button-outline" style={{ borderColor: "#3f3f46", color: "#ffffff" }}>
            Liên hệ tư vấn / Showroom
          </Link>
        </div>
      </div>
    </section>
  );
}