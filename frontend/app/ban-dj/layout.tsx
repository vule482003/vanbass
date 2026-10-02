import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

export const metadata: Metadata = {
  title: "Mua Bàn DJ Chính Hãng Tại Đà Nẵng | Pioneer DJ & AlphaTheta - VanMusic",
  description:
    "Đại lý phân phối bàn DJ Pioneer DJ, AlphaTheta chính hãng tại Đà Nẵng & Miền Trung: Pioneer XDJ-RX3, DDJ-FLX4, Omnis-Duo, XDJ-AZ, DDJ-FLX2, XDJ-RX2. Máy mới 100% fullbox & like new 99%, bảo hành 12-24T, trả góp 0%, test máy tại showroom.",
  keywords: [
    // Core Commercial Keywords
    "bàn dj",
    "ban dj",
    "bàn dj chính hãng",
    "ban dj chinh hang",
    "bàn dj đà nẵng",
    "ban dj da nang",
    "mua bàn dj",
    "mua ban dj",
    "mua bàn dj đà nẵng",
    "mua ban dj da nang",
    "bán bàn dj đà nẵng",
    "ban ban dj da nang",
    "bàn dj pioneer",
    "bàn dj alphatheta",
    "bàn dj pioneer đà nẵng",
    "bàn dj alphatheta đà nẵng",
    "mua bàn dj pioneer",
    "cửa hàng bán bàn dj đà nẵng",
    "địa chỉ mua bàn dj đà nẵng",
    "giá bàn dj",
    "bàn dj cho người mới",
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
    "vanbass music center",
    "vanmusic",
  ],
  alternates: {
    canonical: "/ban-dj",
  },
  openGraph: {
    title: "Mua Bàn DJ Chính Hãng Tại Đà Nẵng | Pioneer DJ & AlphaTheta - VanMusic",
    description:
      "Tổng kho phân phối bàn DJ Pioneer DJ, AlphaTheta chính hãng tại Đà Nẵng: XDJ-RX3, DDJ-FLX4, Omnis-Duo, XDJ-AZ. Bảo hành 12-24T, hỗ trợ trả góp 0%, trải nghiệm trực tiếp tại Showroom Đà Nẵng & Huế.",
    url: `${siteUrl}/ban-dj`,
    type: "website",
    images: [
      {
        url: "/images/rental/rental_fleet_hero.jpg",
        width: 1200,
        height: 630,
        alt: "Mua Bàn DJ Chính Hãng Tại Đà Nẵng - VanMusic",
      },
    ],
  },
};

const banDjFaqs = [
  {
    q: "Mua bàn DJ ở đâu uy tín, chính hãng tại Đà Nẵng và Miền Trung?",
    a: "VanMusic (VanBass Music Center) là trung tâm phân phối thiết bị DJ chính hãng Pioneer DJ và AlphaTheta uy tín tại Đà Nẵng (Showroom: Nguyễn Tất Thành, Phường Thanh Khê Tây, Quận Thanh Khê) và TP Huế (442 Chi Lăng). 100% thiết bị có tem bảo hành chính hãng từ 12 - 24 tháng, hỗ trợ kỹ thuật trọn đời và linh kiện thay thế chuẩn.",
  },
  {
    q: "Người mới bắt đầu tập chơi DJ nên chọn mua dòng máy nào phù hợp?",
    a: "Với người mới bắt đầu hoặc tập luyện tại nhà, phân khúc DJ Controller 2 kênh như Pioneer DDJ-FLX4 hoặc AlphaTheta DDJ-FLX2 là lựa chọn tối ưu nhất. Máy kết nối trực tiếp với Laptop, Smartphone hoặc iPad qua phần mềm Rekordbox / Serato DJ, có tính năng Smart Fader và Smart CFX hỗ trợ chuyển bài mượt mà.",
  },
  {
    q: "Bàn DJ All-In-One độc lập có điểm gì khác biệt so với DJ Controller?",
    a: "Bàn DJ All-In-One (như Pioneer XDJ-RX3, AlphaTheta Omnis-Duo, XDJ-AZ, XDJ-XZ) tích hợp sẵn màn hình cảm ứng hiển thị sóng nhạc và bộ vi xử lý độc lập. Người chơi chỉ cần cắm USB đã phân tích nhạc qua Rekordbox là biểu diễn trực tiếp mà không cần dùng đến máy tính laptop.",
  },
  {
    q: "VanMusic có chính sách trả góp 0% và hỗ trợ kỹ thuật khi mua máy không?",
    a: "Có. VanMusic hỗ trợ trả góp 0% lãi suất qua thẻ tín dụng liên kết hơn 25 ngân hàng trên toàn quốc. Khi mua bàn DJ, quý khách được hỗ trợ cài đặt phần mềm, tặng kèm kho nhạc tuyển chọn và khóa hướng dẫn vận hành kỹ thuật cơ bản 1-kèm-1.",
  },
  {
    q: "Tôi có thể ghé showroom tại Đà Nẵng để trải nghiệm và test máy trước khi mua không?",
    a: "Hoàn toàn được. Quý khách có thể ghé trực tiếp Showroom VanMusic tại Nguyễn Tất Thành, Thanh Khê, Đà Nẵng để cắm USB trải nghiệm cảm giác mâm jogwheel, fader và âm thanh thực tế trước khi quyết định mua hàng.",
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
        "@type": "CollectionPage",
        "@id": `${siteUrl}/ban-dj#webpage`,
        "url": `${siteUrl}/ban-dj`,
        "name": "Mua Bàn DJ Chính Hãng Tại Đà Nẵng | Pioneer DJ & AlphaTheta",
        "description":
          "Danh mục bàn DJ chính hãng Pioneer DJ & AlphaTheta tại Đà Nẵng. Đầy đủ DJ Controller, All-In-One XDJ-RX3, DDJ-FLX4, Omnis-Duo, XDJ-AZ.",
        "breadcrumb": {
          "@id": `${siteUrl}/ban-dj#breadcrumb`,
        },
      },
      {
        "@type": ["Store", "LocalBusiness"],
        "@id": `${siteUrl}/ban-dj#store`,
        "name": "VanMusic - Tổng Kho Bàn DJ Chính Hãng Đà Nẵng",
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
          "Showroom phân phối và bán lẻ bàn DJ chính hãng Pioneer DJ, AlphaTheta tại Đà Nẵng & Miền Trung: XDJ-RX3, DDJ-FLX4, Omnis-Duo, XDJ-AZ, XDJ-RX2.",
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
