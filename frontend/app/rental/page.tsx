"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { MOCK_PRODUCTS } from "../lib/mock-data";
import { fetchProducts, submitRentalRequest } from "../lib/api";
import { Product } from "../lib/types";
import { useAuth } from "../lib/auth-context";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

function RentalContent() {
  const searchParams = useSearchParams();
  const preselectedSlug = searchParams.get("product");
  const { user, token } = useAuth();

  const [rentalProducts, setRentalProducts] = useState<Product[]>(
    MOCK_PRODUCTS.filter((p) => p.rental_enabled)
  );

  // Fetch live rental-enabled products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const liveList = await fetchProducts({ rental_only: true });
        if (liveList && liveList.length > 0) {
          setRentalProducts(liveList);
        }
      } catch (e) {
        console.error("Failed to load rental products:", e);
      }
    };
    loadProducts();
  }, []);

  // Selected items: productId -> quantity
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});

  useEffect(() => {
    if (rentalProducts.length > 0) {
      const hasValidSelectedProduct = Object.keys(selectedItems).some((id) =>
        rentalProducts.some((p) => p.id === id)
      );

      if (!hasValidSelectedProduct) {
        if (preselectedSlug) {
          const found = rentalProducts.find((p) => p.slug === preselectedSlug);
          if (found) {
            setSelectedItems({ [found.id]: 1 });
            return;
          }
        }
        setSelectedItems({ [rentalProducts[0].id]: 1 });
      }
    }
  }, [rentalProducts, preselectedSlug, selectedItems]);

  const todayStr = new Date().toISOString().split("T")[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const [startDate, setStartDate] = useState(todayStr);
  const [endDate, setEndDate] = useState(tomorrowStr);
  const [pickupLocation, setPickupLocation] = useState("Showroom VanBass (Đà Nẵng)");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedRequestNumber, setSubmittedRequestNumber] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Pre-fill user info if logged in
  useEffect(() => {
    if (user) {
      if (!fullName && user.full_name) setFullName(user.full_name);
      if (!phone && user.phone) setPhone(user.phone);
      if (!email && user.email) setEmail(user.email);
    }
  }, [user, fullName, phone, email]);

  // Calculate days
  const numberOfDays = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.max(0, end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return Math.max(1, diffDays);
  }, [startDate, endDate]);

  // Calculate pricing
  const { totalRental, estimatedDeposit } = useMemo(() => {
    let total = 0;
    let deposit = 0;

    for (const [productId, qty] of Object.entries(selectedItems)) {
      if (qty <= 0) continue;
      const product = rentalProducts.find((p) => p.id === productId);
      if (product && product.rental_price) {
        total += product.rental_price * qty * numberOfDays;
        deposit += (product.sale_price ? product.sale_price * 0.3 : product.rental_price * 2) * qty;
      }
    }

    return { totalRental: total, estimatedDeposit: deposit };
  }, [selectedItems, numberOfDays, rentalProducts]);

  const toggleProduct = (productId: string) => {
    setSelectedItems((prev) => {
      const current = prev[productId] || 0;
      if (current > 0) {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return { ...prev, [productId]: 1 };
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setSelectedItems((prev) => {
      const current = prev[productId] || 0;
      const next = Math.max(1, current + delta);
      return { ...prev, [productId]: next };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      setErrorMsg("Vui lòng điền đầy đủ họ tên và số điện thoại.");
      return;
    }

    const items = Object.entries(selectedItems)
      .filter(([_, qty]) => qty > 0)
      .map(([pid, qty]) => {
        const prod = rentalProducts.find((p) => p.id === pid);
        return {
          product_id: pid,
          quantity: qty,
          daily_rate: prod?.rental_price || 0,
        };
      });

    if (items.length === 0) {
      setErrorMsg("Vui lòng chọn ít nhất một thiết bị cần thuê.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    const result = await submitRentalRequest({
      start_date: startDate,
      end_date: endDate,
      delivery_address: pickupLocation,
      note: notes,
      customer_name: fullName.trim(),
      customer_phone: phone.trim(),
      customer_email: email.trim() || undefined,
      items: items,
      token: token,
    });

    setSubmitting(false);

    if (result.success) {
      setSubmittedRequestNumber(result.request_number || "RENT-SUCCESS");
    } else {
      setErrorMsg(typeof result.message === "string" ? result.message : "Đã xảy ra lỗi khi gửi yêu cầu thuê.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <main style={{ flex: 1, paddingTop: "120px", paddingBottom: "100px" }}>
        <div className="container">
          {/* Heading */}
          <div style={{ marginBottom: "48px" }}>
            <p className="section-kicker">DỊCH VỤ CHO THUÊ</p>
            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 48px)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                margin: "0 0 16px 0",
              }}
            >
              Cho thuê thiết bị DJ & Âm thanh sự kiện
            </h1>
            <p style={{ color: "#a1a1aa", maxWidth: "680px", margin: 0, lineHeight: 1.7 }}>
              Giải pháp cho thuê DJ Controller, CDJ 3000, Mixer DJM-A9, Loa Column và hệ thống âm thanh sân khấu tại Đà Nẵng. Máy móc mới 100%, kiểm tra kỹ thuật trước khi bàn giao.
            </p>
          </div>

          {submittedRequestNumber ? (
            <div
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid #22c55e",
                padding: "48px 32px",
                textAlign: "center",
                maxWidth: "640px",
                margin: "40px auto",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
              <h2 style={{ fontSize: "24px", color: "#fff", marginBottom: "12px", fontWeight: 800 }}>
                Yêu cầu thuê thiết bị đã được tiếp nhận!
              </h2>
              <p style={{ color: "#a1a1aa", lineHeight: 1.7, marginBottom: "24px" }}>
                Mã hợp đồng thuê chính thức:{" "}
                <strong style={{ color: "#22c55e", fontSize: "18px" }}>{submittedRequestNumber}</strong>
                <br />
                Đội ngũ kỹ thuật VanBass sẽ liên hệ trực tiếp với bạn qua số điện thoại <strong>{phone}</strong> trong vòng 15 phút để xác nhận thời gian giao máy và địa chỉ sự kiện.
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                <button
                  onClick={() => {
                    setSubmittedRequestNumber(null);
                    setSelectedItems({});
                  }}
                  className="button button-secondary"
                >
                  Tạo yêu cầu thuê mới
                </button>
                <Link href="/" className="button button-primary">
                  Về trang chủ
                </Link>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "48px",
                alignItems: "start",
              }}
            >
              {/* Left Column: Equipment Selection */}
              <div>
                <h2 style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 20px 0", color: "#fff" }}>
                  1. Chọn thiết bị cần thuê
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
                  {rentalProducts.map((product) => {
                    const isSelected = !!selectedItems[product.id];
                    const qty = selectedItems[product.id] || 1;

                    return (
                      <div
                        key={product.id}
                        style={{
                          backgroundColor: "var(--surface)",
                          border: isSelected ? "1px solid #fff" : "1px solid var(--border)",
                          padding: "20px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: "16px",
                          transition: "border-color 180ms ease",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "16px", flex: 1 }}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleProduct(product.id)}
                            style={{ width: "18px", height: "18px", accentColor: "#fff", cursor: "pointer" }}
                          />
                          <div>
                            <span style={{ fontSize: "11px", color: "#71717a", textTransform: "uppercase", fontWeight: 700 }}>
                              {product.brand || "VanBass"}
                            </span>
                            <h3 style={{ fontSize: "15px", fontWeight: 700, margin: "2px 0 4px 0", color: "#fff" }}>
                              {product.name}
                            </h3>
                            <span style={{ fontSize: "14px", fontWeight: 700, color: "#22c55e" }}>
                              {formatCurrency(product.rental_price || 0)} / ngày
                            </span>
                          </div>
                        </div>

                        {isSelected && (
                          <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border)", backgroundColor: "#000" }}>
                            <button
                              onClick={() => updateQuantity(product.id, -1)}
                              style={{ padding: "6px 12px", background: "none", border: "none", color: "#fff", cursor: "pointer" }}
                            >
                              -
                            </button>
                            <span style={{ padding: "6px 10px", color: "#fff", fontSize: "13px", fontWeight: 700 }}>
                              {qty}
                            </span>
                            <button
                              onClick={() => updateQuantity(product.id, 1)}
                              style={{ padding: "6px 12px", background: "none", border: "none", color: "#fff", cursor: "pointer" }}
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Time, Customer Details & Summary */}
              <div
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  padding: "32px",
                }}
              >
                <h2 style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 24px 0", color: "#fff" }}>
                  2. Thời gian & Thông tin nhận máy
                </h2>

                {errorMsg && (
                  <div style={{ padding: "10px 14px", backgroundColor: "rgba(239,68,68,0.15)", border: "1px solid #ef4444", color: "#fca5a5", fontSize: "13px", marginBottom: "20px" }}>
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Date Range */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "6px", textTransform: "uppercase" }}>
                        Ngày nhận máy *
                      </label>
                      <input
                        type="date"
                        required
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        style={{ width: "100%", padding: "10px 12px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "14px", boxSizing: "border-box" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "6px", textTransform: "uppercase" }}>
                        Ngày trả máy *
                      </label>
                      <input
                        type="date"
                        required
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        style={{ width: "100%", padding: "10px 12px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "14px", boxSizing: "border-box" }}
                      />
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div style={{ marginBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "6px", textTransform: "uppercase" }}>
                      Họ và tên người thuê *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      style={{ width: "100%", padding: "10px 14px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "14px", boxSizing: "border-box" }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "6px", textTransform: "uppercase" }}>
                        Số điện thoại *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0905 123 456"
                        style={{ width: "100%", padding: "10px 14px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "14px", boxSizing: "border-box" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "6px", textTransform: "uppercase" }}>
                        Email liên hệ
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@gmail.com"
                        style={{ width: "100%", padding: "10px 14px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "14px", boxSizing: "border-box" }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: "24px" }}>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "6px", textTransform: "uppercase" }}>
                      Địa điểm nhận thiết bị hoặc giao tận nơi
                    </label>
                    <input
                      type="text"
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      placeholder="Showroom VanBass hoặc Địa chỉ sự kiện..."
                      style={{ width: "100%", padding: "10px 14px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "14px", boxSizing: "border-box" }}
                    />
                  </div>

                  {/* Summary Box */}
                  <div style={{ padding: "20px", backgroundColor: "#000", border: "1px solid var(--border)", marginBottom: "24px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px", color: "#a1a1aa" }}>
                      <span>Tổng thời gian thuê:</span>
                      <strong style={{ color: "#fff" }}>{numberOfDays} ngày</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
                      <span style={{ color: "#a1a1aa" }}>Tổng tiền thuê máy:</span>
                      <strong style={{ color: "#22c55e", fontSize: "16px" }}>{formatCurrency(totalRental)}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#a1a1aa", paddingTop: "8px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <span>Tiền cọc thiết bị dự kiến:</span>
                      <span style={{ color: "#eab308" }}>{formatCurrency(estimatedDeposit)}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="button button-primary button-lg"
                    style={{ width: "100%", cursor: submitting ? "not-allowed" : "pointer" }}
                  >
                    {submitting ? "Đang gửi yêu cầu..." : `Gửi Yêu Cầu Thuê (${formatCurrency(totalRental)})`}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function RentalPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#090909", color: "#fff" }}>
          Đang tải dịch vụ cho thuê VanBass...
        </div>
      }
    >
      <RentalContent />
    </Suspense>
  );
}
