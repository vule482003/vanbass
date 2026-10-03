import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import ProductsClient from "../products/ProductsClient";
import { fetchProducts, fetchCategories } from "../lib/api";

export const metadata: Metadata = {
  title: "Mua Bàn DJ Chính Hãng Tại Đà Nẵng | Pioneer DJ & AlphaTheta - VanMusic",
  description:
    "Đại lý phân phối bàn DJ Pioneer DJ, AlphaTheta chính hãng tại Đà Nẵng & Miền Trung: Pioneer XDJ-RX3, DDJ-FLX4, Omnis-Duo, XDJ-AZ, DDJ-FLX2, XDJ-RX2. Máy mới 100% fullbox & like new 99%, bảo hành 12-24T, trả góp 0%, test máy tại showroom.",
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
      {/* Breadcrumbs Navigation */}
      <nav
        aria-label="Breadcrumb"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "13px",
          color: "#71717a",
          marginBottom: "32px",
        }}
      >
        <Link href="/" style={{ color: "#a1a1aa", textDecoration: "none" }}>
          Trang chủ
        </Link>
        <span>/</span>
        <span style={{ color: "#22c55e", fontWeight: 600 }}>Bàn DJ Chính Hãng</span>
      </nav>

      {/* Header Lockup */}
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
          TỔNG KHO PHÂN PHỐI BÀN DJ PIONEER DJ & ALPHATHETA
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
          Trung Tâm Mua Bán Bàn DJ Uy Tín Số 1 Tại Đà Nẵng & Miền Trung
        </h2>
        <p style={{ color: "#a1a1aa", fontSize: "14.5px", maxWidth: "800px", margin: "12px auto 0 auto", lineHeight: 1.6 }}>
          VanMusic (VanBass Music Center) là đại lý chuyên phân phối thiết bị DJ chính hãng Pioneer DJ và AlphaTheta. Đầy đủ các dòng máy DJ Controller 2 kênh dành cho người mới và hệ thống All-In-One độc lập cao cấp cho Bar, Club, Lounge tại Đà Nẵng & Thừa Thiên Huế. Bảo hành 12 - 24 tháng chính hãng, trả góp 0%, hỗ trợ test máy trực tiếp tại Showroom.
        </p>
      </div>

      {/* 4 Value Pillars Grid */}
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
          <div style={{ fontSize: "28px", marginBottom: "12px" }}>🛡️</div>
          <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#ffffff", marginBottom: "8px" }}>100% Chính Hãng - Bảo Hành 12-24T</h3>
          <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
            Cam kết máy mới 100% fullbox hoặc hàng like new 98-99% tuyển chọn kỹ thuật khắt khe. Đầy đủ hóa đơn, tem niêm phong và bảo hành chính hãng.
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
          <div style={{ fontSize: "28px", marginBottom: "12px" }}>💳</div>
          <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#ffffff", marginBottom: "8px" }}>Trả Góp 0% Lãi Suất Linh Hoạt</h3>
          <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
            Hỗ trợ mua bàn DJ trả góp 0% qua thẻ tín dụng liên kết hơn 25 ngân hàng trên toàn quốc. Thủ tục duyệt nhanh trong 10 phút, nhận máy ngay.
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
          <div style={{ fontSize: "28px", marginBottom: "12px" }}>🎧</div>
          <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#ffffff", marginBottom: "8px" }}>Tặng Kho Nhạc & Khóa Học DJ 1-Kèm-1</h3>
          <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
            Tặng kèm USB nạp sẵn kho nhạc Lossless phân tích chuẩn Rekordbox cùng khóa hướng dẫn kết nối, cài đặt phần mềm và làm quen thao tác DJ cơ bản.
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
          <div style={{ fontSize: "28px", marginBottom: "12px" }}>📍</div>
          <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#ffffff", marginBottom: "8px" }}>Showroom Trải Nghiệm Máy Thật</h3>
          <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
            Kính mời quý khách ghé Showroom Đà Nẵng (Nguyễn Tất Thành, Q. Thanh Khê) để cắm USB test trực tiếp cảm giác mâm xoay, fader trên dàn âm thanh thực tế.
          </p>
        </div>
      </div>

      {/* Structured Buying Guide with Internal Links */}
      <div
        style={{
          backgroundColor: "rgba(14, 14, 18, 0.7)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "12px",
          padding: "32px",
          marginBottom: "40px",
        }}
      >
        <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#ffffff", marginBottom: "18px" }}>
          Cẩm Nang Chọn Mua Bàn DJ Pioneer DJ & AlphaTheta Phù Hợp
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", fontSize: "14px", color: "#d4d4d8", lineHeight: 1.7 }}>
          <div>
            <h4 style={{ fontSize: "16px", color: "#22c55e", margin: "0 0 6px 0", fontWeight: 700 }}>
              1. Phân khúc DJ Controller cho người mới học & biểu diễn gia đình
            </h4>
            <p style={{ margin: 0 }}>
              Nếu bạn là người mới bắt đầu học DJ hoặc cần một thiết bị nhỏ gọn để luyện tập tại nhà, dòng máy DJ Controller 2 kênh kết nối máy tính/smartphone là lựa chọn tối ưu. Nổi bật nhất là mẫu{" "}
              <Link href="/products/ddj-flx4" style={{ color: "#38bdf8", fontWeight: 600, textDecoration: "underline" }}>
                Pioneer DDJ-FLX4
              </Link>{" "}
              (bàn DJ quốc dân tích hợp Smart Fader) và mẫu{" "}
              <Link href="/products/ddj-flx2" style={{ color: "#38bdf8", fontWeight: 600, textDecoration: "underline" }}>
                AlphaTheta DDJ-FLX2
              </Link>{" "}
              (siêu gọn nhẹ kết nối Bluetooth với iPad, iPhone).
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: "16px", color: "#22c55e", margin: "0 0 6px 0", fontWeight: 700 }}>
              2. Phân khúc All-In-One độc lập cắm USB không cần máy tính
            </h4>
            <p style={{ margin: 0 }}>
              Dành cho các DJ chuyên nghiệp, Bar, Pub, Lounge và sự kiện di động cần sự ổn định tuyệt đối:
            </p>
            <ul style={{ margin: "8px 0 0 20px", padding: 0 }}>
              <li style={{ marginBottom: "6px" }}>
                <Link href="/products/xdj-rx3" style={{ color: "#38bdf8", fontWeight: 600, textDecoration: "underline" }}>
                  Pioneer DJ XDJ-RX3
                </Link>
                : Hệ thống 2 kênh All-In-One cao cấp với màn hình cảm ứng 10.1 inch và giao diện thừa hưởng từ flagship CDJ-3000.
              </li>
              <li style={{ marginBottom: "6px" }}>
                <Link href="/products/omnis-duo" style={{ color: "#38bdf8", fontWeight: 600, textDecoration: "underline" }}>
                  AlphaTheta OMNIS-DUO
                </Link>
                : Thiết bị DJ All-In-One không dây tích hợp pin dung lượng lớn, lý tưởng cho tiệc bãi biển, du thuyền và dã ngoại ngoài trời.
              </li>
              <li style={{ marginBottom: "6px" }}>
                <Link href="/products/xdj-az" style={{ color: "#38bdf8", fontWeight: 600, textDecoration: "underline" }}>
                  AlphaTheta XDJ-AZ
                </Link>
                : Quái vật 4 kênh All-In-One thế hệ mới nhất, chuẩn âm thanh Club đỉnh cao.
              </li>
              <li>
                Các model lựa chọn tiết kiệm khác:{" "}
                <Link href="/products/xdj-rx2" style={{ color: "#38bdf8", textDecoration: "underline" }}>
                  Pioneer XDJ-RX2
                </Link>
                ,{" "}
                <Link href="/products/xdj-rr" style={{ color: "#38bdf8", textDecoration: "underline" }}>
                  Pioneer XDJ-RR
                </Link>
                , và{" "}
                <Link href="/products/xdj-xz" style={{ color: "#38bdf8", textDecoration: "underline" }}>
                  Pioneer XDJ-XZ
                </Link>
                .
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sub-CTA Cross-Linking Section (Dịch vụ Phụ Trợ: Thuê & Sửa Chữa) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(34, 197, 94, 0.06)",
            border: "1px solid rgba(34, 197, 94, 0.25)",
            borderRadius: "12px",
            padding: "24px",
          }}
        >
          <span style={{ fontSize: "11px", fontWeight: 700, color: "#22c55e", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            DỊCH VỤ CHO THUÊ SỰ KIỆN
          </span>
          <h4 style={{ fontSize: "17px", fontWeight: 700, color: "#ffffff", margin: "6px 0 10px 0" }}>
            Cần Thuê Bàn DJ Ngắn Ngày Tại Đà Nẵng?
          </h4>
          <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, margin: "0 0 16px 0" }}>
            Nếu bạn chỉ có nhu cầu sử dụng máy cho show diễn, đám cưới, pool party hoặc sự kiện ngắn ngày, hãy xem bảng giá cho thuê máy mới 99%, hỗ trợ setup tận nơi 24/7.
          </p>
          <Link
            href="/thue-ban-dj"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "#22c55e",
              fontWeight: 700,
              fontSize: "13.5px",
              textDecoration: "none",
            }}
          >
            <span>Bảng Giá Thuê Bàn DJ Đà Nẵng</span>
            <span>&rarr;</span>
          </Link>
        </div>

        <div
          style={{
            backgroundColor: "rgba(56, 189, 248, 0.06)",
            border: "1px solid rgba(56, 189, 248, 0.25)",
            borderRadius: "12px",
            padding: "24px",
          }}
        >
          <span style={{ fontSize: "11px", fontWeight: 700, color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            BẢO HÀNH & KỸ THUẬT
          </span>
          <h4 style={{ fontSize: "17px", fontWeight: 700, color: "#ffffff", margin: "6px 0 10px 0" }}>
            Sửa Chữa Bàn DJ & Thu Cũ Đổi Mới
          </h4>
          <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, margin: "0 0 16px 0" }}>
            VanMusic sở hữu trung tâm kỹ thuật sửa chữa bàn DJ chuyên nghiệp tại Đà Nẵng: thay fader Alps chính hãng, cân chỉnh jogwheel, bảo dưỡng định kỳ và hỗ trợ thu cũ đổi mới trợ giá cao.
          </p>
          <Link
            href="/sua-chua-ban-dj"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "#38bdf8",
              fontWeight: 700,
              fontSize: "13.5px",
              textDecoration: "none",
            }}
          >
            <span>Dịch Vụ Sửa Chữa Bàn DJ Đà Nẵng</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>

      {/* Visual FAQ Accordion matching Schema */}
      <div
        style={{
          backgroundColor: "rgba(18, 18, 22, 0.85)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "12px",
          padding: "32px",
        }}
      >
        <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#ffffff", marginBottom: "20px" }}>
          Câu Hỏi Thường Gặp Khi Mua Bàn DJ Tại VanMusic
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <details style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", padding: "16px 20px", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
            <summary style={{ fontSize: "15px", fontWeight: 600, color: "#f4f4f5", cursor: "pointer" }}>
              Mua bàn DJ ở đâu uy tín, chính hãng tại Đà Nẵng và Miền Trung?
            </summary>
            <p style={{ fontSize: "13.5px", color: "#a1a1aa", lineHeight: 1.6, margin: "12px 0 0 0" }}>
              VanMusic (VanBass Music Center) là trung tâm phân phối thiết bị DJ chính hãng Pioneer DJ và AlphaTheta uy tín tại Đà Nẵng (Showroom: Nguyễn Tất Thành, Phường Thanh Khê Tây, Quận Thanh Khê) và TP Huế (442 Chi Lăng). 100% thiết bị có tem bảo hành chính hãng từ 12 - 24 tháng, hỗ trợ kỹ thuật trọn đời và linh kiện thay thế chuẩn.
            </p>
          </details>

          <details style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", padding: "16px 20px", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
            <summary style={{ fontSize: "15px", fontWeight: 600, color: "#f4f4f5", cursor: "pointer" }}>
              Người mới bắt đầu tập chơi DJ nên chọn mua dòng máy nào phù hợp?
            </summary>
            <p style={{ fontSize: "13.5px", color: "#a1a1aa", lineHeight: 1.6, margin: "12px 0 0 0" }}>
              Với người mới bắt đầu hoặc tập luyện tại nhà, phân khúc DJ Controller 2 kênh như Pioneer DDJ-FLX4 hoặc AlphaTheta DDJ-FLX2 là lựa chọn tối ưu nhất. Máy kết nối trực tiếp với Laptop, Smartphone hoặc iPad qua phần mềm Rekordbox / Serato DJ, có tính năng Smart Fader và Smart CFX hỗ trợ chuyển bài mượt mà.
            </p>
          </details>

          <details style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", padding: "16px 20px", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
            <summary style={{ fontSize: "15px", fontWeight: 600, color: "#f4f4f5", cursor: "pointer" }}>
              Bàn DJ All-In-One độc lập có điểm gì khác biệt so với DJ Controller?
            </summary>
            <p style={{ fontSize: "13.5px", color: "#a1a1aa", lineHeight: 1.6, margin: "12px 0 0 0" }}>
              Bàn DJ All-In-One (như Pioneer XDJ-RX3, AlphaTheta Omnis-Duo, XDJ-AZ, XDJ-XZ) tích hợp sẵn màn hình cảm ứng hiển thị sóng nhạc và bộ vi xử lý độc lập. Người chơi chỉ cần cắm USB đã phân tích nhạc qua Rekordbox là biểu diễn trực tiếp mà không cần dùng đến máy tính laptop.
            </p>
          </details>

          <details style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", padding: "16px 20px", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
            <summary style={{ fontSize: "15px", fontWeight: 600, color: "#f4f4f5", cursor: "pointer" }}>
              VanMusic có chính sách trả góp 0% và hỗ trợ kỹ thuật khi mua máy không?
            </summary>
            <p style={{ fontSize: "13.5px", color: "#a1a1aa", lineHeight: 1.6, margin: "12px 0 0 0" }}>
              Có. VanMusic hỗ trợ trả góp 0% lãi suất qua thẻ tín dụng liên kết hơn 25 ngân hàng trên toàn quốc. Khi mua bàn DJ, quý khách được hỗ trợ cài đặt phần mềm, tặng kèm kho nhạc tuyển chọn và khóa hướng dẫn vận hành kỹ thuật cơ bản 1-kèm-1.
            </p>
          </details>

          <details style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", padding: "16px 20px", borderRadius: "8px", border: "1px solid rgba(255, 255, 255, 0.06)" }}>
            <summary style={{ fontSize: "15px", fontWeight: 600, color: "#f4f4f5", cursor: "pointer" }}>
              Tôi có thể ghé showroom tại Đà Nẵng để trải nghiệm và test máy trước khi mua không?
            </summary>
            <p style={{ fontSize: "13.5px", color: "#a1a1aa", lineHeight: 1.6, margin: "12px 0 0 0" }}>
              Hoàn toàn được. Quý khách có thể ghé trực tiếp Showroom VanMusic tại Nguyễn Tất Thành, Thanh Khê, Đà Nẵng để cắm USB trải nghiệm cảm giác mâm jogwheel, fader và âm thanh thực tế trước khi quyết định mua hàng.
            </p>
          </details>
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
          Đang tải danh mục Bàn DJ VanMusic...
        </div>
      }
    >
      <ProductsClient
        initialProducts={productsToUse}
        initialCategories={categories}
        initialSearchParams={resolvedParams}
        baseCatalogPath="/ban-dj"
        pageTitle="Mua Bàn DJ Chính Hãng Pioneer DJ & AlphaTheta Tại Đà Nẵng"
        pageSubtitle="Tổng đại lý phân phối bàn DJ Controller cho người mới và hệ thống All-In-One cao cấp cho DJ, Bar, Club tại Đà Nẵng & Miền Trung. Bảo hành chính hãng 12-24 tháng, hỗ trợ trả góp 0%."
        seoIntroContent={banDjSeoIntro}
      />
    </Suspense>
  );
}
