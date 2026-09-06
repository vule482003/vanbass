"use client";

import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../lib/language-context";

export default function PoliciesPage() {
  const { t } = useLanguage();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#090909" }}>
      <Header />

      <main style={{ flex: 1, paddingTop: "120px", paddingBottom: "100px" }}>
        <div className="container">
          <div style={{ maxWidth: "800px", marginBottom: "48px" }}>
            <p className="section-kicker">
              {t.policies.kicker}
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
              {t.policies.title}
            </h1>
            <p style={{ color: "#a1a1aa", fontSize: "16px", lineHeight: 1.7, margin: 0 }}>
              {t.policies.subtitle}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "860px", marginBottom: "60px" }}>
            {/* Section 1 */}
            <section style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "32px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
                {t.policies.sec1Title}
              </h2>
              <div style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: 1.8 }}>
                <p>{t.policies.sec1P1}</p>
                <p>{t.policies.sec1P2}</p>
                <p>{t.policies.sec1P3}</p>
              </div>
            </section>

            {/* Section 2 */}
            <section style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "32px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
                {t.policies.sec2Title}
              </h2>
              <div style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: 1.8 }}>
                <p>{t.policies.sec2P1}</p>
                <p>{t.policies.sec2P2}</p>
              </div>
            </section>

            {/* Section 3 */}
            <section style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "32px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
                {t.policies.sec3Title}
              </h2>
              <div style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: 1.8 }}>
                <p>{t.policies.sec3P1}</p>
                <p>{t.policies.sec3P2}</p>
                <p>{t.policies.sec3P3}</p>
              </div>
            </section>

            {/* Section 4 */}
            <section style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "32px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
                {t.policies.sec4Title}
              </h2>
              <div style={{ color: "#a1a1aa", fontSize: "14px", lineHeight: 1.8 }}>
                <p>{t.policies.sec4P1}</p>
                <p>{t.policies.sec4P2}</p>
              </div>
            </section>
          </div>

          <div style={{ textAlign: "center" }}>
            <Link href="/" className="button button-primary">
              {t.policies.backHome}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
