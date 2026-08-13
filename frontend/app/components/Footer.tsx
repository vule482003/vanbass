import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <Link href="/" className="brand">
              <span className="brand-mark">VB</span>
              <span className="brand-text">
                VANBASS
                <small>MUSIC CENTER</small>
              </span>
            </Link>

            <p>
              DJ equipment & audio solutions
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
            <a href="tel:0706067799">0706 067 799</a>
            <span>Đà Nẵng, Việt Nam</span>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} VanBass Music Center.</span>
          <span>DJ / AUDIO / RENTAL</span>
        </div>
      </footer>
  );
}