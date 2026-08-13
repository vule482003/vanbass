import Link from "next/link";

const categories = [
  {
    number: "01",
    title: "Thiết bị DJ",
    description:
      "DJ controller, CDJ và hệ thống DJ dành cho nhu cầu cá nhân và biểu diễn.",
    href: "/products?category=dj",
  },
  {
    number: "02",
    title: "Mixer & Bàn trộn",
    description:
      "Mixer DJ và bàn trộn chuyên nghiệp cho các hệ thống âm thanh đa dạng.",
    href: "/products?category=mixer",
  },
  {
    number: "03",
    title: "Loa & Âm thanh",
    description:
      "Thiết bị loa và âm thanh phù hợp cho studio, sự kiện và giải trí.",
    href: "/products?category=audio",
  },
  {
    number: "04",
    title: "Phụ kiện",
    description:
      "Các phụ kiện hỗ trợ DJ và hệ thống âm thanh trong quá trình sử dụng.",
    href: "/products?category=accessories",
  },
];

export default function CategoryGrid() {
  return (
    <section className="categories-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="section-kicker">DANH MỤC</p>
            <h2>Khám phá thiết bị</h2>
          </div>

          <Link href="/products" className="text-link">
            Xem tất cả <span>→</span>
          </Link>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <Link
              key={category.number}
              href={category.href}
              className="category-card"
            >
              <span className="category-number">{category.number}</span>

              <div className="category-icon">
                <div />
              </div>

              <div className="category-content">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </div>

              <span className="category-arrow">↗</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}