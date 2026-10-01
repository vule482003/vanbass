import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsClient from "../products/ProductsClient";
import { fetchProducts, fetchCategories } from "../lib/api";

export const metadata: Metadata = {
  title: "Bàn DJ Chính Hãng Pioneer DJ & AlphaTheta | Mua Bán & Cho Thuê | VanBass",
  description:
    "Tổng đại lý phân phối và cho thuê bàn DJ Pioneer DJ, AlphaTheta chính hãng tại Đà Nẵng, Huế & toàn quốc. Đầy đủ các dòng DJ Controller FLX4, FLX2, All-in-one XDJ-RX3, XDJ-AZ, OPUS-QUAD trả góp 0%.",
  alternates: {
    canonical: "/ban-dj",
  },
};

interface PageProps {
  searchParams?: Promise<{
    page?: string;
    category?: string;
    group?: string;
    mode?: string;
    type?: string;
    filter?: string;
    search?: string;
    brand?: string;
    sort?: string;
  }>;
}

export default async function BanDjPage({ searchParams }: PageProps) {
  const resolvedParams = searchParams ? await searchParams : {};

  // Fetch real data on server from FastAPI/PostgreSQL with mock fallback
  const [allProducts, categories] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  // Pre-filter for DJ equipment (DJ Controllers, All-in-One, Pioneer DJ, AlphaTheta)
  const djProducts = allProducts.filter((p) => {
    const slug = (p.category_slug || "").toLowerCase();
    const name = (p.name || "").toLowerCase();
    const catName = (p.category_name || "").toLowerCase();
    const brand = (p.brand || "").toLowerCase();

    return (
      slug.includes("dj") ||
      slug.includes("xdj") ||
      slug.includes("ddj") ||
      slug.includes("controller") ||
      catName.includes("dj") ||
      brand.includes("pioneer") ||
      brand.includes("alphatheta") ||
      name.includes("dj") ||
      name.includes("xdj") ||
      name.includes("ddj") ||
      name.includes("controller")
    );
  });

  const productsToUse = djProducts.length > 0 ? djProducts : allProducts;

  const banDjSeoIntro = (
    <section
      style={{
        marginTop: "80px",
        paddingTop: "60px",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <span
          style={{
            color: "#22c55e",
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            display: "inline-block",
            marginBottom: "8px",
          }}
        >
          TỔNG KHO BÀN DJ CHÍNH HÃNG PIONEER DJ & ALPHATHETA
        </span>
        <h2
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "clamp(22px, 3.2vw, 32px)",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          Mua Bán & Cho Thuê Bàn DJ Uy Tín Số 1 Tại Đà Nẵng, Huế & Miền Trung
        </h2>
        <p style={{ color: "#a1a1aa", fontSize: "14.5px", maxWidth: "780px", margin: "12px auto 0 auto", lineHeight: 1.6 }}>
          VanBass Music Center cung cấp đầy đủ các mẫu bàn DJ Controller 2 kênh, 4 kênh, hệ thống All-in-One độc lập từ các thương hiệu hàng đầu thế giới: Pioneer DJ, AlphaTheta, Denon DJ. Hỗ trợ kỹ thuật trọn đời, trả góp 0%, dùng thử trực tiếp tại showroom Đà Nẵng & Huế.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
          marginBottom: "45px",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(18, 18, 22, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "12px",
            padding: "24px",
          }}
        >
          <div style={{ fontSize: "28px", marginBottom: "12px" }}>🎧</div>
          <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#ffffff", marginBottom: "8px" }}>Bàn DJ Controller Cho Người Mới</h3>
          <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
            Pioneer DDJ-FLX4, AlphaTheta DDJ-FLX2 kết nối trực tiếp với Smartphone, Laptop, iPad qua Rekordbox, Serato DJ. Tính năng Smart Fader giúp chuyển bài mượt mà chỉ sau 1 buổi làm quen.
          </p>
        </div>

        <div
          style={{
            backgroundColor: "rgba(18, 18, 22, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "12px",
            padding: "24px",
          }}
        >
          <div style={{ fontSize: "28px", marginBottom: "12px" }}>🎛️</div>
          <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#ffffff", marginBottom: "8px" }}>Hệ Thống DJ All-In-One Độc Lập</h3>
          <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
            Pioneer DJ XDJ-RX3, AlphaTheta XDJ-AZ 4 kênh, AlphaTheta OMNIS-DUO tích hợp pin. Cắm USB chơi nhạc trực tiếp với màn hình cảm ứng sắc nét lên tới 10.1 inch, không cần máy tính.
          </p>
        </div>

        <div
          style={{
            backgroundColor: "rgba(18, 18, 22, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "12px",
            padding: "24px",
          }}
        >
          <div style={{ fontSize: "28px", marginBottom: "12px" }}>🛡️</div>
          <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#ffffff", marginBottom: "8px" }}>Bảo Hành 12-24 Tháng & Thu Cũ Đổi Mới</h3>
          <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
            Toàn bộ thiết bị cam kết chính hãng 100%, bảo hành từ 12 đến 24 tháng. Hỗ trợ nâng cấp thu cũ đổi mới trợ giá cao, hỗ trợ linh kiện fader, jog wheel chính hãng trọn đời.
          </p>
        </div>

        <div
          style={{
            backgroundColor: "rgba(18, 18, 22, 0.85)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "12px",
            padding: "24px",
          }}
        >
          <div style={{ fontSize: "28px", marginBottom: "12px" }}>🚚</div>
          <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#ffffff", marginBottom: "8px" }}>Giao Nhanh 2H & Cài Đặt Tận Nơi</h3>
          <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
            Giao hàng hỏa tốc trong 2 giờ tại Đà Nẵng, Huế, Hội An. Kỹ thuật viên hỗ trợ cài đặt driver, phần mềm bản quyền và tặng kèm kho nhạc 100GB chất lượng cao.
          </p>
        </div>
      </div>
    </section>
  );

  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#060709",
            color: "#fff",
          }}
        >
          Đang tải danh mục Bàn DJ VanBass...
        </div>
      }
    >
      <ProductsClient
        initialProducts={productsToUse}
        initialCategories={categories}
        initialSearchParams={resolvedParams}
        baseCatalogPath="/ban-dj"
        pageTitle="Bàn DJ Chính Hãng Pioneer DJ & AlphaTheta | Mua Bán & Cho Thuê"
        pageSubtitle="Kho bàn DJ chuyên nghiệp, máy DJ Controller cho người mới và hệ thống All-in-one cao cấp cho Club/Bar/Sự kiện tại Đà Nẵng & Miền Trung."
        seoIntroContent={banDjSeoIntro}
      />
    </Suspense>
  );
}
