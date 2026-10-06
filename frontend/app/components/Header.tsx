"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "../lib/cart-context";
import { useAuth } from "../lib/auth-context";
import { useLanguage } from "../lib/language-context";
import { MOCK_PRODUCTS } from "../lib/mock-data";
import LanguageSwitcher from "./LanguageSwitcher";
import { getTranslatedProductName } from "../lib/product-i18n";
import { CATEGORY_GROUPS } from "../lib/category-hierarchy";
import { HeaderConfig } from "../types/home_config";
import { getApiBaseUrl } from "../lib/api";

interface HeaderProps {
  config?: HeaderConfig;
  isEditor?: boolean;
}

export default function Header({ config, isEditor = false }: HeaderProps = {}) {
  const pathname = usePathname();
  const router = useRouter();
  const { items, totalItems, subtotal } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { t, lang } = useLanguage();

  const navLinks = useMemo(
    () => [
      {
        href: "/",
        label: config?.nav_home || t.nav.home,
        cmsKey: "header.nav_home",
        cmsLabel: "Menu Trang Chủ",
      },
      {
        href: "/dich-vu",
        label: (t.nav as Record<string, string>).services || (lang === "vi" ? "Dịch vụ" : "Services"),
        isServicesMega: true,
        cmsKey: "header.nav_services",
        cmsLabel: "Menu Dịch Vụ",
      },
      {
        href: "/products",
        label: config?.nav_products || t.nav.products,
        isMega: true,
        cmsKey: "header.nav_products",
        cmsLabel: "Menu Sản Phẩm",
      },
      {
        href: "/about",
        label: config?.nav_about || t.nav.about,
        cmsKey: "header.nav_about",
        cmsLabel: "Menu Về VanBass",
      },
      {
        href: "/contact",
        label: config?.nav_contact || t.nav.contact,
        cmsKey: "header.nav_contact",
        cmsLabel: "Menu Liên Hệ",
      },
    ],
    [t.nav, lang, config]
  );

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesAccordionOpen, setMobileServicesAccordionOpen] = useState(false);
  const [mobileCatAccordionOpen, setMobileCatAccordionOpen] = useState(false);
  const [mobileActiveGroupId, setMobileActiveGroupId] = useState<string | null>(null);

  // Mutually exclusive desktop dropdown state: "services" | "products" | null
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<"services" | "products" | null>(null);
  const menuCloseTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isServicesMenuOpen = activeDesktopMenu === "services";
  const isProductsMenuOpen = activeDesktopMenu === "products";
  const [activeMegaGroupId, setActiveMegaGroupId] = useState<string>("dj");

  const clearMenuCloseTimer = useCallback(() => {
    if (menuCloseTimerRef.current) {
      clearTimeout(menuCloseTimerRef.current);
      menuCloseTimerRef.current = null;
    }
  }, []);

  const handleOpenServicesMenu = () => {
    clearMenuCloseTimer();
    setActiveDesktopMenu("services");
  };

  const handleOpenMegaMenu = () => {
    clearMenuCloseTimer();
    setActiveDesktopMenu("products");
  };

  const handleCloseServicesMenu = () => {
    clearMenuCloseTimer();
    menuCloseTimerRef.current = setTimeout(() => {
      setActiveDesktopMenu((current) => (current === "services" ? null : current));
    }, 250);
  };

  const handleCloseMegaMenu = () => {
    clearMenuCloseTimer();
    menuCloseTimerRef.current = setTimeout(() => {
      setActiveDesktopMenu((current) => (current === "products" ? null : current));
    }, 250);
  };

  const closeAllMenusImmediately = useCallback(() => {
    clearMenuCloseTimer();
    setActiveDesktopMenu(null);
  }, [clearMenuCloseTimer]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);
  const [searchCatalog, setSearchCatalog] = useState(MOCK_PRODUCTS);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (mobileMenuOpen) setMobileMenuOpen(false);
    if (activeDesktopMenu !== null) setActiveDesktopMenu(null);
    if (isSearchDropdownOpen) setIsSearchDropdownOpen(false);
    if (userDropdownOpen) setUserDropdownOpen(false);
    if (cartDropdownOpen) setCartDropdownOpen(false);
  }

  const islandRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<{ [key: string]: HTMLAnchorElement | HTMLDivElement | null }>({});
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
        const apiUrl = getApiBaseUrl();
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
        closeAllMenusImmediately();
        setUserDropdownOpen(false);
        setCartDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        closeAllMenusImmediately();
        setIsSearchDropdownOpen(false);
        setUserDropdownOpen(false);
        setCartDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeAllMenusImmediately]);

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

  const searchIntent = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();

    const isRepair = /sua|chua|bao duong|ve sinh|thay|fader|jogwheel|knob|nut|hu|hong|loi|repair|fix|service/.test(q);
    const isRental = /thue|cho thue|rent|hire|lease|muon|party|beach|villa/.test(q);
    const isBuy = /mua|ban|gia ban|gia bao nhieu|chinh hang|buy|sell|order/.test(q);

    return { isRepair, isRental, isBuy };
  }, [searchQuery]);

  const searchResults = searchQuery.trim()
    ? searchCatalog
        .filter((p) => {
          const cleanQ = searchQuery
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .toLowerCase()
            .trim();

          const prodName = (p.name || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase();
          const trName = getTranslatedProductName(p, lang).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase();
          const prodBrand = (p.brand || "").toLowerCase();
          const prodSku = (p.sku || "").toLowerCase();
          const combined = `${prodName} ${trName} ${prodBrand} ${prodSku}`;

          if (combined.includes(cleanQ)) return true;

          const tokens = cleanQ.split(/\s+/).filter(Boolean);
          const stopWords = new Set(["thue", "mua", "ban", "cho", "sua", "chua", "bao", "duong", "thay", "repair", "fix", "dn", "hue", "da", "nang", "hoi", "an", "mien", "trung", "tai", "o", "gia", "re", "chinh", "hang"]);
          const coreTokens = tokens.filter((t) => !stopWords.has(t));
          const effectiveTokens = coreTokens.length > 0 ? coreTokens : tokens;

          return effectiveTokens.every((token) => combined.includes(token));
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

  const [isHeaderHovered, setIsHeaderHovered] = useState(false);

  const selectedMegaGroup = useMemo(() => {
    return CATEGORY_GROUPS.find((g) => g.id === activeMegaGroupId) || CATEGORY_GROUPS[0];
  }, [activeMegaGroupId]);

  const isInteracting =
    isHeaderHovered ||
    isServicesMenuOpen ||
    isProductsMenuOpen ||
    isSearchFocused ||
    isSearchDropdownOpen ||
    userDropdownOpen ||
    cartDropdownOpen ||
    mobileMenuOpen;

  const headerVisibilityClass = isVisible || mobileMenuOpen || isSearchDropdownOpen ? "is-visible" : "is-hidden";
  const headerScrollClass = isScrolled ? "scrolled" : "unscrolled";
  const mobileExpandedClass = mobileMenuOpen ? "mobile-expanded" : "";
  const headerInteractingClass = isInteracting ? "is-interacting" : "is-idle";

  return (
    <header
      className={`site-header dynamic-island-header ${headerVisibilityClass} ${headerScrollClass} ${mobileExpandedClass} ${headerInteractingClass}`}
      onMouseEnter={() => setIsHeaderHovered(true)}
      onMouseLeave={() => setIsHeaderHovered(false)}
    >
      <div ref={islandRef} className="dynamic-island-pill">
        <div className="header-inner">
          {/* Logo Brand */}
          <Link href="/" className="brand" aria-label="VanBass Music Center">
            <div className="brand-logo-wrap">
              <Image
                src="/images/logo.png"
                alt="VanBass Music Center Logo"
                width={48}
                height={48}
                className="brand-logo-img"
                priority
              />
            </div>
            <span className="brand-text">
              <span
                data-cms-key="header.brand_title"
                data-cms-label="Tên thương hiệu Header"
                data-cms-type="text"
              >
                {config?.brand_title || "VANBASS"}
              </span>
              <small
                data-cms-key="header.brand_subtitle"
                data-cms-label="Phụ đề thương hiệu Header"
                data-cms-type="text"
              >
                {config?.brand_subtitle || "MUSIC CENTER"}
              </small>
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

              if (link.isServicesMega) {
                return (
                  <div
                    key={link.href}
                    className="header-nav-item-wrap"
                    onMouseEnter={() => {
                      setHoveredHref(link.href);
                      handleOpenServicesMenu();
                    }}
                    onMouseLeave={handleCloseServicesMenu}
                  >
                    <Link
                      href={link.href}
                      ref={(el) => {
                        linkRefs.current[link.href] = el;
                      }}
                      className={`nav-link-item ${isHighlighted ? "active" : ""}`}
                      onClick={() => closeAllMenusImmediately()}
                      data-cms-key={link.cmsKey}
                      data-cms-label={link.cmsLabel}
                      data-cms-type="text"
                    >
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        {link.label}
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            transition: "transform 0.2s ease",
                            transform: isServicesMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
                            opacity: 0.75,
                          }}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                );
              }

              if (link.isMega) {
                return (
                  <div
                    key={link.href}
                    className="header-nav-item-wrap"
                    onMouseEnter={() => {
                      setHoveredHref(link.href);
                      handleOpenMegaMenu();
                    }}
                    onMouseLeave={handleCloseMegaMenu}
                  >
                    <Link
                      href={link.href}
                      ref={(el) => {
                        linkRefs.current[link.href] = el;
                      }}
                      className={`nav-link-item ${isHighlighted ? "active" : ""}`}
                      onClick={() => closeAllMenusImmediately()}
                      data-cms-key={link.cmsKey}
                      data-cms-label={link.cmsLabel}
                      data-cms-type="text"
                    >
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        {link.label}
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            transition: "transform 0.2s ease",
                            transform: isProductsMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
                            opacity: 0.75,
                          }}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </span>
                    </Link>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={(el) => {
                    linkRefs.current[link.href] = el;
                  }}
                  onMouseEnter={() => setHoveredHref(link.href)}
                  className={`nav-link-item ${isHighlighted ? "active" : ""}`}
                  data-cms-key={link.cmsKey}
                  data-cms-label={link.cmsLabel}
                  data-cms-type="text"
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
                  if (!isEditor) {
                    setIsSearchFocused(true);
                    setIsSearchDropdownOpen(true);
                  }
                }}
                onBlur={() => setIsSearchFocused(false)}
                placeholder={config?.search_placeholder || t.nav.searchPlaceholder}
                data-cms-key="header.search_placeholder"
                data-cms-label="Gợi ý ô tìm kiếm"
                data-cms-type="text"
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

            {/* Floating Dropdown Results & Hot Searches (Clean Minimalist styling - Zero Emojis) */}
            {isSearchDropdownOpen && (
              <div className="search-dropdown-menu">
                {!searchQuery.trim() ? (
                  <div className="search-hot-panel">
                    <div className="search-hot-title">
                      <span>{lang === "en" ? "Trending & Popular Searches" : "Tìm kiếm phổ biến & Hot search"}</span>
                    </div>
                    <div className="search-hot-tags-grid">
                      {[
                        // Mua bán thiết bị DJ
                        { label: "Mua bán DJ Đà Nẵng", link: "/products?search=DJ" },
                        { label: "Mua bán DJ Huế", link: "/products?search=DJ" },
                        { label: "Mua bán DJ Miền Trung", link: "/products?search=DJ" },

                        // Thuê bàn DJ (Đầy đủ Đà Nẵng, Huế, Miền Trung)
                        { label: "Thuê bàn DJ Đà Nẵng", link: "/thue-ban-dj" },
                        { label: "Thuê bàn DJ Huế", link: "/thue-ban-dj" },
                        { label: "Thuê bàn DJ Miền Trung", link: "/thue-ban-dj" },

                        // Dịch vụ sửa chữa & bảo dưỡng
                        { label: "Sửa chữa bàn DJ", link: "/sua-chua-ban-dj" },
                        { label: "Sửa bàn DJ & Loa", link: "/sua-chua-ban-dj" },
                        { label: "Sửa loa & Mixer", link: "/sua-chua-ban-dj" },
                        { label: "Bảo dưỡng thiết bị DJ", link: "/sua-chua-ban-dj" },
                        { label: "Sửa bàn DJ Đà Nẵng & Huế", link: "/sua-chua-ban-dj" },
                        { label: "Sửa bàn DJ Đà Nẵng", link: "/sua-chua-ban-dj" },
                        { label: "Sửa bàn DJ Huế", link: "/sua-chua-ban-dj" },
                        { label: "Sửa bàn DJ Miền Trung", link: "/sua-chua-ban-dj" },

                        // Dịch vụ đào tạo & setup
                        { label: "Đào tạo DJ Đà Nẵng", link: "/dao-tao-dj" },
                        { label: "Đào tạo MC Hype", link: "/dao-tao-mc-hype" },
                        { label: "Setup âm thanh sự kiện", link: "/su-kien-setup" },

                        // Địa điểm
                        { label: "Showroom Huế & ĐN", link: "/about" },

                        // Dòng máy hot & Loa B&C
                        { label: "Pioneer XDJ-RX3", link: "/products/xdj-rx3" },
                        { label: "Pioneer DDJ-FLX4", link: "/products/ddj-flx4" },
                        { label: "AlphaTheta OMNIS-DUO", link: "/products/omnis-duo" },
                        { label: "AlphaTheta XDJ-AZ", link: "/products/xdj-az" },
                        { label: "Pioneer XDJ-RX2", link: "/products/xdj-rx2" },
                        { label: "Pioneer XDJ-RR", link: "/products/xdj-rr" },
                        { label: "AlphaTheta DDJ-FLX2", link: "/products/ddj-flx2" },
                        { label: "AlphaTheta XDJ-AN", link: "/products/xdj-an" },
                        { label: "Loa B&C Speakers", link: "/products?category=loa-roi" },
                      ].map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.link}
                          onClick={() => {
                            setIsSearchDropdownOpen(false);
                            setSearchQuery("");
                          }}
                          className="search-hot-tag-btn"
                          style={{ textDecoration: "none" }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Smart Quick-Action Banner for Repair Service */}
                    {searchIntent?.isRepair && (
                      <div
                        onMouseDown={() => {
                          setIsSearchDropdownOpen(false);
                          router.push("/sua-chua-ban-dj");
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "10px 14px",
                          background: "linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(24, 24, 27, 0.9))",
                          border: "1px solid rgba(34, 197, 94, 0.35)",
                          borderRadius: "10px",
                          margin: "8px 10px",
                          cursor: "pointer",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }} />
                          <div>
                            <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#22c55e" }}>
                              {lang === "en" ? "DJ Equipment Repair & Maintenance" : "Dịch vụ Sửa chữa & Bảo dưỡng Bàn DJ"}
                            </div>
                            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)" }}>
                              {lang === "en" ? "Hotline / Zalo: 0706 067 799 • Da Nang & Hue" : "Sửa lấy liền tại Đà Nẵng & Huế • Hotline: 0706 067 799"}
                            </div>
                          </div>
                        </div>
                        <span style={{ fontSize: "11.5px", fontWeight: 700, color: "#22c55e" }}>
                          {lang === "en" ? "Details →" : "Xem chi tiết →"}
                        </span>
                      </div>
                    )}

                    {/* Smart Quick-Action Banner for Rental Service */}
                    {searchIntent?.isRental && (
                      <div
                        onMouseDown={() => {
                          setIsSearchDropdownOpen(false);
                          router.push("/thue-ban-dj");
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "10px 14px",
                          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(24, 24, 27, 0.9))",
                          border: "1px solid rgba(59, 130, 246, 0.35)",
                          borderRadius: "10px",
                          margin: "8px 10px",
                          cursor: "pointer",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#60a5fa" }} />
                          <div>
                            <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#60a5fa" }}>
                              {lang === "en" ? "DJ Gear Rental in Da Nang & Central Vietnam" : "Dịch vụ Cho Thuê Bàn DJ tại Đà Nẵng & Huế"}
                            </div>
                            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)" }}>
                              {lang === "en" ? "Pioneer XDJ-RX3, DDJ-FLX4, Omnis-Duo from 400k/day" : "XDJ-RX3, DDJ-FLX4, Omnis-Duo giá từ 400k • Giao tận nơi 24/7"}
                            </div>
                          </div>
                        </div>
                        <span style={{ fontSize: "11.5px", fontWeight: 700, color: "#60a5fa" }}>
                          {lang === "en" ? "Fleet →" : "Bảng giá thuê →"}
                        </span>
                      </div>
                    )}

                    {/* Smart Quick-Action Banner for Sales / Buying Intent */}
                    {searchIntent?.isBuy && (
                      <div
                        onMouseDown={() => {
                          setIsSearchDropdownOpen(false);
                          router.push("/ban-dj");
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "10px 14px",
                          background: "linear-gradient(135deg, rgba(56, 189, 248, 0.15), rgba(24, 24, 27, 0.9))",
                          border: "1px solid rgba(56, 189, 248, 0.35)",
                          borderRadius: "10px",
                          margin: "8px 10px",
                          cursor: "pointer",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#38bdf8" }} />
                          <div>
                            <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#38bdf8" }}>
                              {lang === "en" ? "Official DJ Gear Sales • Pioneer & AlphaTheta" : "Mua Bán Bàn DJ Chính Hãng • Trả Góp 0%"}
                            </div>
                            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)" }}>
                              {lang === "en" ? "100% Genuine, 12-24M Warranty, Nationwide Delivery" : "Bảo hành 12-24T • Tặng kèm USB nhạc Rekordbox • COD toàn quốc"}
                            </div>
                          </div>
                        </div>
                        <span style={{ fontSize: "11.5px", fontWeight: 700, color: "#38bdf8" }}>
                          {lang === "en" ? "Catalog →" : "Xem giá bán →"}
                        </span>
                      </div>
                    )}

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
                  </>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons: Language Switcher, Cart, Auth / Profile */}
          <div className="header-actions">
            <LanguageSwitcher />

            {/* Cart Preview Hover Dropdown */}
            <div
              className="header-cart-wrapper"
              onMouseEnter={() => setCartDropdownOpen(true)}
              onMouseLeave={() => setCartDropdownOpen(false)}
              style={{ position: "relative", display: "inline-flex", alignItems: "center" }}
            >
              <Link
                href="/cart"
                className={`header-cart-btn ${cartDropdownOpen ? "open" : ""}`}
                aria-label={t.nav.cart}
                onClick={() => setCartDropdownOpen(false)}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {totalItems > 0 && <span className="header-cart-badge">{totalItems}</span>}
              </Link>

              {cartDropdownOpen && (
                <div className="header-cart-dropdown">
                  <div className="cart-preview-header">
                    <span className="cart-preview-title">{lang === "en" ? "Shopping Cart" : "Giỏ hàng của bạn"}</span>
                    <span className="cart-preview-count">
                      {totalItems} {lang === "en" ? (totalItems === 1 ? "item" : "items") : "sản phẩm"}
                    </span>
                  </div>

                  {items.length === 0 ? (
                    <div className="cart-preview-empty">
                      <p className="cart-empty-text">{lang === "en" ? "Your cart is currently empty" : "Giỏ hàng hiện đang trống"}</p>
                      <Link
                        href="/products"
                        onClick={() => setCartDropdownOpen(false)}
                        className="cart-preview-explore-btn"
                      >
                        {lang === "en" ? "Explore Equipment" : "Khám phá thiết bị"}
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="cart-preview-items-list">
                        {items.slice(0, 3).map((item) => {
                          const rawImg = item.image_url || "";
                          const resolvedImg = !rawImg.trim()
                            ? "/images/placeholder.png"
                            : rawImg.startsWith("http://") || rawImg.startsWith("https://") || rawImg.startsWith("data:") || rawImg.startsWith("blob:")
                            ? rawImg
                            : rawImg.startsWith("/")
                            ? rawImg
                            : `/${rawImg}`;

                          return (
                            <Link
                              key={item.product_id}
                              href={`/products/${item.slug}`}
                              onClick={() => setCartDropdownOpen(false)}
                              className="cart-preview-item-row"
                            >
                              <div className="cart-preview-item-thumb">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={resolvedImg}
                                  alt={item.name}
                                  className="cart-preview-thumb-img"
                                  onError={(e) => {
                                    const target = e.currentTarget as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = "/images/logo.png";
                                  }}
                                />
                              </div>
                              <div className="cart-preview-item-info">
                                <h5 className="cart-preview-item-name">{item.name}</h5>
                                <div className="cart-preview-item-meta">
                                  <span className="cart-preview-item-qty">x{item.quantity}</span>
                                  <span className="cart-preview-item-price">
                                    {lang === "en"
                                      ? new Intl.NumberFormat("en-US").format(item.sale_price * item.quantity) + "₫"
                                      : (item.sale_price * item.quantity).toLocaleString("vi-VN") + "₫"}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                        {items.length > 3 && (
                          <div className="cart-preview-more-count">
                            +{items.length - 3} {lang === "en" ? "other items in cart" : "sản phẩm khác trong giỏ"}
                          </div>
                        )}
                      </div>

                      <div className="cart-preview-footer">
                        <div className="cart-preview-subtotal-row">
                          <span>{lang === "en" ? "Subtotal:" : "Tạm tính:"}</span>
                          <strong className="cart-preview-subtotal-price">
                            {lang === "en"
                              ? new Intl.NumberFormat("en-US").format(subtotal) + "₫"
                              : subtotal.toLocaleString("vi-VN") + "₫"}
                          </strong>
                        </div>
                        <div className="cart-preview-action-buttons">
                          <Link
                            href="/cart"
                            onClick={() => setCartDropdownOpen(false)}
                            className="cart-preview-view-btn"
                          >
                            {lang === "en" ? "View Cart" : "Xem giỏ hàng"}
                          </Link>
                          <Link
                            href="/cart"
                            onClick={() => setCartDropdownOpen(false)}
                            className="cart-preview-checkout-btn"
                          >
                            {lang === "en" ? "Checkout" : "Thanh toán"}
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

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

        {/* Services 4-Column Obsidian Glass Mega Menu */}
        {isServicesMenuOpen && (
          <div
            className="header-services-dropdown"
            onMouseEnter={handleOpenServicesMenu}
            onMouseLeave={handleCloseServicesMenu}
          >
            {/* Header Bar */}
            <div className="services-dropdown-header">
              <div className="services-dropdown-title-wrap">
                <div className="services-dropdown-eyebrow-row">
                  <span className="services-dropdown-indicator-dot" />
                  <span className="services-dropdown-eyebrow">DỊCH VỤ</span>
                </div>
                <span className="services-dropdown-heading">
                  {lang === "en" ? "VanBass Service Ecosystem" : "Hệ sinh thái dịch vụ VanBass"}
                </span>
                <span className="services-dropdown-subtext">
                  {lang === "en" ? "Equipment, engineering, academy & event production." : "Thiết bị, kỹ thuật, đào tạo và giải pháp sự kiện."}
                </span>
              </div>
              <Link
                href="/dich-vu"
                onClick={() => closeAllMenusImmediately()}
                className="services-dropdown-all-link"
              >
                <span>{lang === "en" ? "All Services →" : "Xem tất cả dịch vụ →"}</span>
              </Link>
            </div>

            {/* 4-Column Layout */}
            <div className="services-dropdown-4col-grid">
              {/* Column 1: THUÊ THIẾT BỊ */}
              <div className="services-col">
                <div className="services-col-header">
                  <span className="services-col-title">
                    {lang === "en" ? "EQUIPMENT RENTAL" : "THUÊ THIẾT BỊ"}
                  </span>
                  <div className="services-col-line" />
                </div>
                <div className="services-col-items">
                  <Link
                    href="/thue-ban-dj"
                    onClick={() => closeAllMenusImmediately()}
                    className="service-card-item"
                  >
                    <div className="service-card-thumb">
                      <Image
                        src="/images/rental/rental_fleet_hero.jpg"
                        alt="Thuê Bàn DJ"
                        width={44}
                        height={44}
                        className="service-card-img"
                      />
                    </div>
                    <div className="service-card-body">
                      <div className="service-card-name">
                        <span>{lang === "en" ? "DJ Gear & Equipment Rental" : "Thuê Bàn DJ & Thiết BỊ"}</span>
                        <span className="service-card-arrow">→</span>
                      </div>
                      <div className="service-card-desc">
                        {lang === "en" ? "Quality equipment for live shows & events" : "Thiết bị chất lượng cho show diễn và sự kiện"}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Column 2: TRUNG TÂM KỸ THUẬT */}
              <div className="services-col">
                <div className="services-col-header">
                  <span className="services-col-title">
                    {lang === "en" ? "TECHNICAL CENTER" : "TRUNG TÂM KỸ THUẬT"}
                  </span>
                  <div className="services-col-line" />
                </div>
                <div className="services-col-items">
                  <Link
                    href="/sua-chua-ban-dj"
                    onClick={() => closeAllMenusImmediately()}
                    className="service-card-item"
                  >
                    <div className="service-card-thumb">
                      <Image
                        src="/images/repair/dj_repair_hero.jpg"
                        alt="Sửa Chữa DJ"
                        width={44}
                        height={44}
                        className="service-card-img"
                      />
                    </div>
                    <div className="service-card-body">
                      <div className="service-card-name">
                        <span>{lang === "en" ? "DJ Repair & Maintenance" : "Sửa Chữa & Bảo Dưỡng DJ"}</span>
                        <span className="service-card-arrow">→</span>
                      </div>
                      <div className="service-card-desc">
                        {lang === "en" ? "Diagnostics, repair and maintenance for DJ gear" : "Kiểm tra, sửa chữa và bảo dưỡng thiết bị DJ"}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Column 3: ĐÀO TẠO */}
              <div className="services-col">
                <div className="services-col-header">
                  <span className="services-col-title">
                    {lang === "en" ? "ACADEMY" : "ĐÀO TẠO"}
                  </span>
                  <div className="services-col-line" />
                </div>
                <div className="services-col-items">
                  <Link
                    href="/dao-tao-dj"
                    onClick={() => closeAllMenusImmediately()}
                    className="service-card-item"
                  >
                    <div className="service-card-thumb">
                      <Image
                        src="/images/services/dj_academy_hero.jpg"
                        alt="Đào Tạo DJ"
                        width={44}
                        height={44}
                        className="service-card-img"
                      />
                    </div>
                    <div className="service-card-body">
                      <div className="service-card-name">
                        <span>{lang === "en" ? "Practical DJ Training" : "Đào Tạo DJ Thực Hành"}</span>
                        <span className="service-card-arrow">→</span>
                      </div>
                      <div className="service-card-desc">
                        {lang === "en" ? "Hands-on DJ coaching from basics to live sets" : "Học DJ thực hành từ cơ bản đến biểu diễn"}
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/dao-tao-mc-hype"
                    onClick={() => closeAllMenusImmediately()}
                    className="service-card-item"
                  >
                    <div className="service-card-thumb">
                      <Image
                        src="/images/services/mc_hype_hero.jpg"
                        alt="Đào Tạo MC Hype"
                        width={44}
                        height={44}
                        className="service-card-img"
                      />
                    </div>
                    <div className="service-card-body">
                      <div className="service-card-name">
                        <span>{lang === "en" ? "MC & Event Hype Training" : "Đào Tạo MC / Hype Sự Kiện"}</span>
                        <span className="service-card-arrow">→</span>
                      </div>
                      <div className="service-card-desc">
                        {lang === "en" ? "Stage skills, interaction and hosting mastery" : "Kỹ năng sân khấu, tương tác và dẫn sự kiện"}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Column 4: SỰ KIỆN */}
              <div className="services-col">
                <div className="services-col-header">
                  <span className="services-col-title">
                    {lang === "en" ? "EVENTS" : "SỰ KIỆN"}
                  </span>
                  <div className="services-col-line" />
                </div>
                <div className="services-col-items">
                  <Link
                    href="/su-kien-setup"
                    onClick={() => closeAllMenusImmediately()}
                    className="service-card-item"
                  >
                    <div className="service-card-thumb">
                      <Image
                        src="/images/services/event_setup_hero.jpg"
                        alt="Setup Sự Kiện"
                        width={44}
                        height={44}
                        className="service-card-img"
                      />
                    </div>
                    <div className="service-card-body">
                      <div className="service-card-name">
                        <span>{lang === "en" ? "Audio & DJ Event Setup" : "Setup Âm Thanh & DJ Sự Kiện"}</span>
                        <span className="service-card-arrow">→</span>
                      </div>
                      <div className="service-card-desc">
                        {lang === "en" ? "Equipment & engineering solutions for events" : "Giải pháp thiết bị và kỹ thuật cho sự kiện"}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2-Tier Obsidian Glass Mega Menu Dropdown */}
        {isProductsMenuOpen && (
          <div
            className="header-megamenu-dropdown"
            onMouseEnter={handleOpenMegaMenu}
            onMouseLeave={handleCloseMegaMenu}
          >
            {/* Left Column: 4 Parent Category Groups */}
            <div className="megamenu-left-col">
              <div className="megamenu-section-title">
                {lang === "en" ? "CATALOGUE" : "DANH MỤC THIẾT BỊ"}
              </div>

              <div className="megamenu-parent-list">
                {CATEGORY_GROUPS.map((group) => {
                  const isActive = activeMegaGroupId === group.id;
                  return (
                    <div
                      key={group.id}
                      onMouseEnter={() => {
                        handleOpenMegaMenu();
                        setActiveMegaGroupId(group.id);
                      }}
                      className={`megamenu-parent-row ${isActive ? "is-active" : ""}`}
                    >
                      <Link
                        href={`/products?group=${group.id}`}
                        onClick={() => closeAllMenusImmediately()}
                        className="megamenu-parent-link"
                      >
                        <div className="megamenu-parent-meta">
                          <span className="megamenu-parent-name">
                            {lang === "en" ? group.nameEn : group.nameVi}
                          </span>
                          <span className="megamenu-parent-subcount">
                            {group.subcategories.length} {lang === "en" ? "categories" : "danh mục"}
                          </span>
                        </div>
                        <span className="megamenu-chevron">›</span>
                      </Link>
                    </div>
                  );
                })}
              </div>

              <div className="megamenu-left-footer">
                <Link
                  href="/products"
                  onClick={() => closeAllMenusImmediately()}
                  className="megamenu-all-link"
                >
                  <span>{lang === "en" ? "Explore All Equipment →" : "Xem tất cả thiết bị →"}</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Subcategories Grid */}
            <div className="megamenu-right-col">
              <div className="megamenu-right-header">
                <div className="megamenu-header-badge">
                  {lang === "en" ? selectedMegaGroup.nameEn : selectedMegaGroup.nameVi}
                </div>
                <Link
                  href={`/products?group=${selectedMegaGroup.id}`}
                  onClick={() => closeAllMenusImmediately()}
                  className="megamenu-group-view-all"
                >
                  {lang === "en" ? "View group archive →" : "Xem toàn bộ nhóm →"}
                </Link>
              </div>

              <div className="megamenu-sub-grid">
                {selectedMegaGroup.subcategories.map((sub) => (
                  <Link
                    key={sub.slug}
                    href={`/products?category=${sub.slug}`}
                    onClick={() => closeAllMenusImmediately()}
                    className="megamenu-sub-card"
                  >
                    <span className="megamenu-sub-bullet" />
                    <span className="megamenu-sub-title">
                      {lang === "en" ? sub.nameEn : sub.nameVi}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Mega Menu Featured Showcase Card */}
              <div className="megamenu-showcase-card">
                <div className="megamenu-showcase-info">
                  <div className="megamenu-showcase-tag">VanBass Pro Audio</div>
                  <div className="megamenu-showcase-title">
                    {lang === "en" ? "Official Audio Equipment & Systems" : "Thiết Bị Âm Thanh Chính Hãng & Cho Thuê"}
                  </div>
                  <div className="megamenu-showcase-desc">
                    {lang === "en" ? "100% Genuine • 12 Months Warranty • Da Nang Delivery" : "Bảo hành 12 tháng • Giao lắp tận nơi tại Đà Nẵng"}
                  </div>
                </div>
                <Link
                  href="/products"
                  onClick={() => closeAllMenusImmediately()}
                  className="megamenu-showcase-cta"
                >
                  {lang === "en" ? "Explore Catalog →" : "Khám phá ngay →"}
                </Link>
              </div>
            </div>
          </div>
        )}

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
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  overflowX: "auto",
                  paddingBottom: "4px",
                  marginTop: "10px",
                  scrollbarWidth: "none",
                }}
              >
                {[
                  { label: "RX3", link: "/products/xdj-rx3" },
                  { label: "FLX4", link: "/products/ddj-flx4" },
                  { label: "Omnis-Duo", link: "/products/omnis-duo" },
                  { label: "XDJ-AZ", link: "/products/xdj-az" },
                  { label: "RX2", link: "/products/xdj-rx2" },
                  { label: "RR", link: "/products/xdj-rr" },
                  { label: "FLX2", link: "/products/ddj-flx2" },
                  { label: "XDJ-AN", link: "/products/xdj-an" },
                ].map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.link}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      whiteSpace: "nowrap",
                      padding: "4px 10px",
                      borderRadius: "14px",
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      fontSize: "11px",
                      color: "#e4e4e7",
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mobile-drawer-links">
              {navLinks.map((link) => {
                const isCurrent = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

                if (link.isServicesMega) {
                  return (
                    <div key={link.href} className="mobile-mega-accordion-wrap">
                      <div className="mobile-mega-header-row">
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`mobile-nav-link ${isCurrent ? "active" : ""}`}
                          style={{ flex: 1 }}
                        >
                          <span>{link.label}</span>
                          {isCurrent && <span className="mobile-active-dot" />}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobileServicesAccordionOpen(!mobileServicesAccordionOpen)}
                          className="mobile-accordion-toggle-btn"
                          aria-label="Toggle services"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            style={{
                              transition: "transform 0.2s ease",
                              transform: mobileServicesAccordionOpen ? "rotate(180deg)" : "rotate(0deg)",
                            }}
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>
                      </div>

                      {mobileServicesAccordionOpen && (
                        <div className="mobile-groups-container">
                          <div className="mobile-service-group-title">{lang === "en" ? "Equipment Rental" : "Thuê Thiết Bị"}</div>
                          <Link
                            href="/thue-ban-dj"
                            onClick={() => setMobileMenuOpen(false)}
                            className="mobile-service-item"
                          >
                            <span>{lang === "en" ? "DJ Gear & Equipment Rental" : "Thuê Bàn DJ & Thiết Bị"}</span>
                            <span style={{ fontSize: "11px", color: "#71717a" }}>/thue-ban-dj</span>
                          </Link>

                          <div className="mobile-service-group-title">{lang === "en" ? "Technical Center" : "Trung Tâm Kỹ Thuật"}</div>
                          <Link
                            href="/sua-chua-ban-dj"
                            onClick={() => setMobileMenuOpen(false)}
                            className="mobile-service-item"
                          >
                            <span>{lang === "en" ? "DJ Repair & Maintenance" : "Sửa Chữa & Bảo Dưỡng DJ"}</span>
                            <span style={{ fontSize: "11px", color: "#71717a" }}>/sua-chua-ban-dj</span>
                          </Link>

                          <div className="mobile-service-group-title">{lang === "en" ? "Academy" : "Đào Tạo"}</div>
                          <Link
                            href="/dao-tao-dj"
                            onClick={() => setMobileMenuOpen(false)}
                            className="mobile-service-item"
                          >
                            <span>{lang === "en" ? "Practical DJ Training" : "Đào Tạo DJ Thực Hành"}</span>
                            <span style={{ fontSize: "11px", color: "#71717a" }}>/dao-tao-dj</span>
                          </Link>
                          <Link
                            href="/dao-tao-mc-hype"
                            onClick={() => setMobileMenuOpen(false)}
                            className="mobile-service-item"
                          >
                            <span>{lang === "en" ? "MC & Event Hype Training" : "Đào Tạo MC / Hype Sự Kiện"}</span>
                            <span style={{ fontSize: "11px", color: "#71717a" }}>/dao-tao-mc-hype</span>
                          </Link>

                          <div className="mobile-service-group-title">{lang === "en" ? "Events" : "SỰ KIỆN"}</div>
                          <Link
                            href="/su-kien-setup"
                            onClick={() => setMobileMenuOpen(false)}
                            className="mobile-service-item"
                          >
                            <span>{lang === "en" ? "Audio & DJ Event Setup" : "Setup Âm Thanh & DJ Sự Kiện"}</span>
                            <span style={{ fontSize: "11px", color: "#71717a" }}>/su-kien-setup</span>
                          </Link>

                          <Link
                            href="/dich-vu"
                            onClick={() => setMobileMenuOpen(false)}
                            className="mobile-service-hub-link"
                          >
                            {lang === "en" ? "All Services →" : "Xem tất cả dịch vụ →"}
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                }

                if (link.isMega) {
                  return (
                    <div key={link.href} className="mobile-mega-accordion-wrap">
                      <div className="mobile-mega-header-row">
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`mobile-nav-link ${isCurrent ? "active" : ""}`}
                          style={{ flex: 1 }}
                        >
                          <span>{link.label}</span>
                          {isCurrent && <span className="mobile-active-dot" />}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobileCatAccordionOpen(!mobileCatAccordionOpen)}
                          className="mobile-accordion-toggle-btn"
                          aria-label="Toggle categories"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            style={{
                              transition: "transform 0.2s ease",
                              transform: mobileCatAccordionOpen ? "rotate(180deg)" : "rotate(0deg)",
                            }}
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>
                      </div>

                      {/* Expanded Mobile Category Groups */}
                      {mobileCatAccordionOpen && (
                        <div className="mobile-groups-container">
                          {CATEGORY_GROUPS.map((group) => {
                            const isGroupOpen = mobileActiveGroupId === group.id;
                            return (
                              <div key={group.id} className="mobile-group-block">
                                <div className="mobile-group-header">
                                  <Link
                                    href={`/products?group=${group.id}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="mobile-group-title-link"
                                  >
                                    <span>{lang === "en" ? group.nameEn : group.nameVi}</span>
                                  </Link>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setMobileActiveGroupId(isGroupOpen ? null : group.id)
                                    }
                                    className="mobile-subgroup-toggle"
                                  >
                                    {isGroupOpen ? "−" : "+"}
                                  </button>
                                </div>

                                {isGroupOpen && (
                                  <div className="mobile-sub-list">
                                    {group.subcategories.map((sub) => (
                                      <Link
                                        key={sub.slug}
                                        href={`/products?category=${sub.slug}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="mobile-sub-item"
                                      >
                                        • {lang === "en" ? sub.nameEn : sub.nameVi}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`mobile-nav-link ${isCurrent ? "active" : ""}`}
                    data-cms-key={link.cmsKey}
                    data-cms-label={link.cmsLabel}
                    data-cms-type="text"
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
                    <span>{t.nav.adminPanel}</span>
                  </Link>
                )}
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-user-link"
                >
                  <span>{t.nav.profile} ({user?.full_name || user?.email})</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                    router.push("/");
                  }}
                  className="mobile-logout-btn"
                >
                  <span>{t.nav.logout}</span>
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