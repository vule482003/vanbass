import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

export const metadata: Metadata = {
  title: "DJ Equipment Rental Da Nang & Hoi An | Pioneer XDJ-RX3, DDJ-FLX4, Omnis-Duo Hire - VanBass",
  description:
    "Professional DJ equipment rental & sound system hire in Da Nang, Hoi An, Hue & Central Vietnam. Pioneer DJ XDJ-RX3, DDJ-FLX4, AlphaTheta Omnis-Duo, XDJ-AZ, CDJ-3000. 24/7 delivery & setup to hotels, luxury villas, beach clubs & private parties. Full English support. WhatsApp/Hotline: +84 706 067 799.",
  keywords: [
    // Top English Search Queries for Expat & Tourists
    "DJ equipment rental Da Nang",
    "DJ equipment rental Danang",
    "DJ gear rental Da Nang",
    "DJ gear hire Da Nang",
    "DJ deck hire Da Nang",
    "Rent DJ controller Da Nang",
    "Rent Pioneer DJ Da Nang",
    "Rent XDJ RX3 Da Nang",
    "Rent Pioneer XDJ RX3 Da Nang",
    "Rent DDJ FLX4 Da Nang",
    "Rent Omnis Duo Da Nang",
    "Rent AlphaTheta Omnis Duo Da Nang",
    "Rent XDJ AZ Da Nang",
    "Rent Pioneer CDJ Da Nang",
    "Rent CDJ 3000 Da Nang",
    "DJ equipment rental Hoi An",
    "DJ gear hire Hoi An",
    "DJ equipment rental Hue",
    "DJ gear rental Central Vietnam",
    "DJ gear hire Vietnam",
    "Where to rent DJ equipment in Da Nang",
    "DJ equipment rental near me Da Nang",
    "Sound equipment rental Da Nang",
    "Sound system hire Da Nang",
    "Wedding DJ equipment hire Hoi An",
    "Beach party DJ gear rental Da Nang",
    "Villa party DJ equipment Da Nang",
    "Expat DJ gear rental Vietnam",
    "VanBass music center",
  ],
  alternates: {
    canonical: "/dj-equipment-rental-danang",
  },
  openGraph: {
    title: "DJ Equipment Rental Da Nang & Hoi An | Pioneer XDJ-RX3, DDJ-FLX4, Omnis-Duo Hire",
    description:
      "Premier DJ gear rental in Da Nang, Hoi An & Vietnam: Pioneer XDJ-RX3, DDJ-FLX4, Omnis-Duo, XDJ-AZ, B&C Speakers. 24/7 delivery to hotels & villas. English support available.",
    url: `${siteUrl}/dj-equipment-rental-danang`,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/rental/rental_fleet_hero.jpg",
        width: 1200,
        height: 630,
        alt: "DJ Equipment Rental Da Nang Vietnam - VanBass Music Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DJ Equipment Rental Da Nang & Hoi An | VanBass Vietnam",
    description: "Rent Pioneer XDJ-RX3, DDJ-FLX4, Omnis-Duo, CDJ-3000 in Da Nang & Hoi An. 24/7 delivery & setup.",
    images: ["/images/rental/rental_fleet_hero.jpg"],
  },
};

const englishFaqs = [
  {
    q: "Can tourists, expat DJs, or foreigners rent DJ equipment in Da Nang & Hoi An?",
    a: "Yes, absolutely! VanBass provides 100% English support for international travelers, expat DJs, and event organizers. You can easily rent Pioneer DJ gear with a simple passport copy or hotel/villa address verification and a flexible refundable security deposit.",
  },
  {
    q: "What DJ gear models are available for hire in Da Nang?",
    a: "We stock a full fleet of genuine Pioneer DJ & AlphaTheta gear: All-In-One standalone systems (Pioneer XDJ-RX3, XDJ-RX2, XDJ-RR, AlphaTheta OMNIS-DUO with built-in battery, AlphaTheta XDJ-AZ 4-channel), DJ Controllers (Pioneer DDJ-FLX4, DDJ-FLX2), Flagship CDJ-3000 + DJM-A9 mixers, and Italian B&C active sound systems.",
  },
  {
    q: "Do you deliver and set up equipment at hotels, resorts, villas, or beach venues?",
    a: "Yes! We offer 24/7 on-demand delivery, full audio cabling, soundcheck, and setup directly to your hotel, luxury villa, beach club, or private party in Da Nang, Hoi An, and surrounding areas within 60 minutes.",
  },
  {
    q: "How much does it cost to rent DJ equipment per day (24 hours)?",
    a: "Daily rental rates are transparent: DJ Controllers (Pioneer DDJ-FLX4 / FLX2) start from $16 (400,000 VND)/day; Standalone All-In-One systems (Pioneer XDJ-RX3 / Omnis-Duo) from $48 (1,200,000 VND)/day; 4-channel setups from $72 (1,800,000 VND)/day. We offer 20% to 40% discounts for multi-day rentals.",
  },
  {
    q: "What accessories and cables are included with the rental?",
    a: "Every rental comes complete in a heavy-duty flight case with all required power cables, XLR / RCA audio cables to connect directly to sound systems, and USB cables. High-grade DJ headphones and microphones are also available upon request.",
  },
];

export default function EnglishRentalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Service", "LocalBusiness"],
        "@id": `${siteUrl}/dj-equipment-rental-danang#service`,
        "name": "VanBass - DJ Equipment Rental & Audio Hire Da Nang & Hoi An",
        "url": `${siteUrl}/dj-equipment-rental-danang`,
        "provider": {
          "@type": ["MusicStore", "LocalBusiness"],
          "name": "VanBass Music Center",
          "url": siteUrl,
          "telephone": "+84706067799",
          "priceRange": "$16 - $100",
          "currenciesAccepted": "USD, VND, EUR, AUD",
          "paymentAccepted": "Cash, Credit Card, PayPal, International Bank Transfer, Wise",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Nguyen Tat Thanh, Thanh Khe District",
            "addressLocality": "Da Nang",
            "addressRegion": "Central Vietnam",
            "addressCountry": "VN",
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "16.0714",
            "longitude": "108.1882",
          },
        },
        "description":
          "Premier DJ equipment rental service in Da Nang & Hoi An Vietnam. Pioneer XDJ-RX3, DDJ-FLX4, Omnis-Duo, CDJ-3000 for events, beach parties, villa gatherings, weddings, and club bookings.",
        "areaServed": [
          { "@type": "City", "name": "Da Nang" },
          { "@type": "City", "name": "Hoi An" },
          { "@type": "City", "name": "Hue" },
          { "@type": "AdministrativeArea", "name": "Central Vietnam" }
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/dj-equipment-rental-danang#faq`,
        "mainEntity": englishFaqs.map((faq) => ({
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
        "@id": `${siteUrl}/dj-equipment-rental-danang#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": siteUrl,
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "DJ Equipment Rental Da Nang",
            "item": `${siteUrl}/dj-equipment-rental-danang`,
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
