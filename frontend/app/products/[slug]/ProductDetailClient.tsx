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
import { fetchStoreSettings, getMessengerRentalUrl } from "../../lib/api";
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
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
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
          // If targetSlug 404 and different from slug, try original slug
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
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#090909" }}>
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

  const relatedProducts = allProducts
    .filter((p) => p.category_id === product.category_id && p.id !== product.id)
    .slice(0, 3);

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

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#090909" }}>
      <Header />

      <main style={{ flex: 1, paddingTop: "120px", paddingBottom: "100px" }}>
        <div className="container">
          {/* Breadcrumb */}
          <nav style={{ marginBottom: "32px", fontSize: "13px", color: "#71717a" }} aria-label="Breadcrumb">
            <Link href="/" style={{ color: "#a1a1aa", textDecoration: "none" }}>{t.productDetail.breadcrumbHome}</Link>
            <span style={{ margin: "0 8px" }}>/</span>
            <Link href="/products" style={{ color: "#a1a1aa", textDecoration: "none" }}>{t.productDetail.breadcrumbProducts}</Link>
            <span style={{ margin: "0 8px" }}>/</span>
            <span style={{ color: "#f5f5f0" }}>{displayName}</span>
          </nav>

          {/* Product Detail Layout */}
          <div className="product-detail-hero-grid">
            {/* Left: Interactive Multi-Image Gallery with Hover Zoom & Fullscreen Lightbox */}
            <div>
              <ProductImageGallery product={product} displayName={displayName} />
            </div>

            {/* Right: Product Info & Actions */}
            <div ref={heroActionRef}>
              <div style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#22c55e", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  {product.brand || "VanBass"}
                </span>
                <span style={{ fontSize: "12px", color: "#52525b" }}>•</span>
                <span style={{ fontSize: "12px", color: "#71717a" }}>SKU: {product.sku || "VB-DEVICE"}</span>
              </div>

              <h1 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 800, margin: "0 0 14px 0", color: "#fff", lineHeight: 1.25 }}>
                {displayName}
              </h1>

              {shortExcerpt && (
                <p style={{ fontSize: "14px", color: "#a1a1aa", lineHeight: 1.6, margin: "0 0 24px 0" }}>
                  {shortExcerpt}
                </p>
              )}

              {/* Pricing Box */}
              <div
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  padding: "24px",
                  marginBottom: "32px",
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                  {/* Sale Price */}
                  <div>
                    <span style={{ fontSize: "11px", color: "#a1a1aa", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                      {t.productDetail.officialSalePrice}
                    </span>
                    {product.sale_enabled && product.sale_price ? (
                      <div>
                        <span style={{ fontSize: "24px", fontWeight: 900, color: "#fff" }}>
                          {formatCurrency(product.sale_price, lang)}
                        </span>
                        <span style={{ fontSize: "12px", color: "#71717a", display: "block", marginTop: "2px" }}>
                          {t.productDetail.vatWarrantyNote}
                        </span>
                      </div>
                    ) : (
                      <span style={{ fontSize: "16px", color: "#71717a" }}>{t.productDetail.rentalOnly}</span>
                    )}
                  </div>

                  {/* Rental Price */}
                  <div style={{ borderLeft: "1px solid rgba(255,255,255,0.08)", paddingLeft: "24px" }}>
                    <span style={{ fontSize: "11px", color: "#a1a1aa", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                      {t.productDetail.performanceRentalPrice}
                    </span>
                    {product.rental_enabled && product.rental_price ? (
                      <div>
                        <span style={{ fontSize: "24px", fontWeight: 900, color: "#22c55e" }}>
                          {formatCurrency(product.rental_price, lang)}
                        </span>
                        <span style={{ fontSize: "12px", color: "#71717a", display: "block", marginTop: "2px" }}>
                          {t.productDetail.per24Hours}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span style={{ fontSize: "18px", fontWeight: 700, color: "#22c55e" }}>Hỗ trợ cho thuê</span>
                        <span style={{ fontSize: "12px", color: "#71717a", display: "block", marginTop: "2px" }}>Liên hệ để nhận báo giá tốt nhất</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Main Actions: Buy (if sale_enabled) and/or Rent (if rental_enabled) */}
              <div style={{ marginBottom: "32px", display: "flex", flexDirection: "column", gap: "16px" }}>
                {/* 1. Buy Action */}
                {product.sale_enabled ? (
                  product.stock_quantity > 0 ? (
                    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                      <div style={{ display: "flex", border: "1px solid var(--border)", backgroundColor: "#000", borderRadius: "8px", overflow: "hidden" }}>
                        <button
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          style={{ padding: "12px 18px", background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: "16px" }}
                          aria-label="Giảm số lượng"
                        >
                          -
                        </button>
                        <span style={{ padding: "12px 16px", color: "#fff", fontWeight: 700, minWidth: "24px", textAlign: "center" }}>
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity((q) => Math.min(product.stock_quantity || 10, q + 1))}
                          style={{ padding: "12px 18px", background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: "16px" }}
                          aria-label="Tăng số lượng"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={handleAddToCart}
                        className="button button-primary button-lg"
                        style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="9" cy="21" r="1" />
                          <circle cx="20" cy="21" r="1" />
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        <span>{t.productDetail.addToCartWithPrice} ({formatCurrency((product.sale_price || 0) * quantity, lang)})</span>
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                      <button
                        disabled
                        className="button button-secondary button-lg"
                        style={{ flex: 1, opacity: 0.6, cursor: "not-allowed", backgroundColor: "#1f2937", color: "#9ca3af" }}
                      >
                        {t.productDetail.outOfStock}
                      </button>
                    </div>
                  )
                ) : null}

                {/* 2. Direct Rental Action (Full-size primary button matching Add to Cart) */}
                {product.rental_enabled && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
                      <a
                        href={getMessengerRentalUrl(displayName, facebookPageId)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button button-primary button-lg"
                        style={{
                          flex: 1,
                          minWidth: "220px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          backgroundColor: "#22c55e",
                          color: "#000000",
                          fontWeight: 800,
                          boxShadow: "0 4px 16px rgba(34, 197, 94, 0.4)",
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        <span>{lang === "en" ? "Rent Gear Now (Messenger / Hotline)" : "Liên hệ thuê máy ngay"}</span>
                      </a>

                      <Link
                        href="/thue-ban-dj"
                        className="button button-secondary button-lg"
                        style={{
                          padding: "14px 20px",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "14px",
                          fontWeight: 700,
                        }}
                      >
                        <span>{lang === "en" ? "Rental Rates" : "Bảng giá thuê bàn DJ"}</span>
                      </Link>
                    </div>

                    <div style={{ padding: "10px 14px", backgroundColor: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: "8px", fontSize: "12px", color: "#a1a1aa", display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ color: "#22c55e", fontWeight: 800 }}>⚡</span>
                      <span>{t.productDetail.rentalBannerDesc || "Giao nhận, setup và hướng dẫn sử dụng tận nơi 24/7 tại Đà Nẵng & Toàn quốc."}</span>
                    </div>
                  </div>
                )}

                {/* Added to cart feedback toast */}
                {addedNotice && (
                  <div style={{ padding: "10px 16px", backgroundColor: "rgba(34,197,94,0.15)", border: "1px solid #22c55e", borderRadius: "8px", color: "#4ade80", fontSize: "13px" }}>
                    {t.productDetail.addedToCartNotice} <Link href="/cart" style={{ color: "#fff", fontWeight: 700, marginLeft: "8px", textDecoration: "underline" }}>{t.productDetail.viewCart}</Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Specifications & Description Tabs */}
          <div style={{ marginBottom: "80px" }}>
            <div style={{ display: "flex", gap: "12px", borderBottom: "1px solid var(--border)", marginBottom: "32px" }}>
              <button
                onClick={() => setActiveTab("specs")}
                style={{
                  padding: "14px 24px",
                  background: "none",
                  border: "none",
                  borderBottom: activeTab === "specs" ? "2px solid #22c55e" : "2px solid transparent",
                  color: activeTab === "specs" ? "#22c55e" : "#71717a",
                  fontWeight: 700,
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                {t.productDetail.tabSpecs}
              </button>
              <button
                onClick={() => setActiveTab("desc")}
                style={{
                  padding: "14px 24px",
                  background: "none",
                  border: "none",
                  borderBottom: activeTab === "desc" ? "2px solid #22c55e" : "2px solid transparent",
                  color: activeTab === "desc" ? "#22c55e" : "#71717a",
                  fontWeight: 700,
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                {t.productDetail.tabDesc}
              </button>
              <button
                onClick={() => setActiveTab("rental")}
                style={{
                  padding: "14px 24px",
                  background: "none",
                  border: "none",
                  borderBottom: activeTab === "rental" ? "2px solid #22c55e" : "2px solid transparent",
                  color: activeTab === "rental" ? "#22c55e" : "#71717a",
                  fontWeight: 700,
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                {t.productDetail.tabRentalPolicy}
              </button>
            </div>

            {activeTab === "specs" && (
              <div style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "32px" }}>
                {product.specifications && Object.keys(product.specifications).length > 0 ? (
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
                    <tbody>
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <tr key={key} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                          <td style={{ padding: "14px 0", color: "#a1a1aa", width: "30%", fontWeight: 600 }}>{getTranslatedSpecKey(key, lang)}</td>
                          <td style={{ padding: "14px 0", color: "#fff" }}>{String(value)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p style={{ color: "#a1a1aa" }}>{t.productDetail.noSpecs}</p>
                )}
              </div>
            )}

            {activeTab === "desc" && (
              <div style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "32px", color: "#d4d4d8", lineHeight: 1.8 }}>
                {displayDesc ? (
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
                  <p style={{ color: "#71717a", fontStyle: "italic", margin: 0 }}>
                    {lang === "en" ? "No detailed description available." : "Chưa có mô tả chi tiết cho sản phẩm này."}
                  </p>
                )}
              </div>
            )}

            {activeTab === "rental" && (
              <div style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "32px", color: "#d4d4d8", lineHeight: 1.8 }}>
                <h4 style={{ color: "#fff", margin: "0 0 12px 0" }}>{t.productDetail.rentalProcessTitle}</h4>
                <ol style={{ paddingLeft: "20px", margin: "0 0 20px 0" }}>
                  <li>{t.productDetail.rentalStep1}</li>
                  <li>{t.productDetail.rentalStep2}</li>
                  <li>{t.productDetail.rentalStep3}</li>
                  <li>{t.productDetail.rentalStep4}</li>
                </ol>
                <div style={{ marginTop: "24px" }}>
                  <Link href="/thue-ban-dj" className="button button-secondary">
                    Xem chi tiết dịch vụ thuê bàn DJ &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Local Rental & Fast Delivery Cross-linking Banner */}
          <div
            style={{
              marginBottom: "60px",
              padding: "28px 32px",
              backgroundColor: "rgba(34, 197, 94, 0.05)",
              border: "1px solid rgba(34, 197, 94, 0.25)",
              borderRadius: "14px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <span style={{ fontSize: "12px", color: "#22c55e", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>
                  ⚡ Dịch vụ cho thuê biểu diễn tại Đà Nẵng & Miền Trung
                </span>
                <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#ffffff", margin: 0 }}>
                  Thuê Bàn DJ {displayName} Giao Lắp Tận Nơi 24/7
                </h3>
                <p style={{ fontSize: "14px", color: "#a1a1aa", margin: "8px 0 0 0", maxWidth: "700px", lineHeight: 1.6 }}>
                  VanBass Music Center cung cấp dịch vụ cho thuê {displayName} máy mới 99%, setup trọn gói trong 2 giờ tại Đà Nẵng, Hội An, Thừa Thiên Huế. Đầy đủ dây giắc, hướng dẫn sử dụng và hỗ trợ kỹ thuật trực tiếp.
                </p>
              </div>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                <a
                  href={getMessengerRentalUrl(displayName, facebookPageId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-primary"
                  style={{
                    backgroundColor: "#22c55e",
                    color: "#000",
                    fontWeight: 800,
                    padding: "12px 20px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span>Thuê máy này ngay</span>
                </a>
                <Link
                  href="/thue-ban-dj"
                  className="button button-secondary"
                  style={{ padding: "12px 20px", fontWeight: 700 }}
                >
                  <span>Xem bảng giá thuê bàn DJ &rarr;</span>
                </Link>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", paddingTop: "16px", borderTop: "1px solid rgba(255, 255, 255, 0.08)", fontSize: "13px", color: "#d4d4d8" }}>
              <div>🚚 <strong>Giao nhanh trong 2h:</strong> Đà Nẵng, Huế, Hội An</div>
              <div>⚡ <strong>Thiết bị chuẩn:</strong> Mới 99%, fader & pad mượt mà</div>
              <div>🌍 <strong>English Support:</strong> Cho DJ du lịch & sự kiện quốc tế</div>
              <div>📑 <strong>Thủ tục linh hoạt:</strong> Đặt cọc nhanh, hỗ trợ 24/7</div>
            </div>
          </div>

          {/* FAQ Accordion Section */}
          {faqs && faqs.length > 0 && (
            <div style={{ marginBottom: "60px" }}>
              <div style={{ marginBottom: "24px" }}>
                <span style={{ fontSize: "12px", color: "#22c55e", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "6px" }}>
                  FAQ • Hỏi & Đáp
                </span>
                <h3 style={{ fontSize: "24px", fontWeight: 800, color: "#fff", margin: 0 }}>
                  Câu Hỏi Thường Gặp Về {displayName}
                </h3>
                <p style={{ fontSize: "14px", color: "#a1a1aa", margin: "6px 0 0 0" }}>
                  Giải đáp chi tiết về thông số kỹ thuật, cách sử dụng, giá bán & dịch vụ thuê {displayName} tại VanBass.
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: "var(--surface)",
                        border: isOpen ? "1px solid rgba(34, 197, 94, 0.4)" : "1px solid var(--border)",
                        borderRadius: "10px",
                        overflow: "hidden",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        style={{
                          width: "100%",
                          textAlign: "left",
                          padding: "18px 24px",
                          background: "none",
                          border: "none",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          cursor: "pointer",
                          gap: "16px",
                        }}
                      >
                        <span style={{ fontSize: "15px", fontWeight: 700, color: isOpen ? "#4ade80" : "#ffffff", lineHeight: 1.4 }}>
                          {faq.question}
                        </span>
                        <span style={{ fontSize: "18px", color: isOpen ? "#4ade80" : "#71717a", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>
                          ▾
                        </span>
                      </button>

                      {isOpen && (
                        <div
                          style={{
                            padding: "0 24px 20px 24px",
                            fontSize: "14px",
                            color: "#d4d4d8",
                            lineHeight: 1.7,
                            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                            paddingTop: "16px",
                          }}
                        >
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
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "20px", borderBottom: "2px solid #22c55e", paddingBottom: "10px" }}>
                {t.productDetail.relatedTitle}
              </h3>
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
    </div>
  );
}

