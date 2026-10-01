import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

export const metadata: Metadata = {
  title: "Chính Sách & Quy Định | VanBass Music Center",
  description:
    "Chính sách bảo hành chính hãng, quy định đổi trả 1-đổi-1 trong 7 ngày, điều khoản thuê thiết bị DJ và cam kết bảo mật thông tin tại VanBass Music Center.",
  keywords: [
    "chính sách vanbass",
    "bảo hành bàn dj",
    "đổi trả thiết bị dj",
    "quy định thuê bàn dj",
    "điều khoản dịch vụ vanbass",
  ],
  alternates: {
    canonical: "/policies",
  },
  openGraph: {
    title: "Chính Sách & Quy Định | VanBass Music Center",
    description:
      "Chính sách bảo hành, đổi trả và quy định thuê thiết bị DJ tại VanBass Music Center Đà Nẵng.",
    url: `${siteUrl}/policies`,
    type: "website",
    images: [
      {
        url: "/images/rental/rental_fleet_hero.jpg",
        width: 1200,
        height: 630,
        alt: "Chính Sách & Quy Định - VanBass Music Center",
      },
    ],
  },
};

export default function PoliciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
