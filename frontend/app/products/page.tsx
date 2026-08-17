"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "../lib/mock-data";
import { useCart } from "../lib/cart-context";
import { Product } from "../lib/types";

function formatCurrency(amount?: number) {
  if (amount === undefined || amount === null) return "Liên hệ";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const { addItem } = useCart();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [filterMode, setFilterMode] = useState<"all" | "sale" | "rental">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("featured");

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== "all" && product.category_slug !== selectedCategory) {
        return false;
      }
      // Mode filter
      if (filterMode === "sale" && !product.sale_enabled) return false;
      if (filterMode === "rental" && !product.rental_enabled) return false;

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(query);
        const matchBrand = product.brand?.toLowerCase().includes(query);
        const matchDesc = product.description?.toLowerCase().includes(query);
        if (!matchName && !matchBrand && !matchDesc) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price_asc") {
        return (a.sale_price || 0) - (b.sale_price || 0);
      }
      if (sortBy === "price_desc") {
        return (b.sale_price || 0) - (a.sale_price || 0);
      }
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [selectedCategory, filterMode, searchQuery, sortBy]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <main style={{ flex: 1, paddingTop: "120px", paddingBottom: "80px" }}>
        <div className="container">
          {/* Breadcrumb & Heading */}
          <div style={{ marginBottom: "40px" }}>
            <p className="section-kicker">CATALOG SẢN PHẨM</p>
            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                margin: "0 0 16px 0",
              }}
            >
              Thiết bị DJ & Âm thanh chuyên nghiệp
            </h1>
            <p style={{ color: "#a1a1aa", maxWidth: "600px", margin: 0 }}>
              Cung cấp các dòng DJ Controller, CDJ, Mixer, Loa biểu diễn và phụ kiện âm thanh hàng đầu từ Pioneer DJ, AlphaTheta, JBL, Yamaha.
            </p>
          </div>

          {/* Controls Bar: Search & Sort */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "32px",
              padding: "20px",
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            {/* Search Input */}
            <div style={{ position: "relative", flex: "1 1 280px", maxWidth: "400px" }}>
              <input
                type="text"
                placeholder="Tìm kiếm theo tên thiết bị, thương hiệu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  backgroundColor: "#000",
                  border: "1px solid var(--border)",
                  color: "#fff",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
            </div>

            {/* Filter Mode Buttons */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button
                onClick={() => setFilterMode("all")}
                style={{
                  padding: "8px 16px",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                  backgroundColor: filterMode === "all" ? "#fff" : "transparent",
                  color: filterMode === "all" ? "#000" : "#a1a1aa",
                  border: "1px solid var(--border)",
                  textTransform: "uppercase",
                }}
              >
                Tất cả
              </button>
              <button
                onClick={() => setFilterMode("sale")}
                style={{
                  padding: "8px 16px",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                  backgroundColor: filterMode === "sale" ? "#fff" : "transparent",
                  color: filterMode === "sale" ? "#000" : "#a1a1aa",
                  border: "1px solid var(--border)",
                  textTransform: "uppercase",
                }}
              >
                Mua hàng
              </button>
              <button
                onClick={() => setFilterMode("rental")}
                style={{
                  padding: "8px 16px",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                  backgroundColor: filterMode === "rental" ? "#fff" : "transparent",
                  color: filterMode === "rental" ? "#000" : "#a1a1aa",
                  border: "1px solid var(--border)",
                  textTransform: "uppercase",
                }}
              >
                Cho thuê
              </button>
            </div>

            {/* Sort Select */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "12px", color: "#a1a1aa" }}>Sắp xếp:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#000",
                  border: "1px solid var(--border)",
                  color: "#fff",
                  fontSize: "12px",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="featured">Nổi bật</option>
                <option value="price_asc">Giá: Thấp đến cao</option>
                <option value="price_desc">Giá: Cao đến thấp</option>
                <option value="name">Tên: A-Z</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              paddingBottom: "12px",
              marginBottom: "40px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <button
              onClick={() => setSelectedCategory("all")}
              style={{
                padding: "8px 20px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
                border: "none",
                backgroundColor: selectedCategory === "all" ? "rgba(255,255,255,0.15)" : "transparent",
                color: selectedCategory === "all" ? "#fff" : "#888",
                borderRadius: "2px",
              }}
            >
              Tất cả danh mục ({MOCK_PRODUCTS.length})
            </button>
            {MOCK_CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                style={{
                  padding: "8px 20px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  border: "none",
                  backgroundColor: selectedCategory === cat.slug ? "rgba(255,255,255,0.15)" : "transparent",
                  color: selectedCategory === cat.slug ? "#fff" : "#888",
                  borderRadius: "2px",
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 20px",
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <h3 style={{ fontSize: "18px", marginBottom: "8px" }}>Không tìm thấy thiết bị phù hợp</h3>
              <p style={{ color: "#a1a1aa", fontSize: "14px" }}>
                Vui lòng thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setFilterMode("all");
                  setSearchQuery("");
                }}
                style={{
                  marginTop: "16px",
                  padding: "10px 24px",
                  backgroundColor: "#fff",
                  color: "#000",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                  fontSize: "12px",
                  textTransform: "uppercase",
                }}
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product, index) => (
                <article className="product-card" key={product.id}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="product-image"
                    aria-label={`Xem ${product.name}`}
                  >
                    <span className="product-index">0{index + 1}</span>

                    {/* Visual Badge */}
                    <div
                      style={{
                        position: "absolute",
                        top: "16px",
                        right: "16px",
                        display: "flex",
                        gap: "6px",
                        zIndex: 2,
                      }}
                    >
                      {product.sale_enabled && (
                        <span
                          style={{
                            fontSize: "9px",
                            fontWeight: 800,
                            letterSpacing: "0.08em",
                            padding: "4px 8px",
                            backgroundColor: "rgba(255,255,255,0.9)",
                            color: "#000",
                            textTransform: "uppercase",
                          }}
                        >
                          Bán
                        </span>
                      )}
                      {product.rental_enabled && (
                        <span
                          style={{
                            fontSize: "9px",
                            fontWeight: 800,
                            letterSpacing: "0.08em",
                            padding: "4px 8px",
                            backgroundColor: "#22c55e",
                            color: "#000",
                            textTransform: "uppercase",
                          }}
                        >
                          Thuê
                        </span>
                      )}
                    </div>

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

                  <div className="product-info">
                    <p>{product.category_name || product.brand}</p>
                    <h3>{product.name}</h3>
                    <span>{product.description}</span>

                    {/* Price Block */}
                    <div style={{ margin: "16px 0", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "12px" }}>
                      {product.sale_enabled && (
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                          <span style={{ fontSize: "11px", color: "#888" }}>Giá bán:</span>
                          <strong style={{ fontSize: "14px", color: "#fff" }}>
                            {formatCurrency(product.sale_price)}
                          </strong>
                        </div>
                      )}
                      {product.rental_enabled && (
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ fontSize: "11px", color: "#22c55e" }}>Giá thuê:</span>
                          <span style={{ fontSize: "13px", color: "#22c55e", fontWeight: 600 }}>
                            {formatCurrency(product.rental_price)} / ngày
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                      <Link
                        href={`/products/${product.slug}`}
                        className="product-link"
                        style={{ flex: 1, textAlign: "center" }}
                      >
                        Chi tiết <span>→</span>
                      </Link>

                      {product.sale_enabled && (
                        <button
                          onClick={() => addItem(product, 1)}
                          style={{
                            padding: "8px 12px",
                            backgroundColor: "rgba(255,255,255,0.1)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            color: "#fff",
                            fontSize: "11px",
                            fontWeight: 700,
                            cursor: "pointer",
                            transition: "background 180ms ease",
                          }}
                          aria-label="Thêm vào giỏ hàng"
                        >
                          + Giỏ hàng
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "#090909" }} />}>
      <ProductsContent />
    </Suspense>
  );
}
