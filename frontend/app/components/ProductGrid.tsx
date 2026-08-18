"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Product } from "../lib/types";
import { MOCK_PRODUCTS } from "../lib/mock-data";

function formatCurrency(amount?: number) {
  if (amount === undefined || amount === null) return "Liên hệ";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS.slice(0, 4));

  useEffect(() => {
    const fetchLiveProducts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
        const res = await fetch(`${apiUrl}/products`);
        if (res.ok) {
          const liveData = await res.json();
          if (Array.isArray(liveData) && liveData.length > 0) {
            setProducts(liveData.slice(0, 4));
          }
        }
      } catch (err) {
        console.error("Failed to fetch live products for ProductGrid:", err);
      }
    };

    fetchLiveProducts();
  }, []);

  return (
    <section className="products-section" id="featured-products">
      <div className="container">
        <div className="section-heading" style={{ marginBottom: "40px" }}>
          <div>
            <p className="section-kicker" style={{ fontSize: "11px", color: "#71717a", letterSpacing: "0.18em", marginBottom: "8px", fontWeight: 800, textTransform: "uppercase" }}>
              SẢN PHẨM NỔI BẬT
            </p>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 900, letterSpacing: "-0.03em", color: "#0a0a0a" }}>
              Thiết bị DJ & Âm thanh hàng đầu
            </h2>
          </div>

          <Link href="/products" className="text-link" style={{ fontSize: "13px", fontWeight: 800, color: "#0a0a0a" }}>
            Xem tất cả sản phẩm <span>→</span>
          </Link>
        </div>

        <div className="product-grid">
          {products.map((product, index) => {
            return (
              <article
                className="product-card"
                key={product.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  backgroundColor: "#ffffff",
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  padding: "16px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.04)",
                  transition: "transform 200ms ease, box-shadow 200ms ease",
                }}
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="product-image"
                  aria-label={`Xem ${product.name}`}
                  style={{ backgroundColor: "#f4f4f0", borderRadius: "2px" }}
                >
                  <span className="product-index" style={{ fontSize: "12px", fontWeight: 800, color: "#52525b" }}>0{index + 1}</span>

                  <div className="product-placeholder">
                    <div className="product-placeholder-top">
                      <span />
                      <span />
                      <span />
                    </div>

                    <div className="product-placeholder-body">
                      <div className="product-wheel" />
                      <div className="product-faders">
                        <i />
                        <i />
                        <i />
                      </div>
                      <div className="product-wheel" />
                    </div>
                  </div>
                </Link>

                <div className="product-info" style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between", padding: "16px 0 0 0" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px", gap: "8px" }}>
                      <span style={{ fontSize: "11px", fontWeight: 800, color: "#71717a", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        {product.brand || "VanBass"}
                      </span>
                      {product.stock_quantity > 0 ? (
                        <span style={{ fontSize: "10px", fontWeight: 800, color: "#15803d", backgroundColor: "#dcfce7", padding: "3px 8px", borderRadius: "999px" }}>
                          Còn hàng
                        </span>
                      ) : (
                        <span style={{ fontSize: "10px", fontWeight: 800, color: "#71717a", backgroundColor: "#f4f4f5", padding: "3px 8px", borderRadius: "999px" }}>
                          Hết hàng
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: "16px", fontWeight: 800, margin: "0 0 12px 0", lineHeight: "1.4", letterSpacing: "-0.02em" }}>
                      <Link href={`/products/${product.slug}`} style={{ color: "#0a0a0a", textDecoration: "none" }}>
                        {product.name}
                      </Link>
                    </h3>
                  </div>

                  <div className="product-pricing" style={{ marginTop: "auto", paddingTop: "14px", borderTop: "1px solid rgba(0, 0, 0, 0.08)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px", marginBottom: "14px" }}>
                      {product.sale_enabled && product.sale_price ? (
                        <div>
                          <span style={{ fontSize: "10px", color: "#71717a", textTransform: "uppercase", fontWeight: 700, display: "block", marginBottom: "2px" }}>Giá bán</span>
                          <span style={{ fontSize: "17px", fontWeight: 900, color: "#0a0a0a" }}>
                            {formatCurrency(product.sale_price)}
                          </span>
                        </div>
                      ) : (
                        <div>
                          <span style={{ fontSize: "10px", color: "#71717a", textTransform: "uppercase", fontWeight: 700, display: "block", marginBottom: "2px" }}>Giá bán</span>
                          <span style={{ fontSize: "13px", color: "#71717a", fontWeight: 600 }}>Chỉ cho thuê</span>
                        </div>
                      )}

                      {product.rental_enabled && product.rental_price && (
                        <div style={{ textAlign: "right" }}>
                          <span style={{ fontSize: "10px", color: "#71717a", textTransform: "uppercase", fontWeight: 700, display: "block", marginBottom: "2px" }}>Giá thuê</span>
                          <span style={{ fontSize: "14px", fontWeight: 800, color: "#16a34a" }}>
                            {formatCurrency(product.rental_price)}<span style={{ fontSize: "11px", fontWeight: 500, color: "#71717a" }}>/ngày</span>
                          </span>
                        </div>
                      )}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      <Link
                        href={`/products/${product.slug}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "10px 14px",
                          border: "1.5px solid #0a0a0a",
                          backgroundColor: "transparent",
                          color: "#0a0a0a",
                          fontSize: "11px",
                          fontWeight: 800,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          textDecoration: "none",
                          textAlign: "center",
                        }}
                      >
                        Chi tiết
                      </Link>
                      <Link
                        href={`/rental?product=${product.slug}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "10px 14px",
                          border: "1.5px solid #0a0a0a",
                          backgroundColor: "#0a0a0a",
                          color: "#ffffff",
                          fontSize: "11px",
                          fontWeight: 800,
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          textDecoration: "none",
                          textAlign: "center",
                        }}
                      >
                        Thuê máy
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}