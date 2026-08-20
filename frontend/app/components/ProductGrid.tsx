"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Product } from "../lib/types";
import { MOCK_PRODUCTS } from "../lib/mock-data";
import ShopeeProductCard from "./ShopeeProductCard";

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS.slice(0, 10));

  useEffect(() => {
    const fetchLiveProducts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
        const res = await fetch(`${apiUrl}/products`);
        if (res.ok) {
          const liveData = await res.json();
          if (Array.isArray(liveData) && liveData.length > 0) {
            setProducts(liveData.slice(0, 10));
          }
        }
      } catch (err) {
        console.error("Failed to fetch live products for ProductGrid:", err);
      }
    };

    fetchLiveProducts();
  }, []);

  return (
    <section className="products-section" id="featured-products" style={{ padding: "85px 0", backgroundColor: "#090909" }}>
      <div className="container">
        {/* Luxury Nightlife Section Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "28px",
            paddingBottom: "16px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                backgroundColor: "#ffffff",
                color: "#000000",
                fontSize: "11px",
                fontWeight: 900,
                padding: "4px 10px",
                borderRadius: "3px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              GỢI Ý THIẾT BỊ
            </span>
            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff", margin: 0, letterSpacing: "-0.02em" }}>
              Thiết Bị DJ &amp; Âm Thanh Biểu Diễn Chuyên Nghiệp
            </h2>
          </div>

          <Link
            href="/products"
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "#22c55e",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              textDecoration: "none",
              transition: "opacity 0.2s ease",
            }}
          >
            Xem tất cả (50+) <span>→</span>
          </Link>
        </div>

        {/* Nightlife Multi-column Grid */}
        <div className="shopee-product-grid">
          {products.map((product) => (
            <ShopeeProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}