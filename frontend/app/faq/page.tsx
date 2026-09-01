import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Câu Hỏi Thường Gặp (FAQ) | VanBass Music Center Đà Nẵng",
  description:
    "Giải đáp chi tiết các thắc mắc về mua bán, bảo hành và dịch vụ thuê thiết bị DJ, âm thanh biểu diễn tại VanBass Music Center Đà Nẵng.",
};

const FAQ_LIST = [
  {
    q: "1. Thiết bị DJ tại VanBass có phải hàng chính hãng 100% không?",
    a: "Tất cả các sản phẩm thiết bị DJ (Pioneer DJ, AlphaTheta, JBL, B&C Speakers...) phân phối tại VanBass Music Center đều là hàng chính hãng 100%, có đầy đủ hóa đơn chứng từ, tem bảo hành chính hãng và hỗ trợ bảo hành 12 tháng theo tiêu chuẩn của nhà sản xuất.",
  },
  {
    q: "2. Quy trình đặt thuê máy DJ tại Đà Nẵng diễn ra như thế nào?",
    a: "Quy trình thuê gồm 4 bước đơn giản: (1) Chọn thiết bị và thời gian thuê trên website; (2) Kỹ thuật viên VanBass gọi điện xác nhận địa điểm và giờ giao; (3) Ký hợp đồng thuê và bàn giao thiết bị kèm biên bản kiểm tra; (4) Hoàn trả máy và nhận lại toàn bộ tiền cọc ngay khi thiết bị được kiểm tra nguyên vẹn.",
  },
  {
    q: "3. Tiền cọc thuê thiết bị được tính như thế nào?",
    a: "Tiền cọc ước tính khoảng 30% giá trị thiết bị hoặc theo thỏa thuận cụ thể tùy vào dòng máy. Khách hàng là DJ chuyên nghiệp, đối tác phòng trà, quán bar quen thuộc tại Đà Nẵng có thể được áp dụng chính sách bảo lãnh cọc linh hoạt.",
  },
  {
    q: "4. VanBass có hỗ trợ kỹ thuật viên setup âm thanh tại sự kiện không?",
    a: "Có. Chúng tôi cung cấp dịch vụ kỹ thuật viên chuyên nghiệp hỗ trợ vận chuyển, lắp đặt, cân chỉnh âm thanh (Sound Check) và túc trực trong suốt thời gian diễn ra show diễn, tiệc cưới, party bãi biển hoặc lễ hội âm nhạc.",
  },
  {
    q: "5. Các hình thức thanh toán được hỗ trợ là gì?",
    a: "VanBass hỗ trợ đa dạng phương thức: Chuyển khoản ngân hàng tự động qua mã VietQR, thanh toán khi nhận hàng (COD), quẹt thẻ POS tại Showroom và chuyển khoản doanh nghiệp có xuất hóa đơn VAT.",
  },
  {
    q: "6. Nếu thiết bị gặp sự cố kỹ thuật trong lúc sử dụng thì xử lý thế nào?",
    a: "Đội ngũ kỹ thuật VanBass hỗ trợ hotline trực 24/7 (0706 067 799). Đối với các gói thuê sự kiện tại Đà Nẵng, chúng tôi cam kết có mặt trong vòng 15 - 30 phút để xử lý hoặc đổi ngay thiết bị dự phòng tương đương nếu phát sinh lỗi kỹ thuật.",
  },
];

export default function FAQPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#090909" }}>
      <Header />

      <main style={{ flex: 1, paddingTop: "120px", paddingBottom: "100px" }}>
        <div className="container">
          <div style={{ maxWidth: "800px", marginBottom: "48px" }}>
            <p className="section-kicker">
              TRUNG TÂM TRỢ GIÚP
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
              Câu Hỏi Thường Gặp (FAQ)
            </h1>
            <p style={{ color: "#a1a1aa", fontSize: "16px", lineHeight: 1.7, margin: 0 }}>
              Tổng hợp giải đáp các câu hỏi thường gặp về mua sắm, giao nhận, chính sách bảo hành và dịch vụ cho thuê thiết bị DJ chuyên nghiệp tại VanBass Đà Nẵng.
            </p>
          </div>

          {/* FAQ Accordion / Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "860px", marginBottom: "60px" }}>
            {FAQ_LIST.map((item, index) => (
              <article
                key={index}
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  padding: "28px 32px",
                  borderRadius: "10px",
                }}
              >
                <h2 style={{ fontSize: "17px", fontWeight: 700, margin: "0 0 12px 0", color: "#ffffff", lineHeight: 1.4 }}>
                  {item.q}
                </h2>
                <p style={{ fontSize: "14px", color: "#a1a1aa", lineHeight: 1.8, margin: 0 }}>
                  {item.a}
                </p>
              </article>
            ))}
          </div>

          {/* Contact Support Box */}
          <div
            style={{
              padding: "40px",
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              maxWidth: "860px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "24px",
            }}
          >
            <div>
              <h3 style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 8px 0", color: "#fff" }}>
                Chưa tìm thấy câu trả lời bạn cần?
              </h3>
              <p style={{ color: "#a1a1aa", margin: 0, fontSize: "14px" }}>
                Hotline tư vấn kỹ thuật trực tiếp: <strong style={{ color: "#22c55e" }}>0706 067 799</strong>
              </p>
            </div>
            <Link href="/contact" className="button button-primary">
              Gửi tin nhắn tư vấn <span>→</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
