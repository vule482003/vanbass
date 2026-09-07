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

  return (
    <article className="vb-product-card">
      {/* Product Image Frame */}
      <div className="vb-card-image-wrap">
        <Link href={`/products/${product.slug}`} className="vb-image-link">
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

        {/* Out of Stock Badge (Hiển thị khi sản phẩm có tồn kho bằng 0) */}
        {product.stock_quantity <= 0 && (
          <span className="vb-badge-soldout">{t.products.outOfStock}</span>
        )}

        {/* Rental tag badge if rental enabled */}
        {product.rental_enabled && (
          <span
            className="vb-badge-rental"
            style={{
              backgroundColor: currentMode === "rental" ? "rgba(34, 197, 94, 0.9)" : "rgba(34, 197, 94, 0.2)",
              color: currentMode === "rental" ? "#000000" : "#4ade80",
              fontWeight: 800,
            }}
          >
            {t.products.rentBtnShort}
          </span>
        )}

        {/* Quick Actions Overlay Bar inside Card Image Wrap */}
        <div
          style={{
            position: "absolute",
            bottom: "8px",
            left: "8px",
            right: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 10,
            pointerEvents: "auto",
          }}
        >
          {onQuickView && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              style={{
                padding: "4px 10px",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "9999px",
                color: "#fff",
                fontSize: "11px",
                fontWeight: 700,
                cursor: "pointer",
                backdropFilter: "blur(6px)",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                transition: "all 180ms ease",
                boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#22c55e";
                e.currentTarget.style.color = "#000";
                e.currentTarget.style.borderColor = "#22c55e";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.2)";
              }}
              title={t.products.quickView}
            >
              {t.products.quickView}
            </button>
          )}

          {onToggleCompare && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleCompare(product);
              }}
              style={{
                padding: "4px 10px",
                backgroundColor: isCompared ? "#22c55e" : "rgba(0, 0, 0, 0.8)",
                border: isCompared ? "1px solid #22c55e" : "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "9999px",
                color: isCompared ? "#000" : "#fff",
                fontSize: "11px",
                fontWeight: 800,
                cursor: "pointer",
                backdropFilter: "blur(6px)",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                transition: "all 180ms ease",
                boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
              }}
              title={isCompared ? t.products.compared : t.products.compare}
            >
              {isCompared ? `✓ ${t.products.compared}` : t.products.compare}
            </button>
          )}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="vb-card-body">
        <div>
          {/* Title */}
          <Link href={`/products/${product.slug}`} className="vb-product-title" title={displayName}>
            {displayName}
          </Link>

          {/* Tags */}
          <div className="vb-tags-row">
            {product.brand && <span className="vb-tag-brand">{product.brand}</span>}
            <span className="vb-tag-item">{t.products.warranty12M}</span>
            {product.stock_quantity > 0 ? (
              <span className="vb-tag-item">{t.products.inStock}</span>
            ) : (
              <span className="vb-tag-item" style={{ color: "#f87171", borderColor: "rgba(239, 68, 68, 0.3)" }}>
                {t.products.outOfStock}
              </span>
            )}
          </div>

          {/* Price Section */}
          <div className="vb-price-row">
            {currentMode === "rental" ? (
              product.rental_enabled && product.rental_price ? (
                <div>
                  <div style={{ fontSize: "11px", color: "#4ade80", fontWeight: 700, textTransform: "uppercase" }}>
                    {t.products.rentalPriceLabel}
                  </div>
                  <div style={{ fontSize: "20px", fontWeight: 800, color: "#22c55e", display: "flex", alignItems: "baseline", gap: "3px" }}>
                    {formatVND(product.rental_price)}
                    <span style={{ fontSize: "12px", color: "#a1a1aa", fontWeight: 500 }}>{t.products.perDay}</span>
                  </div>
                  {product.sale_enabled && product.sale_price ? (
                    <div style={{ fontSize: "11.5px", color: "#71717a", marginTop: "2px" }}>
                      {t.products.purchasePriceLabel} {new Intl.NumberFormat("vi-VN").format(product.sale_price)}₫
                    </div>
                  ) : null}
                </div>
              ) : (
                <div style={{ fontSize: "13px", color: "#22c55e", fontWeight: 700 }}>{t.products.rentalQuoteContact}</div>
              )
            ) : (
              <>
                {product.sale_enabled && product.sale_price ? (
                  <div className="vb-sale-price">
                    <small>₫</small>
                    {new Intl.NumberFormat("vi-VN").format(product.sale_price)}
                  </div>
                ) : (
                  <div style={{ fontSize: "12px", color: "#64748b", fontWeight: 700 }}>{t.products.rentalOnly}</div>
                )}

                {product.rental_enabled && product.rental_price ? (
                  <div className="vb-rental-price" title={t.products.rentalPerDay}>
                    <span className="vb-rental-label">{t.products.rentalPerDay}</span>
                    <strong>{formatVND(product.rental_price)}</strong>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>

        {/* Footer info: Rating, location */}
        <div className="vb-card-footer">
          <div className="vb-rating">
            <span>★</span>
            <span>5.0</span>
          </div>
          <span className="vb-location">{t.products.locationDaNang}</span>
        </div>
      </div>

      {/* Bottom Actions Drawer (Trượt xuống bên dưới thẻ khi hover) */}
      <div className="vb-card-bottom-actions">
        {currentMode === "rental" ? (
          /* Khi ở chế độ Cho thuê, nút Thuê sản phẩm hiển thị rộng đầy đủ */
          <a
            href={getMessengerRentalUrl(displayName)}
            target="_blank"
            rel="noopener noreferrer"
            className="vb-btn-rental"
            onClick={handleRentProduct}
            style={{ width: "100%", justifyContent: "center" }}
            title={t.products.rentNowBtn}
          >
            {t.products.rentNowBtn}
          </a>
        ) : (
          <>
            {/* Nút 1: Thêm vào giỏ hàng / Tạm hết hàng */}
            {product.stock_quantity > 0 ? (
              <button
                type="button"
                className="vb-btn-cart"
                onClick={handleAddToCart}
                title={t.products.addToCart}
              >
                {t.products.addToCart}
              </button>
            ) : (
              <button
                type="button"
                className="vb-btn-cart"
                disabled
                style={{
                  opacity: 0.55,
                  cursor: "not-allowed",
                  backgroundColor: "#27272a",
                  color: "#a1a1aa",
                }}
                title={t.products.outOfStock}
              >
                {t.products.outOfStock}
              </button>
            )}

            {/* Nút 2: Thuê sản phẩm -> Link sang Facebook Messenger VanBass */}
            {product.rental_enabled && (
              <a
                href={getMessengerRentalUrl(displayName)}
                target="_blank"
                rel="noopener noreferrer"
                className="vb-btn-rental"
                onClick={handleRentProduct}
                title={t.products.rentBtnShort}
              >
                {t.products.rentBtnShort}
              </a>
            )}
          </>
        )}
      </div>
    </article>
  );
}
