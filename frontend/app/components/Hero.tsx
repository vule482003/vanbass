import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-glow hero-glow-one" />
      <div className="hero-glow hero-glow-two" />

      <div className="container hero-grid">
        <div className="hero-content">
          <p className="eyebrow" style={{ fontSize: "13px", fontWeight: 700, color: "#d4d4d8", letterSpacing: "0.15em", marginBottom: "16px" }}>
            DJ & AUDIO EQUIPMENT • ĐÀ NẴNG
          </p>

          <h1 style={{ letterSpacing: "-0.04em", lineHeight: 1.05 }}>
            Thiết bị DJ.
            <br />
            <span style={{ color: "#71717a" }}>Âm thanh.</span>
            <br />
            Trải nghiệm.
          </h1>

          <p className="hero-description" style={{ fontSize: "17px", lineHeight: 1.7, color: "#d4d4d8", maxWidth: "560px", margin: "28px 0 36px 0" }}>
            Trung tâm phân phối và cho thuê thiết bị DJ, DJ Controller, Mixer, CDJ, Loa sân khấu chính hãng từ Pioneer DJ, AlphaTheta, JBL tại Đà Nẵng.
          </p>

          <div className="hero-actions" style={{ gap: "16px" }}>
            <Link href="/products" className="button button-primary" style={{ fontSize: "14px", fontWeight: 700, padding: "0 28px", minHeight: "54px" }}>
              Khám phá sản phẩm
              <span style={{ fontSize: "16px" }}>→</span>
            </Link>

            <Link href="/rental" className="button button-secondary" style={{ fontSize: "14px", fontWeight: 700, padding: "0 28px", minHeight: "54px" }}>
              Dịch vụ cho thuê
            </Link>
          </div>

          <div className="hero-meta" style={{ marginTop: "48px", paddingTop: "28px", borderTop: "1px solid rgba(255, 255, 255, 0.12)" }}>
            <div>
              <strong style={{ fontSize: "16px", color: "#ffffff", letterSpacing: "0.05em" }}>DJ SYSTEM</strong>
              <span style={{ fontSize: "13px", color: "#a1a1aa" }}>Chính hãng 100%</span>
            </div>
            <div>
              <strong style={{ fontSize: "16px", color: "#ffffff", letterSpacing: "0.05em" }}>CHO THUÊ</strong>
              <span style={{ fontSize: "13px", color: "#a1a1aa" }}>Theo ngày & sự kiện</span>
            </div>
            <div>
              <strong style={{ fontSize: "16px", color: "#ffffff", letterSpacing: "0.05em" }}>SHOWROOM</strong>
              <span style={{ fontSize: "13px", color: "#a1a1aa" }}>Đà Nẵng, Việt Nam</span>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-circle hero-circle-large" />
          <div className="hero-circle hero-circle-small" />

          <div className="hero-equipment">
            <div className="equipment-top">
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className="equipment-display">
              <div className="display-line" />
              <div className="display-line short" />
            </div>

            <div className="equipment-controls">
              <div className="jog-wheel" />
              <div className="faders">
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className="jog-wheel" />
            </div>

            <div className="equipment-bottom">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}