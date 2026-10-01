"use client";

import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function EnglishRentalPage() {
  const whatsappUrl = "https://wa.me/84706067799?text=Hi%20VanBass%2C%20I%20want%20to%20rent%20DJ%20equipment%20in%20Da%20Nang";
  const messengerUrl = "https://m.me/vanbassmusiccenter";
  const hotline = "+84706067799";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#09090b",
        color: "#f4f4f5",
        fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
      }}
    >
      <Header />

      <main style={{ flex: 1, paddingTop: "80px" }}>
        
        {/* =========================================================================
            HERO SECTION: ENGLISH DJ GEAR RENTAL DA NANG & HOI AN
           ========================================================================= */}
        <section
          style={{
            position: "relative",
            padding: "80px 0 60px",
            background: "radial-gradient(circle at 50% 20%, rgba(34, 197, 94, 0.16) 0%, rgba(9, 9, 11, 0.98) 75%)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center", padding: "0 16px" }}>
            <span
              style={{
                color: "#22c55e",
                fontSize: "12px",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                marginBottom: "14px",
                backgroundColor: "rgba(34, 197, 94, 0.12)",
                padding: "6px 16px",
                borderRadius: "999px",
                border: "1px solid rgba(34, 197, 94, 0.3)",
              }}
            >
              <span>🌍</span>
              <span>DA NANG & HOI AN • 24/7 ENGLISH SUPPORT & SETUP</span>
            </span>

            <h1
              style={{
                fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                fontSize: "clamp(28px, 4.4vw, 50px)",
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "-0.03em",
                margin: "8px 0 18px 0",
                textTransform: "uppercase",
                lineHeight: 1.15,
              }}
            >
              DJ Equipment Rental in Da Nang & Hoi An
            </h1>

            <p
              style={{
                color: "#d4d4d8",
                fontSize: "16px",
                maxWidth: "800px",
                margin: "0 auto 30px auto",
                lineHeight: 1.65,
              }}
            >
              Professional Pioneer DJ & AlphaTheta gear hire for traveling DJs, beach parties, luxury villa events, weddings & resort venues. Standalone All-In-One systems (XDJ-RX3, Omnis-Duo, XDJ-AZ), portable controllers (DDJ-FLX4) & high-power B&C sound systems. 24/7 on-demand delivery with zero hassle.
            </p>

            {/* Quick Action CTA Buttons */}
            <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-primary"
                style={{
                  padding: "14px 28px",
                  fontSize: "15px",
                  fontWeight: 800,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 0 30px rgba(34, 197, 94, 0.4)",
                  backgroundColor: "#22c55e",
                  color: "#000000",
                }}
              >
                <span>💬 WhatsApp Us: +84 706 067 799</span>
              </a>

              <a
                href={messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-secondary"
                style={{
                  padding: "14px 26px",
                  fontSize: "15px",
                  fontWeight: 700,
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                }}
              >
                <span>⚡ Facebook Messenger</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "24px 36px",
                flexWrap: "wrap",
                marginTop: "40px",
                fontSize: "13.5px",
                color: "#a1a1aa",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <strong style={{ color: "#22c55e" }}>✓</strong> Passport / Hotel Flexible Verification
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <strong style={{ color: "#22c55e" }}>✓</strong> 60-Minute Fast Hotel / Villa Delivery
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <strong style={{ color: "#22c55e" }}>✓</strong> 100% Genuine 99% Mint Condition
              </span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            FEATURED RENTAL FLEET (TOP 4 MODELS WITH USD / VND PRICING)
           ========================================================================= */}
        <section style={{ padding: "75px 0", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <div className="container" style={{ maxWidth: "1240px", margin: "0 auto", padding: "0 16px" }}>
            <div style={{ textAlign: "center", marginBottom: "45px" }}>
              <span style={{ color: "#22c55e", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.14em" }}>
                AVAILABLE FLEET
              </span>
              <h2 style={{ fontSize: "clamp(24px, 3.4vw, 36px)", fontWeight: 900, color: "#ffffff", margin: "6px 0 0", textTransform: "uppercase" }}>
                Most Popular DJ Gear for Hire
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              {/* CARD 1: PIONEER XDJ-RX3 */}
              <div
                style={{
                  backgroundColor: "rgba(18, 18, 22, 0.85)",
                  border: "1px solid rgba(255, 255, 255, 0.09)",
                  borderRadius: "14px",
                  padding: "26px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    backgroundColor: "rgba(34, 197, 94, 0.15)",
                    color: "#4ade80",
                    border: "1px solid #22c55e",
                    fontSize: "11px",
                    fontWeight: 800,
                    padding: "4px 10px",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                  }}
                >
                  MOST POPULAR
                </div>

                <div
                  style={{
                    aspectRatio: "16/10",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    backgroundColor: "#000000",
                    borderRadius: "10px",
                    padding: "16px",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/products/xdj-rx3.png" alt="Pioneer DJ XDJ-RX3 Rental Da Nang" style={{ maxWidth: "100%", maxHeight: "155px", objectFit: "contain" }} />
                </div>

                <span style={{ fontSize: "11.5px", color: "#22c55e", fontWeight: 800, textTransform: "uppercase" }}>ALL-IN-ONE STANDALONE</span>
                <h3 style={{ fontSize: "21px", fontWeight: 800, color: "#fff", margin: "6px 0 10px 0" }}>Pioneer DJ XDJ-RX3</h3>
                <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, flex: 1, marginBottom: "20px" }}>
                  10.1-inch responsive touchscreen with CDJ-3000 workflow and Release FX. Plug in your USB and perform without a laptop.
                </p>

                <div style={{ padding: "14px 0", borderTop: "1px solid rgba(255, 255, 255, 0.08)", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: "12px", color: "#71717a" }}>Daily Rate:</span>
                    <div>
                      <span style={{ fontSize: "24px", fontWeight: 900, color: "#22c55e" }}>$48</span>
                      <span style={{ fontSize: "12px", color: "#a1a1aa" }}> (1,200,000đ / 24h)</span>
                    </div>
                  </div>
                </div>

                <a href={`${whatsappUrl}%20-%20Pioneer%20XDJ-RX3`} target="_blank" rel="noopener noreferrer" className="button button-primary" style={{ textAlign: "center", padding: "12px", fontSize: "14px", fontWeight: 700 }}>
                  Book Pioneer RX3
                </a>
              </div>

              {/* CARD 2: PIONEER DDJ-FLX4 */}
              <div
                style={{
                  backgroundColor: "rgba(18, 18, 22, 0.85)",
                  border: "1px solid rgba(255, 255, 255, 0.09)",
                  borderRadius: "14px",
                  padding: "26px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    backgroundColor: "rgba(34, 197, 94, 0.15)",
                    color: "#4ade80",
                    border: "1px solid #22c55e",
                    fontSize: "11px",
                    fontWeight: 800,
                    padding: "4px 10px",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                  }}
                >
                  BEST BUDGET
                </div>

                <div
                  style={{
                    aspectRatio: "16/10",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    backgroundColor: "#000000",
                    borderRadius: "10px",
                    padding: "16px",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/products/ddj-flx4.png" alt="Pioneer DDJ-FLX4 Rental Da Nang" style={{ maxWidth: "100%", maxHeight: "155px", objectFit: "contain" }} />
                </div>

                <span style={{ fontSize: "11.5px", color: "#22c55e", fontWeight: 800, textTransform: "uppercase" }}>DJ CONTROLLER 2-CH</span>
                <h3 style={{ fontSize: "21px", fontWeight: 800, color: "#fff", margin: "6px 0 10px 0" }}>Pioneer DDJ-FLX4</h3>
                <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, flex: 1, marginBottom: "20px" }}>
                  The world&#39;s #1 controller for Rekordbox & Serato DJ. Lightweight, USB-C powered, supports laptop and smartphone Bluetooth pairing.
                </p>

                <div style={{ padding: "14px 0", borderTop: "1px solid rgba(255, 255, 255, 0.08)", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: "12px", color: "#71717a" }}>Daily Rate:</span>
                    <div>
                      <span style={{ fontSize: "24px", fontWeight: 900, color: "#22c55e" }}>$16</span>
                      <span style={{ fontSize: "12px", color: "#a1a1aa" }}> (400,000đ / 24h)</span>
                    </div>
                  </div>
                </div>

                <a href={`${whatsappUrl}%20-%20Pioneer%20DDJ-FLX4`} target="_blank" rel="noopener noreferrer" className="button button-primary" style={{ textAlign: "center", padding: "12px", fontSize: "14px", fontWeight: 700 }}>
                  Book Pioneer FLX4
                </a>
              </div>

              {/* CARD 3: ALPHATHETA OMNIS-DUO */}
              <div
                style={{
                  backgroundColor: "rgba(18, 18, 22, 0.85)",
                  border: "1px solid rgba(255, 255, 255, 0.09)",
                  borderRadius: "14px",
                  padding: "26px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    backgroundColor: "rgba(56, 189, 248, 0.15)",
                    color: "#38bdf8",
                    border: "1px solid rgba(56, 189, 248, 0.3)",
                    fontSize: "11px",
                    fontWeight: 800,
                    padding: "4px 10px",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                  }}
                >
                  BEACH & VILLA
                </div>

                <div
                  style={{
                    aspectRatio: "16/10",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    backgroundColor: "#000000",
                    borderRadius: "10px",
                    padding: "16px",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/products/ban-dj-alpha-theta-omnis-duo.png" alt="AlphaTheta Omnis-Duo Hire Da Nang" style={{ maxWidth: "100%", maxHeight: "155px", objectFit: "contain" }} />
                </div>

                <span style={{ fontSize: "11.5px", color: "#38bdf8", fontWeight: 800, textTransform: "uppercase" }}>BATTERY-POWERED WIRELESS</span>
                <h3 style={{ fontSize: "21px", fontWeight: 800, color: "#fff", margin: "6px 0 10px 0" }}>AlphaTheta OMNIS-DUO</h3>
                <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, flex: 1, marginBottom: "20px" }}>
                  5-hour built-in battery, Bluetooth Audio Input, fully wireless setup. Ideal for beach parties, yacht gatherings & remote outdoor villa venues.
                </p>

                <div style={{ padding: "14px 0", borderTop: "1px solid rgba(255, 255, 255, 0.08)", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: "12px", color: "#71717a" }}>Daily Rate:</span>
                    <div>
                      <span style={{ fontSize: "24px", fontWeight: 900, color: "#22c55e" }}>$48</span>
                      <span style={{ fontSize: "12px", color: "#a1a1aa" }}> (1,200,000đ / 24h)</span>
                    </div>
                  </div>
                </div>

                <a href={`${whatsappUrl}%20-%20Omnis-Duo`} target="_blank" rel="noopener noreferrer" className="button button-primary" style={{ textAlign: "center", padding: "12px", fontSize: "14px", fontWeight: 700 }}>
                  Book Omnis-Duo
                </a>
              </div>

              {/* CARD 4: ALPHATHETA XDJ-AZ 4-CH */}
              <div
                style={{
                  backgroundColor: "rgba(18, 18, 22, 0.85)",
                  border: "1px solid rgba(255, 255, 255, 0.09)",
                  borderRadius: "14px",
                  padding: "26px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    backgroundColor: "rgba(234, 179, 8, 0.15)",
                    color: "#facc15",
                    border: "1px solid rgba(234, 179, 8, 0.35)",
                    fontSize: "11px",
                    fontWeight: 800,
                    padding: "4px 10px",
                    borderRadius: "4px",
                    textTransform: "uppercase",
                  }}
                >
                  CLUB FLAGSHIP
                </div>

                <div
                  style={{
                    aspectRatio: "16/10",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    backgroundColor: "#000000",
                    borderRadius: "10px",
                    padding: "16px",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/products/ban-dj-alphatheta-xdj-az.png" alt="AlphaTheta XDJ-AZ Rental Da Nang" style={{ maxWidth: "100%", maxHeight: "155px", objectFit: "contain" }} />
                </div>

                <span style={{ fontSize: "11.5px", color: "#facc15", fontWeight: 800, textTransform: "uppercase" }}>FLAGSHIP 4-CHANNEL</span>
                <h3 style={{ fontSize: "21px", fontWeight: 800, color: "#fff", margin: "6px 0 10px 0" }}>AlphaTheta XDJ-AZ</h3>
                <p style={{ fontSize: "13px", color: "#a1a1aa", lineHeight: 1.6, flex: 1, marginBottom: "20px" }}>
                  Next-generation 4-channel standalone system. Full-size CDJ-3000 jogwheels, 10.1-inch screen, Wi-Fi Cloud playback & 32-bit ESS sound.
                </p>

                <div style={{ padding: "14px 0", borderTop: "1px solid rgba(255, 255, 255, 0.08)", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", marginBottom: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: "12px", color: "#71717a" }}>Daily Rate:</span>
                    <div>
                      <span style={{ fontSize: "24px", fontWeight: 900, color: "#22c55e" }}>$80</span>
                      <span style={{ fontSize: "12px", color: "#a1a1aa" }}> (2,000,000đ / 24h)</span>
                    </div>
                  </div>
                </div>

                <a href={`${whatsappUrl}%20-%20AlphaTheta%20XDJ-AZ`} target="_blank" rel="noopener noreferrer" className="button button-primary" style={{ textAlign: "center", padding: "12px", fontSize: "14px", fontWeight: 700 }}>
                  Book XDJ-AZ
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            HOW IT WORKS: 4 SIMPLE STEPS FOR INTERNATIONAL CLIENTS
           ========================================================================= */}
        <section style={{ padding: "70px 0", backgroundColor: "#0c0c0e", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
          <div className="container" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 16px" }}>
            <div style={{ textAlign: "center", marginBottom: "45px" }}>
              <span style={{ color: "#22c55e", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.14em" }}>
                SIMPLE & TRANSPARENT
              </span>
              <h2 style={{ fontSize: "clamp(24px, 3.4vw, 36px)", fontWeight: 900, color: "#ffffff", margin: "6px 0 0" }}>
                How To Rent DJ Gear in Vietnam
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
              <div style={{ backgroundColor: "rgba(18, 18, 22, 0.8)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "24px" }}>
                <span style={{ color: "#22c55e", fontSize: "28px", fontWeight: 900 }}>01</span>
                <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#fff", margin: "10px 0 6px 0" }}>Choose Your Gear</h3>
                <p style={{ fontSize: "13.5px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
                  Select your preferred DJ controller or standalone system and send us your date, venue location & event time.
                </p>
              </div>

              <div style={{ backgroundColor: "rgba(18, 18, 22, 0.8)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "24px" }}>
                <span style={{ color: "#22c55e", fontSize: "28px", fontWeight: 900 }}>02</span>
                <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#fff", margin: "10px 0 6px 0" }}>Simple Verification</h3>
                <p style={{ fontSize: "13.5px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
                  Quick passport photo or hotel/villa confirmation with a flexible refundable deposit via Card, Cash, Wise or PayPal.
                </p>
              </div>

              <div style={{ backgroundColor: "rgba(18, 18, 22, 0.8)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "24px" }}>
                <span style={{ color: "#22c55e", fontSize: "28px", fontWeight: 900 }}>03</span>
                <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#fff", margin: "10px 0 6px 0" }}>Delivery & Soundcheck</h3>
                <p style={{ fontSize: "13.5px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
                  Our English-speaking audio engineer delivers directly to your venue, sets up all cabling and runs a full soundcheck.
                </p>
              </div>

              <div style={{ backgroundColor: "rgba(18, 18, 22, 0.8)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "24px" }}>
                <span style={{ color: "#22c55e", fontSize: "28px", fontWeight: 900 }}>04</span>
                <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#fff", margin: "10px 0 6px 0" }}>Pickup & Deposit Refund</h3>
                <p style={{ fontSize: "13.5px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
                  When your gig or party finishes, we pick up the gear at your convenience and refund your deposit instantly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            FAQ SECTION
           ========================================================================= */}
        <section style={{ padding: "75px 0" }}>
          <div className="container" style={{ maxWidth: "880px", margin: "0 auto", padding: "0 16px" }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <span style={{ color: "#22c55e", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.14em" }}>
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 style={{ fontSize: "clamp(24px, 3.4vw, 36px)", fontWeight: 900, color: "#ffffff", margin: "6px 0 0" }}>
                Got Questions? We Have Answers
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ backgroundColor: "rgba(18, 18, 22, 0.8)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "22px 26px" }}>
                <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#ffffff", margin: "0 0 8px 0" }}>
                  Can foreigners and tourists rent equipment without a Vietnamese ID?
                </h3>
                <p style={{ fontSize: "14px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
                  Yes! You only need a passport copy and your hotel or villa address. We deliver directly to your accommodation 24/7.
                </p>
              </div>

              <div style={{ backgroundColor: "rgba(18, 18, 22, 0.8)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "22px 26px" }}>
                <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#ffffff", margin: "0 0 8px 0" }}>
                  Do you also provide PA speakers, wireless microphones, and DJ lighting?
                </h3>
                <p style={{ fontSize: "14px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
                  Yes! We offer full event audio packages including Italian B&C Speakers active PA systems, Shure wireless microphones, smoke machines, and sound-activated stage lighting.
                </p>
              </div>

              <div style={{ backgroundColor: "rgba(18, 18, 22, 0.8)", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "12px", padding: "22px 26px" }}>
                <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#ffffff", margin: "0 0 8px 0" }}>
                  How far in advance should I book?
                </h3>
                <p style={{ fontSize: "14px", color: "#a1a1aa", lineHeight: 1.6, margin: 0 }}>
                  We support urgent bookings with 60-minute delivery in Da Nang and Hoi An. However, for weekends, holidays, or festival seasons, we recommend booking 1-2 days in advance to secure your favorite model.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            BOTTOM CONTACT BANNER
           ========================================================================= */}
        <section style={{ padding: "65px 0", backgroundColor: "rgba(34, 197, 94, 0.08)", borderTop: "1px solid rgba(34, 197, 94, 0.2)", textAlign: "center" }}>
          <div className="container" style={{ maxWidth: "800px", margin: "0 auto", padding: "0 16px" }}>
            <h2 style={{ fontSize: "28px", fontWeight: 900, color: "#ffffff", marginBottom: "12px" }}>
              Ready To Rent DJ Equipment in Vietnam?
            </h2>
            <p style={{ color: "#d4d4d8", fontSize: "15.5px", marginBottom: "26px" }}>
              Message our English team directly on WhatsApp for instant pricing & delivery confirmation within 5 minutes.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-primary"
                style={{ padding: "14px 30px", fontSize: "15px", fontWeight: 800, backgroundColor: "#22c55e", color: "#000" }}
              >
                Chat on WhatsApp (+84 706 067 799)
              </a>
              <Link
                href="/ban-dj"
                className="button button-secondary"
                style={{ padding: "14px 24px", fontSize: "14.5px", fontWeight: 700, backgroundColor: "rgba(255,255,255,0.08)" }}
              >
                Browse All Equipment
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
