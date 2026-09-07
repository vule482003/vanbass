import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { LanguageProvider } from "./lib/language-context";
import { CartProvider } from "./lib/cart-context";
import { AuthProvider } from "./lib/auth-context";
import JsonLd from "./components/JsonLd";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#090909",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanbass.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VanBass Music Center | Cho Thuê Bàn DJ & Thiết Bị Âm Thanh Chuyên Nghiệp",
    template: "%s | VanBass Music Center",
  },
  description:
    "Trung tâm phân phối & dịch vụ cho thuê bàn DJ (Pioneer DJ XDJ-RX3, DDJ-FLX4, CDJ-3000), Mixer, Loa biểu diễn B&C Speakers và thiết bị âm thanh sự kiện uy tín hàng đầu.",
  keywords: [
    "thuê bàn dj",
    "thue ban dj",
    "thuê bàn dj đà nẵng",
    "cho thuê bàn dj",
    "DJ PIONEER DJ XDJ-RX3",
    "DJ Pioneer DDJ-FLX4 – DJ Controller",
    "bàn dj pioneer",
    "alphatheta dj",
    "thiết bị dj",
    "vanbass music center",
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
    url: siteUrl,
    siteName: "VanBass Music Center",
    title: "VanBass Music Center | Cho Thuê Bàn DJ & Thiết Bị Âm Thanh Chuyên Nghiệp",
    description:
      "Dịch vụ cho thuê bàn DJ Pioneer XDJ-RX3, DDJ-FLX4, loa biểu diễn B&C Speakers và thiết bị sự kiện chuyên nghiệp.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`h-full antialiased ${montserrat.variable}`} suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body className={`min-h-full flex flex-col ${montserrat.className}`} suppressHydrationWarning>
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}