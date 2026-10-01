import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

export const metadata: Metadata = {
  title: "Về VanBass Music Center | Phân Phối & Cho Thuê Thiết Bị DJ Đà Nẵng",
  description:
    "Tìm hiểu về VanBass Music Center - Trung tâm cung cấp, bán buôn bán lẻ và cho thuê thiết bị DJ, Pioneer DJ, bàn DJ All-in-one, Loa biểu diễn B&C Speakers uy tín hàng đầu Đà Nẵng & Miền Trung.",
  keywords: [
    "về vanbass",
    "vanbass music center",
    "showroom dj đà nẵng",
    "cửa hàng thiết bị dj đà nẵng",
    "đại lý pioneer dj đà nẵng",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Về VanBass Music Center | Thiết Bị DJ & Âm Thanh Chuyên Nghiệp",
    description:
      "Showroom & Trung tâm phân phối thiết bị DJ chính hãng Pioneer DJ, AlphaTheta, B&C Speakers tại Đà Nẵng.",
    url: `${siteUrl}/about`,
    type: "website",
    images: [
      {
        url: "/images/rental/rental_fleet_hero.jpg",
        width: 1200,
        height: 630,
        alt: "Về VanBass Music Center",
      },
    ],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

