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
import { useLanguage } from "../lib/language-context";
import { getTranslatedProductName, getProductPlainExcerpt } from "../lib/product-i18n";
import { CATEGORY_GROUPS } from "../lib/category-hierarchy";

function ProductsContent() {
  const { t, lang } = useLanguage();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || (searchParams.get("group") ? `group:${searchParams.get("group")}` : "all");
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
        alert(t.compareDrawer.maxAlert);
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
    const groupParam = searchParams.get("group");
    if (catParam) {
      startTransition(() => setSelectedCategory(catParam));
    } else if (groupParam) {
      startTransition(() => setSelectedCategory(`group:${groupParam}`));
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
      // Category or Group filter
      if (selectedCategory !== "all") {
        const cat = categories.find((c) => c.id === product.category_id);
        const prodSlug = product.category_slug || cat?.slug || "";

        if (selectedCategory.startsWith("group:")) {
          const groupId = selectedCategory.replace("group:", "");
          const group = CATEGORY_GROUPS.find((g) => g.id === groupId);
          if (group) {
            const groupSlugs = new Set(group.subcategories.map((s) => s.slug));
            if (groupId === "dj") groupSlugs.add("dj");
            if (groupId === "audio") {
              groupSlugs.add("audio");
              groupSlugs.add("mixer");
            }
            if (groupId === "effects") groupSlugs.add("stage-effects");
            if (groupId === "accessories") groupSlugs.add("accessories");

            if (!prodSlug || !groupSlugs.has(prodSlug)) return false;
          }
        } else {
          const targetCat = categories.find((c) => c.slug === selectedCategory);
          const matchId = Boolean(targetCat && product.category_id === targetCat.id);
          const matchSlug = Boolean(product.category_slug === selectedCategory);
          const matchComputedSlug = Boolean(prodSlug === selectedCategory);

          if (!matchId && !matchSlug && !matchComputedSlug) return false;
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

        if ((priceRange === "under_10m" || priceRange === "under_20m") && price >= 10000000) return false;
        if (priceRange === "10m_25m" && (price < 10000000 || price > 25000000)) return false;
        if ((priceRange === "25m_50m" || priceRange === "20m_50m") && (price < 25000000 || price > 50000000)) return false;
        if (priceRange === "50m_100m" && (price < 50000000 || price > 100000000)) return false;
        if (priceRange === "over_100m" && price <= 100000000) return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const trName = getTranslatedProductName(product, lang).toLowerCase();
        const matchName = product.name.toLowerCase().includes(query) || trName.includes(query);
        const matchBrand = product.brand?.toLowerCase().includes(query);
        const plainDesc = getProductPlainExcerpt(product.description, 5000).toLowerCase();
        const matchDesc = plainDesc.includes(query);
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
        const nameA = getTranslatedProductName(a, lang);
        const nameB = getTranslatedProductName(b, lang);
        return nameA.localeCompare(nameB);
      }
      return 0;
    });
  }, [products, categories, selectedCategory, filterMode, selectedBrand, priceRange, searchQuery, sortBy, lang]);

  const handleResetAllFilters = () => {
    setSelectedCategory("all");
    handleFilterModeChange("all");
    setSelectedBrand("all");
    setPriceRange("all");
    setSearchQuery("");
  };

  const fallbackRecommendations = useMemo(() => {
    return products.slice(0, 4);
  }, [products]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <main style={{ flex: 1, paddingTop: "120px", paddingBottom: "160px" }}>
        <div className="container">
          {/* Page Heading */}
          <div style={{ marginBottom: "40px" }}>
            <p className="section-kicker">{t.productsPage.kicker}</p>
            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                margin: "0 0 12px 0",
              }}
            >
              {t.productsPage.title}
            </h1>
            <p style={{ color: "#a1a1aa", fontSize: "16px", maxWidth: "700px", margin: 0 }}>
              {t.productsPage.subtitle}
            </p>
          </div>

          {/* Visual Showcase Category Bar & Command Toolbar */}
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

          {/* Products Grid or Smart Empty State */}
          {filteredProducts.length === 0 ? (
            <div className="vb-empty-catalog-card">
              {/* Pulsing Radar/Search Icon */}
              <div className="vb-empty-icon-wrap">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>

              <h2 className="vb-empty-title">
                {lang === "en" ? "No Matching Equipment Found" : "Không Tìm Thấy Thiết Bị Phù Hợp"}
              </h2>
              <p className="vb-empty-desc">
                {searchQuery.trim() ? (
                  lang === "en"
                    ? `We couldn't find any items matching "${searchQuery}". Try a different keyword or reset your active filters below.`
                    : `Không tìm thấy thiết bị nào khớp với từ khóa "${searchQuery}". Hãy thử từ khóa khác hoặc đặt lại bộ lọc.`
                ) : (
                  lang === "en"
                    ? "No audio equipment matches your current filter combination. Please reset filters to explore our full pro collection."
                    : "Không có thiết bị âm thanh nào khớp với bộ lọc hiện tại của bạn. Vui lòng đặt lại bộ lọc để xem toàn bộ 700+ thiết bị."
                )}
              </p>

              {/* Reset CTA */}
              <div className="vb-empty-actions">
                <button
                  type="button"
                  className="button button-primary vb-empty-reset-btn"
                  onClick={handleResetAllFilters}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="1 4 1 10 7 10" />
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                  </svg>
                  {lang === "en" ? "Reset All Filters" : "Đặt Lại Toàn Bộ Bộ Lọc"}
                </button>
              </div>

              {/* Popular Search Suggestions */}
              <div className="vb-empty-suggestions-box">
                <span className="vb-empty-suggestions-label">
                  {lang === "en" ? "Popular suggestions:" : "Gợi ý từ khóa phổ biến:"}
                </span>
                <div className="vb-empty-suggestions-chips">
                  {["Pioneer DJ", "XDJ-RX3", "DDJ-FLX4", "Loa Nexo", "Yamaha", "Micro Không Dây", "Máy Tạo Khói"].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className="vb-empty-suggestion-chip"
                      onClick={() => {
                        setSelectedCategory("all");
                        setSelectedBrand("all");
                        setPriceRange("all");
                        handleFilterModeChange("all");
                        setSearchQuery(tag);
                      }}
                    >
                      <span className="chip-icon">🔍</span>
                      <span>{tag}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Fallback Recommendations Grid */}
              {fallbackRecommendations.length > 0 && (
                <div className="vb-empty-recommendations-section">
                  <div className="vb-empty-recommendations-header">
                    <span className="vb-empty-recommendations-kicker">
                      {lang === "en" ? "FEATURED PRO GEAR" : "THIẾT BỊ NỔI BẬT ĐỀ XUẤT"}
                    </span>
                    <h3 className="vb-empty-recommendations-title">
                      {lang === "en" ? "You Might Also Be Interested In" : "Có Thể Bạn Sẽ Quan Tâm"}
                    </h3>
                  </div>

                  <div className="vb-product-grid">
                    {fallbackRecommendations.map((product) => (
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
                </div>
              )}
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
  const { t } = useLanguage();

  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#090909", color: "#fff" }}>
          {t.productsPage.loading}
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
