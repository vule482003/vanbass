import Link from "next/link";
import { MOCK_CATEGORIES } from "../lib/mock-data";

export default function CategoryGrid() {
  // Nạp danh mục động từ dữ liệu tập trung (sẵn sàng kết nối API Database)
  const categories = MOCK_CATEGORIES;

  return (
    <section className="categories-section" id="categories">
      <div className="container">
        <div className="section-heading" style={{ marginBottom: "40px" }}>
          <div>
            <p className="section-kicker" style={{ fontSize: "12px", color: "#a1a1aa", letterSpacing: "0.15em", marginBottom: "8px" }}>
              DANH MỤC SẢN PHẨM
            </p>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.03em" }}>
              Khám phá theo danh mục
            </h2>
          </div>

          <Link href="/products" className="text-link" style={{ fontSize: "14px", fontWeight: 600 }}>
            Xem toàn bộ <span>→</span>
          </Link>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="category-card"
              style={{ textDecoration: "none" }}
            >
              <span className="category-number" style={{ fontSize: "13px", fontWeight: 700, color: "#71717a" }}>
                {category.number}
              </span>

              <div className="category-icon">
                <div />
              </div>

              <div className="category-content">
                <h3 style={{ fontSize: "22px", fontWeight: 700, margin: "0 0 10px 0", color: "#ffffff" }}>
                  {category.name}
                </h3>
                <p style={{ fontSize: "14px", lineHeight: 1.65, color: "#a1a1aa", maxWidth: "100%" }}>
                  {category.description}
                </p>
              </div>

              <span className="category-arrow" style={{ fontSize: "22px", color: "#a1a1aa" }}>↗</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}