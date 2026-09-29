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
          "Mua Bán DJ Đà Nẵng",
          "Mua Bán DJ Huế",
          "Mua Bán DJ Miền Trung",
          "Thuê DJ Đà Nẵng",
          "Thuê Bàn DJ Huế",
          "Thuê Bàn DJ Miền Trung",
          "Cho Thuê Bàn DJ Đà Nẵng",
          "Sửa Chữa Bàn DJ Đà Nẵng",
          "Sửa Bàn DJ Huế",
          "Sửa Bàn DJ Miền Trung",
          "DJ Equipment Repair Da Nang",
          "DJ Equipment Rental Da Nang",
          "DJ Equipment Rental Hue",
          "DJ Equipment Rental Central Vietnam",
          "Hire DJ Da Nang",
        ],
        "url": baseUrl,
        "logo": `${baseUrl}/images/logo.png`,
        "image": `${baseUrl}/images/rental/rental_fleet_hero.jpg`,
        "description":
          "Trung tâm mua bán, cho thuê & sửa chữa bảo dưỡng bàn DJ chuyên nghiệp (Pioneer DJ XDJ-RX3, DDJ-FLX4, Omnis-Duo, XDJ-AZ), Loa biểu diễn B&C Speakers chính hãng tại Đà Nẵng, Thừa Thiên Huế & Toàn Miền Trung.",
        "telephone": "+84706067799",
        "priceRange": "$$",
        "currenciesAccepted": "VND, USD",
        "paymentAccepted": "Cash, Credit Card, Bank Transfer, MoMo",
        "areaServed": [
          { "@type": "City", "name": "Đà Nẵng" },
          { "@type": "City", "name": "Thừa Thiên Huế" },
          { "@type": "City", "name": "Huế" },
          { "@type": "City", "name": "Hội An" },
          { "@type": "AdministrativeArea", "name": "Quảng Nam" },
          { "@type": "AdministrativeArea", "name": "Quảng Trị" },
          { "@type": "AdministrativeArea", "name": "Quảng Bình" },
          { "@type": "AdministrativeArea", "name": "Miền Trung" },
          { "@type": "Country", "name": "Vietnam" }
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Đà Nẵng & Huế",
          "addressLocality": "Đà Nẵng",
          "addressRegion": "Miền Trung",
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
              "name": "Cho thuê & phân phối Pioneer DJ XDJ-RX3 All-In-One DJ System",
              "price": "1200000",
              "priceCurrency": "VND",
              "availability": "https://schema.org/InStock",
              "url": `${baseUrl}/thue-ban-dj`,
              "itemOffered": {
                "@type": "Service",
                "name": "Dịch vụ cho thuê & phân phối bàn DJ Pioneer DJ XDJ-RX3",
                "description":
                  "Dịch vụ cho thuê & phân phối bàn DJ độc lập Pioneer XDJ-RX3 màn hình 10.1 inch chuyên nghiệp tại Đà Nẵng & toàn quốc. Professional Pioneer XDJ-RX3 hire in Da Nang.",
                "url": `${baseUrl}/thue-ban-dj`,
                "provider": {
                  "@id": `${baseUrl}/#organization`,
                },
              },
            },
            {
              "@type": "Offer",
              "name": "Cho thuê & phân phối Pioneer DJ XDJ-RX2 All-In-One DJ System",
              "price": "800000",
              "priceCurrency": "VND",
              "availability": "https://schema.org/InStock",
              "url": `${baseUrl}/thue-ban-dj`,
              "itemOffered": {
                "@type": "Service",
                "name": "Dịch vụ cho thuê & phân phối bàn DJ Pioneer DJ XDJ-RX2",
                "description": "Cho thuê bàn DJ Pioneer XDJ-RX2 bền bỉ, 2 kênh độc lập cho sự kiện và biểu diễn chuyên nghiệp.",
                "url": `${baseUrl}/thue-ban-dj`,
                "provider": {
                  "@id": `${baseUrl}/#organization`,
                },
              },
            },
            {
              "@type": "Offer",
              "name": "Cho thuê & phân phối Pioneer DJ XDJ-RR 2-Channel All-In-One DJ System",
              "price": "600000",
              "priceCurrency": "VND",
              "availability": "https://schema.org/InStock",
              "url": `${baseUrl}/thue-ban-dj`,
              "itemOffered": {
                "@type": "Service",
                "name": "Dịch vụ cho thuê & phân phối bàn DJ Pioneer DJ XDJ-RR",
                "description": "Cho thuê bàn DJ Pioneer XDJ-RR nhỏ gọn, độc lập chuẩn club di động.",
                "url": `${baseUrl}/thue-ban-dj`,
                "provider": {
                  "@id": `${baseUrl}/#organization`,
                },
              },
            },
            {
              "@type": "Offer",
              "name": "Cho thuê & phân phối Pioneer DJ DDJ-FLX4 2-Channel DJ Controller",
              "price": "400000",
              "priceCurrency": "VND",
              "availability": "https://schema.org/InStock",
              "url": `${baseUrl}/thue-ban-dj`,
              "itemOffered": {
                "@type": "Service",
                "name": "Dịch vụ cho thuê & phân phối bàn DJ Pioneer DJ DDJ-FLX4",
                "description":
                  "Dịch vụ cho thuê bàn DJ Controller Pioneer DDJ-FLX4 2 kênh cho Rekordbox và Serato DJ, nhỏ gọn, giá rẻ từ 400k/ngày.",
                "url": `${baseUrl}/thue-ban-dj`,
                "provider": {
                  "@id": `${baseUrl}/#organization`,
                },
              },
            },
            {
              "@type": "Offer",
              "name": "Cho thuê & phân phối AlphaTheta DDJ-FLX2 Portable DJ Controller",
              "price": "350000",
              "priceCurrency": "VND",
              "availability": "https://schema.org/InStock",
              "url": `${baseUrl}/thue-ban-dj`,
              "itemOffered": {
                "@type": "Service",
                "name": "Dịch vụ cho thuê & phân phối bàn DJ AlphaTheta DDJ-FLX2",
                "description": "Bàn DJ mini siêu di động AlphaTheta DDJ-FLX2 cho tiệc nhỏ, du lịch, livestream.",
                "url": `${baseUrl}/thue-ban-dj`,
                "provider": {
                  "@id": `${baseUrl}/#organization`,
                },
              },
            },
            {
              "@type": "Offer",
              "name": "Cho thuê & phân phối AlphaTheta OMNIS-DUO Portable All-In-One Wireless DJ System",
              "price": "1200000",
              "priceCurrency": "VND",
              "availability": "https://schema.org/InStock",
              "url": `${baseUrl}/thue-ban-dj`,
              "itemOffered": {
                "@type": "Service",
                "name": "Dịch vụ cho thuê & phân phối bàn DJ AlphaTheta OMNIS-DUO",
                "description":
                  "Hệ thống DJ di động pin tích hợp và Bluetooth AlphaTheta OMNIS-DUO cho tiệc ngoài trời, bãi biển Đà Nẵng, villa, du thuyền.",
                "url": `${baseUrl}/thue-ban-dj`,
                "provider": {
                  "@id": `${baseUrl}/#organization`,
                },
              },
            },
            {
              "@type": "Offer",
              "name": "Cho thuê & phân phối AlphaTheta XDJ-AZ 4-Channel Professional All-In-One DJ System",
              "price": "2000000",
              "priceCurrency": "VND",
              "availability": "https://schema.org/InStock",
              "url": `${baseUrl}/thue-ban-dj`,
              "itemOffered": {
                "@type": "Service",
                "name": "Dịch vụ cho thuê & phân phối bàn DJ AlphaTheta XDJ-AZ",
                "description":
                  "Hệ thống bàn DJ All-In-One 4 kênh thế hệ mới nhất AlphaTheta XDJ-AZ chuẩn Club & Festival biểu diễn đỉnh cao.",
                "url": `${baseUrl}/thue-ban-dj`,
                "provider": {
                  "@id": `${baseUrl}/#organization`,
                },
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
