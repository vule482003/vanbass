"use client";

import { startTransition, useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import VisualCategoryBar from "../components/VisualCategoryBar";
import QuickViewModal from "../components/QuickViewModal";
import CompareDrawer from "../components/CompareDrawer";
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "../lib/mock-data";
import { Product, Category } from "../lib/types";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("search") || "";
  const rawMode = searchParams.get("mode") || searchParams.get("type") || searchParams.get("filter");
  const initialMode: "all" | "sale" | "rental" =
    rawMode === "rental" ? "rental" : rawMode === "sale" ? "sale" : "all";

  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [filterMode, setFilterMode] = useState<"all" | "sale" | "rental">(initialMode);
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<string>("featured");

  // Group C Features States
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);

  const handleToggleCompare = (product: Product) => {
    setComparedProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 3) {
        alert("Bạn chỉ có thể chọn tối đa 3 sản phẩm để so sánh!");
        return prev;
      }
      return [...prev, product];
    });
  };

  const handleRemoveCompare = (productId: string) => {
    setComparedProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleClearCompare = () => {
    setComparedProducts([]);
  };

  useEffect(() => {
    const urlSearch = searchParams.get("search");
    if (urlSearch !== null) {
      startTransition(() => setSearchQuery(urlSearch));
    }
  }, [searchParams]);

  useEffect(() => {
    const modeParam = searchParams.get("mode") || searchParams.get("type") || searchParams.get("filter");
    if (modeParam === "rental" || modeParam === "sale" || modeParam === "all") {
      startTransition(() => setFilterMode(modeParam));
    }
  }, [searchParams]);

  useEffect(() => {
    const catParam = searchParams.get("category");
    if (catParam) {
      startTransition(() => setSelectedCategory(catParam));
    }
  }, [searchParams]);

  const handleFilterModeChange = (mode: "all" | "sale" | "rental") => {
    setFilterMode(mode);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (mode === "all") {
        url.searchParams.delete("mode");
      } else {
        url.searchParams.set("mode", mode);
      }
      window.history.replaceState(null, "", url.toString());
    }
  };

  // Fetch live products & categories from PostgreSQL
  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
        const cacheBust = `_t=${Date.now()}`;
        const [prodRes, catRes] = await Promise.all([
          fetch(`${apiUrl}/products?${cacheBust}`, { cache: "no-store" }),
          fetch(`${apiUrl}/categories?${cacheBust}`, { cache: "no-store" }),
        ]);

        if (prodRes.ok) {
          const prodData = await prodRes.json();
          if (Array.isArray(prodData)) {
            setProducts(prodData);
          }
        }

        if (catRes.ok) {
          const catData = await catRes.json();
          if (Array.isArray(catData)) {
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
        if (cat) {
          const matchId = Boolean(product.category_id && product.category_id === cat.id);
          const matchSlug = Boolean(product.category_slug && product.category_slug === selectedCategory);
          if (!matchId && !matchSlug) return false;
        } else if (product.category_slug !== selectedCategory) {
          return false;
        }
      }
      // Mode filter
      if (filterMode === "sale" && !product.sale_enabled) return false;
      if (filterMode === "rental" && !product.rental_enabled) return false;

      // Brand filter
      if (selectedBrand !== "all") {
        if (!product.brand || product.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
          return false;
        }
      }

      // Price range filter
      if (priceRange !== "all") {
        const price = filterMode === "rental"
          ? (product.rental_price || product.sale_price || 0)
          : (product.sale_price || 0);

        if (priceRange === "under_20m" && price >= 20000000) return false;
        if (priceRange === "20m_50m" && (price < 20000000 || price > 50000000)) return false;
        if (priceRange === "50m_100m" && (price < 50000000 || price > 100000000)) return false;
        if (priceRange === "over_100m" && price <= 100000000) return false;
      }

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
        const priceA = filterMode === "rental" ? (a.rental_price || a.sale_price || 0) : (a.sale_price || 0);
        const priceB = filterMode === "rental" ? (b.rental_price || b.sale_price || 0) : (b.sale_price || 0);
        return priceA - priceB;
      }
      if (sortBy === "price_desc") {
        const priceA = filterMode === "rental" ? (a.rental_price || a.sale_price || 0) : (a.sale_price || 0);
        const priceB = filterMode === "rental" ? (b.rental_price || b.sale_price || 0) : (b.sale_price || 0);
        return priceB - priceA;
      }
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [products, categories, selectedCategory, filterMode, selectedBrand, priceRange, searchQuery, sortBy]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <main style={{ flex: 1, paddingTop: "120px", paddingBottom: "160px" }}>
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

          {/* Visual Showcase Category Bar & Command Toolbar (Concept 2) */}
          <VisualCategoryBar
            categories={categories}
            products={products}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            filterMode={filterMode}
            onFilterModeChange={handleFilterModeChange}
            selectedBrand={selectedBrand}
            onSelectBrand={setSelectedBrand}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalFiltered={filteredProducts.length}
          />

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
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
                  handleFilterModeChange("all");
                  setSelectedBrand("all");
                  setPriceRange("all");
                  setSearchQuery("");
                }}
              >
                Đặt lại bộ lọc
              </button>
            </div>
          ) : (
            <div className="vb-product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currentMode={filterMode}
                  onQuickView={setQuickViewProduct}
                  isCompared={comparedProducts.some((p) => p.id === product.id)}
                  onToggleCompare={handleToggleCompare}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Group C Components */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        currentMode={filterMode}
      />

      <CompareDrawer
        products={comparedProducts}
        onRemoveProduct={handleRemoveCompare}
        onClearAll={handleClearCompare}
      />

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
