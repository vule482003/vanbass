import Link from "next/link";

export default function IntroSection() {
  return (
    <section className="intro-section reveal-on-scroll" id="about-intro">
      <div className="container intro-grid">
        <div>
          <p className="section-kicker" style={{ fontSize: "11px", letterSpacing: "0.2em", marginBottom: "12px" }}>
            VANBASS MUSIC CENTER • ĐÀ NẴNG
          </p>
          <h2 style={{ fontSize: "clamp(34px, 4.4vw, 58px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.04em", margin: "0 0 20px 0" }}>
            Thiết bị chuẩn chất.
            <br />
            <span style={{ color: "#71717a" }}>Âm thanh đỉnh cao.</span>
          </h2>
          <div style={{ display: "flex", gap: "28px", marginTop: "24px" }}>
            <div>
              <div style={{ fontSize: "28px", fontWeight: 900, color: "#0b0b0b" }}>100%</div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.08em" }}>Chính Hãng</div>
            </div>
            <div>
              <div style={{ fontSize: "28px", fontWeight: 900, color: "#0b0b0b" }}>24/7</div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.08em" }}>Hỗ Trợ Kỹ Thuật</div>
            </div>
            <div>
              <div style={{ fontSize: "28px", fontWeight: 900, color: "#0b0b0b" }}>#1</div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.08em" }}>Đà Nẵng &amp; Miền Trung</div>
            </div>
          </div>
        </div>

        <div className="intro-copy">
          <p style={{ fontSize: "15.5px", lineHeight: 1.75, color: "#444", marginBottom: "28px" }}>
            VanBass Music Center là điểm đến uy tín hàng đầu tại Đà Nẵng để tìm kiếm, trải nghiệm thực tế và thuê các dòng bàn DJ, mixer, loa biểu diễn và hệ thống âm thanh chuyên nghiệp từ Pioneer DJ, AlphaTheta, Allen &amp; Heath.
          </p>

          <Link href="/about" className="button button-primary" style={{ display: "inline-flex", background: "#0b0b0b", color: "#ffffff" }}>
            Tìm hiểu về VanBass <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}