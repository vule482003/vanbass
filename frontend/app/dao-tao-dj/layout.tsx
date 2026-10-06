import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

export const metadata: Metadata = {
  title: "Đào Tạo DJ Thực Hành Đà Nẵng - Học DJ 1 Kèm 1",
  description:
    "Khóa học đào tạo DJ thực hành 1 kèm 1 tại Đà Nẵng trên thiết bị Pioneer DJ & AlphaTheta chuẩn Club. Lộ trình bài bản từ Beatmatch, EQ Mixing đến biểu diễn thực tế.",
  keywords: [
    "đào tạo dj đà nẵng",
    "học dj đà nẵng",
    "học dj thực hành đà nẵng",
    "khóa học dj đà nẵng",
    "lớp học dj đà nẵng",
    "học đánh dj",
    "học dj 1 kèm 1",
    "học dj pioneer",
    "học beatmatch dj",
    "vanbass dj academy",
  ],
  alternates: {
    canonical: "/dao-tao-dj",
  },
  openGraph: {
    title: "Đào Tạo DJ Thực Hành Tại Đà Nẵng | VanBass Music Center",
    description:
      "Khóa đào tạo DJ thực hành chuyên sâu tại Đà Nẵng. Thực hành trực tiếp 100% trên thiết bị Pioneer DJ, làm chủ mixing và xử lý âm thanh chuyên nghiệp.",
    url: `${baseUrl}/dao-tao-dj`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/images/services/dj_academy_hero.jpg`,
        width: 1200,
        height: 630,
        alt: "Đào Tạo DJ Thực Hành Đà Nẵng - VanBass",
      },
    ],
  },
};

export default function DaoTaoDjLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
