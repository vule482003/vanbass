import type { Metadata, Viewport } from "next";
import { Montserrat, Newsreader } from "next/font/google";
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
    default: "VanBass Music Center | Cho Thuê Bàn DJ & Thiết Bị Âm Thanh | DJ Equipment Rental Da Nang",
    template: "%s | VanBass Music Center",
  },
  description:
    "Trung tâm phân phối & dịch vụ cho thuê bàn DJ chính hãng tại Đà Nẵng & Toàn quốc (Pioneer DJ XDJ-RX3, XDJ-RX2, XDJ-RR, DDJ-FLX4, DDJ-FLX2, AlphaTheta Omnis-Duo, XDJ-AZ, CDJ-3000), Loa biểu diễn B&C Speakers. Professional DJ equipment rental in Da Nang & Vietnam with 24/7 English support.",
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
    // Tiếng Việt: Bán & Cho Thuê Thiết Bị DJ Chuyên Nghiệp (Hot Search Toàn Diện)
    "thuê bàn dj",
    "thue ban dj",
    "thuê bàn dj đà nẵng",
    "thue ban dj da nang",
    "cho thuê bàn dj",
    "cho thuê bàn dj đà nẵng",
    "thuê bàn dj hội an",
    "thuê dj đà nẵng",
    "thue dj da nang",
    "thuê thiết bị dj",
    "cho thuê thiết bị dj đà nẵng",
    "bảng giá thuê bàn dj đà nẵng",
    "báo giá thuê bàn dj",
    "giá thuê bàn dj đà nẵng",
    "thuê bàn dj theo ngày",
    "thuê bàn dj theo tháng",
    "thuê bàn dj uy tín đà nẵng",
    "thuê bàn dj all in one",
    "thuê bàn dj độc lập",
    "thuê bàn dj không cần máy tính",
    "thuê cdj 3000 đà nẵng",
    "thuê mixer dj đà nẵng",
    "thuê mâm đĩa than đà nẵng",
    "bán bàn dj",
    "bán bàn dj chính hãng",
    "mua bàn dj đà nẵng",
    "bán bàn dj pioneer",
    "đại lý pioneer dj đà nẵng",
    "pioneer dj vietnam",
    "alphatheta vietnam",
    "thuê loa dj đà nẵng",
    "cho thuê loa biểu diễn đà nẵng",
    "củ loa b&c",
    "b&c speakers",
    "loa b&c speakers",
    "phụ kiện dj",
    "vanbass music center",
    "vanmusic",
    // English: Buy & Rent DJ Equipment / DJ Gear Hire
    "DJ equipment rental Da Nang",
    "DJ gear rental Da Nang",
    "Rent Pioneer DJ Da Nang",
    "Rent XDJ RX3 Da Nang",
    "Rent DDJ FLX4 Da Nang",
    "Rent Omnis Duo Da Nang",
    "Rent XDJ AZ Da Nang",
    "Rent Pioneer CDJ Da Nang",
    "DJ deck hire Da Nang",
    "DJ equipment rental near me Da Nang",
    "Where to rent DJ equipment in Da Nang",
    "Buy Pioneer DJ Vietnam",
    "DJ store Da Nang",
    "DJ equipment shop Vietnam",
    "DJ gear hire Hoi An",
    "Sound equipment rental Da Nang",
    "DJ mixer rental Vietnam",
    "All in one DJ system rental Da Nang",
  ],
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "kVT29kH_KCrgKEpwrhUIHZNuYyK5NSNLs0PTC3nrruI",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    alternateLocale: ["en_US"],
    url: siteUrl,
    siteName: "VanBass Music Center",
    title: "VanBass Music Center | Cho Thuê Bàn DJ & Thiết Bị Âm Thanh | DJ Equipment Rental",
    description:
      "Dịch vụ cho thuê bàn DJ Pioneer XDJ-RX3, XDJ-RX2, DDJ-FLX4, DDJ-FLX2, AlphaTheta Omnis-Duo, XDJ-AZ và loa B&C Speakers tại Đà Nẵng & Toàn quốc. English support available.",
    images: [
      {
        url: "/images/rental/rental_fleet_hero.jpg",
        width: 1200,
        height: 630,
        alt: "VanBass Music Center - Cho Thuê Bàn DJ & Âm Thanh Chuyên Nghiệp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VanBass Music Center | Cho Thuê Bàn DJ & DJ Equipment Rental Vietnam",
    description:
      "Dịch vụ cho thuê bàn DJ Pioneer XDJ-RX3, DDJ-FLX4, Omnis-Duo, XDJ-AZ tại Đà Nẵng. Professional DJ gear hire 24/7.",
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
    <html lang="vi" className={`h-full antialiased ${montserrat.variable} ${newsreader.variable}`} suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="kVT29kH_KCrgKEpwrhUIHZNuYyK5NSNLs0PTC3nrruI" />
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