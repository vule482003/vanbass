"use client";

import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../lib/language-context";

export default function FAQPage() {
  const { t } = useLanguage();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#090909" }}>
      <Header />

      <main style={{ flex: 1, paddingTop: "120px", paddingBottom: "100px" }}>
        <div className="container">
          <div style={{ maxWidth: "800px", marginBottom: "48px" }}>
            <p className="section-kicker">
              {t.faq.kicker}
            </p>
            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                margin: "0 0 16px 0",
                color: "#ffffff",
              }}
            >
              {t.faq.title}
            </h1>
            <p style={{ color: "#a1a1aa", fontSize: "16px", lineHeight: 1.7, margin: 0 }}>
              {t.faq.subtitle}
            </p>
          </div>

          {/* FAQ Accordion / Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "860px", marginBottom: "60px" }}>
            {t.faq.items.map((item, index) => (
              <article
                key={index}
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  padding: "28px 32px",
                  borderRadius: "10px",
                }}
              >
                <h2 style={{ fontSize: "17px", fontWeight: 700, margin: "0 0 12px 0", color: "#ffffff", lineHeight: 1.4 }}>
                  {item.q}
                </h2>
                <p style={{ fontSize: "14px", color: "#a1a1aa", lineHeight: 1.8, margin: 0 }}>
                  {item.a}
                </p>
              </article>
            ))}
          </div>

          {/* Contact Support Box */}
          <div
            style={{
              padding: "40px",
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              maxWidth: "860px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "24px",
            }}
          >
            <div>
              <h3 style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 8px 0", color: "#fff" }}>
                {t.faq.unansweredTitle}
              </h3>
              <p style={{ color: "#a1a1aa", margin: 0, fontSize: "14px" }}>
                {t.faq.hotlinePrefix} <strong style={{ color: "#22c55e" }}>0706 067 799</strong>
              </p>
            </div>
            <Link href="/contact" className="button button-primary">
              {t.faq.consultBtn} <span>→</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
