import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

export const metadata: Metadata = {
  title: "Liên Hệ VanBass Music Center | Tư Vấn Mua & Thuê Bàn DJ 24/7",
  description:
    "Liên hệ VanBass Music Center - Hotline/Zalo: 0706.067.799. Showroom trải nghiệm & tư vấn kỹ thuật âm thanh, mua bán và cho thuê bàn DJ Pioneer tại Đà Nẵng & Toàn quốc.",
  keywords: [
    "liên hệ vanbass",
    "hotline thuê bàn dj đà nẵng",
    "địa chỉ bán bàn dj đà nẵng",
    "tư vấn thiết bị dj",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Liên Hệ VanBass Music Center | Tư Vấn Thiết Bị DJ 24/7",
    description:
      "Hotline tư vấn và giao nhận setup thiết bị DJ tận nơi 24/7 tại Đà Nẵng & Hội An: 0706.067.799.",
    url: `${siteUrl}/contact`,
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

