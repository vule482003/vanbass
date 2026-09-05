import Link from "next/link";
import { MOCK_CATEGORIES } from "../lib/mock-data";
import { CategoriesHighlightConfig, DEFAULT_HOME_DATA } from "../types/home_config";

interface CategoryGridProps {
  config?: CategoriesHighlightConfig;
}

export default function CategoryGrid({
  config = DEFAULT_HOME_DATA.categories_highlight,
}: CategoryGridProps) {
  const categories = MOCK_CATEGORIES;

  return (
    <section className="categories-section reveal-on-scroll" id="categories">
      <div className="container">
        <div className="section-heading" style={{ marginBottom: "24px" }}>
          <div>
            <p className="section-kicker" style={{ fontSize: "11px", color: "#a1a1aa", letterSpacing: "0.15em", marginBottom: "6px" }} data-cms-key="categories_highlight.kicker" data-cms-label="Tag Kicker Danh Mục" data-cms-type="text">
              {config.kicker || "DANH MỤC SẢN PHẨM"}
            </p>
            <h2 style={{ fontSize: "clamp(26px, 3.2vw, 42px)", fontWeight: 800, letterSpacing: "-0.03em" }} data-cms-key="categories_highlight.title" data-cms-label="Tiêu Đề Danh Mục" data-cms-type="text">
              {config.title || "Khám phá theo danh mục"}
            </h2>
          </div>

          <Link href={config.button_link || "/products"} className="text-link" style={{ fontSize: "12px", fontWeight: 700 }} data-cms-key="categories_highlight.button_text" data-cms-label="Chữ Nút Danh Mục" data-cms-type="text">
            {config.button_text || "Xem toàn bộ"} <span>→</span>
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
              <span className="category-number" style={{ fontSize: "11px", fontWeight: 700, color: "#71717a" }}>
                {category.number}
              </span>

              <div className="category-icon">
                <div />
              </div>

              <div className="category-content">
                <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 6px 0", color: "#ffffff" }}>
                  {category.name}
                </h3>
                <p style={{ fontSize: "12.5px", lineHeight: 1.55, color: "#a1a1aa", maxWidth: "100%" }}>
                  {category.description}
                </p>
              </div>

              <span className="category-arrow" style={{ fontSize: "18px", color: "#a1a1aa" }}>↗</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}