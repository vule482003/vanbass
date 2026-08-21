"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "../lib/types";
import { useCart } from "../lib/cart-context";
import { useAuth } from "../lib/auth-context";

interface ShopeeProductCardProps {
  product: Product;
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

export default function ShopeeProductCard({ product }: ShopeeProductCardProps) {
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
    window.open(FACEBOOK_RENTAL_URL, "_blank", "noopener,noreferrer");
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
    <article className="shopee-card">
      {/* Top Image + Badges */}
      <div className="shopee-card-image-wrap">
        <Link
          href={`/products/${product.slug}`}
          style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {showImage ? (
            <img
              src={primaryImage!}
              alt={product.name}
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="product-placeholder">
              <div className="product-placeholder-body">
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
          <span className="shopee-badge-soldout">Hết hàng</span>
        )}

        {/* Rental tag badge if rental enabled */}
        {product.rental_enabled && (
          <span className="shopee-badge-rental">Cho thuê</span>
        )}
      </div>

      {/* Card Content Body */}
      <div className="shopee-card-body">
        <div>
          {/* Title */}
          <Link href={`/products/${product.slug}`} className="shopee-product-title" title={product.name}>
            {product.name}
          </Link>

          {/* Tags */}
          <div className="shopee-tags-row">
            {product.brand && <span className="shopee-tag-brand">{product.brand}</span>}
            <span className="shopee-tag-item">Bảo hành 12T</span>
            {product.stock_quantity > 0 ? (
              <span className="shopee-tag-item">Sẵn hàng</span>
            ) : (
              <span className="shopee-tag-item" style={{ color: "#f87171", borderColor: "rgba(239, 68, 68, 0.3)" }}>
                Hết hàng
              </span>
            )}
          </div>

          {/* Price Section */}
          <div className="shopee-price-row">
            {product.sale_enabled && product.sale_price ? (
              <div className="shopee-sale-price">
                <small>₫</small>
                {new Intl.NumberFormat("vi-VN").format(product.sale_price)}
              </div>
            ) : (
              <div style={{ fontSize: "12px", color: "#64748b", fontWeight: 700 }}>Chỉ cho thuê</div>
            )}

            {product.rental_enabled && product.rental_price ? (
              <div className="shopee-rental-price" title="Giá thuê theo ngày">
                <span className="shopee-rental-label">Thuê / ngày</span>
                <strong>{formatVND(product.rental_price)}</strong>
              </div>
            ) : null}
          </div>
        </div>

        {/* Footer info: Rating, sold count, location */}
        <div className="shopee-card-footer">
          <div className="shopee-rating">
            <span>★</span>
            <span>5.0</span>
            <span style={{ color: "#cbd5e1", margin: "0 2px" }}>•</span>
            <span style={{ color: "#64748b" }}>Đã bán {product.stock_quantity > 0 ? (12 + (product.stock_quantity % 10)) : 0}</span>
          </div>
          <span className="shopee-location">Đà Nẵng</span>
        </div>
      </div>

      {/* Shopee Bottom Actions Drawer (Xuất hiện bên dưới thẻ khi hover - chuẩn ảnh 2) */}
      <div className="shopee-card-bottom-actions">
        {/* Nút 1: Thêm vào giỏ hàng / Tạm hết hàng */}
        {product.stock_quantity > 0 ? (
          <button
            type="button"
            className="shopee-btn-cart"
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
            className="shopee-btn-cart"
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
        <a
          href={FACEBOOK_RENTAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shopee-btn-rental"
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
          Thuê sản phẩm
        </a>
      </div>
    </article>
  );
}
