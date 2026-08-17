"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "../lib/cart-context";
import { useAuth } from "../lib/auth-context";
import { MOCK_PRODUCTS } from "../lib/mock-data";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Trang chủ" },
    { href: "/products", label: "Sản phẩm" },
    { href: "/rental", label: "Cho thuê" },
    { href: "/about", label: "Về VanBass" },
    { href: "/contact", label: "Liên hệ" },
  ];

  const searchResults = searchQuery.trim()
    ? MOCK_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.brand || "").toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSelectSearchResult = (slug: string) => {
    setSearchModalOpen(false);
    setSearchQuery("");
    router.push(`/products/${slug}`);
  };

  return (
    <>
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
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Quick Search Button */}
            <button
              onClick={() => setSearchModalOpen(true)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                background: "transparent",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#f5f5f0",
                cursor: "pointer",
                transition: "border-color 180ms ease",
              }}
              aria-label="Tìm kiếm thiết bị"
              title="Tìm kiếm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

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

            {/* User Auth Button */}
            {isAuthenticated ? (
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    fontWeight: 900,
                    fontSize: "14px",
                    border: "none",
                    cursor: "pointer",
                  }}
                  title={user?.email}
                >
                  {user?.full_name?.charAt(0).toUpperCase() || user?.email.charAt(0).toUpperCase() || "U"}
                </button>

                {userDropdownOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "48px",
                      right: 0,
                      width: "180px",
                      backgroundColor: "#111111",
                      border: "1px solid rgba(255,255,255,0.15)",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                      zIndex: 150,
                      padding: "8px 0",
                    }}
                  >
                    <Link
                      href="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      style={{
                        display: "block",
                        padding: "10px 16px",
                        color: "#fff",
                        fontSize: "13px",
                        fontWeight: 600,
                        textDecoration: "none",
                      }}
                    >
                      👤 Tài khoản của tôi
                    </Link>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "10px 16px",
                        color: "#f87171",
                        fontSize: "13px",
                        fontWeight: 600,
                        textAlign: "left",
                        background: "none",
                        border: "none",
                        borderTop: "1px solid rgba(255,255,255,0.08)",
                        cursor: "pointer",
                      }}
                    >
                      🚪 Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#d4d4d8",
                  textDecoration: "none",
                  padding: "8px 12px",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                Đăng nhập
              </Link>
            )}

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
            {isAuthenticated ? (
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: "600",
                  padding: "10px 0",
                }}
              >
                👤 Tài khoản ({user?.full_name || user?.email})
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: "600",
                  padding: "10px 0",
                }}
              >
                🔑 Đăng nhập / Đăng ký
              </Link>
            )}
          </div>
        )}
      </header>

      {/* Quick Search Modal */}
      {searchModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(6px)",
            zIndex: 200,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: "120px",
          }}
          onClick={() => setSearchModalOpen(false)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "600px",
              backgroundColor: "#121212",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              padding: "24px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", borderBottom: "1px solid rgba(255,255,255,0.15)", paddingBottom: "12px" }}>
              <span style={{ fontSize: "18px", color: "#a1a1aa" }}>🔍</span>
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm máy DJ, Mixer, CDJ, Loa..."
                style={{
                  width: "100%",
                  background: "none",
                  border: "none",
                  color: "#fff",
                  fontSize: "16px",
                  outline: "none",
                }}
              />
              <button
                onClick={() => setSearchModalOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#a1a1aa",
                  fontSize: "18px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            {/* Results Preview */}
            <div style={{ marginTop: "16px", maxHeight: "300px", overflowY: "auto" }}>
              {searchQuery.trim() && searchResults.length === 0 && (
                <p style={{ color: "#71717a", fontSize: "14px", textAlign: "center", padding: "20px 0" }}>
                  Không tìm thấy thiết bị phù hợp với &quot;{searchQuery}&quot;.
                </p>
              )}

              {searchResults.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectSearchResult(item.slug)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px",
                    cursor: "pointer",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    transition: "background 150ms ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1a1a1a")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <div>
                    <h4 style={{ margin: "0 0 4px 0", fontSize: "14px", fontWeight: 700, color: "#fff" }}>
                      {item.name}
                    </h4>
                    <span style={{ fontSize: "12px", color: "#a1a1aa" }}>
                      {item.brand} • {item.category_name}
                    </span>
                  </div>
                  <strong style={{ fontSize: "14px", color: "#fff" }}>
                    {item.sale_price ? item.sale_price.toLocaleString("vi-VN") + "₫" : "Liên hệ"}
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}