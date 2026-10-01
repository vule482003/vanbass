import type { Metadata } from "next";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

export const metadata: Metadata = {
  title: "Sửa Chữa Bàn DJ Chuyên Nghiệp Đà Nẵng, Huế | VanBass Music Center",
  description:
    "Dịch vụ kỹ thuật sửa chữa bàn DJ, Mixer, CDJ Pioneer DJ & AlphaTheta chuyên nghiệp tại Đà Nẵng & Miền Trung. Thay fader, sửa jogwheel, xử lý nguồn, bảo dưỡng vệ sinh lấy liền trong ngày. Linh kiện chính hãng 100%, bảo hành 6-12T.",
  keywords: [
    "sửa bàn dj đà nẵng",
    "sửa chữa bàn dj đà nẵng",
    "sửa bàn dj huế",
    "sửa chữa bàn dj huế",
    "sửa bàn dj",
    "thay fader bàn dj",
    "thay fader pioneer",
    "thay crossfader bàn dj",
    "sửa jogwheel pioneer",
    "sửa mâm xoay dj",
    "bảo dưỡng bàn dj",
    "vệ sinh bàn dj",
    "sửa mixer dj đà nẵng",
    "sửa xdj rx3",
    "sửa xdj rx2",
    "sửa ddj flx4",
    "sửa cdj 3000",
    "vanbass music center",
  ],
  alternates: {
    canonical: "/sua-chua-ban-dj",
  },
  openGraph: {
    title: "Sửa Chữa Bàn DJ Chuyên Nghiệp | VanBass Music Center",
    description:
      "Dịch vụ kỹ thuật sửa chữa bàn DJ Pioneer DJ, AlphaTheta lấy liền tại Đà Nẵng: Thay fader, sửa jogwheel, xử lý nguồn, bảo dưỡng vệ sinh định kỳ.",
    url: `${baseUrl}/sua-chua-ban-dj`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/images/repair/dj_repair_hero.jpg`,
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
        name: "Dịch Vụ Sửa Chữa & Bảo Dưỡng Bàn DJ Chuyên Nghiệp Đà Nẵng - VanBass",
        url: `${baseUrl}/sua-chua-ban-dj`,
        provider: {
          "@type": ["MusicStore", "LocalBusiness"],
          name: "VanBass Music Center",
          url: baseUrl,
          telephone: "+84706067799",
          priceRange: "200.000đ - 2.500.000đ",
          address: {
            "@type": "PostalAddress",
            streetAddress: "77 Nguyễn Tất Thành, Phường Thanh Khê Tây, Quận Thanh Khê",
            addressLocality: "Đà Nẵng",
            addressRegion: "Đà Nẵng",
            addressCountry: "VN",
          },
        },
        description:
          "Trung tâm sửa chữa bàn DJ, thay fader, sửa jogwheel, sửa nguồn bo mạch bàn DJ Pioneer DJ, AlphaTheta tại Đà Nẵng, Huế & Miền Trung.",
        areaServed: ["Đà Nẵng", "Thừa Thiên Huế", "Hội An", "Quảng Nam", "Miền Trung"],
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/sua-chua-ban-dj#faq`,
        mainEntity: repairFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      },
    ],
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#08090c",
        color: "#f4f4f5",
        fontFamily: "var(--font-primary)",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <Header />

      <main style={{ flex: 1 }}>
        {/* =========================================================================
            1. HERO SECTION: FULL-BLEED TECHNICIAN IMAGE + GRADIENT FADE
           ========================================================================= */}
        <section className="repair-hero-section">
          {/* Full-Bleed Technician Image on the Right (60% width) */}
          <div
            className="repair-hero-image"
            style={{
              backgroundImage: "url('/images/repair/dj_repair_hero.jpg')",
            }}
          />

          {/* Seamless Gradient Fade Overlay to Deep Black Background */}
          <div className="repair-hero-overlay" />

          {/* Subtle Ambient Blue Lighting Glow */}
          <div className="repair-hero-glow" />

          {/* Content Layer (Left Aligned) */}
          <div className="container" style={{ position: "relative", zIndex: 2 }}>
            <div className="repair-hero-content">
              {/* Eyebrow */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 16px",
                  borderRadius: "999px",
                  backgroundColor: "rgba(22, 131, 255, 0.1)",
                  border: "1px solid rgba(22, 131, 255, 0.25)",
                  color: "#1683FF",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: "20px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "#1683FF",
                    boxShadow: "0 0 8px #1683FF",
                  }}
                />
                DỊCH VỤ KỸ THUẬT LẤY LIỀN • BẢO HÀNH 6-12T
              </div>

              {/* Main Headline */}
              <h1
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "clamp(34px, 4.6vw, 54px)",
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "-0.035em",
                  lineHeight: 1.15,
                  margin: "0 0 20px 0",
                }}
              >
                Sửa Chữa Bàn DJ
                <br />
                <span style={{ color: "#1683FF" }}>Chuyên Nghiệp</span>
              </h1>

              {/* Subtitle */}
              <p
                style={{
                  color: "#a1a1aa",
                  fontSize: "clamp(15px, 1.8vw, 17px)",
                  lineHeight: 1.75,
                  margin: "0 0 34px 0",
                  maxWidth: "560px",
                }}
              >
                Dịch vụ kỹ thuật chuyên nghiệp, trang thiết bị hiện đại và đội ngũ kỹ thuật viên giàu kinh nghiệm. Tiếp nhận sửa chữa lấy liền, thay linh kiện chính hãng Pioneer DJ & AlphaTheta tại Đà Nẵng & Miền Trung.
              </p>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <a
                  href={`tel:${hotline}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "14px 28px",
                    borderRadius: "10px",
                    backgroundColor: "#1683FF",
                    color: "#ffffff",
                    fontSize: "14.5px",
                    fontWeight: 600,
                    textDecoration: "none",
                    boxShadow: "0 4px 20px rgba(22, 131, 255, 0.35)",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span>Gọi Hotline: 0706.067.799</span>
                </a>

                <a
                  href={`${messengerUrl}?text=Toi%20can%20dat%20lich%20sua%20chua%20ban%20DJ`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "14px 24px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#f4f4f5",
                    fontSize: "14.5px",
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span>Đặt lịch sửa chữa</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. SERVICES GRID: Dịch vụ sửa chữa của chúng tôi
           ========================================================================= */}
        <section
          style={{
            padding: "90px 0",
            backgroundColor: "#08090c",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ maxWidth: "680px", marginBottom: "50px" }}>
              <span
                style={{
                  color: "#1683FF",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                DANH MỤC DỊCH VỤ
              </span>
              <h2
                style={{
                  fontSize: "clamp(24px, 3.2vw, 36px)",
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "-0.025em",
                  margin: 0,
                }}
              >
                Dịch Vụ Sửa Chữa Của Chúng Tôi
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "24px",
              }}
            >
              {/* Service 1: Fader / Crossfader */}
              <div
                style={{
                  backgroundColor: "#0d0f15",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "32px 26px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.2s ease, border-color 0.2s ease",
                }}
              >
                <div>
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(22, 131, 255, 0.1)",
                      border: "1px solid rgba(22, 131, 255, 0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#1683FF",
                      marginBottom: "20px",
                    }}
                  >
                    {/* Minimal Slider/Fader Icon */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="4" y1="21" x2="4" y2="14" />
                      <line x1="4" y1="10" x2="4" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12" y2="3" />
                      <line x1="20" y1="21" x2="20" y2="16" />
                      <line x1="20" y1="12" x2="20" y2="3" />
                      <line x1="1" y1="14" x2="7" y2="14" />
                      <line x1="9" y1="8" x2="15" y2="8" />
                      <line x1="17" y1="16" x2="23" y2="16" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: "19px", fontWeight: 700, color: "#ffffff", marginBottom: "10px" }}>
                    Fader / Crossfader
                  </h3>
                  <p style={{ fontSize: "14px", color: "#a1a1aa", lineHeight: 1.65, margin: "0 0 20px 0" }}>
                    Thay thế cần volume, crossfader Magvel / Alps chính hãng. Khắc phục triệt để lỗi nhảy âm lượng, rè tín hiệu hoặc kẹt cứng.
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "16px",
                    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                  }}
                >
                  <span style={{ fontSize: "13.5px", color: "#1683FF", fontWeight: 700 }}>
                    Giá từ 250.000đ
                  </span>
                  <span style={{ color: "#71717a", fontSize: "14px" }}>→</span>
                </div>
              </div>

              {/* Service 2: Jogwheel */}
              <div
                style={{
                  backgroundColor: "#0d0f15",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "32px 26px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.2s ease, border-color 0.2s ease",
                }}
              >
                <div>
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(22, 131, 255, 0.1)",
                      border: "1px solid rgba(22, 131, 255, 0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#1683FF",
                      marginBottom: "20px",
                    }}
                  >
                    {/* Minimal Disc / Jogwheel Icon */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="4" />
                      <line x1="12" y1="2" x2="12" y2="4" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: "19px", fontWeight: 700, color: "#ffffff", marginBottom: "10px" }}>
                    Jogwheel & Cảm Ứng Mâm
                  </h3>
                  <p style={{ fontSize: "14px", color: "#a1a1aa", lineHeight: 1.65, margin: "0 0 20px 0" }}>
                    Cân chỉnh cảm ứng mặt mâm, xử lý mâm xoay bị nặng, kẹt cơ học hoặc màn hình LCD On-Jog không hiển thị artwork.
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "16px",
                    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                  }}
                >
                  <span style={{ fontSize: "13.5px", color: "#1683FF", fontWeight: 700 }}>
                    Giá từ 350.000đ
                  </span>
                  <span style={{ color: "#71717a", fontSize: "14px" }}>→</span>
                </div>
              </div>

              {/* Service 3: USB / Audio Jack */}
              <div
                style={{
                  backgroundColor: "#0d0f15",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "32px 26px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.2s ease, border-color 0.2s ease",
                }}
              >
                <div>
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(22, 131, 255, 0.1)",
                      border: "1px solid rgba(22, 131, 255, 0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#1683FF",
                      marginBottom: "20px",
                    }}
                  >
                    {/* Minimal Audio Jack / Plug Icon */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v6" />
                      <path d="M10 8h4v4h-4z" />
                      <path d="M8 12h8v4a4 4 0 0 1-8 0v-4z" />
                      <path d="M12 16v6" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: "19px", fontWeight: 700, color: "#ffffff", marginBottom: "10px" }}>
                    USB / Audio Jack & Nguồn
                  </h3>
                  <p style={{ fontSize: "14px", color: "#a1a1aa", lineHeight: 1.65, margin: "0 0 20px 0" }}>
                    Xử lý mất nguồn bo mạch, sửa cổng USB chập chờn không nhận nhạc, thay jack tai nghe 3.5mm/6.35mm và jack XLR canon.
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "16px",
                    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                  }}
                >
                  <span style={{ fontSize: "13.5px", color: "#1683FF", fontWeight: 700 }}>
                    Giá từ 300.000đ
                  </span>
                  <span style={{ color: "#71717a", fontSize: "14px" }}>→</span>
                </div>
              </div>

              {/* Service 4: Vệ sinh & Bảo dưỡng */}
              <div
                style={{
                  backgroundColor: "#0d0f15",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "32px 26px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.2s ease, border-color 0.2s ease",
                }}
              >
                <div>
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(22, 131, 255, 0.1)",
                      border: "1px solid rgba(22, 131, 255, 0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#1683FF",
                      marginBottom: "20px",
                    }}
                  >
                    {/* Minimal Shield / Maintenance Icon */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: "19px", fontWeight: 700, color: "#ffffff", marginBottom: "10px" }}>
                    Vệ Sinh & Bảo Dưỡng
                  </h3>
                  <p style={{ fontSize: "14px", color: "#a1a1aa", lineHeight: 1.65, margin: "0 0 20px 0" }}>
                    Vệ sinh toàn bộ bo mạch bằng dung dịch chuyên dụng, tra dầu mâm xoay, làm sạch mắt quang cảm biến kéo dài tuổi thọ máy.
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "16px",
                    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                  }}
                >
                  <span style={{ fontSize: "13.5px", color: "#1683FF", fontWeight: 700 }}>
                    300.000đ - 500.000đ
                  </span>
                  <span style={{ color: "#71717a", fontSize: "14px" }}>→</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. PRICING TABLE: Bảng giá tham khảo
           ========================================================================= */}
        <section
          style={{
            padding: "90px 0",
            backgroundColor: "#08090c",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div className="container" style={{ maxWidth: "980px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <span
                style={{
                  color: "#1683FF",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                CHI PHÍ MINH BẠCH
              </span>
              <h2
                style={{
                  fontSize: "clamp(24px, 3.2vw, 34px)",
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "-0.025em",
                  margin: 0,
                }}
              >
                Bảng Giá Tham Khảo
              </h2>
            </div>

            <div
              style={{
                backgroundColor: "#0d0f15",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "14px",
                overflow: "hidden",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
                <thead>
                  <tr
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    <th style={{ padding: "18px 24px", color: "#ffffff", fontWeight: 600 }}>Hạng Mục Dịch Vụ</th>
                    <th style={{ padding: "18px 24px", color: "#ffffff", fontWeight: 600 }}>Thời Gian Xử Lý</th>
                    <th style={{ padding: "18px 24px", color: "#1683FF", fontWeight: 700, textAlign: "right" }}>Giá Từ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                    <td style={{ padding: "16px 24px", color: "#f4f4f5" }}>Thay Fader Volume / Pitch Tempo (Pioneer Controller)</td>
                    <td style={{ padding: "16px 24px", color: "#a1a1aa" }}>30 - 60 phút (Lấy liền)</td>
                    <td style={{ padding: "16px 24px", color: "#1683FF", fontWeight: 700, textAlign: "right" }}>250.000đ</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                    <td style={{ padding: "16px 24px", color: "#f4f4f5" }}>Thay Fader Magvel / Alps (Dòng RX3, XZ, CDJ-3000)</td>
                    <td style={{ padding: "16px 24px", color: "#a1a1aa" }}>1 - 2 giờ</td>
                    <td style={{ padding: "16px 24px", color: "#1683FF", fontWeight: 700, textAlign: "right" }}>450.000đ</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                    <td style={{ padding: "16px 24px", color: "#f4f4f5" }}>Thay nút bấm CUE / PLAY / Pad cao su biểu diễn</td>
                    <td style={{ padding: "16px 24px", color: "#a1a1aa" }}>30 - 45 phút</td>
                    <td style={{ padding: "16px 24px", color: "#1683FF", fontWeight: 700, textAlign: "right" }}>200.000đ</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                    <td style={{ padding: "16px 24px", color: "#f4f4f5" }}>Cân chỉnh cảm ứng Jogwheel, sửa kẹt mâm xoay</td>
                    <td style={{ padding: "16px 24px", color: "#a1a1aa" }}>1 - 3 giờ</td>
                    <td style={{ padding: "16px 24px", color: "#1683FF", fontWeight: 700, textAlign: "right" }}>350.000đ</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                    <td style={{ padding: "16px 24px", color: "#f4f4f5" }}>Vệ sinh bảo dưỡng toàn bộ máy bằng dung dịch chuyên dụng</td>
                    <td style={{ padding: "16px 24px", color: "#a1a1aa" }}>1 - 2 giờ</td>
                    <td style={{ padding: "16px 24px", color: "#1683FF", fontWeight: 700, textAlign: "right" }}>300.000đ</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "16px 24px", color: "#f4f4f5" }}>Sửa bo mạch nguồn, cứu firmware, thay IC âm thanh DAC</td>
                    <td style={{ padding: "16px 24px", color: "#a1a1aa" }}>24 - 48 giờ</td>
                    <td style={{ padding: "16px 24px", color: "#1683FF", fontWeight: 700, textAlign: "right" }}>Báo giá sau kiểm tra</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ textAlign: "center", color: "#71717a", fontSize: "13px", marginTop: "16px" }}>
              * Chuẩn đoán lỗi ban đầu hoàn toàn MIỄN PHÍ. Giá trên đã bao gồm công tháo lắp và bảo hành 6 - 12 tháng.
            </p>
          </div>
        </section>

        {/* =========================================================================
            4. REPAIR PROCESS: Quy trình sửa chữa (4 Bước)
           ========================================================================= */}
        <section
          style={{
            padding: "90px 0",
            backgroundColor: "#08090c",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div className="container" style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ maxWidth: "680px", marginBottom: "50px" }}>
              <span
                style={{
                  color: "#1683FF",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                QUY TRÌNH CHUYÊN NGHIỆP
              </span>
              <h2
                style={{
                  fontSize: "clamp(24px, 3.2vw, 36px)",
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "-0.025em",
                  margin: 0,
                }}
              >
                Quy Trình Sửa Chữa Tại VanBass
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                gap: "24px",
              }}
            >
              {/* Step 1 */}
              <div
                style={{
                  backgroundColor: "#0d0f15",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "32px 24px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#1683FF",
                    letterSpacing: "0.1em",
                    marginBottom: "14px",
                  }}
                >
                  BƯỚC 01
                </span>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", marginBottom: "10px" }}>
                  Tiếp Nhận Thiết Bị
                </h3>
                <p style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: 1.65, margin: 0 }}>
                  Kỹ thuật viên tiếp nhận bàn DJ tại Showroom hoặc qua vận chuyển liên tỉnh. Lập phiếu kiểm tra ngoại quan và mô tả lỗi chi tiết.
                </p>
              </div>

              {/* Step 2 */}
              <div
                style={{
                  backgroundColor: "#0d0f15",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "32px 24px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#1683FF",
                    letterSpacing: "0.1em",
                    marginBottom: "14px",
                  }}
                >
                  BƯỚC 02
                </span>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", marginBottom: "10px" }}>
                  Báo Giá Minh Bạch
                </h3>
                <p style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: 1.65, margin: 0 }}>
                  Chuẩn đoán lỗi miễn phí, đưa ra phương án xử lý tối ưu và báo giá linh kiện rõ ràng trước khi tiến hành sửa.
                </p>
              </div>

              {/* Step 3 */}
              <div
                style={{
                  backgroundColor: "#0d0f15",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "32px 24px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#1683FF",
                    letterSpacing: "0.1em",
                    marginBottom: "14px",
                  }}
                >
                  BƯỚC 03
                </span>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", marginBottom: "10px" }}>
                  Tiến Hành Sửa Chữa
                </h3>
                <p style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: 1.65, margin: 0 }}>
                  Thay thế linh kiện chính hãng trong phòng kỹ thuật tiêu chuẩn, vệ sinh sạch sẽ và kiểm tra toàn diện chức năng máy.
                </p>
              </div>

              {/* Step 4 */}
              <div
                style={{
                  backgroundColor: "#0d0f15",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "32px 24px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#1683FF",
                    letterSpacing: "0.1em",
                    marginBottom: "14px",
                  }}
                >
                  BƯỚC 04
                </span>
                <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#ffffff", marginBottom: "10px" }}>
                  Bàn Giao & Bảo Hành
                </h3>
                <p style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: 1.65, margin: 0 }}>
                  Cùng khách hàng test lại máy, dán tem bảo hành điện tử 6 - 12 tháng và hướng dẫn bảo quản thiết bị đúng cách.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. BOTTOM CTA: Thiết bị của bạn đang gặp vấn đề?
           ========================================================================= */}
        <section
          style={{
            padding: "90px 0 100px 0",
            backgroundColor: "#08090c",
          }}
        >
          <div className="container" style={{ maxWidth: "920px", margin: "0 auto" }}>
            <div
              style={{
                position: "relative",
                padding: "54px 44px",
                backgroundColor: "#0d0f15",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "16px",
                textAlign: "center",
                overflow: "hidden",
              }}
            >
              {/* Subtle ambient blue light glow */}
              <div
                style={{
                  position: "absolute",
                  top: "-50%",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "400px",
                  height: "260px",
                  background: "radial-gradient(circle, rgba(22, 131, 255, 0.15) 0%, transparent 70%)",
                  pointerEvents: "none",
                  filter: "blur(50px)",
                }}
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                <span
                  style={{
                    color: "#1683FF",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "12px",
                  }}
                >
                  HỖ TRỢ KỸ THUẬT NHANH CHÓNG
                </span>

                <h2
                  style={{
                    fontSize: "clamp(26px, 3.6vw, 38px)",
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "-0.025em",
                    lineHeight: 1.25,
                    margin: "0 auto 16px auto",
                    maxWidth: "640px",
                  }}
                >
                  Thiết Bị Của Bạn Đang Gặp Vấn Đề?
                </h2>

                <p
                  style={{
                    color: "#a1a1aa",
                    fontSize: "15px",
                    lineHeight: 1.8,
                    maxWidth: "580px",
                    margin: "0 auto 30px auto",
                  }}
                >
                  Ghé ngay trung tâm kỹ thuật VanBass tại <strong>77 Nguyễn Tất Thành, Đà Nẵng</strong> hoặc liên hệ hotline để kỹ thuật viên chuẩn đoán lỗi miễn phí.
                </p>

                <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
                  <a
                    href="tel:0706067799"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "13px 28px",
                      borderRadius: "10px",
                      backgroundColor: "#1683FF",
                      color: "#ffffff",
                      fontSize: "14px",
                      fontWeight: 600,
                      textDecoration: "none",
                      boxShadow: "0 4px 20px rgba(22, 131, 255, 0.35)",
                    }}
                  >
                    <span>Liên hệ ngay: 0706.067.799</span>
                    <span>→</span>
                  </a>

                  <Link
                    href="/contact"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "13px 24px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      color: "#f4f4f5",
                      fontSize: "14px",
                      fontWeight: 500,
                      textDecoration: "none",
                    }}
                  >
                    <span>Xem địa chỉ Showroom</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
