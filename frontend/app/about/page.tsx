"use client";

import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../lib/language-context";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <main style={{ flex: 1, paddingTop: "120px", paddingBottom: "100px" }}>
        <div className="container">
          <div style={{ maxWidth: "800px", marginBottom: "60px" }}>
            <p className="section-kicker">{t.about.kicker}</p>
            <h1
              style={{
                fontSize: "clamp(36px, 5vw, 54px)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                margin: "0 0 24px 0",
                lineHeight: 1.05,
              }}
            >
              {t.about.title}
            </h1>
            <p style={{ color: "#a1a1aa", fontSize: "17px", lineHeight: 1.8 }}>
              {t.about.desc}
            </p>
          </div>

          {/* Pillars Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "32px",
              marginBottom: "80px",
            }}
          >
            <div style={{ padding: "32px", backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px", color: "#ffffff" }}>{t.about.pillar1Title}</h3>
              <p style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
                {t.about.pillar1Desc}
              </p>
            </div>

            <div style={{ padding: "32px", backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px", color: "#ffffff" }}>{t.about.pillar2Title}</h3>
              <p style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
                {t.about.pillar2Desc}
              </p>
            </div>

            <div style={{ padding: "32px", backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px", color: "#ffffff" }}>{t.about.pillar3Title}</h3>
              <p style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
                {t.about.pillar3Desc}
              </p>
            </div>
          </div>

          {/* Showroom CTA */}
          <div
            style={{
              padding: "40px",
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "24px",
            }}
          >
            <div>
              <p className="section-kicker" style={{ marginBottom: "8px" }}>{t.about.ctaKicker}</p>
              <h2 style={{ fontSize: "26px", margin: "0 0 8px 0", color: "#ffffff" }}>{t.about.ctaTitle}</h2>
              <p style={{ color: "#a1a1aa", margin: 0, fontSize: "15px" }}>
                {t.about.ctaDesc}
              </p>
            </div>
            <Link href="/contact" className="button button-primary">
              {t.about.ctaBtn} <span>→</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
