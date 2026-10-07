import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

export const metadata: Metadata = {
  title: "Mua Bán Bàn DJ Đà Nẵng, Huế & Miền Trung Uy Tín Giá Rẻ | Pioneer DJ & AlphaTheta - VanBass",
  description:
    "Đại lý phân phối & mua bán bàn DJ chính hãng Pioneer DJ, AlphaTheta tại Đà Nẵng, Thừa Thiên Huế & Toàn quốc: Pioneer XDJ-RX3, XDJ-RX2, XDJ-RR, DDJ-FLX4, DDJ-FLX2, Omnis-Duo, XDJ-AZ, XDJ-XZ và loa B&C Speakers Italy. Mua bán giá tốt nhất, máy mới 100% & Like New 99%, bảo hành 12-24 tháng, hỗ trợ trả góp 0%, test máy trực tiếp tại Showroom Đà Nẵng. Hotline tư vấn: 0905.614.566 (Mr. Tuyến) - 0706.067.799 (Mr. Vân).",
  keywords: [
    // Core Buying Keywords Da Nang & Central Vietnam
    "mua bán dj đà nẵng",
    "mua ban dj da nang",
    "mua bán bàn dj đà nẵng",
    "mua ban ban dj da nang",
    "bán bàn dj đà nẵng",
    "ban ban dj da nang",
    "mua bàn dj đà nẵng",
    "mua ban dj",
    "mua bán bàn dj",
    "mua ban ban dj",
    "bán bàn dj",
    "ban ban dj",
    "mua bàn dj",
    "mua ban dj huế",
    "mua ban dj hue",
    "mua bàn dj huế",
    "bán bàn dj huế",
    "mua bán dj miền trung",
    "mua ban dj mien trung",
    "mua bán bàn dj miền trung",
    "bán bàn dj miền trung",
    // Trust & Location Question Keywords
    "mua bàn dj uy tín",
    "mua ban dj uy tin",
    "mua bàn dj ở đâu uy tín",
    "mua ban dj o dau uy tin",
    "mua bàn dj ở đâu đà nẵng",
    "mua ban dj o dau da nang",
    "địa chỉ mua bàn dj uy tín",
    "địa chỉ mua bàn dj đà nẵng",
    "shop bán bàn dj uy tín",
    "cửa hàng bàn dj đà nẵng",
    "shop bàn dj đà nẵng",
    "đại lý pioneer dj đà nẵng",
    "đại lý pioneer dj việt nam",
    // Top Hot Search Models
    "XDJ RX3",
    "xdj rx3",
    "mua xdj rx3",
    "bán xdj rx3",
    "giá xdj rx3",
    "mua xdj rx3 đà nẵng",
    "XDJ RX2",
    "xdj rx2",
    "mua xdj rx2",
    "bán xdj rx2",
    "XDJ RR",
    "xdj rr",
    "mua xdj rr",
    "DDJ FLX4",
    "ddj flx4",
    "mua ddj flx4",
    "bán ddj flx4",
    "giá ddj flx4",
    "mua ddj flx4 đà nẵng",
    "DDJ FLX2",
    "ddj flx2",
    "mua ddj flx2",
    "OMNIS DUO",
    "omnis duo",
    "mua omnis duo",
    "bán omnis duo",
    "XDJ AZ",
    "xdj az",
    "mua xdj az",
    "bán xdj az",
    "XDJ AN",
    "xdj an",
    "XDJ XZ",
    "xdj xz",
    "mua xdj xz",
    "bàn dj cũ giá rẻ",
    "bàn dj lướt 99%",
    "bàn dj like new",
    "bàn dj trả góp",
    "vanbass music center",
    "vanbass",
  ],
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Mua Bán Bàn DJ Đà Nẵng, Huế & Miền Trung Uy Tín Giá Rẻ | VanBass Music Center",
    description:
      "Kho bàn DJ chính hãng Pioneer DJ, AlphaTheta (XDJ-RX3, DDJ-FLX4, Omnis-Duo, XDJ-AZ, XDJ-RX2). Mua bán máy mới 100% & lướt 99%, bảo hành 12-24T, trả góp 0%, test máy trực tiếp tại Showroom Đà Nẵng.",
    url: `${siteUrl}/products`,
    type: "website",
    images: [
      {
        url: "/images/rental/rental_fleet_hero.jpg",
        width: 1200,
        height: 630,
        alt: "Mua Bán Bàn DJ Chính Hãng Đà Nẵng - VanBass Music Center",
      },
    ],
  },
};

const buyingFaqs = [
  {
    q: "Mua bàn DJ chính hãng Pioneer DJ và AlphaTheta tại Đà Nẵng ở đâu uy tín?",
    a: "VanBass Music Center tại 77 Nguyễn Tất Thành, phường Hải Châu, thành phố Đà Nẵng và chi nhánh 442 Chi Lăng, TP Huế là trung tâm phân phối thiết bị DJ chính hãng Pioneer DJ, AlphaTheta uy tín hàng đầu tại Đà Nẵng, Huế & Miền Trung. Tất cả sản phẩm đều có hóa đơn VAT, bảo hành 12 - 24 tháng và hỗ trợ kỹ thuật trọn đời.",
  },
  {
    q: "VanBass có hỗ trợ mua bàn DJ trả góp 0% tại Đà Nẵng không?",
    a: "Có. VanBass hỗ trợ chương trình mua bàn DJ trả góp 0% lãi suất qua thẻ tín dụng liên kết hơn 25 ngân hàng trên toàn quốc, thủ tục nhanh chóng trong 5 phút.",
  },
  {
    q: "Khách hàng có được test thử máy trực tiếp trước khi mua không?",
    a: "Có. Khách hàng có thể ghé trực tiếp Showroom VanBass tại 77 Nguyễn Tất Thành, phường Hải Châu, thành phố Đà Nẵng hoặc 442 Chi Lăng, TP Huế để cắm USB trải nghiệm thử trực tiếp tất cả các dòng máy (Pioneer XDJ-RX3, DDJ-FLX4, Omnis-Duo, XDJ-AZ) trên hệ thống loa chuyên nghiệp trước khi quyết định mua.",
  },
  {
    q: "VanBass có chương trình thu cũ đổi mới (Trade-in) bàn DJ không?",
    a: "Có. VanBass nhận thu mua và trợ giá thu cũ đổi mới cho các dòng bàn DJ Pioneer (DDJ-400, DDJ-FLX4, XDJ-RX2, XDJ-XZ...) để quý khách nâng cấp lên các dòng máy cao cấp hơn như XDJ-RX3 hoặc AlphaTheta XDJ-AZ.",
  },
];

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Store", "LocalBusiness"],
        "@id": `${siteUrl}/products#store`,
        "name": "VanBass Music Center - Showroom Mua Bán Bàn DJ Chính Hãng Đà Nẵng",
        "url": `${siteUrl}/products`,
        "telephone": ["+84905614566", "+84944498987", "+84706067799"],
        "priceRange": "5.000.000đ - 105.000.000đ",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "77 Nguyễn Tất Thành, phường Hải Châu, thành phố Đà Nẵng",
          "addressLocality": "phường Hải Châu, Đà Nẵng",
          "addressRegion": "Đà Nẵng",
          "addressCountry": "VN",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "16.0714",
          "longitude": "108.1882",
        },
        "description":
          "Showroom phân phối thiết bị DJ chính hãng Pioneer DJ, AlphaTheta tại Đà Nẵng (77 Nguyễn Tất Thành) & Huế (442 Chi Lăng): XDJ-RX3, DDJ-FLX4, Omnis-Duo, XDJ-AZ.",
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/products#faq`,
        "mainEntity": buyingFaqs.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a,
          },
        })),
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

