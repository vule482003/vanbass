import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

export const metadata: Metadata = {
  title: "Bàn DJ Chính Hãng Giá Tốt Nhất 2026 | Mua Bán & Cho Thuê Uy Tín - VanBass",
  description:
    "Tổng kho bàn DJ chính hãng Pioneer DJ, AlphaTheta tại Đà Nẵng, Huế & Toàn quốc: Pioneer XDJ-RX3, DDJ-FLX4, Omnis-Duo, XDJ-AZ, XDJ-RX2, XDJ-RR, CDJ-3000. Cam kết 100% chính hãng, bảo hành 12-24 tháng, hỗ trợ trả góp 0%, quà tặng USB nhạc Rekordbox, test máy trực tiếp tại Showroom Đà Nẵng (Nguyễn Tất Thành) & Huế (442 Chi Lăng). Hotline: 0706.067.799.",
  keywords: [
    // Core Seed & Trust Keywords
    "bàn dj",
    "ban dj",
    "bàn dj chính hãng",
    "ban dj chinh hang",
    "mua bàn dj",
    "mua ban dj",
    "bán bàn dj",
    "ban ban dj",
    "mua bán bàn dj",
    "mua ban ban dj",
    "mua bàn dj uy tín",
    "mua ban dj uy tin",
    "mua bàn dj ở đâu uy tín",
    "mua ban dj o dau uy tin",
    "mua bàn dj ở đâu đà nẵng",
    "mua ban dj o dau da nang",
    "địa chỉ mua bàn dj uy tín",
    "shop bán bàn dj uy tín",
    "cửa hàng bán bàn dj",
    "giá bàn dj",
    "gia ban dj",
    "bàn dj giá rẻ",
    "ban dj gia re",
    "bàn dj cho người mới bắt đầu",
    "bàn dj đà nẵng",
    "ban dj da nang",
    "bàn dj huế",
    "ban dj hue",
    "bàn dj miền trung",
    "bàn dj pioneer",
    "bàn dj alphatheta",
    "dj controller",
    "bàn dj all in one",
    // Hot Search Models
    "XDJ RX3",
    "xdj rx3",
    "DDJ FLX4",
    "ddj flx4",
    "OMNIS DUO",
    "omnis duo",
    "XDJ AZ",
    "xdj az",
    "XDJ RX2",
    "xdj rx2",
    "DDJ FLX2",
    "ddj flx2",
    "XDJ RR",
    "xdj rr",
    "XDJ XZ",
    "xdj xz",
    "thuê bàn dj",
    "thue ban dj",
    "sửa bàn dj",
    "vanbass music center",
    "vanbass",
  ],
  alternates: {
    canonical: "/ban-dj",
  },
  openGraph: {
    title: "Bàn DJ Chính Hãng Giá Tốt Nhất 2026 | Mua Bán & Cho Thuê Uy Tín - VanBass",
    description:
      "Tổng kho phân phối bàn DJ chính hãng Pioneer DJ, AlphaTheta. Máy mới 100% đập hộp & like new 99%, bảo hành 12-24T, hỗ trợ trả góp 0%, quà tặng USB nhạc, test máy trực tiếp tại Showroom Đà Nẵng & Huế.",
    url: `${siteUrl}/ban-dj`,
    type: "website",
    images: [
      {
        url: "/images/rental/rental_fleet_hero.jpg",
        width: 1200,
        height: 630,
        alt: "Bàn DJ Chính Hãng Giá Tốt Nhất - VanBass Music Center",
      },
    ],
  },
};

const banDjFaqs = [
  {
    q: "Mua bàn DJ ở đâu uy tín, chính hãng và đảm bảo quyền lợi bảo hành?",
    a: "VanBass Music Center là trung tâm phân phối thiết bị DJ chính hãng Pioneer DJ, AlphaTheta uy tín số 1 tại Đà Nẵng (Nguyễn Tất Thành, Thanh Khê) và TP Huế (442 Chi Lăng). 100% sản phẩm có hóa đơn chứng từ, bảo hành 12 - 24 tháng chính hãng, hỗ trợ kỹ thuật và bảo dưỡng linh kiện trọn đời.",
  },
  {
    q: "Người mới bắt đầu học DJ nên mua bàn DJ nào tốt và dễ sử dụng nhất?",
    a: "Với người mới bắt đầu, mẫu Pioneer DDJ-FLX4 (hoặc AlphaTheta DDJ-FLX2) là sự lựa chọn số 1 thế giới. Thiết bị có mức giá phải chăng (từ 6 - 11 triệu), kết nối mượt mà với laptop, điện thoại qua Rekordbox/Serato DJ, tích hợp tính năng Smart Fader và Smart CFX hỗ trợ chuyển bài chuyên nghiệp.",
  },
  {
    q: "Bàn DJ All-In-One có ưu điểm gì so với bàn DJ Controller kết nối máy tính?",
    a: "Bàn DJ All-In-One (như Pioneer XDJ-RX3, AlphaTheta Omnis-Duo, XDJ-AZ) tích hợp sẵn màn hình cảm ứng độ nét cao và bộ xử lý độc lập. DJ chỉ cần cắm USB là biểu diễn trực tiếp mà không cần dùng đến laptop, tránh hoàn toàn rủi ro giật lag hay treo máy khi đang chơi nhạc tại sự kiện.",
  },
  {
    q: "VanBass có hỗ trợ mua bàn DJ trả góp 0% và quà tặng kèm khi mua máy không?",
    a: "Có. VanBass hỗ trợ chương trình trả góp 0% qua thẻ tín dụng hơn 25 ngân hàng trên toàn quốc. Khi mua máy, quý khách được tặng kèm: USB Sandisk nạp sẵn kho nhạc Lossless phân tích qua Rekordbox, dây cáp âm thanh chuyên nghiệp, tai nghe kiểm âm và khóa đào tạo kỹ thuật 1-kèm-1.",
  },
  {
    q: "Khách hàng có được cắm USB test thử máy trực tiếp tại Showroom trước khi mua không?",
    a: "Có! VanBass kính mời quý khách ghé trực tiếp Showroom tại Đà Nẵng (đường Nguyễn Tất Thành) hoặc TP Huế (442 Chi Lăng) để trải nghiệm thực tế cảm giác mâm xoay, fader và chất lượng âm thanh trên dàn loa biểu diễn chuyên nghiệp trước khi mua.",
  },
];

export default function BanDjLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Store", "LocalBusiness"],
        "@id": `${siteUrl}/ban-dj#store`,
        "name": "VanBass Music Center - Tổng Kho Bàn DJ Chính Hãng Uy Tín",
        "url": `${siteUrl}/ban-dj`,
        "telephone": "+84706067799",
        "priceRange": "5.000.000đ - 105.000.000đ",
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
        "description":
          "Tổng kho phân phối và bán lẻ bàn DJ chính hãng Pioneer DJ, AlphaTheta tại Việt Nam: XDJ-RX3, DDJ-FLX4, Omnis-Duo, XDJ-AZ, XDJ-RX2, CDJ-3000.",
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/ban-dj#faq`,
        "mainEntity": banDjFaqs.map((faq) => ({
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
        "@id": `${siteUrl}/ban-dj#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Trang chủ",
            "item": siteUrl,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Bàn DJ Chính Hãng",
            "item": `${siteUrl}/ban-dj`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      {children}
    </>
  );
}
