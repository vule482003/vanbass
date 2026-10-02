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
          "Trung tâm mua bán, cho thuê & sửa chữa bảo dưỡng bàn DJ chuyên nghiệp (Pioneer DJ, AlphaTheta) và loa biểu diễn B&C Speakers chính hãng tại Đà Nẵng, Thừa Thiên Huế & Toàn Miền Trung.",
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
          "streetAddress": "Nguyễn Tất Thành, Phường Thanh Khê Tây, Quận Thanh Khê (Đà Nẵng) & 442 Chi Lăng (TP Huế)",
          "addressLocality": "Đà Nẵng",
          "addressRegion": "Miền Trung",
          "addressCountry": "VN",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "16.0714",
          "longitude": "108.1882",
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
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "VanBass Music Center",
        "alternateName": ["VanBass", "VanBass DJ", "VanMusic", "VanMusic.com.vn"],
        "description": "Trung tâm mua bán, cho thuê bàn DJ & thiết bị âm thanh chuyên nghiệp Đà Nẵng | DJ Equipment Rental & Sales Vietnam",
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
