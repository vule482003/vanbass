import type { Metadata, Viewport } from "next";
import { Montserrat, Newsreader, Inter } from "next/font/google";
import { LanguageProvider } from "./lib/language-context";
import { CartProvider } from "./lib/cart-context";
import { AuthProvider } from "./lib/auth-context";
import JsonLd from "./components/JsonLd";
import MobileBottomNav from "./components/MobileBottomNav";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  variable: "--font-montserrat",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin", "vietnamese"],
  variable: "--font-newsreader",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#090909",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanmusic.com.vn";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VanBass Music Center | Mua Bán, Cho Thuê & Sửa Chữa Bàn DJ, Loa B&C Speakers tại Đà Nẵng, Huế & Miền Trung",
    template: "%s | VanBass Music Center",
  },
  description:
    "Trung tâm phân phối, cho thuê & sửa chữa bàn DJ chuyên nghiệp, loa biểu diễn B&C Speakers chính hãng tại Đà Nẵng, Thừa Thiên Huế, Hội An & Toàn Miền Trung (Pioneer DJ XDJ-RX3, DDJ-FLX4, AlphaTheta Omnis-Duo, XDJ-AZ). Sửa chữa, thay linh kiện fader/jogwheel, bảo dưỡng lấy liền, giao máy và kỹ thuật setup 24/7.",
  keywords: [
    // Hot Search Models
    "XDJ RX3",
    "xdj rx3",
    "thuê xdj rx3",
    "XDJ RX2",
    "xdj rx2",
    "thuê xdj rx2",
    "XDJ RR",
    "xdj rr",
    "DDJ FLX4",
    "ddj flx4",
    "thuê ddj flx4",
    "DDJ FLX2",
    "ddj flx2",
    "OMNIS DUO",
    "omnis duo",
    "AlphaTheta Omnis-Duo",
    "thuê omnis duo",
    "XDJ AZ",
    "xdj az",
    "AlphaTheta XDJ-AZ",
    "XDJ AN",
    "xdj an",
    // Tiếng Việt: Mua Bán, Cho Thuê & Sửa Chữa Thiết Bị DJ - Đà Nẵng, Huế, Hội An & Toàn Miền Trung
    "sửa chữa bàn dj",
    "sua chua ban dj",
    "sửa bàn dj đà nẵng",
    "sua ban dj da nang",
    "sửa chữa bàn dj đà nẵng",
    "sua chua ban dj da nang",
    "sửa bàn dj huế",
    "sua ban dj hue",
    "sửa chữa bàn dj huế",
    "sua chua ban dj hue",
    "sửa loa mixer đà nẵng",
    "sửa bàn dj miền trung",
    "bảo dưỡng bàn dj",
    "thay fader bàn dj",
    "sửa jogwheel pioneer",
    "mua bán dj đà nẵng",
    "mua ban dj da nang",
    "mua bán bàn dj đà nẵng",
    "mua ban ban dj da nang",
    "bán bàn dj đà nẵng",
    "ban ban dj da nang",
    "mua bàn dj đà nẵng",
    "mua bán dj huế",
    "mua ban dj hue",
    "mua bán bàn dj huế",
    "bán bàn dj huế",
    "mua bàn dj ở huế",
    "mua bán dj miền trung",
    "mua ban dj mien trung",
    "mua bán bàn dj miền trung",
    "bán bàn dj miền trung",
    "mua ban dj",
    "mua bán dj",
    "thuê bàn dj",
    "thue ban dj",
    "thuê bàn dj đà nẵng",
    "thue ban dj da nang",
    "thuê bàn dj huế",
    "thue ban dj hue",
    "thuê bàn dj thừa thiên huế",
    "cho thuê bàn dj huế",
    "thuê dj huế",
    "thuê thiết bị dj huế",
    "mua bàn dj ở huế",
    "bán bàn dj huế",
    "showroom pioneer dj huế",
    "showroom vanbass huế",
    "thuê bàn dj miền trung",
    "thue ban dj mien trung",
    "cho thuê bàn dj miền trung",
    "thuê thiết bị dj miền trung",
    "thuê âm thanh dj miền trung",
    "âm thanh dj sự kiện miền trung",
    "thuê âm thanh ánh sáng sự kiện miền trung",
    "cho thuê bàn dj",
    "cho thuê bàn dj đà nẵng",
    "thuê bàn dj hội an",
    "thuê bàn dj quảng nam",
    "thuê bàn dj quảng trị",
    "thuê bàn dj quảng bình",
    "thuê bàn dj quy nhơn",
    "thuê dj đà nẵng",
    "thue dj da nang",
    "thuê thiết bị dj",
    "cho thuê thiết bị dj đà nẵng",
    "bảng giá thuê bàn dj đà nẵng",
    "bảng giá thuê bàn dj huế",
    "báo giá thuê bàn dj",
    "giá thuê bàn dj đà nẵng",
    "thuê bàn dj theo ngày",
    "thuê bàn dj theo tháng",
    "thuê bàn dj uy tín đà nẵng",
    "thuê bàn dj all in one",
    "thuê bàn dj độc lập",
    "thuê bàn dj không cần máy tính",
    "thuê cdj 3000 đà nẵng",
    "thuê cdj 3000 huế",
    "thuê mixer dj đà nẵng",
    "thuê mâm đĩa than đà nẵng",
    "bán bàn dj",
    "bán bàn dj chính hãng",
    "bán bàn dj pioneer",
    "đại lý pioneer dj đà nẵng",
    "đại lý pioneer dj miền trung",
    "pioneer dj vietnam",
    "alphatheta vietnam",
    "thuê loa dj đà nẵng",
    "thuê loa dj huế",
    "cho thuê loa biểu diễn đà nẵng",
    "loa b&c speakers huế",
    "loa b&c speakers miền trung",
    "củ loa b&c",
    "b&c speakers",
    "loa b&c speakers",
    "phụ kiện dj",
    "vanbass music center",
    "vanmusic",
    // English: Buy, Rent & Repair DJ Equipment across Central Vietnam
    "DJ equipment repair Da Nang",
    "DJ repair service Da Nang",
    "DJ repair Hue",
    "DJ equipment rental Da Nang",
    "DJ gear rental Da Nang",
    "DJ equipment rental Hue",
    "DJ gear rental Hue",
    "DJ rental Hue Vietnam",
    "Rent DJ equipment Hue",
    "DJ equipment rental Central Vietnam",
    "DJ gear rental Central Vietnam",
    "Rent Pioneer DJ Da Nang",
    "Rent Pioneer DJ Hue",
    "Rent XDJ RX3 Da Nang",
    "Rent DDJ FLX4 Da Nang",
    "Rent Omnis Duo Da Nang",
    "Rent XDJ AZ Da Nang",
    "Rent Pioneer CDJ Da Nang",
    "DJ deck hire Da Nang",
    "DJ deck hire Hue",
    "DJ equipment rental near me Da Nang",
    "Where to rent DJ equipment in Da Nang",
    "Buy Pioneer DJ Vietnam",
    "DJ store Da Nang",
    "DJ store Hue",
    "DJ equipment shop Vietnam",
    "DJ gear hire Hoi An",
    "Sound equipment rental Da Nang",
    "Sound equipment rental Central Vietnam",
    "DJ mixer rental Vietnam",
    "All in one DJ system rental Da Nang",
  ],
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "kVT29kH_KCrgKEpwrhUIHZNuYyK5NSNLs0PTC3nrruI",
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION || "8E04D1BBBC3506AA648937D52F1DBC90",
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    alternateLocale: ["en_US"],
    url: siteUrl,
    siteName: "VanBass Music Center",
    title: "VanBass Music Center | Mua Bán & Cho Thuê Bàn DJ Chính Hãng Giá Tốt Nhất",
    description:
      "Đại lý phân phối & cho thuê bàn DJ chính hãng Pioneer DJ, AlphaTheta: XDJ-RX3, XDJ-RX2, XDJ-RR, DDJ-FLX4, DDJ-FLX2, Omnis-Duo, XDJ-AZ, XDJ-AN, XDJ-XZ và loa B&C Speakers tại Đà Nẵng, Huế & Toàn quốc. Trả góp 0%, bảo hành 12-24T, giao lắp tận nơi 24/7.",
    images: [
      {
        url: "/images/rental/rental_fleet_hero.jpg",
        width: 1200,
        height: 630,
        alt: "VanBass Music Center - Mua Bán & Cho Thuê Bàn DJ Chính Hãng",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VanBass Music Center | Mua Bán & Cho Thuê Bàn DJ Chính Hãng Pioneer & AlphaTheta",
    description:
      "Phân phối & cho thuê bàn DJ Pioneer XDJ-RX3, DDJ-FLX4, Omnis-Duo, XDJ-AZ, XDJ-RX2, DDJ-FLX2 tại Đà Nẵng, Huế & Toàn quốc. Bảo hành chính hãng, trả góp 0%, giao 24/7.",
    images: ["/images/rental/rental_fleet_hero.jpg"],
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/images/logo.png", type: "image/png" },
    ],
    shortcut: "/icon.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`h-full antialiased ${montserrat.variable} ${newsreader.variable} ${inter.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <meta name="google-site-verification" content="kVT29kH_KCrgKEpwrhUIHZNuYyK5NSNLs0PTC3nrruI" />
        <meta name="msvalidate.01" content={process.env.NEXT_PUBLIC_BING_VERIFICATION || "8E04D1BBBC3506AA648937D52F1DBC90"} />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <JsonLd />
      </head>
      <body className={`min-h-full flex flex-col ${montserrat.className}`} suppressHydrationWarning>
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              {children}
              <MobileBottomNav />
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}