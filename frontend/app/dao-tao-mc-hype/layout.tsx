import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

export const metadata: Metadata = {
  title: "Đào Tạo MC / Hype Sự Kiện Đà Nẵng - Khóa Học MC Hype",
  description:
    "Khóa học đào tạo MC Hype sự kiện, Nightlife & Festival tại Đà Nẵng. Rèn luyện giọng nói sân khấu, kỹ năng tương tác khán giả, bắt nhịp nhạc và phối hợp cùng DJ chuyên nghiệp.",
  keywords: [
    "đào tạo mc hype đà nẵng",
    "học mc hype đà nẵng",
    "học mc sự kiện đà nẵng",
    "khóa học mc hype",
    "đào tạo hype man",
    "học mc nightlife",
    "học dẫn chương trình sự kiện",
    "luyện giọng mc sân khấu",
    "vanbass mc academy",
  ],
  alternates: {
    canonical: "/dao-tao-mc-hype",
  },
  openGraph: {
    title: "Đào Tạo MC / Hype Sự Kiện Tại Đà Nẵng | VanBass Music Center",
    description:
      "Khóa đào tạo MC Hype sự kiện thực chiến tại Đà Nẵng. Làm chủ sân khấu, phong thái biểu diễn và kỹ năng khuấy động không khí sân khấu chuyên nghiệp.",
    url: `${baseUrl}/dao-tao-mc-hype`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/images/services/mc_hype_hero.jpg`,
        width: 1200,
        height: 630,
        alt: "Đào Tạo MC Hype Sự Kiện Đà Nẵng - VanBass",
      },
    ],
  },
};

export default function DaoTaoMcHypeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
