"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Product } from "../lib/types";
import { MOCK_PRODUCTS } from "../lib/mock-data";
import { useLanguage } from "../lib/language-context";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS.slice(0, 8));
  const { t } = useLanguage();

  useEffect(() => {
    const fetchLiveProducts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
        const res = await fetch(`${apiUrl}/products?_t=${Date.now()}`, { cache: "no-store" });
        if (res.ok) {
          const liveData = await res.json();
          if (Array.isArray(liveData) && liveData.length > 0) {
            setProducts(liveData.slice(0, 8));
          }
        }
      } catch {
        // Graceful fallback to mock products when backend API is offline
      }
    };

    fetchLiveProducts();
  }, []);

  return (
    <section className="products-section reveal-on-scroll" id="featured-products" style={{ padding: "85px 0 160px 0", backgroundColor: "#090909", position: "relative", zIndex: 10 }}>
      <div className="container">
        {/* Luxury Minimalist Section Header */}
        <div className="pg-header-wrap">
          <h2 className="pg-main-title">
            {t.products.featuredTitle}
          </h2>

          <Link href="/products" className="pg-cta-button" aria-label={`${t.products.viewAllCount} (50+)`}>
            <span className="pg-cta-text">{t.products.viewAllCount} (50+)</span>
            <span className="pg-cta-icon-wrap" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Nightlife Multi-column Grid */}
        <div className="vb-product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}