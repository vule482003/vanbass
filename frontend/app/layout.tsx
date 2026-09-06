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

export const metadata: Metadata = {
  metadataBase: new URL("https://vanbass.vn"),
  title: {
    default: "VanBass Music Center | Thiết bị DJ & Âm thanh chuyên nghiệp Đà Nẵng",
    template: "%s | VanBass Music Center",
  },
  description:
    "Trung tâm phân phối và cho thuê thiết bị DJ, DJ Controller, Mixer, CDJ, Loa biểu diễn và giải pháp âm thanh sự kiện chuyên nghiệp tại Đà Nẵng, Việt Nam.",
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