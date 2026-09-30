import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

export const metadata: Metadata = {
  title: "Mua Bán & Cho Thuê Bàn DJ Chính Hãng Pioneer DJ & AlphaTheta | VanBass",
  description:
    "Kho bàn DJ chính hãng Pioneer DJ, AlphaTheta: Pioneer XDJ-RX3, XDJ-RX2, XDJ-RR, DDJ-FLX4, DDJ-FLX2, Omnis-Duo, XDJ-AZ, XDJ-AN, XDJ-XZ và loa B&C Speakers Italy. Mua bán giá tốt nhất, bảo hành 12-24 tháng, hỗ trợ trả góp 0%, dịch vụ cho thuê biểu diễn giao tận nơi 24/7 tại Đà Nẵng, Huế & Toàn quốc.",
  keywords: [
    // Top 8 Hot Search Priority Models
    "XDJ RX3",
    "xdj rx3",
    "mua xdj rx3",
    "bán xdj rx3",
    "giá xdj rx3",
    "thuê xdj rx3",
    "XDJ RX2",
    "xdj rx2",
    "mua xdj rx2",
    "bán xdj rx2",
    "thuê xdj rx2",
    "XDJ RR",
    "xdj rr",
    "mua xdj rr",
    "bán xdj rr",
    "thuê xdj rr",
    "DDJ FLX4",
    "ddj flx4",
    "mua ddj flx4",
    "bán ddj flx4",
    "giá ddj flx4",
    "thuê ddj flx4",
    "DDJ FLX2",
    "ddj flx2",
    "mua ddj flx2",
    "bán ddj flx2",
    "thuê ddj flx2",
    "OMNIS DUO",
    "omnis duo",
    "mua omnis duo",
    "bán omnis duo",
    "thuê omnis duo",
    "XDJ AZ",
    "xdj az",
    "mua xdj az",
    "bán xdj az",
    "thuê xdj az",
    "XDJ AN",
    "xdj an",
    "mua xdj an",
    "bán xdj an",
    "thuê xdj an",
    "XDJ XZ",
    "xdj xz",
    "mua xdj xz",
    "bán xdj xz",
    "thuê xdj xz",
    // Core Categories & Buying Keywords
    "mua bàn dj",
    "bán bàn dj",
    "giá bàn dj",
    "bàn dj chính hãng",
    "bàn dj pioneer",
    "bàn dj alphatheta",
    "mua bàn dj đà nẵng",
    "bán bàn dj đà nẵng",
    "mua bàn dj huế",
    "bán bàn dj huế",
    "bàn dj cũ giá rẻ",
    "bàn dj lướt 99%",
    "đại lý pioneer dj việt nam",
    "bàn dj all in one",
    "dj controller",
    "thuê bàn dj đà nẵng",
    "thuê bàn dj huế",
    "loa b&c speakers",
    "vanbass music center",
  ],
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Mua Bán & Cho Thuê Bàn DJ Chính Hãng Pioneer DJ & AlphaTheta | VanBass",
    description:
      "Kho bàn DJ chính hãng Pioneer DJ, AlphaTheta (XDJ-RX3, DDJ-FLX4, Omnis-Duo, XDJ-AZ, XDJ-RX2). Mua bán bảo hành 12-24T, trả góp 0%, cho thuê giá rẻ giao tận nơi 24/7.",
    url: `${siteUrl}/products`,
    type: "website",
    images: [
      {
        url: "/images/rental/rental_fleet_hero.jpg",
        width: 1200,
        height: 630,
        alt: "Mua Bán & Cho Thuê Bàn DJ Chính Hãng - VanBass Music Center",
      },
    ],
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

