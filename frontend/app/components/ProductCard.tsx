"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "../lib/types";
import { useCart } from "../lib/cart-context";
import { useAuth } from "../lib/auth-context";
import { useLanguage } from "../lib/language-context";
import { getMessengerRentalUrl } from "../lib/api";
import { getTranslatedProductName } from "../lib/product-i18n";

interface ProductCardProps {
  product: Product;
  currentMode?: "all" | "sale" | "rental";
  onQuickView?: (product: Product) => void;
  isCompared?: boolean;
  onToggleCompare?: (product: Product) => void;
}

export default function ProductCard({
  product,
  currentMode = "all",
  onQuickView,
  isCompared = false,
  onToggleCompare,
}: ProductCardProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const { t, lang } = useLanguage();
  const [imageError, setImageError] = useState(false);

  function formatVND(amount?: number | null) {
    if (amount === undefined || amount === null) return t.products.contactPrice;
    return new Intl.NumberFormat(lang === "en" ? "en-US" : "vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      const redirectUrl = typeof window !== "undefined" ? window.location.pathname : "/products";
      router.push(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
      return;
    }

    addItem(product);
  };

  const handleRentProduct = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const resolveImageUrl = (url?: string) => {
    if (!url) return null;
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) return url;
    if (url.startsWith("/images/")) return url;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
    const backendBase = apiUrl.replace(/\/api\/?$/, "");
    return `${backendBase}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const rawImage = product.images?.[0]?.image_url || product.image_url;
  const primaryImage = resolveImageUrl(rawImage);
  const showImage = Boolean(primaryImage && !imageError);
  const displayName = getTranslatedProductName(product, lang);
  const isOutOfStock = product.stock_quantity <= 0;

  return (
    <article className="vb-product-card">
      {/* 1. Product Image Frame with Hover Quick Actions */}
      <div className="vb-card-image-wrap">
        <Link href={`/products/${product.slug}`} className="vb-image-link" tabIndex={-1}>
          {showImage ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={primaryImage!}
              alt={displayName}
              className="vb-product-image"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="product-image-fallback">
              <div className="product-silhouette">
                <div className="product-wheel" />
                <div className="product-faders">
                  <i />
                  <i />
                </div>
                <div className="product-wheel" />
              </div>
            </div>
          )}
        </Link>

        {/* Minimalist Top Status Badge */}
        {isOutOfStock ? (
          <span className="vb-card-badge soldout">{t.products.outOfStock}</span>
        ) : currentMode === "rental" || (!product.sale_enabled && product.rental_enabled) ? (
          <span className="vb-card-badge rental">{t.products.rentBtnShort}</span>
        ) : null}

        {/* Floating Quick Action Icons (Appear on Card Hover) */}
        <div className="vb-card-quick-actions">
          {onQuickView && (
            <button
              type="button"
              className="vb-quick-action-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              title={t.products.quickView}
              aria-label={t.products.quickView}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          )}

          {onToggleCompare && (
            <button
              type="button"
              className={`vb-quick-action-btn ${isCompared ? "active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleCompare(product);
              }}
              title={isCompared ? t.products.compared : t.products.compare}
              aria-label={isCompared ? t.products.compared : t.products.compare}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 3h5v5" />
                <path d="M4 20L21 3" />
                <path d="M21 16v5h-5" />
                <path d="M15 15l6 6" />
                <path d="M4 4l5 5" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* 2. Card Content Body */}
      <div className="vb-card-body">
        <div className="vb-card-body-top">
          {/* Subtle Brand Tag */}
          <div className="vb-card-brand">
            {product.brand || "VanBass Audio"}
          </div>

          {/* Clean Title */}
          <Link href={`/products/${product.slug}`} className="vb-product-title" title={displayName}>
            {displayName}
          </Link>
        </div>

        {/* 3. Price & Built-in Action Row */}
        <div className="vb-card-body-bottom">
          <div className="vb-price-container">
            {currentMode === "rental" ? (
              product.rental_enabled && product.rental_price ? (
                <div className="vb-price-primary rental">
                  {formatVND(product.rental_price)}
                  <span className="vb-price-unit">{t.products.perDay}</span>
                </div>
              ) : (
                <div className="vb-price-contact">{t.products.rentalQuoteContact}</div>
              )
            ) : product.sale_enabled && product.sale_price ? (
              <div className="vb-price-primary">
                <span className="vb-currency-sym">₫</span>
                {new Intl.NumberFormat("vi-VN").format(product.sale_price)}
              </div>
            ) : (
              <div className="vb-price-primary rental-alt">
                {product.rental_price ? `${formatVND(product.rental_price)} / ngày` : t.products.rentalOnly}
              </div>
            )}
          </div>

          {/* Built-in Single CTA Button */}
          {currentMode === "rental" || (!product.sale_enabled && product.rental_enabled) ? (
            <a
              href={getMessengerRentalUrl(displayName)}
              target="_blank"
              rel="noopener noreferrer"
              className="vb-card-cta-btn rental"
              onClick={handleRentProduct}
              title={t.products.rentNowBtn}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>{t.products.rentNowBtn}</span>
            </a>
          ) : isOutOfStock ? (
            <button
              type="button"
              className="vb-card-cta-btn disabled"
              disabled
              title={t.products.outOfStock}
            >
              {t.products.outOfStock}
            </button>
          ) : (
            <button
              type="button"
              className="vb-card-cta-btn cart"
              onClick={handleAddToCart}
              title={t.products.addToCart}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span>{t.products.addToCart}</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
