export default function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanbass.vercel.app";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MusicStore", "LocalBusiness"],
        "@id": `${baseUrl}/#organization`,
        "name": "VanBass Music Center",
        "url": baseUrl,
        "logo": `${baseUrl}/images/logo.png`,
        "image": `${baseUrl}/images/logo.png`,
        "description": "Trung tâm phân phối & dịch vụ cho thuê bàn DJ (Pioneer DJ XDJ-RX3, DDJ-FLX4, CDJ-3000), Mixer, Loa biểu diễn chính hãng tại Đà Nẵng và toàn quốc",
        "telephone": "+84706067799",
        "priceRange": "$$",
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
            "opens": "08:30",
            "closes": "21:30",
          },
        ],
        "sameAs": [
          "https://facebook.com/vanbassmusiccenter",
          "https://instagram.com/vanbass",
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Dịch Vụ Cho Thuê Bàn DJ & Thiết Bị Âm Thanh",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Cho Thuê Bàn DJ Pioneer DJ XDJ-RX3 All-In-One",
                "url": `${baseUrl}/thue-ban-dj`,
                "description": "Dịch vụ cho thuê bàn DJ độc lập Pioneer XDJ-RX3 màn hình 10.1 inch biểu diễn sự kiện, tiệc cưới, bar club chuyên nghiệp.",
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Cho Thuê Bàn DJ Pioneer DDJ-FLX4 Controller",
                "url": `${baseUrl}/thue-ban-dj`,
                "description": "Dịch vụ cho thuê bàn DJ Controller Pioneer DDJ-FLX4 2 kênh cho Rekordbox và Serato DJ, nhỏ gọn, giá rẻ.",
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "VanBass Music Center",
        "alternateName": ["VanBass", "VanBass DJ", "VanBass Music"],
        "description": "Dịch vụ cho thuê bàn DJ & thiết bị âm thanh chuyên nghiệp Đà Nẵng",
        "publisher": {
          "@id": `${baseUrl}/#organization`,
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${baseUrl}/products?q={search_term_string}`,
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
