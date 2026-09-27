import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

export const metadata: Metadata = {
  title: "Thiết Bị DJ Chính Hãng & Bàn DJ Pioneer | Mua Bán & Cho Thuê Đà Nẵng",
  description:
    "Tổng hợp kho thiết bị DJ chính hãng Pioneer DJ, AlphaTheta, B&C Speakers: XDJ-RX3, XDJ-RX2, DDJ-FLX4, DDJ-FLX2, Omnis-Duo, XDJ-AZ, CDJ-3000. Mua bán & cho thuê giá rẻ nhất tại Đà Nẵng & Toàn quốc.",
  keywords: [
    "thiết bị dj",
    "bàn dj pioneer",
    "mua bàn dj đà nẵng",
    "bán bàn dj chính hãng",
    "XDJ RX3",
    "DDJ FLX4",
    "Omnis Duo",
    "XDJ AZ",
    "loa b&c speakers",
    "vanbass music center",
  ],
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Thiết Bị DJ Chính Hãng & Bàn DJ Pioneer | Mua Bán & Cho Thuê | VanBass",
    description:
      "Kho thiết bị DJ chính hãng Pioneer DJ, AlphaTheta, Loa B&C Speakers tại Đà Nẵng. Mua bán & cho thuê uy tín giá tốt.",
    url: `${siteUrl}/products`,
    type: "website",
    images: [
      {
        url: "/images/rental/rental_fleet_hero.jpg",
        width: 1200,
        height: 630,
        alt: "Thiết Bị DJ Chính Hãng - VanBass Music Center",
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

