export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MusicStore",
        "@id": "https://vanbass.vn/#organization",
        "name": "VanBass Music Center",
        "url": "https://vanbass.vn",
        "logo": "https://vanbass.vn/logo.png",
        "description": "Trung tâm phân phối & cho thuê thiết bị DJ, DJ Controller, Mixer, CDJ, Loa biểu diễn chính hãng tại Đà Nẵng",
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
          "https://facebook.com/vanbass",
          "https://instagram.com/vanbass",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://vanbass.vn/#website",
        "url": "https://vanbass.vn",
        "name": "VanBass Music Center",
        "description": "Thiết bị DJ & Âm thanh chuyên nghiệp Đà Nẵng",
        "publisher": {
          "@id": "https://vanbass.vn/#organization",
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://vanbass.vn/products?q={search_term_string}",
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
