import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

export const metadata: Metadata = {
  title: "Dạy Học DJ Tại Đà Nẵng & Huế | Khóa Học DJ Thực Hành 1 Kèm 1 - VanBass",
  description:
    "Khóa dạy học DJ thực hành 1 kèm 1 tại Đà Nẵng & hỗ trợ học viên tại Huế trên thiết bị Pioneer DJ, AlphaTheta chuẩn Club. Lộ trình bài bản từ cảm âm, Beatmatch, EQ Mixing đến biểu diễn thực tế.",
  keywords: [
    // Local SEO Đà Nẵng
    "học dj tại đà nẵng",
    "học dj đà nẵng",
    "dạy dj tại đà nẵng",
    "dạy học dj đà nẵng",
    "khóa học dj đà nẵng",
    "lớp dj tại đà nẵng",
    "lớp học dj đà nẵng",
    "trung tâm dạy dj đà nẵng",
    "học dj chuyên nghiệp đà nẵng",
    "học dj cho người mới bắt đầu đà nẵng",
    // Local SEO Huế
    "học dj tại huế",
    "học dj huế",
    "dạy dj tại huế",
    "dạy học dj huế",
    "khóa học dj huế",
    "lớp dj tại huế",
    // Chuyên môn & Thực hành
    "học dj thực hành",
    "học đánh dj 1 kèm 1",
    "học dj pioneer",
    "học beatmatch dj",
    "khóa học dj cơ bản",
    "khóa học dj nâng cao",
    "vanbass dj academy",
  ],
  alternates: {
    canonical: "/day-hoc-dj",
  },
  openGraph: {
    title: "Dạy Học DJ Tại Đà Nẵng & Huế | Khóa Học DJ Thực Hành 1 Kèm 1 - VanBass",
    description:
      "Khóa đào tạo và dạy học DJ thực hành chuyên sâu tại Đà Nẵng & Huế. Thực hành 100% trên thiết bị Pioneer DJ, làm chủ mixing, beatmatching và tự tin biểu diễn sân khấu.",
    url: `${baseUrl}/day-hoc-dj`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/images/services/dj_academy_hero.jpg`,
        width: 1200,
        height: 630,
        alt: "Khóa học DJ thực hành tại Đà Nẵng và Huế - VanBass Music Center",
      },
    ],
  },
};

export default function DayHocDjLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
