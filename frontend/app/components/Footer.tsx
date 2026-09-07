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
          <Link href="/products">{t.footer.productsLink}</Link>
          <Link href="/thue-ban-dj">{t.footer.rentalLink}</Link>
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
          <span style={{ fontSize: "10px", color: "#71717a" }} data-cms-key="local_cta.hours" data-cms-label="Giờ Mở Cửa Showroom" data-cms-type="text">{t.footer.hoursText}</span>
        </div>
      </div>

      <div className="container footer-bottom">
        <span data-cms-key="local_cta.copyright" data-cms-label="Bản Quyền Footer" data-cms-type="text">© {new Date().getFullYear()} {t.footer.copyright}</span>
        <span style={{ color: "#22c55e" }}>{t.footer.brandsBottom}</span>
      </div>
    </footer>
  );
}