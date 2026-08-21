"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import { MOCK_PRODUCTS } from "../../lib/mock-data";
import { useCart } from "../../lib/cart-context";
import { useAuth } from "../../lib/auth-context";
import { Product } from "../../lib/types";

function formatCurrency(amount?: number) {
  if (amount === undefined || amount === null) return "Liên hệ";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null>(
    MOCK_PRODUCTS.find((p) => p.slug === slug) || null
  );
  const [allProducts, setAllProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "desc" | "rental">("specs");
  const [addedNotice, setAddedNotice] = useState(false);

  // Fetch live product from Backend PostgreSQL
  useEffect(() => {
    const fetchLiveProduct = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
        const [singleRes, allRes] = await Promise.all([
          fetch(`${apiUrl}/products/by-slug/${slug}`),
          fetch(`${apiUrl}/products`),
        ]);

        if (singleRes.ok) {
          const liveProduct = await singleRes.json();
          setProduct(liveProduct);
        }

        if (allRes.ok) {
          const allList = await allRes.json();
          if (Array.isArray(allList)) {
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
  }, [slug]);

  if (!product) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#090909" }}>
        <Header />
        <div className="container" style={{ flex: 1, paddingTop: "140px", textAlign: "center" }}>
          <h2 style={{ color: "#fff" }}>Sản phẩm không tồn tại</h2>
          <p style={{ color: "#a1a1aa", marginTop: "12px" }}>Thiết bị bạn tìm kiếm không có hoặc đã ngừng kinh doanh.</p>
          <Link href="/products" className="button button-primary" style={{ marginTop: "24px" }}>
            Quay lại danh mục sản phẩm
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProducts = allProducts
    .filter((p) => p.category_id === product.category_id && p.id !== product.id)
    .slice(0, 3);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.images?.[0]?.image_url || "https://vanbass.vn/placeholder.png",
    "description": product.description,
    "sku": product.sku || product.slug,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "VanBass",
    },
    "offers": {
      "@type": "Offer",
      "url": `https://vanbass.vn/products/${product.slug}`,
      "priceCurrency": "VND",
      "price": product.sale_price || 0,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.stock_quantity > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "VanBass Music Center",
      },
    },
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Header />

      <main style={{ flex: 1, paddingTop: "120px", paddingBottom: "100px" }}>
        <div className="container">
          {/* Breadcrumb */}
          <nav style={{ marginBottom: "32px", fontSize: "13px", color: "#71717a" }} aria-label="Breadcrumb">
            <Link href="/" style={{ color: "#a1a1aa", textDecoration: "none" }}>Trang chủ</Link>
            <span style={{ margin: "0 8px" }}>/</span>
            <Link href="/products" style={{ color: "#a1a1aa", textDecoration: "none" }}>Thiết bị</Link>
            <span style={{ margin: "0 8px" }}>/</span>
            <span style={{ color: "#f5f5f0" }}>{product.name}</span>
          </nav>

          {/* Product Detail Layout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "60px",
              alignItems: "start",
              marginBottom: "80px",
            }}
          >
            {/* Left: Product Mock/Image */}
            <div>
              <div
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  aspectRatio: "4/3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  padding: "40px",
                }}
              >
                {(() => {
                  const resolveImageUrl = (url?: string) => {
                    if (!url) return null;
                    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) return url;
                    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
                    const backendBase = apiUrl.replace(/\/api\/?$/, "");
                    return `${backendBase}${url.startsWith("/") ? "" : "/"}${url}`;
                  };
                  const rawImg = product.images?.[0]?.image_url || product.image_url;
                  const displayImg = resolveImageUrl(rawImg);

                  return displayImg ? (
                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={displayImg}
                        alt={product.name}
                        style={{ maxWidth: "100%", maxHeight: "280px", objectFit: "contain", filter: "drop-shadow(0 10px 25px rgba(0,0,0,0.5))" }}
                        onError={(e) => {
                          (e.currentTarget.parentElement as HTMLElement).style.display = "none";
                          const fb = e.currentTarget.parentElement?.nextElementSibling as HTMLElement;
                          if (fb) fb.style.display = "block";
                        }}
                      />
                    </div>
                  ) : (
                    <div className="product-placeholder" style={{ width: "100%", height: "100%", maxWidth: "340px", maxHeight: "240px", display: "block" }}>
                      <div className="product-placeholder-top">
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className="product-placeholder-body">
                        <div className="product-wheel" style={{ width: "64px", height: "64px" }} />
                        <div className="product-faders">
                          <i />
                          <i />
                        </div>
                        <div className="product-wheel" style={{ width: "64px", height: "64px" }} />
                      </div>
                    </div>
                  );
                })()}

                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    display: "flex",
                    gap: "8px",
                  }}
                >
                  {product.sale_enabled && product.stock_quantity > 0 && <span className="badge badge-sale">MUA BÁN</span>}
                  {product.sale_enabled && product.stock_quantity <= 0 && (
                    <span className="badge" style={{ backgroundColor: "rgba(239,68,68,0.2)", color: "#f87171", border: "1px solid rgba(239,68,68,0.4)" }}>
                      HẾT HÀNG
                    </span>
                  )}
                  {product.rental_enabled && <span className="badge badge-rental">CHO THUÊ</span>}
                </div>
              </div>
            </div>

            {/* Right: Product Info & Actions */}
            <div>
              <div style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#22c55e", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  {product.brand || "VanBass"}
                </span>
                <span style={{ fontSize: "12px", color: "#52525b" }}>•</span>
                <span style={{ fontSize: "12px", color: "#71717a" }}>SKU: {product.sku || "VB-DEVICE"}</span>
              </div>

              <h1 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 800, margin: "0 0 16px 0", color: "#fff", lineHeight: 1.25 }}>
                {product.name}
              </h1>

              {/* Pricing Box */}
              <div
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  padding: "24px",
                  marginBottom: "32px",
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                  {/* Sale Price */}
                  <div>
                    <span style={{ fontSize: "11px", color: "#a1a1aa", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                      Giá bán chính hãng
                    </span>
                    {product.sale_enabled && product.sale_price ? (
                      <div>
                        <span style={{ fontSize: "24px", fontWeight: 900, color: "#fff" }}>
                          {formatCurrency(product.sale_price)}
                        </span>
                        <span style={{ fontSize: "12px", color: "#71717a", display: "block", marginTop: "2px" }}>
                          (Đã bao gồm VAT & Bảo hành 12 tháng)
                        </span>
                      </div>
                    ) : (
                      <span style={{ fontSize: "16px", color: "#71717a" }}>Chỉ áp dụng cho thuê</span>
                    )}
                  </div>

                  {/* Rental Price */}
                  <div style={{ borderLeft: "1px solid rgba(255,255,255,0.08)", paddingLeft: "24px" }}>
                    <span style={{ fontSize: "11px", color: "#a1a1aa", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                      Giá thuê biểu diễn
                    </span>
                    {product.rental_enabled && product.rental_price ? (
                      <div>
                        <span style={{ fontSize: "24px", fontWeight: 900, color: "#22c55e" }}>
                          {formatCurrency(product.rental_price)}
                        </span>
                        <span style={{ fontSize: "12px", color: "#71717a", display: "block", marginTop: "2px" }}>
                          / 24 giờ sử dụng
                        </span>
                      </div>
                    ) : (
                      <span style={{ fontSize: "16px", color: "#71717a" }}>Không cho thuê</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Quantity & Buy Button */}
              {product.sale_enabled && (
                <div style={{ marginBottom: "24px" }}>
                  {product.stock_quantity > 0 ? (
                    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                      <div style={{ display: "flex", border: "1px solid var(--border)", backgroundColor: "#000" }}>
                        <button
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          style={{ padding: "12px 18px", background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: "16px" }}
                        >
                          -
                        </button>
                        <span style={{ padding: "12px 16px", color: "#fff", fontWeight: 700, minWidth: "20px", textAlign: "center" }}>
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity((q) => Math.min(product.stock_quantity || 10, q + 1))}
                          style={{ padding: "12px 18px", background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: "16px" }}
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={handleAddToCart}
                        className="button button-primary button-lg"
                        style={{ flex: 1 }}
                      >
                        Thêm vào giỏ hàng ({formatCurrency((product.sale_price || 0) * quantity)})
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                      <button
                        disabled
                        className="button button-secondary button-lg"
                        style={{ flex: 1, opacity: 0.6, cursor: "not-allowed", backgroundColor: "#1f2937", color: "#9ca3af" }}
                      >
                        Tạm hết hàng
                      </button>
                    </div>
                  )}

                  {addedNotice && (
                    <div style={{ marginTop: "12px", padding: "10px 16px", backgroundColor: "rgba(34,197,94,0.15)", border: "1px solid #22c55e", color: "#4ade80", fontSize: "13px" }}>
                      ✓ Đã thêm thiết bị vào giỏ hàng! <Link href="/cart" style={{ color: "#fff", fontWeight: 700, marginLeft: "8px", textDecoration: "underline" }}>Xem giỏ hàng →</Link>
                    </div>
                  )}
                </div>
              )}

              {/* Direct Rental Link */}
              {product.rental_enabled && (
                <div style={{ padding: "20px", backgroundColor: "#111111", border: "1px solid rgba(34,197,94,0.2)", marginBottom: "32px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                    <div>
                      <strong style={{ color: "#fff", fontSize: "15px", display: "block" }}>Cần thuê thiết bị này cho sự kiện / Show diễn?</strong>
                      <span style={{ fontSize: "13px", color: "#a1a1aa" }}>Giao máy tận nơi tại Đà Nẵng, hỗ trợ setup âm thanh chuyên nghiệp.</span>
                    </div>
                    <Link href={`/rental?product=${product.slug}`} className="button button-secondary">
                      Tính giá thuê ngay →
                    </Link>
                  </div>
                </div>
              )}
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
                  borderBottom: activeTab === "specs" ? "2px solid #fff" : "2px solid transparent",
                  color: activeTab === "specs" ? "#fff" : "#71717a",
                  fontWeight: 700,
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                Thông số kỹ thuật
              </button>
              <button
                onClick={() => setActiveTab("desc")}
                style={{
                  padding: "14px 24px",
                  background: "none",
                  border: "none",
                  borderBottom: activeTab === "desc" ? "2px solid #fff" : "2px solid transparent",
                  color: activeTab === "desc" ? "#fff" : "#71717a",
                  fontWeight: 700,
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                Mô tả chi tiết
              </button>
              <button
                onClick={() => setActiveTab("rental")}
                style={{
                  padding: "14px 24px",
                  background: "none",
                  border: "none",
                  borderBottom: activeTab === "rental" ? "2px solid #fff" : "2px solid transparent",
                  color: activeTab === "rental" ? "#fff" : "#71717a",
                  fontWeight: 700,
                  fontSize: "15px",
                  cursor: "pointer",
                }}
              >
                Chính sách cho thuê & Đặt cọc
              </button>
            </div>

            {activeTab === "specs" && (
              <div style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", padding: "32px" }}>
                {product.specifications && Object.keys(product.specifications).length > 0 ? (
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
                    <tbody>
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <tr key={key} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                          <td style={{ padding: "14px 0", color: "#a1a1aa", width: "30%", fontWeight: 600 }}>{key}</td>
                          <td style={{ padding: "14px 0", color: "#fff" }}>{String(value)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p style={{ color: "#a1a1aa" }}>Đang cập nhật thông số kỹ thuật chi tiết từ hãng sản xuất.</p>
                )}
              </div>
            )}

            {activeTab === "desc" && (
              <div style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", padding: "32px", color: "#d4d4d8", lineHeight: 1.8 }}>
                <p>{product.description || "Thiết bị âm thanh và DJ chuyên nghiệp chính hãng tại VanBass Music Center Đà Nẵng."}</p>
              </div>
            )}

            {activeTab === "rental" && (
              <div style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", padding: "32px", color: "#d4d4d8", lineHeight: 1.8 }}>
                <h4 style={{ color: "#fff", margin: "0 0 12px 0" }}>Quy trình thuê máy tại VanBass:</h4>
                <ol style={{ paddingLeft: "20px", margin: "0 0 20px 0" }}>
                  <li>Chọn thiết bị và ngày cần sử dụng máy trên website.</li>
                  <li>Nhân viên kỹ thuật liên hệ xác nhận thời gian nhận và địa chỉ sự kiện.</li>
                  <li>Ký hợp đồng thuê bàn giao thiết bị + Đặt cọc theo quy định.</li>
                  <li>Hỗ trợ hướng dẫn sử dụng và bàn giao đầy đủ phụ kiện, dây cáp âm thanh.</li>
                </ol>
              </div>
            )}
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div style={{ marginTop: "40px" }}>
              <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "20px", borderBottom: "2px solid #22c55e", paddingBottom: "10px" }}>
                Thiết Bị Cùng Danh Mục
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

      <Footer />
    </div>
  );
}
