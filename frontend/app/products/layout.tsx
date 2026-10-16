import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

export const metadata: Metadata = {
  title: "Mua Bán Bàn DJ Đà Nẵng, Huế & Miền Trung Uy Tín Giá Rẻ | Pioneer DJ & AlphaTheta",
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

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

