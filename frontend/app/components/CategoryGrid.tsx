"use client";

import Link from "next/link";
import { MOCK_CATEGORIES } from "../lib/mock-data";
import { CategoriesHighlightConfig, DEFAULT_HOME_DATA } from "../types/home_config";
import { useLanguage } from "../lib/language-context";

interface CategoryGridProps {
  config?: CategoriesHighlightConfig;
}

const CATEGORY_TRANSLATIONS: Record<string, { name: string; desc: string }> = {
  "dj": {
    name: "DJ Equipment",
    desc: "All-in-One DJ Systems, DJ Controllers, CDJ Players & Turntables from AlphaTheta and Pioneer DJ.",
  },
  "mixer": {
    name: "DJ Mixers",
    desc: "2-channel, 4-channel, and 6-channel club-standard DJ Mixers and DSP signal processors.",
  },
  "audio": {
    name: "Speakers & Pro Audio",
    desc: "SonicLink performance speakers, JBL PA column arrays, studio monitors, and B&C Drivers made in Italy.",
  },
  "stage-effects": {
    name: "Stage Effects & Fog",
    desc: "Stage fog machines, low-lying smoke, RGBA LED vertical smoke machines, and European standard fluids.",
  },
  "accessories": {
    name: "Headphones & Cables",
    desc: "Professional DJ headphones, wireless microphones, and high-grade audio cables made in Germany.",
  },
};

export default function CategoryGrid({
  config = DEFAULT_HOME_DATA.categories_highlight,
}: CategoryGridProps) {
  const { t, lang } = useLanguage();
  const categories = MOCK_CATEGORIES;

  return (
    <section className="categories-section reveal-on-scroll" id="categories">
      <div className="container">
        <div className="section-heading" style={{ marginBottom: "24px" }}>
          <div>
            <p className="section-kicker" style={{ fontSize: "11px", color: "#a1a1aa", letterSpacing: "0.15em", marginBottom: "6px" }} data-cms-key="categories_highlight.kicker" data-cms-label="Tag Kicker Danh Mục" data-cms-type="text">
              {lang === "en" ? t.categories.title.toUpperCase() : (config.kicker || t.categories.title.toUpperCase())}
            </p>
            <h2 style={{ fontSize: "clamp(26px, 3.2vw, 42px)", fontWeight: 800, letterSpacing: "-0.03em" }} data-cms-key="categories_highlight.title" data-cms-label="Tiêu Đề Danh Mục" data-cms-type="text">
              {lang === "en" ? t.categories.subtitle : (config.title || t.categories.subtitle)}
            </h2>
          </div>

          <Link href={config.button_link || "/products"} className="text-link" style={{ fontSize: "12px", fontWeight: 700 }} data-cms-key="categories_highlight.button_text" data-cms-label="Chữ Nút Danh Mục" data-cms-type="text">
            {lang === "en" ? t.categories.viewAll : (config.button_text || t.categories.viewAll)} <span>→</span>
          </Link>
        </div>

        <div className="category-grid">
          {categories.map((category) => {
            const tr = lang === "en" ? CATEGORY_TRANSLATIONS[category.slug] : null;
            const displayName = tr?.name || category.name;
            const displayDesc = tr?.desc || category.description;

            return (
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
                    {displayName}
                  </h3>
                  <p style={{ fontSize: "12.5px", lineHeight: 1.55, color: "#a1a1aa", maxWidth: "100%" }}>
                    {displayDesc}
                  </p>
                </div>

                <span className="category-arrow" style={{ fontSize: "18px", color: "#a1a1aa" }}>↗</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}