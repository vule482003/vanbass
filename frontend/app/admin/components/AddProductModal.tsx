"use client";

import React, { useEffect, useState, useMemo } from "react";
import type { CategoryItem } from "./EditProductModal";

export interface AddProductModalProps {
  isOpen: boolean;
  categories: CategoryItem[];
  // Form Values
  name: string;
  setName: (val: string) => void;
  brand: string;
  setBrand: (val: string) => void;
  slug: string;
  setSlug: (val: string) => void;
  sku: string;
  setSku: (val: string) => void;
  categoryId: string;
  setCategoryId: (val: string) => void;
  saleEnabled: boolean;
  setSaleEnabled: (val: boolean) => void;
  salePrice: string;
  setSalePrice: (val: string) => void;
  discountPercent?: string;
  setDiscountPercent?: (val: string) => void;
  rentalEnabled: boolean;
  setRentalEnabled: (val: boolean) => void;
  rentalPrice: string;
  setRentalPrice: (val: string) => void;
  stockQuantity: string;
  setStockQuantity: (val: string) => void;
  imageUrl: string;
  setImageUrl: (val: string) => void;
  imagePreviewUrl: string | null;
  setImagePreviewUrl: (val: string | null) => void;
  selectedImageFile: File | null;
  setSelectedImageFile: (file: File | null) => void;
  description: string;
  setDescription: (val: string) => void;
  metaTitle: string;
  setMetaTitle: (val: string) => void;
  metaDescription: string;
  setMetaDescription: (val: string) => void;
  metaKeywords: string;
  setMetaKeywords: (val: string) => void;
  onSlugChange?: (val: string) => void;
  onSkuChange?: (val: string) => void;
  // Handlers & State
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void | Promise<void>;
  onNameChange: (val: string) => void;
  onBrandChange: (val: string) => void;
  onRegenerateSku: () => void;
  onImageFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitting: boolean;
  errorMessage?: string;
}

export default function AddProductModal({
  isOpen,
  categories,
  name,
  brand,
  slug,
  setSlug,
  sku,
  setSku,
  categoryId,
  setCategoryId,
  saleEnabled,
  setSaleEnabled,
  salePrice,
  setSalePrice,
  discountPercent,
  setDiscountPercent,
  rentalEnabled,
  setRentalEnabled,
  rentalPrice,
  setRentalPrice,
  stockQuantity,
  setStockQuantity,
  imageUrl,
  setImageUrl,
  imagePreviewUrl,
  setImagePreviewUrl,
  selectedImageFile,
  setSelectedImageFile,
  description,
  setDescription,
  metaTitle,
  setMetaTitle,
  metaDescription,
  setMetaDescription,
  metaKeywords,
  setMetaKeywords,
  onSlugChange,
  onSkuChange,
  onClose,
  onSubmit,
  onNameChange,
  onBrandChange,
  onRegenerateSku,
  onImageFileChange,
  isSubmitting,
  errorMessage,
}: AddProductModalProps) {
  const [isSeoOpen, setIsSeoOpen] = useState(false);
  const [enableDiscount, setEnableDiscount] = useState<boolean>(Boolean(discountPercent && Number(discountPercent) > 0));

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSubmitting) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Format currency helper
  const formatVND = (value: string | number) => {
    const num = typeof value === "string" ? Number(value) : value;
    if (isNaN(num) || num <= 0) return null;
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(num);
  };

  // Tính toán giá gốc dự kiến theo công thức: original_price = sale_price / (1 - discount_percent / 100), làm tròn đến 1.000đ
  const previewOriginalPrice = useMemo(() => {
    if (!saleEnabled || !salePrice) return null;
    const s = Number(salePrice);
    const d = Number(discountPercent);
    if (isNaN(s) || s <= 0 || isNaN(d) || d < 1 || d > 99) return null;
    const raw = s / (1 - d / 100);
    return Math.round(raw / 1000) * 1000;
  }, [saleEnabled, salePrice, discountPercent]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-5 md:p-6"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="add-product-modal-title"
    >
      <div
        className="w-full flex flex-col bg-[#111317] border border-[#27272e] rounded-xl shadow-2xl overflow-hidden transition-all duration-200"
        style={{
          maxWidth: "1100px",
          maxHeight: "min(90vh, 900px)",
          height: "90vh",
          boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.8)",
          fontFamily: "var(--font-manrope), var(--font-primary), sans-serif",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={onSubmit} className="flex flex-col h-full min-h-0" noValidate={false}>
          {/* =========================================================
              MODAL HEADER
              ========================================================= */}
          <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 bg-[#111317] border-b border-[#22242a]">
            <div className="min-w-0">
              <h2
                id="add-product-modal-title"
                className="text-[20px] sm:text-[22px] font-semibold text-white tracking-tight leading-tight truncate"
              >
                Thêm Thiết Bị Mới Vào Cơ Sở Dữ Liệu
              </h2>
              <p className="mt-1 text-[13px] text-[#a1a1aa] font-normal truncate">
                Tạo mới sản phẩm &amp; cấu hình thông số kỹ thuật, giá bán, cho thuê và SEO Google
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="w-8 h-8 rounded-md text-[#a1a1aa] hover:text-white hover:bg-[#1b1d24] flex items-center justify-center transition-colors flex-shrink-0 ml-3 cursor-pointer"
              title="Đóng (Esc)"
              aria-label="Đóng modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* =========================================================
              MODAL BODY (CONTINUOUS SURFACE - ZERO NESTED CARDS)
              ========================================================= */}
          <div
            className="flex-1 overflow-y-auto px-6 py-5 space-y-6"
            style={{
              overscrollBehavior: "contain",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* Error Banner */}
            {errorMessage && (
              <div className="p-3.5 rounded-lg bg-red-950/30 border border-red-500/40 flex items-start gap-2.5 text-red-200 text-[13px]">
                <span className="text-red-400 font-bold leading-none mt-0.5">⚠️</span>
                <div className="flex-1 leading-snug">{errorMessage}</div>
              </div>
            )}

            {/* SECTION 1: THÔNG TIN CHUNG */}
            <div className="border-b border-[#22242a] pb-6">
              <h3 className="text-[16px] font-semibold text-[#f4f4f5] mb-4">
                Thông tin chung
              </h3>

              <div className="space-y-4">
                {/* Row 1: Name (60%) & Brand (40%) */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-3">
                    <label className="block text-[13px] font-medium text-[#d4d4d8] mb-1.5">
                      Tên thiết bị <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => onNameChange(e.target.value)}
                      placeholder="VD: Bàn DJ AlphaTheta XDJ-AZ"
                      className="w-full h-[42px] px-3.5 bg-[#0c0d10] border border-[#27272e] rounded-md text-white text-[14px] font-normal placeholder-[#71717a] focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]/30 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[13px] font-medium text-[#d4d4d8] mb-1.5">
                      Hãng sản xuất <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={brand}
                      onChange={(e) => onBrandChange(e.target.value)}
                      placeholder="VD: AlphaTheta, Pioneer DJ, JBL..."
                      className="w-full h-[42px] px-3.5 bg-[#0c0d10] border border-[#27272e] rounded-md text-white text-[14px] font-normal placeholder-[#71717a] focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]/30 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: Slug, SKU & Category */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-[#d4d4d8] mb-1.5">
                      Đường dẫn (Slug SEO) <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={slug}
                      onChange={(e) => {
                        if (onSlugChange) onSlugChange(e.target.value);
                        else setSlug(e.target.value);
                      }}
                      placeholder="alphatheta-xdj-az"
                      className="w-full h-[42px] px-3.5 bg-[#0c0d10] border border-[#27272e] rounded-md text-white font-mono text-[13.5px] placeholder-[#71717a] focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]/30 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-[13px] font-medium text-[#d4d4d8]">
                        Mã SKU <span className="text-emerald-400">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={onRegenerateSku}
                        title="Tạo lại mã SKU mới"
                        className="text-[12px] text-emerald-400 hover:text-emerald-300 font-medium hover:underline transition-colors cursor-pointer"
                      >
                        Tạo mã mới
                      </button>
                    </div>
                    <input
                      type="text"
                      required
                      value={sku}
                      onChange={(e) => {
                        if (onSkuChange) onSkuChange(e.target.value);
                        else setSku(e.target.value);
                      }}
                      placeholder="Tự động sinh khi nhập tên..."
                      className="w-full h-[42px] px-3.5 bg-[#0c0d10] border border-[#27272e] rounded-md text-emerald-400 font-mono font-medium text-[13.5px] placeholder-[#71717a] focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]/30 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#d4d4d8] mb-1.5">
                      Danh mục <span className="text-emerald-400">*</span>
                    </label>
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="w-full h-[42px] px-3 bg-[#0c0d10] border border-[#27272e] rounded-md text-white text-[14px] font-normal focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]/30 focus:outline-none transition-colors cursor-pointer"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id} className="bg-[#111317] text-white">
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: GIÁ BÁN & KHO HÀNG */}
            <div className="border-b border-[#22242a] pb-6">
              <h3 className="text-[16px] font-semibold text-[#f4f4f5] mb-4">
                Giá bán &amp; Kho hàng
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Bán sản phẩm */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[13px] font-medium text-[#d4d4d8] flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={saleEnabled}
                        onChange={(e) => setSaleEnabled(e.target.checked)}
                        className="w-4 h-4 rounded text-[#10b981] focus:ring-0 accent-[#10b981] cursor-pointer"
                      />
                      <span>Bán sản phẩm (VNĐ)</span>
                    </label>
                  </div>
                  <input
                    type="number"
                    disabled={!saleEnabled}
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    placeholder="VD: 35000000"
                    className="w-full h-[42px] px-3.5 bg-[#0c0d10] border border-[#27272e] rounded-md text-white font-mono text-[14px] placeholder-[#71717a] focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]/30 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  />
                  {saleEnabled && salePrice ? (
                    <div className="text-[12px] text-emerald-400 font-medium">
                      {formatVND(salePrice)}
                    </div>
                  ) : (
                    <div className="text-[12px] text-[#71717a]">
                      {saleEnabled ? "Nhập giá bán" : "Đang tắt bán"}
                    </div>
                  )}
                </div>

                {/* Cho thuê */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[13px] font-medium text-[#d4d4d8] flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rentalEnabled}
                        onChange={(e) => setRentalEnabled(e.target.checked)}
                        className="w-4 h-4 rounded text-[#10b981] focus:ring-0 accent-[#10b981] cursor-pointer"
                      />
                      <span>Cho thuê theo ngày (VNĐ)</span>
                    </label>
                  </div>
                  <input
                    type="number"
                    disabled={!rentalEnabled}
                    value={rentalPrice}
                    onChange={(e) => setRentalPrice(e.target.value)}
                    placeholder="VD: 1200000"
                    className="w-full h-[42px] px-3.5 bg-[#0c0d10] border border-[#27272e] rounded-md text-white font-mono text-[14px] placeholder-[#71717a] focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]/30 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  />
                  {rentalEnabled && rentalPrice ? (
                    <div className="text-[12px] text-sky-400 font-medium">
                      {formatVND(rentalPrice)} / ngày
                    </div>
                  ) : (
                    <div className="text-[12px] text-[#71717a]">
                      {rentalEnabled ? "Nhập giá thuê" : "Đang tắt thuê"}
                    </div>
                  )}
                </div>

                {/* Số lượng tồn kho */}
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-medium text-[#d4d4d8]">
                    Số lượng tồn kho (Cái)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    placeholder="5"
                    className="w-full h-[42px] px-3.5 bg-[#0c0d10] border border-[#27272e] rounded-md text-white font-mono text-[14px] placeholder-[#71717a] focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]/30 focus:outline-none transition-colors"
                  />
                  <div className="text-[12px] text-[#a1a1aa] flex items-center gap-1.5">
                    <span
                      className={`inline-block w-1.5 h-1.5 rounded-full ${
                        Number(stockQuantity) > 0 ? "bg-emerald-400" : "bg-red-400"
                      }`}
                    ></span>
                    <span>{Number(stockQuantity) > 0 ? `Còn hàng (${stockQuantity})` : "Hết hàng"}</span>
                  </div>
                </div>

                {/* Áp dụng giá khuyến mãi */}
                {saleEnabled && (
                  <div className="md:col-span-3 mt-1 p-3.5 bg-[#0e1014] border border-[#27272e] rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-[13px] font-semibold text-[#f4f4f5] flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={enableDiscount}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setEnableDiscount(checked);
                            if (!checked && setDiscountPercent) {
                              setDiscountPercent("");
                            }
                          }}
                          className="w-4 h-4 rounded text-[#10b981] focus:ring-0 accent-[#10b981] cursor-pointer"
                        />
                        <span>Áp dụng giá khuyến mãi (Hiển thị % giảm giá &amp; giá gốc gạch ngang)</span>
                      </label>
                      {enableDiscount && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          ĐANG BẬT SALE
                        </span>
                      )}
                    </div>

                    {enableDiscount && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-[#1f2127]">
                        <div className="space-y-1.5">
                          <label className="block text-[12.5px] font-medium text-[#d4d4d8]">
                            Phần trăm giảm giá (%) <span className="text-emerald-400">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              min="1"
                              max="99"
                              step="1"
                              value={discountPercent || ""}
                              onChange={(e) => setDiscountPercent?.(e.target.value)}
                              placeholder="VD: 10"
                              className="w-full h-[40px] px-3.5 pr-8 bg-[#0c0d10] border border-[#27272e] rounded-md text-white font-mono text-[14px] placeholder-[#71717a] focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]/30 focus:outline-none transition-colors"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] text-[#71717a] font-bold pointer-events-none">
                              %
                            </span>
                          </div>
                          <span className="text-[11.5px] text-[#71717a] block">
                            Nhập số nguyên từ 1 đến 99
                          </span>
                        </div>

                        <div className="md:col-span-2 p-3 bg-[#14171d] border border-[#222731] rounded-md">
                          <div className="text-[11.5px] font-bold uppercase tracking-wider text-[#a1a1aa] mb-1.5">
                            Xem trước hiển thị giá khách hàng
                          </div>
                          <div className="flex flex-wrap items-baseline gap-3">
                            <div>
                              <span className="text-[11px] text-[#71717a] block">Giá bán thanh toán:</span>
                              <span className="text-[15px] font-bold text-white font-mono">
                                {salePrice && Number(salePrice) > 0 ? formatVND(salePrice) : "--"}
                              </span>
                            </div>
                            {previewOriginalPrice && previewOriginalPrice > 0 ? (
                              <>
                                <span className="text-[14px] text-emerald-400 font-bold">➔</span>
                                <div>
                                  <span className="text-[11px] text-[#71717a] block">Giá gốc tự tính (gạch ngang):</span>
                                  <span className="text-[15px] font-medium text-[#a1a1aa] line-through font-mono">
                                    {formatVND(previewOriginalPrice)}
                                  </span>
                                </div>
                                <div className="ml-auto text-right">
                                  <span className="text-[11px] text-[#71717a] block">Thẻ giảm:</span>
                                  <span className="inline-block text-[12px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                    -{discountPercent}%
                                  </span>
                                </div>
                              </>
                            ) : (
                              <div className="text-[12px] text-[#71717a] italic mt-1">
                                {salePrice && Number(salePrice) > 0
                                  ? "Nhập % giảm giá từ 1 đến 99 để hệ thống tự tính giá gốc."
                                  : "Vui lòng nhập giá bán hợp lệ trước."}
                              </div>
                            )}
                          </div>
                          <div className="text-[10.5px] text-[#71717a] mt-2 pt-2 border-t border-[#1a1e27]">
                            Công thức chuẩn: <code>original_price = sale_price / (1 - discount_percent / 100)</code> (làm tròn đến 1.000đ).
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* SECTION 3: HÌNH ẢNH THIẾT BỊ */}
            <div className="border-b border-[#22242a] pb-6">
              <h3 className="text-[16px] font-semibold text-[#f4f4f5] mb-4">
                Hình ảnh sản phẩm
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                {/* Inputs */}
                <div className="md:col-span-3 space-y-3">
                  <div>
                    <label className="block text-[13px] font-medium text-[#d4d4d8] mb-1.5">
                      Đường dẫn link ảnh trực tiếp (Image URL)
                    </label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => {
                        setImageUrl(e.target.value);
                        if (e.target.value) {
                          setImagePreviewUrl(e.target.value);
                          setSelectedImageFile(null);
                        }
                      }}
                      placeholder="VD: https://cdn.hstatic.net/products/200000465225/alphatheta-xdj-az.png"
                      className="w-full h-[42px] px-3.5 bg-[#0c0d10] border border-[#27272e] rounded-md text-white text-[13.5px] placeholder-[#71717a] focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]/30 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-[#d4d4d8] mb-1.5">
                      Hoặc tải file ảnh thật từ máy tính
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/avif"
                        onChange={(e) => {
                          onImageFileChange(e);
                          setImageUrl("");
                        }}
                        className="text-[13px] text-[#a1a1aa] file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-[12.5px] file:font-medium file:bg-[#1f2128] file:text-zinc-200 hover:file:bg-[#282b34] cursor-pointer"
                      />
                    </div>
                    {selectedImageFile && (
                      <div className="mt-1 text-[12px] text-emerald-400">
                        Đã chọn: {selectedImageFile.name} ({(selectedImageFile.size / 1024).toFixed(1)} KB)
                      </div>
                    )}
                  </div>
                </div>

                {/* Thumbnail Preview */}
                <div className="flex flex-col items-center justify-center p-2">
                  {imagePreviewUrl ? (
                    <div className="text-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imagePreviewUrl}
                        alt="Preview"
                        className="w-[84px] h-[84px] object-contain rounded-md bg-[#000] border border-[#27272e] p-1 mx-auto"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                      <span className="block text-[11px] text-[#71717a] mt-1.5">
                        {selectedImageFile ? "Ảnh mới tải" : "Ảnh xem trước"}
                      </span>
                    </div>
                  ) : (
                    <div className="w-[84px] h-[84px] rounded-md border border-dashed border-[#27272e] flex flex-col items-center justify-center text-[#71717a] text-[11px] text-center p-2">
                      <svg className="w-5 h-5 mb-1 text-[#52525b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>Chưa có ảnh</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 4: MÔ TẢ CHI TIẾT (MÃ HTML) */}
            <div className="border-b border-[#22242a] pb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[16px] font-semibold text-[#f4f4f5]">
                  Mô tả sản phẩm <span className="text-[13px] font-normal text-[#a1a1aa]">(Mã HTML)</span>
                </h3>
                <span className="text-[12px] font-mono text-[#71717a]">
                  {description.length} ký tự
                </span>
              </div>
              <p className="text-[12.5px] text-[#71717a] mb-2 leading-relaxed">
                Nhập hoặc dán trực tiếp mã HTML (hỗ trợ &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;strong&gt;...). Giữ nguyên cú pháp gốc.
              </p>
              <textarea
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="<h2>Đặc điểm nổi bật:</h2><p>Mô tả chi tiết sản phẩm...</p>"
                spellCheck={false}
                className="w-full px-3.5 py-3 bg-[#0c0d10] border border-[#27272e] rounded-md text-zinc-200 font-mono text-[13px] focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]/30 focus:outline-none transition-colors leading-relaxed"
                style={{
                  minHeight: "140px",
                  resize: "vertical",
                }}
              />
            </div>

            {/* SECTION 5: CẤU HÌNH SEO GOOGLE (ACCORDION) */}
            <div>
              <div
                className="flex items-center justify-between cursor-pointer select-none py-1"
                onClick={() => setIsSeoOpen(!isSeoOpen)}
              >
                <h3 className="text-[16px] font-semibold text-[#f4f4f5] flex items-center gap-2">
                  <span>Cấu hình SEO Google</span>
                  <span className="text-[12px] font-normal text-[#71717a]">(Tùy chọn)</span>
                </h3>
                <button
                  type="button"
                  className="text-[12.5px] text-[#a1a1aa] hover:text-white flex items-center gap-1 font-medium transition-colors cursor-pointer"
                >
                  <span>{isSeoOpen ? "Thu gọn" : "Mở rộng"}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isSeoOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {isSeoOpen && (
                <div className="mt-4 space-y-4 pt-2">
                  {/* Google SERP Snippet Preview */}
                  <div className="bg-[#0b0c10] border border-[#22242a] rounded-md p-3.5">
                    <span className="text-[11px] font-medium text-[#71717a] uppercase tracking-wider block mb-1">
                      Xem trước kết quả tìm kiếm (Google SERP)
                    </span>
                    <div className="text-[12px] text-[#a1a1aa] truncate font-sans">
                      https://vanmusic.com.vn › san-pham › {slug || "duong-dan-san-pham"}
                    </div>
                    <div className="text-[15px] font-medium text-[#8ab4f8] hover:underline cursor-pointer truncate mt-0.5">
                      {metaTitle || name || "Tiêu đề sản phẩm trên Google"}
                    </div>
                    <div className="text-[12.5px] text-[#bdc1c6] mt-1 line-clamp-2 leading-relaxed">
                      {metaDescription ||
                        "Mô tả sản phẩm xuất hiện trên Google Search giúp tăng tỷ lệ click của khách hàng..."}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[13px] font-medium text-[#d4d4d8]">
                          Tiêu đề SEO (Title Tag)
                        </label>
                        <span className="text-[11px] font-mono text-[#71717a]">
                          {metaTitle.length}/65 ký tự
                        </span>
                      </div>
                      <input
                        type="text"
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                        placeholder="VD: [CHÍNH HÃNG] Mua Bàn DJ AlphaTheta XDJ-AZ Đà Nẵng"
                        className="w-full h-[40px] px-3.5 bg-[#0c0d10] border border-[#27272e] rounded-md text-white text-[13.5px] placeholder-[#71717a] focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]/30 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[13px] font-medium text-[#d4d4d8]">
                          Từ khóa SEO (Keywords)
                        </label>
                        <span className="text-[11px] font-mono text-[#71717a]">
                          {metaKeywords.length} ký tự
                        </span>
                      </div>
                      <input
                        type="text"
                        value={metaKeywords}
                        onChange={(e) => setMetaKeywords(e.target.value)}
                        placeholder="VD: alphatheta xdj-az, mua ban dj da nang"
                        className="w-full h-[40px] px-3.5 bg-[#0c0d10] border border-[#27272e] rounded-md text-white text-[13.5px] placeholder-[#71717a] focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]/30 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[13px] font-medium text-[#d4d4d8]">
                          Mô tả SEO (Meta Description)
                        </label>
                        <span className="text-[11px] font-mono text-[#71717a]">
                          {metaDescription.length}/160 ký tự
                        </span>
                      </div>
                      <textarea
                        rows={2}
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                        placeholder="Mô tả tóm tắt chuẩn SEO cho Google..."
                        className="w-full px-3.5 py-2 bg-[#0c0d10] border border-[#27272e] rounded-md text-white text-[13.5px] placeholder-[#71717a] focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]/30 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* =========================================================
              MODAL FOOTER (CLEAN & BALANCED)
              ========================================================= */}
          <div className="flex-shrink-0 flex items-center justify-between px-6 py-3.5 bg-[#111317] border-t border-[#22242a]">
            <div className="text-[12px] text-[#71717a] hidden sm:block">
              Nhấn{" "}
              <kbd className="px-1.5 py-0.5 bg-[#1b1d24] border border-[#2e313b] rounded text-[11px] text-[#d4d4d8] font-mono">
                Esc
              </kbd>{" "}
              để hủy bỏ
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="h-[38px] px-4 rounded-md border border-[#2e313b] bg-[#1a1c23] hover:bg-[#232630] text-[#d4d4d8] text-[13.5px] font-medium transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-[38px] px-5 rounded-md bg-[#10b981] hover:bg-[#059669] text-white text-[13.5px] font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Đang lưu sản phẩm...</span>
                  </>
                ) : (
                  <span>Lưu Sản Phẩm</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
