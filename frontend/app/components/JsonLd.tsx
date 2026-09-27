export default function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MusicStore", "LocalBusiness"],
        "@id": `${baseUrl}/#organization`,
        "name": "VanBass Music Center",
        "alternateName": [
          "VanBass DJ",
          "VanBass Music",
          "VanMusic",
          "Thuê DJ Đà Nẵng",
          "Thuê DJ",
          "Cho Thuê Bàn DJ Đà Nẵng",
          "DJ Equipment Rental Da Nang",
          "Hire DJ Da Nang",
        ],
        "url": baseUrl,
        "logo": `${baseUrl}/images/logo.png`,
        "image": `${baseUrl}/images/rental/rental_fleet_hero.jpg`,
        "description":
          "Trung tâm phân phối & dịch vụ cho thuê bàn DJ (Pioneer DJ XDJ-RX3, XDJ-RX2, XDJ-RR, DDJ-FLX4, DDJ-FLX2, AlphaTheta Omnis-Duo, XDJ-AZ, CDJ-3000), Loa biểu diễn B&C Speakers chính hãng tại Đà Nẵng & toàn quốc. Professional English speaking DJ gear rental service in Da Nang & Vietnam.",
        "telephone": "+84706067799",
        "priceRange": "$$",
        "currenciesAccepted": "VND, USD",
        "paymentAccepted": "Cash, Credit Card, Bank Transfer, MoMo",
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
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            "opens": "08:00",
            "closes": "22:00",
          },
        ],
        "sameAs": [
          "https://facebook.com/vanbassmusiccenter",
          "https://instagram.com/vanbass",
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "168",
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": [
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "Hoàng Minh (DJ M-Tronic)"
            },
            "datePublished": "2026-03-15",
            "reviewBody": "Dịch vụ thuê bàn DJ XDJ-RX3 tại Đà Nẵng rất uy tín, máy mới 99%, fader mượt và kỹ thuật setup tận nơi cực kỳ nhiệt tình.",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            }
          },
          {
            "@type": "Review",
            "author": {
              "@type": "Person",
              "name": "Alex Johnson (Expat DJ)"
            },
            "datePublished": "2026-02-28",
            "reviewBody": "Best DJ equipment rental in Da Nang! Rented a DDJ-FLX4 for our beach party, quick delivery and friendly English support.",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            }
          }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Dịch Vụ Cho Thuê & Phân Phối Thiết Bị DJ Chính Hãng (DJ Equipment Sales & Rental)",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Pioneer DJ XDJ-RX3 All-In-One DJ System",
                "model": "XDJ-RX3",
                "brand": { "@type": "Brand", "name": "Pioneer DJ" },
                "url": `${baseUrl}/thue-ban-dj`,
                "description":
                  "Dịch vụ cho thuê & phân phối bàn DJ độc lập Pioneer XDJ-RX3 màn hình 10.1 inch chuyên nghiệp tại Đà Nẵng & toàn quốc. Professional Pioneer XDJ-RX3 hire in Da Nang.",
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Pioneer DJ XDJ-RX2 All-In-One DJ System",
                "model": "XDJ-RX2",
                "brand": { "@type": "Brand", "name": "Pioneer DJ" },
                "url": `${baseUrl}/thue-ban-dj`,
                "description": "Cho thuê bàn DJ Pioneer XDJ-RX2 bền bỉ, 2 kênh độc lập cho sự kiện và biểu diễn chuyên nghiệp.",
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Pioneer DJ XDJ-RR 2-Channel All-In-One DJ System",
                "model": "XDJ-RR",
                "brand": { "@type": "Brand", "name": "Pioneer DJ" },
                "url": `${baseUrl}/thue-ban-dj`,
                "description": "Cho thuê bàn DJ Pioneer XDJ-RR nhỏ gọn, độc lập chuẩn club di động.",
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Pioneer DJ DDJ-FLX4 2-Channel DJ Controller",
                "model": "DDJ-FLX4",
                "brand": { "@type": "Brand", "name": "Pioneer DJ" },
                "url": `${baseUrl}/thue-ban-dj`,
                "description":
                  "Dịch vụ cho thuê bàn DJ Controller Pioneer DDJ-FLX4 2 kênh cho Rekordbox và Serato DJ, nhỏ gọn, giá rẻ từ 400k/ngày.",
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "AlphaTheta DDJ-FLX2 Portable DJ Controller",
                "model": "DDJ-FLX2",
                "brand": { "@type": "Brand", "name": "AlphaTheta" },
                "url": `${baseUrl}/thue-ban-dj`,
                "description": "Bàn DJ mini siêu di động AlphaTheta DDJ-FLX2 cho tiệc nhỏ, du lịch, livestream.",
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "AlphaTheta OMNIS-DUO Portable All-In-One Wireless DJ System",
                "model": "OMNIS-DUO",
                "brand": { "@type": "Brand", "name": "AlphaTheta" },
                "url": `${baseUrl}/thue-ban-dj`,
                "description":
                  "Hệ thống DJ di động pin tích hợp và Bluetooth AlphaTheta OMNIS-DUO cho tiệc ngoài trời, bãi biển Đà Nẵng, villa, du thuyền.",
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "AlphaTheta XDJ-AZ 4-Channel Professional All-In-One DJ System",
                "model": "XDJ-AZ",
                "brand": { "@type": "Brand", "name": "AlphaTheta" },
                "url": `${baseUrl}/thue-ban-dj`,
                "description":
                  "Hệ thống bàn DJ All-In-One 4 kênh thế hệ mới nhất AlphaTheta XDJ-AZ chuẩn Club & Festival biểu diễn đỉnh cao.",
              },
            },
          ],
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Thuê bàn DJ tại VanBass có những dòng máy nào (XDJ-RX3, DDJ-FLX4, Omnis-Duo, XDJ-AZ)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "VanBass cung cấp đầy đủ các dòng máy hot nhất: Pioneer DJ XDJ-RX3, XDJ-RX2, XDJ-RR, DDJ-FLX4, DDJ-FLX2, AlphaTheta OMNIS-DUO, XDJ-AZ và CDJ-3000 + DJM-A9 chuẩn quốc tế.",
            },
          },
          {
            "@type": "Question",
            "name": "Can foreign DJs or expats rent DJ equipment in Da Nang & Vietnam?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! VanBass provides full English support for foreign DJs, travelers, and event organizers. We deliver and setup Pioneer DJ XDJ-RX3, DDJ-FLX4, Omnis-Duo, and sound systems directly to your hotel, villa, or venue in Da Nang and Hoi An with passport/deposit flexible procedures.",
            },
          },
          {
            "@type": "Question",
            "name": "Giá thuê bàn DJ tại Đà Nẵng là bao nhiêu một ngày?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Giá thuê dao động từ 400.000đ/ngày đối với Pioneer DDJ-FLX4/DDJ-FLX2, từ 1.200.000đ/ngày đối với Pioneer XDJ-RX3 / Omnis-Duo. Có hỗ trợ giao và setup tận nơi 24/7.",
            },
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "VanBass Music Center",
        "alternateName": ["VanBass", "VanBass DJ", "VanMusic", "VanMusic.com.vn"],
        "description": "Dịch vụ cho thuê bàn DJ & thiết bị âm thanh chuyên nghiệp Đà Nẵng | DJ Equipment Rental Vietnam",
        "publisher": {
          "@id": `${baseUrl}/#organization`,
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${baseUrl}/products?search={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
