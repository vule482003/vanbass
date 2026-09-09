"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "../lib/cart-context";
import { useAuth } from "../lib/auth-context";
import { useLanguage } from "../lib/language-context";
import { CATEGORY_GROUPS } from "../lib/category-hierarchy";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { totalItems } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { t, lang } = useLanguage();

  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);

  // Close sheet on route change
  useEffect(() => {
    setIsCategorySheetOpen(false);
  }, [pathname]);

  // Don't render on Admin dashboard
  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  const isHomeActive = pathname === "/";
  const isProductsActive = pathname.startsWith("/products") || isCategorySheetOpen;
  const isDjRentalActive = pathname.startsWith("/thue-ban-dj");
  const isCartActive = pathname.startsWith("/cart") || pathname.startsWith("/checkout");
  const isAccountActive = pathname.startsWith("/profile") || pathname.startsWith("/login") || pathname.startsWith("/register");

  return (
    <>
      {/* 1. Fixed Bottom Navigation Bar (Mobile Only <= 768px) */}
      <nav className="mobile-bottom-nav" aria-label="Mobile navigation bar">
        {/* Tab 1: Home */}
        <Link
          href="/"
          className={`mobile-nav-tab ${isHomeActive && !isCategorySheetOpen ? "active" : ""}`}
          aria-label={t.nav.home}
        >
          <div className="mobile-nav-icon-wrap">
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className="mobile-nav-label">{t.nav.home}</span>
        </Link>

        {/* Tab 2: Categories (Opens Drawer Sheet) */}
        <button
          type="button"
          onClick={() => setIsCategorySheetOpen(!isCategorySheetOpen)}
          className={`mobile-nav-tab ${isProductsActive ? "active" : ""}`}
          aria-label={lang === "en" ? "Categories" : "Danh mục"}
          aria-expanded={isCategorySheetOpen}
        >
          <div className="mobile-nav-icon-wrap">
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
            </svg>
          </div>
          <span className="mobile-nav-label">{lang === "en" ? "Categories" : "Danh mục"}</span>
        </button>

        {/* Tab 3: DJ Rental */}
        <Link
          href="/thue-ban-dj"
          className={`mobile-nav-tab ${isDjRentalActive ? "active" : ""}`}
          aria-label={lang === "en" ? "DJ Rental" : "Thuê DJ"}
        >
          <div className="mobile-nav-icon-wrap dj-tab-highlight">
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2a10 10 0 0 0-4 1" />
            </svg>
          </div>
          <span className="mobile-nav-label">{lang === "en" ? "DJ Rental" : "Thuê Bàn DJ"}</span>
        </Link>

        {/* Tab 4: Cart */}
        <Link
          href="/cart"
          className={`mobile-nav-tab ${isCartActive ? "active" : ""}`}
          aria-label={t.nav.cart}
        >
          <div className="mobile-nav-icon-wrap">
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {totalItems > 0 && (
              <span className="mobile-nav-cart-badge">{totalItems}</span>
            )}
          </div>
          <span className="mobile-nav-label">{t.nav.cart}</span>
        </Link>

        {/* Tab 5: Account */}
        <Link
          href={
            isAuthenticated
              ? user?.role === "admin" || user?.role === "staff"
                ? "/admin"
                : "/profile"
              : "/login"
          }
          className={`mobile-nav-tab ${isAccountActive ? "active" : ""}`}
          aria-label={t.nav.profile}
        >
          <div className="mobile-nav-icon-wrap">
            {isAuthenticated ? (
              <span className="mobile-nav-user-avatar">
                {user?.full_name?.charAt(0).toUpperCase() || user?.email.charAt(0).toUpperCase() || "U"}
              </span>
            ) : (
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            )}
          </div>
          <span className="mobile-nav-label">
            {isAuthenticated ? (lang === "en" ? "Account" : "Tài khoản") : t.nav.login}
          </span>
        </Link>
      </nav>

      {/* 2. Mobile Bottom Category Sheet Drawer */}
      {isCategorySheetOpen && (
        <div className="mobile-category-overlay" onClick={() => setIsCategorySheetOpen(false)}>
          <div
            className="mobile-category-sheet"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Danh mục thiết bị"
          >
            {/* Sheet Handle */}
            <div className="mobile-sheet-drag-handle" />

            {/* Sheet Header */}
            <div className="mobile-sheet-header">
              <div>
                <h3 className="mobile-sheet-title">
                  {lang === "en" ? "Audio Equipment Catalog" : "Danh Mục Thiết Bị"}
                </h3>
                <p className="mobile-sheet-subtitle">
                  {lang === "en" ? "Select category to explore 700+ pro items" : "Chọn nhóm danh mục để khám phá 700+ thiết bị"}
                </p>
              </div>
              <button
                type="button"
                className="mobile-sheet-close-btn"
                onClick={() => setIsCategorySheetOpen(false)}
                aria-label="Đóng"
              >
                ✕
              </button>
            </div>

            {/* Parent Group Tabs */}
            <div className="mobile-sheet-group-tabs">
              {CATEGORY_GROUPS.map((group, idx) => {
                const isSelected = activeGroupIndex === idx;
                return (
                  <button
                    key={group.id}
                    type="button"
                    className={`mobile-sheet-tab-btn ${isSelected ? "is-selected" : ""}`}
                    onClick={() => setActiveGroupIndex(idx)}
                  >
                    {lang === "en" ? group.nameEn : group.nameVi}
                    <span className="mobile-sheet-tab-count">{group.subcategories.length}</span>
                  </button>
                );
              })}
            </div>

            {/* Subcategories List */}
            <div className="mobile-sheet-sub-list">
              {CATEGORY_GROUPS[activeGroupIndex]?.subcategories.map((sub) => (
                <button
                  key={sub.slug}
                  type="button"
                  className="mobile-sheet-sub-item"
                  onClick={() => {
                    setIsCategorySheetOpen(false);
                    router.push(`/products?category=${sub.slug}`);
                  }}
                >
                  <span className="mobile-sheet-sub-dot" />
                  <span className="mobile-sheet-sub-name">{lang === "en" ? sub.nameEn : sub.nameVi}</span>
                  <span className="mobile-sheet-sub-arrow">→</span>
                </button>
              ))}
            </div>

            {/* Sheet Footer Action */}
            <div className="mobile-sheet-footer">
              <Link
                href={`/products?group=${CATEGORY_GROUPS[activeGroupIndex]?.id}`}
                onClick={() => setIsCategorySheetOpen(false)}
                className="mobile-sheet-all-btn"
              >
                {lang === "en"
                  ? `Explore all in ${CATEGORY_GROUPS[activeGroupIndex]?.nameEn} →`
                  : `Xem toàn bộ ${CATEGORY_GROUPS[activeGroupIndex]?.nameVi} →`}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
