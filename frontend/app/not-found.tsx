import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#090909" }}>
      <Header />

      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "140px 20px 100px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "540px" }}>
          <p className="section-kicker" style={{ fontSize: "14px", color: "#71717a", letterSpacing: "0.2em", margin: "0 0 12px 0" }}>
            LỖI 404 • KHÔNG TÌM THẤY TRANG
          </p>

          <h1
            style={{
              fontSize: "clamp(72px, 12vw, 120px)",
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: "-0.06em",
              margin: "0 0 24px 0",
              color: "#ffffff",
            }}
          >
            404
          </h1>

          <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#a1a1aa", margin: "0 0 36px 0" }}>
            Trang hoặc thiết bị bạn đang tìm kiếm không tồn tại, đã được đổi tên hoặc tạm thời gỡ bỏ khỏi hệ thống VanBass.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/"
              className="button button-primary"
              style={{ fontSize: "13px", fontWeight: 700, padding: "0 28px", minHeight: "48px" }}
            >
              Về trang chủ <span>→</span>
            </Link>

            <Link
              href="/products"
              className="button button-secondary"
              style={{ fontSize: "13px", fontWeight: 700, padding: "0 28px", minHeight: "48px" }}
            >
              Xem tất cả sản phẩm
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
