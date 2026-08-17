"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "../lib/cart-context";

export default function Header() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Trang chủ" },
    { href: "/products", label: "Sản phẩm" },
    { href: "/rental", label: "Cho thuê" },
    { href: "/about", label: "Về VanBass" },
    { href: "/contact", label: "Liên hệ" },
  ];

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="VanBass Music Center">
          <span className="brand-mark">VB</span>
          <span className="brand-text">
            VANBASS
            <small>MUSIC CENTER</small>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: isActive ? "#ffffff" : undefined,
                  borderBottom: isActive ? "1px solid #ffffff" : undefined,
                  paddingBottom: isActive ? "2px" : undefined,
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Cart Icon & Badge */}
          <Link
            href="/cart"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#f5f5f0",
              transition: "border-color 180ms ease",
            }}
            aria-label="Xem giỏ hàng"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {totalItems > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-6px",
                  backgroundColor: "#ffffff",
                  color: "#0a0a0a",
                  fontSize: "10px",
                  fontWeight: "800",
                  width: "18px",
                  height: "18px",
                  borderRadius: "999px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {totalItems}
              </span>
            )}
          </Link>

          <Link href="/rental" className="header-cta">
            Thuê thiết bị
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: "none",
              background: "none",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#fff",
              padding: "8px 12px",
              cursor: "pointer",
            }}
            className="mobile-menu-toggle"
            aria-label="Mở menu"
          >
            <span style={{ fontSize: "16px" }}>{mobileMenuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: "84px",
            left: 0,
            width: "100%",
            backgroundColor: "#0d0d0d",
            borderBottom: "1px solid rgba(255,255,255,0.15)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            zIndex: 100,
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: pathname === link.href ? "#fff" : "#a1a1aa",
                fontSize: "15px",
                fontWeight: "600",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                padding: "8px 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/cart"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: "#fff",
              fontSize: "14px",
              fontWeight: "600",
              padding: "10px 0",
            }}
          >
            🛒 Giỏ hàng ({totalItems})
          </Link>
        </div>
      )}
    </header>
  );
}