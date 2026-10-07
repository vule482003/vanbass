import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

export const metadata: Metadata = {
  title: "Dạy Học MC / Hype Sự Kiện Tại Đà Nẵng & Huế | Khóa Học Thực Chiến - VanBass",
  description:
    "Khóa dạy học MC Hype sự kiện, Nightlife & Festival thực chiến tại Đà Nẵng & Huế. Rèn luyện giọng nói sân khấu, kỹ năng tương tác đám đông, bắt nhịp drop và phối hợp cùng DJ chuyên nghiệp.",
  keywords: [
    // Local SEO Đà Nẵng
    "học mc tại đà nẵng",
    "học mc đà nẵng",
    "học mc hype đà nẵng",
    "học mc sự kiện đà nẵng",
    "dạy mc tại đà nẵng",
    "dạy học mc hype đà nẵng",
    "học hype tại đà nẵng",
    "khóa học mc đà nẵng",
    "khóa học mc hype đà nẵng",
    "lớp học mc sự kiện đà nẵng",
    // Local SEO Huế
    "học mc tại huế",
    "học mc huế",
    "học mc hype tại huế",
    "học mc/hype tại huế",
    "dạy mc sự kiện tại huế",
    "dạy học mc hype huế",
    // Chuyên môn & Thực chiến
    "đào tạo hype man",
    "học mc nightlife",
    "học dẫn chương trình sự kiện",
    "luyện giọng mc sân khấu",
    "vanbass mc academy",
  ],
  alternates: {
    canonical: "/day-hoc-mc-hype",
  },
  openGraph: {
    title: "Dạy Học MC / Hype Sự Kiện Tại Đà Nẵng & Huế | Khóa Học Thực Chiến - VanBass",
    description:
      "Khóa dạy học MC Hype sự kiện thực chiến tại Đà Nẵng & Huế. Làm chủ sân khấu, phong thái biểu diễn và kỹ năng khuấy động không khí sân khấu cùng DJ chuyên nghiệp.",
    url: `${baseUrl}/day-hoc-mc-hype`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/images/services/mc_hype_hero.jpg`,
        width: 1200,
        height: 630,
        alt: "Khóa học MC Hype sự kiện tại Đà Nẵng và Huế - VanBass Music Center",
      },
    ],
  },
};

export default function DayHocMcHypeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
