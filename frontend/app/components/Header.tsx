import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          href="/"
          className="brand"
          aria-label="VanBass Music Center"
        >
          <span className="brand-mark">VB</span>

          <span className="brand-text">
            VANBASS
            <small>MUSIC CENTER</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/">Trang chủ</Link>
          <Link href="/products">Sản phẩm</Link>
          <Link href="/rental">Cho thuê</Link>
          <Link href="/about">Về VanBass</Link>
          <Link href="/contact">Liên hệ</Link>
        </nav>

        <Link href="/rental" className="header-cta">
          Thuê thiết bị
        </Link>
      </div>
    </header>
  );
}