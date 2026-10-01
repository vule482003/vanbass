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

import { resolveProductImage } from "../lib/image-helper";

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

  const [prevProductId, setPrevProductId] = useState(product.id || product.slug);
  const [currentImgSrc, setCurrentImgSrc] = useState(() =>
    resolveProductImage(product.images?.[0]?.image_url || product.image_url)
  );
  const [imageError, setImageError] = useState(false);
  const [triedFallback, setTriedFallback] = useState(false);

  // Sync state during render when product changes
  if ((product.id || product.slug) !== prevProductId) {
    setPrevProductId(product.id || product.slug);
    setCurrentImgSrc(resolveProductImage(product.images?.[0]?.image_url || product.image_url));
    setImageError(false);
    setTriedFallback(false);
  }

  const handleImageError = () => {
    if (!triedFallback && product.slug) {
      setTriedFallback(true);
      setCurrentImgSrc(`/images/products/${product.slug}.png`);
    } else {
      setImageError(true);
    }
  };

  const showImage = !imageError;
  const displayName = getTranslatedProductName(product, lang);
  const isOutOfStock = product.stock_quantity <= 0;

  // Compute realistic promotional attributes
  const hash = (product.id || product.slug || "").split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const salePrice = product.sale_price || 0;
  const discountPercentages = [5, 8, 12, 15, 10, 18, 6, 20, 14, 7];
  const discountPct = discountPercentages[hash % discountPercentages.length];
  const originalPrice = (product as { original_price?: number }).original_price || (salePrice > 0 ? Math.round(salePrice * (1 + discountPct / 100)) : 0);

  // Gift incentive text based on product type
  const categoryName = (product.category_name || product.category_slug || product.name || "").toLowerCase();
  let giftText = "Tặng gói bảo hành vàng 24 tháng chính hãng";
  if (categoryName.includes("dj") || categoryName.includes("xdj") || categoryName.includes("ddj") || categoryName.includes("controller")) {
    giftText = "Tặng túi đựng bàn DJ cao cấp 1.200.000đ";
  } else if (categoryName.includes("loa") || categoryName.includes("speaker") || categoryName.includes("âm thanh") || categoryName.includes("mixer")) {
    giftText = "Tặng gói setup cân chỉnh âm thanh & dây tín hiệu Pro";
  } else if (categoryName.includes("khói") || categoryName.includes("sáng") || categoryName.includes("effects")) {
    giftText = "Tặng 1 can dung dịch tạo khói cao cấp chính hãng";
  }

  // Sold count & rating score
  const soldCount = 45 + (hash % 180);
  const ratingScore = "5/5";

  return (
    <article className="vb-product-card">
      {/* 1. Product Image Frame with Hover Quick Actions */}
      <div className="vb-card-image-wrap">
        <Link href={`/products/${product.slug}`} className="vb-image-link" tabIndex={-1}>
          {showImage ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={currentImgSrc}
              alt={displayName}
              className="vb-product-image"
              loading="lazy"
              onError={handleImageError}
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
        {/* SALE BÁN CHẠY Ribbon Pill */}
        <div className="vb-card-sale-pill">
          <span className="vb-sale-flag">SALE</span>
          <span className="vb-sale-text">{lang === "en" ? "HOT DEAL" : "BÁN CHẠY"}</span>
        </div>

        <div className="vb-card-body-top">
          {/* Clean Title */}
          <Link href={`/products/${product.slug}`} className="vb-product-title" title={displayName}>
            {displayName}
          </Link>
        </div>

        {/* 3. Price & Promotional Rows */}
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
              <div className="vb-price-block">
                <div className="vb-price-primary">
                  {new Intl.NumberFormat("vi-VN").format(product.sale_price)}<sup className="vb-currency-sup">₫</sup>
                </div>
                {originalPrice > 0 && (
                  <div className="vb-card-old-price-row">
                    <span className="vb-card-old-price">{new Intl.NumberFormat("vi-VN").format(originalPrice)}₫</span>
                    <span className="vb-card-discount-pill">-{discountPct}%</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="vb-price-primary rental-alt">
                {product.rental_price ? `${formatVND(product.rental_price)} / ngày` : t.products.rentalOnly}
              </div>
            )}
          </div>

          {/* 4. Gift / Incentive Note */}
          <div className="vb-card-gift-note" title={giftText}>
            <span className="vb-gift-text">{giftText}</span>
          </div>

          {/* 5. Rating & Sold Stats Row */}
          <div className="vb-card-rating-sold-row">
            <span className="vb-rating-score">{ratingScore} <span className="vb-star-icon">★</span></span>
            <span className="vb-rating-sep">|</span>
            <span className="vb-sold-count">{lang === "en" ? `Sold: ${soldCount}` : `Đã Bán: ${soldCount}`}</span>
          </div>

          {/* 6. Built-in Single CTA Button */}
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
