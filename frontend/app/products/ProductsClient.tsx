"use client";

import { startTransition, useState, useMemo, useEffect, ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import VisualCategoryBar from "../components/VisualCategoryBar";
import QuickViewModal from "../components/QuickViewModal";
import CompareDrawer from "../components/CompareDrawer";
import { Product, Category } from "../lib/types";
import { useLanguage } from "../lib/language-context";
import { getTranslatedProductName } from "../lib/product-i18n";
import { CATEGORY_GROUPS } from "../lib/category-hierarchy";
import { getApiBaseUrl } from "../lib/api";

const ITEMS_PER_PAGE = 20;

function getPageNumbers(current: number, total: number): (number | string)[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 4) {
    return [1, 2, 3, 4, 5, "...", total];
  }
  if (current >= total - 3) {
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  }
  return [1, "...", current - 1, current, current + 1, "...", total];
}

export interface ProductsClientProps {
  initialProducts: Product[];
  initialCategories: Category[];
  initialSearchParams?: {
    page?: string;
    category?: string;
    group?: string;
    mode?: string;
    type?: string;
    filter?: string;
    search?: string;
    brand?: string;
    sort?: string;
  };
  baseCatalogPath?: string;
  pageTitle?: string;
  pageSubtitle?: string;
  seoIntroContent?: ReactNode;
}

export default function ProductsClient({
  initialProducts,
  initialCategories,
  initialSearchParams,
  baseCatalogPath = "/products",
  pageTitle,
  pageSubtitle,
  seoIntroContent,
}: ProductsClientProps) {
  const { t, lang } = useLanguage();
  const searchParams = useSearchParams();

  // Resolve initial parameters from server-passed searchParams first, fallback to client URL searchParams
  const paramCategory =
    initialSearchParams?.category ||
    (initialSearchParams?.group ? `group:${initialSearchParams.group}` : undefined) ||
    searchParams.get("category") ||
    (searchParams.get("group") ? `group:${searchParams.get("group")}` : "all");

  const initialCategory = paramCategory || "all";
  const initialSearch = initialSearchParams?.search ?? (searchParams.get("search") || "");
  const rawMode =
    initialSearchParams?.mode ||
    initialSearchParams?.type ||
    initialSearchParams?.filter ||
    searchParams.get("mode") ||
    searchParams.get("type") ||
    searchParams.get("filter");
  const initialMode: "all" | "sale" | "rental" =
    rawMode === "rental" ? "rental" : rawMode === "sale" ? "sale" : "all";

  const rawPage = parseInt(initialSearchParams?.page || searchParams.get("page") || "1", 10);
  const initialPage = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

  // Primary states initialized with REAL data from server
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [filterMode, setFilterMode] = useState<"all" | "sale" | "rental">(initialMode);
  const [selectedBrand, setSelectedBrand] = useState<string>(initialSearchParams?.brand || "all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [sortBy, setSortBy] = useState<string>(initialSearchParams?.sort || "featured");
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  // Group C Features States
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);

  const buildPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();
    if (selectedCategory && selectedCategory !== "all") {
      if (selectedCategory.startsWith("group:")) {
        params.set("group", selectedCategory.replace("group:", ""));
      } else {
        params.set("category", selectedCategory);
      }
    }
    if (filterMode && filterMode !== "all") {
      params.set("mode", filterMode);
    }
    if (selectedBrand && selectedBrand !== "all") {
      params.set("brand", selectedBrand);
    }
    if (priceRange && priceRange !== "all") {
      params.set("price", priceRange);
    }
    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    }
    if (sortBy && sortBy !== "featured") {
      params.set("sort", sortBy);
    }
    if (pageNumber > 1) {
      params.set("page", pageNumber.toString());
    }
    const qs = params.toString();
    return `${baseCatalogPath}${qs ? `?${qs}` : ""}`;
  };

  const updateUrlPage = (page: number) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (page <= 1) {
        url.searchParams.delete("page");
      } else {
        url.searchParams.set("page", page.toString());
      }
      window.history.replaceState(null, "", url.toString());
    }
  };

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
    const pageParam = searchParams.get("page");
    if (pageParam) {
      const p = parseInt(pageParam, 10);
      if (!isNaN(p) && p >= 1) {
        startTransition(() => setCurrentPage(p));
      }
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

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    updateUrlPage(1);
  };

  const handleFilterModeChange = (mode: "all" | "sale" | "rental") => {
    setFilterMode(mode);
    setCurrentPage(1);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (mode === "all") {
        url.searchParams.delete("mode");
      } else {
        url.searchParams.set("mode", mode);
      }
      url.searchParams.delete("page");
      window.history.replaceState(null, "", url.toString());
    }
  };

  const handleSelectBrand = (brand: string) => {
    setSelectedBrand(brand);
    setCurrentPage(1);
    updateUrlPage(1);
  };

  const handlePriceRangeChange = (range: string) => {
    setPriceRange(range);
    setCurrentPage(1);
    updateUrlPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    updateUrlPage(1);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
    updateUrlPage(1);
  };

  // Background refresh to guarantee fresh client updates if backend state changes
  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const apiUrl = getApiBaseUrl();
        const cacheBust = `_t=${Date.now()}`;
        const [prodRes, catRes] = await Promise.all([
          fetch(`${apiUrl}/products?${cacheBust}`, { cache: "no-store" }),
          fetch(`${apiUrl}/categories?${cacheBust}`, { cache: "no-store" }),
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
        console.error("Failed to refresh live product catalog:", err);
      }
    };

    // If initialProducts was empty, immediately fetch live data
    if (!initialProducts || initialProducts.length === 0) {
      fetchLiveData();
    }
  }, [initialProducts]);

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
        const price = filterMode === "rental" ? (product.rental_price || 0) : (product.sale_price || 0);
        if (priceRange === "under-5m" && price >= 5000000) return false;
        if (priceRange === "5m-15m" && (price < 5000000 || price > 15000000)) return false;
        if (priceRange === "15m-30m" && (price < 15000000 || price > 30000000)) return false;
        if (priceRange === "above-30m" && price <= 30000000) return false;
      }

      // Keyword Search
      if (searchQuery.trim()) {
        const queryLower = searchQuery.toLowerCase().trim();
        const normalize = (str: string) =>
          str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .toLowerCase();

        const cleanPunct = (s: string) => s.replace(/[-_./]/g, " ");

        const qNorm = normalize(queryLower);
        const qClean = cleanPunct(qNorm);

        const nameNorm = normalize(product.name || "");
        const skuNorm = normalize(product.sku || "");
        const slugNorm = normalize(product.slug || "");
        const brandNorm = normalize(product.brand || "");

        const primaryText = `${nameNorm} ${cleanPunct(nameNorm)} ${skuNorm} ${cleanPunct(skuNorm)} ${slugNorm} ${cleanPunct(slugNorm)} ${brandNorm}`;

        if (primaryText.includes(qNorm) || primaryText.includes(qClean)) {
          return true;
        }

        const tokens = qNorm.split(/[\s\-_./]+/).filter(Boolean);
        const stopWords = new Set(["thue", "mua", "ban", "cho", "sua", "chua", "bao", "duong", "thay", "repair", "fix", "dn", "hue", "da", "nang", "hoi", "an", "mien", "trung", "tai", "o", "gia", "re", "chinh", "hang"]);
        const coreTokens = tokens.filter((t) => !stopWords.has(t));
        const effectiveTokens = coreTokens.length > 0 ? coreTokens : tokens;

        const matchTokensPrimary = effectiveTokens.every((token) => primaryText.includes(token));
        if (matchTokensPrimary) return true;

        // Fallback for full-text descriptions when query is longer than 4 chars (avoiding false hits for model shortcodes like rx3)
        if (qNorm.length > 4) {
          const plainDesc = normalize((product.description || "").replace(/<[^>]*>/g, " "));
          const matchDesc = effectiveTokens.every((token) => plainDesc.includes(token));
          if (matchDesc) return true;
        }

        return false;
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
    setCurrentPage(1);
    updateUrlPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedProducts = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, safeCurrentPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === safeCurrentPage) return;
    setCurrentPage(page);
    updateUrlPage(page);
    const section = document.getElementById("vb-products-section");
    if (section) {
      const topOffset = section.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  const fallbackRecommendations = useMemo(() => {
    return products.slice(0, 4);
  }, [products]);

  const renderedTitle = pageTitle || t.productsPage.title;
  const renderedSubtitle = pageSubtitle || t.productsPage.subtitle;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <main style={{ flex: 1, paddingTop: "120px", paddingBottom: "160px" }}>
        <div className="container" id="vb-products-section">
          {/* Page Heading */}
          <div style={{ marginBottom: "40px" }}>
            <p className="section-kicker">{t.productsPage.kicker}</p>
            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                margin: "0 0 12px 0",
              }}
            >
              {renderedTitle}
            </h1>
            <p style={{ color: "#a1a1aa", fontSize: "16px", maxWidth: "700px", margin: 0 }}>
              {renderedSubtitle}
            </p>
          </div>

          {/* Visual Showcase Category Bar & Command Toolbar */}
          <VisualCategoryBar
            categories={categories}
            products={products}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
            filterMode={filterMode}
            onFilterModeChange={handleFilterModeChange}
            selectedBrand={selectedBrand}
            onSelectBrand={handleSelectBrand}
            priceRange={priceRange}
            onPriceRangeChange={handlePriceRangeChange}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
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
                        handleResetAllFilters();
                        handleSearchChange(tag);
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
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
            <>
              {/* 5 rows x 4 items = 20 products per page */}
              <div className="vb-product-grid">
                {paginatedProducts.map((product) => (
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

              {/* Modern Crawlable Pagination Controls */}
              {totalPages > 1 && (
                <nav
                  aria-label="Product catalog pagination"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "16px",
                    marginTop: "52px",
                    paddingTop: "32px",
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <p style={{ margin: 0, fontSize: "14px", color: "#a1a1aa" }}>
                    {t.productsPage.showingProducts || "Hiển thị"}{" "}
                    <strong style={{ color: "#ffffff" }}>
                      {(safeCurrentPage - 1) * ITEMS_PER_PAGE + 1}
                      {" - "}
                      {Math.min(safeCurrentPage * ITEMS_PER_PAGE, filteredProducts.length)}
                    </strong>{" "}
                    {t.productsPage.ofTotal || "trên tổng số"}{" "}
                    <strong style={{ color: "#22c55e" }}>{filteredProducts.length}</strong>{" "}
                    {t.productsPage.items || "sản phẩm"}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      flexWrap: "wrap",
                      justifyContent: "center",
                    }}
                  >
                    {/* Previous Page Link Button */}
                    {safeCurrentPage > 1 ? (
                      <Link
                        href={buildPageUrl(safeCurrentPage - 1)}
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(safeCurrentPage - 1);
                        }}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "10px 16px",
                          fontSize: "13.5px",
                          fontWeight: 700,
                          borderRadius: "8px",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          backgroundColor: "rgba(255, 255, 255, 0.06)",
                          color: "#f4f4f5",
                          cursor: "pointer",
                          transition: "all 150ms ease",
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.12)";
                          e.currentTarget.style.color = "#ffffff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.06)";
                          e.currentTarget.style.color = "#f4f4f5";
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="15 18 9 12 15 6" />
                        </svg>
                        <span>{t.productsPage.prevPage || "Trước"}</span>
                      </Link>
                    ) : (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "10px 16px",
                          fontSize: "13.5px",
                          fontWeight: 700,
                          borderRadius: "8px",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          backgroundColor: "rgba(255, 255, 255, 0.02)",
                          color: "rgba(255, 255, 255, 0.25)",
                          cursor: "not-allowed",
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="15 18 9 12 15 6" />
                        </svg>
                        <span>{t.productsPage.prevPage || "Trước"}</span>
                      </span>
                    )}

                    {/* Page Numbers */}
                    {getPageNumbers(safeCurrentPage, totalPages).map((p, idx) => {
                      if (typeof p === "string") {
                        return (
                          <span
                            key={`ellipsis-${idx}`}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "36px",
                              height: "40px",
                              color: "#71717a",
                              fontSize: "14px",
                              fontWeight: 700,
                            }}
                          >
                            ...
                          </span>
                        );
                      }

                      const isActive = p === safeCurrentPage;
                      return (
                        <Link
                          key={`page-${p}`}
                          href={buildPageUrl(p)}
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(p);
                          }}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            minWidth: "40px",
                            height: "40px",
                            padding: "0 12px",
                            fontSize: "14px",
                            fontWeight: isActive ? 800 : 600,
                            borderRadius: "8px",
                            border: isActive ? "1px solid #22c55e" : "1px solid rgba(255, 255, 255, 0.12)",
                            backgroundColor: isActive ? "#22c55e" : "rgba(255, 255, 255, 0.05)",
                            color: isActive ? "#000000" : "#f4f4f5",
                            boxShadow: isActive ? "0 0 16px rgba(34, 197, 94, 0.4)" : "none",
                            cursor: "pointer",
                            transition: "all 150ms ease",
                            textDecoration: "none",
                          }}
                          onMouseEnter={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.12)";
                              e.currentTarget.style.color = "#ffffff";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                              e.currentTarget.style.color = "#f4f4f5";
                            }
                          }}
                        >
                          {p}
                        </Link>
                      );
                    })}

                    {/* Next Page Link Button */}
                    {safeCurrentPage < totalPages ? (
                      <Link
                        href={buildPageUrl(safeCurrentPage + 1)}
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(safeCurrentPage + 1);
                        }}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "10px 16px",
                          fontSize: "13.5px",
                          fontWeight: 700,
                          borderRadius: "8px",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          backgroundColor: "rgba(255, 255, 255, 0.06)",
                          color: "#f4f4f5",
                          cursor: "pointer",
                          transition: "all 150ms ease",
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.12)";
                          e.currentTarget.style.color = "#ffffff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.06)";
                          e.currentTarget.style.color = "#f4f4f5";
                        }}
                      >
                        <span>{t.productsPage.nextPage || "Sau"}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </Link>
                    ) : (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "10px 16px",
                          fontSize: "13.5px",
                          fontWeight: 700,
                          borderRadius: "8px",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          backgroundColor: "rgba(255, 255, 255, 0.02)",
                          color: "rgba(255, 255, 255, 0.25)",
                          cursor: "not-allowed",
                        }}
                      >
                        <span>{t.productsPage.nextPage || "Sau"}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </span>
                    )}
                  </div>
                </nav>
              )}
            </>
          )}

          {/* SEO Content Section / Hub */}
          {seoIntroContent || (
            <section
              style={{
                marginTop: "80px",
                paddingTop: "60px",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              {/* Header Lockup */}
              <div style={{ textAlign: "center", marginBottom: "40px" }}>
                <span
                  style={{
                    color: "#22c55e",
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    display: "inline-block",
                    marginBottom: "8px",
                  }}
                >
                  ĐẠI LÝ CHÍNH HÃNG PIONEER DJ & ALPHATHETA
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "clamp(22px, 3.2vw, 32px)",
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "-0.02em",
                    margin: 0,
                    textTransform: "uppercase",
                  }}
                >
                  Trung Tâm Mua Bán Bàn DJ Uy Tín Số 1 Tại Đà Nẵng & Miền Trung
                </h2>
                <p style={{ color: "#a1a1aa", fontSize: "14.5px", maxWidth: "780px", margin: "12px auto 0 auto", lineHeight: 1.6 }}>
                  VanBass Music Center là đơn vị chuyên phân phối bàn DJ Pioneer DJ, AlphaTheta mới 100% đập hộp và hàng like new 99% tuyển chọn kỹ thuật, bảo hành chính hãng từ 12 đến 24 tháng, hỗ trợ trả góp 0% và thu cũ đổi mới.
                </p>
              </div>

              {/* 4 Feature Highlights Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "20px",
                  marginBottom: "45px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(18, 18, 22, 0.85)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "12px",
                    padding: "24px",
                  }}
                >
                  <div style={{ fontSize: "28px", marginBottom: "12px" }}>🛡️</div>
                  <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#ffffff", marginBottom: "8px" }}>100% Chính Hãng - Bảo Hành 12-24T</h3>
                  <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
                    Cam kết thiết bị nguyên seal hoặc tuyển chọn like new 98-99% fader chuẩn. Đầy đủ hóa đơn, tem bảo hành chính hãng và hỗ trợ linh kiện thay thế trọn đời.
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: "rgba(18, 18, 22, 0.85)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "12px",
                    padding: "24px",
                  }}
                >
                  <div style={{ fontSize: "28px", marginBottom: "12px" }}>💳</div>
                  <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#ffffff", marginBottom: "8px" }}>Trả Góp 0% Lãi Suất Linh Hoạt</h3>
                  <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
                    Hỗ trợ thủ tục trả góp 0% qua thẻ tín dụng hoặc CCCD nhanh chóng chỉ trong 10 phút. Nhận máy ngay, chi trả linh hoạt theo từng tháng.
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: "rgba(18, 18, 22, 0.85)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "12px",
                    padding: "24px",
                  }}
                >
                  <div style={{ fontSize: "28px", marginBottom: "12px" }}>🎧</div>
                  <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#ffffff", marginBottom: "8px" }}>Tặng Kho Nhạc 100GB & Khóa Học DJ</h3>
                  <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
                    Tặng kèm gói nhạc House, Vinahouse, Techno, Hip-hop chất lượng cao 320kbps/WAV tuyển chọn cùng khóa hướng dẫn làm quen thiết bị từ DJ có kinh nghiệm.
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: "rgba(18, 18, 22, 0.85)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "12px",
                    padding: "24px",
                  }}
                >
                  <div style={{ fontSize: "28px", marginBottom: "12px" }}>🚀</div>
                  <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#ffffff", marginBottom: "8px" }}>Giao Hỏa Tốc & Setup Tận Nơi</h3>
                  <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
                    Giao hàng hỏa tốc trong 2 giờ tại Đà Nẵng, Hội An, Huế. Kỹ thuật viên hỗ trợ cài đặt Rekordbox, Serato DJ và cân chỉnh âm thanh tận nhà.
                  </p>
                </div>
              </div>

              {/* Buying Guide Snippet */}
              <div
                style={{
                  backgroundColor: "rgba(14, 14, 18, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  borderRadius: "12px",
                  padding: "28px",
                  marginTop: "20px",
                }}
              >
                <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#ffffff", marginBottom: "14px" }}>
                  Kinh Nghiệm Chọn Mua Bàn DJ Phù Hợp Cho Người Mới Và DJ Chuyên Nghiệp
                </h3>
                <div style={{ fontSize: "14px", color: "#d4d4d8", lineHeight: 1.7, display: "flex", flexDirection: "column", gap: "12px" }}>
                  <p>
                    <strong>1. Phân khúc DJ Controller (Dành cho người mới học và biểu diễn tiệc nhỏ):</strong> Các mẫu như <em>Pioneer DDJ-FLX4</em>, <em>AlphaTheta DDJ-FLX2</em> có mức giá từ 5 đến 11 triệu đồng, kết nối dễ dàng với Laptop, iPad, Smartphone qua Rekordbox hoặc Serato DJ. Tính năng Smart Fader giúp người mới tập chuyển bài cực kỳ mượt mà.
                  </p>
                  <p>
                    <strong>2. Phân khúc All-In-One Độc Lập (Dành cho DJ chuyên nghiệp, Bar, Pub, Villa):</strong> Các mẫu như <em>Pioneer DJ XDJ-RX3</em>, <em>AlphaTheta OMNIS-DUO</em>, <em>AlphaTheta XDJ-AZ 4 kênh</em> cho phép cắm trực tiếp USB chơi nhạc độc lập với màn hình cảm ứng sắc nét từ 7 đến 10.1 inch, không lo giật lag hay treo laptop khi đang biểu diễn.
                  </p>
                  <p>
                    <strong>3. Địa chỉ mua hàng và hỗ trợ kỹ thuật trực tiếp:</strong> Quý khách hàng tại Đà Nẵng, Quảng Nam, Thừa Thiên Huế có thể liên hệ trực tiếp đội ngũ tư vấn: <strong>Mr. Tuyến (0905 614 566)</strong>, <strong>Mr. Tuấn (0944 498 987)</strong>, <strong>Mr. Vân (0706 067 799)</strong> hoặc ghé Showroom tại <strong>77 Nguyễn Tất Thành, phường Hải Châu, thành phố Đà Nẵng</strong> và <strong>442 Chi Lăng (TP Huế)</strong> để nhận tư vấn cấu hình và báo giá ưu đãi nhất.
                  </p>
                </div>
              </div>
            </section>
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
