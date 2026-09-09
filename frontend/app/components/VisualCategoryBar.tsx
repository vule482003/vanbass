"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { Category, Product } from "../lib/types";
import { useLanguage } from "../lib/language-context";
import {
  CATEGORY_GROUPS,
  getParentGroupBySubSlug,
  getSubcategoryDisplayName,
} from "../lib/category-hierarchy";

interface VisualCategoryBarProps {
  categories: Category[];
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
  filterMode: "all" | "sale" | "rental";
  onFilterModeChange: (mode: "all" | "sale" | "rental") => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalFiltered: number;
  selectedBrand?: string;
  onSelectBrand?: (brand: string) => void;
  priceRange?: string;
  onPriceRangeChange?: (range: string) => void;
}

export default function VisualCategoryBar({
  categories,
  products,
  selectedCategory,
  onSelectCategory,
  filterMode,
  onFilterModeChange,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalFiltered,
  selectedBrand = "all",
  onSelectBrand,
  priceRange = "all",
  onPriceRangeChange,
}: VisualCategoryBarProps) {
  const { t, lang } = useLanguage();

  // Custom Dropdown Popover States
  const [openDropdown, setOpenDropdown] = useState<"brand" | "price" | "sort" | null>(null);
  const [brandSearchInput, setBrandSearchInput] = useState("");
  const toolbarRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (toolbarRef.current && !toolbarRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Map category_id (UUID from DB) to category slug
  const categoryIdToSlug = useMemo(() => {
    const map = new Map<string, string>();
    categories.forEach((c) => {
      map.set(c.id, c.slug);
    });
    return map;
  }, [categories]);

  // Extract canonical normalized brands + product counts (Clean deduplicated brands)
  const availableBrands = useMemo(() => {
    const brandMap = new Map<string, { key: string; name: string; count: number }>();

    products.forEach((p) => {
      if (!p.brand) return;
      const raw = p.brand.trim();
      if (!raw) return;
      const lower = raw.toLowerCase();

      // Normalize brand display names (Fix duplicates like ANTARI / Antari, B&C SPEAKERS / B&C Speakers)
      if (!brandMap.has(lower)) {
        let displayName = raw;
        if (lower === "antari") displayName = "Antari";
        else if (lower === "b&c speakers" || lower === "b&c") displayName = "B&C Speakers";
        else if (lower === "behringer") displayName = "Behringer";
        else if (lower === "dixon") displayName = "Dixon";
        else if (lower === "fox") displayName = "Fox";
        else if (lower === "g.music" || lower === "gmusic") displayName = "G.Music";
        else if (lower === "jbl") displayName = "JBL";
        else if (lower === "klotz") displayName = "Klotz";
        else if (lower === "marani") displayName = "Marani";
        else if (lower === "nexo") displayName = "Nexo";
        else if (lower === "pioneer dj" || lower === "pioneer") displayName = "Pioneer DJ";
        else if (lower === "yamaha") displayName = "Yamaha";
        else if (lower === "alphatheta") displayName = "AlphaTheta";
        else if (lower === "shure") displayName = "Shure";
        else if (lower === "sennheiser") displayName = "Sennheiser";
        else if (lower === "allen & heath") displayName = "Allen & Heath";
        else if (raw === raw.toUpperCase() && raw.length > 3) {
          displayName = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
        }

        brandMap.set(lower, { key: lower, name: displayName, count: 0 });
      }

      const item = brandMap.get(lower)!;
      if (filterMode === "sale" && !p.sale_enabled) return;
      if (filterMode === "rental" && !p.rental_enabled) return;
      item.count += 1;
    });

    return Array.from(brandMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [products, filterMode]);

  // Filtered brands by brandSearchInput
  const filteredBrands = useMemo(() => {
    if (!brandSearchInput.trim()) return availableBrands;
    const q = brandSearchInput.toLowerCase();
    return availableBrands.filter((b) => b.name.toLowerCase().includes(q));
  }, [availableBrands, brandSearchInput]);

  // Selected brand display name
  const selectedBrandDisplayName = useMemo(() => {
    if (selectedBrand === "all") return null;
    const found = availableBrands.find(
      (b) => b.key === selectedBrand.toLowerCase() || b.name.toLowerCase() === selectedBrand.toLowerCase()
    );
    return found ? found.name : selectedBrand;
  }, [selectedBrand, availableBrands]);

  // Compute accurate product counts per subcategory
  const subcategoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: 0 };
    categories.forEach((c) => {
      counts[c.slug] = 0;
    });

    products.forEach((p) => {
      if (filterMode === "sale" && !p.sale_enabled) return;
      if (filterMode === "rental" && !p.rental_enabled) return;

      counts.all = (counts.all || 0) + 1;

      const slug = p.category_slug || (p.category_id ? categoryIdToSlug.get(p.category_id) : undefined);
      if (slug) {
        counts[slug] = (counts[slug] || 0) + 1;
      }
    });

    return counts;
  }, [products, categories, categoryIdToSlug, filterMode]);

  // Compute total count per parent group
  const groupCounts = useMemo(() => {
    const counts: Record<string, number> = { all: subcategoryCounts.all || 0 };
    CATEGORY_GROUPS.forEach((group) => {
      let sum = 0;
      group.subcategories.forEach((sub) => {
        sum += subcategoryCounts[sub.slug] || 0;
      });
      if (group.id === "dj") sum += subcategoryCounts["dj"] || 0;
      if (group.id === "audio") sum += (subcategoryCounts["audio"] || 0) + (subcategoryCounts["mixer"] || 0);
      if (group.id === "effects") sum += subcategoryCounts["stage-effects"] || 0;
      if (group.id === "accessories") sum += subcategoryCounts["accessories"] || 0;

      counts[group.id] = sum;
    });
    return counts;
  }, [subcategoryCounts]);

  // Active Parent Group State
  const initialGroup = useMemo(() => {
    if (selectedCategory === "all") return "all";
    if (selectedCategory.startsWith("group:")) return selectedCategory.replace("group:", "");
    const parent = getParentGroupBySubSlug(selectedCategory);
    return parent ? parent.id : "all";
  }, [selectedCategory]);

  const [activeGroupId, setActiveGroupId] = useState<string>(initialGroup);
  const [prevSelectedCategory, setPrevSelectedCategory] = useState(selectedCategory);

  // Sync state if selectedCategory prop changes from external sources (URL, header dropdown)
  if (prevSelectedCategory !== selectedCategory) {
    setPrevSelectedCategory(selectedCategory);
    if (selectedCategory === "all") {
      setActiveGroupId("all");
    } else if (selectedCategory.startsWith("group:")) {
      setActiveGroupId(selectedCategory.replace("group:", ""));
    } else {
      const parent = getParentGroupBySubSlug(selectedCategory);
      if (parent) {
        setActiveGroupId(parent.id);
      }
    }
  }

  const activeGroup = CATEGORY_GROUPS.find((g) => g.id === activeGroupId);

  const handleSelectGroup = (groupId: string) => {
    setActiveGroupId(groupId);
    if (groupId === "all") {
      onSelectCategory("all");
    } else {
      onSelectCategory(`group:${groupId}`);
    }
  };

  const PRICE_RANGE_OPTIONS = useMemo(
    () => [
      { value: "all", labelVi: "Tất cả mức giá", labelEn: "All Prices" },
      { value: "under_10m", labelVi: "Dưới 10 triệu", labelEn: "Under 10M (< 10 Tr)" },
      { value: "10m_25m", labelVi: "10 - 25 triệu", labelEn: "10M - 25M (10 - 25 Tr)" },
      { value: "25m_50m", labelVi: "25 - 50 triệu", labelEn: "25M - 50M (25 - 50 Tr)" },
      { value: "50m_100m", labelVi: "50 - 100 triệu", labelEn: "50M - 100M (50 - 100 Tr)" },
      { value: "over_100m", labelVi: "Trên 100 triệu", labelEn: "Above 100M (> 100 Tr)" },
    ],
    []
  );

  const SORT_OPTIONS = useMemo(
    () => [
      { value: "featured", labelVi: "Mới nhất", labelEn: "Newest" },
      { value: "price_asc", labelVi: "Giá: Thấp → Cao", labelEn: "Price: Low → High" },
      { value: "price_desc", labelVi: "Giá: Cao → Thấp", labelEn: "Price: High → Low" },
      { value: "name", labelVi: "Tên: A → Z", labelEn: "Name: A → Z" },
    ],
    []
  );

  const activePriceLabel = useMemo(() => {
    if (priceRange === "all") return null;
    const opt = PRICE_RANGE_OPTIONS.find((o) => o.value === priceRange);
    return opt ? (lang === "en" ? opt.labelEn : opt.labelVi) : null;
  }, [priceRange, PRICE_RANGE_OPTIONS, lang]);

  const activeSortLabel = useMemo(() => {
    const found = SORT_OPTIONS.find((s) => s.value === sortBy);
    return found ? (lang === "en" ? found.labelEn : found.labelVi) : lang === "en" ? "Sort" : "Sắp xếp";
  }, [sortBy, SORT_OPTIONS, lang]);

  const resetAllFilters = () => {
    setActiveGroupId("all");
    onSelectCategory("all");
    onFilterModeChange("all");
    if (onSelectBrand) onSelectBrand("all");
    if (onPriceRangeChange) onPriceRangeChange("all");
    onSearchChange("");
    setOpenDropdown(null);
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    filterMode !== "all" ||
    searchQuery.trim() !== "" ||
    selectedBrand !== "all" ||
    priceRange !== "all";

  // Selected Category Display Label
  const activeCategoryLabel = useMemo(() => {
    if (selectedCategory === "all") return null;
    if (selectedCategory.startsWith("group:")) {
      const grp = CATEGORY_GROUPS.find((g) => g.id === selectedCategory.replace("group:", ""));
      return grp ? (lang === "en" ? grp.nameEn : grp.nameVi) : null;
    }
    const cat = categories.find((c) => c.slug === selectedCategory);
    return cat ? getSubcategoryDisplayName(cat.slug, lang) : getSubcategoryDisplayName(selectedCategory, lang);
  }, [selectedCategory, categories, lang]);

  return (
    <div className="visual-category-system" style={{ marginBottom: "36px" }} ref={toolbarRef}>
      {/* ============================================================
          TIER 1: PARENT GROUP TABS (5 Elegant Pill Tabs)
         ============================================================ */}
      <div className="category-tier1-container">
        {/* ALL TAB */}
        <button
          type="button"
          onClick={() => handleSelectGroup("all")}
          className={`category-tier1-pill ${activeGroupId === "all" ? "is-active" : ""}`}
        >
          <span className="tier1-label">
            {lang === "en" ? "All Equipment" : "Tất Cả Thiết Bị"}
          </span>
          <span className="tier1-badge">
            {groupCounts.all}
          </span>
        </button>

        {/* 4 CATEGORY GROUPS TABS */}
        {CATEGORY_GROUPS.map((group) => {
          const isActive = activeGroupId === group.id;
          const count = groupCounts[group.id] || 0;

          return (
            <button
              key={group.id}
              type="button"
              onClick={() => handleSelectGroup(group.id)}
              className={`category-tier1-pill ${isActive ? "is-active" : ""}`}
            >
              <span className="tier1-label">
                {lang === "en" ? group.nameEn : group.nameVi}
              </span>
              <span className="tier1-badge">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ============================================================
          TIER 2: SUBCATEGORY CHIPS (Smart Contextual Chips Bar)
         ============================================================ */}
      <div className="category-tier2-wrapper">
        <div className="category-tier2-container">
          {activeGroupId === "all" ? (
            <>
              {/* Popular quick filters when "All" is active */}
              <button
                type="button"
                onClick={() => onSelectCategory("all")}
                className={`category-tier2-chip ${selectedCategory === "all" ? "is-active" : ""}`}
              >
                <span>{lang === "en" ? "All Categories" : "Tất Cả Sản Phẩm"}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveGroupId("dj");
                  onSelectCategory("dj-controllers");
                }}
                className={`category-tier2-chip ${selectedCategory === "dj-controllers" ? "is-active" : ""}`}
              >
                <span>DJ Controllers</span>
                <span className="tier2-count">{subcategoryCounts["dj-controllers"] || 0}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveGroupId("dj");
                  onSelectCategory("all-in-one-dj-systems");
                }}
                className={`category-tier2-chip ${selectedCategory === "all-in-one-dj-systems" ? "is-active" : ""}`}
              >
                <span>All-in-One DJ</span>
                <span className="tier2-count">{subcategoryCounts["all-in-one-dj-systems"] || 0}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveGroupId("audio");
                  onSelectCategory("loa-thung-pro-audio");
                }}
                className={`category-tier2-chip ${selectedCategory === "loa-thung-pro-audio" ? "is-active" : ""}`}
              >
                <span>{lang === "en" ? "Pro Audio Speakers" : "Loa Thùng Pro"}</span>
                <span className="tier2-count">{subcategoryCounts["loa-thung-pro-audio"] || 0}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveGroupId("audio");
                  onSelectCategory("mixer-ban-tron-am-thanh");
                }}
                className={`category-tier2-chip ${selectedCategory === "mixer-ban-tron-am-thanh" ? "is-active" : ""}`}
              >
                <span>{lang === "en" ? "Mixer Consoles" : "Mixer Bàn Trộn"}</span>
                <span className="tier2-count">{subcategoryCounts["mixer-ban-tron-am-thanh"] || 0}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveGroupId("audio");
                  onSelectCategory("micro-khong-day");
                }}
                className={`category-tier2-chip ${selectedCategory === "micro-khong-day" ? "is-active" : ""}`}
              >
                <span>{lang === "en" ? "Wireless Mics" : "Micro Không Dây"}</span>
                <span className="tier2-count">{subcategoryCounts["micro-khong-day"] || 0}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveGroupId("effects");
                  onSelectCategory("may-tao-khoi");
                }}
                className={`category-tier2-chip ${selectedCategory === "may-tao-khoi" ? "is-active" : ""}`}
              >
                <span>{lang === "en" ? "Fog Machines" : "Máy Tạo Khói"}</span>
                <span className="tier2-count">{subcategoryCounts["may-tao-khoi"] || 0}</span>
              </button>
            </>
          ) : activeGroup ? (
            <>
              {/* Group View All Chip */}
              <button
                type="button"
                onClick={() => onSelectCategory(`group:${activeGroup.id}`)}
                className={`category-tier2-chip ${
                  selectedCategory === `group:${activeGroup.id}` || selectedCategory === "all" ? "is-active" : ""
                }`}
              >
                <span>
                  {lang === "en" ? `All ${activeGroup.nameEn}` : `Tất Cả ${activeGroup.nameVi}`}
                </span>
                <span className="tier2-count">{groupCounts[activeGroup.id]}</span>
              </button>

              {/* Subcategories list chips */}
              {activeGroup.subcategories.map((sub) => {
                const isSelected = selectedCategory === sub.slug;
                const count = subcategoryCounts[sub.slug] || 0;

                return (
                  <button
                    key={sub.slug}
                    type="button"
                    onClick={() => onSelectCategory(sub.slug)}
                    className={`category-tier2-chip ${isSelected ? "is-active" : ""}`}
                  >
                    <span>{lang === "en" ? sub.nameEn : sub.nameVi}</span>
                    <span className="tier2-count">{count}</span>
                  </button>
                );
              })}
            </>
          ) : null}
        </div>
      </div>

      {/* ============================================================
          FILTER TOOLBAR (Mode, Search, Custom Brand Popover, Custom Price Popover, Custom Sort Popover)
         ============================================================ */}
      <div className="category-toolbar-box">
        <div className="category-toolbar-row">
          {/* Left: Mode Switcher (All / Sale / Rental) */}
          <div className="category-mode-segmented">
            <button
              type="button"
              onClick={() => onFilterModeChange("all")}
              className={`mode-btn ${filterMode === "all" ? "is-active" : ""}`}
            >
              {t.visualCategoryBar.filterAll}
            </button>
            <button
              type="button"
              onClick={() => onFilterModeChange("sale")}
              className={`mode-btn ${filterMode === "sale" ? "is-active" : ""}`}
            >
              {t.visualCategoryBar.filterSale}
            </button>
            <button
              type="button"
              onClick={() => onFilterModeChange("rental")}
              className={`mode-btn ${filterMode === "rental" ? "is-active" : ""}`}
            >
              {t.visualCategoryBar.filterRental}
            </button>
          </div>

          {/* Middle: Inline Search, Custom Brand Popover & Custom Price Popover */}
          <div className="category-dropdowns-wrap">
            {/* Quick Search Input */}
            <div className="toolbar-search-wrap">
              <svg className="toolbar-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={lang === "en" ? "Search model, brand..." : "Tìm nhanh mã máy, hãng..."}
                className="toolbar-search-input"
              />
              {searchQuery.trim() && (
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  className="toolbar-search-clear"
                  aria-label="Xóa từ khóa"
                >
                  ✕
                </button>
              )}
            </div>

            {/* CUSTOM BRAND POPOVER */}
            {onSelectBrand && (
              <div className="obsidian-popover-wrap">
                <button
                  type="button"
                  onClick={() => {
                    setOpenDropdown(openDropdown === "brand" ? null : "brand");
                    setBrandSearchInput("");
                  }}
                  className={`obsidian-popover-trigger ${selectedBrand !== "all" ? "has-active-value" : ""} ${openDropdown === "brand" ? "is-open" : ""}`}
                  aria-haspopup="listbox"
                  aria-expanded={openDropdown === "brand"}
                >
                  <span className="trigger-text">
                    {selectedBrandDisplayName || (lang === "en" ? "All Brands" : "Tất cả hãng")}
                  </span>
                  <span className={`trigger-caret ${openDropdown === "brand" ? "is-flipped" : ""}`}>▾</span>
                </button>

                {openDropdown === "brand" && (
                  <div className="obsidian-popover-menu brand-menu" role="listbox">
                    <div className="popover-menu-header">
                      <span className="popover-menu-kicker">
                        {lang === "en" ? "SELECT BRAND" : "CHỌN HÃNG SẢN XUẤT"}
                      </span>
                      {selectedBrand !== "all" && (
                        <button
                          type="button"
                          className="popover-quick-clear"
                          onClick={() => {
                            onSelectBrand("all");
                            setOpenDropdown(null);
                          }}
                        >
                          {lang === "en" ? "Clear" : "Bỏ chọn"}
                        </button>
                      )}
                    </div>

                    {/* Inline Search in Brand Popover */}
                    <div className="popover-search-box">
                      <input
                        type="text"
                        value={brandSearchInput}
                        onChange={(e) => setBrandSearchInput(e.target.value)}
                        placeholder={lang === "en" ? "Filter brands..." : "Lọc tên hãng..."}
                        className="popover-search-input"
                        autoFocus
                      />
                    </div>

                    <div className="popover-scroll-list">
                      {/* ALL BRANDS OPTION */}
                      <button
                        type="button"
                        onClick={() => {
                          onSelectBrand("all");
                          setOpenDropdown(null);
                        }}
                        className={`popover-option-item ${selectedBrand === "all" ? "is-selected" : ""}`}
                      >
                        <span className="option-name">{lang === "en" ? "All Brands" : "Tất cả hãng"}</span>
                        <span className="option-count">{totalFiltered}</span>
                      </button>

                      {/* BRAND LIST */}
                      {filteredBrands.length === 0 ? (
                        <div className="popover-empty-msg">
                          {lang === "en" ? "No brand found" : "Không có hãng này"}
                        </div>
                      ) : (
                        filteredBrands.map((b) => {
                          const isSelected = selectedBrand.toLowerCase() === b.key;
                          return (
                            <button
                              key={b.key}
                              type="button"
                              onClick={() => {
                                onSelectBrand(b.key);
                                setOpenDropdown(null);
                              }}
                              className={`popover-option-item ${isSelected ? "is-selected" : ""}`}
                            >
                              <span className="option-name">{b.name}</span>
                              <span className="option-count">{b.count}</span>
                            </button>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* CUSTOM PRICE POPOVER */}
            {onPriceRangeChange && (
              <div className="obsidian-popover-wrap">
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === "price" ? null : "price")}
                  className={`obsidian-popover-trigger ${priceRange !== "all" ? "has-active-value" : ""} ${openDropdown === "price" ? "is-open" : ""}`}
                  aria-haspopup="listbox"
                  aria-expanded={openDropdown === "price"}
                >
                  <span className="trigger-text">
                    {activePriceLabel || (lang === "en" ? "All Prices" : "Tất cả mức giá")}
                  </span>
                  <span className={`trigger-caret ${openDropdown === "price" ? "is-flipped" : ""}`}>▾</span>
                </button>

                {openDropdown === "price" && (
                  <div className="obsidian-popover-menu price-menu" role="listbox">
                    <div className="popover-menu-header">
                      <span className="popover-menu-kicker">
                        {lang === "en" ? "PRICE RANGE" : "KHOẢNG GIÁ"}
                      </span>
                      {priceRange !== "all" && (
                        <button
                          type="button"
                          className="popover-quick-clear"
                          onClick={() => {
                            onPriceRangeChange("all");
                            setOpenDropdown(null);
                          }}
                        >
                          {lang === "en" ? "Clear" : "Bỏ chọn"}
                        </button>
                      )}
                    </div>

                    <div className="popover-scroll-list">
                      {PRICE_RANGE_OPTIONS.map((opt) => {
                        const isSelected = priceRange === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                              onPriceRangeChange(opt.value);
                              setOpenDropdown(null);
                            }}
                            className={`popover-option-item ${isSelected ? "is-selected" : ""}`}
                          >
                            <span className="option-name">{lang === "en" ? opt.labelEn : opt.labelVi}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: Custom Sort Popover & Results Counter */}
          <div className="category-sort-wrap">
            <div className="obsidian-popover-wrap">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === "sort" ? null : "sort")}
                className={`obsidian-popover-trigger sort-trigger ${openDropdown === "sort" ? "is-open" : ""}`}
                aria-haspopup="listbox"
                aria-expanded={openDropdown === "sort"}
              >
                <span className="trigger-text">{activeSortLabel}</span>
                <span className={`trigger-caret ${openDropdown === "sort" ? "is-flipped" : ""}`}>▾</span>
              </button>

              {openDropdown === "sort" && (
                <div className="obsidian-popover-menu sort-menu" role="listbox">
                  <div className="popover-menu-header">
                    <span className="popover-menu-kicker">
                      {lang === "en" ? "SORT BY" : "SẮP XẾP THEO"}
                    </span>
                  </div>

                  <div className="popover-scroll-list">
                    {SORT_OPTIONS.map((opt) => {
                      const isSelected = sortBy === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            onSortChange(opt.value);
                            setOpenDropdown(null);
                          }}
                          className={`popover-option-item ${isSelected ? "is-selected" : ""}`}
                        >
                          <span className="option-name">{lang === "en" ? opt.labelEn : opt.labelVi}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="results-counter-badge">
              {totalFiltered} {t.visualCategoryBar.totalProducts}
            </div>
          </div>
        </div>

        {/* Active Filters Tag Bar (All Selected Conditions Visible) */}
        {hasActiveFilters && (
          <div className="active-filters-strip">
            <div className="active-filters-label-wrap">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              <span className="active-filters-label">{lang === "en" ? "Active filters:" : "Đang lọc theo:"}</span>
            </div>

            {/* Mode Tag */}
            {filterMode !== "all" && (
              <button
                type="button"
                onClick={() => onFilterModeChange("all")}
                className="active-filter-tag"
                title={lang === "en" ? "Remove mode filter" : "Bỏ lọc chế độ"}
              >
                <span className="tag-prefix">{lang === "en" ? "Mode:" : "Chế độ:"}</span>
                <span>{filterMode === "rental" ? t.visualCategoryBar.filterRental : t.visualCategoryBar.filterSale}</span>
                <span className="tag-close">✕</span>
              </button>
            )}

            {/* Category Tag */}
            {activeCategoryLabel && (
              <button
                type="button"
                onClick={() => {
                  setActiveGroupId("all");
                  onSelectCategory("all");
                }}
                className="active-filter-tag category-tag"
                title={lang === "en" ? "Remove category filter" : "Bỏ lọc danh mục"}
              >
                <span className="tag-prefix">{lang === "en" ? "Category:" : "Danh mục:"}</span>
                <span>{activeCategoryLabel}</span>
                <span className="tag-close">✕</span>
              </button>
            )}

            {/* Brand Tag */}
            {selectedBrand !== "all" && onSelectBrand && (
              <button
                type="button"
                onClick={() => onSelectBrand("all")}
                className="active-filter-tag"
                title={lang === "en" ? "Remove brand filter" : "Bỏ lọc thương hiệu"}
              >
                <span className="tag-prefix">{lang === "en" ? "Brand:" : "Hãng:"}</span>
                <span>{selectedBrandDisplayName || selectedBrand}</span>
                <span className="tag-close">✕</span>
              </button>
            )}

            {/* Price Tag */}
            {activePriceLabel && onPriceRangeChange && (
              <button
                type="button"
                onClick={() => onPriceRangeChange("all")}
                className="active-filter-tag price-tag"
                title={lang === "en" ? "Remove price filter" : "Bỏ lọc mức giá"}
              >
                <span className="tag-prefix">{lang === "en" ? "Price:" : "Mức giá:"}</span>
                <span>{activePriceLabel}</span>
                <span className="tag-close">✕</span>
              </button>
            )}

            {/* Search Query Tag */}
            {searchQuery.trim() && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="active-filter-tag search-tag"
                title={lang === "en" ? "Remove search keyword" : "Bỏ từ khóa tìm kiếm"}
              >
                <span className="tag-prefix">{lang === "en" ? "Keyword:" : "Từ khóa:"}</span>
                <span>&quot;{searchQuery}&quot;</span>
                <span className="tag-close">✕</span>
              </button>
            )}

            <button
              type="button"
              onClick={resetAllFilters}
              className="clear-all-filters-btn"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
              <span>{lang === "en" ? "Reset all" : "Xóa tất cả"}</span>
            </button>
          </div>
        )}
      </div>

      {/* Styled JSX for the 2-tier Category Filter System & Obsidian Popovers */}
      <style>{`
        .visual-category-system {
          width: 100%;
        }

        /* Tier 1 Parent Tabs */
        .category-tier1-container {
          display: flex;
          align-items: center;
          gap: 10px;
          overflow-x: auto;
          padding: 10px 6px 14px 6px;
          margin-top: -6px;
          margin-bottom: 8px;
          scrollbar-width: thin;
        }

        .category-tier1-pill {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 20px;
          background: rgba(18, 18, 20, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 9999px;
          color: #d4d4d8;
          font-size: 13.5px;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(12px);
          outline: none;
        }

        .category-tier1-pill:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(34, 197, 94, 0.4);
          color: #ffffff;
          transform: translateY(-1px);
        }

        .category-tier1-pill.is-active {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.22) 0%, rgba(16, 26, 19, 0.95) 100%);
          border-color: #22c55e;
          color: #ffffff;
          box-shadow: 0 0 16px rgba(34, 197, 94, 0.28), inset 0 1px 0 rgba(34, 197, 94, 0.4);
        }

        .tier1-label {
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .tier1-badge {
          font-size: 11px;
          font-weight: 800;
          padding: 2px 7px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.08);
          color: #a1a1aa;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.2s ease;
        }

        .category-tier1-pill.is-active .tier1-badge {
          background: #22c55e;
          color: #000000;
          border-color: #22c55e;
        }

        /* Tier 2 Subcategory Chips */
        .category-tier2-wrapper {
          background: rgba(12, 13, 16, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 14px;
          padding: 8px 12px;
          margin-bottom: 20px;
          backdrop-filter: blur(16px);
        }

        .category-tier2-container {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: thin;
          padding: 6px 4px;
        }

        .category-tier2-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 14px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 9999px;
          color: #a1a1aa;
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.18s ease;
          outline: none;
        }

        .category-tier2-chip:hover {
          background: rgba(255, 255, 255, 0.09);
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.2);
        }

        .category-tier2-chip.is-active {
          background: #22c55e;
          color: #000000;
          font-weight: 800;
          border-color: #22c55e;
          box-shadow: 0 0 12px rgba(34, 197, 94, 0.35);
        }

        .tier2-count {
          font-size: 10.5px;
          font-weight: 700;
          opacity: 0.85;
        }

        /* Toolbar Box */
        .category-toolbar-box {
          background: #111215;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 14px 18px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }

        .category-toolbar-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .category-mode-segmented {
          display: inline-flex;
          align-items: center;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 9999px;
          padding: 3px;
        }

        .mode-btn {
          padding: 7px 16px;
          border-radius: 9999px;
          border: none;
          font-size: 12.5px;
          font-weight: 700;
          cursor: pointer;
          background: transparent;
          color: #a1a1aa;
          transition: all 0.18s ease;
        }

        .mode-btn.is-active {
          background: #22c55e;
          color: #000000;
          box-shadow: 0 2px 10px rgba(34, 197, 94, 0.35);
        }

        .category-dropdowns-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        /* Toolbar Quick Search Input */
        .toolbar-search-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
        }

        .toolbar-search-icon {
          position: absolute;
          left: 12px;
          color: #71717a;
          pointer-events: none;
        }

        .toolbar-search-input {
          padding: 8px 30px 8px 32px;
          background-color: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 9999px;
          color: #ffffff;
          font-size: 12.5px;
          font-weight: 500;
          outline: none;
          width: 175px;
          transition: all 0.2s ease;
        }

        .toolbar-search-input:focus {
          border-color: #22c55e;
          background-color: rgba(0, 0, 0, 0.7);
          box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
          width: 200px;
        }

        .toolbar-search-clear {
          position: absolute;
          right: 9px;
          background: none;
          border: none;
          color: #a1a1aa;
          font-size: 12px;
          cursor: pointer;
          padding: 2px 4px;
        }

        .toolbar-search-clear:hover {
          color: #22c55e;
        }

        /* ============================================================
           CUSTOM OBSIDIAN POPOVER DROPDOWNS
           ============================================================ */
        .obsidian-popover-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
        }

        .obsidian-popover-trigger {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background-color: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 9999px;
          color: #e4e4e7;
          font-size: 12.5px;
          font-weight: 600;
          outline: none;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .obsidian-popover-trigger:hover {
          background-color: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.25);
          color: #ffffff;
        }

        .obsidian-popover-trigger.is-open {
          border-color: #22c55e;
          box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.25);
          background-color: rgba(18, 20, 24, 0.95);
        }

        .obsidian-popover-trigger.has-active-value {
          background-color: rgba(34, 197, 94, 0.15);
          border-color: rgba(34, 197, 94, 0.5);
          color: #4ade80;
        }

        .trigger-caret {
          font-size: 10px;
          color: #71717a;
          transition: transform 0.2s ease;
        }

        .trigger-caret.is-flipped {
          transform: rotate(180deg);
          color: #22c55e;
        }

        /* Popover Menu Floating Container */
        .obsidian-popover-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          background: #141519;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 16px;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          z-index: 100;
          min-width: 240px;
          overflow: hidden;
          animation: popoverFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .obsidian-popover-menu.brand-menu {
          min-width: 270px;
        }

        .obsidian-popover-menu.price-menu {
          min-width: 230px;
        }

        .obsidian-popover-menu.sort-menu {
          min-width: 210px;
          right: 0;
          left: auto;
        }

        @keyframes popoverFadeIn {
          from {
            opacity: 0;
            transform: translateY(-6px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .popover-menu-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          background: rgba(0, 0, 0, 0.3);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .popover-menu-kicker {
          font-size: 10.5px;
          font-weight: 800;
          letter-spacing: 0.06em;
          color: #71717a;
          text-transform: uppercase;
        }

        .popover-quick-clear {
          background: none;
          border: none;
          color: #22c55e;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .popover-quick-clear:hover {
          background: rgba(34, 197, 94, 0.15);
        }

        .popover-search-box {
          padding: 8px 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(0, 0, 0, 0.2);
        }

        .popover-search-input {
          width: 100%;
          padding: 6px 12px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #ffffff;
          font-size: 12px;
          outline: none;
        }

        .popover-search-input:focus {
          border-color: #22c55e;
        }

        .popover-scroll-list {
          max-height: 260px;
          overflow-y: auto;
          padding: 6px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .popover-scroll-list::-webkit-scrollbar {
          width: 5px;
        }

        .popover-scroll-list::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 999px;
        }

        .popover-option-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          width: 100%;
          padding: 9px 14px;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 8px;
          color: #d4d4d8;
          font-size: 13px;
          font-weight: 500;
          text-align: left;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .popover-option-item:hover {
          background: rgba(255, 255, 255, 0.06);
          color: #ffffff;
        }

        .popover-option-item.is-selected {
          background: rgba(34, 197, 94, 0.14);
          border-color: rgba(34, 197, 94, 0.4);
          color: #4ade80;
          font-weight: 700;
        }

        .option-name {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .option-count {
          font-size: 11px;
          font-weight: 700;
          color: #71717a;
          background: rgba(255, 255, 255, 0.06);
          padding: 2px 8px;
          border-radius: 999px;
        }

        .popover-option-item.is-selected .option-count {
          background: rgba(34, 197, 94, 0.25);
          color: #22c55e;
        }

        .popover-empty-msg {
          padding: 16px;
          text-align: center;
          font-size: 12px;
          color: #71717a;
        }

        .category-sort-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .results-counter-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 800;
          color: #22c55e;
          background-color: #12281c;
          padding: 6px 16px;
          border-radius: 9999px;
          border: 1.5px solid #22c55e;
          box-shadow: 0 0 14px rgba(34, 197, 94, 0.25);
          white-space: nowrap;
          letter-spacing: -0.01em;
        }

        .active-filters-strip {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          padding-top: 12px;
          margin-top: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        .active-filters-label-wrap {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #71717a;
        }

        .active-filters-label {
          font-size: 12px;
          font-weight: 600;
        }

        .active-filter-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: 9999px;
          font-size: 12px;
          font-weight: 700;
          background-color: #12281c;
          color: #22c55e;
          border: 1.5px solid #22c55e;
          box-shadow: 0 0 8px rgba(34, 197, 94, 0.2);
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .active-filter-tag:hover {
          background-color: rgba(34, 197, 94, 0.25);
          border-color: #22c55e;
          color: #ffffff;
          box-shadow: 0 0 12px rgba(34, 197, 94, 0.35);
        }

        .tag-prefix {
          font-weight: 500;
          color: #94a3b8;
          font-size: 11px;
        }

        .tag-close {
          font-size: 11px;
          opacity: 0.8;
          margin-left: 2px;
        }

        .clear-all-filters-btn {
          margin-left: auto;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(34, 197, 94, 0.08);
          border: 1px solid rgba(34, 197, 94, 0.25);
          border-radius: 9999px;
          color: #4ade80;
          font-size: 11.5px;
          font-weight: 700;
          cursor: pointer;
          padding: 5px 12px;
          transition: all 0.2s ease;
        }

        .clear-all-filters-btn:hover {
          background: #22c55e;
          color: #000000;
          border-color: #22c55e;
        }

        @media (max-width: 768px) {
          .category-toolbar-row {
            flex-direction: column;
            align-items: stretch;
          }
          .category-dropdowns-wrap,
          .category-sort-wrap {
            width: 100%;
            justify-content: space-between;
          }
          .toolbar-search-wrap,
          .toolbar-search-input {
            width: 100%;
          }
          .toolbar-search-input:focus {
            width: 100%;
          }
          .obsidian-popover-wrap {
            width: 48%;
          }
          .obsidian-popover-trigger {
            width: 100%;
            justify-content: space-between;
          }
          .obsidian-popover-menu.sort-menu {
            left: 0;
            right: auto;
          }
        }
      `}</style>
    </div>
  );
}
