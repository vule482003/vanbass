import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Mua Bán Bàn DJ Chính Hãng Pioneer DJ & AlphaTheta Tại Đà Nẵng | VanMusic",
  description:
    "Tổng đại lý mua bán bàn DJ Pioneer DJ & AlphaTheta chính hãng tại Đà Nẵng, Huế & Miền Trung: XDJ-RX3, DDJ-FLX4, Omnis-Duo, XDJ-AZ, DDJ-FLX2, XDJ-XZ. Máy mới 100% fullbox & like new 99%, bảo hành 12-24T, trả góp 0%, test máy trực tiếp tại Showroom.",
  alternates: {
    canonical: "/ban-dj",
  },
};

const FEATURED_PRODUCTS = [
  {
    id: "flx4",
    name: "Pioneer DDJ-FLX4",
    slug: "ddj-flx4",
    categoryType: "DJ CONTROLLER 2 KÊNH",
    targetAudience: "Dành cho người mới học DJ, livestream & tiệc gia đình",
    badge: "BÁN CHẠY SỐ 1 - CHO NGƯỜI MỚI",
    badgeColor: "#22c55e",
    image: "/images/products/ddj-flx4.png",
    condition: "Mới 100% Fullbox & Like New 99%",
    priceText: "Từ 8.500.000đ",
    installmentText: "Trả góp 0% chỉ từ 710.000đ/tháng",
    highlights: [
      "Bộ điều khiển bán chạy nhất toàn cầu, chuẩn thiết kế layout Club",
      "Tính năng Smart Fader & Smart CFX hỗ trợ chuyển bài siêu mượt",
      "Tương thích Rekordbox & Serato DJ trên PC, Mac, iPhone, iPad",
      "Tặng kho nhạc 100GB + khóa hướng dẫn kỹ thuật 1-kèm-1",
    ],
    buyMessage: "Toi%20muon%20tu%20van%20mua%20ban%20DJ%20Pioneer%20DDJ-FLX4",
  },
  {
    id: "flx2",
    name: "AlphaTheta DDJ-FLX2",
    slug: "ddj-flx2",
    categoryType: "COMPACT DJ CONTROLLER",
    targetAudience: "Dành cho người mới bắt đầu, siêu nhỏ gọn & di động",
    badge: "THẾ HỆ MỚI - KẾT NỐI KHÔNG DÂY",
    badgeColor: "#38bdf8",
    image: "/images/products/alphatheta-ddj-flx2.png",
    condition: "Mới 100% Fullbox Chính Hãng",
    priceText: "Từ 5.800.000đ",
    installmentText: "Trả góp 0% chỉ từ 485.000đ/tháng",
    highlights: [
      "Thiết kế siêu nhẹ, dễ dàng bỏ balo mang đi dã ngoại, du lịch",
      "Hỗ trợ kết nối Bluetooth không dây với iPhone, iPad, Smartphone",
      "Tương thích đa nền tảng: ứng dụng djay, Rekordbox Mobile",
      "Tính năng Smart CFX và Beat Sync giúp người mới làm quen ngay",
    ],
    buyMessage: "Toi%20muon%20tu%20van%20mua%20ban%20DJ%20AlphaTheta%20DDJ-FLX2",
  },
  {
    id: "rx3",
    name: "Pioneer DJ XDJ-RX3",
    slug: "xdj-rx3",
    categoryType: "ALL-IN-ONE SYSTEM 2 KÊNH",
    targetAudience: "Dành cho DJ chuyên nghiệp, Bar, Pub, Lounge & Sự kiện",
    badge: "CHUẨN CLUB - BIỂU DIỄN ĐỈNH CAO",
    badgeColor: "#eab308",
    image: "/images/products/xdj-rx3.png",
    condition: "Mới 100% Fullbox & Like New Tuyển Chọn",
    priceText: "Từ 46.000.000đ - 62.500.000đ",
    installmentText: "Hỗ trợ trả góp 0% qua thẻ tín dụng linh hoạt",
    highlights: [
      "Màn hình cảm ứng 10.1 inch siêu nét, giao diện GUI mượt từ CDJ-3000",
      "Cắm USB chơi nhạc độc lập hoàn toàn, không cần máy tính laptop",
      "14 Beat FX và 6 Sound Color FX thừa hưởng từ mixer flagship DJM-900NXS2",
      "Tính năng Release FX trên pad giúp tạo build-up và break ngoạn mục",
    ],
    buyMessage: "Toi%20muon%20tu%20van%20mua%20ban%20DJ%20Pioneer%20XDJ-RX3",
  },
  {
    id: "omnis",
    name: "AlphaTheta OMNIS-DUO",
    slug: "omnis-duo",
    categoryType: "WIRELESS ALL-IN-ONE DJ SYSTEM",
    targetAudience: "Dành cho tiệc bãi biển, du thuyền, villa & dã ngoại",
    badge: "TÍCH HỢP PIN 5H - BLUETOOTH AUDIO",
    badgeColor: "#a855f7",
    image: "/images/products/ban-dj-alpha-theta-omnis-duo.png",
    condition: "Mới 100% Fullbox Chính Hãng",
    priceText: "Khoảng 42.000.000đ - 45.000.000đ",
    installmentText: "Trả góp 0% duyệt nhanh trong 10 phút",
    highlights: [
      "Tích hợp pin sạc lithium cho thời lượng biểu diễn liên tục 5 giờ",
      "Kết nối Bluetooth Audio Input/Output phát nhạc không dây linh hoạt",
      "Màn hình cảm ứng sắc nét với 2 chế độ hiển thị Light Mode và Dark Mode",
      "Trọng lượng nhẹ, thiết kế màu chàm tinh tế, độ bền chuẩn sân khấu",
    ],
    buyMessage: "Toi%20muon%20tu%20van%20mua%20ban%20DJ%20AlphaTheta%20Omnis-Duo",
  },
  {
    id: "az",
    name: "AlphaTheta XDJ-AZ",
    slug: "xdj-az",
    categoryType: "ALL-IN-ONE FLAGSHIP 4 KÊNH",
    targetAudience: "Hệ thống độc lập 4 kênh cao cấp nhất cho Club & Festival",
    badge: "QUÁI VẬT THẾ HỆ MỚI 4 KÊNH",
    badgeColor: "#ef4444",
    image: "/images/products/ban-dj-alphatheta-xdj-az.png",
    condition: "Mới 100% Fullbox Nguyên Seal",
    priceText: "Liên hệ nhận báo giá ưu đãi tốt nhất",
    installmentText: "Trợ giá thu cũ đổi mới + Trả góp 0%",
    highlights: [
      "Bộ vi xử lý âm thanh 32-bit ESS đỉnh cao, chất âm Club tách bạch tuyệt đối",
      "Hệ thống 4 kênh độc lập hoàn toàn, hỗ trợ Wi-Fi & CloudDirectPlay",
      "Màn hình cảm ứng đa điểm 10.1 inch thế hệ mới nhất siêu mượt",
      "Mâm jogwheel kích thước tiêu chuẩn CDJ-3000 với On-Jog LCD màu",
    ],
    buyMessage: "Toi%20muon%20tu%20van%20mua%20ban%20DJ%20AlphaTheta%20XDJ-AZ",
  },
  {
    id: "xz",
    name: "Pioneer DJ XDJ-XZ",
    slug: "xdj-xz",
    categoryType: "ALL-IN-ONE 4 KÊNH MÂM FULL-SIZE",
    targetAudience: "Dành cho Bar, Pub, Wedding & DJ chuyên nghiệp",
    badge: "MÂM FULL-SIZE CDJ-2000NXS2",
    badgeColor: "#06b6d4",
    image: "/images/products/xdj-xz.png",
    condition: "Mới 100% Fullbox & Like New 99%",
    priceText: "Từ 58.000.000đ - 68.000.000đ",
    installmentText: "Hỗ trợ trả góp 0% thẻ tín dụng ngân hàng",
    highlights: [
      "Mâm xoay Full-size đường kính 206mm tương tự CDJ-2000NXS2",
      "Màn hình màu On-Jog hiển thị thông tin bài nhạc và artwork sắc nét",
      "Hỗ trợ 4 kênh mixer chuyên nghiệp với 14 Beat FX và 6 Sound Color FX",
      "Kết nối Pro DJ Link đồng bộ máy phụ và hệ thống ánh sáng DMX",
    ],
    buyMessage: "Toi%20muon%20tu%20van%20mua%20ban%20DJ%20Pioneer%20XDJ-XZ",
  },
];

const FAQS = [
  {
    q: "Mua bàn DJ ở đâu uy tín, chính hãng tại Đà Nẵng và Miền Trung?",
    a: "VanMusic (VanBass Music Center) là trung tâm phân phối thiết bị DJ chính hãng Pioneer DJ và AlphaTheta uy tín số 1 tại Đà Nẵng (Showroom: Nguyễn Tất Thành, Phường Thanh Khê Tây, Quận Thanh Khê) và TP Huế (442 Chi Lăng). 100% thiết bị bán ra có tem bảo hành chính hãng từ 12 - 24 tháng, bảo dưỡng kỹ thuật trọn đời và hỗ trợ linh kiện thay thế chính hãng lấy ngay.",
  },
  {
    q: "Người mới bắt đầu tập chơi DJ nên chọn mua dòng máy nào tối ưu nhất?",
    a: "Với người mới bắt đầu học DJ hoặc luyện tập tại nhà, dòng DJ Controller 2 kênh kết nối máy tính như Pioneer DDJ-FLX4 hoặc AlphaTheta DDJ-FLX2 là lựa chọn lý tưởng nhất. Mức giá chỉ từ 5.8 triệu đến 8.5 triệu đồng, trang bị đầy đủ tính năng Smart Fader và Smart CFX hỗ trợ người mới làm quen thao tác mix nhạc cơ bản cực kỳ nhanh chóng.",
  },
  {
    q: "Bàn DJ All-In-One cắm USB độc lập khác gì so với DJ Controller?",
    a: "Bàn DJ Controller bắt buộc phải kết nối với máy tính Laptop (hoặc iPad) để chạy phần mềm giải mã nhạc. Trong khi đó, dòng bàn DJ All-In-One (như Pioneer XDJ-RX3, AlphaTheta Omnis-Duo, XDJ-AZ, XDJ-XZ) tích hợp sẵn màn hình cảm ứng hiển thị sóng nhạc và bộ vi xử lý độc lập. Người chơi chỉ cần cắm USB đã nạp nhạc qua Rekordbox là biểu diễn trực tiếp mà không cần dùng đến laptop, tránh hoàn toàn rủi ro máy tính bị treo hay lag giữa show.",
  },
  {
    q: "VanMusic có chính sách mua bàn DJ trả góp 0% và quà tặng kèm gì?",
    a: "Có. VanMusic hỗ trợ trả góp 0% lãi suất linh hoạt qua thẻ tín dụng liên kết hơn 25 ngân hàng trên toàn quốc và hỗ trợ duyệt hồ sơ nhanh qua CCCD. Khi mua bàn DJ tại Showroom, quý khách được tặng kèm: USB Sandisk nạp sẵn kho nhạc Lossless phân tích chuẩn Rekordbox, khóa đào tạo kỹ thuật vận hành 1-kèm-1, hỗ trợ cài đặt trọn đời và bảo dưỡng máy định kỳ.",
  },
  {
    q: "Nên chọn mua bàn DJ mới 100% đập hộp hay hàng Like New 98-99% tiết kiệm?",
    a: "Nếu bạn có ngân sách thoải mái và muốn trải nghiệm cảm giác mở seal đập hộp, máy mới 100% bảo hành 12-24 tháng là lựa chọn số 1. Nếu muốn tiết kiệm từ 20% đến 35% chi phí, các phiên bản Like New 98-99% tại VanMusic được các kỹ sư âm thanh kiểm tra khắt khe từng fader, mâm xoay, nút bấm và vẫn được áp dụng chính sách bảo hành 6 - 12 tháng minh bạch.",
  },
  {
    q: "Tôi có thể ghé Showroom tại Đà Nẵng để cắm USB trải nghiệm máy thật trước khi mua không?",
    a: "Hoàn toàn được! VanMusic khuyến khích quý khách hàng ghé trực tiếp Showroom tại Nguyễn Tất Thành, Quận Thanh Khê, TP Đà Nẵng để cắm USB cá nhân, trực tiếp test cảm giác mâm xoay jogwheel, fader và trải nghiệm âm thanh thực tế trên hệ thống loa Pro trước khi đưa ra quyết định mua sắm.",
  },
];

export default function BanDjLandingPage() {
  const hotline = "0706067799";
  const messengerUrl = "https://m.me/vanbassmusiccenter";
  const zaloUrl = "https://zalo.me/0706067799";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#09090b",
        color: "#f4f4f5",
        fontFamily: "var(--font-primary)",
      }}
    >
      <Header />

      <main style={{ flex: 1, paddingTop: "80px" }}>
        {/* =========================================================================
            SECTION 1: HERO LOCKUP (CHÍNH XÁC INTENT MUA BÁN BÀN DJ + H1 CHUẨN SEO)
           ========================================================================= */}
        <section
          style={{
            position: "relative",
            padding: "50px 0 65px 0",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(34, 197, 94, 0.12), transparent)",
          }}
        >
          <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 20px" }}>
            {/* Breadcrumb Navigation */}
            <nav
              aria-label="Breadcrumb"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13px",
                color: "#71717a",
                marginBottom: "28px",
              }}
            >
              <Link href="/" style={{ color: "#a1a1aa", textDecoration: "none" }}>
                Trang chủ
              </Link>
              <span>/</span>
              <span style={{ color: "#22c55e", fontWeight: 600 }}>Mua Bán Bàn DJ Chính Hãng</span>
            </nav>

            <div style={{ textAlign: "center", maxWidth: "980px", margin: "0 auto" }}>
              {/* Eyebrow Kicker */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "rgba(34, 197, 94, 0.1)",
                  border: "1px solid rgba(34, 197, 94, 0.28)",
                  borderRadius: "9999px",
                  padding: "6px 16px",
                  marginBottom: "20px",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#22c55e",
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    color: "#4ade80",
                    fontSize: "12px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                  }}
                >
                  TỔNG ĐẠI LÝ PHÂN PHỐI PIONEER DJ & ALPHATHETA MIỀN TRUNG
                </span>
              </div>

              {/* H1 CHUẨN THEO YÊU CẦU */}
              <h1
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "clamp(28px, 4.2vw, 48px)",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.18,
                  margin: "0 0 20px 0",
                  textTransform: "uppercase",
                }}
              >
                Mua Bán Bàn DJ Chính Hãng Pioneer DJ & AlphaTheta Tại Đà Nẵng
              </h1>

              {/* Subtitle mô tả tập trung vào mua bán */}
              <p
                style={{
                  color: "#d4d4d8",
                  fontSize: "clamp(15px, 1.8vw, 17px)",
                  lineHeight: 1.7,
                  margin: "0 auto 32px auto",
                  maxWidth: "860px",
                }}
              >
                <strong>VanMusic (VanBass Music Center)</strong> là trung tâm mua bán bàn DJ chính hãng uy tín hàng đầu tại <strong>Đà Nẵng & Miền Trung</strong>. Đầy đủ các dòng máy DJ Controller cho người mới học đến hệ thống All-In-One cao cấp cho Bar, Club, Lounge. Máy mới 100% fullbox đập hộp & Like New 98-99% tuyển chọn kỹ thuật, bảo hành chính hãng 12 - 24 tháng, hỗ trợ trả góp 0%, test máy trực tiếp tại Showroom.
              </p>

              {/* 4 Feature Badges */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "12px",
                  marginBottom: "35px",
                }}
              >
                {[
                  { icon: "🛡️", text: "100% Chính Hãng - Bảo Hành 12-24T" },
                  { icon: "💳", text: "Trả Góp 0% Lãi Suất Linh Hoạt" },
                  { icon: "🎧", text: "Tặng Kho Nhạc 100GB + Khóa Học DJ 1-1" },
                  { icon: "📍", text: "Showroom Trải Nghiệm Máy Thật Đà Nẵng" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "8px",
                      padding: "8px 14px",
                      fontSize: "13px",
                      color: "#f4f4f5",
                      fontWeight: 600,
                    }}
                  >
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "14px",
                }}
              >
                <a
                  href={`tel:${hotline}`}
                  className="button button-primary"
                  style={{
                    padding: "14px 28px",
                    fontSize: "15px",
                    fontWeight: 700,
                    borderRadius: "10px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    textDecoration: "none",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Tư Vấn & Báo Giá: 0706 067 799</span>
                </a>

                <a
                  href="#featured-gear"
                  className="button button-secondary"
                  style={{
                    padding: "14px 26px",
                    fontSize: "15px",
                    fontWeight: 600,
                    borderRadius: "10px",
                    backgroundColor: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#ffffff",
                    textDecoration: "none",
                  }}
                >
                  Khám Phá Các Dòng Bàn DJ ↓
                </a>

                <Link
                  href="/products"
                  className="button button-secondary"
                  style={{
                    padding: "14px 24px",
                    fontSize: "14.5px",
                    fontWeight: 600,
                    borderRadius: "10px",
                    backgroundColor: "rgba(34, 197, 94, 0.08)",
                    border: "1px solid rgba(34, 197, 94, 0.3)",
                    color: "#4ade80",
                    textDecoration: "none",
                  }}
                >
                  Kho 150+ Thiết Bị Pro &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: 4 GIÁ TRỊ CỐT LÕI (VALUE PILLARS GRID)
           ========================================================================= */}
        <section
          style={{
            padding: "60px 0",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            backgroundColor: "#0d0e12",
          }}
        >
          <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 20px" }}>
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
                TẠI SAO CHỌN MUA BÀN DJ TẠI VANMUSIC?
              </span>
              <h2
                style={{
                  fontSize: "clamp(22px, 3.2vw, 32px)",
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                  margin: 0,
                  textTransform: "uppercase",
                }}
              >
                Cam Kết Uy Tín & Dịch Vụ Hậu Mãi Số 1 Miền Trung
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "22px",
              }}
            >
              <div
                style={{
                  backgroundColor: "rgba(18, 18, 22, 0.85)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "26px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                }}
              >
                <div style={{ fontSize: "32px", marginBottom: "14px" }}>🛡️</div>
                <h3 style={{ fontSize: "17.5px", fontWeight: 700, color: "#ffffff", marginBottom: "10px" }}>
                  100% Chính Hãng - Bảo Hành 12-24T
                </h3>
                <p style={{ fontSize: "13.5px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
                  Cam kết máy mới 100% fullbox nguyên seal hoặc hàng like new 98-99% tuyển chọn kỹ thuật khắt khe. Đầy đủ hóa đơn, tem niêm phong và bảo hành chính hãng linh kiện.
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(18, 18, 22, 0.85)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "26px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                }}
              >
                <div style={{ fontSize: "32px", marginBottom: "14px" }}>💳</div>
                <h3 style={{ fontSize: "17.5px", fontWeight: 700, color: "#ffffff", marginBottom: "10px" }}>
                  Trả Góp 0% Lãi Suất Linh Hoạt
                </h3>
                <p style={{ fontSize: "13.5px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
                  Hỗ trợ mua bàn DJ trả góp 0% qua thẻ tín dụng liên kết hơn 25 ngân hàng trên toàn quốc hoặc duyệt căn cước (CCCD) trong 10 phút. Nhận máy ngay, chi trả nhẹ nhàng.
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(18, 18, 22, 0.85)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "26px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                }}
              >
                <div style={{ fontSize: "32px", marginBottom: "14px" }}>🎧</div>
                <h3 style={{ fontSize: "17.5px", fontWeight: 700, color: "#ffffff", marginBottom: "10px" }}>
                  Tặng Kho Nhạc 100GB & Đào Tạo DJ 1-1
                </h3>
                <p style={{ fontSize: "13.5px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
                  Tặng kèm USB nạp sẵn kho nhạc Lossless phân tích chuẩn Rekordbox cùng buổi hướng dẫn kết nối, cài đặt phần mềm và làm quen thao tác DJ cơ bản trực tiếp từ chuyên viên.
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(18, 18, 22, 0.85)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "26px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                }}
              >
                <div style={{ fontSize: "32px", marginBottom: "14px" }}>📍</div>
                <h3 style={{ fontSize: "17.5px", fontWeight: 700, color: "#ffffff", marginBottom: "10px" }}>
                  Showroom Trải Nghiệm Máy Thật
                </h3>
                <p style={{ fontSize: "13.5px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
                  Kính mời quý khách ghé Showroom Đà Nẵng (Nguyễn Tất Thành, Q. Thanh Khê) để cắm USB test trực tiếp cảm giác mâm xoay jogwheel, fader trên dàn âm thanh thực tế trước khi mua.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DANH MỤC CÁC DÒNG BÀN DJ TIÊU BIỂU (FEATURED PRODUCTS)
            Chỉ hiển thị các sản phẩm nổi bật, không dump toàn bộ 152 sản phẩm!
           ========================================================================= */}
        <section
          id="featured-gear"
          style={{
            padding: "80px 0",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            backgroundColor: "#09090b",
          }}
        >
          <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 20px" }}>
            <div style={{ textAlign: "center", marginBottom: "50px" }}>
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
                DANH MỤC BÀN DJ TIÊU BIỂU
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "clamp(26px, 3.6vw, 38px)",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.03em",
                  margin: 0,
                  textTransform: "uppercase",
                }}
              >
                Các Dòng Bàn DJ Bán Chạy Nhất Tại VanMusic
              </h2>
              <p
                style={{
                  color: "#a1a1aa",
                  fontSize: "15px",
                  maxWidth: "750px",
                  margin: "12px auto 0 auto",
                  lineHeight: 1.6,
                }}
              >
                Từ các dòng DJ Controller 2 kênh nhỏ gọn cho người mới bắt đầu đến hệ thống All-In-One cắm USB độc lập chuẩn Club cao cấp.
              </p>
            </div>

            {/* Grid 6 Featured Hardware Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                gap: "28px",
                marginBottom: "50px",
              }}
            >
              {FEATURED_PRODUCTS.map((prod) => (
                <div
                  key={prod.id}
                  style={{
                    backgroundColor: "rgba(18, 18, 22, 0.85)",
                    border: "1px solid rgba(255, 255, 255, 0.09)",
                    borderRadius: "16px",
                    padding: "26px",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
                    transition: "transform 0.2s ease, border-color 0.2s ease",
                  }}
                >
                  {/* Badge top right */}
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      backgroundColor: `${prod.badgeColor}22`,
                      color: prod.badgeColor,
                      border: `1px solid ${prod.badgeColor}66`,
                      fontSize: "10.5px",
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {prod.badge}
                  </div>

                  {/* Product Image Frame */}
                  <div
                    style={{
                      aspectRatio: "16/10",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "20px",
                      backgroundColor: "#000000",
                      borderRadius: "12px",
                      padding: "16px",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={prod.image}
                      alt={`Mua Bán Bàn DJ ${prod.name} Chính Hãng Tại Đà Nẵng`}
                      style={{ maxWidth: "100%", maxHeight: "160px", objectFit: "contain" }}
                      loading="lazy"
                    />
                  </div>

                  {/* Category Type */}
                  <span
                    style={{
                      fontSize: "11.5px",
                      color: "#22c55e",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {prod.categoryType}
                  </span>

                  {/* Product Title H3 */}
                  <h3
                    style={{
                      fontFamily: "var(--font-primary)",
                      fontSize: "22px",
                      fontWeight: 700,
                      color: "#ffffff",
                      margin: "6px 0 6px 0",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {prod.name}
                  </h3>

                  <p style={{ fontSize: "12.5px", color: "#71717a", margin: "0 0 16px 0", fontStyle: "italic" }}>
                    {prod.targetAudience}
                  </p>

                  {/* Highlight Bullets */}
                  <ul
                    style={{
                      margin: "0 0 20px 0",
                      padding: 0,
                      listStyle: "none",
                      fontSize: "13px",
                      color: "#a1a1aa",
                      lineHeight: 1.6,
                      display: "flex",
                      flexDirection: "column",
                      gap: "7px",
                      flex: 1,
                    }}
                  >
                    {prod.highlights.map((h, i) => (
                      <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                        <span style={{ color: "#22c55e", fontWeight: 700, flexShrink: 0 }}>✓</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price & Installment Block */}
                  <div
                    style={{
                      padding: "14px 0",
                      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                      marginBottom: "20px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <span style={{ fontSize: "12px", color: "#71717a" }}>Giá bán tham khảo:</span>
                      <span style={{ fontSize: "20px", fontWeight: 700, color: "#22c55e", letterSpacing: "-0.02em" }}>
                        {prod.priceText}
                      </span>
                    </div>
                    <div style={{ fontSize: "11.5px", color: "#38bdf8", marginTop: "4px", textAlign: "right" }}>
                      {prod.installmentText}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: "flex", gap: "10px" }}>
                    <a
                      href={`${zaloUrl}?text=${prod.buyMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button button-primary"
                      style={{
                        flex: 1,
                        textAlign: "center",
                        padding: "11px 14px",
                        fontSize: "13.5px",
                        fontWeight: 700,
                        borderRadius: "8px",
                        textDecoration: "none",
                      }}
                    >
                      Tư Vấn Mua Ngay
                    </a>
                    <Link
                      href={`/products/${prod.slug}`}
                      className="button button-secondary"
                      style={{
                        padding: "11px 16px",
                        fontSize: "13px",
                        fontWeight: 600,
                        backgroundColor: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "8px",
                        color: "#fff",
                        textDecoration: "none",
                      }}
                      title={`Xem chi tiết cấu hình bàn DJ ${prod.name}`}
                    >
                      Chi Tiết
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* =========================================================================
                SECTION 4: CALL TO ACTION DẪN SANG KHO SẢN PHẨM /products
                Không dump toàn bộ 152 sản phẩm tại /ban-dj
               ========================================================================= */}
            <div
              style={{
                backgroundColor: "rgba(18, 18, 24, 0.95)",
                border: "1px solid rgba(34, 197, 94, 0.3)",
                borderRadius: "16px",
                padding: "36px 30px",
                textAlign: "center",
                background:
                  "linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(18, 18, 24, 0.95) 100%)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
              }}
            >
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
                KHO THIẾT BỊ ĐẦY ĐỦ NHẤT MIỀN TRUNG
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "clamp(22px, 3.2vw, 30px)",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                  margin: "0 0 12px 0",
                  textTransform: "uppercase",
                }}
              >
                Khám Phá Toàn Bộ Hơn 150+ Bàn DJ, Mixer, CDJ & Phụ Kiện Chính Hãng
              </h3>
              <p
                style={{
                  color: "#a1a1aa",
                  fontSize: "14.5px",
                  maxWidth: "760px",
                  margin: "0 auto 24px auto",
                  lineHeight: 1.6,
                }}
              >
                Bạn đang tìm kiếm các dàn máy Flagship <strong>Pioneer CDJ-3000</strong>, Mixer chuyên nghiệp <strong>DJM-A9 / DJM-V10</strong>, bàn đĩa than Scratch <strong>PLX-1000</strong> hay loa kiểm âm phòng thu <strong>Pioneer DM series</strong>? Mời bạn ghé xem toàn bộ danh mục sản phẩm tại kho hàng VanMusic.
              </p>

              <Link
                href="/products"
                className="button button-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "14px 32px",
                  fontSize: "15px",
                  fontWeight: 700,
                  borderRadius: "10px",
                  textDecoration: "none",
                  backgroundColor: "#22c55e",
                  color: "#000000",
                }}
              >
                <span>Xem Tất Cả Bàn DJ Tại Kho Sản Phẩm</span>
                <span style={{ fontSize: "18px" }}>&rarr;</span>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: CẨM NANG TƯ VẤN CHỌN MUA BÀN DJ (HELPFUL CONTENT)
           ========================================================================= */}
        <section
          style={{
            padding: "70px 0",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            backgroundColor: "#0d0e12",
          }}
        >
          <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 20px" }}>
            <div style={{ textAlign: "center", marginBottom: "45px" }}>
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
                HƯỚNG DẪN MUA HÀNG HỮU ÍCH
              </span>
              <h2
                style={{
                  fontSize: "clamp(24px, 3.4vw, 34px)",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                  margin: 0,
                  textTransform: "uppercase",
                }}
              >
                Cẩm Nang Chọn Mua Bàn DJ Phù Hợp Nhu Cầu & Ngân Sách
              </h2>
            </div>

            <div
              style={{
                backgroundColor: "rgba(18, 18, 22, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "16px",
                padding: "36px",
                display: "flex",
                flexDirection: "column",
                gap: "28px",
                fontSize: "14.5px",
                color: "#d4d4d8",
                lineHeight: 1.75,
              }}
            >
              <div>
                <h3 style={{ fontSize: "18px", color: "#22c55e", margin: "0 0 10px 0", fontWeight: 700 }}>
                  1. Người mới bắt đầu học DJ nên chọn mua bàn DJ nào?
                </h3>
                <p style={{ margin: 0 }}>
                  Nếu bạn là người mới bắt đầu tìm hiểu về nghệ thuật DJ hoặc đang cần một thiết bị nhỏ gọn để luyện tập tại phòng riêng, phân khúc <strong>DJ Controller 2 kênh</strong> là sự khởi đầu hoàn hảo nhất. Nổi bật nhất là mẫu{" "}
                  <Link href="/products/ddj-flx4" style={{ color: "#38bdf8", fontWeight: 600, textDecoration: "underline" }}>
                    Pioneer DDJ-FLX4
                  </Link>{" "}
                  (mẫu máy quốc dân tích hợp Smart Fader và Smart CFX hỗ trợ thao tác chuyển bài mượt mà) và mẫu{" "}
                  <Link href="/products/ddj-flx2" style={{ color: "#38bdf8", fontWeight: 600, textDecoration: "underline" }}>
                    AlphaTheta DDJ-FLX2
                  </Link>{" "}
                  (siêu gọn nhẹ kết nối Bluetooth không dây với iPhone, iPad). Chi phí đầu tư chỉ từ 5 đến 9 triệu đồng, cắm trực tiếp vào laptop chạy phần mềm Rekordbox hoặc Serato DJ.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "18px", color: "#22c55e", margin: "0 0 10px 0", fontWeight: 700 }}>
                  2. Khi nào nên đầu tư hệ thống All-In-One cắm USB độc lập?
                </h3>
                <p style={{ margin: 0 }}>
                  Dòng bàn DJ All-In-One (như{" "}
                  <Link href="/products/xdj-rx3" style={{ color: "#38bdf8", fontWeight: 600, textDecoration: "underline" }}>
                    Pioneer DJ XDJ-RX3
                  </Link>
                  ,{" "}
                  <Link href="/products/omnis-duo" style={{ color: "#38bdf8", fontWeight: 600, textDecoration: "underline" }}>
                    AlphaTheta OMNIS-DUO
                  </Link>
                  ,{" "}
                  <Link href="/products/xdj-az" style={{ color: "#38bdf8", fontWeight: 600, textDecoration: "underline" }}>
                    AlphaTheta XDJ-AZ 4 kênh
                  </Link>
                  ) sinh ra dành cho các DJ đi show thực chiến, Bar, Pub, Lounge, Villa Party và các sự kiện tiệc cưới cao cấp. Ưu điểm vượt trội:
                </p>
                <ul style={{ margin: "10px 0 0 20px", padding: 0 }}>
                  <li style={{ marginBottom: "6px" }}>
                    <strong>Độ ổn định tuyệt đối:</strong> Máy tích hợp màn hình cảm ứng độ phân giải cao và chip xử lý độc lập, cắm USB là chơi trực tiếp, không bao giờ phải lo máy tính bị sập nguồn, virus hay đơ lag giữa đêm diễn.
                  </li>
                  <li style={{ marginBottom: "6px" }}>
                    <strong>Giao diện chuẩn Club:</strong> Bố cục phím bấm, mâm xoay và hệ thống hiệu ứng Effect thừa hưởng 100% từ cặp đôi huyền thoại CDJ-3000 và DJM-900NXS2 / DJM-A9.
                  </li>
                  <li>
                    <strong>Tùy chọn di động:</strong> Mẫu <em>OMNIS-DUO</em> còn trang bị pin 5 giờ và Bluetooth không dây, cực kỳ tiện lợi cho các buổi tiệc ngoài bãi biển, du thuyền.
                  </li>
                </ul>
              </div>

              <div>
                <h3 style={{ fontSize: "18px", color: "#22c55e", margin: "0 0 10px 0", fontWeight: 700 }}>
                  3. Mối quan hệ giữa thương hiệu Pioneer DJ và AlphaTheta
                </h3>
                <p style={{ margin: 0 }}>
                  Nhiều khách hàng thường thắc mắc thương hiệu AlphaTheta có phải là hàng nhái hay thương hiệu mới? Thực tế, <strong>AlphaTheta Corporation chính là tập đoàn mẹ sở hữu thương hiệu Pioneer DJ</strong> từ năm 2014. Từ năm 2024, hãng bắt đầu tung ra các sản phẩm đột phá dưới tên thương hiệu chính thức AlphaTheta (như DDJ-FLX2, Omnis-Duo, XDJ-AZ) song song với các thiết bị mang tên Pioneer DJ. Cả hai đều dùng chung linh kiện chuẩn Nhật Bản, chia sẻ hệ sinh thái phần mềm Rekordbox và có cùng tiêu chuẩn bảo hành chính hãng.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: "18px", color: "#22c55e", margin: "0 0 10px 0", fontWeight: 700 }}>
                  4. Nên mua bàn DJ mới 100% đập hộp hay Like New 98-99% tiết kiệm?
                </h3>
                <p style={{ margin: 0 }}>
                  Tại VanMusic, chúng tôi cung cấp minh bạch cả 2 phương án để khách hàng lựa chọn:
                </p>
                <ul style={{ margin: "10px 0 0 20px", padding: 0 }}>
                  <li style={{ marginBottom: "6px" }}>
                    <strong>Máy mới 100% Fullbox:</strong> Nguyên seal từ nhà máy, bảo hành 12 - 24 tháng chính hãng, mang lại sự yên tâm tuyệt đối cho khách hàng muốn sở hữu thiết bị mới nhất.
                  </li>
                  <li>
                    <strong>Máy Like New 98-99% tuyển chọn:</strong> Tiết kiệm từ 20% đến 35% chi phí đầu tư. Mỗi chiếc máy lướt tại VanMusic đều được kỹ thuật viên mở máy vệ sinh, đo fader Alps, test cảm ứng jogwheel và bảo hành kỹ thuật 6 - 12 tháng rõ ràng.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: CHÍNH SÁCH BÁN HÀNG & HẬU MÃI ĐỘC QUYỀN TẠI VANMUSIC
           ========================================================================= */}
        <section
          style={{
            padding: "70px 0",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            backgroundColor: "#09090b",
          }}
        >
          <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 20px" }}>
            <div style={{ textAlign: "center", marginBottom: "45px" }}>
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
                DỊCH VỤ KHÁCH HÀNG
              </span>
              <h2
                style={{
                  fontSize: "clamp(24px, 3.4vw, 34px)",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                  margin: 0,
                  textTransform: "uppercase",
                }}
              >
                Chính Sách Bán Hàng & Hậu Mãi Toàn Diện
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "24px",
              }}
            >
              <div
                style={{
                  backgroundColor: "rgba(18, 18, 22, 0.85)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "28px",
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>🛡️</div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", marginBottom: "10px" }}>
                  Chính Sách Bảo Hành Chính Hãng
                </h3>
                <p style={{ fontSize: "13.5px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
                  Bảo hành từ 12 đến 24 tháng cho máy mới và 6 đến 12 tháng cho máy like new. Đội ngũ kỹ thuật viên tay nghề cao ngay tại Đà Nẵng, sẵn sàng linh kiện thay thế fader Alps, cảm ứng jogwheel chuẩn chính hãng lấy liền.
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(18, 18, 22, 0.85)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "28px",
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>🚀</div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", marginBottom: "10px" }}>
                  Giao Hàng Hỏa Tốc & Bàn Giao Tận Nơi
                </h3>
                <p style={{ fontSize: "13.5px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
                  Giao nhanh trong 2 giờ tại khu vực nội thành Đà Nẵng, Hội An, Thừa Thiên Huế. Hỗ trợ ship COD toàn quốc kiểm tra máy trước khi thanh toán. Kỹ thuật viên hỗ trợ setup kết nối dàn loa âm thanh tận nhà.
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(18, 18, 22, 0.85)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "28px",
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>🔄</div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", marginBottom: "10px" }}>
                  Thu Cũ Đổi Mới & Trả Góp 0%
                </h3>
                <p style={{ fontSize: "13.5px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
                  Hỗ trợ chương trình Trade-in thu cũ đổi mới trợ giá cao nhất thị trường cho khách hàng muốn lên đời bàn DJ cao cấp hơn. Thanh toán trả góp 0% qua thẻ tín dụng hơn 25 ngân hàng hoặc căn cước công dân.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: DỊCH VỤ BỔ TRỢ (CROSS-LINKING: THUÊ & SỬA CHỮA BÀN DJ)
           ========================================================================= */}
        <section
          style={{
            padding: "60px 0",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            backgroundColor: "#0d0e12",
          }}
        >
          <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 20px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "24px",
              }}
            >
              <div
                style={{
                  backgroundColor: "rgba(34, 197, 94, 0.06)",
                  border: "1px solid rgba(34, 197, 94, 0.28)",
                  borderRadius: "14px",
                  padding: "28px",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#22c55e",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                  }}
                >
                  DỊCH VỤ CHO THUÊ SỰ KIỆN
                </span>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", margin: "8px 0 10px 0" }}>
                  Cần Thuê Bàn DJ Ngắn Ngày Tại Đà Nẵng & Huế?
                </h3>
                <p style={{ fontSize: "13.5px", color: "#a1a1aa", lineHeight: 1.6, margin: "0 0 18px 0" }}>
                  Nếu bạn chỉ cần sử dụng máy cho show diễn, tiệc sinh nhật, pool party, đám cưới hoặc sự kiện ngắn ngày, hãy xem ngay bảng giá cho thuê máy mới 99% giá chỉ từ 400k/ngày, giao và setup tận nơi 24/7.
                </p>
                <Link
                  href="/thue-ban-dj"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#22c55e",
                    fontWeight: 700,
                    fontSize: "14px",
                    textDecoration: "none",
                  }}
                >
                  <span>Xem Bảng Giá Thuê Bàn DJ Đà Nẵng</span>
                  <span>&rarr;</span>
                </Link>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(56, 189, 248, 0.06)",
                  border: "1px solid rgba(56, 189, 248, 0.28)",
                  borderRadius: "14px",
                  padding: "28px",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#38bdf8",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                  }}
                >
                  TRUNG TÂM KỸ THUẬT & SỬA CHỮA
                </span>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", margin: "8px 0 10px 0" }}>
                  Sửa Chữa Bàn DJ & Thay Fader Chính Hãng
                </h3>
                <p style={{ fontSize: "13.5px", color: "#a1a1aa", lineHeight: 1.6, margin: "0 0 18px 0" }}>
                  VanMusic sở hữu trạm kỹ thuật sửa chữa bàn DJ chuyên nghiệp tại Đà Nẵng: thay fader Alps chính hãng, cân chỉnh jogwheel, bảo dưỡng định kỳ và khắc phục các lỗi bo mạch, nguồn, âm thanh lấy liền trong ngày.
                </p>
                <Link
                  href="/sua-chua-ban-dj"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#38bdf8",
                    fontWeight: 700,
                    fontSize: "14px",
                    textDecoration: "none",
                  }}
                >
                  <span>Dịch Vụ Sửa Chữa Bàn DJ Đà Nẵng</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: SHOWROOM & ĐỊA ĐIỂM TRẢI NGHIỆM THỰC TẾ (LOCAL SEO)
           ========================================================================= */}
        <section
          style={{
            padding: "60px 0",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            backgroundColor: "#09090b",
          }}
        >
          <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 20px" }}>
            <div
              style={{
                backgroundColor: "rgba(18, 18, 22, 0.9)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "16px",
                padding: "36px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "30px",
                alignItems: "center",
              }}
            >
              <div>
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
                  ĐỊA CHỈ SHOWROOM CHÍNH THỨC
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-primary)",
                    fontSize: "24px",
                    fontWeight: 800,
                    color: "#ffffff",
                    letterSpacing: "-0.02em",
                    margin: "0 0 14px 0",
                  }}
                >
                  Ghé Thăm Showroom VanMusic Tại Đà Nẵng & Huế
                </h3>
                <p style={{ fontSize: "14px", color: "#a1a1aa", lineHeight: 1.7, margin: "0 0 20px 0" }}>
                  Mời bạn ghé trực tiếp showroom để trò chuyện cùng chuyên viên kỹ thuật, test thử mâm xoay, fader và trải nghiệm thực tế mọi dòng máy trước khi quyết định mua.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ fontSize: "18px" }}>📍</span>
                    <div>
                      <strong style={{ color: "#ffffff" }}>Showroom Đà Nẵng:</strong>
                      <div style={{ color: "#d4d4d8" }}>Nguyễn Tất Thành, Phường Thanh Khê Tây, Quận Thanh Khê, TP. Đà Nẵng</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ fontSize: "18px" }}>📍</span>
                    <div>
                      <strong style={{ color: "#ffffff" }}>Showroom Thừa Thiên Huế:</strong>
                      <div style={{ color: "#d4d4d8" }}>442 Chi Lăng, Phường Phú Hậu, TP. Huế</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ fontSize: "18px" }}>📞</span>
                    <div>
                      <strong style={{ color: "#ffffff" }}>Hotline / Zalo Tư Vấn:</strong>
                      <div>
                        <a href={`tel:${hotline}`} style={{ color: "#22c55e", fontWeight: 700, textDecoration: "none" }}>
                          0706 067 799
                        </a>{" "}
                        <span style={{ color: "#71717a" }}>(Hỗ trợ tư vấn 24/7)</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ fontSize: "18px" }}>⏰</span>
                    <div>
                      <strong style={{ color: "#ffffff" }}>Giờ Mở Cửa:</strong>
                      <div style={{ color: "#d4d4d8" }}>08:30 – 21:00 (Từ Thứ 2 đến Chủ Nhật)</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact Form Card */}
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "26px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "36px", marginBottom: "10px" }}>💬</div>
                <h4 style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", margin: "0 0 8px 0" }}>
                  Cần Báo Giá Mua Bàn DJ Nhanh Nhất?
                </h4>
                <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, margin: "0 0 20px 0" }}>
                  Nhắn tin qua Zalo hoặc Messenger để nhận bảng báo giá chi tiết kèm ưu đãi tặng kèm quà tặng ngay hôm nay!
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <a
                    href={zaloUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-primary"
                    style={{
                      padding: "12px",
                      fontSize: "14px",
                      fontWeight: 700,
                      borderRadius: "8px",
                      textAlign: "center",
                      textDecoration: "none",
                      backgroundColor: "#0068ff",
                      color: "#ffffff",
                    }}
                  >
                    Chat Zalo Nhận Báo Giá Ngay
                  </a>
                  <a
                    href={messengerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-secondary"
                    style={{
                      padding: "12px",
                      fontSize: "14px",
                      fontWeight: 600,
                      borderRadius: "8px",
                      textAlign: "center",
                      textDecoration: "none",
                      backgroundColor: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "#ffffff",
                    }}
                  >
                    Nhắn Tin Qua Facebook Messenger
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: CÂU HỎI THƯỜNG GẶP (VISUAL FAQ ACCORDION - SCHEMA MATCHED)
           ========================================================================= */}
        <section
          style={{
            padding: "70px 0 90px 0",
            backgroundColor: "#0d0e12",
          }}
        >
          <div className="container" style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 20px" }}>
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
                GIẢI ĐÁP THẮC MẮC
              </span>
              <h2
                style={{
                  fontSize: "clamp(24px, 3.4vw, 34px)",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                  margin: 0,
                  textTransform: "uppercase",
                }}
              >
                Câu Hỏi Thường Gặp Khi Mua Bàn DJ Tại VanMusic
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {FAQS.map((faq, index) => (
                <details
                  key={index}
                  style={{
                    backgroundColor: "rgba(18, 18, 22, 0.85)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "12px",
                    padding: "18px 22px",
                    transition: "border-color 0.2s ease",
                  }}
                >
                  <summary
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#f4f4f5",
                      cursor: "pointer",
                      outline: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>{faq.q}</span>
                    <span style={{ color: "#22c55e", fontSize: "18px", marginLeft: "12px" }}>+</span>
                  </summary>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#a1a1aa",
                      lineHeight: 1.7,
                      margin: "14px 0 0 0",
                      paddingTop: "12px",
                      borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                    }}
                  >
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
