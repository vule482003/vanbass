import Link from "next/link";
import { MOCK_PRODUCTS } from "../lib/mock-data";

function formatCurrency(amount?: number) {
  if (amount === undefined || amount === null) return "Liên hệ";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export default function ProductGrid() {
  const featuredProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <section className="products-section" id="featured-products">
      <div className="container">
        <div className="section-heading" style={{ marginBottom: "40px" }}>
          <div>
            <p className="section-kicker" style={{ fontSize: "12px", color: "#52525b", letterSpacing: "0.15em", marginBottom: "8px" }}>
              SẢN PHẨM NỔI BẬT
            </p>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.03em" }}>
              Thiết bị DJ & Âm thanh hàng đầu
            </h2>
          </div>

          <Link href="/products" className="text-link" style={{ fontSize: "14px", fontWeight: 600 }}>
            Xem tất cả sản phẩm <span>→</span>
          </Link>
        </div>

        <div className="product-grid">
          {featuredProducts.map((product, index) => {
            return (
              <article className="product-card" key={product.id} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <Link
                  href={`/products/${product.slug}`}
                  className="product-image"
                  aria-label={`Xem ${product.name}`}
                >
                  <span className="product-index" style={{ fontSize: "12px", fontWeight: 700 }}>0{index + 1}</span>

                  <div className="product-placeholder">
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
                </Link>

                <div className="product-info" style={{ display: "flex", flexDirection: "column", flex: 1, padding: "20px 4px 0" }}>
                  <p style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", color: "#71717a", letterSpacing: "0.08em", marginBottom: "6px" }}>
                    {product.brand} • {product.category_name}
                  </p>

                  <h3 style={{ fontSize: "18px", fontWeight: 700, lineHeight: 1.35, margin: "0 0 10px 0", color: "#18181b" }}>
                    <Link href={`/products/${product.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                      {product.name}
                    </Link>
                  </h3>

                  <span style={{ fontSize: "13px", lineHeight: 1.6, color: "#52525b", minHeight: "42px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", marginBottom: "14px" }}>
                    {product.description}
                  </span>

                  <div style={{ marginTop: "auto", paddingTop: "12px", borderTop: "1px solid #e4e4e7" }}>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", flexWrap: "wrap", gap: "6px" }}>
                      <strong style={{ fontSize: "18px", fontWeight: 800, color: "#09090b" }}>
                        {formatCurrency(product.sale_price)}
                      </strong>
                      {product.rental_enabled && (
                        <span style={{ fontSize: "12px", fontWeight: 600, color: "#16a34a" }}>
                          Thuê: {formatCurrency(product.rental_price)}/ngày
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/products/${product.slug}`}
                      className="product-link"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        marginTop: "14px",
                        fontSize: "13px",
                        fontWeight: 700,
                        letterSpacing: "0.02em",
                        color: "#09090b",
                        textDecoration: "none",
                      }}
                    >
                      Chi tiết sản phẩm <span>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}