"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../lib/types";
import { useCart } from "../lib/cart-context";
import { getMessengerRentalUrl } from "../lib/api";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  currentMode?: "all" | "sale" | "rental";
}

function formatVND(amount?: number) {
  if (!amount || isNaN(amount)) return "Liên hệ báo giá";
  return new Intl.NumberFormat("vi-VN").format(amount) + " ₫";
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addItem } = useCart();
  const [addedNotice, setAddedNotice] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const imagesList = product.images && product.images.length > 0
    ? product.images.map((i) => i.image_url)
    : [product.image_url || "/images/placeholder.jpg"];

  const handleAddToCart = () => {
    addItem(product, 1);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2200);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "rgba(0, 0, 0, 0.82)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        animation: "fadeIn 200ms ease-out",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          position: "relative",
          width: "min(900px, 100%)",
          maxHeight: "90vh",
          overflowY: "auto",
          backgroundColor: "#121215",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "14px",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(34, 197, 94, 0.15)",
          color: "#fff",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "32px",
          padding: "32px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            color: "#a1a1aa",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 10,
            transition: "all 180ms ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.2)";
            e.currentTarget.style.color = "#f87171";
            e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
            e.currentTarget.style.color = "#a1a1aa";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
          }}
          title="Đóng cửa sổ"
        >
          ✕
        </button>

        {/* Column 1: Image Gallery */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "1 / 1",
              backgroundColor: "radial-gradient(circle at 50% 50%, #1a1e1b 0%, #0c0e0c 100%)",
              borderRadius: "10px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
            }}
          >
            {imagesList[activeImgIndex] ? (
              <Image
                src={imagesList[activeImgIndex]}
                alt={product.name}
                fill
                style={{ objectFit: "contain", padding: "16px" }}
                sizes="(max-width: 768px) 100vw, 450px"
              />
            ) : (
              <div style={{ color: "#71717a", fontSize: "14px" }}>VanBass Music Center</div>
            )}

            {/* Rental Badge */}
            {product.rental_enabled && (
              <span
                style={{
                  position: "absolute",
                  top: "14px",
                  left: "14px",
                  backgroundColor: "rgba(34, 197, 94, 0.2)",
                  border: "1px solid rgba(34, 197, 94, 0.4)",
                  color: "#4ade80",
                  fontSize: "11px",
                  fontWeight: 800,
                  padding: "4px 10px",
                  borderRadius: "6px",
                  letterSpacing: "0.05em",
                }}
              >
                🎧 CÓ CHO THUÊ
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {imagesList.length > 1 && (
            <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "4px" }}>
              {imagesList.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIndex(idx)}
                  style={{
                    position: "relative",
                    width: "64px",
                    height: "64px",
                    borderRadius: "6px",
                    border: idx === activeImgIndex ? "2px solid #22c55e" : "1px solid rgba(255, 255, 255, 0.12)",
                    backgroundColor: "#09090b",
                    cursor: "pointer",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <Image src={img} alt="" fill style={{ objectFit: "contain", padding: "4px" }} sizes="64px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Column 2: Product Info & Actions */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            {/* Header info */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "10px" }}>
              {product.brand && (
                <span
                  style={{
                    padding: "3px 10px",
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.14)",
                    color: "#fff",
                    fontSize: "11px",
                    fontWeight: 800,
                    borderRadius: "4px",
                    textTransform: "uppercase",
                  }}
                >
                  {product.brand}
                </span>
              )}
              <span
                style={{
                  padding: "3px 10px",
                  backgroundColor: "rgba(245, 158, 11, 0.12)",
                  border: "1px solid rgba(245, 158, 11, 0.35)",
                  color: "#fbbf24",
                  fontSize: "11px",
                  fontWeight: 700,
                  borderRadius: "4px",
                }}
              >
                Bảo hành 12 Tháng
              </span>
              <span
                style={{
                  padding: "3px 10px",
                  backgroundColor: product.stock_quantity > 0 ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.15)",
                  border: product.stock_quantity > 0 ? "1px solid rgba(34, 197, 94, 0.35)" : "1px solid rgba(239, 68, 68, 0.35)",
                  color: product.stock_quantity > 0 ? "#4ade80" : "#f87171",
                  fontSize: "11px",
                  fontWeight: 700,
                  borderRadius: "4px",
                }}
              >
                {product.stock_quantity > 0 ? `Sẵn hàng (${product.stock_quantity})` : "Tạm hết hàng"}
              </span>
            </div>

            <h2
              style={{
                fontSize: "clamp(20px, 2.5vw, 24px)",
                fontWeight: 800,
                color: "#fff",
                margin: "0 0 14px 0",
                lineHeight: "1.3",
              }}
            >
              {product.name}
            </h2>

            <p style={{ fontSize: "12px", color: "#71717a", margin: "0 0 16px 0" }}>
              Mã SKU: <strong style={{ color: "#a1a1aa" }}>{product.sku}</strong>
            </p>

            {/* Pricing Box */}
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {product.sale_enabled && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", color: "#a1a1aa", fontWeight: 600 }}>Giá mua mới:</span>
                  <span style={{ fontSize: "22px", fontWeight: 900, color: "#ffffff" }}>
                    {formatVND(product.sale_price)}
                  </span>
                </div>
              )}

              {product.rental_enabled && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: product.sale_enabled ? "1px solid rgba(255, 255, 255, 0.06)" : "none", paddingTop: product.sale_enabled ? "10px" : "0" }}>
                  <span style={{ fontSize: "13px", color: "#4ade80", fontWeight: 700 }}>Giá thuê / ngày:</span>
                  <span style={{ fontSize: "18px", fontWeight: 800, color: "#22c55e" }}>
                    {formatVND(product.rental_price)}
                  </span>
                </div>
              )}
            </div>

            {/* Description excerpt */}
            {product.description && (
              <p
                style={{
                  fontSize: "13.5px",
                  color: "#d4d4d8",
                  lineHeight: "1.6",
                  marginBottom: "20px",
                  maxHeight: "100px",
                  overflowY: "auto",
                }}
              >
                {product.description}
              </p>
            )}

            {/* Added Notice Alert */}
            {addedNotice && (
              <div
                style={{
                  padding: "10px 14px",
                  backgroundColor: "rgba(34, 197, 94, 0.15)",
                  border: "1px solid #22c55e",
                  color: "#4ade80",
                  fontSize: "13px",
                  fontWeight: 700,
                  borderRadius: "6px",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                ✓ Đã thêm sản phẩm vào giỏ hàng thành công!
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "16px" }}>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              {product.stock_quantity > 0 ? (
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="button button-primary"
                  style={{ flex: 1, padding: "13px 20px", fontSize: "13px" }}
                >
                  🛒 Thêm vào giỏ hàng
                </button>
              ) : (
                <button
                  type="button"
                  disabled
                  className="button"
                  style={{
                    flex: 1,
                    padding: "13px 20px",
                    fontSize: "13px",
                    backgroundColor: "#27272a",
                    color: "#71717a",
                    cursor: "not-allowed",
                  }}
                >
                  Tạm hết hàng
                </button>
              )}

              {product.rental_enabled && (
                <a
                  href={getMessengerRentalUrl(product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-outline"
                  style={{
                    padding: "13px 20px",
                    fontSize: "13px",
                    backgroundColor: "rgba(34, 197, 94, 0.12)",
                    color: "#4ade80",
                    borderColor: "rgba(34, 197, 94, 0.4)",
                  }}
                >
                  💬 Liên hệ thuê máy
                </a>
              )}
            </div>

            <Link
              href={`/products/${product.slug}`}
              onClick={onClose}
              style={{
                textAlign: "center",
                fontSize: "13px",
                color: "#22c55e",
                fontWeight: 700,
                textDecoration: "none",
                marginTop: "4px",
              }}
            >
              Xem trang chi tiết sản phẩm &amp; thông số đầy đủ →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
