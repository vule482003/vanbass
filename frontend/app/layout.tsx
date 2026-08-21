import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { CartProvider } from "./lib/cart-context";
import { AuthProvider } from "./lib/auth-context";
import JsonLd from "./components/JsonLd";
import FloatingContact from "./components/FloatingContact";
import "./globals.css";

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
    <html lang="vi" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <AuthProvider>
          <CartProvider>
            {children}
            <FloatingContact />
          </CartProvider>
        </AuthProvider>

        <div id="google_translate_element" style={{ display: "none" }} />
        <Script
          id="google-translate-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'vi',
                  includedLanguages: 'en,vi',
                  autoDisplay: false
                }, 'google_translate_element');
              }
            `,
          }}
        />
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}