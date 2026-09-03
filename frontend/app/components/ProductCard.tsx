"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "../lib/types";
import { useCart } from "../lib/cart-context";
import { useAuth } from "../lib/auth-context";

interface ProductCardProps {
  product: Product;
  currentMode?: "all" | "sale" | "rental";
  onQuickView?: (product: Product) => void;
  isCompared?: boolean;
  onToggleCompare?: (product: Product) => void;
}

function formatVND(amount?: number) {
  if (amount === undefined || amount === null) return "Liên hệ";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

const FACEBOOK_RENTAL_URL =
  "https://www.facebook.com/vanbassmusiccenterdanangvietnam?locale=vi_VN";

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
  const [imageError, setImageError] = useState(false);

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
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
    const backendBase = apiUrl.replace(/\/api\/?$/, "");
    return `${backendBase}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const rawImage = product.images?.[0]?.image_url || product.image_url;
  const primaryImage = resolveImageUrl(rawImage);
  const showImage = Boolean(primaryImage && !imageError);

  return (
    <article className="vb-product-card">
      {/* Product Image Frame */}
      <div className="vb-card-image-wrap">
        <Link href={`/products/${product.slug}`} className="vb-image-link">
          {showImage ? (
            <img
              src={primaryImage!}
              alt={product.name}
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
          <span className="vb-badge-soldout">Hết hàng</span>
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
            {currentMode === "rental" ? "🎧 Cho thuê" : "Cho thuê"}
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
              title="Xem nhanh thông số & ảnh"
            >
              👁️ Xem nhanh
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
              title={isCompared ? "Bỏ so sánh" : "Thêm vào so sánh"}
            >
              {isCompared ? "✓ Đã chọn" : "⚖️ So sánh"}
            </button>
          )}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="vb-card-body">
        <div>
          {/* Title */}
          <Link href={`/products/${product.slug}`} className="vb-product-title" title={product.name}>
            {product.name}
          </Link>

          {/* Tags */}
          <div className="vb-tags-row">
            {product.brand && <span className="vb-tag-brand">{product.brand}</span>}
            <span className="vb-tag-item">Bảo hành 12T</span>
            {product.stock_quantity > 0 ? (
              <span className="vb-tag-item">Sẵn hàng</span>
            ) : (
              <span className="vb-tag-item" style={{ color: "#f87171", borderColor: "rgba(239, 68, 68, 0.3)" }}>
                Hết hàng
              </span>
            )}
          </div>

          {/* Price Section */}
          <div className="vb-price-row">
            {currentMode === "rental" ? (
              product.rental_enabled && product.rental_price ? (
                <div>
                  <div style={{ fontSize: "11px", color: "#4ade80", fontWeight: 700, textTransform: "uppercase" }}>
                    Giá thuê thiết bị
                  </div>
                  <div style={{ fontSize: "20px", fontWeight: 800, color: "#22c55e", display: "flex", alignItems: "baseline", gap: "3px" }}>
                    {formatVND(product.rental_price)}
                    <span style={{ fontSize: "12px", color: "#a1a1aa", fontWeight: 500 }}>/ ngày</span>
                  </div>
                  {product.sale_enabled && product.sale_price ? (
                    <div style={{ fontSize: "11.5px", color: "#71717a", marginTop: "2px" }}>
                      Giá mua mới: {new Intl.NumberFormat("vi-VN").format(product.sale_price)}₫
                    </div>
                  ) : null}
                </div>
              ) : (
                <div style={{ fontSize: "13px", color: "#22c55e", fontWeight: 700 }}>Liên hệ báo giá thuê</div>
              )
            ) : (
              <>
                {product.sale_enabled && product.sale_price ? (
                  <div className="vb-sale-price">
                    <small>₫</small>
                    {new Intl.NumberFormat("vi-VN").format(product.sale_price)}
                  </div>
                ) : (
                  <div style={{ fontSize: "12px", color: "#64748b", fontWeight: 700 }}>Chỉ cho thuê</div>
                )}

                {product.rental_enabled && product.rental_price ? (
                  <div className="vb-rental-price" title="Giá thuê theo ngày">
                    <span className="vb-rental-label">Thuê / ngày</span>
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
          <span className="vb-location">Đà Nẵng</span>
        </div>
      </div>

      {/* Bottom Actions Drawer (Trượt xuống bên dưới thẻ khi hover) */}
      <div className="vb-card-bottom-actions">
        {currentMode === "rental" ? (
          /* Khi ở chế độ Cho thuê, nút Thuê sản phẩm hiển thị rộng đầy đủ */
          <a
            href={FACEBOOK_RENTAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="vb-btn-rental"
            onClick={handleRentProduct}
            style={{ width: "100%", justifyContent: "center" }}
            title="Liên hệ tư vấn thuê sản phẩm qua Facebook VanBass"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Liên hệ thuê máy ngay
          </a>
        ) : (
          <>
            {/* Nút 1: Thêm vào giỏ hàng / Tạm hết hàng */}
            {product.stock_quantity > 0 ? (
              <button
                type="button"
                className="vb-btn-cart"
                onClick={handleAddToCart}
                title="Thêm sản phẩm này vào giỏ hàng"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                Thêm vào giỏ hàng
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
                title="Sản phẩm hiện đang tạm hết hàng"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                Tạm hết hàng
              </button>
            )}

            {/* Nút 2: Thuê sản phẩm -> Link sang Facebook fanpage VanBass */}
            {product.rental_enabled && (
              <a
                href={FACEBOOK_RENTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="vb-btn-rental"
                onClick={handleRentProduct}
                title="Liên hệ tư vấn thuê sản phẩm qua Facebook VanBass"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Thuê
              </a>
            )}
          </>
        )}
      </div>
    </article>
  );
}
