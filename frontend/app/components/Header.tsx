"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "../lib/cart-context";
import { useAuth } from "../lib/auth-context";
import { useLanguage } from "../lib/language-context";
import { MOCK_PRODUCTS } from "../lib/mock-data";
import LanguageSwitcher from "./LanguageSwitcher";
import { getTranslatedProductName } from "../lib/product-i18n";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { t, lang } = useLanguage();

  const navLinks = useMemo(
    () => [
      { href: "/", label: t.nav.home },
      { href: "/thue-ban-dj", label: lang === "vi" ? "Thuê Bàn DJ" : "DJ Rental" },
      { href: "/products", label: t.nav.products },
      { href: "/about", label: t.nav.about },
      { href: "/contact", label: t.nav.contact },
    ],
    [t.nav.home, t.nav.products, t.nav.about, t.nav.contact, lang]
  );

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchCatalog, setSearchCatalog] = useState(MOCK_PRODUCTS);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (mobileMenuOpen) setMobileMenuOpen(false);
    if (isSearchDropdownOpen) setIsSearchDropdownOpen(false);
    if (userDropdownOpen) setUserDropdownOpen(false);
  }

  const islandRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const nextScrolled = currentScrollY > 30;
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
      if (
        islandRef.current &&
        !islandRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dynamic Sliding Indicator Logic
  useEffect(() => {
    const updateIndicator = () => {
      const activeLink = navLinks.find((l) =>
        l.href === "/" ? pathname === "/" : pathname.startsWith(l.href)
      );
      const targetHref = hoveredHref || activeLink?.href || null;

      if (targetHref && linkRefs.current[targetHref] && navContainerRef.current) {
        const navRect = navContainerRef.current.getBoundingClientRect();
        const linkRect = linkRefs.current[targetHref]!.getBoundingClientRect();
        setIndicatorStyle({
          left: linkRect.left - navRect.left,
          width: linkRect.width,
          opacity: 1,
        });
      } else if (!targetHref) {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    };

    const timer = setTimeout(updateIndicator, 50);
    window.addEventListener("resize", updateIndicator);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateIndicator);
    };
  }, [pathname, hoveredHref, navLinks]);

  const searchResults = searchQuery.trim()
    ? searchCatalog
        .filter((p) => {
          const q = searchQuery.toLowerCase();
          const trName = getTranslatedProductName(p, lang).toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            trName.includes(q) ||
            (p.brand || "").toLowerCase().includes(q) ||
            (p.sku || "").toLowerCase().includes(q)
          );
        })
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
  const mobileExpandedClass = mobileMenuOpen ? "mobile-expanded" : "";

  return (
    <header className={`site-header dynamic-island-header ${headerVisibilityClass} ${headerScrollClass} ${mobileExpandedClass}`}>
      <div ref={islandRef} className="dynamic-island-pill">
        <div className="header-inner">
          {/* Logo Brand */}
          <Link href="/" className="brand" aria-label="VanBass Music Center">
            <div className="brand-logo-wrap">
              <Image
                src="/images/logo.png"
                alt="VanBass Music Center Logo"
                width={40}
                height={40}
                className="brand-logo-img"
                priority
              />
            </div>
            <span className="brand-text">
              VANBASS
              <small>MUSIC CENTER</small>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            ref={navContainerRef}
            className="desktop-nav"
            aria-label="Main navigation"
            onMouseLeave={() => setHoveredHref(null)}
          >
            {navLinks.map((link) => {
              const isCurrentPage = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              const isHovered = hoveredHref === link.href;
              const isHighlighted = hoveredHref ? isHovered : isCurrentPage;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={(el) => {
                    linkRefs.current[link.href] = el;
                  }}
                  onMouseEnter={() => setHoveredHref(link.href)}
                  className={`nav-link-item ${isHighlighted ? "active" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Smooth Sliding Glow Indicator */}
            <span
              className="nav-sliding-indicator"
              style={{
                transform: `translateX(${indicatorStyle.left}px)`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
              }}
            />
          </nav>

          {/* Dynamic Search Pill Input */}
          <div ref={searchContainerRef} className="header-search-wrap">
            <form onSubmit={handleSearchSubmit} className={`header-search-form ${isSearchFocused ? "focused" : ""}`}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke={isSearchFocused ? "#22c55e" : "rgba(255, 255, 255, 0.45)"}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0, marginRight: "8px" }}
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
                placeholder={t.nav.searchPlaceholder}
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
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </form>

            {/* Floating Dropdown Results */}
            {isSearchDropdownOpen && searchQuery.trim() && (
              <div className="search-dropdown-menu">
                {searchResults.length === 0 ? (
                  <div style={{ padding: "16px", color: "#a1a1aa", fontSize: "13px", textAlign: "center" }}>
                    {t.nav.noResults}
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
                            {getTranslatedProductName(item, lang)}
                          </div>
                          <div style={{ fontSize: "11px", color: "#a1a1aa" }}>
                            {item.brand} • {item.sku}
                          </div>
                        </div>
                        <div style={{ fontSize: "13px", fontWeight: 800, color: "#22c55e", whiteSpace: "nowrap", marginLeft: "12px" }}>
                          {item.sale_price ? (lang === "en" ? new Intl.NumberFormat("en-US").format(item.sale_price) + "₫" : item.sale_price.toLocaleString("vi-VN") + "₫") : t.products.contactPrice}
                        </div>
                      </div>
                    ))}
                    <div onMouseDown={handleSearchSubmit} className="search-view-all">
                      {t.nav.viewAllResults} &quot;{searchQuery}&quot; →
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons: Language Switcher, Cart, Auth / Profile */}
          <div className="header-actions">
            <LanguageSwitcher />

            <Link href="/cart" className="header-cart-btn" aria-label={t.nav.cart}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {totalItems > 0 && <span className="header-cart-badge">{totalItems}</span>}
            </Link>

            {isAuthenticated ? (
              <div
                className="header-user-wrapper"
                onMouseEnter={() => setUserDropdownOpen(true)}
                onMouseLeave={() => setUserDropdownOpen(false)}
                style={{ position: "relative", display: "inline-flex", alignItems: "center" }}
              >
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="header-user-btn"
                  title={user?.email}
                  aria-label={t.nav.profile}
                >
                  {user?.full_name?.charAt(0).toUpperCase() || user?.email.charAt(0).toUpperCase() || "U"}
                </button>

                {userDropdownOpen && (
                  <div className="header-user-dropdown">
                    {(user?.role === "admin" || user?.role === "staff") && (
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="header-user-item is-admin"
                      >
                        <span>{t.nav.adminPanel}</span>
                      </Link>
                    )}
                    <Link
                      href="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="header-user-item"
                    >
                      <span>{t.nav.profile}</span>
                    </Link>
                    <div className="header-user-divider" />
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                        router.push("/");
                      }}
                      className="header-user-item is-logout"
                    >
                      <span>{t.nav.logout}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="header-login-btn">
                {t.nav.login}
              </Link>
            )}

            {/* Mobile Island Trigger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`mobile-menu-btn ${mobileMenuOpen ? "is-open" : ""}`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Island Expandable Drawer for Mobile */}
        {mobileMenuOpen && (
          <div className="mobile-dynamic-drawer">
            <div className="mobile-drawer-search">
              <form onSubmit={handleSearchSubmit} className="mobile-search-form">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="2.2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.nav.searchPlaceholder}
                  className="mobile-search-input"
                />
              </form>
            </div>

            <div className="mobile-drawer-links">
              {navLinks.map((link) => {
                const isCurrent = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`mobile-nav-link ${isCurrent ? "active" : ""}`}
                  >
                    <span>{link.label}</span>
                    {isCurrent && <span className="mobile-active-dot" />}
                  </Link>
                );
              })}
            </div>

            <div className="mobile-drawer-footer">
              <LanguageSwitcher />
              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-footer-cart"
              >
                <span>{t.nav.cart}</span>
                <span className="mobile-cart-badge">{totalItems}</span>
              </Link>
            </div>

            {isAuthenticated ? (
              <div className="mobile-drawer-user">
                {(user?.role === "admin" || user?.role === "staff") && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="mobile-user-link"
                  >
                    <span>🛡️ {t.nav.adminPanel}</span>
                  </Link>
                )}
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-user-link"
                >
                  <span>👤 {t.nav.profile} ({user?.full_name || user?.email})</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                    router.push("/");
                  }}
                  className="mobile-logout-btn"
                >
                  <span>🚪 {t.nav.logout}</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-login-link"
              >
                {t.nav.login}
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}