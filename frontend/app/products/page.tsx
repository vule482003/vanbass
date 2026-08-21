"use client";

import { startTransition, useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "../lib/mock-data";
import { Product, Category } from "../lib/types";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("search") || "";

  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [filterMode, setFilterMode] = useState<"all" | "sale" | "rental">("all");
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<string>("featured");

  useEffect(() => {
    const urlSearch = searchParams.get("search");
    if (urlSearch !== null) {
      startTransition(() => setSearchQuery(urlSearch));
    }
  }, [searchParams]);

  // Fetch live products & categories from PostgreSQL
  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
        const [prodRes, catRes] = await Promise.all([
          fetch(`${apiUrl}/products`),
          fetch(`${apiUrl}/categories`),
        ]);

        if (prodRes.ok) {
          const prodData = await prodRes.json();
          if (Array.isArray(prodData) && prodData.length > 0) {
            setProducts(prodData);
          }
        }

        if (catRes.ok) {
          const catData = await catRes.json();
          if (Array.isArray(catData) && catData.length > 0) {
            setCategories(catData);
          }
        }
      } catch (err) {
        console.error("Failed to fetch live product catalog:", err);
      }
    };

    fetchLiveData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== "all") {
        const cat = categories.find((c) => c.slug === selectedCategory);
        if (cat && product.category_id && product.category_id !== cat.id && product.category_slug !== selectedCategory) {
          return false;
        }
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
        const matchSku = product.sku?.toLowerCase().includes(query);
        if (!matchName && !matchBrand && !matchDesc && !matchSku) return false;
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
  }, [products, categories, selectedCategory, filterMode, searchQuery, sortBy]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <main style={{ flex: 1, paddingTop: "120px", paddingBottom: "100px" }}>
        <div className="container">
          {/* Page Heading */}
          <div style={{ marginBottom: "40px" }}>
            <p className="section-kicker">DANH MỤC THIẾT BỊ</p>
            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                margin: "0 0 12px 0",
              }}
            >
              Thiết Bị DJ & Âm Thanh Chuyên Nghiệp
            </h1>
            <p style={{ color: "#a1a1aa", fontSize: "16px", maxWidth: "700px", margin: 0 }}>
              Cung cấp giải pháp mua bán và cho thuê thiết bị DJ, DJ Controller, CDJ, Mixer, Loa kiểm âm chính hãng tại Đà Nẵng.
            </p>
          </div>

          {/* Filters Bar */}
          <div
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              padding: "24px",
              marginBottom: "40px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* Top row: Categories tabs */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "#71717a", textTransform: "uppercase", marginRight: "8px" }}>
                Danh mục:
              </span>
              <button
                className={`button button-sm ${selectedCategory === "all" ? "button-primary" : "button-secondary"}`}
                onClick={() => setSelectedCategory("all")}
              >
                Tất cả ({products.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`button button-sm ${selectedCategory === cat.slug ? "button-primary" : "button-secondary"}`}
                  onClick={() => setSelectedCategory(cat.slug)}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Bottom row: Search + Mode + Sort */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
                alignItems: "center",
                paddingTop: "16px",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              {/* Search input */}
              <div>
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên máy, hãng, SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    backgroundColor: "#0d0d0d",
                    border: "1px solid var(--border)",
                    color: "#fff",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Mode filter (All / Sale / Rental) */}
              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  className={`button button-sm ${filterMode === "all" ? "button-primary" : "button-secondary"}`}
                  onClick={() => setFilterMode("all")}
                  style={{ flex: 1 }}
                >
                  Tất cả
                </button>
                <button
                  className={`button button-sm ${filterMode === "sale" ? "button-primary" : "button-secondary"}`}
                  onClick={() => setFilterMode("sale")}
                  style={{ flex: 1 }}
                >
                  Mua bán
                </button>
                <button
                  className={`button button-sm ${filterMode === "rental" ? "button-primary" : "button-secondary"}`}
                  onClick={() => setFilterMode("rental")}
                  style={{ flex: 1 }}
                >
                  Cho thuê
                </button>
              </div>

              {/* Sort by */}
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    backgroundColor: "#0d0d0d",
                    border: "1px solid var(--border)",
                    color: "#fff",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                    cursor: "pointer",
                  }}
                >
                  <option value="featured">Sắp xếp: Mặc định nổi bật</option>
                  <option value="price_asc">Giá bán: Thấp đến Cao</option>
                  <option value="price_desc">Giá bán: Cao đến Thấp</option>
                  <option value="name">Tên sản phẩm: A - Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div style={{ marginBottom: "24px", color: "#a1a1aa", fontSize: "14px" }}>
            Hiển thị <strong>{filteredProducts.length}</strong> thiết bị
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                padding: "60px 24px",
                textAlign: "center",
              }}
            >
              <p style={{ color: "#a1a1aa", fontSize: "16px", marginBottom: "16px" }}>
                Không tìm thấy thiết bị nào phù hợp với bộ lọc hiện tại.
              </p>
              <button
                className="button button-primary"
                onClick={() => {
                  setSelectedCategory("all");
                  setFilterMode("all");
                  setSearchQuery("");
                }}
              >
                Đặt lại bộ lọc
              </button>
            </div>
          ) : (
            <div className="vb-product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
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
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#090909", color: "#fff" }}>
          Đang tải danh mục thiết bị VanBass...
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
