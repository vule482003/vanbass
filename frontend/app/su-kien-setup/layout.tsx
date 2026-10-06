import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

export const metadata: Metadata = {
  title: "Setup Âm Thanh & DJ Sự Kiện Đà Nẵng Uy Tín Chuyên Nghiệp",
  description:
    "Dịch vụ trọn gói setup âm thanh biểu diễn, DJ Booth, ánh sáng sân khấu và kỹ thuật viên vận hành cho Pool Party, Tiệc cưới, Festival âm nhạc tại Đà Nẵng & Miền Trung.",
  keywords: [
    "setup âm thanh sự kiện đà nẵng",
    "thuê âm thanh sự kiện đà nẵng",
    "setup dj sự kiện đà nẵng",
    "thuê âm thanh đám cưới đà nẵng",
    "setup pool party đà nẵng",
    "âm thanh ánh sáng sự kiện đà nẵng",
    "cho thuê dj booth đà nẵng",
    "kỹ thuật âm thanh sự kiện đà nẵng",
    "vanbass event sound",
  ],
  alternates: {
    canonical: "/su-kien-setup",
  },
  openGraph: {
    title: "Setup Âm Thanh & DJ Sự Kiện Tại Đà Nẵng | VanBass Music Center",
    description:
      "Dịch vụ kỹ thuật setup âm thanh biểu diễn, bàn DJ Rider, ánh sáng và kỹ thuật viên trực 24/7 cho các sự kiện cao cấp tại Đà Nẵng & Huế.",
    url: `${baseUrl}/su-kien-setup`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/images/services/event_setup_hero.jpg`,
        width: 1200,
        height: 630,
        alt: "Setup Âm Thanh & DJ Sự Kiện Đà Nẵng - VanBass",
      },
    ],
  },
};

export default function SuKienSetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
