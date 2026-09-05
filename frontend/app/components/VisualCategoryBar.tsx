"use client";

import React, { useMemo } from "react";
import { Category, Product } from "../lib/types";

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
  // Map category_id (UUID from DB) to category slug
  const categoryIdToSlug = useMemo(() => {
    const map = new Map<string, string>();
    categories.forEach((c) => {
      map.set(c.id, c.slug);
    });
    return map;
  }, [categories]);

  // Extract available unique brands dynamically
  const availableBrands = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.brand) set.add(p.brand);
    });
    return Array.from(set).sort();
  }, [products]);

  // Compute accurate product counts per category, dynamically reacting to filterMode (all/sale/rental)
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: 0 };
    categories.forEach((c) => {
      counts[c.slug] = 0;
    });

    products.forEach((p) => {
      // Respect mode filter (sale / rental)
      if (filterMode === "sale" && !p.sale_enabled) return;
      if (filterMode === "rental" && !p.rental_enabled) return;

      counts.all = (counts.all || 0) + 1;

      const slug = p.category_slug || (p.category_id ? categoryIdToSlug.get(p.category_id) : undefined);
      if (slug && counts[slug] !== undefined) {
        counts[slug] += 1;
      }
    });

    return counts;
  }, [products, categories, categoryIdToSlug, filterMode]);

  // Hardware icons / SVG illustrations
  const renderHardwareVisual = (slug: string, isActive: boolean) => {
    const activeColor = "#22c55e";
    const dimColor = "rgba(255, 255, 255, 0.4)";
    const fillColor = isActive ? "rgba(34, 197, 94, 0.14)" : "rgba(255, 255, 255, 0.03)";
    const strokeColor = isActive ? activeColor : dimColor;

    switch (slug) {
      case "all":
        return (
          <svg width="72" height="60" viewBox="0 0 72 60" fill="none">
            <rect x="6" y="10" width="60" height="40" rx="6" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
            <circle cx="24" cy="30" r="11" stroke={strokeColor} strokeWidth="1.5" />
            <circle cx="24" cy="30" r="4" fill={isActive ? activeColor : dimColor} />
            <circle cx="48" cy="30" r="11" stroke={strokeColor} strokeWidth="1.5" />
            <circle cx="48" cy="30" r="4" fill={isActive ? activeColor : dimColor} />
            <line x1="36" y1="18" x2="36" y2="42" stroke={strokeColor} strokeWidth="1.2" strokeDasharray="2 2" />
          </svg>
        );

      case "dj":
        return (
          <svg width="72" height="60" viewBox="0 0 72 60" fill="none">
            <rect x="4" y="8" width="64" height="44" rx="5" fill={fillColor} stroke={strokeColor} strokeWidth="1.6" />
            <circle cx="20" cy="27" r="11" stroke={strokeColor} strokeWidth="1.8" />
            <circle cx="20" cy="27" r="6" fill="rgba(0,0,0,0.5)" stroke={isActive ? activeColor : "#52525b"} strokeWidth="1.2" />
            <circle cx="20" cy="27" r="2.5" fill={isActive ? activeColor : "#fff"} />
            <circle cx="52" cy="27" r="11" stroke={strokeColor} strokeWidth="1.8" />
            <circle cx="52" cy="27" r="6" fill="rgba(0,0,0,0.5)" stroke={isActive ? activeColor : "#52525b"} strokeWidth="1.2" />
            <circle cx="52" cy="27" r="2.5" fill={isActive ? activeColor : "#fff"} />
            <line x1="36" y1="12" x2="36" y2="34" stroke={isActive ? activeColor : "#3f3f46"} strokeWidth="1.5" />
            <circle cx="36" cy="18" r="1.5" fill={isActive ? activeColor : "#71717a"} />
            <circle cx="36" cy="24" r="1.5" fill={isActive ? activeColor : "#71717a"} />
            <circle cx="36" cy="30" r="1.5" fill={isActive ? activeColor : "#71717a"} />
            <rect x="13" y="42" width="4" height="3" rx="0.5" fill={isActive ? activeColor : "#3f3f46"} />
            <rect x="19" y="42" width="4" height="3" rx="0.5" fill={isActive ? activeColor : "#3f3f46"} />
            <rect x="25" y="42" width="4" height="3" rx="0.5" fill={isActive ? activeColor : "#3f3f46"} />
            <rect x="43" y="42" width="4" height="3" rx="0.5" fill={isActive ? activeColor : "#3f3f46"} />
            <rect x="49" y="42" width="4" height="3" rx="0.5" fill={isActive ? activeColor : "#3f3f46"} />
            <rect x="55" y="42" width="4" height="3" rx="0.5" fill={isActive ? activeColor : "#3f3f46"} />
          </svg>
        );

      case "mixer":
        return (
          <svg width="72" height="60" viewBox="0 0 72 60" fill="none">
            <rect x="14" y="6" width="44" height="48" rx="4" fill={fillColor} stroke={strokeColor} strokeWidth="1.6" />
            <circle cx="22" cy="15" r="2" fill={isActive ? activeColor : "#71717a"} />
            <circle cx="22" cy="22" r="2" fill={isActive ? activeColor : "#71717a"} />
            <circle cx="22" cy="29" r="2" fill={isActive ? activeColor : "#71717a"} />
            <circle cx="31" cy="15" r="2" fill={isActive ? activeColor : "#71717a"} />
            <circle cx="31" cy="22" r="2" fill={isActive ? activeColor : "#71717a"} />
            <circle cx="31" cy="29" r="2" fill={isActive ? activeColor : "#71717a"} />
            <circle cx="41" cy="15" r="2" fill={isActive ? activeColor : "#71717a"} />
            <circle cx="41" cy="22" r="2" fill={isActive ? activeColor : "#71717a"} />
            <circle cx="41" cy="29" r="2" fill={isActive ? activeColor : "#71717a"} />
            <circle cx="50" cy="15" r="2" fill={isActive ? activeColor : "#71717a"} />
            <circle cx="50" cy="22" r="2" fill={isActive ? activeColor : "#71717a"} />
            <circle cx="50" cy="29" r="2" fill={isActive ? activeColor : "#71717a"} />
            <line x1="22" y1="35" x2="22" y2="43" stroke={strokeColor} strokeWidth="1.4" />
            <line x1="31" y1="35" x2="31" y2="43" stroke={strokeColor} strokeWidth="1.4" />
            <line x1="41" y1="35" x2="41" y2="43" stroke={strokeColor} strokeWidth="1.4" />
            <line x1="50" y1="35" x2="50" y2="43" stroke={strokeColor} strokeWidth="1.4" />
            <rect x="24" y="47" width="24" height="3" rx="1.5" fill="rgba(0,0,0,0.6)" stroke={strokeColor} strokeWidth="0.8" />
            <rect x="34" y="46" width="4" height="5" rx="1" fill={isActive ? activeColor : "#fff"} />
          </svg>
        );

      case "audio":
        return (
          <svg width="72" height="60" viewBox="0 0 72 60" fill="none">
            <rect x="11" y="10" width="22" height="40" rx="3" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
            <circle cx="22" cy="20" r="3.5" fill="rgba(0,0,0,0.6)" stroke={isActive ? activeColor : dimColor} strokeWidth="1.2" />
            <circle cx="22" cy="35" r="6.5" fill={isActive ? "rgba(34, 197, 94, 0.25)" : "rgba(234, 179, 8, 0.2)"} stroke={isActive ? activeColor : "#eab308"} strokeWidth="1.6" />
            <circle cx="22" cy="35" r="2" fill={isActive ? activeColor : "#eab308"} />
            <rect x="39" y="10" width="22" height="40" rx="3" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
            <circle cx="50" cy="20" r="3.5" fill="rgba(0,0,0,0.6)" stroke={isActive ? activeColor : dimColor} strokeWidth="1.2" />
            <circle cx="50" cy="35" r="6.5" fill={isActive ? "rgba(34, 197, 94, 0.25)" : "rgba(234, 179, 8, 0.2)"} stroke={isActive ? activeColor : "#eab308"} strokeWidth="1.6" />
            <circle cx="50" cy="35" r="2" fill={isActive ? activeColor : "#eab308"} />
          </svg>
        );

      case "accessories":
        return (
          <svg width="72" height="60" viewBox="0 0 72 60" fill="none">
            <path d="M18 36 C18 16, 54 16, 54 36" stroke={strokeColor} strokeWidth="2.8" strokeLinecap="round" fill="none" />
            <rect x="13" y="32" width="10" height="18" rx="5" fill={isActive ? activeColor : "#27272a"} stroke={strokeColor} strokeWidth="1.5" />
            <rect x="49" y="32" width="10" height="18" rx="5" fill={isActive ? activeColor : "#27272a"} stroke={strokeColor} strokeWidth="1.5" />
            <path d="M18 50 Q16 54 20 56 T24 58 T28 56" stroke={isActive ? activeColor : "#71717a"} strokeWidth="1.2" fill="none" />
            <line x1="28" y1="56" x2="33" y2="56" stroke={isActive ? activeColor : "#eab308"} strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      case "stage-effects":
        return (
          <svg width="72" height="60" viewBox="0 0 72 60" fill="none">
            <rect x="12" y="24" width="38" height="24" rx="3" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
            <path d="M22 24 V18 H38 V24" stroke={strokeColor} strokeWidth="1.6" fill="none" />
            <rect x="50" y="32" width="7" height="8" rx="1" fill={isActive ? activeColor : "#3f3f46"} stroke={strokeColor} strokeWidth="1.2" />
            <path d="M58 33 Q64 30 68 31" stroke={isActive ? activeColor : "rgba(255,255,255,0.4)"} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M58 36 Q65 36 70 35" stroke={isActive ? activeColor : "rgba(255,255,255,0.7)"} strokeWidth="2" strokeLinecap="round" />
            <path d="M58 39 Q64 42 68 41" stroke={isActive ? activeColor : "rgba(255,255,255,0.4)"} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );

      default:
        return (
          <svg width="72" height="60" viewBox="0 0 72 60" fill="none">
            <rect x="16" y="15" width="40" height="30" rx="4" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
            <circle cx="36" cy="30" r="6" fill={isActive ? activeColor : dimColor} />
          </svg>
        );
    }
  };

  const getCategorySubtitle = (slug: string) => {
    switch (slug) {
      case "all":
        return "Toàn bộ danh mục thiết bị";
      case "dj":
        return "Controller, CDJ & All-in-One";
      case "mixer":
        return "Bàn trộn âm thanh 2-6 kênh";
      case "audio":
        return "Loa biểu diễn & Kiểm âm";
      case "accessories":
        return "Tai nghe DJ, Micro & Cáp";
      case "stage-effects":
        return "Máy khói sân khấu & Đèn LED";
      default:
        return "Thiết bị chuyên nghiệp";
    }
  };

  const allCategoryCards = useMemo(() => {
    return [
      {
        id: "all",
        slug: "all",
        name: "Tất cả thiết bị",
      },
      ...categories,
    ];
  }, [categories]);

  const activeCategoryObject = categories.find((c) => c.slug === selectedCategory);

  const resetAllFilters = () => {
    onSelectCategory("all");
    onFilterModeChange("all");
    onSearchChange("");
  };

  const hasActiveFilters = selectedCategory !== "all" || filterMode !== "all" || searchQuery.trim() !== "";

  return (
    <div style={{ marginBottom: "44px" }}>
      {/* 1. Category Showcase Grid Cards */}
      <div
        className="category-showcase-container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
          gap: "14px",
          marginBottom: "20px",
        }}
      >
        {allCategoryCards.map((cat) => {
          const isActive = selectedCategory === cat.slug;
          const count = categoryCounts[cat.slug] || 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.slug)}
              className={`visual-category-card ${isActive ? "is-active" : ""}`}
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "20px 14px 16px 14px",
                background: isActive
                  ? "linear-gradient(180deg, rgba(34, 197, 94, 0.15) 0%, rgba(13, 18, 14, 0.95) 100%)"
                  : "linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(15, 15, 17, 0.85) 100%)",
                border: isActive
                  ? "1px solid #22c55e"
                  : "1px solid rgba(255, 255, 255, 0.09)",
                boxShadow: isActive
                  ? "0 0 24px rgba(34, 197, 94, 0.25), inset 0 1px 0 rgba(34, 197, 94, 0.4)"
                  : "0 4px 20px rgba(0, 0, 0, 0.3)",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 240ms cubic-bezier(0.16, 1, 0.3, 1)",
                outline: "none",
                transform: isActive ? "translateY(-3px)" : "none",
              }}
            >
              {/* Top active glowing light bar */}
              {isActive && (
                <div
                  style={{
                    position: "absolute",
                    top: "-1px",
                    left: "20%",
                    right: "20%",
                    height: "2px",
                    background: "#22c55e",
                    boxShadow: "0 0 12px #22c55e",
                    borderRadius: "9999px",
                  }}
                />
              )}

              {/* Hardware Visual Center */}
              <div
                style={{
                  height: "64px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "12px",
                  transition: "transform 240ms ease",
                }}
              >
                {renderHardwareVisual(cat.slug, isActive)}
              </div>

              {/* Category Title */}
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 800,
                  color: isActive ? "#ffffff" : "#e4e4e7",
                  letterSpacing: "-0.01em",
                  marginBottom: "4px",
                  lineHeight: "1.25",
                }}
              >
                {cat.name}
              </div>

              {/* Category Subtitle */}
              <div
                style={{
                  fontSize: "11px",
                  color: isActive ? "#a1a1aa" : "#71717a",
                  lineHeight: "1.3",
                  marginBottom: "12px",
                }}
              >
                {getCategorySubtitle(cat.slug)}
              </div>

              {/* Count Tag Badge (Dynamic to Filter Mode) */}
              <div
                style={{
                  marginTop: "auto",
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "3px 9px",
                  borderRadius: "9999px",
                  fontSize: "11px",
                  fontWeight: 700,
                  backgroundColor: isActive ? "rgba(34, 197, 94, 0.2)" : "rgba(255, 255, 255, 0.06)",
                  color: isActive ? "#4ade80" : "#a1a1aa",
                  border: isActive ? "1px solid rgba(34, 197, 94, 0.35)" : "1px solid rgba(255, 255, 255, 0.08)",
                  transition: "all 200ms ease",
                }}
              >
                {count} {filterMode === "rental" ? "máy cho thuê" : "thiết bị"}
              </div>
            </button>
          );
        })}
      </div>

      {/* 2. Floating Command Toolbar */}
      <div
        style={{
          background: "linear-gradient(180deg, rgba(24, 24, 27, 0.8) 0%, rgba(14, 14, 16, 0.95) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "14px",
          padding: "16px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
        }}
      >
        {/* Main Controls Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          {/* Left: Search input with magnifying glass */}
          <div
            style={{
              flex: "1 1 280px",
              position: "relative",
              minWidth: "220px",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={searchQuery ? "#22c55e" : "rgba(255, 255, 255, 0.4)"}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                transition: "stroke 180ms ease",
              }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            <input
              type="text"
              placeholder="Tìm theo tên máy, model, hãng (Pioneer, Yamaha, AlphaTheta)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{
                width: "100%",
                padding: "11px 40px 11px 40px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "9999px",
                color: "#fff",
                fontSize: "13.5px",
                outline: "none",
                transition: "border-color 180ms ease, box-shadow 180ms ease",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#22c55e";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(34, 197, 94, 0.15)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "#a1a1aa",
                  cursor: "pointer",
                  padding: "4px",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
                title="Xóa tìm kiếm"
              >
                ✕
              </button>
            )}
          </div>

          {/* Center: Segmented Control Mode Filter (Tất cả / Mua bán / Cho thuê) */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.55)",
              padding: "4px",
              borderRadius: "9999px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <button
              onClick={() => onFilterModeChange("all")}
              style={{
                padding: "8px 18px",
                borderRadius: "9999px",
                border: "none",
                fontSize: "12.5px",
                fontWeight: 700,
                cursor: "pointer",
                backgroundColor: filterMode === "all" ? "#22c55e" : "transparent",
                color: filterMode === "all" ? "#000000" : "#a1a1aa",
                transition: "all 180ms ease",
                boxShadow: filterMode === "all" ? "0 2px 10px rgba(34, 197, 94, 0.35)" : "none",
              }}
            >
              Tất cả
            </button>
            <button
              onClick={() => onFilterModeChange("sale")}
              style={{
                padding: "8px 18px",
                borderRadius: "9999px",
                border: "none",
                fontSize: "12.5px",
                fontWeight: 700,
                cursor: "pointer",
                backgroundColor: filterMode === "sale" ? "#22c55e" : "transparent",
                color: filterMode === "sale" ? "#000000" : "#a1a1aa",
                transition: "all 180ms ease",
                boxShadow: filterMode === "sale" ? "0 2px 10px rgba(34, 197, 94, 0.35)" : "none",
              }}
            >
              🛍️ Mua bán
            </button>
            <button
              onClick={() => onFilterModeChange("rental")}
              style={{
                padding: "8px 18px",
                borderRadius: "9999px",
                border: "none",
                fontSize: "12.5px",
                fontWeight: 700,
                cursor: "pointer",
                backgroundColor: filterMode === "rental" ? "#22c55e" : "transparent",
                color: filterMode === "rental" ? "#000000" : "#a1a1aa",
                transition: "all 180ms ease",
                boxShadow: filterMode === "rental" ? "0 2px 10px rgba(34, 197, 94, 0.35)" : "none",
              }}
            >
              🎧 Cho thuê
            </button>
          </div>

          {/* Brand & Price Range Dropdown Filters */}
          {onSelectBrand && (
            <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
              <select
                value={selectedBrand}
                onChange={(e) => onSelectBrand(e.target.value)}
                style={{
                  padding: "9px 28px 9px 12px",
                  backgroundColor: selectedBrand !== "all" ? "rgba(34, 197, 94, 0.15)" : "rgba(0, 0, 0, 0.5)",
                  border: selectedBrand !== "all" ? "1px solid rgba(34, 197, 94, 0.4)" : "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "9999px",
                  color: selectedBrand !== "all" ? "#4ade80" : "#e4e4e7",
                  fontSize: "12.5px",
                  fontWeight: 600,
                  outline: "none",
                  cursor: "pointer",
                  appearance: "none",
                  WebkitAppearance: "none",
                }}
              >
                <option value="all" style={{ backgroundColor: "#18181b", color: "#fff" }}>🏷️ Tất cả Hãng</option>
                {availableBrands.map((b) => (
                  <option key={b} value={b} style={{ backgroundColor: "#18181b", color: "#fff" }}>{b}</option>
                ))}
              </select>
              <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#a1a1aa", fontSize: "10px" }}>▼</span>
            </div>
          )}

          {onPriceRangeChange && (
            <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
              <select
                value={priceRange}
                onChange={(e) => onPriceRangeChange(e.target.value)}
                style={{
                  padding: "9px 28px 9px 12px",
                  backgroundColor: priceRange !== "all" ? "rgba(34, 197, 94, 0.15)" : "rgba(0, 0, 0, 0.5)",
                  border: priceRange !== "all" ? "1px solid rgba(34, 197, 94, 0.4)" : "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "9999px",
                  color: priceRange !== "all" ? "#4ade80" : "#e4e4e7",
                  fontSize: "12.5px",
                  fontWeight: 600,
                  outline: "none",
                  cursor: "pointer",
                  appearance: "none",
                  WebkitAppearance: "none",
                }}
              >
                <option value="all" style={{ backgroundColor: "#18181b", color: "#fff" }}>💰 Tất cả Mức giá</option>
                <option value="under_20m" style={{ backgroundColor: "#18181b", color: "#fff" }}>Dưới 20 Triệu</option>
                <option value="20m_50m" style={{ backgroundColor: "#18181b", color: "#fff" }}>20 Tr - 50 Triệu</option>
                <option value="50m_100m" style={{ backgroundColor: "#18181b", color: "#fff" }}>50 Tr - 100 Triệu</option>
                <option value="over_100m" style={{ backgroundColor: "#18181b", color: "#fff" }}>Trên 100 Triệu</option>
              </select>
              <span style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#a1a1aa", fontSize: "10px" }}>▼</span>
            </div>
          )}

          {/* Right: Sort Dropdown & Results Counter */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                style={{
                  padding: "9px 32px 9px 14px",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "9999px",
                  color: "#e4e4e7",
                  fontSize: "12.5px",
                  fontWeight: 600,
                  outline: "none",
                  cursor: "pointer",
                  appearance: "none",
                  WebkitAppearance: "none",
                }}
              >
                <option value="featured" style={{ backgroundColor: "#18181b", color: "#fff" }}>
                  ⚡ Sắp xếp: Nổi bật
                </option>
                <option value="price_asc" style={{ backgroundColor: "#18181b", color: "#fff" }}>
                  💵 Giá: Thấp đến Cao
                </option>
                <option value="price_desc" style={{ backgroundColor: "#18181b", color: "#fff" }}>
                  💎 Giá: Cao đến Thấp
                </option>
                <option value="name" style={{ backgroundColor: "#18181b", color: "#fff" }}>
                  🔤 Tên: A đến Z
                </option>
              </select>
              <span
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  color: "#a1a1aa",
                  fontSize: "11px",
                }}
              >
                ▼
              </span>
            </div>

            <div
              style={{
                fontSize: "12.5px",
                fontWeight: 700,
                color: "#22c55e",
                backgroundColor: "rgba(34, 197, 94, 0.12)",
                padding: "6px 12px",
                borderRadius: "9999px",
                border: "1px solid rgba(34, 197, 94, 0.28)",
                whiteSpace: "nowrap",
              }}
            >
              {totalFiltered} {filterMode === "rental" ? "máy cho thuê" : "thiết bị"}
            </div>
          </div>
        </div>

        {/* Active Filter Badges Strip (Hiển thị các tiêu chí lọc đang chọn kèm nút xóa nhanh) */}
        {hasActiveFilters && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
              paddingTop: "12px",
              borderTop: "1px solid rgba(255, 255, 255, 0.07)",
            }}
          >
            <span style={{ fontSize: "12px", color: "#71717a", fontWeight: 600 }}>Bộ lọc đang chọn:</span>

            {filterMode === "rental" && (
              <button
                onClick={() => onFilterModeChange("all")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 10px",
                  borderRadius: "9999px",
                  fontSize: "11.5px",
                  fontWeight: 600,
                  backgroundColor: "rgba(34, 197, 94, 0.15)",
                  color: "#4ade80",
                  border: "1px solid rgba(34, 197, 94, 0.3)",
                  cursor: "pointer",
                }}
              >
                <span>🎧 Chỉ hàng Cho thuê</span>
                <span style={{ fontSize: "12px" }}>✕</span>
              </button>
            )}

            {filterMode === "sale" && (
              <button
                onClick={() => onFilterModeChange("all")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 10px",
                  borderRadius: "9999px",
                  fontSize: "11.5px",
                  fontWeight: 600,
                  backgroundColor: "rgba(34, 197, 94, 0.15)",
                  color: "#4ade80",
                  border: "1px solid rgba(34, 197, 94, 0.3)",
                  cursor: "pointer",
                }}
              >
                <span>🛍️ Chỉ hàng Mua bán</span>
                <span style={{ fontSize: "12px" }}>✕</span>
              </button>
            )}

            {selectedCategory !== "all" && activeCategoryObject && (
              <button
                onClick={() => onSelectCategory("all")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 10px",
                  borderRadius: "9999px",
                  fontSize: "11.5px",
                  fontWeight: 600,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  cursor: "pointer",
                }}
              >
                <span>📁 {activeCategoryObject.name}</span>
                <span style={{ fontSize: "12px" }}>✕</span>
              </button>
            )}

            {searchQuery.trim() && (
              <button
                onClick={() => onSearchChange("")}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 10px",
                  borderRadius: "9999px",
                  fontSize: "11.5px",
                  fontWeight: 600,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "#ffffff",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  cursor: "pointer",
                }}
              >
                <span>🔍 &quot;{searchQuery}&quot;</span>
                <span style={{ fontSize: "12px" }}>✕</span>
              </button>
            )}

            <button
              onClick={resetAllFilters}
              style={{
                marginLeft: "auto",
                background: "none",
                border: "none",
                color: "#f87171",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                padding: "4px 8px",
                textDecoration: "underline",
              }}
            >
              Đặt lại tất cả
            </button>
          </div>
        )}
      </div>

      <style>{`
        .visual-category-card:hover {
          transform: translateY(-4px) !important;
          border-color: rgba(34, 197, 94, 0.5) !important;
          background: linear-gradient(180deg, rgba(34, 197, 94, 0.08) 0%, rgba(18, 20, 18, 0.95) 100%) !important;
        }
        .visual-category-card:hover svg {
          transform: scale(1.06);
        }
        @media (max-width: 768px) {
          .category-showcase-container {
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)) !important;
            gap: 10px !important;
          }
        }
      `}</style>
    </div>
  );
}
