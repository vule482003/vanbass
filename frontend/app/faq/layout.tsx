import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

export const metadata: Metadata = {
  title: "Câu Hỏi Thường Gặp (FAQ) | Hướng Dẫn Thuê & Mua Bàn DJ | VanBass",
  description:
    "Giải đáp mọi thắc mắc về thủ tục thuê bàn DJ không cần cọc, bảng giá theo ngày/tuần, chính sách bảo hành thiết bị Pioneer DJ và hỗ trợ setup 24/7.",
  keywords: [
    "faq thuê bàn dj",
    "thủ tục thuê bàn dj",
    "chính sách thuê thiết bị dj",
    "hướng dẫn sử dụng bàn dj",
  ],
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "Câu Hỏi Thường Gặp (FAQ) | VanBass Music Center",
    description:
      "Giải đáp mọi thắc mắc về thủ tục thuê bàn DJ và chính sách bảo hành tại VanBass.",
    url: `${siteUrl}/faq`,
    type: "website",
  },
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

