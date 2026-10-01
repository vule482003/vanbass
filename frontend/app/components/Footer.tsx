"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "../lib/language-context";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="brand" style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
            <div className="brand-logo-wrap" style={{ width: "36px", height: "36px" }}>
              <Image
                src="/images/logo.png"
                alt="VanBass Music Center Logo"
                width={36}
                height={36}
                className="brand-logo-img"
              />
            </div>
            <span className="brand-text" style={{ fontSize: "14px" }}>
              VANBASS
              <small style={{ fontSize: "6.5px" }}>MUSIC CENTER</small>
            </span>
          </Link>

          <p data-cms-key="local_cta.desc" data-cms-label="Mô Tả Chân Trang" data-cms-type="textarea">
            {t.footer.aboutDesc}
          </p>
        </div>

        <div className="footer-column">
          <h3>{t.footer.explore}</h3>
          <Link href="/ban-dj">Bàn DJ Chính Hãng (Mua & Thuê)</Link>
          <Link href="/products">{t.footer.productsLink}</Link>
          <Link href="/thue-ban-dj">{t.footer.rentalLink}</Link>
          <Link href="/sua-chua-ban-dj">{t.nav?.contact ? (t.nav.home === "Trang Chủ" ? "Sửa Chữa & Bảo Dưỡng DJ" : "DJ Repair & Maintenance") : "Sửa Chữa & Bảo Dưỡng DJ"}</Link>
          <Link href="/about">{t.footer.aboutLink}</Link>
        </div>

        <div className="footer-column">
          <h3>{t.footer.support}</h3>
          <Link href="/contact">{t.footer.contactLink}</Link>
          <Link href="/faq">{t.footer.faqLink}</Link>
          <Link href="/policies">{t.footer.policiesLink}</Link>
        </div>

        <div className="footer-column">
          <h3>{t.footer.contact}</h3>
          <a href="tel:0706067799" style={{ color: "#22c55e", fontWeight: 700 }} data-cms-key="floating_contacts.phone" data-cms-label="Số Điện Thoại Hotline" data-cms-type="text">0706 067 799</a>
          <a
            href="https://www.google.com/maps?cid=3481175637981139835"
            target="_blank"
            rel="noopener noreferrer"
            data-cms-key="floating_contacts.maps_link"
            data-cms-label="Địa Chỉ Showroom Đà Nẵng"
            data-cms-type="text"
          >
            {t.footer.addressText}
          </a>
          <a
            href="https://www.google.com/maps/place/V%26B+STUDIO+(Training+DJ+Pioneer)/@16.4946002,107.5903409,17z/data=!3m1!4b1!4m6!3m5!1s0x3141a10047a15223:0x298a389a412fb2d1!8m2!3d16.4946002!4d107.5903409!16s%2Fg%2F11m6bydlgc?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            data-cms-key="floating_contacts.maps_link_hue"
            data-cms-label="Địa Chỉ Showroom Huế"
            data-cms-type="text"
          >
            {t.footer.addressHueText}
          </a>
          <span style={{ fontSize: "10px", color: "#71717a" }} data-cms-key="local_cta.hours" data-cms-label="Giờ Mở Cửa Showroom" data-cms-type="text">{t.footer.hoursText}</span>
        </div>
      </div>

      {/* Hot Search DJ Equipment Internal Linking Strip */}
      <div className="container" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", padding: "26px 0 20px" }}>
        <div style={{ fontSize: "11px", fontWeight: 800, color: "#22c55e", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
          <span>🔥</span>
          <span>Hot Search Bàn DJ (Mua Bán & Cho Thuê Chính Hãng)</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 18px", fontSize: "12.5px" }}>
          <Link href="/products/xdj-rx3" style={{ color: "#d4d4d8", textDecoration: "none" }}>
            Pioneer XDJ-RX3 (Mua Bán & Thuê)
          </Link>
          <span style={{ color: "#3f3f46" }}>•</span>
          <Link href="/products/xdj-rx2" style={{ color: "#d4d4d8", textDecoration: "none" }}>
            Pioneer XDJ-RX2 (All-In-One 2 Kênh)
          </Link>
          <span style={{ color: "#3f3f46" }}>•</span>
          <Link href="/products/xdj-rr" style={{ color: "#d4d4d8", textDecoration: "none" }}>
            Pioneer XDJ-RR (All-In-One Mini)
          </Link>
          <span style={{ color: "#3f3f46" }}>•</span>
          <Link href="/products/ddj-flx4" style={{ color: "#d4d4d8", textDecoration: "none" }}>
            Pioneer DDJ-FLX4 (DJ Controller Quốc Dân)
          </Link>
          <span style={{ color: "#3f3f46" }}>•</span>
          <Link href="/products/ddj-flx2" style={{ color: "#d4d4d8", textDecoration: "none" }}>
            AlphaTheta DDJ-FLX2 (Bluetooth Siêu Gọn)
          </Link>
          <span style={{ color: "#3f3f46" }}>•</span>
          <Link href="/products/omnis-duo" style={{ color: "#d4d4d8", textDecoration: "none" }}>
            AlphaTheta OMNIS-DUO (Dùng Pin Không Dây)
          </Link>
          <span style={{ color: "#3f3f46" }}>•</span>
          <Link href="/products/xdj-az" style={{ color: "#d4d4d8", textDecoration: "none" }}>
            AlphaTheta XDJ-AZ (Flagship 4 Kênh)
          </Link>
          <span style={{ color: "#3f3f46" }}>•</span>
          <Link href="/products/xdj-an" style={{ color: "#d4d4d8", textDecoration: "none" }}>
            AlphaTheta XDJ-AN (All-In-One Thế Hệ Mới)
          </Link>
          <span style={{ color: "#3f3f46" }}>•</span>
          <Link href="/products/xdj-xz" style={{ color: "#d4d4d8", textDecoration: "none" }}>
            Pioneer DJ XDJ-XZ (Chuẩn Bar Club)
          </Link>
          <span style={{ color: "#3f3f46" }}>•</span>
          <Link href="/sua-chua-ban-dj" style={{ color: "#38bdf8", fontWeight: 700, textDecoration: "none" }}>
            🛠️ Sửa Chữa & Thay Fader Bàn DJ Lấy Liền
          </Link>
          <span style={{ color: "#3f3f46" }}>•</span>
          <Link href="/thue-ban-dj" style={{ color: "#22c55e", fontWeight: 700, textDecoration: "none" }}>
            Bảng Giá Thuê Bàn DJ 24/7 &rarr;
          </Link>
        </div>
      </div>

      <div className="container footer-bottom">
        <span data-cms-key="local_cta.copyright" data-cms-label="Bản Quyền Footer" data-cms-type="text">© {new Date().getFullYear()} {t.footer.copyright}</span>
        <span style={{ color: "#22c55e" }}>{t.footer.brandsBottom}</span>
      </div>
    </footer>
  );
}