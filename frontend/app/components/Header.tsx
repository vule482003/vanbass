"use client";

import { useState, useEffect, useRef } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchCatalog, setSearchCatalog] = useState(MOCK_PRODUCTS);

  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Smart Sticky Header states: Hide on scroll down, show on scroll up
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Header background styling threshold (only set state when changed)
          const nextScrolled = currentScrollY > 40;
          setIsScrolled((prev) => (prev !== nextScrolled ? nextScrolled : prev));

          // Scroll direction check with tolerance threshold
          if (currentScrollY > lastScrollY && currentScrollY > 120) {
            setIsVisible((prev) => (prev !== false ? false : prev));
          } else if (currentScrollY < lastScrollY) {
            setIsVisible((prev) => (prev !== true ? true : prev));
          }

          lastScrollY = Math.max(0, currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch live product catalog for instant search
  useEffect(() => {
    const loadSearchCatalog = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
        const res = await fetch(`${apiUrl}/products`);
        if (res.ok) {
          const liveData = await res.json();
          if (Array.isArray(liveData) && liveData.length > 0) {
            setSearchCatalog(liveData);
          }
        }
      } catch {
        // Fallback to MOCK_PRODUCTS
      }
    };
    loadSearchCatalog();
  }, []);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Removed "Cho thuê" from navigation links
  const navLinks = [
    { href: "/", label: "Trang chủ" },
    { href: "/products", label: "Sản phẩm" },
    { href: "/about", label: "Về VanBass" },
    { href: "/contact", label: "Liên hệ" },
  ];

  const searchResults = searchQuery.trim()
    ? searchCatalog
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.brand || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.sku || "").toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 6)
    : [];

  const handleSelectSearchResult = (slug: string) => {
    setIsSearchDropdownOpen(false);
    setSearchQuery("");
    router.push(`/products/${slug}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchDropdownOpen(false);
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <header
        className="site-header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 100,
          transform: isVisible || mobileMenuOpen || isSearchDropdownOpen ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
          backgroundColor: isScrolled ? "rgba(9, 9, 9, 0.95)" : "rgba(9, 9, 9, 0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: isScrolled ? "1px solid rgba(255, 255, 255, 0.12)" : "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: isScrolled ? "0 10px 30px rgba(0, 0, 0, 0.6)" : "none",
        }}
      >
        <div className="container header-inner" style={{ minHeight: "76px", gap: "20px" }}>
          {/* Logo Brand */}
          <Link href="/" className="brand" aria-label="VanBass Music Center" style={{ flexShrink: 0 }}>
            <span className="brand-mark">VB</span>
            <span className="brand-text">
              VANBASS
              <small>MUSIC CENTER</small>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" aria-label="Main navigation" style={{ margin: "0 0 0 16px" }}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: isActive ? "#ffffff" : undefined,
                    borderBottom: isActive ? "2px solid #22c55e" : undefined,
                    paddingBottom: isActive ? "4px" : undefined,
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Fixed Elongated Search Bar */}
          <div
            ref={searchContainerRef}
            style={{
              position: "relative",
              flex: "1 1 340px",
              maxWidth: "420px",
              minWidth: "220px",
            }}
          >
            <form
              onSubmit={handleSearchSubmit}
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.06)",
                border: isSearchFocused ? "1px solid #22c55e" : "1px solid rgba(255, 255, 255, 0.14)",
                borderRadius: "6px",
                padding: "0 12px",
                height: "40px",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease",
                boxShadow: isSearchFocused ? "0 0 12px rgba(34, 197, 94, 0.2)" : "none",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke={isSearchFocused ? "#22c55e" : "rgba(255, 255, 255, 0.45)"}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0, marginRight: "10px", transition: "stroke 0.2s ease" }}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchDropdownOpen(true);
                }}
                onFocus={() => {
                  setIsSearchFocused(true);
                  setIsSearchDropdownOpen(true);
                }}
                onBlur={() => {
                  setIsSearchFocused(false);
                }}
                placeholder="Tìm kiếm thiết bị DJ, mixer, loa..."
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: "500",
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setIsSearchDropdownOpen(false);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(255, 255, 255, 0.4)",
                    fontSize: "13px",
                    cursor: "pointer",
                    padding: "2px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  title="Xóa tìm kiếm"
                >
                  ✕
                </button>
              )}
            </form>

            {/* Autocomplete Dropdown */}
            {isSearchDropdownOpen && searchQuery.trim() && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 6px)",
                  left: 0,
                  right: 0,
                  backgroundColor: "#121215",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "6px",
                  boxShadow: "0 16px 36px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.5)",
                  maxHeight: "360px",
                  overflowY: "auto",
                  zIndex: 200,
                }}
              >
                {searchResults.length === 0 ? (
                  <div style={{ padding: "16px", color: "#a1a1aa", fontSize: "13px", textAlign: "center" }}>
                    Không tìm thấy thiết bị nào phù hợp với &quot;{searchQuery}&quot;
                  </div>
                ) : (
                  <>
                    {searchResults.map((item) => (
                      <div
                        key={item.id}
                        onMouseDown={() => handleSelectSearchResult(item.slug)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "10px 14px",
                          cursor: "pointer",
                          borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                          transition: "background 0.15s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1a1f1a")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                      >
                        <div>
                          <div style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff", marginBottom: "2px" }}>
                            {item.name}
                          </div>
                          <div style={{ fontSize: "11px", color: "#a1a1aa" }}>
                            {item.brand} • {item.sku}
                          </div>
                        </div>
                        <div
                          style={{
                            fontSize: "13px",
                            fontWeight: 800,
                            color: "#22c55e",
                            whiteSpace: "nowrap",
                            marginLeft: "12px",
                          }}
                        >
                          {item.sale_price ? item.sale_price.toLocaleString("vi-VN") + "₫" : "Liên hệ"}
                        </div>
                      </div>
                    ))}
                    <div
                      onMouseDown={handleSearchSubmit}
                      style={{
                        padding: "10px 14px",
                        textAlign: "center",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#22c55e",
                        cursor: "pointer",
                        backgroundColor: "rgba(34, 197, 94, 0.08)",
                      }}
                    >
                      Xem tất cả kết quả cho &quot;{searchQuery}&quot; →
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Action Controls (Cart, User Auth) */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
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
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "6px",
                color: "#f5f5f0",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                transition: "border-color 180ms ease, background-color 180ms ease",
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
                    backgroundColor: "#22c55e",
                    color: "#000000",
                    fontSize: "10px",
                    fontWeight: "900",
                    width: "18px",
                    height: "18px",
                    borderRadius: "999px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 8px rgba(34, 197, 94, 0.5)",
                  }}
                >
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Auth Button */}
            {isAuthenticated ? (
              <div style={{ display: "flex", alignItems: "center", gap: "10px", position: "relative" }}>
                {user?.role === "admin" && (
                  <Link
                    href="/admin"
                    style={{
                      padding: "8px 14px",
                      backgroundColor: "rgba(34, 197, 94, 0.12)",
                      border: "1px solid rgba(34, 197, 94, 0.4)",
                      borderRadius: "6px",
                      color: "#4ade80",
                      fontSize: "12px",
                      fontWeight: 800,
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      letterSpacing: "0.02em",
                    }}
                  >
                    👑 Quản Trị
                  </Link>
                )}

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
                    borderRadius: "6px",
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
                      width: "200px",
                      backgroundColor: "#111111",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "6px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                      zIndex: 150,
                      padding: "8px 0",
                    }}
                  >
                    {user?.role === "admin" && (
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        style={{
                          display: "block",
                          padding: "10px 16px",
                          color: "#22c55e",
                          fontSize: "13px",
                          fontWeight: 700,
                          textDecoration: "none",
                          borderBottom: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        👑 Bảng Quản Trị Admin
                      </Link>
                    )}
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
                  color: "#ffffff",
                  textDecoration: "none",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                Đăng nhập
              </Link>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: "none",
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: "22px",
                cursor: "pointer",
              }}
              className="mobile-menu-btn"
              aria-label="Mở menu điều hướng"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              position: "fixed",
              top: "76px",
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
                  color: pathname === link.href ? "#22c55e" : "#a1a1aa",
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
    </>
  );
}