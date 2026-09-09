"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "../lib/types";
import { useLanguage } from "../lib/language-context";
import { getMessengerRentalUrl } from "../lib/api";

interface StickyProductActionBarProps {
  product: Product;
  displayName: string;
  quantity: number;
  onQuantityChange: (q: number) => void;
  onAddToCart: () => void;
  addedNotice: boolean;
  facebookPageId?: string;
  targetRef?: React.RefObject<HTMLDivElement | null>;
}

function formatCurrency(amount?: number | null, lang: "vi" | "en" = "vi") {
  if (amount === undefined || amount === null) return lang === "en" ? "Contact" : "Liên hệ";
  return new Intl.NumberFormat(lang === "en" ? "en-US" : "vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export default function StickyProductActionBar({
  product,
  displayName,
  quantity,
  onQuantityChange,
  onAddToCart,
  addedNotice,
  facebookPageId = "vanbassmusiccenter",
  targetRef,
}: StickyProductActionBarProps) {
  const { t, lang } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  // Safe Image Resolver
  const resolvedImg = React.useMemo(() => {
    const raw = product.images?.[0]?.image_url || product.image_url;
    if (!raw) return null;
    if (raw.startsWith("http://") || raw.startsWith("https://") || raw.startsWith("data:")) return raw;
    if (raw.startsWith("/images/")) return raw;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
    const backendBase = apiUrl.replace(/\/api\/?$/, "");
    return `${backendBase}${raw.startsWith("/") ? "" : "/"}${raw}`;
  }, [product]);

  // Observer to toggle visibility when the top purchase box scrolls out of view
  useEffect(() => {
    const handleScroll = () => {
      if (targetRef?.current) {
        const rect = targetRef.current.getBoundingClientRect();
        // Show sticky bar when the bottom of hero box is above the viewport top + 100px
        setIsVisible(rect.bottom < 100);
      } else {
        // Fallback: show after scrolling 450px
        setIsVisible(window.scrollY > 450);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [targetRef]);

  if (!isVisible) return null;

  return (
    <aside
      className={`sticky-action-bar-container ${isVisible ? "is-visible" : ""}`}
      aria-label="Thanh mua nhanh cố định"
    >
      <div className="sticky-action-bar-inner">
        {/* Left: Mini Thumbnail + Product Info */}
        <div className="sticky-prod-info">
          {resolvedImg ? (
            <div className="sticky-thumb-box">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={resolvedImg} alt={displayName} className="sticky-thumb-img" />
            </div>
          ) : (
            <div className="sticky-thumb-box placeholder-box">
              <span>🎧</span>
            </div>
          )}

          <div className="sticky-text-wrap">
            <div className="sticky-meta-row">
              <span className="sticky-brand">{product.brand || "VanBass Pro"}</span>
              {product.stock_quantity > 0 && product.sale_enabled && (
                <span className="sticky-stock-tag">● {t.products.inStock}</span>
              )}
            </div>
            <h4 className="sticky-title" title={displayName}>
              {displayName}
            </h4>
          </div>
        </div>

        {/* Center: Price Badges */}
        <div className="sticky-price-wrap">
          {product.sale_enabled && product.sale_price ? (
            <div className="price-item">
              <span className="price-kicker">{lang === "en" ? "Buy Price" : "Giá bán"}</span>
              <span className="price-val main-price">{formatCurrency(product.sale_price, lang)}</span>
            </div>
          ) : null}

          {product.rental_enabled && product.rental_price ? (
            <div className="price-item rental-item">
              <span className="price-kicker">{lang === "en" ? "Rental / 24h" : "Thuê / 24h"}</span>
              <span className="price-val rental-price">{formatCurrency(product.rental_price, lang)}</span>
            </div>
          ) : null}
        </div>

        {/* Right: Quantity Stepper & Action Buttons */}
        <div className="sticky-actions-wrap">
          {/* Added to cart banner */}
          {addedNotice && (
            <div className="sticky-toast-badge">
              <span>✓ {t.productDetail.addedToCartNotice}</span>
              <Link href="/cart" className="sticky-cart-link">
                {t.productDetail.viewCart}
              </Link>
            </div>
          )}

          {/* Sale Enabled Actions */}
          {product.sale_enabled ? (
            product.stock_quantity > 0 ? (
              <div className="sticky-cta-group">
                {/* Stepper */}
                <div className="sticky-stepper">
                  <button
                    type="button"
                    onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                    className="stepper-btn"
                    aria-label="Giảm số lượng"
                  >
                    -
                  </button>
                  <span className="stepper-val">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => onQuantityChange(Math.min(product.stock_quantity || 10, quantity + 1))}
                    className="stepper-btn"
                    aria-label="Tăng số lượng"
                  >
                    +
                  </button>
                </div>

                {/* Add To Cart CTA */}
                <button
                  type="button"
                  onClick={onAddToCart}
                  className="sticky-btn sticky-btn-primary"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  <span>{t.productDetail.addToCartWithPrice}</span>
                </button>
              </div>
            ) : (
              <button type="button" disabled className="sticky-btn sticky-btn-disabled">
                {t.productDetail.outOfStock}
              </button>
            )
          ) : null}

          {/* Rental Direct CTA */}
          {product.rental_enabled && (
            <div className="sticky-rental-group">
              <a
                href={getMessengerRentalUrl(displayName, facebookPageId)}
                target="_blank"
                rel="noopener noreferrer"
                className={`sticky-btn ${!product.sale_enabled ? "sticky-btn-primary" : "sticky-btn-rental"}`}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>{lang === "en" ? "Rent Gear Now" : "Liên hệ thuê máy ngay"}</span>
              </a>
              <Link href="/thue-ban-dj" className="sticky-btn sticky-btn-secondary hide-on-mobile">
                {lang === "en" ? "Rates" : "Bảng Giá"}
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================
          SCOPED STYLES
         ============================================================ */}
      <style jsx>{`
        .sticky-action-bar-container {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 999;
          background: rgba(14, 16, 20, 0.94);
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.75), 0 0 20px rgba(34, 197, 94, 0.08);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          padding: 12px 20px;
          animation: slideUpBar 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          user-select: none;
        }

        @keyframes slideUpBar {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .sticky-action-bar-inner {
          max-width: 1320px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        /* Left Info */
        .sticky-prod-info {
          display: flex;
          align-items: center;
          gap: 14px;
          min-width: 240px;
          max-width: 400px;
        }

        .sticky-thumb-box {
          width: 52px;
          height: 52px;
          flex-shrink: 0;
          background: #18191f;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 10px;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .placeholder-box {
          font-size: 20px;
        }

        .sticky-thumb-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .sticky-text-wrap {
          overflow: hidden;
        }

        .sticky-meta-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 2px;
        }

        .sticky-brand {
          font-size: 10.5px;
          font-weight: 800;
          color: #22c55e;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .sticky-stock-tag {
          font-size: 10.5px;
          font-weight: 700;
          color: #4ade80;
        }

        .sticky-title {
          font-size: 13.5px;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Center Prices */
        .sticky-price-wrap {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .price-item {
          display: flex;
          flex-direction: column;
        }

        .price-kicker {
          font-size: 10.5px;
          color: #a1a1aa;
          text-transform: uppercase;
          font-weight: 600;
        }

        .price-val {
          font-size: 17px;
          font-weight: 900;
        }

        .main-price {
          color: #ffffff;
        }

        .rental-price {
          color: #22c55e;
        }

        .rental-item {
          border-left: 1px solid rgba(255, 255, 255, 0.1);
          padding-left: 18px;
        }

        /* Right Actions */
        .sticky-actions-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .sticky-cta-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sticky-stepper {
          display: flex;
          align-items: center;
          background: #090a0d;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          overflow: hidden;
        }

        .stepper-btn {
          padding: 8px 12px;
          background: transparent;
          border: none;
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: background-color 0.15s ease;
        }

        .stepper-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .stepper-val {
          padding: 0 8px;
          font-size: 13px;
          font-weight: 800;
          color: #ffffff;
          min-width: 24px;
          text-align: center;
        }

        .sticky-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s ease;
          white-space: nowrap;
          outline: none;
          border: none;
        }

        .sticky-btn-primary {
          background: #22c55e;
          color: #000000;
          box-shadow: 0 4px 14px rgba(34, 197, 94, 0.35);
        }

        .sticky-btn-primary:hover {
          background: #16a34a;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(34, 197, 94, 0.5);
        }

        .sticky-rental-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sticky-btn-rental {
          background: rgba(34, 197, 94, 0.15);
          border: 1px solid rgba(34, 197, 94, 0.5);
          color: #4ade80;
        }

        .sticky-btn-rental:hover {
          background: #22c55e;
          color: #000000;
          border-color: #22c55e;
        }

        .sticky-btn-secondary {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #e4e4e7;
        }

        .sticky-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
        }

        .sticky-btn-disabled {
          background: #27272a;
          color: #71717a;
          cursor: not-allowed;
          opacity: 0.6;
        }

        .sticky-toast-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          background: rgba(34, 197, 94, 0.2);
          border: 1px solid #22c55e;
          border-radius: 8px;
          color: #4ade80;
          font-size: 12px;
          font-weight: 600;
          animation: popoverFadeIn 0.2s ease;
        }

        .sticky-cart-link {
          color: #ffffff;
          font-weight: 800;
          text-decoration: underline;
        }

        @media (max-width: 900px) {
          .sticky-price-wrap {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .sticky-action-bar-container {
            bottom: 60px; /* Above mobile bottom nav bar */
            padding: 10px 14px;
          }

          .sticky-stepper {
            display: none;
          }

          .hide-on-mobile {
            display: none;
          }

          .sticky-prod-info {
            min-width: 140px;
            max-width: 180px;
          }

          .sticky-thumb-box {
            width: 40px;
            height: 40px;
          }

          .sticky-btn {
            padding: 8px 12px;
            font-size: 12px;
          }
        }
      `}</style>
    </aside>
  );
}
