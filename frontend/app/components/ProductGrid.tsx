import Link from "next/link";

const featuredProducts = [
  {
    category: "DJ SYSTEM",
    name: "AlphaTheta XDJ-AN",
    description:
      "Hệ thống DJ all-in-one dành cho người chơi DJ và nhu cầu biểu diễn chuyên nghiệp.",
  },
  {
    category: "DJ PLAYER",
    name: "AlphaTheta CDJ-1500X",
    description:
      "DJ Player thế hệ mới cho hệ thống DJ chuyên nghiệp và các không gian biểu diễn.",
  },
  {
    category: "DJ MIXER",
    name: "AlphaTheta DJM-V5",
    description:
      "Mixer DJ chuyên nghiệp dành cho những hệ thống cần khả năng phối trộn linh hoạt.",
  },
  {
    category: "DJ CONTROLLER",
    name: "Pioneer DJ DDJ-FLX4",
    description:
      "DJ Controller nhỏ gọn, phù hợp cho người mới bắt đầu và nhu cầu luyện tập tại nhà.",
  },
];

function createProductSlug(name: string) {
  return name.toLowerCase().replaceAll(" ", "-");
}

export default function ProductGrid() {
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
            const productSlug = createProductSlug(product.name);

            return (
              <article className="product-card" key={product.name}>
                <Link
                  href={`/products/${productSlug}`}
                  className="product-image"
                  aria-label={`Xem ${product.name}`}
                >
                  <span className="product-index">
                    0{index + 1}
                  </span>

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
                  <p>{product.category}</p>

                  <h3>{product.name}</h3>

                  <span>{product.description}</span>

                  <Link
                    href={`/products/${productSlug}`}
                    className="product-link"
                  >
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