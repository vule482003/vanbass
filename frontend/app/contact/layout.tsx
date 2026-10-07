import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

export const metadata: Metadata = {
  title: "Liên Hệ VanBass Music Center | Tư Vấn Mua & Thuê Bàn DJ",
  description:
    "Liên hệ VanBass Music Center - Hotline: 0905.614.566 (Mr. Tuyến) - 0944.498.987 (Mr. Tuấn) - 0706.067.799 (Mr. Vân). Showroom trải nghiệm & tư vấn kỹ thuật âm thanh, mua bán và cho thuê bàn DJ Pioneer tại Đà Nẵng, Huế & Toàn quốc.",
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
    title: "Liên Hệ VanBass Music Center | Tư Vấn Thiết Bị DJ",
    description:
      "Hotline tư vấn và giao nhận setup thiết bị DJ tận nơi tại Đà Nẵng & Hội An: 0905.614.566 (Mr. Tuyến) - 0944.498.987 (Mr. Tuấn) - 0706.067.799 (Mr. Vân).",
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

