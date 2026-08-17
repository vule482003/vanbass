"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { MOCK_PRODUCTS } from "../../lib/mock-data";
import { useCart } from "../../lib/cart-context";

function formatCurrency(amount?: number) {
  if (amount === undefined || amount === null) return "Liên hệ";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { addItem } = useCart();

  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "desc" | "rental">("specs");

  if (!product) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header />
        <div className="container" style={{ flex: 1, paddingTop: "140px", textAlign: "center" }}>
          <h2>Sản phẩm không tồn tại</h2>
          <p style={{ color: "#a1a1aa", marginTop: "12px" }}>Thiết bị bạn tìm kiếm không có hoặc đã ngừng kinh doanh.</p>
          <Link href="/products" className="button button-primary" style={{ marginTop: "24px" }}>
            Quay lại danh mục sản phẩm
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.category_id === product.category_id && p.id !== product.id
  ).slice(0, 3);

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

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Header />

      <main style={{ flex: 1, paddingTop: "120px", paddingBottom: "100px" }}>
        <div className="container">
          {/* Breadcrumb */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "12px",
              color: "#888",
              marginBottom: "32px",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            <Link href="/" style={{ color: "#888" }}>
              Trang chủ
            </Link>
            <span>/</span>
            <Link href="/products" style={{ color: "#888" }}>
              Sản phẩm
            </Link>
            <span>/</span>
            <span style={{ color: "#fff" }}>{product.name}</span>
          </nav>

          {/* Product Hero Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "48px",
              alignItems: "start",
              marginBottom: "64px",
            }}
          >
            {/* Visual Column */}
            <div
              style={{
                position: "relative",
                aspectRatio: "1/1",
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "32px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#666",
                  letterSpacing: "0.1em",
                }}
              >
                SKU: {product.sku}
              </div>

              {/* Equipment Aesthetic Blueprint */}
              <div className="product-placeholder" style={{ width: "100%", maxWidth: "340px" }}>
                <div className="product-placeholder-top">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="product-placeholder-body">
                  <div className="product-wheel" />
                  <div className="product-faders">
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="product-wheel" />
                </div>
              </div>
            </div>

            {/* Info & Purchase Column */}
            <div>
              <p className="section-kicker" style={{ marginBottom: "8px" }}>
                {product.brand || "CHUYÊN NGHIỆP"} • {product.category_name}
              </p>
              <h1
                style={{
                  fontSize: "clamp(28px, 4vw, 42px)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  margin: "0 0 16px 0",
                  lineHeight: 1.1,
                }}
              >
                {product.name}
              </h1>

              <p style={{ color: "#a1a1aa", lineHeight: 1.7, fontSize: "15px", marginBottom: "28px" }}>
                {product.description}
              </p>

              {/* Price Block */}
              <div
                style={{
                  padding: "24px",
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  marginBottom: "28px",
                }}
              >
                {product.sale_enabled && (
                  <div style={{ marginBottom: product.rental_enabled ? "16px" : "0" }}>
                    <span style={{ fontSize: "12px", color: "#888", display: "block", marginBottom: "4px" }}>
                      Giá mua mới chính hãng (Đã gồm VAT):
                    </span>
                    <strong style={{ fontSize: "28px", fontWeight: 800, color: "#ffffff" }}>
                      {formatCurrency(product.sale_price)}
                    </strong>
                    <span style={{ fontSize: "12px", color: "#22c55e", marginLeft: "12px" }}>
                      ● Còn {product.stock_quantity} sản phẩm
                    </span>
                  </div>
                )}

                {product.rental_enabled && (
                  <div
                    style={{
                      borderTop: product.sale_enabled ? "1px solid rgba(255,255,255,0.08)" : "none",
                      paddingTop: product.sale_enabled ? "16px" : "0",
                    }}
                  >
                    <span style={{ fontSize: "12px", color: "#22c55e", display: "block", marginBottom: "4px" }}>
                      Dịch vụ cho thuê biểu diễn & sự kiện:
                    </span>
                    <strong style={{ fontSize: "22px", fontWeight: 800, color: "#22c55e" }}>
                      {formatCurrency(product.rental_price)}
                      <small style={{ fontSize: "13px", fontWeight: 600, color: "#a1a1aa" }}> / ngày</small>
                    </strong>
                  </div>
                )}
              </div>

              {/* Quantity and Actions */}
              {product.sale_enabled && (
                <div style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid var(--border)",
                      backgroundColor: "#000",
                    }}
                  >
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      style={{
                        padding: "12px 18px",
                        background: "none",
                        border: "none",
                        color: "#fff",
                        cursor: "pointer",
                        fontSize: "16px",
                      }}
                    >
                      -
                    </button>
                    <span style={{ padding: "0 12px", fontSize: "14px", fontWeight: 700 }}>{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                      style={{
                        padding: "12px 18px",
                        background: "none",
                        border: "none",
                        color: "#fff",
                        cursor: "pointer",
                        fontSize: "16px",
                      }}
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => addItem(product, quantity)}
                    className="button button-primary"
                    style={{ flex: 1, cursor: "pointer" }}
                  >
                    Thêm vào giỏ hàng ({formatCurrency((product.sale_price || 0) * quantity)})
                  </button>
                </div>
              )}

              {product.rental_enabled && (
                <Link
                  href={`/rental?product=${product.slug}`}
                  className="button button-secondary"
                  style={{ width: "100%", justifyContent: "center", boxSizing: "border-box" }}
                >
                  📅 Đặt thuê thiết bị này ngay
                </Link>
              )}
            </div>
          </div>

          {/* Detailed Tabs */}
          <div style={{ marginTop: "40px" }}>
            <div
              style={{
                display: "flex",
                gap: "24px",
                borderBottom: "1px solid var(--border)",
                marginBottom: "32px",
              }}
            >
              <button
                onClick={() => setActiveTab("specs")}
                style={{
                  padding: "12px 0",
                  background: "none",
                  border: "none",
                  borderBottom: activeTab === "specs" ? "2px solid #fff" : "2px solid transparent",
                  color: activeTab === "specs" ? "#fff" : "#888",
                  fontWeight: 700,
                  fontSize: "13px",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Thông số kỹ thuật
              </button>
              <button
                onClick={() => setActiveTab("desc")}
                style={{
                  padding: "12px 0",
                  background: "none",
                  border: "none",
                  borderBottom: activeTab === "desc" ? "2px solid #fff" : "2px solid transparent",
                  color: activeTab === "desc" ? "#fff" : "#888",
                  fontWeight: 700,
                  fontSize: "13px",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Đặc điểm nổi bật
              </button>
              <button
                onClick={() => setActiveTab("rental")}
                style={{
                  padding: "12px 0",
                  background: "none",
                  border: "none",
                  borderBottom: activeTab === "rental" ? "2px solid #fff" : "2px solid transparent",
                  color: activeTab === "rental" ? "#fff" : "#888",
                  fontWeight: 700,
                  fontSize: "13px",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Chính sách bảo hành & Thuê
              </button>
            </div>

            {/* Tab 1: Specs */}
            {activeTab === "specs" && (
              <div
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  padding: "24px",
                }}
              >
                <h3 style={{ fontSize: "16px", marginBottom: "20px" }}>Bảng thông số chi tiết</h3>
                {product.specifications ? (
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                    <tbody>
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <tr key={key} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                          <td style={{ padding: "12px 0", color: "#888", width: "40%" }}>{key}</td>
                          <td style={{ padding: "12px 0", color: "#fff", fontWeight: 500 }}>
                            {Array.isArray(value) ? value.join(", ") : String(value)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p style={{ color: "#888" }}>Đang cập nhật thông số từ nhà sản xuất.</p>
                )}
              </div>
            )}

            {/* Tab 2: Desc */}
            {activeTab === "desc" && (
              <div
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  padding: "32px",
                  lineHeight: 1.8,
                  color: "#d4d4d8",
                }}
              >
                <h3>Giới thiệu {product.name}</h3>
                <p>{product.description}</p>
                <p>
                  Sản phẩm được phân phối và bảo hành chính hãng tại VanBass Music Center Đà Nẵng. Đi kèm đầy đủ phụ kiện cáp nguồn, cáp kết nối và sách hướng dẫn sử dụng.
                </p>
              </div>
            )}

            {/* Tab 3: Rental & Warranty */}
            {activeTab === "rental" && (
              <div
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  padding: "32px",
                  lineHeight: 1.8,
                  color: "#d4d4d8",
                }}
              >
                <h4 style={{ color: "#fff", marginBottom: "8px" }}>🛡️ Chính sách bảo hành (Khi mua hàng):</h4>
                <ul style={{ paddingLeft: "20px", marginBottom: "24px" }}>
                  <li>Bảo hành chính hãng 12 tháng tại VanBass Music Center.</li>
                  <li>1 đổi 1 trong vòng 7 ngày đầu nếu có lỗi phần cứng từ nhà sản xuất.</li>
                  <li>Hỗ trợ kỹ thuật cấu hình phần mềm và setup âm thanh trọn đời.</li>
                </ul>

                <h4 style={{ color: "#22c55e", marginBottom: "8px" }}>📅 Thủ tục & Quy định cho thuê:</h4>
                <ul style={{ paddingLeft: "20px" }}>
                  <li>Giao nhận và kiểm tra thiết bị trực tiếp tại Showroom Đà Nẵng hoặc giao tận nơi theo yêu cầu.</li>
                  <li>Khách hàng cung cấp CCCD/Hộ chiếu gốc và đặt cọc theo giá trị thiết bị.</li>
                  <li>Hỗ trợ kỹ thuật viên trực âm thanh nếu khách hàng có nhu cầu cho sự kiện.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div style={{ marginTop: "80px" }}>
              <div className="section-heading">
                <div>
                  <p className="section-kicker">GỢI Ý</p>
                  <h2>Sản phẩm cùng danh mục</h2>
                </div>
                <Link href="/products" className="text-link">
                  Xem tất cả <span>→</span>
                </Link>
              </div>

              <div className="product-grid">
                {relatedProducts.map((rel, index) => (
                  <article className="product-card" key={rel.id}>
                    <Link href={`/products/${rel.slug}`} className="product-image">
                      <span className="product-index">0{index + 1}</span>
                      <div className="product-placeholder">
                        <div className="product-placeholder-body">
                          <div className="product-wheel" />
                          <div className="product-faders">
                            <i />
                            <i />
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="product-info">
                      <p>{rel.category_name}</p>
                      <h3>{rel.name}</h3>
                      <Link href={`/products/${rel.slug}`} className="product-link">
                        Xem chi tiết <span>→</span>
                      </Link>
                    </div>
                  </article>
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
