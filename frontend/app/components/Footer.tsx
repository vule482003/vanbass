import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="brand" style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
            <span className="brand-mark" style={{ width: "30px", height: "30px", fontSize: "10px" }}>VB</span>
            <span className="brand-text" style={{ fontSize: "14px" }}>
              VANBASS
              <small style={{ fontSize: "6.5px" }}>MUSIC CENTER</small>
            </span>
          </Link>

          <p>
            Thiết bị DJ &amp; Âm thanh chuyên nghiệp
            <br />
            Đà Nẵng, Việt Nam
          </p>
        </div>

        <div className="footer-column">
          <h3>Khám phá</h3>
          <Link href="/products">Sản phẩm</Link>
          <Link href="/rental">Cho thuê</Link>
          <Link href="/about">Về VanBass</Link>
        </div>

        <div className="footer-column">
          <h3>Hỗ trợ</h3>
          <Link href="/contact">Liên hệ</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/policies">Chính sách</Link>
        </div>

        <div className="footer-column">
          <h3>Liên hệ</h3>
          <a href="tel:0706067799" style={{ color: "#22c55e", fontWeight: 700 }}>0706 067 799</a>
          <span>Đà Nẵng, Việt Nam</span>
          <span style={{ fontSize: "10px", color: "#71717a" }}>8:00 - 22:00 Hàng ngày</span>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} VanBass Music Center. All rights reserved.</span>
        <span style={{ color: "#22c55e" }}>PIONEER DJ • ALPHATHETA • ALLEN &amp; HEATH</span>
      </div>
    </footer>
  );
}