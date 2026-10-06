import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

export const metadata: Metadata = {
  title: "Dịch Vụ DJ, Đào Tạo & Âm Thanh Sự Kiện Đà Nẵng",
  description:
    "Hệ sinh thái dịch vụ VanBass Music Center tại Đà Nẵng & Miền Trung: Mua bán & cho thuê bàn DJ, sửa chữa bảo dưỡng, đào tạo DJ/MC Hype, setup âm thanh sự kiện chuyên nghiệp.",
  keywords: [
    "dịch vụ dj đà nẵng",
    "dịch vụ âm thanh đà nẵng",
    "thuê bàn dj đà nẵng",
    "mua bàn dj đà nẵng",
    "sửa bàn dj đà nẵng",
    "đào tạo dj đà nẵng",
    "học dj đà nẵng",
    "đào tạo mc hype",
    "setup âm thanh sự kiện",
    "vanbass music center",
  ],
  alternates: {
    canonical: "/dich-vu",
  },
  openGraph: {
    title: "Dịch Vụ DJ, Đào Tạo & Âm Thanh Sự Kiện | VanBass Music Center",
    description:
      "Trung tâm dịch vụ thiết bị DJ, kỹ thuật sửa chữa, đào tạo nghệ thuật và giải pháp âm thanh biểu diễn chuyên nghiệp tại Đà Nẵng & Huế.",
    url: `${baseUrl}/dich-vu`,
    type: "website",
  },
};

export default function DichVuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
