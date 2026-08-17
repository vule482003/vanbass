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
    <section className="products-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="section-kicker">SẢN PHẨM</p>
            <h2>Thiết bị nổi bật</h2>
          </div>

          <Link href="/products" className="text-link">
            Xem tất cả <span>→</span>
          </Link>
        </div>

        <div className="product-grid">
          {featuredProducts.map((product, index) => {
            return (
              <article className="product-card" key={product.id}>
                <Link
                  href={`/products/${product.slug}`}
                  className="product-image"
                  aria-label={`Xem ${product.name}`}
                >
                  <span className="product-index">0{index + 1}</span>

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

                <div className="product-info">
                  <p>{product.category_name || product.brand}</p>
                  <h3>{product.name}</h3>
                  <span>{product.description}</span>

                  <div style={{ margin: "12px 0 8px 0" }}>
                    <strong style={{ fontSize: "15px", color: "#fff" }}>
                      {formatCurrency(product.sale_price)}
                    </strong>
                    {product.rental_enabled && (
                      <span style={{ fontSize: "11px", color: "#22c55e", marginLeft: "10px" }}>
                        (Thuê: {formatCurrency(product.rental_price)}/ngày)
                      </span>
                    )}
                  </div>

                  <Link href={`/products/${product.slug}`} className="product-link">
                    Xem sản phẩm <span>→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}