import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

export const metadata: Metadata = {
  title: "Sửa Chữa Bàn DJ Đà Nẵng, Huế Lấy Liền | Thay Fader, Sửa Jogwheel, Nguồn Pioneer DJ - VanBass",
  description:
    "Trung tâm sửa chữa bàn DJ, Mixer, CDJ Pioneer DJ & AlphaTheta chuyên nghiệp tại Đà Nẵng & Miền Trung. Thay fader, crossfader, sửa lỗi jogwheel, mất nguồn, rè âm thanh, bảo dưỡng vệ sinh lấy liền trong ngày. Linh kiện chính hãng 100%, bảo hành 6-12T. Hotline: 0706.067.799.",
  keywords: [
    // Core Repair Keywords Da Nang & Central Vietnam
    "sửa bàn dj đà nẵng",
    "sua ban dj da nang",
    "sửa chữa bàn dj đà nẵng",
    "sua chua ban dj da nang",
    "sửa bàn dj huế",
    "sua ban dj hue",
    "sửa chữa bàn dj huế",
    "sua chua ban dj hue",
    "sửa bàn dj",
    "sua ban dj",
    "sửa chữa bàn dj",
    "sua chua ban dj",
    "sửa bàn dj miền trung",
    "thay fader bàn dj",
    "thay fader pioneer",
    "thay crossfader bàn dj",
    "sửa jogwheel pioneer",
    "sửa mâm xoay dj",
    "bảo dưỡng bàn dj",
    "vệ sinh bàn dj",
    "sửa mixer dj đà nẵng",
    "sửa loa đà nẵng",
    "sửa xdj rx3",
    "sửa xdj rx2",
    "sửa ddj flx4",
    "sửa cdj 3000",
    "linh kiện bàn dj chính hãng",
    "vanbass music center",
  ],
  alternates: {
    canonical: "/sua-chua-ban-dj",
  },
  openGraph: {
    title: "Sửa Chữa Bàn DJ Đà Nẵng, Huế Lấy Liền | VanBass Music Center",
    description:
      "Dịch vụ sửa chữa bàn DJ Pioneer DJ, AlphaTheta lấy liền tại Đà Nẵng: Thay fader, sửa jogwheel, xử lý nguồn, bảo dưỡng vệ sinh định kỳ. Linh kiện chính hãng, bảo hành 6-12 tháng.",
    url: `${baseUrl}/sua-chua-ban-dj`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/images/rental/rental_fleet_hero.jpg`,
        width: 1200,
        height: 630,
        alt: "Sửa Chữa Bàn DJ Chuyên Nghiệp Đà Nẵng - VanBass Music Center",
      },
    ],
  },
};

const repairFaqs = [
  {
    q: "Thời gian sửa chữa bàn DJ tại VanBass Đà Nẵng mất bao lâu?",
    a: "Các lỗi thông dụng như thay fader, thay nút bấm CUE/PLAY, vệ sinh bảo dưỡng, cân chỉnh cảm ứng jogwheel được xử lý LẤY LIỀN trong vòng 1 - 3 giờ. Các lỗi bo mạch chủ, chập nguồn hoặc cần đặt linh kiện đặc thù sẽ hoàn thành trong 24 - 48 giờ.",
  },
  {
    q: "Linh kiện thay thế tại VanBass có phải chính hãng Pioneer DJ / AlphaTheta không?",
    a: "100% linh kiện thay thế tại VanBass là hàng chính hãng nhập khẩu từ Pioneer DJ / AlphaTheta (fader Alps, cảm biến quang jogwheel, IC nguồn, nút bấm cơ học). Quý khách được kiểm tra linh kiện mới nguyên vẹn trước khi kỹ thuật viên tiến hành thay thế.",
  },
  {
    q: "Chính sách bảo hành sau khi sửa chữa như thế nào?",
    a: "Tất cả dịch vụ sửa chữa và thay thế linh kiện tại VanBass đều được bảo hành từ 6 đến 12 tháng bằng phiếu bảo hành và tem điện tử. Nếu gặp lại lỗi tương tự trong thời gian bảo hành, chúng tôi xử lý hoàn toàn miễn phí.",
  },
  {
    q: "Khách hàng ở Huế, Hội An, Quảng Nam, Quảng Ngãi có thể gửi máy sửa như thế nào?",
    a: "VanBass nhận thiết bị qua các nhà xe liên tỉnh, chuyển phát nhanh bưu điện hoặc hỗ trợ kỹ thuật viên nhận máy tận nơi tại Hội An và Thừa Thiên Huế. Khi nhận máy, chúng tôi quay video kiểm tra tình trạng chi tiết và báo giá trước khi sửa.",
  },
  {
    q: "Phí kiểm tra và chuẩn đoán lỗi ban đầu là bao nhiêu?",
    a: "VanBass MIỄN PHÍ 100% chi phí kiểm tra và chuẩn đoán lỗi ban đầu cho tất cả khách hàng. Quý khách chỉ thanh toán khi đồng ý với phương án và báo giá sửa chữa.",
  },
];

export default function SuaChuaBanDjPage() {
  const messengerUrl = "https://m.me/vanbassmusiccenter";
  const hotline = "0706067799";

  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Service", "LocalBusiness"],
        "@id": `${baseUrl}/sua-chua-ban-dj#service`,
        "name": "Dịch Vụ Sửa Chữa & Bảo Dưỡng Bàn DJ Chuyên Nghiệp Đà Nẵng - VanBass",
        "url": `${baseUrl}/sua-chua-ban-dj`,
        "provider": {
          "@type": ["MusicStore", "LocalBusiness"],
          "name": "VanBass Music Center",
          "url": baseUrl,
          "telephone": "+84706067799",
          "priceRange": "200.000đ - 2.500.000đ",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Nguyễn Tất Thành, Phường Thanh Khê Tây, Quận Thanh Khê",
            "addressLocality": "Đà Nẵng",
            "addressRegion": "Đà Nẵng",
            "addressCountry": "VN",
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "16.0714",
            "longitude": "108.1882",
          },
        },
        "description":
          "Trung tâm sửa chữa bàn DJ, thay fader, sửa jogwheel, sửa nguồn bo mạch bàn DJ Pioneer DJ, AlphaTheta tại Đà Nẵng, Huế & Miền Trung.",
        "areaServed": ["Đà Nẵng", "Thừa Thiên Huế", "Hội An", "Quảng Nam", "Miền Trung"],
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/sua-chua-ban-dj#faq`,
        "mainEntity": repairFaqs.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/sua-chua-ban-dj#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Trang chủ",
            "item": baseUrl,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Sửa Chữa Bàn DJ",
            "item": `${baseUrl}/sua-chua-ban-dj`,
          },
        ],
      },
    ],
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#09090b",
        color: "#f4f4f5",
        fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <Header />

      <main style={{ flex: 1, paddingTop: "80px" }}>
        
        {/* =========================================================================
            HERO SECTION: SỬA CHỮA BÀN DJ ĐÀ NẴNG
           ========================================================================= */}
        <section
          style={{
            position: "relative",
            padding: "70px 0 60px",
            background: "radial-gradient(circle at 50% 20%, rgba(34, 197, 94, 0.12) 0%, rgba(9, 9, 11, 0.98) 75%)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
            <span
              style={{
                color: "#22c55e",
                fontSize: "12px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "12px",
                backgroundColor: "rgba(34, 197, 94, 0.12)",
                padding: "6px 14px",
                borderRadius: "999px",
                border: "1px solid rgba(34, 197, 94, 0.3)",
              }}
            >
              <span>⚡</span>
              <span>DỊCH VỤ SỬA CHỮA LẤY LIỀN - BẢO HÀNH 6-12 THÁNG</span>
            </span>

            <h1
              style={{
                fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                fontSize: "clamp(26px, 4vw, 46px)",
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "-0.03em",
                margin: "8px 0 16px 0",
                textTransform: "uppercase",
                lineHeight: 1.15,
              }}
            >
              Sửa Chữa Bàn DJ Chuyên Nghiệp Tại Đà Nẵng & Huế
            </h1>

            <p
              style={{
                color: "#a1a1aa",
                fontSize: "16px",
                maxWidth: "760px",
                margin: "0 auto 30px auto",
                lineHeight: 1.6,
              }}
            >
              Trung tâm tiếp nhận sửa chữa, thay thế linh kiện chính hãng và bảo dưỡng định kỳ các dòng máy Pioneer DJ & AlphaTheta: Pioneer XDJ-RX3, DDJ-FLX4, XDJ-XZ, CDJ-3000, Omnis-Duo. Chuẩn đoán miễn phí, báo đúng giá, lấy liền trong ngày.
            </p>

            {/* Quick Action Buttons */}
            <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
              <a
                href={`tel:${hotline}`}
                className="button button-primary"
                style={{
                  padding: "14px 28px",
                  fontSize: "14.5px",
                  fontWeight: 800,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 0 25px rgba(34, 197, 94, 0.4)",
                }}
              >
                <span>📞 Hotline Kỹ Thuật: 0706 067 799</span>
              </a>

              <a
                href={`${messengerUrl}?text=Toi%20can%20tu%20van%20sua%20chua%20ban%20DJ`}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-secondary"
                style={{
                  padding: "14px 24px",
                  fontSize: "14.5px",
                  fontWeight: 700,
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                }}
              >
                <span>💬 Nhắn Tin Báo Lỗi Ngay</span>
              </a>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SERVICES GRID: CÁC DỊCH VỤ SỬA CHỮA PHỔ BIẾN
           ========================================================================= */}
        <section style={{ padding: "70px 0", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "45px" }}>
              <span style={{ color: "#22c55e", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                DANH MỤC DỊCH VỤ KỸ THUẬT
              </span>
              <h2 style={{ fontSize: "clamp(22px, 3.2vw, 34px)", fontWeight: 900, color: "#fff", margin: "6px 0 0" }}>
                Các Lỗi Bàn DJ Được Xử Lý Nhanh Chóng
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              {/* Service 1 */}
              <div
                style={{
                  backgroundColor: "rgba(18, 18, 22, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "26px",
                }}
              >
                <div style={{ fontSize: "32px", marginBottom: "14px" }}>🎚️</div>
                <h3 style={{ fontSize: "19px", fontWeight: 800, color: "#fff", marginBottom: "10px" }}>
                  Thay Fader & Crossfader Chính Hãng
                </h3>
                <p style={{ fontSize: "13.5px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
                  Xử lý dứt điểm các hiện tượng: Kéo cần fader bị nhảy volume bất thường, rột rẹt âm thanh, gãy chân fader hoặc kẹt cứng do bụi bẩn, nước đổ. Sử dụng linh kiện fader Alps cao cấp chuẩn Pioneer.
                </p>
              </div>

              {/* Service 2 */}
              <div
                style={{
                  backgroundColor: "rgba(18, 18, 22, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "26px",
                }}
              >
                <div style={{ fontSize: "32px", marginBottom: "14px" }}>💿</div>
                <h3 style={{ fontSize: "19px", fontWeight: 800, color: "#fff", marginBottom: "10px" }}>
                  Sửa Jogwheel & Cân Chỉnh Cảm Ứng Mâm
                </h3>
                <p style={{ fontSize: "13.5px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
                  Cân chỉnh cảm ứng mặt mâm xoay, sửa lỗi jogwheel không nhận lực tay khi scratch, jogwheel bị nặng, kẹt cơ học hoặc màn hình On-Jog LCD trong mâm không hiển thị artwork.
                </p>
              </div>

              {/* Service 3 */}
              <div
                style={{
                  backgroundColor: "rgba(18, 18, 22, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "26px",
                }}
              >
                <div style={{ fontSize: "32px", marginBottom: "14px" }}>🔌</div>
                <h3 style={{ fontSize: "19px", fontWeight: 800, color: "#fff", marginBottom: "10px" }}>
                  Sửa Nguồn, Cổng Cắm USB & Jack Âm Thanh
                </h3>
                <p style={{ fontSize: "13.5px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
                  Xử lý bàn DJ bị chập nguồn, không lên đèn, chập chờn cổng cắm USB nhận nhạc, sửa jack tai nghe 3.5mm/6.35mm bị lỏng, jack canon XLR ra loa bị mất 1 vế tín hiệu.
                </p>
              </div>

              {/* Service 4 */}
              <div
                style={{
                  backgroundColor: "rgba(18, 18, 22, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "26px",
                }}
              >
                <div style={{ fontSize: "32px", marginBottom: "14px" }}>✨</div>
                <h3 style={{ fontSize: "19px", fontWeight: 800, color: "#fff", marginBottom: "10px" }}>
                  Vệ Sinh & Bảo Dưỡng Chuyên Sâu Lấy Liền
                </h3>
                <p style={{ fontSize: "13.5px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
                  Dung dịch chuyên dụng làm sạch bụi bẩn, tra dầu trơn fader, làm sạch mắt đọc cảm biến quang, bôi mỡ nhiệt mâm xoay giúp bàn DJ vận hành êm ái, kéo dài tuổi thọ gấp 3 lần.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PRICE TABLE: BẢNG GIÁ THAM KHẢO
           ========================================================================= */}
        <section style={{ padding: "70px 0", backgroundColor: "#0c0c0e", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <div className="container" style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <span style={{ color: "#22c55e", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                MINH BẠCH - BÁO TRƯỚC GIÁ
              </span>
              <h2 style={{ fontSize: "clamp(22px, 3.2vw, 32px)", fontWeight: 900, color: "#fff", margin: "6px 0 0" }}>
                Bảng Giá Dịch Vụ Sửa Chữa Tham Khảo
              </h2>
            </div>

            <div
              style={{
                backgroundColor: "rgba(18, 18, 22, 0.9)",
                border: "1px solid rgba(255, 255, 255, 0.09)",
                borderRadius: "14px",
                overflow: "hidden",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
                <thead>
                  <tr style={{ backgroundColor: "rgba(255, 255, 255, 0.05)", borderBottom: "1px solid rgba(255, 255, 255, 0.1)" }}>
                    <th style={{ padding: "16px 20px", color: "#ffffff", fontWeight: 800 }}>Hạng Mục Dịch Vụ</th>
                    <th style={{ padding: "16px 20px", color: "#ffffff", fontWeight: 800 }}>Thời Gian Xử Lý</th>
                    <th style={{ padding: "16px 20px", color: "#22c55e", fontWeight: 800, textAlign: "right" }}>Chi Phí Tham Khảo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                    <td style={{ padding: "14px 20px", color: "#e4e4e7" }}>Thay Fader Volume / Pitch Tempo (Pioneer Controller)</td>
                    <td style={{ padding: "14px 20px", color: "#a1a1aa" }}>30 - 60 phút (Lấy liền)</td>
                    <td style={{ padding: "14px 20px", color: "#22c55e", fontWeight: 700, textAlign: "right" }}>Từ 250.000đ</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                    <td style={{ padding: "14px 20px", color: "#e4e4e7" }}>Thay Fader Magvel / Alps (Dòng All-In-One RX3, XZ, CDJ)</td>
                    <td style={{ padding: "14px 20px", color: "#a1a1aa" }}>1 - 2 giờ</td>
                    <td style={{ padding: "14px 20px", color: "#22c55e", fontWeight: 700, textAlign: "right" }}>Từ 450.000đ</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                    <td style={{ padding: "14px 20px", color: "#e4e4e7" }}>Thay nút bấm CUE / PLAY / PAD cao su biểu diễn</td>
                    <td style={{ padding: "14px 20px", color: "#a1a1aa" }}>30 - 45 phút</td>
                    <td style={{ padding: "14px 20px", color: "#22c55e", fontWeight: 700, textAlign: "right" }}>Từ 200.000đ</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                    <td style={{ padding: "14px 20px", color: "#e4e4e7" }}>Cân chỉnh cảm ứng Jogwheel, sửa kẹt mâm xoay</td>
                    <td style={{ padding: "14px 20px", color: "#a1a1aa" }}>1 - 3 giờ</td>
                    <td style={{ padding: "14px 20px", color: "#22c55e", fontWeight: 700, textAlign: "right" }}>Từ 350.000đ</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                    <td style={{ padding: "14px 20px", color: "#e4e4e7" }}>Vệ sinh bảo dưỡng toàn bộ máy bằng dung dịch chuyên dụng</td>
                    <td style={{ padding: "14px 20px", color: "#a1a1aa" }}>1 - 2 giờ</td>
                    <td style={{ padding: "14px 20px", color: "#22c55e", fontWeight: 700, textAlign: "right" }}>300.000đ - 500.000đ</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "14px 20px", color: "#e4e4e7" }}>Sửa bo mạch nguồn, cứu firmware, thay IC âm thanh</td>
                    <td style={{ padding: "14px 20px", color: "#a1a1aa" }}>24 - 48 giờ</td>
                    <td style={{ padding: "14px 20px", color: "#22c55e", fontWeight: 700, textAlign: "right" }}>Báo giá sau khi kiểm tra</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ textAlign: "center", color: "#71717a", fontSize: "13px", marginTop: "16px" }}>
              * Lưu ý: Giá trên đã bao gồm công thay thế và bảo hành 6 - 12 tháng. Kiểm tra chuẩn đoán lỗi hoàn toàn MIỄN PHÍ.
            </p>
          </div>
        </section>

        {/* =========================================================================
            FAQ SECTION
           ========================================================================= */}
        <section style={{ padding: "70px 0" }}>
          <div className="container" style={{ maxWidth: "860px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <span style={{ color: "#22c55e", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                HỎI ĐÁP KỸ THUẬT
              </span>
              <h2 style={{ fontSize: "clamp(22px, 3.2vw, 32px)", fontWeight: 900, color: "#fff", margin: "6px 0 0" }}>
                Câu Hỏi Thường Gặp Về Sửa Chữa Bàn DJ
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {repairFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "rgba(18, 18, 22, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "12px",
                    padding: "20px 24px",
                  }}
                >
                  <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#ffffff", margin: "0 0 8px 0" }}>
                    {faq.q}
                  </h3>
                  <p style={{ fontSize: "14px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            CONTACT BANNER
           ========================================================================= */}
        <section
          style={{
            padding: "60px 0",
            backgroundColor: "rgba(34, 197, 94, 0.08)",
            borderTop: "1px solid rgba(34, 197, 94, 0.2)",
            textAlign: "center",
          }}
        >
          <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "26px", fontWeight: 900, color: "#ffffff", marginBottom: "12px" }}>
              Cần Kiểm Tra & Sửa Máy DJ Ngay Hôm Nay?
            </h2>
            <p style={{ color: "#d4d4d8", fontSize: "15px", marginBottom: "26px" }}>
              Ghé ngay Showroom VanBass tại: <strong>Nguyễn Tất Thành (Đà Nẵng)</strong> hoặc chi nhánh <strong>442 Chi Lăng (TP Huế)</strong> hoặc gọi trực tiếp Hotline để kỹ thuật viên tư vấn chuẩn đoán miễn phí.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
              <a
                href="tel:0706067799"
                className="button button-primary"
                style={{ padding: "12px 26px", fontSize: "14px", fontWeight: 800 }}
              >
                Gọi Hotline: 0706.067.799
              </a>
              <Link
                href="/contact"
                className="button button-secondary"
                style={{ padding: "12px 22px", fontSize: "14px", fontWeight: 700, backgroundColor: "rgba(255,255,255,0.08)" }}
              >
                Xem Bản Đồ Đường Đi
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
