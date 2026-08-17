"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { MOCK_PRODUCTS } from "../lib/mock-data";
import { submitRentalRequest } from "../lib/api";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

function RentalContent() {
  const searchParams = useSearchParams();
  const preselectedSlug = searchParams.get("product");

  const rentalProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) => p.rental_enabled);
  }, []);

  // Selected items: productId -> quantity
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>(() => {
    if (preselectedSlug) {
      const found = rentalProducts.find((p) => p.slug === preselectedSlug);
      if (found) return { [found.id]: 1 };
    }
    return { [rentalProducts[0]?.id || ""]: 1 };
  });

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
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  // Calculate days
  const numberOfDays = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
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
        // Estimated deposit is roughly 30% of sale price or fixed amount
        deposit += (product.sale_price ? product.sale_price * 0.3 : product.rental_price * 3) * qty;
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
      alert("Vui lòng điền họ tên và số điện thoại.");
      return;
    }

    const items = Object.entries(selectedItems)
      .filter(([_, qty]) => qty > 0)
      .map(([pid, qty]) => ({ product_id: pid, quantity: qty }));

    if (items.length === 0) {
      alert("Vui lòng chọn ít nhất một thiết bị cần thuê.");
      return;
    }

    setSubmitting(true);
    const result = await submitRentalRequest({
      start_date: startDate,
      end_date: endDate,
      pickup_location: pickupLocation,
      customer_note: notes,
      full_name: fullName,
      phone: phone,
      email: email,
      items: items,
    });
    setSubmitting(false);
    setSubmittedMessage(result.message);
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

          {submittedMessage ? (
            <div
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid #22c55e",
                padding: "48px 32px",
                textAlign: "center",
                maxWidth: "600px",
                margin: "40px auto",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
              <h2 style={{ fontSize: "24px", color: "#fff", marginBottom: "12px" }}>
                Yêu cầu thuê đã được gửi thành công!
              </h2>
              <p style={{ color: "#a1a1aa", lineHeight: 1.7, marginBottom: "28px" }}>
                {submittedMessage}
              </p>
              <button
                onClick={() => setSubmittedMessage(null)}
                className="button button-primary"
                style={{ cursor: "pointer" }}
              >
                Gửi yêu cầu thuê khác
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                gap: "48px",
                alignItems: "start",
              }}
            >
              {/* Left Column: Equipment Selector */}
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "20px" }}>
                  1. Chọn danh sách thiết bị cần thuê
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {rentalProducts.map((p) => {
                    const isSelected = !!selectedItems[p.id];
                    const qty = selectedItems[p.id] || 0;

                    return (
                      <div
                        key={p.id}
                        style={{
                          padding: "16px",
                          backgroundColor: isSelected ? "rgba(255,255,255,0.06)" : "var(--surface)",
                          border: isSelected ? "1px solid #fff" : "1px solid var(--border)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          transition: "all 180ms ease",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleProduct(p.id)}
                            style={{ width: "18px", height: "18px", cursor: "pointer" }}
                          />
                          <div>
                            <h4 style={{ fontSize: "14px", margin: "0 0 4px 0", color: "#fff" }}>
                              {p.name}
                            </h4>
                            <span style={{ fontSize: "12px", color: "#22c55e", fontWeight: 600 }}>
                              {formatCurrency(p.rental_price || 0)} / ngày
                            </span>
                          </div>
                        </div>

                        {isSelected && (
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <button
                              type="button"
                              onClick={() => updateQuantity(p.id, -1)}
                              style={{
                                width: "28px",
                                height: "28px",
                                background: "#000",
                                border: "1px solid var(--border)",
                                color: "#fff",
                                cursor: "pointer",
                              }}
                            >
                              -
                            </button>
                            <span style={{ fontSize: "13px", fontWeight: 700, minWidth: "20px", textAlign: "center" }}>
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(p.id, 1)}
                              style={{
                                width: "28px",
                                height: "28px",
                                background: "#000",
                                border: "1px solid var(--border)",
                                color: "#fff",
                                cursor: "pointer",
                              }}
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

              {/* Right Column: Date Picker & Booking Form */}
              <div
                style={{
                  backgroundColor: "var(--surface)",
                  border: "1px solid var(--border)",
                  padding: "32px",
                }}
              >
                <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "24px" }}>
                  2. Thời gian thuê & Thông tin liên hệ
                </h3>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* Date Pickers */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", color: "#888", marginBottom: "6px" }}>
                        Ngày bắt đầu nhận máy:
                      </label>
                      <input
                        type="date"
                        min={todayStr}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px",
                          backgroundColor: "#000",
                          border: "1px solid var(--border)",
                          color: "#fff",
                          fontSize: "13px",
                          outline: "none",
                        }}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", color: "#888", marginBottom: "6px" }}>
                        Ngày hoàn trả thiết bị:
                      </label>
                      <input
                        type="date"
                        min={startDate}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px",
                          backgroundColor: "#000",
                          border: "1px solid var(--border)",
                          color: "#fff",
                          fontSize: "13px",
                          outline: "none",
                        }}
                        required
                      />
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div>
                    <label style={{ display: "block", fontSize: "12px", color: "#888", marginBottom: "6px" }}>
                      Họ và tên người thuê:
                    </label>
                    <input
                      type="text"
                      placeholder="Nguyễn Văn A"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        backgroundColor: "#000",
                        border: "1px solid var(--border)",
                        color: "#fff",
                        fontSize: "13px",
                        outline: "none",
                      }}
                      required
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", color: "#888", marginBottom: "6px" }}>
                        Số điện thoại:
                      </label>
                      <input
                        type="tel"
                        placeholder="0706 067 799"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          backgroundColor: "#000",
                          border: "1px solid var(--border)",
                          color: "#fff",
                          fontSize: "13px",
                          outline: "none",
                        }}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", color: "#888", marginBottom: "6px" }}>
                        Email (nếu có):
                      </label>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 14px",
                          backgroundColor: "#000",
                          border: "1px solid var(--border)",
                          color: "#fff",
                          fontSize: "13px",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "12px", color: "#888", marginBottom: "6px" }}>
                      Địa điểm nhận máy:
                    </label>
                    <select
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        backgroundColor: "#000",
                        border: "1px solid var(--border)",
                        color: "#fff",
                        fontSize: "13px",
                        outline: "none",
                      }}
                    >
                      <option value="Showroom VanBass (Đà Nẵng)">Nhận trực tiếp tại Showroom Đà Nẵng</option>
                      <option value="Giao tận nơi (Sự kiện / Quán bar / Khách sạn)">
                        Giao tận nơi theo địa chỉ yêu cầu
                      </option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "12px", color: "#888", marginBottom: "6px" }}>
                      Ghi chú thêm (yêu cầu kỹ thuật viên, cáp kết nối, micro...):
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Ví dụ: Cần hỗ trợ setup tại bãi biển Mỹ Khê lúc 17h..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        backgroundColor: "#000",
                        border: "1px solid var(--border)",
                        color: "#fff",
                        fontSize: "13px",
                        outline: "none",
                      }}
                    />
                  </div>

                  {/* Summary Box */}
                  <div
                    style={{
                      padding: "20px",
                      backgroundColor: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px" }}>
                      <span style={{ color: "#888" }}>Thời gian thuê:</span>
                      <span style={{ color: "#fff", fontWeight: 600 }}>{numberOfDays} ngày</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "13px" }}>
                      <span style={{ color: "#888" }}>Tiền cọc ước tính:</span>
                      <span style={{ color: "#a1a1aa" }}>{formatCurrency(estimatedDeposit)}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderTop: "1px solid rgba(255,255,255,0.1)",
                        paddingTop: "12px",
                        marginTop: "8px",
                      }}
                    >
                      <strong style={{ fontSize: "14px", color: "#fff" }}>Tổng tiền thuê dự kiến:</strong>
                      <strong style={{ fontSize: "18px", color: "#22c55e" }}>
                        {formatCurrency(totalRental)}
                      </strong>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="button button-primary"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      cursor: submitting ? "not-allowed" : "pointer",
                      opacity: submitting ? 0.7 : 1,
                    }}
                  >
                    {submitting ? "Đang gửi yêu cầu..." : "Gửi yêu cầu đặt thuê thiết bị"}
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
    <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "#090909" }} />}>
      <RentalContent />
    </Suspense>
  );
}
