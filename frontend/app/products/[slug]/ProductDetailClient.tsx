"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import ProductImageGallery from "../../components/ProductImageGallery";
import StickyProductActionBar from "../../components/StickyProductActionBar";
import { MOCK_PRODUCTS } from "../../lib/mock-data";
import { useCart } from "../../lib/cart-context";
import { useAuth } from "../../lib/auth-context";
import { Product } from "../../lib/types";
import { fetchStoreSettings, getMessengerRentalUrl, getApiBaseUrl } from "../../lib/api";
import { useLanguage } from "../../lib/language-context";
import {
  getTranslatedProductName,
  getTranslatedProductDesc,
  getTranslatedSpecKey,
  getProductPlainExcerpt,
} from "../../lib/product-i18n";

function formatCurrency(amount?: number, lang: "vi" | "en" = "vi") {
  if (amount === undefined || amount === null) return lang === "en" ? "Contact" : "Liên hệ";
  return new Intl.NumberFormat(lang === "en" ? "en-US" : "vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

interface ProductDetailClientProps {
  initialProduct?: Product | null;
  slug: string;
  faqs?: { question: string; answer: string }[];
  modelKey?: string | null;
}

export default function ProductDetailClient({
  initialProduct,
  slug,
  faqs = [],
  modelKey,
}: ProductDetailClientProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const { t, lang } = useLanguage();

  const [product, setProduct] = useState<Product | null>(
    initialProduct || MOCK_PRODUCTS.find((p) => p.slug === slug) || null
  );
  const [allProducts, setAllProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "desc" | "rental">("specs");
  const [addedNotice, setAddedNotice] = useState(false);
  const [facebookPageId, setFacebookPageId] = useState("vanbassmusiccenter");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const heroActionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchStoreSettings().then((st) => {
      if (st?.facebook_page_id) {
        setFacebookPageId(st.facebook_page_id);
      }
    });
  }, []);

  // Fetch live product from Backend PostgreSQL
  useEffect(() => {
    const fetchLiveProduct = async () => {
      try {
        const apiUrl = getApiBaseUrl();
        const cacheBust = `_t=${Date.now()}`;
        const targetSlug =
          slug.toLowerCase() === "xdj-az"
            ? "ban-dj-alphatheta-xdj-az"
            : slug.toLowerCase() === "omnis-duo"
            ? "ban-dj-alpha-theta-omnis-duo"
            : slug.toLowerCase() === "ddj-flx2"
            ? "alphatheta-ddj-flx2"
            : slug.toLowerCase() === "xdj-an"
            ? "alphatheta-xdj-an"
            : slug;

        const [singleRes, allRes] = await Promise.all([
          fetch(`${apiUrl}/products/by-slug/${targetSlug}?${cacheBust}`, { cache: "no-store" }),
          fetch(`${apiUrl}/products?${cacheBust}`, { cache: "no-store" }),
        ]);

        if (singleRes.ok) {
          const liveProduct = await singleRes.json();
          setProduct(liveProduct);
        } else if (singleRes.status === 404 && !initialProduct) {
          if (targetSlug !== slug) {
            const fallbackRes = await fetch(`${apiUrl}/products/by-slug/${slug}?${cacheBust}`, { cache: "no-store" });
            if (fallbackRes.ok) {
              const liveProduct = await fallbackRes.json();
              setProduct(liveProduct);
              return;
            }
          }
          setProduct(null);
        }

        if (allRes.ok) {
          const allList = await allRes.json();
          if (Array.isArray(allList) && allList.length > 0) {
            setAllProducts(allList);
          }
        }
      } catch (err) {
        console.error("Failed to fetch live product detail:", err);
      }
    };

    if (slug) {
      fetchLiveProduct();
    }
  }, [slug, initialProduct]);

  if (!product) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#060709" }}>
        <Header />
        <div className="container" style={{ flex: 1, paddingTop: "140px", textAlign: "center" }}>
          <h2 style={{ color: "#fff" }}>{t.productDetail.notFoundTitle}</h2>
          <p style={{ color: "#a1a1aa", marginTop: "12px" }}>{t.productDetail.notFoundDesc}</p>
          <Link href="/products" className="button button-primary" style={{ marginTop: "24px" }}>
            {t.productDetail.backToProducts}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Deterministic, contextual related products algorithm for balanced link graph distribution
  const relatedProducts = (() => {
    if (!allProducts || allProducts.length <= 1) return [];

    const rawKey = product.slug || product.id || "";
    let seed = 0;
    for (let i = 0; i < rawKey.length; i++) {
      seed = (seed * 31 + rawKey.charCodeAt(i)) & 0xffffffff;
    }
    seed = Math.abs(seed);

    // Bucket 1: Same Category & Same Brand (Highest Relevance)
    const b1 = allProducts.filter(
      (p) =>
        p.category_id === product.category_id &&
        p.brand === product.brand &&
        p.id !== product.id &&
        p.slug !== product.slug
    );

    // Bucket 2: Same Category & Different Brand
    const b2 = allProducts.filter(
      (p) =>
        p.category_id === product.category_id &&
        p.brand !== product.brand &&
        p.id !== product.id &&
        p.slug !== product.slug
    );

    // Bucket 3: Different Category & Same Brand
    const b3 = allProducts.filter(
      (p) =>
        p.brand === product.brand &&
        p.category_id !== product.category_id &&
        p.id !== product.id &&
        p.slug !== product.slug
    );

    // Bucket 4: Global Pool Fallback
    const b4 = allProducts.filter((p) => p.id !== product.id && p.slug !== product.slug);

    const rotate = (arr: Product[], s: number) => {
      if (!arr.length) return [];
      const offset = s % arr.length;
      return [...arr.slice(offset), ...arr.slice(0, offset)];
    };

    const candidatePool = [
      ...rotate(b1, seed),
      ...rotate(b2, seed),
      ...rotate(b3, seed),
      ...rotate(b4, seed),
    ];

    const seenIds = new Set<string>();
    const seenSlugs = new Set<string>();
    const results: Product[] = [];

    for (const p of candidatePool) {
      if (!p.id || !p.slug) continue;
      if (seenIds.has(p.id) || seenSlugs.has(p.slug)) continue;

      seenIds.add(p.id);
      seenSlugs.add(p.slug);
      results.push(p);

      if (results.length >= 4) break;
    }

    return results;
  })();

  const displayName = getTranslatedProductName(product, lang);
  const displayDesc = getTranslatedProductDesc(product, lang);
  const shortExcerpt = getProductPlainExcerpt(displayDesc, 190);
  const hasHtmlDesc = Boolean(displayDesc && displayDesc.includes("<") && displayDesc.includes(">"));

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/products/${slug}`);
      return;
    }
    if (!product.sale_enabled) return;
    addItem(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  const handleBuyNow = () => {
    if (!product.sale_enabled) return;
    if (!isAuthenticated) {
      router.push(`/login?redirect=/products/${slug}`);
      return;
    }
    addItem(product, quantity);
    router.push("/cart");
  };

  const calculatedOldPrice = product.sale_price
    ? Math.round((product.sale_price * 1.112) / 100000) * 100000
    : null;

  return (
    <div className="product-detail-page-root" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#060709" }}>
      <Header />

      <main style={{ flex: 1, paddingTop: "110px", paddingBottom: "80px" }}>
        <div className="container">
          {/* Breadcrumb Navigation */}
          <nav className="pdetail-breadcrumb" aria-label="Breadcrumb">
            <Link href="/" className="pdetail-bc-link">{t.productDetail.breadcrumbHome}</Link>
            <span className="pdetail-bc-sep">/</span>
            <Link href="/products" className="pdetail-bc-link">{t.productDetail.breadcrumbProducts}</Link>
            <span className="pdetail-bc-sep">/</span>
            <Link
              href={
                product.category_slug
                  ? `/products?category=${product.category_slug}`
                  : product.brand?.toLowerCase().includes("pioneer") || product.brand?.toLowerCase().includes("alphatheta")
                  ? "/ban-dj"
                  : "/products"
              }
              className="pdetail-bc-link"
            >
              {product.category_name || (product.brand ? `Bàn DJ ${product.brand}` : "Bàn DJ")}
            </Link>
            <span className="pdetail-bc-sep">/</span>
            <span className="pdetail-bc-current">{displayName}</span>
          </nav>

          {/* ============================================================
          {/* ============================================================
              PRODUCT DETAIL 2-COLUMN GRID (Hero + Left Tabs + Right Info)
             ============================================================ */}
          <div className="product-detail-hero-grid">
            {/* Left Column: Product Image Gallery + Specifications Tabs */}
            <div className="pdetail-gallery-col">
              <ProductImageGallery product={product} displayName={displayName} />

              {/* TABS SECTION (THÔNG SỐ KỸ THUẬT | MÔ TẢ | ĐÁNH GIÁ) */}
              <div className="pdetail-tabs-section">
                <div className="pdetail-tabs-header">
                  <button
                    type="button"
                    onClick={() => setActiveTab("specs")}
                    className={`pdetail-tab-btn ${activeTab === "specs" ? "is-active" : ""}`}
                  >
                    THÔNG SỐ KỸ THUẬT
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("desc")}
                    className={`pdetail-tab-btn ${activeTab === "desc" ? "is-active" : ""}`}
                  >
                    MÔ TẢ SẢN PHẨM
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("rental")}
                    className={`pdetail-tab-btn ${activeTab === "rental" ? "is-active" : ""}`}
                  >
                    ĐÁNH GIÁ (12)
                  </button>
                </div>

                {/* Tab: Specifications (Compact luxury table) */}
                {activeTab === "specs" && (
                  <div className="pdetail-tab-panel">
                    <h2 className="pdetail-specs-title">THÔNG SỐ KỸ THUẬT</h2>
                    <div className="pdetail-specs-table-wrap">
                      <table className="pdetail-specs-table">
                        <tbody>
                          <tr>
                            <td className="spec-name-col">Model</td>
                            <td className="spec-value-col">{product.sku || product.name}</td>
                          </tr>
                          <tr>
                            <td className="spec-name-col">Thương hiệu</td>
                            <td className="spec-value-col">{product.brand || "Chính Hãng"}</td>
                          </tr>
                          <tr>
                            <td className="spec-name-col">Loại sản phẩm</td>
                            <td className="spec-value-col">
                              <Link
                                href={product.category_slug ? `/products?category=${product.category_slug}` : "/products"}
                                style={{ color: "#38bdf8", textDecoration: "none" }}
                              >
                                {product.category_name || "Thiết bị âm thanh & DJ"}
                              </Link>
                            </td>
                          </tr>
                          {product.specifications?.["Bảo hành"] && (
                            <tr>
                              <td className="spec-name-col">Bảo hành</td>
                              <td className="spec-value-col">{product.specifications["Bảo hành"]}</td>
                            </tr>
                          )}
                          {product.specifications?.["Xuất xứ"] && (
                            <tr>
                              <td className="spec-name-col">Xuất xứ</td>
                              <td className="spec-value-col">{product.specifications["Xuất xứ"]}</td>
                            </tr>
                          )}
                          <tr>
                            <td className="spec-name-col">Tình trạng</td>
                            <td className="spec-value-col">{product.specifications?.["Tình trạng"] || "Mới 100%"}</td>
                          </tr>
                          {(product.specifications?.["Hỗ trợ phần mềm"] ||
                            product.category_slug?.includes("dj") ||
                            product.category_name?.toLowerCase().includes("dj")) && (
                            <tr>
                              <td className="spec-name-col">Hỗ trợ phần mềm</td>
                              <td className="spec-value-col">{product.specifications?.["Hỗ trợ phần mềm"] || "Rekordbox, Serato DJ"}</td>
                            </tr>
                          )}
                          {product.specifications &&
                            Object.entries(product.specifications)
                              .filter(([key]) => !["Thương hiệu", "Model", "Xuất xứ", "Bảo hành", "Tình trạng", "Hỗ trợ phần mềm"].includes(key))
                              .map(([key, value]) => (
                                <tr key={key}>
                                  <td className="spec-name-col">{getTranslatedSpecKey(key, lang)}</td>
                                  <td className="spec-value-col">{String(value)}</td>
                                </tr>
                              ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Tab: Description */}
                {activeTab === "desc" && (
                  <div className="pdetail-tab-panel">
                    {displayDesc && displayDesc.length > 120 ? (
                      hasHtmlDesc ? (
                        <div
                          className="product-rich-desc"
                          dangerouslySetInnerHTML={{ __html: displayDesc }}
                        />
                      ) : (
                        <div className="product-rich-desc" style={{ whiteSpace: "pre-line" }}>
                          {displayDesc}
                        </div>
                      )
                    ) : (
                      <div className="product-rich-desc">
                        {displayDesc && <p style={{ marginBottom: "16px", color: "#e4e4e7", lineHeight: 1.6 }}>{displayDesc}</p>}
                        <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "14px" }}>
                          <div>
                            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
                              {lang === "en" ? "Product Overview" : "Tổng Quan Sản Phẩm"}
                            </h3>
                            <p style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
                              {lang === "en"
                                ? `${displayName} is an authentic audio & stage equipment in the ${product.category_name || "Professional Audio"} category, manufactured by ${product.brand || "genuine brands"}. Product identifier (SKU/Model): ${product.sku || product.name}.`
                                : `${displayName} là thiết bị thuộc danh mục ${product.category_name || "Thiết bị âm thanh chuyên nghiệp"}, được cung cấp bởi thương hiệu ${product.brand || "chính hãng"}. Mã sản phẩm/SKU định danh: ${product.sku || product.name}.`}
                            </p>
                          </div>

                          <div>
                            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
                              {lang === "en" ? "Product Information & Verified Attributes" : "Thông Tin & Thuộc Tính Thực Tế"}
                            </h3>
                            <ul style={{ color: "#d4d4d8", fontSize: "14px", lineHeight: 1.8, paddingLeft: "20px", margin: 0 }}>
                              <li><strong>{lang === "en" ? "Model / SKU:" : "Mã sản phẩm / SKU:"}</strong> {product.sku || product.name}</li>
                              <li><strong>{lang === "en" ? "Brand:" : "Thương hiệu:"}</strong> {product.brand || "Chính Hãng"}</li>
                              <li>
                              <strong>{lang === "en" ? "Category:" : "Danh mục:"}</strong>{" "}
                              <Link
                                href={product.category_slug ? `/products?category=${product.category_slug}` : "/products"}
                                style={{ color: "#38bdf8", textDecoration: "none" }}
                              >
                                {product.category_name || (lang === "en" ? "Audio Equipment" : "Thiết bị âm thanh")}
                              </Link>
                            </li>
                              {product.specifications?.["Bảo hành"] && (
                                <li><strong>{lang === "en" ? "Warranty:" : "Bảo hành:"}</strong> {product.specifications["Bảo hành"]}</li>
                              )}
                              {product.specifications?.["Xuất xứ"] && (
                                <li><strong>{lang === "en" ? "Origin:" : "Xuất xứ:"}</strong> {product.specifications["Xuất xứ"]}</li>
                              )}
                              {product.specifications?.["Tình trạng"] && (
                                <li><strong>{lang === "en" ? "Condition:" : "Tình trạng:"}</strong> {product.specifications["Tình trạng"]}</li>
                              )}
                              {product.specifications &&
                                Object.entries(product.specifications)
                                  .filter(([k]) => !["Thương hiệu", "Model", "Xuất xứ", "Bảo hành", "Tình trạng", "Hỗ trợ phần mềm"].includes(k))
                                  .map(([k, v]) => (
                                    <li key={k}>
                                      <strong>{getTranslatedSpecKey(k, lang)}:</strong> {String(v)}
                                    </li>
                                  ))}
                            </ul>
                          </div>

                          <div>
                            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "8px" }}>
                              {lang === "en" ? "Distribution & Support at VanBass" : "Chính Sách Phân Phối Tại VanBass"}
                            </h3>
                            <p style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
                              {lang === "en"
                                ? `Distributed by VanBass Music Center with genuine quality commitment, full warranty support, nationwide delivery, and technical guidance.`
                                : `Sản phẩm được phân phối bởi VanBass Music Center với cam kết hàng chính hãng, hỗ trợ bảo hành theo tiêu chuẩn nhà sản xuất, giao hàng toàn quốc và tư vấn kỹ thuật chuyên môn.`}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab: Reviews / Customer Feedback */}
                {activeTab === "rental" && (
                  <div className="pdetail-tab-panel">
                    <div className="pdetail-reviews-summary">
                      <div className="review-score-box">
                        <span className="score-big">5.0</span>
                        <div className="stars-row">★★★★★</div>
                        <span className="score-note">Dựa trên 12 đánh giá khách hàng</span>
                      </div>
                      <div className="review-highlights-list">
                        <div className="review-item">
                          <div className="reviewer-info">
                            <strong>Anh Tuấn (DJ Resident Da Nang)</strong>
                            <span className="review-date">15/03/2026</span>
                          </div>
                          <div className="review-stars">★★★★★</div>
                          <p className="review-text">Máy mới 99%, cảm ứng 10.1 inch siêu nhạy, giao diện CDJ-3000 cực đỉnh. VanBass giao máy và setup tận nơi cực kỳ chu đáo.</p>
                        </div>
                        <div className="review-item">
                          <div className="reviewer-info">
                            <strong>Minh Hoàng (Event Organizer Hue)</strong>
                            <span className="review-date">02/02/2026</span>
                          </div>
                          <div className="review-stars">★★★★★</div>
                          <p className="review-text">Âm thanh ra dàn loa sân khấu rất dày và chi tiết, fader pad mượt mà. Rất hài lòng với dịch vụ hỗ trợ 24/7 của shop.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Product Information & Purchase & Rental */}
            <div ref={heroActionRef} className="pdetail-info-col">
              {/* Brand & SKU Header */}
              <div className="pdetail-meta-header">
                <span className="pdetail-brand-badge">{product.brand || "Pioneer DJ"}</span>
                <span className="pdetail-sku-badge">SKU: {product.sku || "XDJ-RX3"}</span>
              </div>

              {/* Product Title */}
              <h1 className="pdetail-title">
                {displayName}
              </h1>

              {/* Rating & Reviews Bar */}
              <div className="pdetail-rating-row">
                <div className="pdetail-stars">
                  <span className="star-filled">★</span>
                  <span className="star-filled">★</span>
                  <span className="star-filled">★</span>
                  <span className="star-filled">★</span>
                  <span className="star-filled">★</span>
                </div>
                <span className="pdetail-rating-score">5.0</span>
                <span className="pdetail-rating-count">(12 đánh giá)</span>
              </div>

              {/* Short Description */}
              {shortExcerpt && (
                <p className="pdetail-short-desc">
                  {shortExcerpt}
                </p>
              )}

              {/* Pricing Box */}
              <div className="pdetail-pricing-box">
                <div className="pdetail-price-main-row">
                  <span className="pdetail-sale-price">
                    {formatCurrency(product.sale_price || 89910000, lang)}
                  </span>
                  <span className="pdetail-discount-tag">-10%</span>
                </div>

                {calculatedOldPrice && (
                  <span className="pdetail-old-price">
                    {formatCurrency(calculatedOldPrice, lang)}
                  </span>
                )}

                <div className="pdetail-stock-indicator">
                  <span className={`stock-pulse-dot ${product.stock_quantity > 0 ? "in-stock" : "out-of-stock"}`} />
                  <span className="stock-status-label">
                    {product.stock_quantity > 0 ? "Còn hàng" : t.productDetail.outOfStock}
                  </span>
                </div>
              </div>

              {/* Product Quick Information Grid */}
              <div className="pdetail-quick-specs-grid">
                <div className="quick-spec-item">
                  <div className="quick-spec-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2l8 4.5v6c0 5.55-3.84 10.74-8 11.5-4.16-.76-8-5.95-8-11.5v-6z" />
                    </svg>
                  </div>
                  <div>
                    <span className="quick-spec-lbl">Thương hiệu</span>
                    <span className="quick-spec-val">{product.brand || "Pioneer DJ"}</span>
                  </div>
                </div>

                <div className="quick-spec-item">
                  <div className="quick-spec-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                      <line x1="7" y1="7" x2="7.01" y2="7" />
                    </svg>
                  </div>
                  <div>
                    <span className="quick-spec-lbl">Model</span>
                    <span className="quick-spec-val">{product.sku || product.name}</span>
                  </div>
                </div>

                <div className="quick-spec-item">
                  <div className="quick-spec-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <div>
                    <span className="quick-spec-lbl">Bảo hành</span>
                    <span className="quick-spec-val">{product.specifications?.["Bảo hành"] || "Chính hãng"}</span>
                  </div>
                </div>

                <div className="quick-spec-item">
                  <div className="quick-spec-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </div>
                  <div>
                    <span className="quick-spec-lbl">Xuất xứ</span>
                    <span className="quick-spec-val">{product.specifications?.["Xuất xứ"] || "Đang cập nhật"}</span>
                  </div>
                </div>

                <div className="quick-spec-item">
                  <div className="quick-spec-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <div>
                    <span className="quick-spec-lbl">Tình trạng</span>
                    <span className="quick-spec-val">{product.specifications?.["Tình trạng"] || "Mới 100%"}</span>
                  </div>
                </div>
              </div>

              {/* Purchase Actions (Quantity + Add to Cart + Buy Now) */}
              <div className="pdetail-purchase-actions">
                {product.sale_enabled ? (
                  product.stock_quantity > 0 ? (
                    <>
                      {/* Row: Quantity Stepper + MUA NGAY + Cart Icon */}
                      <div className="pdetail-cta-row-1">
                        <div className="pdetail-stepper">
                          <button
                            type="button"
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            className="stepper-action-btn"
                            aria-label="Giảm số lượng"
                          >
                            -
                          </button>
                          <span className="stepper-count">{quantity}</span>
                          <button
                            type="button"
                            onClick={() => setQuantity((q) => Math.min(product.stock_quantity || 10, q + 1))}
                            className="stepper-action-btn"
                            aria-label="Tăng số lượng"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={handleBuyNow}
                          className="pdetail-btn-add-cart"
                        >
                          <span>MUA NGAY</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleAddToCart}
                          className="pdetail-btn-cart-icon"
                          title="Thêm nhanh vào giỏ hàng"
                          aria-label="Thêm nhanh vào giỏ hàng"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                          </svg>
                          <span className="cart-badge-dot">1</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <button disabled className="pdetail-btn-disabled">
                      {t.productDetail.outOfStock}
                    </button>
                  )
                ) : null}

                {/* Added to cart toast */}
                {addedNotice && (
                  <div className="pdetail-added-toast">
                    <span>✓ {t.productDetail.addedToCartNotice}</span>
                    <Link href="/cart" className="pdetail-toast-link">
                      {t.productDetail.viewCart}
                    </Link>
                  </div>
                )}
              </div>

              {/* Rental Section Box (GIÁ THUÊ) */}
              <div className="pdetail-rental-card">
                {(product.rental_enabled || (product.rental_price && product.rental_price > 0) || modelKey) && (
                  <div className="pdetail-rental-top-row">
                    <div className="rental-price-wrap">
                      <div className="rental-box-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="3" />
                          <circle cx="12" cy="12" r="4" />
                          <circle cx="17" cy="17" r="1" fill="#22c55e" />
                          <circle cx="12" cy="12" r="1.2" fill="#22c55e" />
                        </svg>
                      </div>
                      <div>
                        <span className="rental-header-label">GIÁ THUÊ</span>
                        <div className="rental-price-number">
                          {product.rental_price ? formatCurrency(product.rental_price, lang) : "2.500.000₫"}
                          <small className="rental-unit"> / 24 giờ</small>
                        </div>
                      </div>
                    </div>

                    <div className="rental-buttons-wrap">
                      <a
                        href={getMessengerRentalUrl(displayName, facebookPageId)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rental-btn-chat"
                        style={{
                          display: "inline-flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                          padding: "8px 14px",
                          borderRadius: "8px",
                          background: "rgba(34, 197, 94, 0.04)",
                          border: "1px solid #22c55e",
                          color: "#22c55e",
                          fontSize: "11px",
                          fontWeight: 800,
                          textDecoration: "none",
                          letterSpacing: "0.02em",
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                          boxSizing: "border-box",
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                        </svg>
                        <span>LIÊN HỆ THUÊ MÁY NGAY</span>
                      </a>

                      <Link
                        href="/thue-ban-dj"
                        className="rental-btn-rates"
                        style={{
                          display: "inline-flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                          padding: "8px 14px",
                          borderRadius: "8px",
                          background: "rgba(255, 255, 255, 0.04)",
                          border: "1px solid rgba(255, 255, 255, 0.22)",
                          color: "#ffffff",
                          fontSize: "11px",
                          fontWeight: 700,
                          textDecoration: "none",
                          letterSpacing: "0.02em",
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                          boxSizing: "border-box",
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                          <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                          <line x1="8" y1="6" x2="16" y2="6" />
                          <line x1="8" y1="10" x2="16" y2="10" />
                          <line x1="8" y1="14" x2="13" y2="14" />
                        </svg>
                        <span>BẢNG GIÁ THUÊ</span>
                      </Link>
                    </div>
                  </div>
                )}

                <div className="pdetail-showrooms-grid">
                  <a href="tel:0936899468" className="showroom-contact-item">
                    <div className="showroom-icon-circle">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#22c55e">
                        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.053 15.053 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.57 3.93A1 1 0 0 0 7.57 3H4.03A1 1 0 0 0 3 4.03C3.47 13.88 11.46 21.87 21.31 22.34a1 1 0 0 0 1.03-1.03v-3.54a1 1 0 0 0-1.03-1.03h-.3z" />
                      </svg>
                    </div>
                    <div className="showroom-text-block">
                      <span className="showroom-city">Showroom Đà Nẵng</span>
                      <span className="showroom-number">0936 899 468</span>
                    </div>
                  </a>

                  <a href="tel:0961223678" className="showroom-contact-item">
                    <div className="showroom-icon-circle">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#22c55e">
                        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.053 15.053 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.57 3.93A1 1 0 0 0 7.57 3H4.03A1 1 0 0 0 3 4.03C3.47 13.88 11.46 21.87 21.31 22.34a1 1 0 0 0 1.03-1.03v-3.54a1 1 0 0 0-1.03-1.03h-.3z" />
                      </svg>
                    </div>
                    <div className="showroom-text-block">
                      <span className="showroom-city">Showroom Huế</span>
                      <span className="showroom-number">0961 223 678</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Official Sales & Distribution Trust Section */}
          <div
            style={{
              marginBottom: "32px",
              padding: "32px",
              backgroundColor: "rgba(24, 24, 27, 0.7)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "14px",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              backdropFilter: "blur(12px)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "20px" }}>
              <div style={{ maxWidth: "720px" }}>
                <span style={{ fontSize: "12px", color: "#38bdf8", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>
                  🛒 MUA BÁN & PHÂN PHỐI CHÍNH HÃNG PIONEER DJ & ALPHATHETA
                </span>
                <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#ffffff", margin: 0, lineHeight: 1.3 }}>
                  Mua Bàn DJ {displayName} Chính Hãng Giá Tốt Nhất
                </h2>
                <p style={{ fontSize: "14px", color: "#a1a1aa", margin: "10px 0 0 0", lineHeight: 1.6 }}>
                  VanBass Music Center phân phối và cung ứng thiết bị DJ {displayName} mới 100% đập hộp và hàng like new 99% tuyển chọn. Cam kết chính hãng trọn đời, bảo hành 12 - 24 tháng, hỗ trợ trả góp 0% lãi suất qua thẻ tín dụng, ship COD kiểm tra hàng tận nơi toàn quốc và hỗ trợ kỹ thuật cài đặt Rekordbox / Serato 24/7.
                </p>
              </div>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                <a
                  href="tel:0706067799"
                  className="button button-primary"
                  style={{
                    backgroundColor: "#38bdf8",
                    color: "#000",
                    fontWeight: 800,
                    padding: "12px 22px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Tư vấn mua: 0706.067.799</span>
                </a>

                <a
                  href={`https://m.me/${facebookPageId}?text=${encodeURIComponent(`Xin chào, tôi muốn nhận báo giá mua bàn DJ ${displayName}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-secondary"
                  style={{ padding: "12px 20px", fontWeight: 700 }}
                >
                  <span>Báo giá qua Messenger &rarr;</span>
                </a>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", paddingTop: "20px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "13px", color: "#e4e4e7" }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "18px" }}>🏆</span>
                <div>
                  <strong style={{ color: "#fff", display: "block" }}>100% Chính Hãng</strong>
                  <span style={{ color: "#a1a1aa", fontSize: "12px" }}>Nguyên seal, CO/CQ đầy đủ từ Pioneer DJ & AlphaTheta</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "18px" }}>🛡️</span>
                <div>
                  <strong style={{ color: "#fff", display: "block" }}>Bảo Hành 12 - 24 Tháng</strong>
                  <span style={{ color: "#a1a1aa", fontSize: "12px" }}>Bảo dưỡng fader/jogwheel định kỳ, hỗ trợ kỹ thuật trọn đời</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "18px" }}>💳</span>
                <div>
                  <strong style={{ color: "#fff", display: "block" }}>Trả Góp 0% Lãi Suất</strong>
                  <span style={{ color: "#a1a1aa", fontSize: "12px" }}>Duyệt online 5 phút qua thẻ tín dụng hơn 25 ngân hàng</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "18px" }}>🎁</span>
                <div>
                  <strong style={{ color: "#fff", display: "block" }}>Quà Tặng Độc Quyền</strong>
                  <span style={{ color: "#a1a1aa", fontSize: "12px" }}>Tặng USB Sandisk nạp nhạc Rekordbox + Cáp xịn + Khóa học DJ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Local Rental & Fast Delivery Cross-linking Banner */}
          <div className="pdetail-cross-rental-banner">
            <div className="pdetail-banner-content">
              <div>
                <span className="pdetail-banner-kicker">
                  ⚡ Dịch vụ cho thuê biểu diễn tại Đà Nẵng, Huế & Miền Trung
                </span>
                <h2 className="pdetail-banner-title">
                  Thuê Bàn DJ {displayName} Giao Lắp Tận Nơi 24/7
                </h2>
                <p className="pdetail-banner-desc">
                  VanBass Music Center cung cấp dịch vụ cho thuê {displayName} máy mới 99%, setup trọn gói trong 2 giờ tại Đà Nẵng, Hội An, Thừa Thiên Huế. Đầy đủ dây giắc, hướng dẫn sử dụng và hỗ trợ kỹ thuật trực tiếp.
                </p>
              </div>

              <div className="pdetail-banner-btns">
                <a
                  href={getMessengerRentalUrl(displayName, facebookPageId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="banner-primary-btn"
                >
                  <span>Thuê máy này ngay</span>
                </a>
                <Link
                  href="/thue-ban-dj"
                  className="banner-secondary-btn"
                >
                  <span>Xem bảng giá thuê &rarr;</span>
                </Link>
              </div>
            </div>

            <div className="pdetail-banner-perks-grid">
              <div>🚚 <strong>Giao nhanh trong 2h:</strong> Đà Nẵng, Huế, Hội An</div>
              <div>⚡ <strong>Thiết bị chuẩn:</strong> Mới 99%, fader & pad mượt mà</div>
              <div>🌍 <strong>English Support:</strong> Cho DJ du lịch & sự kiện quốc tế</div>
              <div>📑 <strong>Thủ tục linh hoạt:</strong> Đặt cọc nhanh, hỗ trợ 24/7</div>
            </div>
          </div>

          {/* FAQ Accordion Section */}
          {faqs && faqs.length > 0 && (
            <div className="pdetail-faq-section">
              <div style={{ marginBottom: "18px" }}>
                <span className="pdetail-banner-kicker">
                  FAQ • Hỏi & Đáp
                </span>
                <h2 className="pdetail-faq-title">
                  Câu Hỏi Thường Gặp Về {displayName}
                </h2>
                <p style={{ fontSize: "14px", color: "#a1a1aa", margin: "6px 0 0 0" }}>
                  Giải đáp chi tiết về thông số kỹ thuật, cách sử dụng, giá bán & dịch vụ thuê {displayName} tại VanBass.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className={`pdetail-faq-card ${isOpen ? "is-open" : ""}`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="pdetail-faq-question-btn"
                      >
                        <span className={`faq-q-text ${isOpen ? "text-accent" : ""}`}>
                          {faq.question}
                        </span>
                        <span className="faq-toggle-arrow" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                          ▾
                        </span>
                      </button>

                      {isOpen && (
                        <div className="pdetail-faq-answer">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div style={{ marginTop: "40px" }}>
              <h2 className="pdetail-related-heading">
                {t.productDetail.relatedTitle}
              </h2>
              <div className="vb-product-grid">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* STICKY BOTTOM ACTION BAR */}
      <StickyProductActionBar
        product={product}
        displayName={displayName}
        quantity={quantity}
        onQuantityChange={setQuantity}
        onAddToCart={handleAddToCart}
        addedNotice={addedNotice}
        facebookPageId={facebookPageId}
        targetRef={heroActionRef}
      />

      <Footer />

      {/* Scoped Styling for Product Detail Page */}
      <style jsx>{`
        /* Scope Manrope font strictly to Product Detail page root */
        :global(.product-detail-page-root) {
          font-family: var(--font-primary) !important;
        }

        /* Breadcrumb */
        .pdetail-breadcrumb {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 22px;
          font-size: 13.5px;
          color: #71717a;
          font-family: var(--font-primary);
        }

        .pdetail-bc-link {
          color: #a1a1aa;
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .pdetail-bc-link:hover {
          color: #22c55e;
        }

        .pdetail-bc-sep {
          color: #3f3f46;
          font-size: 12px;
        }

        .pdetail-bc-category {
          color: #a1a1aa;
        }

        .pdetail-bc-current {
          color: #e4e4e7;
          font-weight: 500;
        }

        /* Layout Grid */
        .product-detail-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.08fr) minmax(0, 1fr);
          gap: 36px;
          align-items: start;
          width: 100%;
          margin-bottom: 36px;
          height: auto;
          min-height: 0;
        }

        .pdetail-gallery-col {
          width: 100%;
          min-width: 0;
          height: auto;
          display: flex;
          flex-direction: column;
        }

        .pdetail-info-col {
          width: 100%;
          min-width: 0;
          height: auto;
          display: flex;
          flex-direction: column;
        }

        /* Brand & SKU Header */
        .pdetail-meta-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 6px;
        }

        .pdetail-brand-badge {
          font-size: 12px;
          font-weight: 700;
          color: #22c55e;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .pdetail-sku-badge {
          font-size: 12px;
          color: #71717a;
          font-weight: 500;
        }

        /* Product Title (H1) */
        .pdetail-title {
          font-family: var(--font-primary) !important;
          font-size: clamp(22px, 2.5vw, 28px);
          font-weight: 700;
          line-height: 1.25;
          color: #ffffff;
          margin: 0 0 10px 0;
          letter-spacing: -0.015em;
        }

        /* Rating Row */
        .pdetail-rating-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }

        .pdetail-stars {
          color: #f59e0b;
          font-size: 14px;
          letter-spacing: 2px;
        }

        .pdetail-rating-score {
          font-size: 13px;
          font-weight: 700;
          color: #ffffff;
        }

        .pdetail-rating-count {
          font-size: 12.5px;
          color: #71717a;
        }

        /* Short Description */
        .pdetail-short-desc {
          font-size: 14px;
          font-weight: 400;
          color: #a1a1aa;
          line-height: 1.6;
          margin: 0 0 18px 0;
        }

        /* Pricing Box */
        .pdetail-pricing-box {
          margin-bottom: 18px;
        }

        .pdetail-price-main-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .pdetail-sale-price {
          font-size: clamp(26px, 3vw, 32px);
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.02em;
          font-variant-numeric: tabular-nums;
        }

        .pdetail-discount-tag {
          font-size: 11px;
          font-weight: 700;
          color: #ffffff;
          background: #ef4444;
          padding: 2px 7px;
          border-radius: 9999px;
          display: inline-block;
        }

        .pdetail-old-price {
          font-size: 14px;
          font-weight: 400;
          color: #71717a;
          text-decoration: line-through;
          margin-top: 2px;
          display: block;
        }

        .pdetail-stock-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
        }

        .stock-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .stock-pulse-dot.in-stock {
          background: #22c55e;
          box-shadow: 0 0 8px #22c55e;
        }

        .stock-pulse-dot.out-of-stock {
          background: #ef4444;
          box-shadow: 0 0 8px #ef4444;
        }

        .stock-status-label {
          font-size: 13px;
          font-weight: 600;
          color: #22c55e;
        }

        /* Quick Specs Grid */
        .pdetail-quick-specs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          padding: 14px 16px;
          background: #0d0e13;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          margin-bottom: 20px;
        }

        .quick-spec-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .quick-spec-icon {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: rgba(34, 197, 94, 0.08);
          border: 1px solid rgba(34, 197, 94, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .quick-spec-lbl {
          font-size: 11px;
          font-weight: 400;
          color: #71717a;
          display: block;
          margin-bottom: 1px;
        }

        .quick-spec-val {
          font-size: 12px;
          font-weight: 600;
          color: #ffffff;
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Purchase Actions */
        .pdetail-purchase-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }

        .pdetail-cta-row-1 {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .pdetail-stepper {
          display: flex;
          align-items: center;
          background: #090a0e;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 8px;
          height: 46px;
          overflow: hidden;
        }

        .stepper-action-btn {
          width: 36px;
          height: 100%;
          background: transparent;
          border: none;
          color: #ffffff;
          font-size: 17px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s ease;
        }

        .stepper-action-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .stepper-count {
          width: 34px;
          text-align: center;
          font-size: 14px;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
          color: #ffffff;
        }

        .pdetail-btn-add-cart {
          flex: 1;
          height: 46px;
          background: #22c55e;
          color: #000000;
          border: none;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 800;
          letter-spacing: 0.03em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 14px rgba(34, 197, 94, 0.35);
        }

        .pdetail-btn-add-cart:hover {
          background: #16a34a;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(34, 197, 94, 0.5);
        }

        .pdetail-btn-cart-icon {
          width: 46px;
          height: 46px;
          border-radius: 8px;
          background: #090a0e;
          border: 1px solid rgba(255, 255, 255, 0.14);
          color: #22c55e;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          transition: all 0.2s ease;
        }

        .pdetail-btn-cart-icon:hover {
          background: rgba(34, 197, 94, 0.1);
          border-color: #22c55e;
        }

        .cart-badge-dot {
          position: absolute;
          top: 5px;
          right: 5px;
          background: #22c55e;
          color: #000;
          font-size: 9px;
          font-weight: 800;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pdetail-btn-buy-now {
          width: 100%;
          height: 46px;
          background: #22c55e;
          color: #000000;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.03em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 16px rgba(34, 197, 94, 0.35);
        }

        .pdetail-btn-buy-now:hover {
          background: #16a34a;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(34, 197, 94, 0.5);
        }

        .pdetail-btn-disabled {
          width: 100%;
          height: 46px;
          background: #1e2026;
          color: #71717a;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: not-allowed;
        }

        .pdetail-added-toast {
          padding: 8px 14px;
          background: rgba(34, 197, 94, 0.12);
          border: 1px solid #22c55e;
          border-radius: 8px;
          color: #4ade80;
          font-size: 12.5px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .pdetail-toast-link {
          color: #ffffff;
          font-weight: 700;
          text-decoration: underline;
        }

        /* Rental Card Box */
        .pdetail-rental-card {
          background: #080a0f;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 12px;
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.45);
        }

        .pdetail-rental-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .rental-price-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .rental-box-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .rental-header-label {
          font-size: 13px;
          font-weight: 700;
          color: #22c55e;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          display: block;
          line-height: 1.2;
        }

        .rental-price-number {
          font-size: 16px;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
          color: #ffffff;
          line-height: 1.2;
          margin-top: 2px;
          white-space: nowrap;
        }

        .rental-unit {
          font-size: 12px;
          color: #9ca3af;
          font-weight: 500;
        }

        .rental-buttons-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: nowrap;
          flex-shrink: 0;
        }

        .rental-btn-chat {
          display: inline-flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 8px;
          background: rgba(34, 197, 94, 0.04);
          border: 1px solid #22c55e;
          color: #22c55e;
          font-size: 11px;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: 0.02em;
          white-space: nowrap;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .rental-btn-chat:hover {
          background: #22c55e;
          color: #000000;
        }

        .rental-btn-rates {
          display: inline-flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.22);
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: 0.02em;
          white-space: nowrap;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .rental-btn-rates:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.4);
          color: #ffffff;
        }

        .pdetail-showrooms-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .showroom-contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .showroom-contact-item:hover {
          border-color: rgba(34, 197, 94, 0.45);
          background: rgba(34, 197, 94, 0.03);
        }

        .showroom-icon-circle {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .showroom-text-block {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .showroom-city {
          font-size: 11px;
          color: #9ca3af;
          display: block;
        }

        .showroom-number {
          font-size: 13.5px;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
          color: #ffffff;
          display: block;
          letter-spacing: 0.02em;
        }

        /* Tabs Section (Placed cleanly in left column under image gallery) */
        .pdetail-tabs-section {
          width: 100%;
          margin-top: 20px;
          margin-bottom: 0;
        }

        .pdetail-tabs-header {
          display: flex;
          gap: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 14px;
        }

        .pdetail-tab-btn {
          padding: 8px 2px;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          color: #71717a;
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 0.03em;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .pdetail-tab-btn:hover {
          color: #e4e4e7;
        }

        .pdetail-tab-btn.is-active {
          color: #22c55e;
          border-bottom-color: #22c55e;
        }

        /* Compact Specifications Panel */
        .pdetail-tab-panel {
          background: #0c0d12;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 16px 20px;
          width: 100%;
        }

        .pdetail-specs-title {
          font-size: 13px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 10px 0;
          letter-spacing: 0.04em;
        }

        .pdetail-specs-table-wrap {
          width: 100%;
          overflow-x: auto;
        }

        .pdetail-specs-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12.5px;
        }

        .pdetail-specs-table tr {
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }

        .pdetail-specs-table tr:last-child {
          border-bottom: none;
        }

        .spec-name-col {
          padding: 7px 10px 7px 0;
          color: #9ca3af;
          width: 36%;
          font-weight: 500;
        }

        .spec-value-col {
          padding: 7px 0;
          color: #f4f4f5;
          font-weight: 500;
        }

        /* Reviews in Tab */
        .pdetail-reviews-summary {
          display: flex;
          gap: 24px;
        }

        .review-score-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 18px;
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 8px;
          min-width: 160px;
        }

        .score-big {
          font-size: 38px;
          font-weight: 900;
          color: #22c55e;
          line-height: 1;
        }

        .stars-row {
          color: #f59e0b;
          font-size: 15px;
          margin: 6px 0;
        }

        .score-note {
          font-size: 11px;
          color: #71717a;
          text-align: center;
        }

        .review-highlights-list {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .review-item {
          padding: 12px 16px;
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
        }

        .reviewer-info {
          display: flex;
          justify-content: space-between;
          font-size: 12.5px;
          color: #ffffff;
          margin-bottom: 3px;
        }

        .review-date {
          font-size: 11px;
          color: #71717a;
        }

        .review-stars {
          color: #f59e0b;
          font-size: 11.5px;
          margin-bottom: 4px;
        }

        .review-text {
          font-size: 12.5px;
          color: #d4d4d8;
          margin: 0;
          line-height: 1.5;
        }

        /* Banner */
        .pdetail-cross-rental-banner {
          margin-bottom: 40px;
          padding: 24px 28px;
          background: rgba(34, 197, 94, 0.04);
          border: 1px solid rgba(34, 197, 94, 0.2);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .pdetail-banner-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 16px;
        }

        .pdetail-banner-kicker {
          font-size: 11px;
          color: #22c55e;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 4px;
        }

        .pdetail-banner-title {
          font-size: 18px;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
        }

        .pdetail-banner-desc {
          font-size: 13px;
          color: #a1a1aa;
          margin: 6px 0 0 0;
          max-width: 680px;
          line-height: 1.55;
        }

        .pdetail-banner-btns {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          align-items: center;
        }

        .banner-primary-btn {
          background: #22c55e;
          color: #000;
          font-weight: 800;
          font-size: 12.5px;
          padding: 9px 16px;
          border-radius: 6px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .banner-primary-btn:hover {
          background: #16a34a;
        }

        .banner-secondary-btn {
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          font-weight: 700;
          font-size: 12.5px;
          padding: 9px 16px;
          border-radius: 6px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .banner-secondary-btn:hover {
          background: rgba(255, 255, 255, 0.14);
        }

        .pdetail-banner-perks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
          gap: 12px;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          font-size: 12px;
          color: #d4d4d8;
        }

        /* FAQ Section */
        .pdetail-faq-section {
          margin-bottom: 40px;
        }

        .pdetail-faq-title {
          font-size: 20px;
          font-weight: 800;
          color: #fff;
          margin: 0;
        }

        .pdetail-faq-card {
          background: #0d0e13;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          overflow: hidden;
          transition: all 0.2s ease;
        }

        .pdetail-faq-card.is-open {
          border-color: rgba(34, 197, 94, 0.4);
        }

        .pdetail-faq-question-btn {
          width: 100%;
          text-align: left;
          padding: 14px 18px;
          background: none;
          border: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          gap: 14px;
        }

        .faq-q-text {
          font-size: 14px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.4;
        }

        .faq-q-text.text-accent {
          color: #4ade80;
        }

        .faq-toggle-arrow {
          font-size: 15px;
          color: #71717a;
          transition: transform 0.2s ease;
        }

        .pdetail-faq-answer {
          padding: 0 18px 16px 18px;
          font-size: 13px;
          color: #d4d4d8;
          line-height: 1.65;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
          padding-top: 12px;
        }

        /* Related Products Heading */
        .pdetail-related-heading {
          font-size: 17px;
          font-weight: 800;
          color: #fff;
          margin-bottom: 18px;
          border-bottom: 2px solid #22c55e;
          padding-bottom: 6px;
          display: inline-block;
        }

        /* Responsive Breakpoints */
        @media (max-width: 992px) {
          .product-detail-hero-grid {
            grid-template-columns: 1fr;
            gap: 24px;
            margin-bottom: 24px;
          }

          .pdetail-reviews-summary {
            flex-direction: column;
          }

          .pdetail-quick-specs-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .pdetail-quick-specs-grid {
            grid-template-columns: 1fr;
          }

          .pdetail-showrooms-grid {
            grid-template-columns: 1fr;
          }

          .pdetail-title {
            font-size: 20px;
          }

          .pdetail-sale-price {
            font-size: 25px;
          }

          .pdetail-tab-panel {
            padding: 14px 16px;
          }
        }
      `}</style>
    </div>
  );
}
