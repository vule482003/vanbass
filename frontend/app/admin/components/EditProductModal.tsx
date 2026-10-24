"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";

export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  sku: string;
  brand?: string;
  category_id: string;
  sale_enabled: boolean;
  sale_price?: number;
  discount_percent?: number | null;
  original_price?: number | null;
  rental_enabled: boolean;
  rental_price?: number;
  stock_quantity: number;
  description?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  canonical_url?: string;
  images?: Array<{ id?: string; image_url: string; alt_text?: string; is_primary?: boolean; sort_order?: number }>;
  image_url?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  is_active?: boolean;
}

export interface EditProductImageOperation {
  toDeleteIds: string[];
  toReplace: Array<{ id: string; file?: File; url?: string }>;
  toAdd: Array<{ file?: File; url?: string }>;
}

export interface InternalImageItem {
  id?: string;
  image_url: string;
  alt_text?: string;
  is_primary?: boolean;
  sort_order?: number;
  isMarkedForDeletion?: boolean;
  replacementFile?: File | null;
  replacementPreviewUrl?: string | null;
  isNew?: boolean;
}

export interface EditProductModalProps {
  isOpen: boolean;
  product: ProductItem | null;
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
  imageUrl?: string;
  setImageUrl?: (val: string) => void;
  imagePreviewUrl?: string | null;
  setImagePreviewUrl?: (val: string | null) => void;
  selectedImageFile?: File | null;
  setSelectedImageFile?: (file: File | null) => void;
  description: string;
  setDescription: (val: string) => void;
  metaTitle: string;
  setMetaTitle: (val: string) => void;
  metaDescription: string;
  setMetaDescription: (val: string) => void;
  metaKeywords: string;
  setMetaKeywords: (val: string) => void;
  // Handlers & State
  onClose: () => void;
  onSubmit: (e: React.FormEvent, imageOps?: EditProductImageOperation) => void | Promise<void>;
  onRegenerateSku: () => void;
  onImageFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSubmitting: boolean;
  errorMessage?: string;
}

export default function EditProductModal({
  isOpen,
  product,
  categories,
  name,
  setName,
  brand,
  setBrand,
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
  selectedImageFile,
  description,
  setDescription,
  metaTitle,
  setMetaTitle,
  metaDescription,
  setMetaDescription,
  metaKeywords,
  setMetaKeywords,
  onClose,
  onSubmit,
  onRegenerateSku,
  isSubmitting,
  errorMessage,
}: EditProductModalProps) {
  const [isSeoOpen, setIsSeoOpen] = useState(false);
  const [imagesList, setImagesList] = useState<InternalImageItem[]>([]);
  const [newImageUrlInput, setNewImageUrlInput] = useState("");
  const [showAddUrlInput, setShowAddUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceFileInputRef = useRef<HTMLInputElement>(null);
  const [replacingIndex, setReplacingIndex] = useState<number | null>(null);
  const [localValidationMsg, setLocalValidationMsg] = useState<string | null>(null);
  const [enableDiscount, setEnableDiscount] = useState<boolean>(false);

  // Sync images list and discount toggle whenever product or modal state changes (React idiomatic render-time sync)
  const [prevProductSyncKey, setPrevProductSyncKey] = useState<string | null>(null);
  const currentProductSyncKey = isOpen && product ? `${product.id}_${product.images?.length || 0}` : null;

  if (currentProductSyncKey !== prevProductSyncKey) {
    setPrevProductSyncKey(currentProductSyncKey);
    setLocalValidationMsg(null);
    setEnableDiscount(Boolean(discountPercent && Number(discountPercent) > 0));
    if (product) {
      if (product.images && product.images.length > 0) {
        setImagesList(
          product.images.map((img, idx) => ({
            id: img.id,
            image_url: img.image_url,
            alt_text: img.alt_text,
            is_primary: img.is_primary ?? idx === 0,
            sort_order: img.sort_order ?? idx,
            isMarkedForDeletion: false,
            replacementFile: null,
            replacementPreviewUrl: null,
            isNew: false,
          }))
        );
      } else if (product.image_url) {
        setImagesList([
          {
            id: undefined,
            image_url: product.image_url,
            is_primary: true,
            sort_order: 0,
            isMarkedForDeletion: false,
            replacementFile: null,
            replacementPreviewUrl: null,
            isNew: false,
          },
        ]);
      } else {
        setImagesList([]);
      }
    } else {
      setImagesList([]);
    }
    setNewImageUrlInput("");
    setShowAddUrlInput(false);
    setReplacingIndex(null);
  }

  const handleToggleDelete = (idx: number) => {
    setImagesList((prev) => {
      const target = prev[idx];
      if (!target) return prev;
      if (target.isNew) {
        return prev.filter((_, i) => i !== idx);
      }
      return prev.map((img, i) =>
        i === idx ? { ...img, isMarkedForDeletion: !img.isMarkedForDeletion } : img
      );
    });
  };

  const handleTriggerReplace = (idx: number) => {
    setReplacingIndex(idx);
    replaceFileInputRef.current?.click();
  };

  const handleReplaceFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && replacingIndex !== null) {
      const preview = URL.createObjectURL(file);
      setImagesList((prev) =>
        prev.map((img, i) =>
          i === replacingIndex
            ? {
                ...img,
                replacementFile: file,
                replacementPreviewUrl: preview,
                isMarkedForDeletion: false,
              }
            : img
        )
      );
    }
    if (replaceFileInputRef.current) {
      replaceFileInputRef.current.value = "";
    }
    setReplacingIndex(null);
  };

  const handleCancelReplace = (idx: number) => {
    setImagesList((prev) =>
      prev.map((img, i) =>
        i === idx
          ? {
              ...img,
              replacementFile: null,
              replacementPreviewUrl: null,
            }
          : img
      )
    );
  };

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newItems: InternalImageItem[] = Array.from(files).map((file) => ({
        image_url: "",
        replacementFile: file,
        replacementPreviewUrl: URL.createObjectURL(file),
        isNew: true,
        isMarkedForDeletion: false,
      }));
      setImagesList((prev) => [...prev, ...newItems]);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddUrl = () => {
    const url = newImageUrlInput.trim();
    if (!url) return;
    setImagesList((prev) => [
      ...prev,
      {
        image_url: url,
        isNew: true,
        isMarkedForDeletion: false,
      },
    ]);
    setNewImageUrlInput("");
    setShowAddUrlInput(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalValidationMsg(null);

    // 1. Validation tồn kho không được để trống
    const trimmedStock = String(stockQuantity ?? "").trim();
    if (trimmedStock === "") {
      setLocalValidationMsg("Số lượng tồn kho không được để trống. Vui lòng nhập số lượng (hoặc nhập 0 nếu hết hàng).");
      return;
    }
    const numStock = Number(trimmedStock);
    if (isNaN(numStock) || numStock < 0 || !Number.isInteger(numStock)) {
      setLocalValidationMsg("Số lượng tồn kho phải là số nguyên không âm (>= 0).");
      return;
    }

    // 2. Validation giá bán khi bật bán
    if (saleEnabled) {
      const trimmedSalePrice = String(salePrice ?? "").trim();
      if (!trimmedSalePrice) {
        setLocalValidationMsg("Vui lòng nhập giá bán khi bật chức năng bán sản phẩm.");
        return;
      }
      const numSalePrice = Number(trimmedSalePrice);
      if (isNaN(numSalePrice) || numSalePrice <= 0) {
        setLocalValidationMsg("Giá bán phải là số hợp lệ lớn hơn 0 khi bật bán sản phẩm.");
        return;
      }
    }

    // 2B. Validation khuyến mãi
    if (enableDiscount) {
      const trimmedDiscount = String(discountPercent ?? "").trim();
      if (!trimmedDiscount) {
        setLocalValidationMsg("Vui lòng nhập phần trăm giảm giá (từ 1% đến 99%) hoặc tắt tùy chọn khuyến mãi.");
        return;
      }
      const numDiscount = Number(trimmedDiscount);
      if (isNaN(numDiscount) || !Number.isInteger(numDiscount) || numDiscount < 1 || numDiscount > 99) {
        setLocalValidationMsg("Phần trăm giảm giá phải là số nguyên từ 1 đến 99%.");
        return;
      }
      if (!saleEnabled || !salePrice || Number(salePrice) <= 0) {
        setLocalValidationMsg("Chỉ có thể áp dụng khuyến mãi khi sản phẩm đang được bật bán với giá bán hợp lệ.");
        return;
      }
    }

    // 3. Validation giá thuê khi bật cho thuê
    if (rentalEnabled) {
      const trimmedRentalPrice = String(rentalPrice ?? "").trim();
      if (!trimmedRentalPrice) {
        setLocalValidationMsg("Vui lòng nhập giá thuê khi bật chức năng cho thuê.");
        return;
      }
      const numRentalPrice = Number(trimmedRentalPrice);
      if (isNaN(numRentalPrice) || numRentalPrice <= 0) {
        setLocalValidationMsg("Giá thuê phải là số hợp lệ lớn hơn 0 khi bật cho thuê.");
        return;
      }
    }

    const toDeleteIds: string[] = [];
    const toReplace: Array<{ id: string; file?: File; url?: string }> = [];
    const toAdd: Array<{ file?: File; url?: string }> = [];

    for (const img of imagesList) {
      if (img.isNew) {
        if (!img.isMarkedForDeletion) {
          if (img.replacementFile) {
            toAdd.push({ file: img.replacementFile });
          } else if (img.image_url.trim()) {
            toAdd.push({ url: img.image_url.trim() });
          }
        }
      } else if (img.isMarkedForDeletion) {
        if (img.id) {
          toDeleteIds.push(img.id);
        }
      } else if (img.replacementFile) {
        if (img.id) {
          toReplace.push({ id: img.id, file: img.replacementFile });
        } else {
          // Legacy product with no ID in image record -> add as new
          toAdd.push({ file: img.replacementFile });
        }
      }
    }

    // Support legacy single file if passed via props
    if (selectedImageFile) {
      toAdd.push({ file: selectedImageFile });
    }

    await onSubmit(e, { toDeleteIds, toReplace, toAdd });
  };

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

  if (!isOpen || !product) {
    return null;
  }

  const currentCategoryName = categories.find((c) => c.id === categoryId)?.name;

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
      aria-labelledby="edit-product-modal-title"
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
        <form onSubmit={handleFormSubmit} className="flex flex-col h-full min-h-0" noValidate={false}>
          {/* =========================================================
              MODAL HEADER (REFINED & SLIM)
              ========================================================= */}
          <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 bg-[#111317] border-b border-[#22242a]">
            <div className="min-w-0">
              <h2
                id="edit-product-modal-title"
                className="text-[22px] sm:text-[24px] font-semibold text-white tracking-tight leading-tight truncate"
              >
                Chỉnh Sửa Sản Phẩm
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-1 text-[13px] text-[#a1a1aa] font-normal">
                <span>ID: #{product.id}</span>
                <span>•</span>
                <span>SKU: {product.sku || "Chưa có"}</span>
                {currentCategoryName && (
                  <>
                    <span>•</span>
                    <span className="truncate max-w-[240px]">Danh mục: {currentCategoryName}</span>
                  </>
                )}
              </div>
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
            {/* Error Banner if update fails or local validation fails */}
            {(localValidationMsg || errorMessage) && (
              <div className="p-3.5 rounded-lg bg-red-950/30 border border-red-500/40 flex items-start gap-2.5 text-red-200 text-[13px]">
                <span className="text-red-400 font-bold leading-none mt-0.5">⚠️</span>
                <div className="flex-1 leading-snug">{localValidationMsg || errorMessage}</div>
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
                      onChange={(e) => setName(e.target.value)}
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
                      onChange={(e) => setBrand(e.target.value)}
                      placeholder="VD: AlphaTheta, Pioneer DJ, JBL..."
                      className="w-full h-[42px] px-3.5 bg-[#0c0d10] border border-[#27272e] rounded-md text-white text-[14px] font-normal placeholder-[#71717a] focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]/30 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: Slug, SKU & Category */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[13px] font-medium text-[#d4d4d8] mb-1.5">
                      Đường dẫn (Slug) <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
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
                        className="text-[12px] text-emerald-400 hover:text-emerald-300 font-medium hover:underline transition-colors"
                      >
                        Tạo mã mới
                      </button>
                    </div>
                    <input
                      type="text"
                      required
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      placeholder="XDJ-AZ-AT"
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
                Giá bán & Kho hàng
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

            {/* SECTION 3: QUẢN LÝ HÌNH ẢNH SẢN PHẨM */}
            <div className="border-b border-[#22242a] pb-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-[16px] font-semibold text-[#f4f4f5]">
                    Quản lý hình ảnh sản phẩm
                  </h3>
                  <p className="text-[12.5px] text-[#71717a] mt-0.5">
                    Hiển thị các ảnh hiện có. Giữ nguyên nếu không thao tác; chỉ cập nhật khi bạn chủ động thêm, thay thế hoặc xóa.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-mono text-[#a1a1aa] bg-[#1a1c23] border border-[#27272e] px-2.5 py-1 rounded-md">
                    {imagesList.filter((img) => !img.isMarkedForDeletion).length} ảnh hoạt động
                  </span>
                </div>
              </div>

              {/* Gallery Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 pt-1">
                {imagesList.map((img, idx) => {
                  const displayUrl = img.replacementPreviewUrl || img.image_url;
                  const isPrimary = idx === 0 || img.is_primary;
                  const isDeleted = img.isMarkedForDeletion;

                  return (
                    <div
                      key={img.id || `img-${idx}`}
                      className={`relative rounded-lg border p-2 flex flex-col justify-between transition-all duration-150 ${
                        isDeleted
                          ? "border-red-500/40 bg-red-950/20 opacity-60"
                          : img.replacementFile
                          ? "border-emerald-500/50 bg-[#161a22]"
                          : img.isNew
                          ? "border-blue-500/40 bg-[#131720]"
                          : "border-[#27272e] bg-[#0c0d10] hover:border-[#383b45]"
                      }`}
                      style={{ minHeight: "165px" }}
                    >
                      {/* Badge top */}
                      <div className="flex items-center justify-between gap-1 mb-1.5 min-h-[20px]">
                        {isPrimary ? (
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
                            Ảnh chính
                          </span>
                        ) : (
                          <span className="text-[10.5px] text-[#71717a] font-mono">
                            #{idx + 1}
                          </span>
                        )}

                        {isDeleted ? (
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-red-500/25 border border-red-500/40 text-red-300">
                            Sẽ xóa
                          </span>
                        ) : img.replacementFile ? (
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-500/25 border border-emerald-500/40 text-emerald-300">
                            Đã đổi
                          </span>
                        ) : img.isNew ? (
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-500/25 border border-blue-500/40 text-blue-300">
                            Mới thêm
                          </span>
                        ) : null}
                      </div>

                      {/* Image Thumbnail */}
                      <div className="w-full h-[95px] rounded bg-[#000] border border-[#1f2128] overflow-hidden flex items-center justify-center p-1 relative">
                        {displayUrl ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={displayUrl}
                            alt={img.alt_text || `Product image ${idx + 1}`}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/images/products/placeholder.png";
                            }}
                          />
                        ) : (
                          <span className="text-[11px] text-[#71717a]">Chưa có ảnh</span>
                        )}
                      </div>

                      {/* Card Actions */}
                      <div className="flex items-center justify-between gap-1 mt-2 pt-1.5 border-t border-[#1f2128]">
                        {isDeleted ? (
                          <button
                            type="button"
                            onClick={() => handleToggleDelete(idx)}
                            className="w-full text-[11px] text-[#38bdf8] hover:text-[#7dd3fc] font-medium py-1 px-1.5 rounded hover:bg-[#1a2332] transition-colors cursor-pointer text-center"
                          >
                            ↩ Hoàn tác
                          </button>
                        ) : img.replacementFile ? (
                          <button
                            type="button"
                            onClick={() => handleCancelReplace(idx)}
                            className="w-full text-[11px] text-[#a1a1aa] hover:text-white font-medium py-1 px-1.5 rounded hover:bg-[#1f2128] transition-colors cursor-pointer text-center"
                          >
                            Hủy đổi
                          </button>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => handleTriggerReplace(idx)}
                              className="text-[11px] text-[#d4d4d8] hover:text-white font-medium py-1 px-2 rounded hover:bg-[#1f2128] transition-colors flex items-center gap-1 cursor-pointer"
                              title="Thay thế ảnh này"
                            >
                              <svg className="w-3 h-3 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                              <span>Thay</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleToggleDelete(idx)}
                              className="text-[11px] text-red-400 hover:text-red-300 font-medium py-1 px-2 rounded hover:bg-red-950/30 transition-colors flex items-center gap-1 cursor-pointer ml-auto"
                              title="Xóa ảnh này"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              <span>Xóa</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Dropzone Card: THÊM ẢNH MỚI */}
                <div
                  className="rounded-lg border border-dashed border-[#343842] hover:border-[#10b981] bg-[#0c0d10]/60 hover:bg-[#12151c] p-3 flex flex-col items-center justify-center text-center transition-all duration-150 cursor-pointer group"
                  style={{ minHeight: "165px" }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="w-8 h-8 rounded-full bg-[#1b1e26] group-hover:bg-[#10b981]/20 group-hover:text-[#10b981] text-[#a1a1aa] flex items-center justify-center mb-1.5 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <span className="text-[12.5px] font-medium text-white group-hover:text-[#10b981] transition-colors">
                    Thêm ảnh mới
                  </span>
                  <span className="text-[11px] text-[#71717a] mt-0.5">
                    Chọn từ máy tính
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowAddUrlInput((prev) => !prev);
                    }}
                    className="mt-2 text-[11px] text-[#38bdf8] hover:underline"
                  >
                    {showAddUrlInput ? "Ẩn nhập link" : "+ Dán link ảnh"}
                  </button>
                </div>
              </div>

              {/* Hidden file inputs for add & replace */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                multiple
                className="hidden"
                onChange={handleFilesSelected}
              />
              <input
                ref={replaceFileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                className="hidden"
                onChange={handleReplaceFileSelected}
              />

              {/* URL Input dropdown if toggled */}
              {showAddUrlInput && (
                <div className="mt-3 p-3 rounded-lg bg-[#0c0d10] border border-[#27272e] flex items-center gap-2">
                  <input
                    type="url"
                    value={newImageUrlInput}
                    onChange={(e) => setNewImageUrlInput(e.target.value)}
                    placeholder="Dán link ảnh trực tiếp (VD: https://cdn.../product.png)"
                    className="flex-1 h-[36px] px-3 bg-[#111317] border border-[#27272e] rounded text-white text-[13px] placeholder-[#71717a] focus:border-[#10b981] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddUrl}
                    className="h-[36px] px-3.5 rounded bg-[#10b981] hover:bg-[#059669] text-white text-[12.5px] font-medium transition-colors cursor-pointer"
                  >
                    Thêm ảnh
                  </button>
                </div>
              )}
            </div>

            {/* SECTION 4: MÔ TẢ CHI TIẾT (RAW HTML TEXTAREA) */}
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
                Nhập hoặc chỉnh sửa trực tiếp mã HTML (hỗ trợ &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;strong&gt;...). Giữ nguyên cú pháp gốc.
              </p>
              <textarea
                rows={7}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="<h2>Đặc điểm nổi bật:</h2><p>Mô tả chi tiết sản phẩm...</p>"
                spellCheck={false}
                className="w-full px-3.5 py-3 bg-[#0c0d10] border border-[#27272e] rounded-md text-zinc-200 font-mono text-[13px] focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981]/30 focus:outline-none transition-colors leading-relaxed"
                style={{
                  minHeight: "160px",
                  resize: "vertical",
                }}
              />
            </div>

            {/* SECTION 5: CẤU HÌNH SEO GOOGLE */}
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
                    <span>Đang lưu...</span>
                  </>
                ) : (
                  <span>Lưu thay đổi</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
