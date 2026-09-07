import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanbass.vercel.app";

export const metadata: Metadata = {
  title: "Thuê Bàn DJ Đà Nẵng Uy Tín Giá Rẻ | Pioneer XDJ-RX3, DDJ-FLX4",
  description:
    "Dịch vụ cho thuê bàn DJ Đà Nẵng & toàn quốc uy tín giá rẻ từ 350k/ngày: Pioneer DJ XDJ-RX3, DDJ-FLX4, XDJ-XZ, CDJ-3000. Máy mới 99%, giao và setup tận nơi 24/7, thủ tục nhanh không cần cọc.",
  keywords: [
    "thuê bàn dj",
    "thue ban dj",
    "thuê bàn dj đà nẵng",
    "thue ban dj da nang",
    "cho thuê bàn dj",
    "thuê bàn dj giá rẻ",
    "DJ PIONEER DJ XDJ-RX3",
    "DJ Pioneer DDJ-FLX4 – DJ Controller",
    "thuê pioneer xdj-rx3",
    "thuê pioneer flx4",
    "thuê bàn dj sự kiện",
    "thuê cdj 3000",
    "vanbass music center",
  ],
  alternates: {
    canonical: "/thue-ban-dj",
  },
  openGraph: {
    title: "Thuê Bàn DJ Đà Nẵng Uy Tín Giá Rẻ | Pioneer XDJ-RX3, DDJ-FLX4 | VanBass",
    description:
      "Dịch vụ cho thuê bàn DJ Đà Nẵng & toàn quốc uy tín giá rẻ từ 350k/ngày: Pioneer DJ XDJ-RX3, DDJ-FLX4, XDJ-XZ, CDJ-3000. Máy mới 99%, giao và setup tận nơi 24/7.",
    url: `${baseUrl}/thue-ban-dj`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/images/products/xdj-rx3.png`,
        width: 800,
        height: 600,
        alt: "Thuê Bàn DJ Đà Nẵng Uy Tín Giá Rẻ - VanBass",
      },
    ],
  },
};

const rentalFaqs = [
  {
    q: "Thuê bàn DJ tại VanBass có những dòng máy nào?",
    a: "VanBass cung cấp đầy đủ mọi phân khúc bàn DJ chuyên nghiệp: Từ DJ Controller nhỏ gọn (Pioneer DDJ-FLX4, DDJ-400, DDJ-FLX6) dùng với laptop, đến các hệ thống All-In-One cao cấp độc lập không cần máy tính (Pioneer DJ XDJ-RX3, XDJ-XZ, XDJ-RR), và dàn Club/Festival Standard quốc tế (Pioneer CDJ-3000 + DJM-900NXS2 hoặc DJM-A9).",
  },
  {
    q: "Giá thuê bàn DJ tại VanBass là bao nhiêu một ngày (24h)?",
    a: "Bảng giá thuê bàn DJ tại VanBass rất cạnh tranh: Dòng Controller như Pioneer DDJ-FLX4 từ 400.000đ/ngày; Dòng All-In-One cao cấp như Pioneer XDJ-RX3 từ 1.200.000đ/ngày; Dòng XDJ-XZ 4 kênh từ 1.800.000đ/ngày. Chúng tôi có chính sách giảm giá từ 20% - 40% cho khách hàng thuê từ 3 ngày trở lên hoặc theo tuần/tháng.",
  },
  {
    q: "Thủ tục và hồ sơ thuê bàn DJ như thế nào?",
    a: "Thủ tục thuê tại VanBass cực kỳ đơn giản và nhanh gọn: Khách hàng chỉ cần xuất trình Căn cước công dân (CCCD)/Hộ chiếu và đặt cọc linh hoạt (hoặc ký kết hợp đồng thuê thiết bị đối với doanh nghiệp, bar/pub, sự kiện). Chúng tôi có biên bản bàn giao và kiểm tra thiết bị rõ ràng.",
  },
  {
    q: "VanBass có hỗ trợ giao máy và hướng dẫn setup tận nơi không?",
    a: "Có! VanBass hỗ trợ giao hàng, hỗ trợ lắp đặt, kết nối hệ thống âm thanh loa và test bàn DJ tận nơi tại khu vực Đà Nẵng, Hội An và lân cận. Đối với khách hàng ở các tỉnh thành khác, chúng tôi hỗ trợ đóng gói chuyên nghiệp và ship nhanh có bảo hiểm.",
  },
  {
    q: "Thiết bị bàn DJ cho thuê có chất lượng và phụ kiện như thế nào?",
    a: "100% thiết bị tại VanBass là hàng chính hãng Pioneer DJ, mới 98-99%, được kỹ thuật viên vệ sinh fader, kiểm tra núm xoay và cổng kết nối kỹ lưỡng trước khi bàn giao. Mỗi bộ máy cho thuê đều đi kèm đầy đủ dây nguồn, dây tín hiệu RCA/XLR, cáp USB và túi/hộp chống sốc chuyên dụng.",
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
        "name": "Dịch Vụ Cho Thuê Bàn DJ Đà Nẵng & Toàn Quốc - VanBass",
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
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#090909", color: "#f5f5f0" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <Header />

      <main style={{ flex: 1, paddingTop: "110px", paddingBottom: "80px" }}>
        {/* Hero Section */}
        <section
          style={{
            background: "radial-gradient(ellipse at 50% 20%, rgba(34,197,94,0.12) 0%, rgba(9,9,9,0.9) 70%)",
            padding: "60px 0 80px 0",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="container" style={{ textAlign: "center", maxWidth: "960px", margin: "0 auto" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                borderRadius: "999px",
                backgroundColor: "rgba(34,197,94,0.1)",
                border: "1px solid rgba(34,197,94,0.3)",
                color: "#4ade80",
                fontSize: "13px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "20px",
              }}
            >
              Dịch Vụ Cho Thuê Bàn DJ Số 1 Đà Nẵng & Toàn Quốc
            </div>

            <h1
              style={{
                fontSize: "clamp(30px, 5vw, 52px)",
                fontWeight: 900,
                lineHeight: 1.15,
                margin: "0 0 20px 0",
                color: "#ffffff",
                letterSpacing: "-0.02em",
              }}
            >
              Thuê Bàn DJ Đà Nẵng & Toàn Quốc Uy Tín Giá Rẻ <br />
              <span style={{ color: "#22c55e" }}>Pioneer DJ XDJ-RX3, DDJ-FLX4, XDJ-XZ, CDJ-3000</span>
            </h1>

            <p
              style={{
                fontSize: "clamp(15px, 2vw, 18px)",
                color: "#a1a1aa",
                lineHeight: 1.7,
                marginBottom: "36px",
                maxWidth: "800px",
                margin: "0 auto 36px auto",
              }}
            >
              VanBass Music Center cung cấp thiết bị DJ chính hãng mới 99%, đầy đủ phụ kiện cao cấp.
              Phục vụ tiệc private, sinh nhật, tiệc cưới, bar club, biểu diễn festival và workshop âm nhạc.
              Hỗ trợ kỹ thuật lắp đặt và test máy 24/7.
            </p>

            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href={messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-primary button-lg"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px", fontSize: "16px" }}
              >
                Tư Vấn & Đặt Lịch Qua Messenger
              </a>
              <a
                href={`tel:${hotline}`}
                className="button button-secondary button-lg"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px", fontSize: "16px" }}
              >
                Hotline: {hotline}
              </a>
            </div>

            {/* Trust Badges */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "20px",
                marginTop: "60px",
                textAlign: "left",
              }}
            >
              <div style={{ padding: "16px", backgroundColor: "var(--surface)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                <strong style={{ color: "#22c55e", display: "block", fontSize: "15px", marginBottom: "4px" }}>Máy Mới 99% Chính Hãng</strong>
                <span style={{ fontSize: "13px", color: "#a1a1aa" }}>Bảo dưỡng định kỳ, jog wheel mượt, fader chuẩn xác</span>
              </div>
              <div style={{ padding: "16px", backgroundColor: "var(--surface)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                <strong style={{ color: "#22c55e", display: "block", fontSize: "15px", marginBottom: "4px" }}>Thủ Tục Cực Kỳ Nhanh Gọn</strong>
                <span style={{ fontSize: "13px", color: "#a1a1aa" }}>Thủ tục linh hoạt, nhận máy ngay trong 30 phút</span>
              </div>
              <div style={{ padding: "16px", backgroundColor: "var(--surface)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                <strong style={{ color: "#22c55e", display: "block", fontSize: "15px", marginBottom: "4px" }}>Setup & Hỗ Trợ 24/7</strong>
                <span style={{ fontSize: "13px", color: "#a1a1aa" }}>Kỹ thuật viên đồng hành, giao hàng tận nơi sự kiện</span>
              </div>
              <div style={{ padding: "16px", backgroundColor: "var(--surface)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                <strong style={{ color: "#22c55e", display: "block", fontSize: "15px", marginBottom: "4px" }}>Giá Thuê Cạnh Tranh Nhất</strong>
                <span style={{ fontSize: "13px", color: "#a1a1aa" }}>Ưu đãi sâu từ ngày thứ 2, hỗ trợ đối tác lâu dài</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Rental Models */}
        <section style={{ padding: "70px 0", borderBottom: "1px solid var(--border)" }}>
          <div className="container">
            <div style={{ textAlign: "center", marginBottom: "50px" }}>
              <span style={{ color: "#22c55e", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                DANH MỤC THIẾT BỊ NỔI BẬT
              </span>
              <h2 style={{ fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 800, color: "#fff", marginTop: "8px" }}>
                Các Dòng Bàn DJ Cho Thuê Được Yêu Thích Nhất
              </h2>
              <p style={{ color: "#a1a1aa", fontSize: "15px", maxWidth: "650px", margin: "10px auto 0 auto" }}>
                Từ các dòng DJ Controller 2 kênh nhỏ gọn đến dàn máy All-In-One và CDJ Flagship chuẩn quốc tế.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "30px",
              }}
            >
              {/* Card 1: XDJ-RX3 */}
              <div
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    backgroundColor: "rgba(34,197,94,0.15)",
                    color: "#4ade80",
                    border: "1px solid #22c55e",
                    fontSize: "11px",
                    fontWeight: 800,
                    padding: "4px 10px",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                  }}
                >
                  HOT NHẤT - BIỂU DIỄN
                </div>

                <div
                  style={{
                    aspectRatio: "16/10",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    backgroundColor: "#000",
                    borderRadius: "8px",
                    padding: "16px",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/products/xdj-rx3.png"
                    alt="Bàn DJ Pioneer DJ XDJ-RX3 All-In-One"
                    style={{ maxWidth: "100%", maxHeight: "160px", objectFit: "contain" }}
                  />
                </div>

                <span style={{ fontSize: "12px", color: "#22c55e", fontWeight: 700, textTransform: "uppercase" }}>
                  All-In-One System
                </span>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", margin: "6px 0 12px 0" }}>
                  Pioneer DJ XDJ-RX3
                </h3>
                <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, flex: 1, marginBottom: "20px" }}>
                  Hệ thống 2 kênh độc lập cao cấp với màn hình cảm ứng 10.1 inch, giao diện mượt mà từ CDJ-3000,
                  Release FX chuyên nghiệp. Cắm USB là chơi, không cần laptop.
                </p>

                <div style={{ padding: "14px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: "12px", color: "#71717a" }}>Giá thuê tham khảo:</span>
                    <div>
                      <span style={{ fontSize: "22px", fontWeight: 900, color: "#22c55e" }}>1.200.000đ</span>
                      <span style={{ fontSize: "12px", color: "#a1a1aa" }}> / 24h</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <a
                    href={`https://m.me/vanbassmusiccenter?text=Toi%20muon%20thue%20ban%20DJ%20Pioneer%20XDJ-RX3`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-primary"
                    style={{ flex: 1, textAlign: "center", padding: "10px" }}
                  >
                    Thuê RX3 Ngay
                  </a>
                  <Link
                    href="/products/xdj-rx3"
                    className="button button-secondary"
                    style={{ padding: "10px 14px" }}
                    title="Chi tiết máy"
                  >
                    Chi tiết
                  </Link>
                </div>
              </div>

              {/* Card 2: DDJ-FLX4 */}
              <div
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    backgroundColor: "rgba(34,197,94,0.15)",
                    color: "#4ade80",
                    border: "1px solid #22c55e",
                    fontSize: "11px",
                    fontWeight: 800,
                    padding: "4px 10px",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                  }}
                >
                  TIẾT KIỆM - WORKSHOP
                </div>

                <div
                  style={{
                    aspectRatio: "16/10",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    backgroundColor: "#000",
                    borderRadius: "8px",
                    padding: "16px",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/products/ddj-flx4.png"
                    alt="DJ Pioneer DDJ-FLX4 – DJ Controller"
                    style={{ maxWidth: "100%", maxHeight: "160px", objectFit: "contain" }}
                  />
                </div>

                <span style={{ fontSize: "12px", color: "#22c55e", fontWeight: 700, textTransform: "uppercase" }}>
                  DJ Controller 2-Channel
                </span>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", margin: "6px 0 12px 0" }}>
                  Pioneer DDJ-FLX4
                </h3>
                <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, flex: 1, marginBottom: "20px" }}>
                  Bộ điều khiển bán chạy nhất thế giới dành cho người mới và biểu diễn tiệc nhỏ. Hỗ trợ Rekordbox & Serato DJ,
                  tích hợp Smart Fader & Smart CFX giúp chuyển bài siêu mượt.
                </p>

                <div style={{ padding: "14px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: "12px", color: "#71717a" }}>Giá thuê tham khảo:</span>
                    <div>
                      <span style={{ fontSize: "22px", fontWeight: 900, color: "#22c55e" }}>400.000đ</span>
                      <span style={{ fontSize: "12px", color: "#a1a1aa" }}> / 24h</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <a
                    href={`https://m.me/vanbassmusiccenter?text=Toi%20muon%20thue%20ban%20DJ%20Pioneer%20DDJ-FLX4`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-primary"
                    style={{ flex: 1, textAlign: "center", padding: "10px" }}
                  >
                    Thuê FLX4 Ngay
                  </a>
                  <Link
                    href="/products/ddj-flx4"
                    className="button button-secondary"
                    style={{ padding: "10px 14px" }}
                    title="Chi tiết máy"
                  >
                    Chi tiết
                  </Link>
                </div>
              </div>

              {/* Card 3: Pioneer XDJ-XZ */}
              <div
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    color: "#e4e4e7",
                    fontSize: "11px",
                    fontWeight: 800,
                    padding: "4px 10px",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                  }}
                >
                  CHUẨN CLUB 4 KÊNH
                </div>

                <div
                  style={{
                    aspectRatio: "16/10",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    backgroundColor: "#000",
                    borderRadius: "8px",
                    padding: "16px",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/products/xdj-xz.png"
                    alt="Pioneer DJ XDJ-XZ 4-Channel System"
                    style={{ maxWidth: "100%", maxHeight: "160px", objectFit: "contain" }}
                  />
                </div>

                <span style={{ fontSize: "12px", color: "#22c55e", fontWeight: 700, textTransform: "uppercase" }}>
                  All-In-One 4-Channel
                </span>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", margin: "6px 0 12px 0" }}>
                  Pioneer DJ XDJ-XZ
                </h3>
                <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, flex: 1, marginBottom: "20px" }}>
                  Hệ thống 4 kênh All-In-One đỉnh cao với mâm xoay Full-size từ CDJ-2000NXS2, On-Jog display màu,
                  bộ xử lý âm thanh 64-bit chuẩn phòng thu. Thích hợp cho Bar, Pub, Wedding cao cấp.
                </p>

                <div style={{ padding: "14px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: "12px", color: "#71717a" }}>Giá thuê tham khảo:</span>
                    <div>
                      <span style={{ fontSize: "22px", fontWeight: 900, color: "#22c55e" }}>1.800.000đ</span>
                      <span style={{ fontSize: "12px", color: "#a1a1aa" }}> / 24h</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <a
                    href={`https://m.me/vanbassmusiccenter?text=Toi%20muon%20thue%20ban%20DJ%20Pioneer%20XDJ-XZ`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-primary"
                    style={{ flex: 1, textAlign: "center", padding: "10px" }}
                  >
                    Thuê XZ Ngay
                  </a>
                  <Link
                    href="/products/xdj-xz"
                    className="button button-secondary"
                    style={{ padding: "10px 14px" }}
                    title="Chi tiết máy"
                  >
                    Chi tiết
                  </Link>
                </div>
              </div>

              {/* Card 4: CDJ-3000 + DJM-900NXS2 */}
              <div
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    backgroundColor: "rgba(234,179,8,0.2)",
                    color: "#facc15",
                    border: "1px solid rgba(234,179,8,0.4)",
                    fontSize: "11px",
                    fontWeight: 800,
                    padding: "4px 10px",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                  }}
                >
                  FESTIVAL STANDARD
                </div>

                <div
                  style={{
                    aspectRatio: "16/10",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    backgroundColor: "#000",
                    borderRadius: "8px",
                    padding: "16px",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/products/cdj-3000.png"
                    alt="Pioneer CDJ-3000 DJ Set"
                    style={{ maxWidth: "100%", maxHeight: "160px", objectFit: "contain" }}
                  />
                </div>

                <span style={{ fontSize: "12px", color: "#22c55e", fontWeight: 700, textTransform: "uppercase" }}>
                  Multi Player & Mixer
                </span>
                <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", margin: "6px 0 12px 0" }}>
                  Dàn Pioneer CDJ-3000
                </h3>
                <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, flex: 1, marginBottom: "20px" }}>
                  Tiêu chuẩn tối thượng của các lễ hội EDM và Club hàng đầu thế giới. Bộ vi xử lý MPU tân tiến,
                  màn hình 9 inch 120Hz sắc nét kết hợp bàn Mixer DJM-900NXS2 / DJM-A9 chuyên nghiệp.
                </p>

                <div style={{ padding: "14px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: "12px", color: "#71717a" }}>Giá thuê tham khảo:</span>
                    <div>
                      <span style={{ fontSize: "18px", fontWeight: 800, color: "#22c55e" }}>Liên hệ báo giá</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <a
                    href={`https://m.me/vanbassmusiccenter?text=Toi%20muon%20thue%20dan%20Pioneer%20CDJ-3000`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-primary"
                    style={{ flex: 1, textAlign: "center", padding: "10px" }}
                  >
                    Báo Giá Trọn Gói
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Comparison Table */}
        <section style={{ padding: "70px 0", borderBottom: "1px solid var(--border)" }}>
          <div className="container" style={{ maxWidth: "900px" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <span style={{ color: "#22c55e", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                BÁO GIÁ THAM KHẢO
              </span>
              <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", marginTop: "8px" }}>
                Bảng Giá Thuê Bàn DJ Tham Khảo Tại Đà Nẵng Mới Nhất 2026
              </h2>
              <p style={{ color: "#a1a1aa", fontSize: "14px", marginTop: "8px" }}>
                Đã bao gồm dây jack kết nối chuyên dụng và túi chống sốc. Ưu đãi giảm 20% - 40% khi thuê nhiều ngày.
              </p>
            </div>

            {/* Quick Summary Box for Google AI Overview & Featured Snippets */}
            <div
              style={{
                backgroundColor: "rgba(34,197,94,0.06)",
                border: "1px solid rgba(34,197,94,0.3)",
                borderRadius: "10px",
                padding: "24px",
                marginBottom: "32px",
              }}
            >
              <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#4ade80", margin: "0 0 12px 0" }}>
                Giá thuê bàn DJ tại khu vực Đà Nẵng dao động từ 400.000 VNĐ đến 1.800.000 VNĐ mỗi ngày tùy theo dòng máy:
              </h3>
              <ul style={{ paddingLeft: "20px", margin: 0, fontSize: "14px", color: "#d4d4d8", lineHeight: 1.8 }}>
                <li><strong style={{ color: "#fff" }}>Dòng cơ bản / Controller nhỏ (như Pioneer DDJ-FLX4, DDJ-400 / tương đương):</strong> Khoảng 400.000 VNĐ/ngày. Thích hợp cho người mới tập chơi, tiệc gia đình, sinh nhật, workshop.</li>
                <li><strong style={{ color: "#fff" }}>Pioneer XDJ-RX2:</strong> Khoảng 700.000 VNĐ - 800.000 VNĐ/ngày. Hệ thống All-In-One 2 kênh chơi trực tiếp từ USB không cần máy tính.</li>
                <li><strong style={{ color: "#fff" }}>Pioneer XDJ-RX3:</strong> Khoảng 800.000 VNĐ - 1.200.000 VNĐ/ngày. Màn hình cảm ứng 10.1 inch mượt mà, Release FX chuyên nghiệp cho tiệc cưới, bar lounge, show sự kiện.</li>
                <li><strong style={{ color: "#fff" }}>Pioneer XDJ-XZ (4 kênh):</strong> Khoảng 1.500.000 VNĐ - 1.800.000 VNĐ/ngày. Mâm xoay Full-size, bộ xử lý âm thanh 64-bit chuẩn Club.</li>
                <li><strong style={{ color: "#fff" }}>Dàn Club Standard (2x Pioneer CDJ-3000 + Mixer DJM-900NXS2 / A9):</strong> Mức giá riêng theo thỏa thuận cho lễ hội âm nhạc và show lớn.</li>
              </ul>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
                <thead>
                  <tr style={{ backgroundColor: "rgba(255,255,255,0.05)", borderBottom: "2px solid #22c55e" }}>
                    <th style={{ padding: "16px", color: "#fff", fontWeight: 700 }}>Thiết Bị DJ</th>
                    <th style={{ padding: "16px", color: "#fff", fontWeight: 700 }}>Phân Loại</th>
                    <th style={{ padding: "16px", color: "#fff", fontWeight: 700 }}>Mục Đích Sử Dụng</th>
                    <th style={{ padding: "16px", color: "#fff", fontWeight: 700 }}>Giá Thuê (24h)</th>
                    <th style={{ padding: "16px", color: "#fff", fontWeight: 700 }}>Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
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
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
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
                  <tr style={{ borderBottom: "1px solid var(--border)", backgroundColor: "rgba(34,197,94,0.04)" }}>
                    <td style={{ padding: "16px", fontWeight: 700, color: "#4ade80" }}>Pioneer DJ XDJ-RX3</td>
                    <td style={{ padding: "16px", color: "#a1a1aa" }}>All-In-One (USB Độc Lập)</td>
                    <td style={{ padding: "16px", color: "#a1a1aa" }}>Show sự kiện, Wedding, Bar Club, Lounge</td>
                    <td style={{ padding: "16px", color: "#22c55e", fontWeight: 800 }}>1.200.000đ</td>
                    <td style={{ padding: "16px" }}>
                      <a href="https://m.me/vanbassmusiccenter?text=Thue%20XDJ-RX3" target="_blank" rel="noopener noreferrer" style={{ color: "#22c55e", fontWeight: 700 }}>
                        Thuê &rarr;
                      </a>
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
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
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
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

        {/* 4-Step Rental Process */}
        <section style={{ padding: "70px 0", borderBottom: "1px solid var(--border)" }}>
          <div className="container" style={{ maxWidth: "900px" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <span style={{ color: "#22c55e", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                QUY TRÌNH LINH HOẠT
              </span>
              <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", marginTop: "8px" }}>
                Quy Trình Thuê Bàn DJ Tại VanBass (4 Bước Nhanh Gọn)
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px" }}>
              <div style={{ padding: "24px", backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px" }}>
                <span style={{ fontSize: "32px", color: "#22c55e", fontWeight: 900, display: "block", marginBottom: "12px" }}>01</span>
                <strong style={{ color: "#fff", fontSize: "16px", display: "block", marginBottom: "8px" }}>Chọn Thiết Bị & Ngày Thuê</strong>
                <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6 }}>
                  Nhắn tin qua Messenger hoặc gọi Hotline để chọn mẫu bàn DJ (XDJ-RX3, DDJ-FLX4, XZ...) và thời gian thuê.
                </p>
              </div>

              <div style={{ padding: "24px", backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px" }}>
                <span style={{ fontSize: "32px", color: "#22c55e", fontWeight: 900, display: "block", marginBottom: "12px" }}>02</span>
                <strong style={{ color: "#fff", fontSize: "16px", display: "block", marginBottom: "8px" }}>Xác Nhận & Làm Thủ Tục</strong>
                <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6 }}>
                  Xác nhận lịch thuê, đặt cọc giữ máy (hoặc làm hợp đồng thuê thiết bị sự kiện). Thủ tục chỉ mất 5 phút.
                </p>
              </div>

              <div style={{ padding: "24px", backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px" }}>
                <span style={{ fontSize: "32px", color: "#22c55e", fontWeight: 900, display: "block", marginBottom: "12px" }}>03</span>
                <strong style={{ color: "#fff", fontSize: "16px", display: "block", marginBottom: "8px" }}>Bàn Giao & Test Máy</strong>
                <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6 }}>
                  Nhận máy tại cửa hàng hoặc kỹ thuật viên giao tận nơi. Khách hàng kiểm tra âm thanh, fader, jog wheel kỹ càng.
                </p>
              </div>

              <div style={{ padding: "24px", backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px" }}>
                <span style={{ fontSize: "32px", color: "#22c55e", fontWeight: 900, display: "block", marginBottom: "12px" }}>04</span>
                <strong style={{ color: "#fff", fontSize: "16px", display: "block", marginBottom: "8px" }}>Hoàn Trả & Tất Toán</strong>
                <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6 }}>
                  Sau khi xong show/sự kiện, VanBass kiểm tra nhận lại máy và hoàn trả cọc ngay lập tức cho khách hàng.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section with Rich Schema */}
        <section style={{ padding: "70px 0" }}>
          <div className="container" style={{ maxWidth: "800px" }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <span style={{ color: "#22c55e", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                HỎI ĐÁP PHỔ BIẾN
              </span>
              <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#fff", marginTop: "8px" }}>
                Câu Hỏi Thường Gặp Về Thuê Bàn DJ
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {rentalFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    padding: "24px",
                  }}
                >
                  <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#fff", margin: "0 0 10px 0" }}>
                    {faq.q}
                  </h3>
                  <p style={{ fontSize: "14px", color: "#a1a1aa", lineHeight: 1.7, margin: 0 }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Contact CTA */}
            <div
              style={{
                marginTop: "60px",
                padding: "36px",
                backgroundColor: "rgba(34,197,94,0.08)",
                border: "1px solid rgba(34,197,94,0.3)",
                borderRadius: "12px",
                textAlign: "center",
              }}
            >
              <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#fff", margin: "0 0 10px 0" }}>
                Bạn Cần Thuê Bàn DJ Cho Show Hay Sự Kiện Sắp Tới?
              </h3>
              <p style={{ color: "#a1a1aa", fontSize: "14px", marginBottom: "24px" }}>
                Liên hệ ngay với đội ngũ kỹ thuật VanBass để được tư vấn thiết bị phù hợp nhất và nhận giá ưu đãi trong ngày hôm nay!
              </p>
              <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
                <a
                  href={messengerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-primary"
                  style={{ padding: "12px 24px" }}
                >
                  Chat Trực Tiếp Qua Messenger
                </a>
                <a
                  href={`tel:${hotline}`}
                  className="button button-secondary"
                  style={{ padding: "12px 24px" }}
                >
                  Hotline: {hotline}
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
