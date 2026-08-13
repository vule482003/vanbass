import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />

        <div className="container hero-grid">
          <div className="hero-content">
            <p className="eyebrow">
              DJ & AUDIO EQUIPMENT
            </p>

            <h1>
              Thiết bị DJ.
              <br />
              <span>Âm thanh.</span>
              <br />
              Trải nghiệm.
            </h1>

            <p className="hero-description">
              Khám phá thiết bị DJ và âm thanh chuyên nghiệp tại Đà Nẵng.
              Từ hệ thống DJ, mixer, loa đến phụ kiện và giải pháp cho sự kiện.
            </p>

            <div className="hero-actions">
              <Link href="/products" className="button button-primary">
                Khám phá sản phẩm
                <span>→</span>
              </Link>

              <Link href="/rental" className="button button-secondary">
                Dịch vụ cho thuê
              </Link>
            </div>

            <div className="hero-meta">
              <div>
                <strong>DJ</strong>
                <span>Equipment</span>
              </div>
              <div>
                <strong>AUDIO</strong>
                <span>Solutions</span>
              </div>
              <div>
                <strong>ĐÀ NẴNG</strong>
                <span>Vietnam</span>
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

            <div className="hero-label hero-label-one">
              <span>01</span>
              DJ EQUIPMENT
            </div>

            <div className="hero-label hero-label-two">
              <span>02</span>
              PROFESSIONAL AUDIO
            </div>
          </div>
        </div>
      </section>
  );
}