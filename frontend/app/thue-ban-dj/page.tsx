import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RentalFleetHero from "./RentalFleetHero";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

export const metadata: Metadata = {
  title: "Thuê Bàn DJ Đà Nẵng, Huế & Miền Trung Uy Tín Giá Rẻ | Pioneer XDJ-RX3, DDJ-FLX4, Omnis-Duo, XDJ-AZ | VanBass",
  description:
    "Dịch vụ cho thuê bàn DJ & thiết bị âm thanh DJ chuyên nghiệp tại Đà Nẵng, Thừa Thiên Huế, Hội An & Miền Trung: Pioneer DJ XDJ-RX3, XDJ-RX2, XDJ-RR, DDJ-FLX4, DDJ-FLX2, AlphaTheta Omnis-Duo, XDJ-AZ, CDJ-3000, loa biểu diễn B&C Speakers giá rẻ từ 400k/ngày. Thiết bị mới 99%, giao nhận và setup tận nơi 24/7.",
  keywords: [
    // Target Hot Keys
    "XDJ RX3",
    "xdj rx3",
    "thuê xdj rx3",
    "XDJ RX2",
    "xdj rx2",
    "thuê xdj rx2",
    "XDJ RR",
    "xdj rr",
    "DDJ FLX4",
    "ddj flx4",
    "thuê ddj flx4",
    "DDJ FLX2",
    "ddj flx2",
    "OMNIS DUO",
    "omnis duo",
    "AlphaTheta Omnis-Duo",
    "XDJ AZ",
    "xdj az",
    "AlphaTheta XDJ-AZ",
    "XDJ AN",
    "xdj an",
    // Tiếng Việt Cho Thuê Thiết Bị DJ - Đà Nẵng, Huế, Hội An & Miền Trung
    "thuê bàn dj",
    "thue ban dj",
    "thuê bàn dj đà nẵng",
    "thue ban dj da nang",
    "thuê bàn dj huế",
    "thue ban dj hue",
    "thuê bàn dj thừa thiên huế",
    "cho thuê bàn dj huế",
    "thuê dj huế",
    "thuê thiết bị dj huế",
    "thuê bàn dj miền trung",
    "thue ban dj mien trung",
    "cho thuê bàn dj miền trung",
    "thuê thiết bị dj miền trung",
    "thuê âm thanh dj miền trung",
    "cho thuê bàn dj",
    "cho thuê bàn dj đà nẵng",
    "thuê bàn dj hội an",
    "thuê bàn dj quảng nam",
    "thuê bàn dj quảng trị",
    "thuê bàn dj quảng bình",
    "thuê bàn dj quy nhơn",
    "thuê dj đà nẵng",
    "thue dj da nang",
    "thuê thiết bị dj",
    "cho thuê thiết bị dj đà nẵng",
    "bảng giá thuê bàn dj đà nẵng",
    "bảng giá thuê bàn dj huế",
    "báo giá thuê bàn dj",
    "giá thuê bàn dj đà nẵng",
    "thuê bàn dj theo ngày",
    "thuê bàn dj theo tháng",
    "thuê bàn dj uy tín đà nẵng",
    "thuê bàn dj all in one",
    "thuê bàn dj độc lập",
    "thuê bàn dj không cần máy tính",
    "thuê bàn dj giá rẻ",
    "thuê cdj 3000 đà nẵng",
    "thuê cdj 3000 huế",
    "thuê mixer dj đà nẵng",
    "thuê mâm đĩa than đà nẵng",
    "thuê loa dj đà nẵng",
    "thuê loa dj huế",
    "cho thuê loa biểu diễn đà nẵng",
    "bàn dj pioneer",
    "vanbass rental fleet",
    "vanbass music center",
    // English DJ Gear Rental
    "DJ equipment rental Da Nang",
    "DJ gear rental Da Nang",
    "DJ equipment rental Hue",
    "DJ gear rental Hue",
    "DJ equipment rental Central Vietnam",
    "DJ gear rental Central Vietnam",
    "Rent DJ controller Da Nang",
    "DJ gear hire Vietnam",
    "Rent Pioneer XDJ RX3 Da Nang",
    "Rent DDJ FLX4 Da Nang",
    "Rent Omnis Duo Da Nang",
    "Rent XDJ AZ Da Nang",
    "Rent Pioneer CDJ Da Nang",
    "DJ deck hire Da Nang",
    "DJ deck hire Hue",
    "DJ equipment rental near me Da Nang",
    "Where to rent DJ equipment in Da Nang",
    "DJ gear hire Hoi An",
    "Sound equipment rental Da Nang",
    "Sound equipment rental Central Vietnam",
    "All in one DJ system rental Da Nang",
    "Expat DJ gear rental Vietnam",
  ],
  alternates: {
    canonical: "/thue-ban-dj",
  },
  openGraph: {
    title: "Thuê Bàn DJ Đà Nẵng, Huế & Miền Trung Uy Tín Giá Rẻ | Pioneer XDJ-RX3, DDJ-FLX4, Omnis-Duo, XDJ-AZ | VanBass",
    description:
      "Dịch vụ cho thuê bàn DJ Đà Nẵng, Huế, Hội An & Miền Trung từ 400k/ngày: Pioneer DJ XDJ-RX3, RX2, RR, DDJ-FLX4, FLX2, Omnis-Duo, XDJ-AZ, loa B&C Speakers. Máy mới 99%, setup tận nơi 24/7. English support available.",
    url: `${baseUrl}/thue-ban-dj`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/images/rental/rental_fleet_hero.jpg`,
        width: 1200,
        height: 675,
        alt: "VanBass Rental Fleet - Thuê Bàn DJ Đà Nẵng & DJ Gear Rental Vietnam",
      },
    ],
  },
};

const rentalFaqs = [
  {
    q: "Thuê bàn DJ tại VanBass có những dòng máy nào (XDJ-RX3, RX2, RR, FLX4, FLX2, Omnis-Duo, XDJ-AZ)?",
    a: "VanBass cung cấp đầy đủ mọi phân khúc bàn DJ chuyên nghiệp: Từ DJ Controller nhỏ gọn (Pioneer DDJ-FLX4, DDJ-FLX2, DDJ-400, DDJ-FLX6), đến hệ thống All-In-One cao cấp độc lập không cần máy tính (Pioneer DJ XDJ-RX3, XDJ-RX2, XDJ-RR, AlphaTheta OMNIS-DUO không dây pin tích hợp, AlphaTheta XDJ-AZ 4 kênh), và dàn Club/Festival Standard quốc tế (Pioneer CDJ-3000 + DJM-A9).",
  },
  {
    q: "Can foreigners, tourists, or expat DJs rent equipment in Da Nang & Hoi An?",
    a: "Yes, absolutely! VanBass offers full English support for international DJs and tourists. You can rent Pioneer DJ XDJ-RX3, DDJ-FLX4, Omnis-Duo with a simple passport or hotel verification process. We deliver and setup directly to your hotel, villa, or beach party venue 24/7.",
  },
  {
    q: "Giá thuê bàn DJ tại VanBass là bao nhiêu một ngày (24h)?",
    a: "Bảng giá thuê bàn DJ tại VanBass rất cạnh tranh: Dòng Controller như Pioneer DDJ-FLX4, DDJ-FLX2 từ 400.000đ/ngày; Dòng All-In-One cao cấp như Pioneer XDJ-RX3, AlphaTheta Omnis-Duo từ 1.200.000đ/ngày; Dòng 4 kênh như XDJ-XZ / XDJ-AZ từ 1.800.000đ/ngày. Giảm 20% - 40% khi thuê dài ngày.",
  },
  {
    q: "Thủ tục và hồ sơ thuê bàn DJ như thế nào?",
    a: "Thủ tục thuê tại VanBass cực kỳ đơn giản và nhanh gọn: Khách hàng chỉ cần xuất trình Căn cước công dân (CCCD)/Hộ chiếu (Passport) và đặt cọc linh hoạt. Chúng tôi có hợp đồng và biên bản bàn giao, kiểm tra máy rõ ràng.",
  },
  {
    q: "VanBass có hỗ trợ giao máy và hướng dẫn setup tận nơi không?",
    a: "Có! VanBass hỗ trợ giao hàng, lắp đặt, kết nối hệ thống âm thanh loa và sound check tận nơi tại khu vực Đà Nẵng, Hội An và lân cận 24/7. Hỗ trợ ship nhanh liên tỉnh.",
  },
  {
    q: "Thiết bị bàn DJ cho thuê có chất lượng và phụ kiện như thế nào?",
    a: "100% thiết bị tại VanBass là hàng chính hãng Pioneer DJ / AlphaTheta, mới 98-99%, được kỹ thuật viên bảo dưỡng fader và linh kiện kỹ lưỡng trước khi giao. Đi kèm đầy đủ dây nguồn, dây tín hiệu RCA/XLR, cáp USB và hộp chống sốc chuyên dụng.",
  },
];

export default function ThueBanDjPage() {
  const messengerUrl = "https://m.me/vanbassmusiccenter";
  const hotline = "0706067799";

  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Service", "LocalBusiness"],
        "@id": `${baseUrl}/thue-ban-dj#service`,
        "name": "Dịch Vụ Cho Thuê Bàn DJ & Thiết Bị Âm Thanh Sự Kiện Đà Nẵng - VanBass",
        "url": `${baseUrl}/thue-ban-dj`,
        "provider": {
          "@type": ["MusicStore", "LocalBusiness"],
          "name": "VanBass Music Center",
          "url": baseUrl,
          "telephone": "+84706067799",
          "priceRange": "400.000đ - 1.800.000đ",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Đà Nẵng",
            "addressLocality": "Đà Nẵng",
            "addressRegion": "Đà Nẵng",
            "addressCountry": "VN",
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "16.054407",
            "longitude": "108.202167",
          },
        },
        "description":
          "Dịch vụ cho thuê bàn DJ Pioneer DJ XDJ-RX3, DDJ-FLX4, XDJ-XZ, CDJ-3000 phục vụ sự kiện, tiệc cưới, sinh nhật, bar pub, workshop.",
        "areaServed": "VN",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Các Gói Thuê Bàn DJ",
          "itemListElement": [
            {
              "@type": "Offer",
              "name": "Thuê Bàn DJ Pioneer XDJ-RX3 All-In-One",
              "price": "1200000",
              "priceCurrency": "VND",
              "availability": "https://schema.org/InStock",
            },
            {
              "@type": "Offer",
              "name": "Thuê Bàn DJ Pioneer DDJ-FLX4 Controller",
              "price": "400000",
              "priceCurrency": "VND",
              "availability": "https://schema.org/InStock",
            },
            {
              "@type": "Offer",
              "name": "Thuê Bàn DJ Pioneer DJ XDJ-XZ 4-Channel",
              "price": "1800000",
              "priceCurrency": "VND",
              "availability": "https://schema.org/InStock",
            },
          ],
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/thue-ban-dj#faq`,
        "mainEntity": rentalFaqs.map((faq) => ({
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
        "@id": `${baseUrl}/thue-ban-dj#breadcrumb`,
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
            "name": "Thuê Bàn DJ",
            "item": `${baseUrl}/thue-ban-dj`,
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
            SECTION 1: KHỐI ĐẦU TIÊN (HỖ TRỢ SONG NGỮ ANH-VIỆT VỚI USELANGUAGE)
            - Mặc định tiếng Việt: Gói Theo Ngày, Gói Cuối Tuần, Gói Sự Kiện, Thuê Ngay
            - Tự động chuyển đổi sang tiếng Anh khi chọn LanguageSwitcher
            - Bàn DJ góc phải có hiệu ứng cắt mép và H1 chữ xám thanh lịch
           ========================================================================= */}
        <RentalFleetHero messengerUrl={messengerUrl} hotline={hotline} />


        {/* =========================================================================
            SECTION 2: DANH MỤC THIẾT BỊ LẺ CHO THUÊ (THEO ẢNH BẠN GỬI)
           ========================================================================= */}
        <section
          id="individual-gear"
          style={{
            padding: "85px 0",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            backgroundColor: "#09090b",
          }}
        >
          <div className="container" style={{ maxWidth: "1240px", margin: "0 auto" }}>
            
            {/* Header Lockup - Chuẩn xác từ ảnh khách hàng gửi */}
            <div style={{ textAlign: "center", marginBottom: "50px" }}>
              <span
                style={{
                  color: "#22c55e",
                  fontSize: "12px",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  display: "inline-block",
                  marginBottom: "8px",
                }}
              >
                DANH MỤC THIẾT BỊ NỔI BẬT
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                  fontSize: "clamp(26px, 3.6vw, 40px)",
                  fontWeight: 900,
                  color: "#ffffff",
                  letterSpacing: "-0.03em",
                  margin: 0,
                  textTransform: "uppercase",
                }}
              >
                Các Dòng Bàn DJ Cho Thuê Được Yêu Thích Nhất
              </h2>
              <p style={{ color: "#a1a1aa", fontSize: "15px", maxWidth: "650px", margin: "12px auto 0 auto", lineHeight: 1.6 }}>
                Từ các dòng DJ Controller 2 kênh nhỏ gọn đến dàn máy All-In-One và CDJ Flagship chuẩn quốc tế.
              </p>
            </div>

            {/* Grid 4 Cards thiết bị lẻ theo đúng nội dung ảnh */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              {/* CARD 1: PIONEER DJ XDJ-RX3 */}
              <div
                style={{
                  backgroundColor: "rgba(18, 18, 22, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.09)",
                  borderRadius: "14px",
                  padding: "26px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                }}
              >
                {/* Badge top right */}
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    backgroundColor: "rgba(34, 197, 94, 0.15)",
                    color: "#4ade80",
                    border: "1px solid #22c55e",
                    fontSize: "11px",
                    fontWeight: 800,
                    padding: "4px 10px",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  HOT NHẤT - BIỂU DIỄN
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
                    borderRadius: "10px",
                    padding: "16px",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/products/xdj-rx3.png"
                    alt="Bàn DJ Pioneer DJ XDJ-RX3 All-In-One"
                    style={{ maxWidth: "100%", maxHeight: "155px", objectFit: "contain" }}
                  />
                </div>

                <span style={{ fontSize: "11.5px", color: "#22c55e", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  ALL-IN-ONE SYSTEM
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                    fontSize: "21px",
                    fontWeight: 800,
                    color: "#ffffff",
                    margin: "6px 0 12px 0",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Pioneer DJ XDJ-RX3
                </h3>
                <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, flex: 1, marginBottom: "22px" }}>
                  Hệ thống 2 kênh độc lập cao cấp với màn hình cảm ứng 10.1 inch, giao diện mượt mà từ CDJ-3000,
                  Release FX chuyên nghiệp. Cắm USB là chơi, không cần laptop.
                </p>

                {/* Price Bar */}
                <div
                  style={{
                    padding: "14px 0",
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                    marginBottom: "20px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: "12px", color: "#71717a" }}>Giá thuê tham khảo:</span>
                    <div>
                      <span style={{ fontSize: "24px", fontWeight: 900, color: "#22c55e", letterSpacing: "-0.02em" }}>1.200.000đ</span>
                      <span style={{ fontSize: "12px", color: "#a1a1aa" }}> / 24h</span>
                    </div>
                  </div>
                </div>

                {/* Dual Buttons */}
                <div style={{ display: "flex", gap: "10px" }}>
                  <a
                    href={`https://m.me/vanbassmusiccenter?text=Toi%20muon%20thue%20ban%20DJ%20Pioneer%20XDJ-RX3`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-primary"
                    style={{ flex: 1, textAlign: "center", padding: "11px 14px", fontSize: "13.5px", fontWeight: 700 }}
                  >
                    Thuê RX3 Ngay
                  </a>
                  <Link
                    href="/products/xdj-rx3"
                    className="button button-secondary"
                    style={{
                      padding: "11px 14px",
                      fontSize: "13px",
                      fontWeight: 600,
                      backgroundColor: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                    title="Chi tiết máy"
                  >
                    Chi tiết
                  </Link>
                </div>
              </div>

              {/* CARD 2: PIONEER DDJ-FLX4 */}
              <div
                style={{
                  backgroundColor: "rgba(18, 18, 22, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.09)",
                  borderRadius: "14px",
                  padding: "26px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                }}
              >
                {/* Badge top right */}
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    backgroundColor: "rgba(34, 197, 94, 0.15)",
                    color: "#4ade80",
                    border: "1px solid #22c55e",
                    fontSize: "11px",
                    fontWeight: 800,
                    padding: "4px 10px",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  TIẾT KIỆM - WORKSHOP
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
                    borderRadius: "10px",
                    padding: "16px",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/products/ddj-flx4.png"
                    alt="DJ Pioneer DDJ-FLX4 – DJ Controller"
                    style={{ maxWidth: "100%", maxHeight: "155px", objectFit: "contain" }}
                  />
                </div>

                <span style={{ fontSize: "11.5px", color: "#22c55e", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  DJ CONTROLLER 2-CHANNEL
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                    fontSize: "21px",
                    fontWeight: 800,
                    color: "#ffffff",
                    margin: "6px 0 12px 0",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Pioneer DDJ-FLX4
                </h3>
                <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, flex: 1, marginBottom: "22px" }}>
                  Bộ điều khiển bán chạy nhất thế giới dành cho người mới và biểu diễn tiệc nhỏ. Hỗ trợ Rekordbox & Serato DJ,
                  tích hợp Smart Fader & Smart CFX giúp chuyển bài siêu mượt.
                </p>

                {/* Price Bar */}
                <div
                  style={{
                    padding: "14px 0",
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                    marginBottom: "20px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: "12px", color: "#71717a" }}>Giá thuê tham khảo:</span>
                    <div>
                      <span style={{ fontSize: "24px", fontWeight: 900, color: "#22c55e", letterSpacing: "-0.02em" }}>400.000đ</span>
                      <span style={{ fontSize: "12px", color: "#a1a1aa" }}> / 24h</span>
                    </div>
                  </div>
                </div>

                {/* Dual Buttons */}
                <div style={{ display: "flex", gap: "10px" }}>
                  <a
                    href={`https://m.me/vanbassmusiccenter?text=Toi%20muon%20thue%20ban%20DJ%20Pioneer%20DDJ-FLX4`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-primary"
                    style={{ flex: 1, textAlign: "center", padding: "11px 14px", fontSize: "13.5px", fontWeight: 700 }}
                  >
                    Thuê FLX4 Ngay
                  </a>
                  <Link
                    href="/products/ddj-flx4"
                    className="button button-secondary"
                    style={{
                      padding: "11px 14px",
                      fontSize: "13px",
                      fontWeight: 600,
                      backgroundColor: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                    title="Chi tiết máy"
                  >
                    Chi tiết
                  </Link>
                </div>
              </div>

              {/* CARD 3: PIONEER DJ XDJ-XZ */}
              <div
                style={{
                  backgroundColor: "rgba(18, 18, 22, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.09)",
                  borderRadius: "14px",
                  padding: "26px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                }}
              >
                {/* Badge top right */}
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    color: "#f4f4f5",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    fontSize: "11px",
                    fontWeight: 800,
                    padding: "4px 10px",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  CHUẨN CLUB 4 KÊNH
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
                    borderRadius: "10px",
                    padding: "16px",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/products/xdj-xz.png"
                    alt="Pioneer DJ XDJ-XZ 4-Channel System"
                    style={{ maxWidth: "100%", maxHeight: "155px", objectFit: "contain" }}
                  />
                </div>

                <span style={{ fontSize: "11.5px", color: "#22c55e", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  ALL-IN-ONE 4-CHANNEL
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                    fontSize: "21px",
                    fontWeight: 800,
                    color: "#ffffff",
                    margin: "6px 0 12px 0",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Pioneer DJ XDJ-XZ
                </h3>
                <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, flex: 1, marginBottom: "22px" }}>
                  Hệ thống 4 kênh All-In-One đỉnh cao với mâm xoay Full-size từ CDJ-2000NXS2, On-Jog display màu,
                  bộ xử lý âm thanh 64-bit chuẩn phòng thu. Thích hợp cho Bar, Pub, Wedding cao cấp.
                </p>

                {/* Price Bar */}
                <div
                  style={{
                    padding: "14px 0",
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                    marginBottom: "20px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: "12px", color: "#71717a" }}>Giá thuê tham khảo:</span>
                    <div>
                      <span style={{ fontSize: "24px", fontWeight: 900, color: "#22c55e", letterSpacing: "-0.02em" }}>1.800.000đ</span>
                      <span style={{ fontSize: "12px", color: "#a1a1aa" }}> / 24h</span>
                    </div>
                  </div>
                </div>

                {/* Dual Buttons */}
                <div style={{ display: "flex", gap: "10px" }}>
                  <a
                    href={`https://m.me/vanbassmusiccenter?text=Toi%20muon%20thue%20ban%20DJ%20Pioneer%20XDJ-XZ`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-primary"
                    style={{ flex: 1, textAlign: "center", padding: "11px 14px", fontSize: "13.5px", fontWeight: 700 }}
                  >
                    Thuê XZ Ngay
                  </a>
                  <Link
                    href="/products/xdj-xz"
                    className="button button-secondary"
                    style={{
                      padding: "11px 14px",
                      fontSize: "13px",
                      fontWeight: 600,
                      backgroundColor: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                    title="Chi tiết máy"
                  >
                    Chi tiết
                  </Link>
                </div>
              </div>

              {/* CARD 4: DÀN PIONEER CDJ-3000 FLAGSHIP */}
              <div
                style={{
                  backgroundColor: "rgba(18, 18, 22, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.09)",
                  borderRadius: "14px",
                  padding: "26px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                }}
              >
                {/* Badge top right */}
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    backgroundColor: "rgba(234, 179, 8, 0.15)",
                    color: "#facc15",
                    border: "1px solid rgba(234, 179, 8, 0.35)",
                    fontSize: "11px",
                    fontWeight: 800,
                    padding: "4px 10px",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  FESTIVAL STANDARD
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
                    borderRadius: "10px",
                    padding: "16px",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/products/cdj-3000.png"
                    alt="Pioneer CDJ-3000 DJ Set"
                    style={{ maxWidth: "100%", maxHeight: "155px", objectFit: "contain" }}
                  />
                </div>

                <span style={{ fontSize: "11.5px", color: "#22c55e", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  MULTI PLAYER & MIXER
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                    fontSize: "21px",
                    fontWeight: 800,
                    color: "#ffffff",
                    margin: "6px 0 12px 0",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Dàn Pioneer CDJ-3000
                </h3>
                <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, flex: 1, marginBottom: "22px" }}>
                  Tiêu chuẩn tối thượng của các lễ hội EDM và Club hàng đầu thế giới. Bộ vi xử lý MPU tân tiến,
                  màn hình 9 inch 120Hz sắc nét kết hợp bàn Mixer DJM-900NXS2 / DJM-A9 chuyên nghiệp.
                </p>

                {/* Price Bar */}
                <div
                  style={{
                    padding: "14px 0",
                    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                    marginBottom: "20px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: "12px", color: "#71717a" }}>Giá thuê tham khảo:</span>
                    <div>
                      <span style={{ fontSize: "20px", fontWeight: 800, color: "#22c55e", letterSpacing: "-0.02em" }}>Liên hệ báo giá</span>
                    </div>
                  </div>
                </div>

                {/* Dual Buttons */}
                <div style={{ display: "flex", gap: "10px" }}>
                  <a
                    href={`https://m.me/vanbassmusiccenter?text=Toi%20muon%20thue%20dan%20Pioneer%20CDJ-3000`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-primary"
                    style={{ flex: 1, textAlign: "center", padding: "11px 14px", fontSize: "13.5px", fontWeight: 700 }}
                  >
                    Báo Giá Trọn Gói
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* =========================================================================
            SECTION 3: BẢNG GIÁ THAM KHẢO & TỐI ƯU GOOGLE AI OVERVIEWS (SEO)
           ========================================================================= */}
        <section style={{ padding: "75px 0", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", backgroundColor: "#0b0b0e" }}>
          <div className="container" style={{ maxWidth: "960px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <span style={{ color: "#22c55e", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", display: "inline-block", marginBottom: "8px" }}>
                MINH BẠCH & TẬN TÂM
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                  fontSize: "clamp(24px, 3.2vw, 34px)",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                  margin: 0,
                  textTransform: "uppercase",
                }}
              >
                Bảng Giá Thuê Bàn DJ Tham Khảo Tại Đà Nẵng
              </h2>
              <p style={{ color: "#a1a1aa", fontSize: "14px", marginTop: "10px" }}>
                Đã bao gồm đầy đủ dây jack kết nối chuyên dụng và túi chống sốc. Ưu đãi giảm 20% - 40% khi thuê dài ngày.
              </p>
            </div>

            {/* Quick Summary Box for Google AI Overview & Featured Snippets */}
            <div
              style={{
                backgroundColor: "rgba(34, 197, 94, 0.05)",
                border: "1px solid rgba(34, 197, 94, 0.25)",
                borderRadius: "12px",
                padding: "24px",
                marginBottom: "32px",
              }}
            >
              <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#4ade80", margin: "0 0 12px 0", letterSpacing: "-0.01em" }}>
                Giá thuê bàn DJ tại khu vực Đà Nẵng dao động từ 400.000 VNĐ đến 1.800.000 VNĐ mỗi ngày tùy theo dòng máy:
              </h3>
              <ul style={{ paddingLeft: "20px", margin: 0, fontSize: "13.5px", color: "#d4d4d8", lineHeight: 1.8 }}>
                <li><strong style={{ color: "#fff" }}>Dòng cơ bản / Controller nhỏ (như Pioneer DDJ-FLX4, DDJ-400 / tương đương):</strong> Khoảng 400.000 VNĐ/ngày. Thích hợp cho người mới tập chơi, tiệc gia đình, sinh nhật, workshop.</li>
                <li><strong style={{ color: "#fff" }}>Pioneer XDJ-RX2:</strong> Khoảng 700.000 VNĐ - 800.000 VNĐ/ngày. Hệ thống All-In-One 2 kênh chơi trực tiếp từ USB không cần máy tính.</li>
                <li><strong style={{ color: "#fff" }}>Pioneer XDJ-RX3:</strong> Khoảng 800.000 VNĐ - 1.200.000 VNĐ/ngày. Màn hình cảm ứng 10.1 inch mượt mà, Release FX chuyên nghiệp cho tiệc cưới, bar lounge, show sự kiện.</li>
                <li><strong style={{ color: "#fff" }}>Pioneer XDJ-XZ (4 kênh):</strong> Khoảng 1.500.000 VNĐ - 1.800.000 VNĐ/ngày. Mâm xoay Full-size, bộ xử lý âm thanh 64-bit chuẩn Club.</li>
                <li><strong style={{ color: "#fff" }}>Dàn Club Standard (2x Pioneer CDJ-3000 + Mixer DJM-900NXS2 / A9):</strong> Mức giá riêng theo thỏa thuận cho lễ hội âm nhạc và show lớn.</li>
              </ul>
            </div>

            {/* Pricing Table */}
            <div style={{ overflowX: "auto", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.08)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
                <thead>
                  <tr style={{ backgroundColor: "rgba(255, 255, 255, 0.04)", borderBottom: "2px solid #22c55e" }}>
                    <th style={{ padding: "16px", color: "#fff", fontWeight: 700 }}>Thiết Bị DJ</th>
                    <th style={{ padding: "16px", color: "#fff", fontWeight: 700 }}>Phân Loại</th>
                    <th style={{ padding: "16px", color: "#fff", fontWeight: 700 }}>Mục Đích Sử Dụng</th>
                    <th style={{ padding: "16px", color: "#fff", fontWeight: 700 }}>Giá Thuê (24h)</th>
                    <th style={{ padding: "16px", color: "#fff", fontWeight: 700 }}>Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
                    <td style={{ padding: "16px", fontWeight: 700, color: "#fff" }}>Pioneer DDJ-FLX4</td>
                    <td style={{ padding: "16px", color: "#a1a1aa" }}>DJ Controller (cần Laptop)</td>
                    <td style={{ padding: "16px", color: "#a1a1aa" }}>Tập luyện, tiệc gia đình, workshop nhỏ</td>
                    <td style={{ padding: "16px", color: "#22c55e", fontWeight: 700 }}>400.000đ</td>
                    <td style={{ padding: "16px" }}>
                      <a href="https://m.me/vanbassmusiccenter?text=Thue%20DDJ-FLX4" target="_blank" rel="noopener noreferrer" style={{ color: "#22c55e", fontWeight: 700 }}>
                        Thuê &rarr;
                      </a>
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
                    <td style={{ padding: "16px", fontWeight: 700, color: "#fff" }}>Pioneer DDJ-FLX6</td>
                    <td style={{ padding: "16px", color: "#a1a1aa" }}>DJ Controller 4 kênh</td>
                    <td style={{ padding: "16px", color: "#a1a1aa" }}>Tiệc sinh nhật, pool party, bar nhỏ</td>
                    <td style={{ padding: "16px", color: "#22c55e", fontWeight: 700 }}>650.000đ</td>
                    <td style={{ padding: "16px" }}>
                      <a href="https://m.me/vanbassmusiccenter?text=Thue%20DDJ-FLX6" target="_blank" rel="noopener noreferrer" style={{ color: "#22c55e", fontWeight: 700 }}>
                        Thuê &rarr;
                      </a>
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)", backgroundColor: "rgba(34, 197, 94, 0.04)" }}>
                    <td style={{ padding: "16px", fontWeight: 800, color: "#4ade80" }}>Pioneer DJ XDJ-RX3</td>
                    <td style={{ padding: "16px", color: "#a1a1aa" }}>All-In-One (USB Độc Lập)</td>
                    <td style={{ padding: "16px", color: "#a1a1aa" }}>Show sự kiện, Wedding, Bar Club, Lounge</td>
                    <td style={{ padding: "16px", color: "#22c55e", fontWeight: 800 }}>1.200.000đ</td>
                    <td style={{ padding: "16px" }}>
                      <a href="https://m.me/vanbassmusiccenter?text=Thue%20XDJ-RX3" target="_blank" rel="noopener noreferrer" style={{ color: "#22c55e", fontWeight: 700 }}>
                        Thuê &rarr;
                      </a>
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
                    <td style={{ padding: "16px", fontWeight: 700, color: "#fff" }}>Pioneer DJ XDJ-XZ</td>
                    <td style={{ padding: "16px", color: "#a1a1aa" }}>All-In-One 4 Kênh Flagship</td>
                    <td style={{ padding: "16px", color: "#a1a1aa" }}>Sự kiện lớn, Bar Pub, DJ chuyên nghiệp</td>
                    <td style={{ padding: "16px", color: "#22c55e", fontWeight: 700 }}>1.800.000đ</td>
                    <td style={{ padding: "16px" }}>
                      <a href="https://m.me/vanbassmusiccenter?text=Thue%20XDJ-XZ" target="_blank" rel="noopener noreferrer" style={{ color: "#22c55e", fontWeight: 700 }}>
                        Thuê &rarr;
                      </a>
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}>
                    <td style={{ padding: "16px", fontWeight: 700, color: "#fff" }}>Set 2x CDJ-3000 + DJM-900NXS2</td>
                    <td style={{ padding: "16px", color: "#a1a1aa" }}>Club Standard Quốc Tế</td>
                    <td style={{ padding: "16px", color: "#a1a1aa" }}>Lễ hội EDM, Concert, Club, DJ Quốc tế</td>
                    <td style={{ padding: "16px", color: "#22c55e", fontWeight: 700 }}>Báo giá theo Show</td>
                    <td style={{ padding: "16px" }}>
                      <a href="https://m.me/vanbassmusiccenter?text=Thue%20CDJ-3000" target="_blank" rel="noopener noreferrer" style={{ color: "#22c55e", fontWeight: 700 }}>
                        Liên hệ &rarr;
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>


        {/* =========================================================================
            SECTION 4: QUY TRÌNH 4 BƯỚC & FAQ
           ========================================================================= */}
        <section style={{ padding: "75px 0", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", backgroundColor: "#09090b" }}>
          <div className="container" style={{ maxWidth: "960px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <span style={{ color: "#22c55e", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", display: "inline-block", marginBottom: "8px" }}>
                TIỆN LỢI & NHANH CHÓNG
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                  fontSize: "clamp(24px, 3.2vw, 34px)",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                  margin: 0,
                  textTransform: "uppercase",
                }}
              >
                Quy Trình Thuê Bàn DJ (4 Bước Gọn Gàng)
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "20px" }}>
              <div style={{ padding: "26px 22px", backgroundColor: "rgba(18, 18, 22, 0.7)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "14px" }}>
                <span style={{ fontSize: "30px", color: "#22c55e", fontWeight: 900, display: "block", marginBottom: "10px" }}>01</span>
                <strong style={{ color: "#fff", fontSize: "15px", display: "block", marginBottom: "8px" }}>Chọn Máy & Ngày Thuê</strong>
                <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
                  Nhắn tin qua Messenger hoặc gọi Hotline để chọn mẫu bàn DJ (XDJ-RX3, FLX4, XZ...) và ngày nhận máy.
                </p>
              </div>

              <div style={{ padding: "26px 22px", backgroundColor: "rgba(18, 18, 22, 0.7)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "14px" }}>
                <span style={{ fontSize: "30px", color: "#22c55e", fontWeight: 900, display: "block", marginBottom: "10px" }}>02</span>
                <strong style={{ color: "#fff", fontSize: "15px", display: "block", marginBottom: "8px" }}>Xác Nhận Thủ Tục</strong>
                <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
                  Xác nhận lịch thuê, đặt cọc giữ máy (hoặc làm hợp đồng thuê thiết bị cho sự kiện). Thủ tục trong 5 phút.
                </p>
              </div>

              <div style={{ padding: "26px 22px", backgroundColor: "rgba(18, 18, 22, 0.7)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "14px" }}>
                <span style={{ fontSize: "30px", color: "#22c55e", fontWeight: 900, display: "block", marginBottom: "10px" }}>03</span>
                <strong style={{ color: "#fff", fontSize: "15px", display: "block", marginBottom: "8px" }}>Bàn Giao & Test Máy</strong>
                <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
                  Nhận máy tại showroom hoặc kỹ thuật viên giao tận nơi. Test fader, jogwheel và soundcheck âm thanh.
                </p>
              </div>

              <div style={{ padding: "26px 22px", backgroundColor: "rgba(18, 18, 22, 0.7)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "14px" }}>
                <span style={{ fontSize: "30px", color: "#22c55e", fontWeight: 900, display: "block", marginBottom: "10px" }}>04</span>
                <strong style={{ color: "#fff", fontSize: "15px", display: "block", marginBottom: "8px" }}>Hoàn Trả & Tất Toán</strong>
                <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
                  Sau khi xong show/sự kiện, VanBass nhận lại máy và hoàn trả cọc nhanh chóng cho khách hàng.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* FAQ Section */}
        <section style={{ padding: "75px 0", backgroundColor: "#0b0b0e" }}>
          <div className="container" style={{ maxWidth: "840px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <span style={{ color: "#22c55e", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", display: "inline-block", marginBottom: "8px" }}>
                GIẢI ĐÁP THẮC MẮC
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                  fontSize: "clamp(24px, 3.2vw, 34px)",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                  margin: 0,
                  textTransform: "uppercase",
                }}
              >
                Câu Hỏi Thường Gặp Về Thuê Bàn DJ
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {rentalFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "rgba(18, 18, 22, 0.75)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "12px",
                    padding: "24px",
                  }}
                >
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", margin: "0 0 10px 0" }}>
                    {faq.q}
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "#a1a1aa", lineHeight: 1.7, margin: 0 }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Contact CTA Banner */}
            <div
              style={{
                marginTop: "60px",
                padding: "40px 32px",
                backgroundColor: "rgba(18, 24, 18, 0.8)",
                border: "1px solid rgba(34, 197, 94, 0.35)",
                borderRadius: "16px",
                textAlign: "center",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                  fontSize: "24px",
                  fontWeight: 800,
                  color: "#ffffff",
                  margin: "0 0 12px 0",
                  letterSpacing: "-0.02em",
                }}
              >
                Bạn Cần Thuê Bàn DJ Hoặc Setup Âm Thanh Cho Show Sắp Tới?
              </h3>
              <p style={{ color: "#a1a1aa", fontSize: "14px", marginBottom: "26px", maxWidth: "600px", margin: "0 auto 26px auto" }}>
                Liên hệ ngay với đội ngũ kỹ thuật VanBass để được tư vấn gói thiết bị tối ưu chi phí và nhận giá ưu đãi trong ngày hôm nay!
              </p>
              <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
                <a
                  href={messengerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-primary"
                  style={{ padding: "12px 28px", borderRadius: "999px", fontWeight: 700, fontSize: "14px" }}
                >
                  Chat Trực Tiếp Qua Messenger
                </a>
                <a
                  href={`tel:${hotline}`}
                  className="button button-secondary"
                  style={{
                    padding: "12px 28px",
                    borderRadius: "999px",
                    fontWeight: 600,
                    fontSize: "14px",
                    backgroundColor: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#ffffff",
                  }}
                >
                  Hotline: 0706.067.799
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
