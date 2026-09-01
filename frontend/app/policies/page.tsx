import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Chính Sách & Quy Định | VanBass Music Center Đà Nẵng",
  description:
    "Quy định về bảo hành 12 tháng, chính sách đổi trả trong 7 ngày, quy định cho thuê thiết bị DJ và bảo mật thông tin tại VanBass Music Center.",
};

export default function PoliciesPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#090909" }}>
      <Header />

      <main style={{ flex: 1, paddingTop: "120px", paddingBottom: "100px" }}>
        <div className="container">
          <div style={{ maxWidth: "800px", marginBottom: "48px" }}>
            <p className="section-kicker">
              ĐIỀU KHOẢN & QUY ĐỊNH
            </p>
            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                margin: "0 0 16px 0",
                color: "#ffffff",
              }}
            >
              Chính Sách & Quy Định VanBass
            </h1>
            <p style={{ color: "#a1a1aa", fontSize: "16px", lineHeight: 1.7, margin: 0 }}>
              Cam kết về chất lượng sản phẩm chính hãng, dịch vụ cho thuê minh bạch và quyền lợi tuyệt đối cho khách hàng khi giao dịch tại VanBass Music Center.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "860px", marginBottom: "60px" }}>
            {/* Section 1 */}
            <section style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "32px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
                <span>🛡️</span> 1. Chính Sách Bảo Hành Chính Hãng (12 Tháng)
              </h2>
              <div style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: 1.8 }}>
                <p>
                  - Mọi thiết bị DJ, Bàn trộn Mixer, Loa kiểm âm và Phụ kiện âm thanh mua mới tại VanBass đều được bảo hành chính hãng tối thiểu <strong>12 tháng</strong>.
                </p>
                <p>
                  - Bảo hành miễn phí với các lỗi kỹ thuật phát sinh do nhà sản xuất (hỏng fader, lỗi màn hình, lỗi cổng kết nối âm thanh DAC...).
                </p>
                <p>
                  - Thời gian tiếp nhận và xử lý bảo hành: Trong vòng 24 - 48 giờ làm việc. Có hỗ trợ thiết bị thay thế tạm thời cho DJ biểu diễn trong thời gian chờ thẩm định.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "32px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
                <span>🔄</span> 2. Chính Sách Đổi Trả Sản Phẩm (7 Ngày)
              </h2>
              <div style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: 1.8 }}>
                <p>
                  - Khách hàng được <strong>1 đổi 1 trong vòng 7 ngày đầu tiên</strong> nếu sản phẩm phát sinh lỗi phần cứng do nhà sản xuất.
                </p>
                <p>
                  - Điều kiện đổi trả: Thiết bị còn nguyên vẹn tem bảo hành, đầy đủ hộp, phụ kiện, sách hướng dẫn và biên nhận mua hàng.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "32px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
                <span>📅</span> 3. Quy Định Thuê & Đặt Cọc Thiết Bị
              </h2>
              <div style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: 1.8 }}>
                <p>
                  - <strong>Thời gian tính 1 ngày thuê:</strong> 24 giờ tính từ thời điểm bàn giao thiết bị hoàn tất.
                </p>
                <p>
                  - <strong>Biên bản bàn giao:</strong> Hai bên cùng kiểm tra test máy (jog wheel, faders, cổng audio, đèn LED) trước khi ký nhận.
                </p>
                <p>
                  - <strong>Hoàn trả cọc:</strong> VanBass hoàn lại 100% tiền cọc ngay lập tức qua chuyển khoản hoặc tiền mặt khi nhận lại thiết bị đúng hiện trạng.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "32px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
                <span>🔒</span> 4. Chính Sách Bảo Mật Thông Tin Khách Hàng
              </h2>
              <div style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: 1.8 }}>
                <p>
                  - VanBass cam kết bảo mật tuyệt đối thông tin cá nhân, số điện thoại, địa chỉ nhận hàng và lịch sử giao dịch của quý khách hàng.
                </p>
                <p>
                  - Không chia sẻ hay cung cấp thông tin cho bất kỳ bên thứ ba nào vì mục đích thương mại.
                </p>
              </div>
            </section>
          </div>

          <div style={{ textAlign: "center" }}>
            <Link href="/" className="button button-primary">
              ← Quay lại trang chủ
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
