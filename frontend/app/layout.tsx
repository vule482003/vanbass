import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "./lib/cart-context";
import { AuthProvider } from "./lib/auth-context";
import JsonLd from "./components/JsonLd";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  themeColor: "#090909",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vanbass.vn"),
  title: {
    default: "VanBass Music Center | Thiết bị DJ & Âm thanh chuyên nghiệp Đà Nẵng",
    template: "%s | VanBass Music Center",
  },
  description:
    "Trung tâm phân phối và cho thuê thiết bị DJ, DJ Controller, Mixer, CDJ, Loa biểu diễn và giải pháp âm thanh sự kiện chuyên nghiệp tại Đà Nẵng, Việt Nam.",
  keywords: [
    "VanBass",
    "Thiết bị DJ Đà Nẵng",
    "Thuê máy DJ Đà Nẵng",
    "Pioneer DJ",
    "AlphaTheta",
    "DDJ-FLX4",
    "CDJ-3000",
    "DJM-A9",
    "Loa kiểm âm Đà Nẵng",
    "Âm thanh sự kiện",
  ],
  authors: [{ name: "VanBass Music Center" }],
  creator: "VanBass Music Center",
  publisher: "VanBass Music Center",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://vanbass.vn",
    siteName: "VanBass Music Center",
    title: "VanBass Music Center | Thiết bị DJ & Âm thanh chuyên nghiệp Đà Nẵng",
    description:
      "Phân phối & cho thuê thiết bị DJ, DJ Controller, Mixer, CDJ, Loa sân khấu chính hãng Pioneer DJ, AlphaTheta tại Đà Nẵng.",
  },
  twitter: {
    card: "summary_large_image",
    title: "VanBass Music Center | Thiết bị DJ & Âm thanh chuyên nghiệp Đà Nẵng",
    description:
      "Phân phối & cho thuê thiết bị DJ, DJ Controller, Mixer, CDJ, Loa sân khấu chính hãng Pioneer DJ, AlphaTheta tại Đà Nẵng.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
