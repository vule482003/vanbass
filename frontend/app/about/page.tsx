import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <main style={{ flex: 1, paddingTop: "120px", paddingBottom: "100px" }}>
        <div className="container">
          <div style={{ maxWidth: "800px", marginBottom: "60px" }}>
            <p className="section-kicker">VỀ CHÚNG TÔI</p>
            <h1
              style={{
                fontSize: "clamp(36px, 5vw, 54px)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                margin: "0 0 24px 0",
                lineHeight: 1.05,
              }}
            >
              Âm thanh tạo nên cảm xúc. Thiết bị tạo nên đẳng cấp.
            </h1>
            <p style={{ color: "#a1a1aa", fontSize: "17px", lineHeight: 1.8 }}>
              VanBass Music Center được thành lập tại Đà Nẵng với sứ mệnh mang đến giải pháp thiết bị DJ và âm thanh chuyên nghiệp hàng đầu miền Trung, từ thiết bị phòng thu, học tập cá nhân đến hệ thống âm thanh sân khấu và sự kiện quy mô lớn.
            </p>
          </div>

          {/* Pillars Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "32px",
              marginBottom: "80px",
            }}
          >
            <div style={{ padding: "32px", backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px" }}>
              <span style={{ fontSize: "28px", display: "block", marginBottom: "16px" }}>🎧</span>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px", color: "#ffffff" }}>Thiết bị DJ chính hãng</h3>
              <p style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
                Phân phối chính thức các dòng sản phẩm Pioneer DJ, AlphaTheta từ cơ bản đến cao cấp nhất thế giới.
              </p>
            </div>

            <div style={{ padding: "32px", backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px" }}>
              <span style={{ fontSize: "28px", display: "block", marginBottom: "16px" }}>🔊</span>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px", color: "#ffffff" }}>Giải pháp âm thanh biểu diễn</h3>
              <p style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
                Tư vấn, lắp đặt hệ thống âm thanh cho quán bar, lounge, phòng trà, resort và các sự kiện ngoài trời.
              </p>
            </div>

            <div style={{ padding: "32px", backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px" }}>
              <span style={{ fontSize: "28px", display: "block", marginBottom: "16px" }}>⚡</span>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px", color: "#ffffff" }}>Dịch vụ cho thuê linh hoạt</h3>
              <p style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
                Cung cấp dàn máy DJ tiêu chuẩn sự kiện quốc tế theo ngày hoặc theo gói trọn gói có kỹ thuật viên túc trực.
              </p>
            </div>
          </div>

          {/* Showroom CTA */}
          <div
            style={{
              padding: "40px",
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "24px",
            }}
          >
            <div>
              <p className="section-kicker" style={{ marginBottom: "8px" }}>TRẢI NGHIỆM TRỰC TIẾP</p>
              <h2 style={{ fontSize: "26px", margin: "0 0 8px 0", color: "#ffffff" }}>Ghé thăm Showroom VanBass tại Đà Nẵng</h2>
              <p style={{ color: "#a1a1aa", margin: 0, fontSize: "15px" }}>
                Thử máy trực tiếp, nghe thử âm thanh và nhận tư vấn kỹ thuật từ đội ngũ DJ chuyên nghiệp.
              </p>
            </div>
            <Link href="/contact" className="button button-primary">
              Liên hệ ngay <span>→</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
