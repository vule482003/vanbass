"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../lib/types";
import { getMessengerRentalUrl } from "../lib/api";
import { useLanguage } from "../lib/language-context";
import { getTranslatedProductName } from "../lib/product-i18n";

interface CompareDrawerProps {
  products: Product[];
  onRemoveProduct: (productId: string) => void;
  onClearAll: () => void;
}

function formatVND(amount?: number | null, lang: "vi" | "en" = "vi") {
  if (!amount || isNaN(amount)) return lang === "en" ? "Contact" : "Liên hệ";
  return new Intl.NumberFormat(lang === "en" ? "en-US" : "vi-VN").format(amount) + " ₫";
}

export default function CompareDrawer({ products, onRemoveProduct, onClearAll }: CompareDrawerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t, lang } = useLanguage();

  if (products.length === 0) return null;

  return (
    <>
      {/* Floating Bottom Drawer Pill */}
      <div
        style={{
          position: "fixed",
          bottom: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9000,
          backgroundColor: "rgba(18, 18, 21, 0.95)",
          border: "1px solid rgba(34, 197, 94, 0.5)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "0 16px 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(34, 197, 94, 0.25)",
          borderRadius: "9999px",
          padding: "8px 16px 8px 24px",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          maxWidth: "calc(100vw - 32px)",
          animation: "slideUp 300ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "13px", fontWeight: 800, color: "#fff", display: "flex", alignItems: "center", gap: "6px" }}>
            {t.compareDrawer.barTitle} ({products.length}/3)
          </span>

          {/* Product Thumbnails */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {products.map((prod) => {
              const displayName = getTranslatedProductName(prod, lang);
              return (
                <div
                  key={prod.id}
                  style={{
                    position: "relative",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "#09090b",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                  title={displayName}
                >
                  <Image
                    src={prod.image_url || "/images/placeholder.jpg"}
                    alt={displayName}
                    fill
                    style={{ objectFit: "contain", padding: "4px" }}
                    sizes="36px"
                  />
                  <button
                    onClick={() => onRemoveProduct(prod.id)}
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundColor: "rgba(239, 68, 68, 0.85)",
                      color: "#fff",
                      border: "none",
                      fontSize: "12px",
                      fontWeight: 800,
                      cursor: "pointer",
                      opacity: 0,
                      transition: "opacity 150ms ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                    title={t.compareDrawer.clearBtn}
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={() => setIsModalOpen(true)}
            className="button button-primary button-sm"
            style={{
              padding: "8px 18px",
              borderRadius: "9999px",
              fontSize: "12.5px",
              fontWeight: 800,
              boxShadow: "0 4px 14px rgba(34, 197, 94, 0.4)",
            }}
          >
            {t.compareDrawer.compareBtn}
          </button>

          <button
            onClick={onClearAll}
            style={{
              background: "none",
              border: "none",
              color: "#a1a1aa",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              padding: "6px 8px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#f87171")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#a1a1aa")}
          >
            {t.compareDrawer.clearBtn}
          </button>
        </div>
      </div>

      {/* Side-by-Side Comparison Modal */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div
            style={{
              position: "relative",
              width: "min(1100px, 100%)",
              maxHeight: "90vh",
              overflowY: "auto",
              backgroundColor: "#121215",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "16px",
              boxShadow: "0 30px 70px rgba(0, 0, 0, 0.95), 0 0 35px rgba(34, 197, 94, 0.15)",
              color: "#fff",
              padding: "32px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "16px" }}>
              <div>
                <h2 style={{ fontSize: "22px", fontWeight: 800, margin: 0, color: "#fff" }}>
                  {t.compareDrawer.compareModalTitle}
                </h2>
                <p style={{ fontSize: "13px", color: "#a1a1aa", margin: "4px 0 0 0" }}>
                  {t.compareDrawer.compareModalSubtitle}
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#a1a1aa",
                  fontSize: "18px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✕
              </button>
            </div>

            {/* Comparison Grid Table */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                <thead>
                  <tr>
                    <th style={{ width: "200px", padding: "16px", backgroundColor: "rgba(255,255,255,0.03)", color: "#a1a1aa", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                      {t.compareDrawer.criteriaHeader}
                    </th>
                    {products.map((prod) => {
                      const displayName = getTranslatedProductName(prod, lang);
                      return (
                        <th
                          key={prod.id}
                          style={{
                            padding: "16px",
                            backgroundColor: "rgba(255,255,255,0.02)",
                            borderBottom: "1px solid rgba(255,255,255,0.1)",
                            minWidth: "220px",
                            verticalAlign: "top",
                          }}
                        >
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                            <div style={{ position: "relative", width: "120px", height: "120px", marginBottom: "12px", borderRadius: "8px", backgroundColor: "#09090b", overflow: "hidden" }}>
                              <Image src={prod.image_url || "/images/placeholder.jpg"} alt={displayName} fill style={{ objectFit: "contain", padding: "8px" }} />
                            </div>
                            <Link href={`/products/${prod.slug}`} style={{ color: "#fff", fontWeight: 800, fontSize: "14px", textDecoration: "none", marginBottom: "6px" }}>
                              {displayName}
                            </Link>
                            {prod.brand && <span style={{ fontSize: "11px", color: "#4ade80", fontWeight: 700, textTransform: "uppercase" }}>{prod.brand}</span>}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {/* Row: Giá bán mới */}
                  <tr>
                    <td style={{ padding: "14px 16px", color: "#a1a1aa", borderBottom: "1px solid rgba(255,255,255,0.06)", fontWeight: 700 }}>
                      {t.compareDrawer.priceField}
                    </td>
                    {products.map((prod) => (
                      <td key={prod.id} style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", textAlign: "center", fontWeight: 800, color: "#fff", fontSize: "15px" }}>
                        {prod.sale_enabled && prod.sale_price ? formatVND(prod.sale_price, lang) : t.compareDrawer.rentalOnlyText}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Giá thuê / ngày */}
                  <tr>
                    <td style={{ padding: "14px 16px", color: "#4ade80", borderBottom: "1px solid rgba(255,255,255,0.06)", fontWeight: 700 }}>
                      {t.compareDrawer.rentalPriceField}
                    </td>
                    {products.map((prod) => (
                      <td key={prod.id} style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", textAlign: "center", fontWeight: 800, color: "#22c55e", fontSize: "15px" }}>
                        {prod.rental_enabled && prod.rental_price ? formatVND(prod.rental_price, lang) + ` ${t.compareDrawer.perDayUnit}` : t.compareDrawer.notForRentText}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Tình trạng kho */}
                  <tr>
                    <td style={{ padding: "14px 16px", color: "#a1a1aa", borderBottom: "1px solid rgba(255,255,255,0.06)", fontWeight: 600 }}>
                      {t.compareDrawer.stockField}
                    </td>
                    {products.map((prod) => (
                      <td key={prod.id} style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
                        <span style={{ color: prod.stock_quantity > 0 ? "#4ade80" : "#f87171", fontWeight: 700 }}>
                          {prod.stock_quantity > 0 ? t.compareDrawer.inStockText : t.compareDrawer.outOfStockText}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Row: Bảo hành */}
                  <tr>
                    <td style={{ padding: "14px 16px", color: "#a1a1aa", borderBottom: "1px solid rgba(255,255,255,0.06)", fontWeight: 600 }}>
                      {t.compareDrawer.warrantyField}
                    </td>
                    {products.map((prod) => (
                      <td key={prod.id} style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", textAlign: "center", color: "#d4d4d8" }}>
                        {t.compareDrawer.warrantyValue}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Thao tác */}
                  <tr>
                    <td style={{ padding: "16px", color: "#a1a1aa", fontWeight: 600 }}>{t.compareDrawer.actionField}</td>
                    {products.map((prod) => {
                      const displayName = getTranslatedProductName(prod, lang);
                      return (
                        <td key={prod.id} style={{ padding: "16px", textAlign: "center" }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <Link href={`/products/${prod.slug}`} className="button button-primary button-sm" style={{ width: "100%", justifyContent: "center" }}>
                              {t.compareDrawer.viewDetailBtn}
                            </Link>
                            {prod.rental_enabled && (
                              <a
                                href={getMessengerRentalUrl(displayName)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`button ${!prod.sale_enabled ? "button-primary" : "button-outline"} button-sm`}
                                style={{ width: "100%", justifyContent: "center" }}
                              >
                                {t.compareDrawer.rentNowBtn}
                              </a>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
