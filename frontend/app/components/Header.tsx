"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "../lib/cart-context";
import { useAuth } from "../lib/auth-context";
import { MOCK_PRODUCTS } from "../lib/mock-data";
import LanguageSwitcher from "./LanguageSwitcher";

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
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const nextScrolled = currentScrollY > 40;
          setIsScrolled((prev) => (prev !== nextScrolled ? nextScrolled : prev));

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

  const headerVisibilityClass = isVisible || mobileMenuOpen || isSearchDropdownOpen ? "is-visible" : "is-hidden";
  const headerScrollClass = isScrolled ? "scrolled" : "unscrolled";

  return (
    <header className={`site-header ${headerVisibilityClass} ${headerScrollClass}`}>
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="VanBass Music Center">
          <span className="brand-mark">VB</span>
          <span className="brand-text">
            VANBASS
            <small>MUSIC CENTER</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={isActive ? "active" : ""}
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

        <div ref={searchContainerRef} className="header-search-wrap">
          <form onSubmit={handleSearchSubmit} className={`header-search-form ${isSearchFocused ? "focused" : ""}`}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={isSearchFocused ? "#22c55e" : "rgba(255, 255, 255, 0.45)"}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0, marginRight: "10px" }}
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
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Tìm kiếm thiết bị DJ, mixer, loa..."
              className="header-search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setIsSearchDropdownOpen(false);
                }}
                className="header-search-clear"
                title="Xóa tìm kiếm"
              >
                ✕
              </button>
            )}
          </form>

          {isSearchDropdownOpen && searchQuery.trim() && (
            <div className="search-dropdown-menu">
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
                      className="search-result-row"
                    >
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: 700, color: "#ffffff", marginBottom: "2px" }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: "11px", color: "#a1a1aa" }}>
                          {item.brand} • {item.sku}
                        </div>
                      </div>
                      <div style={{ fontSize: "13px", fontWeight: 800, color: "#22c55e", whiteSpace: "nowrap", marginLeft: "12px" }}>
                        {item.sale_price ? item.sale_price.toLocaleString("vi-VN") + "₫" : "Liên hệ"}
                      </div>
                    </div>
                  ))}
                  <div onMouseDown={handleSearchSubmit} className="search-view-all">
                    Xem tất cả kết quả cho &quot;{searchQuery}&quot; →
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
          <LanguageSwitcher />

          <Link href="/cart" className="header-cart-btn" aria-label="Xem giỏ hàng">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {totalItems > 0 && <span className="header-cart-badge">{totalItems}</span>}
          </Link>

          {isAuthenticated ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", position: "relative" }}>
              {user?.role === "admin" && (
                <Link href="/admin" className="header-admin-btn">
                  👑 Quản Trị
                </Link>
              )}
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="header-user-btn"
                title={user?.email}
              >
                {user?.full_name?.charAt(0).toUpperCase() || user?.email.charAt(0).toUpperCase() || "U"}
              </button>

              {userDropdownOpen && (
                <div className="header-user-dropdown">
                  {user?.role === "admin" && (
                    <Link
                      href="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      style={{ display: "block", padding: "10px 16px", color: "#22c55e", fontSize: "13px", fontWeight: 700, borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      👑 Bảng Quản Trị Admin
                    </Link>
                  )}
                  <Link
                    href="/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    style={{ display: "block", padding: "10px 16px", color: "#fff", fontSize: "13px", fontWeight: 600 }}
                  >
                    👤 Tài khoản của tôi
                  </Link>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logout();
                    }}
                    style={{ display: "block", width: "100%", padding: "10px 16px", color: "#f87171", fontSize: "13px", fontWeight: 600, textAlign: "left", background: "none", border: "none", borderTop: "1px solid rgba(255,255,255,0.08)", cursor: "pointer" }}
                  >
                    🚪 Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="header-login-btn">
              Đăng nhập
            </Link>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            style={{ display: "none", background: "none", border: "none", color: "#fff", fontSize: "22px", cursor: "pointer" }}
            aria-label="Mở menu điều hướng"
          >
            ☰
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-drawer">
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
          <div style={{ padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <LanguageSwitcher />
          </div>
          <Link
            href="/cart"
            onClick={() => setMobileMenuOpen(false)}
            style={{ color: "#fff", fontSize: "14px", fontWeight: "600", padding: "10px 0" }}
          >
            🛒 Giỏ hàng ({totalItems})
          </Link>
          {isAuthenticated ? (
            <Link
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: "#fff", fontSize: "14px", fontWeight: "600", padding: "10px 0" }}
            >
              👤 Tài khoản ({user?.full_name || user?.email})
            </Link>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              style={{ color: "#fff", fontSize: "14px", fontWeight: "600", padding: "10px 0" }}
            >
              🔑 Đăng nhập / Đăng ký
            </Link>
          )}
        </div>
      )}
    </header>
  );
}