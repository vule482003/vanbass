"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import Link from "next/link";
import { Product } from "../lib/types";
import { MOCK_PRODUCTS } from "../lib/mock-data";
import { getApiBaseUrl } from "../lib/api";
import { useLanguage } from "../lib/language-context";
import { getProductImageUrl } from "../lib/image-helper";
import ProductCard from "./ProductCard";

function formatPriceVND(amount?: number | null) {
  if (!amount) return "Liên hệ";
  return new Intl.NumberFormat("vi-VN").format(amount) + "₫";
}

// Sub-component for individual card with image fallback
function Top10ProductCardItem({ product, idx }: { product: Product; idx: number }) {
  const [prevProductId, setPrevProductId] = useState(product.id || product.slug);
  const [imgSrc, setImgSrc] = useState(() => getProductImageUrl(product));
  const [fallbackStep, setFallbackStep] = useState(0);

  if ((product.id || product.slug) !== prevProductId) {
    setPrevProductId(product.id || product.slug);
    setImgSrc(getProductImageUrl(product));
    setFallbackStep(0);
  }

  const handleImgError = () => {
    if (fallbackStep === 0 && product.slug) {
      setFallbackStep(1);
      setImgSrc(`/images/products/${product.slug}.png`);
    } else if (fallbackStep === 1 && product.slug) {
      setFallbackStep(2);
      setImgSrc(`/images/products/${product.slug}.jpg`);
    } else {
      setImgSrc("/images/products/placeholder.png");
    }
  };

  const salePrice = product.sale_price || 0;
  const originalPrice = salePrice > 0 ? Math.round(salePrice * 1.25) : 0;
  const discountPct = [28, 36, 20, 15, 30, 22, 18, 25, 32, 16][idx % 10];

  const categoryName = (product.category_name || product.category_slug || product.name || "").toLowerCase();
  let giftText = "Tặng gói bảo hành vàng 24 tháng chính hãng";
  if (categoryName.includes("dj") || categoryName.includes("xdj") || categoryName.includes("ddj") || categoryName.includes("controller")) {
    giftText = "Tặng túi đựng bàn DJ 1.200.000đ";
  } else if (categoryName.includes("loa") || categoryName.includes("speaker") || categoryName.includes("âm thanh") || categoryName.includes("mixer")) {
    giftText = "Tặng gói setup cân chỉnh âm thanh Pro";
  } else if (categoryName.includes("khói") || categoryName.includes("sáng") || categoryName.includes("effects")) {
    giftText = "Tặng can dung dịch tạo khói cao cấp";
  }

  const soldCount = 85 + ((idx * 17) % 120);
  const isTop3 = idx < 3;

  return (
    <div className="top10-product-card-wrap">
      <div className="top10-product-card">
        {/* Minimalist Top Rank & Status Row */}
        <div className="top10-card-header-badge">
          <span className={`top10-rank-badge ${isTop3 ? "top3" : ""}`}>
            {isTop3 ? `★ TOP ${idx + 1}` : `TOP ${idx + 1}`}
          </span>
          <span className="top10-status-badge">
            {idx === 0 ? "BÁN CHẠY NHẤT" : isTop3 ? "HOT" : "CHÍNH HÃNG"}
          </span>
        </div>

        {/* Product Image */}
        <Link
          href={`/products/${product.slug}`}
          className="top10-img-link"
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt={product.name}
            className="top10-img"
            loading="lazy"
            draggable={false}
            onError={handleImgError}
            onDragStart={(e) => e.preventDefault()}
          />
        </Link>

        {/* Product Title */}
        <Link
          href={`/products/${product.slug}`}
          className="top10-title"
          title={product.name}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
        >
          {product.name}
        </Link>

        {/* Price Row */}
        <div className="top10-price-row">
          <span className="top10-sale-price">
            {salePrice > 0 ? formatPriceVND(salePrice) : (product.rental_price ? `${formatPriceVND(product.rental_price)}/ngày` : "Giá liên hệ")}
          </span>
          {originalPrice > 0 && (
            <div className="top10-old-price-row">
              <span className="top10-old-price">{formatPriceVND(originalPrice)}</span>
              <span className="top10-discount-pill">-{discountPct}%</span>
            </div>
          )}
        </div>

        {/* Gift Note */}
        <div className="top10-gift-note" title={giftText}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <polyline points="20 12 20 22 4 22 4 12"></polyline>
            <rect x="2" y="7" width="20" height="5"></rect>
            <line x1="12" y1="22" x2="12" y2="7"></line>
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
          </svg>
          <span className="top10-gift-text">{giftText}</span>
        </div>

        {/* Rating & Sold Stats */}
        <div className="top10-rating-sold-row">
          <span className="top10-rating-score">5.0 <span className="top10-star-icon">★</span></span>
          <span className="top10-rating-sep">•</span>
          <span className="top10-sold-count">Đã bán {soldCount}</span>
        </div>
      </div>
    </div>
  );
}

// 1. TOP 10 BESTSELLER SHOWCASE BOX (INSPIRED BY DIENTULINHANH)
interface Top10BestsellerBoxProps {
  products: Product[];
}

function Top10BestsellerBox({ products }: Top10BestsellerBoxProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const dragMovedRef = useRef(false);
  const overscrollOffsetRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const DRAG_FACTOR = 0.72; // Standard in-bounds drag damping
  const DRAG_THRESHOLD = 10; // Pixels required to distinguish drag from click
  const MAX_OVERSCROLL = 160; // Extended visual rubber-band ceiling (160px)
  const OVERSCROLL_SCALE = 160; // Continuous resistance curve scale (soft diminishing returns)

  const getCardStep = () => {
    if (!trackRef.current) return 400;
    const firstCard = trackRef.current.querySelector<HTMLElement>(".top10-product-card-wrap");
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 220;
    const gap = 10;
    return (cardWidth + gap) * 2;
  };

  const handleScroll = (direction: "left" | "right") => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const step = getCardStep();
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    const target = Math.min(
      Math.max(0, track.scrollLeft + (direction === "left" ? -step : step)),
      maxScroll
    );
    track.scrollTo({
      left: target,
      behavior: "smooth",
    });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only handle mouse pointer events for desktop drag & rubber-band; leave touch gestures to native smooth mobile scrolling
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;

    isDraggingRef.current = true;
    dragMovedRef.current = false;
    startXRef.current = e.clientX;
    startScrollLeftRef.current = track.scrollLeft;
    overscrollOffsetRef.current = 0;
    setIsDragging(true);

    track.style.transition = "none";
    track.style.scrollBehavior = "auto";
    track.style.scrollSnapType = "none";
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    if (!isDraggingRef.current || !trackRef.current) return;
    const track = trackRef.current;
    const rawDx = e.clientX - startXRef.current;

    if (Math.abs(rawDx) > DRAG_THRESHOLD) {
      if (!dragMovedRef.current) {
        dragMovedRef.current = true;
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {}
      }
    }

    if (!dragMovedRef.current) return;

    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    const dampedDx = (rawDx > 0 ? rawDx - DRAG_THRESHOLD : rawDx + DRAG_THRESHOLD) * DRAG_FACTOR;
    const desiredScroll = startScrollLeftRef.current - dampedDx;

    if (desiredScroll < 0) {
      // Pulling right at start (Left boundary overscroll with continuous soft curve)
      track.scrollLeft = 0;
      const overscrollDistance = -desiredScroll;
      const visualOffset = MAX_OVERSCROLL * Math.tanh(overscrollDistance / OVERSCROLL_SCALE);
      overscrollOffsetRef.current = visualOffset;
      track.style.transform = `translateX(${visualOffset}px)`;
    } else if (desiredScroll > maxScroll) {
      // Pulling left at end (Right boundary overscroll with continuous soft curve)
      track.scrollLeft = maxScroll;
      const overscrollDistance = desiredScroll - maxScroll;
      const visualOffset = -(MAX_OVERSCROLL * Math.tanh(overscrollDistance / OVERSCROLL_SCALE));
      overscrollOffsetRef.current = visualOffset;
      track.style.transform = `translateX(${visualOffset}px)`;
    } else {
      // Normal in-bounds dragging
      track.scrollLeft = desiredScroll;
      if (overscrollOffsetRef.current !== 0) {
        overscrollOffsetRef.current = 0;
        track.style.transform = "translateX(0px)";
      }
    }
  };

  const handlePointerUpOrCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" && !isDraggingRef.current) return;
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {}

    const track = trackRef.current;
    if (!track) return;

    if (overscrollOffsetRef.current !== 0) {
      // Spring back smoothly from extended rubber-band overscroll
      overscrollOffsetRef.current = 0;
      track.style.transition = "transform 0.42s cubic-bezier(0.22, 1, 0.36, 1)";
      track.style.transform = "translateX(0px)";

      setTimeout(() => {
        dragMovedRef.current = false;
        if (track) {
          track.style.transition = "";
          track.style.scrollSnapType = "";
        }
      }, 420);
    } else if (dragMovedRef.current) {
      // Normal snap to closest card only if dragged
      track.style.transform = "translateX(0px)";
      track.style.transition = "";
      const firstCard = track.querySelector<HTMLElement>(".top10-product-card-wrap");
      const cardTotal = firstCard ? firstCard.getBoundingClientRect().width + 10 : 230;
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      
      const nearestIndex = Math.round(track.scrollLeft / cardTotal);
      const targetScroll = Math.min(Math.max(0, nearestIndex * cardTotal), maxScroll);

      track.style.scrollBehavior = "smooth";
      track.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });

      setTimeout(() => {
        dragMovedRef.current = false;
        if (track) {
          track.style.scrollSnapType = "";
        }
      }, 250);
    } else {
      // Clean click: immediately allow navigation
      dragMovedRef.current = false;
      track.style.scrollSnapType = "";
    }
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (dragMovedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <div className="top10-showcase-container">
      {/* Top Banner Header - Minimalist Luxury V4 */}
      <div className="top10-banner-header">
        <div className="top10-header-info">
          <span className="top10-header-kicker">BESTSELLERS • CHÍNH HÃNG</span>
          <h3 className="top10-header-title">TOP BÀN DJ BÁN CHẠY</h3>
        </div>
        <div className="top10-header-controls">
          <span className="top10-header-desc">Tuyển chọn các mẫu Controller & All-in-One được DJ ưa chuộng nhất</span>
          <div className="top10-header-arrows">
            <button
              type="button"
              className="top10-nav-btn prev-btn"
              onClick={() => handleScroll("left")}
              aria-label="Xem sản phẩm trước"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              type="button"
              className="top10-nav-btn next-btn"
              onClick={() => handleScroll("right")}
              aria-label="Xem sản phẩm tiếp theo"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Frame Wrapper / Carousel Body */}
      <div className="top10-frame-body">
        {/* Floating Side Arrow Left */}
        <button
          type="button"
          className="top10-nav-arrow left-arrow"
          onClick={() => handleScroll("left")}
          aria-label="Xem sản phẩm trước"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        {/* Floating Side Arrow Right */}
        <button
          type="button"
          className="top10-nav-arrow right-arrow"
          onClick={() => handleScroll("right")}
          aria-label="Xem sản phẩm tiếp theo"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        {/* Horizontal Track (5 Cards Visible on Desktop, 2 on Mobile) */}
        <div
          className={`top10-carousel-track ${isDragging ? "is-dragging" : ""}`}
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUpOrCancel}
          onPointerCancel={handlePointerUpOrCancel}
          onDragStart={(e) => e.preventDefault()}
          onClickCapture={handleClickCapture}
        >
          {products.map((p, idx) => (
            <Top10ProductCardItem key={p.id} product={p} idx={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}

// 2. STANDARD CATEGORY MOBILE CAROUSEL SECTION
interface MobileCarouselSectionProps {
  kicker: string;
  title: string;
  badge?: string;
  viewAllLink: string;
  products: Product[];
}

function MobileCarouselSection({
  kicker,
  title,
  badge,
  viewAllLink,
  products,
}: MobileCarouselSectionProps) {
  if (!products || products.length === 0) return null;

  return (
    <div className="mobile-product-carousel-block">
      {/* Carousel Header */}
      <div className="mobile-carousel-header">
        <div className="mobile-carousel-title-wrap">
          <div className="mobile-carousel-kicker-row">
            <span className="mobile-carousel-kicker">{kicker}</span>
            {badge && <span className="mobile-carousel-badge">{badge}</span>}
          </div>
          <h3 className="mobile-carousel-title">{title}</h3>
        </div>

        <Link href={viewAllLink} className="mobile-carousel-viewall-btn">
          <span>Xem tất cả</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      </div>

      {/* Horizontal Swipeable Track (2 Cards Visible Side-by-Side) */}
      <div className="mobile-product-carousel-track">
        {products.map((product) => (
          <div key={product.id} className="mobile-product-carousel-item">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

const CANONICAL_HOT_SLUG_MAP: Record<string, string> = {
  "ban-dj-alpha-theta-omnis-duo": "omnis-duo",
  "ban-dj-alphatheta-xdj-az": "xdj-az",
  "alphatheta-ddj-flx2": "ddj-flx2",
  "alphatheta-xdj-an": "xdj-an",
  "ban-dj-omnis-duo": "omnis-duo",
  "alpha-theta-omnis-duo": "omnis-duo",
  "alphatheta-omnis-duo": "omnis-duo",
  "pioneer-xdj-az": "xdj-az",
  "alphatheta-xdj-az": "xdj-az",
  "ban-dj-xdj-az": "xdj-az",
  "pioneer-ddj-flx2": "ddj-flx2",
  "ban-dj-flx2": "ddj-flx2",
  "ban-dj-flx4": "ddj-flx4",
  "pioneer-ddj-flx4": "ddj-flx4",
  "ban-dj-pioneer-ddj-flx4": "ddj-flx4",
  "pioneer-xdj-rx3": "xdj-rx3",
  "ban-dj-xdj-rx3": "xdj-rx3",
  "ban-dj-pioneer-xdj-rx3": "xdj-rx3",
  "pioneer-xdj-rx2": "xdj-rx2",
  "ban-dj-xdj-rx2": "xdj-rx2",
  "ban-dj-pioneer-xdj-rx2": "xdj-rx2",
  "pioneer-xdj-rr": "xdj-rr",
  "ban-dj-xdj-rr": "xdj-rr",
  "ban-dj-pioneer-xdj-rr": "xdj-rr",
  "ban-dj-pioneer-xdj-xz": "xdj-xz",
  "pioneer-xdj-xz": "xdj-xz",
  "pioneer-dj-xdj-xz": "xdj-xz",
  "pioneer-cdj-3000": "cdj-3000",
  "pioneer-ddj-rev5": "ddj-rev5",
  "ban-dj-ddj-rev5": "ddj-rev5",
};

interface ProductGridProps {
  initialProducts?: Product[];
}

export default function ProductGrid({ initialProducts }: ProductGridProps = {}) {
  const [allProducts, setAllProducts] = useState<Product[]>(() => {
    const source = initialProducts && initialProducts.length > 0 ? initialProducts : MOCK_PRODUCTS;
    return source.map((p) => {
      const canonical = CANONICAL_HOT_SLUG_MAP[p.slug];
      return canonical ? { ...p, slug: canonical } : p;
    });
  });
  const { t, lang } = useLanguage();

  useEffect(() => {
    // Single Source of Truth: If SSR passed initialProducts, keep them to avoid layout shift & flash
    if (initialProducts && initialProducts.length > 0) return;

    const fetchLiveProducts = async () => {
      try {
        const apiUrl = getApiBaseUrl();
        const res = await fetch(`${apiUrl}/products?_t=${Date.now()}`, { cache: "no-store" });
        if (res.ok) {
          const liveData = await res.json();
          if (Array.isArray(liveData) && liveData.length > 0) {
            setAllProducts(
              liveData.map((p: Product) => {
                const canonical = CANONICAL_HOT_SLUG_MAP[p.slug];
                return canonical ? { ...p, slug: canonical } : p;
              })
            );
          }
        }
      } catch {
        // Graceful fallback to mock products when backend API is offline
      }
    };

    fetchLiveProducts();
  }, [initialProducts]);

  // 1. Desktop Featured products (First 8 items)
  const desktopFeatured = useMemo(() => allProducts.slice(0, 8), [allProducts]);

  // 2. Mobile Grouped Products
  // A. Top 10 Bestsellers (Strict Fixed Priority: RX3, RX2, RR, FLX4, FLX2, OMNIS, AZ, XZ, CDJ-3000, REV5)
  const bestsellers = useMemo(() => {
    const prioritySlugs = [
      "xdj-rx3",
      "xdj-rx2",
      "xdj-rr",
      "ddj-flx4",
      "ddj-flx2",
      "omnis-duo",
      "xdj-az",
      "xdj-xz",
      "cdj-3000",
      "ddj-rev5",
    ];

    const sorted: Product[] = [];
    const usedIds = new Set<string>();

    prioritySlugs.forEach((slug) => {
      const lowerSlug = slug.toLowerCase();
      // 1. Exact slug match has highest priority
      let p = allProducts.find((item) => (item.slug || "").toLowerCase() === lowerSlug);
      // 2. Fallback to contains match if exact not found
      if (!p) {
        p = allProducts.find((item) => (item.slug || "").toLowerCase().includes(lowerSlug));
      }
      if (p && !usedIds.has(p.id)) {
        sorted.push(p);
        usedIds.add(p.id);
      }
    });

    for (const p of allProducts) {
      if (sorted.length >= 10) break;
      if (!usedIds.has(p.id)) {
        sorted.push(p);
        usedIds.add(p.id);
      }
    }

    return sorted.slice(0, 10);
  }, [allProducts]);

  // B. Bàn DJ & DJ Controller
  const djProducts = useMemo(() => {
    const djKeywords = ["xdj", "ddj", "dj", "omnis", "cdj", "flx", "plx", "mixer-dj", "turntable"];
    return allProducts.filter((p) => {
      const c = (p.category_slug || p.category_name || "").toLowerCase();
      const s = (p.slug || "").toLowerCase();
      const n = (p.name || "").toLowerCase();
      return djKeywords.some((k) => c.includes(k) || s.includes(k) || n.includes(k));
    }).slice(0, 10);
  }, [allProducts]);

  // C. Thiết Bị Âm Thanh & Mixer
  const audioMixerProducts = useMemo(() => {
    const audioKeywords = ["mixer", "dsp", "marani", "profx", "soundcraft", "amplifier", "cuc-day", "p-3600"];
    return allProducts.filter((p) => {
      const c = (p.category_slug || p.category_name || "").toLowerCase();
      const s = (p.slug || "").toLowerCase();
      const n = (p.name || "").toLowerCase();
      return (
        audioKeywords.some((k) => c.includes(k) || s.includes(k) || n.includes(k)) &&
        !s.includes("xdj") &&
        !s.includes("ddj")
      );
    }).slice(0, 10);
  }, [allProducts]);

  // D. Loa & Sân Khấu Pro (Section danh mục Loa Mobile)
  const speakerProducts = useMemo(() => {
    const spkKeywords = ["loa", "speaker", "array", "monitor", "dm-40", "dm-50", "vm-50", "nexo", "subwoofer"];
    return allProducts.filter((p) => {
      const c = (p.category_slug || p.category_name || "").toLowerCase();
      const s = (p.slug || "").toLowerCase();
      const n = (p.name || "").toLowerCase();
      return spkKeywords.some((k) => c.includes(k) || s.includes(k) || n.includes(k));
    }).slice(0, 10);
  }, [allProducts]);

  // E. Máy Khói & Ánh Sáng
  const effectsProducts = useMemo(() => {
    const fxKeywords = ["khoi", "fog", "haze", "antari", "fluid", "hazer", "quat"];
    return allProducts.filter((p) => {
      const c = (p.category_slug || p.category_name || "").toLowerCase();
      const s = (p.slug || "").toLowerCase();
      const n = (p.name || "").toLowerCase();
      return fxKeywords.some((k) => c.includes(k) || s.includes(k) || n.includes(k));
    }).slice(0, 10);
  }, [allProducts]);

  // F. Nhạc Cụ & Phụ Kiện / Củ Loa Rời
  const accessoryProducts = useMemo(() => {
    const accKeywords = ["bc-speakers", "treble", "cu-loa", "micro", "tai-nghe", "sennheiser", "klotz", "cable", "day-loa", "diaphragm", "hong-ken"];
    return allProducts.filter((p) => {
      const c = (p.category_slug || p.category_name || "").toLowerCase();
      const s = (p.slug || "").toLowerCase();
      const n = (p.name || "").toLowerCase();
      return accKeywords.some((k) => c.includes(k) || s.includes(k) || n.includes(k));
    }).slice(0, 10);
  }, [allProducts]);

  return (
    <section
      className="products-section reveal-on-scroll"
      id="featured-products"
      style={{
        padding: "85px 0 140px 0",
        backgroundColor: "#08090B",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div className="container">
        {/* =========================================================================
            TOP 10 SẢN PHẨM BÁN CHẠY (HIỂN THỊ CẢ DESKTOP & MOBILE)
            - Desktop: 5 Cards / Viewport, 10 Products Total, Smooth Carousel
            - Mobile: 2 Cards / Viewport, Touch-Swipe (100% Intact)
           ========================================================================= */}
        <Top10BestsellerBox products={bestsellers} />

        {/* =========================================================================
            1. DESKTOP VIEW: LUXURY MINIMALIST GRID (100% UNTOUCHED FOR DESKTOP)
           ========================================================================= */}
        <div className="desktop-featured-section" style={{ marginTop: "56px" }}>
          <div className="pg-header-wrap">
            <h2 className="pg-main-title">{t.products.featuredTitle}</h2>

            <Link
              href="/products"
              className="pg-cta-button"
              aria-label={`${t.products.viewAllCount} (50+)`}
            >
              <span className="pg-cta-text">{t.products.viewAllCount} (50+)</span>
              <span className="pg-cta-icon-wrap" aria-hidden="true">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
          </div>

          <div className="vb-product-grid">
            {desktopFeatured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* =========================================================================
            2. MOBILE VIEW: 5 CAROUSELS (INSPIRED BY DIENTULINHANH)
           ========================================================================= */}
        <div className="mobile-featured-carousels-container">
          {/* CAROUSEL 2: BÀN DJ & DJ CONTROLLER */}
          <MobileCarouselSection
            kicker="PIONEER DJ & ALPHATHETA"
            title={lang === "en" ? "DJ Decks & Controllers" : "Bàn DJ & DJ Controller"}
            viewAllLink="/products?group=dj"
            products={djProducts}
          />

          {/* CAROUSEL 3: THIẾT BỊ ÂM THANH & MIXER */}
          <MobileCarouselSection
            kicker="PRO AUDIO & PROCESSING"
            title={lang === "en" ? "Mixing Consoles & DSP" : "Thiết Bị Âm Thanh & Mixer"}
            viewAllLink="/products?category=mixer-ban-tron-am-thanh"
            products={audioMixerProducts}
          />

          {/* CAROUSEL 4: LOA & SÂN KHẤU PRO (SECTION LOA MOBILE) */}
          <MobileCarouselSection
            kicker="STAGE LOUDSPEAKERS & MONITORS"
            title={lang === "en" ? "Pro Audio Speakers" : "Hệ Thống Loa & Sân Khấu Pro"}
            viewAllLink="/products?category=loa-thung-pro-audio"
            products={speakerProducts}
          />

          {/* CAROUSEL 5: MÁY KHÓI & ÁNH SÁNG SÂN KHẤU */}
          <MobileCarouselSection
            kicker="ANTARI STAGE EFFECTS"
            title={lang === "en" ? "Fog, Haze & Stage Effects" : "Máy Khói & Ánh Sáng Sân Khấu"}
            viewAllLink="/products?group=effects"
            products={effectsProducts}
          />

          {/* CAROUSEL 6: NHẠC CỤ & PHỤ KIỆN / CỦ LOA RỜI */}
          <MobileCarouselSection
            kicker="B&C SPEAKERS & ACCESSORIES"
            title={lang === "en" ? "Raw Drivers & Pro Accessories" : "Củ Loa Rời & Phụ Kiện Âm Thanh"}
            viewAllLink="/products?group=accessories"
            products={accessoryProducts}
          />
        </div>
      </div>
    </section>
  );
}