"use client";

import { startTransition, useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/auth-context";
import { DEFAULT_HOME_DATA, HomeData } from "../types/home_config";

interface ProductItem {
  id: string;
  name: string;
  slug: string;
  sku: string;
  brand?: string;
  category_id: string;
  sale_enabled: boolean;
  sale_price?: number;
  rental_enabled: boolean;
  rental_price?: number;
  stock_quantity: number;
  description?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  canonical_url?: string;
  images?: Array<{ id?: string; image_url: string; alt_text?: string; is_primary?: boolean }>;
  image_url?: string;
}

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
}

interface OrderLineItem {
  id?: string;
  product_id?: string;
  product_name: string;
  sku?: string;
  product_sku?: string;
  quantity: number;
  unit_price: number;
  subtotal?: number;
  line_total?: number;
  product_slug?: string;
  product_image?: string;
}

interface OrderItem {
  id: string;
  order_number: string;
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  customer_note?: string;
  subtotal?: number;
  shipping_fee?: number;
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
  updated_at?: string;
  items?: OrderLineItem[];
}

interface RentalRequestItem {
  id: string;
  request_number: string;
  start_date: string;
  end_date: string;
  rental_total: number;
  deposit_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
  items?: Array<{ product_name: string; quantity: number; daily_rate: number }>;
}

const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: "⏳ Chờ xử lý",
  confirmed: "✓ Đã xác nhận",
  processing: "📦 Đang chuẩn bị",
  shipped: "🚚 Đang giao hàng",
  completed: "🎉 Hoàn thành",
  cancelled: "✕ Đã hủy",
};

const ORDER_PAYMENT_STATUS_LABELS: Record<string, string> = {
  unpaid: "Chưa thanh toán",
  paid: "Đã thanh toán",
  refunded: "Đã hoàn tiền",
};

const RENTAL_STATUS_LABELS: Record<string, string> = {
  pending: "⏳ Chờ liên hệ",
  contacted: "📞 Đã liên hệ",
  confirmed: "✓ Đã xác nhận",
  completed: "🎉 Đã trả máy",
  cancelled: "✕ Đã hủy",
};

const RENTAL_PAYMENT_STATUS_LABELS: Record<string, string> = {
  unpaid: "Chưa cọc",
  partially_paid: "Đã cọc 1 phần",
  paid: "Đã cọc đủ",
  refunded: "Đã hoàn cọc",
};

interface StatusConfirmModalState {
  type: "order_status" | "order_payment" | "rental_status" | "rental_payment";
  id: string;
  itemCode: string;
  title: string;
  currentLabel: string;
  newLabel: string;
  newStatus?: string;
  newPaymentStatus?: string;
}

interface DeleteProductConfirmState {
  id: string;
  name: string;
  sku?: string;
}

function formatCurrency(amount?: number) {
  if (amount === undefined || amount === null) return "0 ₫";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, token, isAuthenticated, isLoading, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<"overview" | "home_cms" | "products" | "orders" | "rentals">("overview");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Home CMS states
  const [homeConfig, setHomeConfig] = useState<HomeData>(DEFAULT_HOME_DATA);
  const [savedHomeConfig, setSavedHomeConfig] = useState<HomeData>(DEFAULT_HOME_DATA);
  const [isHomeConfigLoading, setIsHomeConfigLoading] = useState(false);
  const [isHomeConfigSaving, setIsHomeConfigSaving] = useState(false);
  const [activeCmsAccordion, setActiveCmsAccordion] = useState<string>("hero");
  const [previewLayoutMode, setPreviewLayoutMode] = useState<"split" | "full">("split");
  const [heroSubTab, setHeroSubTab] = useState<"left" | "center" | "right">("center");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [previewKey, setPreviewKey] = useState<number>(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const leftHeroFileRef = useRef<HTMLInputElement>(null);
  const centerHeroFileRef = useRef<HTMLInputElement>(null);
  const rightHeroFileRef = useRef<HTMLInputElement>(null);

  const [inlineEditor, setInlineEditor] = useState<{
    isOpen: boolean;
    fieldKey: string;
    label: string;
    fieldType: string;
    currentVal: string;
  } | null>(null);

  const getNestedVal = useCallback((obj: any, path: string) => {
    if (!obj || !path) return "";
    const parts = path.split(".");
    let cur = obj;
    for (const p of parts) {
      if (cur == null) return "";
      cur = cur[p];
    }
    return typeof cur === "string" ? cur : "";
  }, []);

  const updateNestedVal = useCallback((path: string, val: string) => {
    setHomeConfig((prev: any) => {
      const next = JSON.parse(JSON.stringify(prev));
      const parts = path.split(".");
      let cur = next;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!cur[parts[i]]) cur[parts[i]] = {};
        cur = cur[parts[i]];
      }
      cur[parts[parts.length - 1]] = val;
      return next;
    });
  }, []);

  // Data states
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [rentals, setRentals] = useState<RentalRequestItem[]>([]);
  const [, setIsDataLoading] = useState(true);

  // Add Product Modal states
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [sku, setSku] = useState("");
  const [brand, setBrand] = useState("AlphaTheta");
  const [categoryId, setCategoryId] = useState("");
  const [saleEnabled, setSaleEnabled] = useState(true);
  const [salePrice, setSalePrice] = useState("");
  const [rentalEnabled, setRentalEnabled] = useState(true);
  const [rentalPrice, setRentalPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("5");
  const [description, setDescription] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");

  // Upload image states
  const [imageUrl, setImageUrl] = useState("");
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState("");
  const [actionErrorMsg, setActionErrorMsg] = useState("");
  const [statusConfirmModal, setStatusConfirmModal] = useState<StatusConfirmModalState | null>(null);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<DeleteProductConfirmState | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<OrderItem | null>(null);

  // Auto-dismiss notifications after 3 seconds
  useEffect(() => {
    if (actionSuccessMsg) {
      const timer = setTimeout(() => {
        setActionSuccessMsg("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [actionSuccessMsg]);

  useEffect(() => {
    if (actionErrorMsg) {
      const timer = setTimeout(() => {
        setActionErrorMsg("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [actionErrorMsg]);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

  // Check auth
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login?redirect=/admin");
      }
    }
  }, [isAuthenticated, isLoading, router]);

  const sendLiveConfigToIframe = useCallback(() => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: "VANBASS_LIVE_CONFIG",
          data: homeConfig,
        },
        "*"
      );
    }
  }, [homeConfig]);

  const sendScrollToSection = useCallback((sectionId: string) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: "VANBASS_SCROLL_TO",
          section: sectionId,
        },
        "*"
      );
    }
  }, []);

  useEffect(() => {
    sendLiveConfigToIframe();
  }, [sendLiveConfigToIframe]);

  useEffect(() => {
    const handleIframeMessage = (e: MessageEvent) => {
      if (!e.data || typeof e.data !== "object") return;
      if (e.data.type === "VANBASS_IFRAME_READY") {
        sendLiveConfigToIframe();
      }
      if (e.data.type === "VANBASS_SELECT_SECTION" && e.data.section) {
        setActiveCmsAccordion(e.data.section);
      }
      if (e.data.type === "VANBASS_OPEN_INLINE_EDITOR") {
        const { fieldKey, label, fieldType, currentVal } = e.data;
        setInlineEditor({
          isOpen: true,
          fieldKey,
          label: label || "Chỉnh sửa phần tử",
          fieldType: fieldType || "text",
          currentVal: currentVal || "",
        });
      }
    };
    window.addEventListener("message", handleIframeMessage);
    return () => window.removeEventListener("message", handleIframeMessage);
  }, [sendLiveConfigToIframe]);

  const handleSaveHomeConfig = async () => {
    setIsHomeConfigSaving(true);
    try {
      const res = await fetch(`${apiUrl}/home-config`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: homeConfig }),
      });
      if (res.ok) {
        const json = await res.json();
        setSavedHomeConfig(json.data || homeConfig);
        setActionSuccessMsg("✓ Đã lưu và xuất bản trang chủ thành công!");
      } else {
        const err = await res.json().catch(() => ({ detail: "Lỗi lưu cấu hình" }));
        setActionErrorMsg(err.detail || "Không thể lưu cấu hình trang chủ.");
      }
    } catch (err) {
      console.error("Error saving home config:", err);
      setActionErrorMsg("Lỗi kết nối máy chủ khi lưu cấu hình.");
    } finally {
      setIsHomeConfigSaving(false);
    }
  };

  const handleCancelHomeConfig = () => {
    setHomeConfig(savedHomeConfig);
    setActionSuccessMsg("✓ Đã hoàn nguyên về cấu hình đã lưu gần nhất.");
  };

  const handleResetHomeConfigToDefault = () => {
    setHomeConfig(DEFAULT_HOME_DATA);
    setActionSuccessMsg("✓ Đã khôi phục về mẫu cấu hình mặc định ban đầu.");
  };

  const handleHeroImageUpload = async (panel: "hero_left" | "hero_center" | "hero_right", file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch(`${apiUrl}/home-config/upload-image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (res.ok) {
        const json = await res.json();
        setHomeConfig((prev) => ({
          ...prev,
          [panel]: {
            ...prev[panel],
            bg_image: json.url,
          },
        }));
        setActionSuccessMsg(`✓ Đã tải ảnh cho ${panel === "hero_left" ? "Banner Trái" : panel === "hero_center" ? "Banner Giữa" : "Banner Phải"} thành công!`);
      } else {
        setActionErrorMsg("Không thể tải ảnh lên máy chủ.");
      }
    } catch {
      setActionErrorMsg("Lỗi kết nối khi tải ảnh.");
    }
  };

  const loadAllData = useCallback(async () => {
    setIsDataLoading(true);
    try {
      const cacheBust = `_t=${Date.now()}`;
      // 1. Fetch categories
      const catRes = await fetch(`${apiUrl}/categories?${cacheBust}`, { cache: "no-store" });
      if (catRes.ok) {
        const catData = await catRes.json();
        setCategories(catData);
        if (catData.length > 0 && !categoryId) {
          setCategoryId(catData[0].id);
        }
      }

      // 2. Fetch products
      const prodRes = await fetch(`${apiUrl}/products?${cacheBust}`, {
        cache: "no-store",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (prodRes.ok) {
        const prodData = await prodRes.json();
        setProducts(prodData);
      }

      // 3. Fetch orders
      if (token) {
        const orderRes = await fetch(`${apiUrl}/orders?${cacheBust}`, {
          cache: "no-store",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (orderRes.ok) {
          const orderData = await orderRes.json();
          setOrders(orderData.items || []);
        }

        // 4. Fetch rental requests
        const rentRes = await fetch(`${apiUrl}/rental-requests?${cacheBust}`, {
          cache: "no-store",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (rentRes.ok) {
          const rentData = await rentRes.json();
          setRentals(rentData.items || []);
        }
      }

      // 5. Fetch home configuration
      setIsHomeConfigLoading(true);
      const homeRes = await fetch(`${apiUrl}/home-config?${cacheBust}`, { cache: "no-store" });
      if (homeRes.ok) {
        const homeJson = await homeRes.json();
        if (homeJson?.data) {
          const sanitizeImg = (url: string | undefined, fallback: string) => {
            if (!url || !url.trim() || url === "null" || url === "undefined") return fallback;
            const cleaned = url.replace(/^https?:\/\/(127\.0\.0\.1|localhost):8000/, "");
            return cleaned.startsWith("http:") || cleaned.startsWith("https:") || cleaned.startsWith("blob:") || cleaned.startsWith("data:")
              ? cleaned
              : cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
          };

          const merged: HomeData = {
            ...DEFAULT_HOME_DATA,
            ...homeJson.data,
            visibility: { ...DEFAULT_HOME_DATA.visibility, ...(homeJson.data.visibility || {}) },
            hero_left: { ...DEFAULT_HOME_DATA.hero_left, ...(homeJson.data.hero_left || {}), bg_image: sanitizeImg(homeJson.data.hero_left?.bg_image, DEFAULT_HOME_DATA.hero_left.bg_image) },
            hero_center: { ...DEFAULT_HOME_DATA.hero_center, ...(homeJson.data.hero_center || {}), bg_image: sanitizeImg(homeJson.data.hero_center?.bg_image, DEFAULT_HOME_DATA.hero_center.bg_image) },
            hero_right: { ...DEFAULT_HOME_DATA.hero_right, ...(homeJson.data.hero_right || {}), bg_image: sanitizeImg(homeJson.data.hero_right?.bg_image, DEFAULT_HOME_DATA.hero_right.bg_image) },
            categories_highlight: { ...DEFAULT_HOME_DATA.categories_highlight, ...(homeJson.data.categories_highlight || {}) },
            intro: { ...DEFAULT_HOME_DATA.intro, ...(homeJson.data.intro || {}) },
            rental: { ...DEFAULT_HOME_DATA.rental, ...(homeJson.data.rental || {}) },
            local_cta: { ...DEFAULT_HOME_DATA.local_cta, ...(homeJson.data.local_cta || {}) },
            floating_contacts: { ...DEFAULT_HOME_DATA.floating_contacts, ...(homeJson.data.floating_contacts || {}) },
          };
          setHomeConfig(merged);
          setSavedHomeConfig(merged);
        }
      }
    } catch (e) {
      console.error("Failed to fetch admin data:", e);
    } finally {
      setIsDataLoading(false);
      setIsHomeConfigLoading(false);
    }
  }, [apiUrl, token, categoryId]);

  useEffect(() => {
    if (user?.role === "admin" && token) {
      startTransition(() => {
        void loadAllData();
      });
    }
  }, [user, token, loadAllData]);

  // Auto-generate clean, professional SKU from product name and brand
  const generateSkuFromName = (productName: string, brandName?: string) => {
    const clean = (productName || "")
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-zA-Z0-9\s]/g, " ")
      .trim();
    const words = clean.split(/\s+/).filter(Boolean);
    const prefix = brandName ? brandName.replace(/[^a-zA-Z0-9]/g, "").slice(0, 3).toUpperCase() : "VB";
    const model = words.length > 0 ? words[words.length - 1].toUpperCase().slice(0, 6) : "PROD";
    const rand = Math.floor(100 + Math.random() * 900);
    return `${prefix || "VB"}-${model}-${rand}`.replace(/--+/g, "-");
  };

  const resetProductForm = useCallback(() => {
    setName("");
    setSlug("");
    setSku(`VB-PROD-${Math.floor(100 + Math.random() * 900)}`);
    setBrand("AlphaTheta");
    setCategoryId(categories.length > 0 ? categories[0].id : "");
    setSaleEnabled(true);
    setSalePrice("");
    setRentalEnabled(true);
    setRentalPrice("");
    setStockQuantity("5");
    setDescription("");
    setMetaTitle("");
    setMetaDescription("");
    setMetaKeywords("");
    setImageUrl("");
    setSelectedImageFile(null);
    setImagePreviewUrl(null);
    setEditingProduct(null);
    setActionErrorMsg("");
  }, [categories]);

  const handleOpenAddModal = () => {
    resetProductForm();
    setShowAddProductModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddProductModal(false);
    resetProductForm();
  };

  const handleCloseEditModal = () => {
    setShowEditProductModal(false);
    resetProductForm();
  };

  // Handle auto slug and auto SKU from name
  const handleNameChange = (val: string) => {
    setName(val);
    const generatedSlug = val
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    setSlug(generatedSlug);

    if (!editingProduct) {
      setSku(generateSkuFromName(val, brand));
    }
  };

  const handleBrandChange = (newBrand: string) => {
    setBrand(newBrand);
    if (!editingProduct && name) {
      setSku(generateSkuFromName(name, newBrand));
    }
  };

  const handleRegenerateSku = () => {
    setSku(generateSkuFromName(name, brand));
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !slug || !sku || !categoryId) {
      setActionErrorMsg("Vui lòng điền đầy đủ các thông tin bắt buộc (*)");
      return;
    }

    setIsSubmitting(true);
    setActionErrorMsg("");
    setActionSuccessMsg("");

    try {
      // 1. Upload image if selected or use direct URL
      let finalImageUrl: string | null = null;
      if (selectedImageFile && token) {
        const formData = new FormData();
        formData.append("file", selectedImageFile);

        const uploadRes = await fetch(`${apiUrl}/upload/image`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          finalImageUrl = uploadData.url;
        }
      } else if (imageUrl.trim()) {
        finalImageUrl = imageUrl.trim();
      }

      // 2. Create product payload
      const payload: Record<string, unknown> = {
        name,
        slug,
        sku,
        brand,
        category_id: categoryId,
        sale_enabled: saleEnabled,
        sale_price: saleEnabled && salePrice ? parseFloat(salePrice) : null,
        rental_enabled: rentalEnabled,
        rental_price: rentalEnabled && rentalPrice ? parseFloat(rentalPrice) : null,
        stock_quantity: parseInt(stockQuantity) || 0,
        description,
        meta_title: metaTitle || `${name} Chính Hãng Đà Nẵng | VanBass`,
        meta_description: metaDescription || description.slice(0, 160),
        meta_keywords: metaKeywords || `${brand}, ${name}, mua bàn dj, thuê bàn dj`,
        canonical_url: `https://vanbass.vn/products/${slug}`,
        specifications: {
          "Thương hiệu": brand,
          "Tình trạng": "Mới 100% Chính hãng",
          "Bảo hành": "12 tháng tại VanBass",
        },
      };

      const res = await fetch(`${apiUrl}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const newProduct = await res.json();

        // 3. Link image to product if provided
        if (finalImageUrl && newProduct.id) {
          await fetch(`${apiUrl}/products/${newProduct.id}/images`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              image_url: finalImageUrl,
              alt_text: name,
              sort_order: 0,
            }),
          });
        }

        setActionSuccessMsg(`✓ Đã thêm sản phẩm "${name}" thành công vào hệ thống!`);
        handleCloseAddModal();
        loadAllData();
      } else {
        const err = await res.json().catch(() => ({ detail: "Không thể tạo sản phẩm" }));
        setActionErrorMsg(err.detail || "Lỗi khi tạo sản phẩm.");
      }
    } catch {
      setActionErrorMsg("Không thể kết nối đến máy chủ Backend.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenEditModal = (product: ProductItem) => {
    setEditingProduct(product);
    setName(product.name);
    setSlug(product.slug);
    setSku(product.sku);
    setBrand(product.brand || "AlphaTheta");
    setCategoryId(product.category_id || (categories.length > 0 ? categories[0].id : ""));
    setSaleEnabled(product.sale_enabled ?? true);
    setSalePrice(product.sale_price ? String(product.sale_price) : "");
    setRentalEnabled(product.rental_enabled ?? true);
    setRentalPrice(product.rental_price ? String(product.rental_price) : "");
    setStockQuantity(String(product.stock_quantity ?? 5));
    setDescription(product.description || "");
    setMetaTitle(product.meta_title || "");
    setMetaDescription(product.meta_description || "");
    setMetaKeywords(product.meta_keywords || "");

    const currentImg = product.images?.[0]?.image_url || product.image_url || "";
    setImageUrl(currentImg);
    setImagePreviewUrl(currentImg || null);
    setSelectedImageFile(null);
    setActionErrorMsg("");
    setActionSuccessMsg("");
    setShowEditProductModal(true);
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setIsSubmitting(true);
    setActionSuccessMsg("");
    setActionErrorMsg("");

    try {
      let finalImageUrl = imageUrl.trim();

      // If a new local file was selected, upload it first
      if (selectedImageFile) {
        const formData = new FormData();
        formData.append("file", selectedImageFile);

        const uploadRes = await fetch(`${apiUrl}/upload/image`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          finalImageUrl = uploadData.url;
        } else {
          const uploadErr = await uploadRes.json().catch(() => ({ detail: "Lỗi tải ảnh" }));
          setActionErrorMsg(uploadErr.detail || "Không thể tải ảnh lên máy chủ.");
          setIsSubmitting(false);
          return;
        }
      }

      const payload: Record<string, unknown> = {
        name: name.trim(),
        slug: slug.trim(),
        sku: sku.trim(),
        brand: brand.trim(),
        category_id: categoryId || undefined,
        sale_enabled: saleEnabled,
        sale_price: saleEnabled && salePrice ? Number(salePrice) : null,
        rental_enabled: rentalEnabled,
        rental_price: rentalEnabled && rentalPrice ? Number(rentalPrice) : null,
        stock_quantity: Number(stockQuantity) || 0,
        description: description.trim() || undefined,
        meta_title: metaTitle.trim() || undefined,
        meta_description: metaDescription.trim() || undefined,
        meta_keywords: metaKeywords.trim() || undefined,
      };

      const res = await fetch(`${apiUrl}/products/${editingProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        // Also attach image via product images endpoint if provided
        if (finalImageUrl) {
          try {
            await fetch(`${apiUrl}/products/${editingProduct.id}/images`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                image_url: finalImageUrl,
                alt_text: name.trim(),
                is_primary: true,
                sort_order: 0,
              }),
            });
          } catch {
            // Non-blocking
          }
        }

        setActionSuccessMsg(`✓ Đã cập nhật sản phẩm "${name}" thành công!`);
        handleCloseEditModal();
        loadAllData();
      } else {
        const err = await res.json().catch(() => ({ detail: "Lỗi cập nhật sản phẩm" }));
        setActionErrorMsg(err.detail || "Không thể cập nhật sản phẩm. Vui lòng kiểm tra lại thông tin.");
      }
    } catch (err) {
      console.error("Error updating product:", err);
      setActionErrorMsg("Lỗi kết nối máy chủ khi cập nhật sản phẩm.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = (id: string, prodName: string, prodSku?: string) => {
    setDeleteConfirmModal({ id, name: prodName, sku: prodSku });
  };

  const handleConfirmDeleteProduct = async () => {
    if (!deleteConfirmModal) return;
    const { id, name: prodName } = deleteConfirmModal;
    setIsDeleting(true);
    setActionErrorMsg("");
    setActionSuccessMsg("");

    try {
      const res = await fetch(`${apiUrl}/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok || res.status === 204) {
        // Optimistically remove from state immediately
        setProducts((prev) => prev.filter((p) => p.id !== id));
        setActionSuccessMsg(`✓ Đã xóa thành công sản phẩm "${prodName}" khỏi hệ thống!`);
        setDeleteConfirmModal(null);
        // Refresh with cache bust
        void loadAllData();
      } else {
        const err = await res.json().catch(() => ({ detail: "Không thể xóa sản phẩm." }));
        setActionErrorMsg(err.detail || "Không thể xóa sản phẩm này. Có thể sản phẩm đang thuộc các đơn hàng hiện có.");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      setActionErrorMsg("Lỗi kết nối máy chủ khi thực hiện xóa sản phẩm.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus?: string, newPaymentStatus?: string) => {
    try {
      const payload: Record<string, string> = {};
      if (newStatus) payload.status = newStatus;
      if (newPaymentStatus) payload.payment_status = newPaymentStatus;

      const res = await fetch(`${apiUrl}/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setActionErrorMsg("");
        setActionSuccessMsg(`✓ Đã cập nhật trạng thái đơn hàng thành công!`);
        loadAllData();
      } else {
        const err = await res.json().catch(() => ({ detail: "Lỗi cập nhật" }));
        setActionSuccessMsg("");
        let msg = "Không thể cập nhật trạng thái đơn hàng.";
        if (typeof err.detail === "string") {
          msg = err.detail;
        } else if (Array.isArray(err.detail)) {
          msg = err.detail.map((d: { msg?: string }) => d.msg || "Lỗi").join(", ");
        }
        setActionErrorMsg(msg);
      }
    } catch {
      setActionSuccessMsg("");
      setActionErrorMsg("Lỗi kết nối đến máy chủ.");
    }
  };

  const handleUpdateRentalStatus = async (rentalId: string, newStatus?: string, newPaymentStatus?: string) => {
    try {
      const payload: Record<string, string> = {};
      if (newStatus) payload.status = newStatus;
      if (newPaymentStatus) payload.payment_status = newPaymentStatus;

      const res = await fetch(`${apiUrl}/rental-requests/${rentalId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setActionErrorMsg("");
        setActionSuccessMsg(`✓ Đã cập nhật trạng thái hợp đồng thuê thành công!`);
        loadAllData();
      } else {
        const err = await res.json().catch(() => ({ detail: "Lỗi cập nhật" }));
        setActionSuccessMsg("");
        let msg = "Không thể cập nhật trạng thái hợp đồng thuê.";
        if (typeof err.detail === "string") {
          msg = err.detail;
        } else if (Array.isArray(err.detail)) {
          msg = err.detail.map((d: { msg?: string }) => d.msg || "Lỗi").join(", ");
        }
        setActionErrorMsg(msg);
      }
    } catch {
      setActionSuccessMsg("");
      setActionErrorMsg("Lỗi kết nối đến máy chủ.");
    }
  };

  const handleConfirmStatusChange = async () => {
    if (!statusConfirmModal) return;
    const { type, id, newStatus, newPaymentStatus } = statusConfirmModal;
    setStatusConfirmModal(null);

    if (type === "order_status") {
      await handleUpdateOrderStatus(id, newStatus);
    } else if (type === "order_payment") {
      await handleUpdateOrderStatus(id, undefined, newPaymentStatus);
    } else if (type === "rental_status") {
      await handleUpdateRentalStatus(id, newStatus);
    } else if (type === "rental_payment") {
      await handleUpdateRentalStatus(id, undefined, newPaymentStatus);
    }
  };

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#090909", color: "#fff" }}>
        Đang xác thực quyền Admin...
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#090909", color: "#fff", textAlign: "center", padding: "20px" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔒</div>
        <h1 style={{ fontSize: "24px", fontWeight: 800, margin: "0 0 12px 0" }}>Truy cập bị từ chối</h1>
        <p style={{ color: "#a1a1aa", maxWidth: "420px", marginBottom: "24px" }}>
          Tài khoản <strong>{user?.email}</strong> không có quyền Quản trị viên (Admin) để truy cập trang này.
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/profile" style={{ padding: "12px 24px", backgroundColor: "#22c55e", color: "#000", fontWeight: 700, textDecoration: "none", borderRadius: "6px" }}>
            👤 Về Hồ Sơ Cá Nhân (/profile)
          </Link>
          <Link href="/" style={{ padding: "12px 24px", backgroundColor: "#fff", color: "#000", fontWeight: 700, textDecoration: "none", borderRadius: "4px" }}>
            Trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#090909", color: "#f4f4f5", overflow: "hidden" }}>
      {/* Top Admin Navbar */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 28px",
          backgroundColor: "#121212",
          borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
          height: "60px",
          minHeight: "60px",
          maxHeight: "60px",
          zIndex: 100,
          boxSizing: "border-box",
          flexShrink: 0,
        }}
      >
        <Link href="/admin" className="brand" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "12px" }}>
          <span className="brand-mark" style={{ width: "36px", height: "36px", fontSize: "12px" }}>
            VB
          </span>
          <span className="brand-text" style={{ fontSize: "17px" }}>
            VANBASS
            <small style={{ color: "#22c55e", letterSpacing: "0.22em" }}>ADMIN PANEL</small>
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link href="/" target="_blank" style={{ fontSize: "13px", color: "#a1a1aa", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
            🌐 Xem Website Cửa hàng ↗
          </Link>
          <span style={{ fontSize: "13px", color: "#71717a" }}>|</span>
          <span style={{ fontSize: "13px", color: "#22c55e", fontWeight: 600 }}>
            ● {user.email} (Admin)
          </span>
          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            style={{
              padding: "6px 14px",
              backgroundColor: "rgba(239, 68, 68, 0.12)",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              color: "#fca5a5",
              fontSize: "12.5px",
              fontWeight: 700,
              borderRadius: "6px",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              transition: "all 0.18s ease",
            }}
            title="Đăng xuất khỏi tài khoản Quản trị"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Đăng xuất
          </button>
        </div>
      </header>

      {/* Main Admin Content */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isSidebarCollapsed ? "74px 1fr" : "240px 1fr",
          flex: 1,
          height: "calc(100vh - 60px)",
          minHeight: 0,
          overflow: "hidden",
          transition: "grid-template-columns 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Sidebar */}
        <aside
          style={{
            backgroundColor: "#0f0f11",
            borderRight: "1px solid rgba(255,255,255,0.08)",
            padding: isSidebarCollapsed ? "18px 8px" : "18px 14px",
            height: "100%",
            transition: "padding 0.25s ease",
            boxSizing: "border-box",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Arrow Toggle Button floating on right border */}
          <button
            type="button"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              right: "-13px",
              width: "26px",
              height: "26px",
              borderRadius: "50%",
              backgroundColor: "#18181b",
              border: "1px solid #22c55e",
              color: "#4ade80",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 90,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.7), 0 0 10px rgba(34, 197, 94, 0.3)",
              fontSize: "12px",
              fontWeight: 900,
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            title={isSidebarCollapsed ? "Mở rộng thanh Menu" : "Thu gọn thanh Menu"}
          >
            {isSidebarCollapsed ? "▶" : "◀"}
          </button>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", height: "100%", overflowY: "auto" }}>
            {[
              { id: "overview", icon: "📊", label: "Tổng quan thống kê", count: null },
              { id: "home_cms", icon: "🎨", label: "Home Page CMS", count: null },
              { id: "products", icon: "📦", label: "Quản lý Sản phẩm", count: products.length },
              { id: "orders", icon: "🛒", label: "Quản lý Đơn hàng", count: orders.length },
              { id: "rentals", icon: "📅", label: "Yêu cầu Thuê máy", count: rentals.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`admin-sidebar-btn ${activeTab === tab.id ? "active" : ""}`}
                style={{
                  justifyContent: isSidebarCollapsed ? "center" : "space-between",
                  padding: isSidebarCollapsed ? "12px 6px" : "12px 16px",
                }}
                title={tab.label}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: isSidebarCollapsed ? "center" : "flex-start" }}>
                  <span style={{ fontSize: "16px" }}>{tab.icon}</span>
                  {!isSidebarCollapsed && <span>{tab.label}</span>}
                </div>
                {!isSidebarCollapsed && tab.count !== null && (
                  <span className="admin-badge-count">{tab.count}</span>
                )}
                {isSidebarCollapsed && tab.count !== null && (
                  <span className="admin-badge-count" style={{ fontSize: "10px", padding: "1px 4px", minWidth: "16px", textAlign: "center" }}>{tab.count}</span>
                )}
              </button>
            ))}
          </div>
        </aside>

        {/* Content Area */}
        <main
          style={{
            padding: activeTab === "home_cms" ? "10px 14px" : "28px 36px",
            backgroundColor: "#090909",
            minWidth: 0,
            height: "100%",
            minHeight: 0,
            overflowY: activeTab === "home_cms" ? "hidden" : "auto",
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
            position: "relative",
          }}
        >
          {/* Notifications */}
          {actionSuccessMsg && (
            <div
              style={{
                position: activeTab === "home_cms" ? "fixed" : "static",
                bottom: activeTab === "home_cms" ? "24px" : undefined,
                left: activeTab === "home_cms" ? "24px" : undefined,
                zIndex: 9999,
                padding: "12px 18px",
                backgroundColor: "rgba(18, 18, 20, 0.95)",
                border: "1px solid #22c55e",
                color: "#4ade80",
                fontSize: "13px",
                fontWeight: 600,
                borderRadius: "8px",
                marginBottom: activeTab === "home_cms" ? "0" : "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
                animation: "fadeIn 0.25s ease",
              }}
            >
              <span>{actionSuccessMsg}</span>
              <button
                onClick={() => setActionSuccessMsg("")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#4ade80",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: 700,
                  padding: "0 4px",
                  lineHeight: 1,
                }}
                title="Đóng thông báo"
              >
                ×
              </button>
            </div>
          )}
          {actionErrorMsg && (
            <div
              style={{
                position: activeTab === "home_cms" ? "fixed" : "static",
                bottom: activeTab === "home_cms" ? "24px" : undefined,
                left: activeTab === "home_cms" ? "24px" : undefined,
                zIndex: 9999,
                padding: "12px 18px",
                backgroundColor: "rgba(18, 18, 20, 0.95)",
                border: "1px solid #ef4444",
                color: "#fca5a5",
                fontSize: "13px",
                fontWeight: 600,
                borderRadius: "8px",
                marginBottom: activeTab === "home_cms" ? "0" : "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
                animation: "fadeIn 0.25s ease",
              }}
            >
              <span>{actionErrorMsg}</span>
              <button
                onClick={() => setActionErrorMsg("")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#fca5a5",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: 700,
                  padding: "0 4px",
                  lineHeight: 1,
                }}
                title="Đóng thông báo"
              >
                ×
              </button>
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div>
              <h2 style={{ fontSize: "24px", fontWeight: 800, margin: "0 0 24px 0", color: "#fff" }}>
                Bảng Thống kê Hoạt động
              </h2>

              <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "40px" }}>
                <div className="admin-stat-card">
                  <div className="admin-stat-icon" style={{ backgroundColor: "rgba(34, 197, 94, 0.15)", color: "#22c55e" }}>
                    📦
                  </div>
                  <div>
                    <p style={{ margin: "0 0 4px 0", color: "#a1a1aa", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>TỔNG SẢN PHẨM</p>
                    <strong style={{ fontSize: "32px", fontWeight: 900, color: "#ffffff" }}>{products.length}</strong>
                    <p style={{ margin: "6px 0 0 0", color: "#71717a", fontSize: "12px" }}>Trong kho hàng VanBass</p>
                  </div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-icon" style={{ backgroundColor: "rgba(59, 130, 246, 0.15)", color: "#60a5fa" }}>
                    🛒
                  </div>
                  <div>
                    <p style={{ margin: "0 0 4px 0", color: "#a1a1aa", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>ĐƠN MUA HÀNG</p>
                    <strong style={{ fontSize: "32px", fontWeight: 900, color: "#ffffff" }}>{orders.length}</strong>
                    <p style={{ margin: "6px 0 0 0", color: "#71717a", fontSize: "12px" }}>Đơn đặt hàng bán mới</p>
                  </div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-icon" style={{ backgroundColor: "rgba(234, 179, 8, 0.15)", color: "#eab308" }}>
                    🎧
                  </div>
                  <div>
                    <p style={{ margin: "0 0 4px 0", color: "#a1a1aa", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>YÊU CẦU THUÊ MÁY</p>
                    <strong style={{ fontSize: "32px", fontWeight: 900, color: "#ffffff" }}>{rentals.length}</strong>
                    <p style={{ margin: "6px 0 0 0", color: "#71717a", fontSize: "12px" }}>Hợp đồng thuê thiết bị</p>
                  </div>
                </div>

                <div className="admin-stat-card">
                  <div className="admin-stat-icon" style={{ backgroundColor: "rgba(168, 85, 247, 0.15)", color: "#c084fc" }}>
                    🏷️
                  </div>
                  <div>
                    <p style={{ margin: "0 0 4px 0", color: "#a1a1aa", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>DANH MỤC SẢN PHẨM</p>
                    <strong style={{ fontSize: "32px", fontWeight: 900, color: "#ffffff" }}>{categories.length}</strong>
                    <p style={{ margin: "6px 0 0 0", color: "#71717a", fontSize: "12px" }}>Chuyên mục thiết bị</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: HOME PAGE CMS */}
          {activeTab === "home_cms" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                height: "100%",
                minHeight: 0,
                overflow: "hidden",
                width: "100%",
              }}
            >
              {/* LIVE PREVIEW CANVAS */}
              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                  minHeight: 0,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  backgroundColor: "#000000",
                  border: "1px solid #27272a",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                {/* Integrated Preview Toolbar */}
                <div
                  style={{
                    padding: "8px 14px",
                    backgroundColor: "#121214",
                    borderBottom: "1px solid #27272a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  {/* Left: Status & Devices */}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ display: "flex", gap: "5px" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#ef4444", display: "inline-block" }}></span>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#eab308", display: "inline-block" }}></span>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#22c55e", display: "inline-block" }}></span>
                      </div>
                      <span style={{ fontSize: "12px", fontWeight: 800, color: "#fff", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                        <span>🎨</span> Visual Builder
                        <span style={{ fontSize: "10px", fontWeight: 800, padding: "2px 6px", backgroundColor: "rgba(34, 197, 94, 0.15)", color: "#4ade80", border: "1px solid rgba(34, 197, 94, 0.4)", borderRadius: "4px" }}>
                          0s DELAY
                        </span>
                      </span>
                    </div>

                    <div style={{ height: "16px", width: "1px", backgroundColor: "#27272a" }} />

                    {/* Device Selector */}
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      {[
                        { id: "desktop", label: "💻 100%" },
                        { id: "tablet", label: "📱 Tablet" },
                        { id: "mobile", label: "📱 Mobile" },
                      ].map((d) => (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => setPreviewDevice(d.id as "desktop" | "tablet" | "mobile")}
                          style={{
                            padding: "4px 8px",
                            fontSize: "11.5px",
                            fontWeight: 700,
                            borderRadius: "4px",
                            border: "none",
                            cursor: "pointer",
                            backgroundColor: previewDevice === d.id ? "#22c55e" : "#27272a",
                            color: previewDevice === d.id ? "#000000" : "#d4d4d8",
                          }}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>

                    {/* Reload / Open Tab */}
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewKey((k) => k + 1);
                          setTimeout(() => sendLiveConfigToIframe(), 500);
                        }}
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "#27272a",
                          border: "none",
                          color: "#a1a1aa",
                          borderRadius: "4px",
                          fontSize: "11.5px",
                          cursor: "pointer",
                        }}
                        title="Tải lại khung xem trước"
                      >
                        🔄 Tải lại
                      </button>
                      <Link
                        href="/"
                        target="_blank"
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "rgba(255, 255, 255, 0.06)",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          color: "#a1a1aa",
                          borderRadius: "4px",
                          fontSize: "11.5px",
                          textDecoration: "none",
                        }}
                        title="Mở trang chủ trên tab mới"
                      >
                        ↗ Tab mới
                      </Link>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {JSON.stringify(homeConfig) !== JSON.stringify(savedHomeConfig) && (
                      <span style={{ fontSize: "11px", fontWeight: 700, color: "#facc15", display: "inline-flex", alignItems: "center", gap: "4px", marginRight: "4px" }}>
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#facc15", display: "inline-block" }}></span>
                        Chưa lưu
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={handleResetHomeConfigToDefault}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "rgba(255, 255, 255, 0.06)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        color: "#a1a1aa",
                        fontWeight: 600,
                        fontSize: "11.5px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      title="Khôi phục về mẫu giao diện gốc"
                    >
                      🔄 Mặc định
                    </button>

                    <button
                      type="button"
                      onClick={handleCancelHomeConfig}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "rgba(239, 68, 68, 0.1)",
                        border: "1px solid rgba(239, 68, 68, 0.3)",
                        color: "#fca5a5",
                        fontWeight: 600,
                        fontSize: "11.5px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      title="Hủy các thay đổi chưa lưu và khôi phục bản đã lưu gần nhất"
                    >
                      ↩️ Hủy bỏ
                    </button>

                    <button
                      type="button"
                      onClick={handleSaveHomeConfig}
                      disabled={isHomeConfigSaving}
                      style={{
                        padding: "6px 16px",
                        backgroundColor: "#22c55e",
                        border: "none",
                        color: "#000000",
                        fontWeight: 900,
                        fontSize: "12px",
                        borderRadius: "5px",
                        cursor: isHomeConfigSaving ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        boxShadow: "0 2px 10px rgba(34, 197, 94, 0.3)",
                      }}
                    >
                      {isHomeConfigSaving ? (
                        <>
                          <span style={{ display: "inline-block", width: "10px", height: "10px", border: "2px solid #000", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                          <span>Đang lưu...</span>
                        </>
                      ) : (
                        <>
                          <span>💾</span>
                          <span>Lưu Thay Đổi (Publish)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                    {/* Device Viewport Canvas */}
                    <div
                      style={{
                        flex: 1,
                        overflowY: "auto",
                        backgroundColor: "#050505",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "stretch",
                        padding: previewDevice === "desktop" ? "0" : "16px",
                        position: "relative",
                      }}
                    >
                      <iframe
                        key={previewKey}
                        ref={iframeRef}
                        src="/"
                        title="VanBass Live Homepage Preview"
                        style={{
                          width: previewDevice === "desktop" ? "100%" : previewDevice === "tablet" ? "768px" : "390px",
                          height: "100%",
                          border: previewDevice === "desktop" ? "none" : "1px solid #3f3f46",
                          borderRadius: previewDevice === "desktop" ? "0" : previewDevice === "tablet" ? "12px" : "20px",
                          backgroundColor: "#090909",
                          boxShadow: previewDevice === "desktop" ? "none" : "0 20px 50px rgba(0, 0, 0, 0.8)",
                          transition: "width 0.3s ease",
                        }}
                        onLoad={() => {
                          sendLiveConfigToIframe();
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

        {/* Floating Quick Inspector Modal / Popover */}
        {inlineEditor?.isOpen && (
          <div
            style={{
              position: "fixed",
              bottom: "32px",
              right: "32px",
              width: "380px",
              backgroundColor: "#18181b",
              border: "1.5px solid #22c55e",
              borderRadius: "14px",
              padding: "18px 20px",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.95), 0 0 25px rgba(34, 197, 94, 0.3)",
              zIndex: 99999,
              backdropFilter: "blur(12px)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px", borderBottom: "1px solid rgba(255, 255, 255, 0.1)", paddingBottom: "10px" }}>
              <span style={{ fontSize: "13px", fontWeight: 800, color: "#4ade80", display: "flex", alignItems: "center", gap: "6px" }}>
                <span>✏️</span> {inlineEditor.label}
              </span>
              <button
                type="button"
                onClick={() => setInlineEditor(null)}
                style={{ background: "none", border: "none", color: "#a1a1aa", cursor: "pointer", fontSize: "16px", fontWeight: 700 }}
              >
                ✕
              </button>
            </div>

            {inlineEditor.fieldType === "image" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {/* Live Image Preview Thumbnail */}
                {getNestedVal(homeConfig, inlineEditor.fieldKey) && (
                  <div style={{ width: "100%", height: "120px", borderRadius: "8px", overflow: "hidden", border: "1px solid #27272a", backgroundColor: "#000", position: "relative" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getNestedVal(homeConfig, inlineEditor.fieldKey)}
                      alt="Preview"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                )}
                <label style={{ fontSize: "11.5px", color: "#a1a1aa" }}>Chọn ảnh từ máy tính hoặc dán URL ảnh:</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    type="text"
                    value={getNestedVal(homeConfig, inlineEditor.fieldKey)}
                    onChange={(e) => updateNestedVal(inlineEditor.fieldKey, e.target.value)}
                    style={{ flex: 1, padding: "8px 12px", backgroundColor: "#09090b", border: "1px solid #27272a", color: "#fff", fontSize: "12px", borderRadius: "6px" }}
                    placeholder="Dán URL hình ảnh mới..."
                  />
                  <input
                    type="file"
                    ref={centerHeroFileRef}
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          if (ev.target?.result) {
                            updateNestedVal(inlineEditor.fieldKey, ev.target.result as string);
                            setActionSuccessMsg("✓ Đã tải ảnh lên giao diện thành công!");
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => centerHeroFileRef.current?.click()}
                    style={{ padding: "8px 14px", backgroundColor: "#22c55e", color: "#000", fontWeight: 800, border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px", whiteSpace: "nowrap" }}
                  >
                    📷 Tải ảnh lên
                  </button>
                </div>
              </div>
            ) : inlineEditor.fieldType === "textarea" ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "11.5px", color: "#a1a1aa" }}>Nội dung đoạn văn / Mô tả:</label>
                <textarea
                  rows={3}
                  value={getNestedVal(homeConfig, inlineEditor.fieldKey)}
                  onChange={(e) => updateNestedVal(inlineEditor.fieldKey, e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", backgroundColor: "#09090b", border: "1px solid #27272a", color: "#fff", fontSize: "13px", borderRadius: "6px", resize: "vertical", boxSizing: "border-box" }}
                />
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "11.5px", color: "#a1a1aa" }}>Nội dung văn bản / Tiêu đề:</label>
                <input
                  type="text"
                  value={getNestedVal(homeConfig, inlineEditor.fieldKey)}
                  onChange={(e) => updateNestedVal(inlineEditor.fieldKey, e.target.value)}
                  style={{ width: "100%", padding: "8px 12px", backgroundColor: "#09090b", border: "1px solid #27272a", color: "#4ade80", fontWeight: 700, fontSize: "13.5px", borderRadius: "6px", boxSizing: "border-box" }}
                />
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px", paddingTop: "10px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontSize: "11px", color: "#71717a" }}>✨ Cập nhật live...</span>
              <button
                type="button"
                onClick={() => setInlineEditor(null)}
                style={{ padding: "6px 16px", backgroundColor: "#22c55e", color: "#000", fontWeight: 800, border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px" }}
              >
                Xong (Hoàn tất)
              </button>
            </div>
          </div>
        )}

          {/* TAB 2: PRODUCTS MANAGEMENT */}
          {activeTab === "products" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <div>
                  <h2 style={{ fontSize: "24px", fontWeight: 800, margin: "0 0 6px 0", color: "#fff" }}>
                    Danh Sách Sản Phẩm
                  </h2>
                  <p style={{ fontSize: "14px", color: "#a1a1aa", margin: 0 }}>
                    Thêm máy mới, tải ảnh trực tiếp lên server hoặc chỉnh sửa giá bán & giá thuê
                  </p>
                </div>

                <button
                  onClick={handleOpenAddModal}
                  className="admin-btn-primary"
                >
                  <span>＋</span> Thêm Sản Phẩm Mới
                </button>
              </div>

              {/* Table */}
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#a1a1aa", fontSize: "12px", textTransform: "uppercase" }}>
                      <th style={{ padding: "16px" }}>Tên Thiết Bị / SKU</th>
                      <th style={{ padding: "16px" }}>Thương Hiệu</th>
                      <th style={{ padding: "16px" }}>Giá Bán</th>
                      <th style={{ padding: "16px" }}>Giá Thuê / Ngày</th>
                      <th style={{ padding: "16px" }}>Tồn Kho</th>
                      <th style={{ padding: "16px", textAlign: "right" }}>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <td style={{ padding: "16px" }}>
                          <strong style={{ color: "#fff", display: "block" }}>{p.name}</strong>
                          <span style={{ fontSize: "12px", color: "#71717a" }}>SKU: {p.sku} | /{p.slug}</span>
                        </td>
                        <td style={{ padding: "16px", color: "#d4d4d8" }}>{p.brand || "—"}</td>
                        <td style={{ padding: "16px", color: "#fff", fontWeight: 700 }}>
                          {p.sale_enabled && p.sale_price ? formatCurrency(p.sale_price) : <span style={{ color: "#71717a" }}>Không bán</span>}
                        </td>
                        <td style={{ padding: "16px", color: "#22c55e", fontWeight: 600 }}>
                          {p.rental_enabled && p.rental_price ? formatCurrency(p.rental_price) : <span style={{ color: "#71717a" }}>Không cho thuê</span>}
                        </td>
                        <td style={{ padding: "16px", color: "#fff" }}>{p.stock_quantity} cái</td>
                        <td style={{ padding: "16px", textAlign: "right", whiteSpace: "nowrap" }}>
                          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "flex-end", gap: "8px" }}>
                            <button
                              onClick={() => handleOpenEditModal(p)}
                              style={{
                                height: "32px",
                                padding: "0 14px",
                                backgroundColor: "rgba(34, 197, 94, 0.12)",
                                border: "1px solid rgba(34, 197, 94, 0.45)",
                                color: "#4ade80",
                                fontSize: "12px",
                                fontWeight: 700,
                                borderRadius: "6px",
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "6px",
                                whiteSpace: "nowrap",
                                transition: "all 0.15s ease",
                              }}
                              title="Chỉnh sửa thông tin, giá bán, giá thuê, kho hàng"
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                              </svg>
                              Sửa
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id, p.name, p.sku)}
                              style={{
                                height: "32px",
                                padding: "0 14px",
                                backgroundColor: "rgba(239, 68, 68, 0.1)",
                                border: "1px solid rgba(239, 68, 68, 0.4)",
                                color: "#f87171",
                                fontSize: "12px",
                                fontWeight: 700,
                                borderRadius: "6px",
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "6px",
                                whiteSpace: "nowrap",
                                transition: "all 0.15s ease",
                              }}
                              title="Xóa sản phẩm khỏi hệ thống"
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              </svg>
                              Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS MANAGEMENT */}
          {activeTab === "orders" && (
            <div>
              <h2 style={{ fontSize: "24px", fontWeight: 800, margin: "0 0 24px 0", color: "#fff" }}>
                Danh Sách Đơn Mua Hàng ({orders.length})
              </h2>
              {orders.length === 0 ? (
                <div style={{ padding: "40px", textAlign: "center", backgroundColor: "#121212", color: "#71717a" }}>
                  Chưa có đơn mua hàng nào trong hệ thống.
                </div>
              ) : (
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#a1a1aa", fontSize: "12px", textTransform: "uppercase" }}>
                        <th style={{ padding: "16px" }}>Mã Đơn / Ngày</th>
                        <th style={{ padding: "16px" }}>Khách Hàng & SĐT</th>
                        <th style={{ padding: "16px" }}>Địa Chỉ Giao Hàng</th>
                        <th style={{ padding: "16px" }}>Tổng Tiền</th>
                        <th style={{ padding: "16px" }}>Trạng Thái Đơn</th>
                        <th style={{ padding: "16px" }}>Thanh Toán</th>
                        <th style={{ padding: "16px", textAlign: "center" }}>Chi Tiết</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o) => (
                        <tr key={o.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                          <td style={{ padding: "16px" }}>
                            <strong style={{ color: "#fff" }}>{o.order_number}</strong>
                            <div style={{ fontSize: "12px", color: "#71717a" }}>{new Date(o.created_at).toLocaleString("vi-VN")}</div>
                          </td>
                          <td style={{ padding: "16px", color: "#fff" }}>
                            <div>{o.shipping_name}</div>
                            <div style={{ fontSize: "12px", color: "#a1a1aa" }}>{o.shipping_phone}</div>
                          </td>
                          <td style={{ padding: "16px", color: "#d4d4d8", maxWidth: "240px" }}>{o.shipping_address}</td>
                          <td style={{ padding: "16px", color: "#fff", fontWeight: 800 }}>{formatCurrency(o.total_amount)}</td>
                          <td style={{ padding: "16px" }}>
                            <select
                              value={o.status}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (val === o.status) return;
                                setStatusConfirmModal({
                                  type: "order_status",
                                  id: o.id,
                                  itemCode: o.order_number,
                                  title: "Xác nhận cập nhật trạng thái Đơn hàng",
                                  currentLabel: ORDER_STATUS_LABELS[o.status] || o.status,
                                  newLabel: ORDER_STATUS_LABELS[val] || val,
                                  newStatus: val,
                                });
                              }}
                              style={{
                                padding: "6px 10px",
                                backgroundColor: "#1e1e24",
                                color: "#fff",
                                border: "1px solid #3f3f46",
                                fontSize: "12px",
                                fontWeight: 700,
                                cursor: "pointer",
                              }}
                            >
                              <option value="pending">⏳ Chờ xử lý</option>
                              <option value="confirmed">✓ Đã xác nhận</option>
                              <option value="processing">📦 Đang chuẩn bị</option>
                              <option value="shipped">🚚 Đang giao hàng</option>
                              <option value="completed">🎉 Hoàn thành</option>
                              <option value="cancelled">✕ Đã hủy</option>
                            </select>
                          </td>
                          <td style={{ padding: "16px" }}>
                            <select
                              value={o.payment_status || "unpaid"}
                              onChange={(e) => {
                                const val = e.target.value;
                                const current = o.payment_status || "unpaid";
                                if (val === current) return;
                                setStatusConfirmModal({
                                  type: "order_payment",
                                  id: o.id,
                                  itemCode: o.order_number,
                                  title: "Xác nhận cập nhật thanh toán Đơn hàng",
                                  currentLabel: ORDER_PAYMENT_STATUS_LABELS[current] || current,
                                  newLabel: ORDER_PAYMENT_STATUS_LABELS[val] || val,
                                  newPaymentStatus: val,
                                });
                              }}
                              style={{
                                padding: "6px 10px",
                                backgroundColor: o.payment_status === "paid" ? "rgba(34,197,94,0.2)" : "#1e1e24",
                                color: o.payment_status === "paid" ? "#4ade80" : "#facc15",
                                border: "1px solid #3f3f46",
                                fontSize: "12px",
                                fontWeight: 700,
                                cursor: "pointer",
                              }}
                            >
                              <option value="unpaid">Chưa thanh toán</option>
                              <option value="paid">Đã thanh toán</option>
                              <option value="refunded">Đã hoàn tiền</option>
                            </select>
                          </td>
                          <td style={{ padding: "16px", textAlign: "center" }}>
                            <button
                              type="button"
                              onClick={() => setSelectedOrderDetail(o)}
                              style={{
                                padding: "6px 12px",
                                backgroundColor: "rgba(59, 130, 246, 0.15)",
                                border: "1px solid #3b82f6",
                                color: "#60a5fa",
                                fontSize: "12px",
                                fontWeight: 700,
                                cursor: "pointer",
                                borderRadius: "2px",
                                transition: "all 150ms ease",
                              }}
                            >
                              👁 Xem
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: RENTAL REQUESTS MANAGEMENT */}
          {activeTab === "rentals" && (
            <div>
              <h2 style={{ fontSize: "24px", fontWeight: 800, margin: "0 0 24px 0", color: "#fff" }}>
                Danh Sách Yêu Cầu Thuê Thiết Bị ({rentals.length})
              </h2>
              {rentals.length === 0 ? (
                <div style={{ padding: "40px", textAlign: "center", backgroundColor: "#121212", color: "#71717a" }}>
                  Chưa có yêu cầu thuê thiết bị nào trong hệ thống.
                </div>
              ) : (
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#a1a1aa", fontSize: "12px", textTransform: "uppercase" }}>
                        <th style={{ padding: "16px" }}>Mã Thuê / Ngày</th>
                        <th style={{ padding: "16px" }}>Thời Gian Thuê</th>
                        <th style={{ padding: "16px" }}>Tiền Thuê</th>
                        <th style={{ padding: "16px" }}>Tiền Cọc</th>
                        <th style={{ padding: "16px" }}>Trạng Thái Thuê</th>
                        <th style={{ padding: "16px" }}>Tiền Cọc / TT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rentals.map((r) => (
                        <tr key={r.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                          <td style={{ padding: "16px" }}>
                            <strong style={{ color: "#fff" }}>{r.request_number}</strong>
                          </td>
                          <td style={{ padding: "16px", color: "#fff" }}>
                            {r.start_date} → {r.end_date}
                          </td>
                          <td style={{ padding: "16px", color: "#22c55e", fontWeight: 700 }}>{formatCurrency(r.rental_total)}</td>
                          <td style={{ padding: "16px", color: "#eab308", fontWeight: 700 }}>{formatCurrency(r.deposit_amount)}</td>
                          <td style={{ padding: "16px" }}>
                            <select
                              value={r.status}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (val === r.status) return;
                                setStatusConfirmModal({
                                  type: "rental_status",
                                  id: r.id,
                                  itemCode: r.request_number,
                                  title: "Xác nhận cập nhật trạng thái Hợp đồng thuê",
                                  currentLabel: RENTAL_STATUS_LABELS[r.status] || r.status,
                                  newLabel: RENTAL_STATUS_LABELS[val] || val,
                                  newStatus: val,
                                });
                              }}
                              style={{
                                padding: "6px 10px",
                                backgroundColor: "#1e1e24",
                                color: "#fff",
                                border: "1px solid #3f3f46",
                                fontSize: "12px",
                                fontWeight: 700,
                                cursor: "pointer",
                              }}
                            >
                              <option value="pending">⏳ Chờ liên hệ</option>
                              <option value="contacted">📞 Đã liên hệ</option>
                              <option value="confirmed">✓ Đã xác nhận</option>
                              <option value="completed">🎉 Đã trả máy</option>
                              <option value="cancelled">✕ Đã hủy</option>
                            </select>
                          </td>
                          <td style={{ padding: "16px" }}>
                            <select
                              value={r.payment_status || "unpaid"}
                              onChange={(e) => {
                                const val = e.target.value;
                                const current = r.payment_status || "unpaid";
                                if (val === current) return;
                                setStatusConfirmModal({
                                  type: "rental_payment",
                                  id: r.id,
                                  itemCode: r.request_number,
                                  title: "Xác nhận cập nhật cọc / thanh toán Thuê máy",
                                  currentLabel: RENTAL_PAYMENT_STATUS_LABELS[current] || current,
                                  newLabel: RENTAL_PAYMENT_STATUS_LABELS[val] || val,
                                  newPaymentStatus: val,
                                });
                              }}
                              style={{
                                padding: "6px 10px",
                                backgroundColor: r.payment_status === "paid" ? "rgba(34,197,94,0.2)" : "#1e1e24",
                                color: r.payment_status === "paid" ? "#4ade80" : "#facc15",
                                border: "1px solid #3f3f46",
                                fontSize: "12px",
                                fontWeight: 700,
                                cursor: "pointer",
                              }}
                            >
                              <option value="unpaid">Chưa cọc</option>
                              <option value="partially_paid">Đã cọc 1 phần</option>
                              <option value="paid">Đã cọc đủ</option>
                              <option value="refunded">Đã hoàn cọc</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* MODAL: ADD NEW PRODUCT */}
      {showAddProductModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(4px)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={handleCloseAddModal}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "760px",
              maxHeight: "90vh",
              overflowY: "auto",
              backgroundColor: "#121212",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "32px",
              boxShadow: "0 30px 80px rgba(0,0,0,0.8)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h3 style={{ fontSize: "20px", fontWeight: 800, margin: 0, color: "#fff" }}>
                Thêm Thiết Bị Mới Vào Cơ Sở Dữ Liệu
              </h3>
              <button onClick={handleCloseAddModal} style={{ background: "none", border: "none", color: "#a1a1aa", fontSize: "20px", cursor: "pointer" }}>
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct}>
              {/* Row 1: Name & Brand */}
              <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "6px", textTransform: "uppercase" }}>
                    Tên thiết bị *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="VD: Bàn DJ AlphaTheta XDJ-AZ"
                    style={{ width: "100%", padding: "10px 14px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "14px", boxSizing: "border-box" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "6px", textTransform: "uppercase" }}>
                    Hãng sản xuất *
                  </label>
                  <input
                    type="text"
                    required
                    value={brand}
                    onChange={(e) => handleBrandChange(e.target.value)}
                    placeholder="AlphaTheta, Pioneer DJ, JBL..."
                    style={{ width: "100%", padding: "10px 14px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "14px", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              {/* Row 2: Slug, SKU & Category */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "6px", textTransform: "uppercase" }}>
                    Đường dẫn (Slug SEO) *
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="alphatheta-xdj-az"
                    style={{ width: "100%", padding: "10px 14px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "14px", boxSizing: "border-box" }}
                  />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase" }}>
                      Mã SKU
                    </label>
                    <button
                      type="button"
                      onClick={handleRegenerateSku}
                      title="Tạo mã SKU ngẫu nhiên khác"
                      style={{
                        background: "none",
                        border: "none",
                        color: "#60a5fa",
                        fontSize: "11px",
                        cursor: "pointer",
                        padding: "0 4px",
                        fontWeight: 600,
                      }}
                    >
                      🔄 Đổi mã
                    </button>
                  </div>
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="Tự động sinh khi nhập tên..."
                    style={{ width: "100%", padding: "10px 14px", backgroundColor: "#000", border: "1px solid #27272a", color: "#22c55e", fontWeight: 700, fontSize: "14px", boxSizing: "border-box" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "6px", textTransform: "uppercase" }}>
                    Danh mục *
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    style={{ width: "100%", padding: "10px 14px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "14px", boxSizing: "border-box" }}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Pricing & Stock */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px", padding: "16px", backgroundColor: "#0a0a0c", border: "1px solid #27272a" }}>
                <div>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>
                    <input type="checkbox" checked={saleEnabled} onChange={(e) => setSaleEnabled(e.target.checked)} />
                    BẬT BÁN (VNĐ)
                  </label>
                  <input
                    type="number"
                    disabled={!saleEnabled}
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    placeholder="35000000"
                    style={{ width: "100%", padding: "8px 12px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "14px", boxSizing: "border-box" }}
                  />
                </div>

                <div>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>
                    <input type="checkbox" checked={rentalEnabled} onChange={(e) => setRentalEnabled(e.target.checked)} />
                    BẬT CHO THUÊ (VNĐ/NGÀY)
                  </label>
                  <input
                    type="number"
                    disabled={!rentalEnabled}
                    value={rentalPrice}
                    onChange={(e) => setRentalPrice(e.target.value)}
                    placeholder="1200000"
                    style={{ width: "100%", padding: "8px 12px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "14px", boxSizing: "border-box" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "6px" }}>
                    SỐ LƯỢNG KHO (CÁI)
                  </label>
                  <input
                    type="number"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    style={{ width: "100%", padding: "8px 12px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "14px", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              {/* Row 4: Image Input & Upload */}
              <div style={{ marginBottom: "16px", padding: "16px", backgroundColor: "#0a0a0c", border: "1px solid #27272a" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#fff", marginBottom: "8px", textTransform: "uppercase" }}>
                  📸 Hình ảnh thiết bị (Dán link URL hoặc Tải từ máy tính)
                </label>

                {/* Option A: Direct Image URL */}
                <div style={{ marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#a1a1aa", display: "block", marginBottom: "4px" }}>
                    Cách 1: Dán đường link ảnh trực tiếp (Image URL):
                  </span>
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
                    placeholder="VD: https://cdn.hstatic.net/products/200000465225/gmusic-alphatheta-xdj-an.png"
                    style={{ width: "100%", padding: "8px 12px", backgroundColor: "#000", border: "1px solid #3f3f46", color: "#fff", fontSize: "13px", boxSizing: "border-box" }}
                  />
                </div>

                {/* Option B: File Upload */}
                <div>
                  <span style={{ fontSize: "12px", color: "#a1a1aa", display: "block", marginBottom: "4px" }}>
                    Cách 2: Hoặc tải file ảnh thật từ máy tính:
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/avif"
                      onChange={(e) => {
                        handleImageFileChange(e);
                        setImageUrl("");
                      }}
                      style={{ fontSize: "13px", color: "#a1a1aa" }}
                    />
                    {imagePreviewUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={imagePreviewUrl} alt="Preview" style={{ width: "52px", height: "52px", objectFit: "contain", backgroundColor: "#1c1c20", border: "1px solid #fff", padding: "2px" }} />
                    )}
                  </div>
                </div>
              </div>

              {/* Row 5: Description */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "6px", textTransform: "uppercase" }}>
                  Mô tả sản phẩm
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mô tả các tính năng chính của thiết bị..."
                  style={{ width: "100%", padding: "10px 14px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "14px", boxSizing: "border-box" }}
                />
              </div>

              {/* Row 6: SEO Metadata */}
              <div style={{ padding: "14px", backgroundColor: "#0f0f11", border: "1px dashed rgba(255,255,255,0.15)", marginBottom: "24px" }}>
                <p style={{ margin: "0 0 10px 0", fontSize: "12px", fontWeight: 700, color: "#22c55e", textTransform: "uppercase" }}>
                  🎯 Cấu hình SEO Google (Tùy chọn)
                </p>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="Tiêu đề SEO (VD: [CHÍNH HÃNG] Mua Bàn DJ AlphaTheta XDJ-AZ Đà Nẵng)"
                  style={{ width: "100%", padding: "8px 12px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "13px", marginBottom: "8px", boxSizing: "border-box" }}
                />
                <input
                  type="text"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Mô tả SEO 160 ký tự cho Google..."
                  style={{ width: "100%", padding: "8px 12px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "13px", boxSizing: "border-box" }}
                />
              </div>

              {/* Submit Buttons */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                <button
                  type="button"
                  onClick={handleCloseAddModal}
                  className="admin-btn-secondary"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="admin-btn-primary"
                  style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }}
                >
                  {isSubmitting ? "Đang lưu sản phẩm..." : "Lưu Sản Phẩm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT PRODUCT */}
      {showEditProductModal && editingProduct && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(6px)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
          onClick={handleCloseEditModal}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "760px",
              maxHeight: "90vh",
              overflowY: "auto",
              backgroundColor: "#121212",
              border: "1px solid rgba(34, 197, 94, 0.4)",
              padding: "32px",
              boxShadow: "0 30px 80px rgba(0,0,0,0.9), 0 0 30px rgba(34, 197, 94, 0.15)",
              borderRadius: "8px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <div>
                <h3 style={{ fontSize: "20px", fontWeight: 800, margin: "0 0 4px 0", color: "#fff" }}>
                  ✏️ Chỉnh Sửa & Cập Nhật Sản Phẩm
                </h3>
                <span style={{ fontSize: "12px", color: "#22c55e", fontWeight: 700 }}>
                  ID: {editingProduct.id} | SKU: {editingProduct.sku}
                </span>
              </div>
              <button
                onClick={() => {
                  setShowEditProductModal(false);
                  setEditingProduct(null);
                }}
                style={{ background: "none", border: "none", color: "#a1a1aa", fontSize: "20px", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateProduct}>
              {/* Row 1: Name & Brand */}
              <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "6px", textTransform: "uppercase" }}>
                    Tên thiết bị *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="VD: Bàn DJ AlphaTheta XDJ-AZ"
                    style={{ width: "100%", padding: "10px 14px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "14px", boxSizing: "border-box" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "6px", textTransform: "uppercase" }}>
                    Hãng sản xuất *
                  </label>
                  <input
                    type="text"
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="AlphaTheta, Pioneer DJ, JBL..."
                    style={{ width: "100%", padding: "10px 14px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "14px", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              {/* Row 2: Slug, SKU & Category */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "6px", textTransform: "uppercase" }}>
                    Đường dẫn (Slug SEO) *
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="alphatheta-xdj-az"
                    style={{ width: "100%", padding: "10px 14px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "14px", boxSizing: "border-box" }}
                  />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <label style={{ fontSize: "12px", fontWeight: 700, color: "#a1a1aa", textTransform: "uppercase" }}>
                      Mã SKU
                    </label>
                    <button
                      type="button"
                      onClick={handleRegenerateSku}
                      title="Tạo lại mã SKU mới"
                      style={{
                        background: "none",
                        border: "none",
                        color: "#60a5fa",
                        fontSize: "11px",
                        cursor: "pointer",
                        padding: "0 4px",
                        fontWeight: 600,
                      }}
                    >
                      🔄 Tạo mã mới
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="XDJ-AZ-AT"
                    style={{ width: "100%", padding: "10px 14px", backgroundColor: "#000", border: "1px solid #27272a", color: "#22c55e", fontWeight: 700, fontSize: "14px", boxSizing: "border-box" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "6px", textTransform: "uppercase" }}>
                    Danh mục *
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    style={{ width: "100%", padding: "10px 14px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "14px", boxSizing: "border-box" }}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Pricing & Stock */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "16px", padding: "16px", backgroundColor: "#0a0a0c", border: "1px solid #27272a" }}>
                <div>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>
                    <input type="checkbox" checked={saleEnabled} onChange={(e) => setSaleEnabled(e.target.checked)} />
                    BẬT BÁN (VNĐ)
                  </label>
                  <input
                    type="number"
                    disabled={!saleEnabled}
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    placeholder="35000000"
                    style={{ width: "100%", padding: "8px 12px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "14px", boxSizing: "border-box" }}
                  />
                </div>

                <div>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>
                    <input type="checkbox" checked={rentalEnabled} onChange={(e) => setRentalEnabled(e.target.checked)} />
                    BẬT CHO THUÊ (VNĐ/NGÀY)
                  </label>
                  <input
                    type="number"
                    disabled={!rentalEnabled}
                    value={rentalPrice}
                    onChange={(e) => setRentalPrice(e.target.value)}
                    placeholder="1200000"
                    style={{ width: "100%", padding: "8px 12px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "14px", boxSizing: "border-box" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "6px" }}>
                    SỐ LƯỢNG KHO (CÁI)
                  </label>
                  <input
                    type="number"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    style={{ width: "100%", padding: "8px 12px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "14px", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              {/* Row 4: Image Input & Upload */}
              <div style={{ marginBottom: "16px", padding: "16px", backgroundColor: "#0a0a0c", border: "1px solid #27272a" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#fff", marginBottom: "8px", textTransform: "uppercase" }}>
                  📸 Hình ảnh thiết bị (Dán link URL hoặc Tải file ảnh mới)
                </label>

                {/* Option A: Direct Image URL */}
                <div style={{ marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#a1a1aa", display: "block", marginBottom: "4px" }}>
                    Link ảnh trực tiếp (Image URL):
                  </span>
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
                    placeholder="VD: https://cdn.hstatic.net/products/200000465225/gmusic-alphatheta-xdj-an.png"
                    style={{ width: "100%", padding: "8px 12px", backgroundColor: "#000", border: "1px solid #3f3f46", color: "#fff", fontSize: "13px", boxSizing: "border-box" }}
                  />
                </div>

                {/* Option B: File Upload */}
                <div>
                  <span style={{ fontSize: "12px", color: "#a1a1aa", display: "block", marginBottom: "4px" }}>
                    Hoặc tải file ảnh mới từ máy tính:
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/avif"
                      onChange={(e) => {
                        handleImageFileChange(e);
                        setImageUrl("");
                      }}
                      style={{ fontSize: "13px", color: "#a1a1aa" }}
                    />
                    {imagePreviewUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={imagePreviewUrl} alt="Preview" style={{ width: "52px", height: "52px", objectFit: "contain", backgroundColor: "#1c1c20", border: "1px solid #22c55e", padding: "2px", borderRadius: "4px" }} />
                    )}
                  </div>
                </div>
              </div>

              {/* Row 5: Description */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "6px", textTransform: "uppercase" }}>
                  Mô tả sản phẩm
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mô tả các tính năng chính của thiết bị..."
                  style={{ width: "100%", padding: "10px 14px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "14px", boxSizing: "border-box" }}
                />
              </div>

              {/* Row 6: SEO Metadata */}
              <div style={{ padding: "14px", backgroundColor: "#0f0f11", border: "1px dashed rgba(255,255,255,0.15)", marginBottom: "24px" }}>
                <p style={{ margin: "0 0 10px 0", fontSize: "12px", fontWeight: 700, color: "#22c55e", textTransform: "uppercase" }}>
                  🎯 Cấu hình SEO Google (Tùy chọn)
                </p>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="Tiêu đề SEO (VD: [CHÍNH HÃNG] Mua Bàn DJ AlphaTheta XDJ-AZ Đà Nẵng)"
                  style={{ width: "100%", padding: "8px 12px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "13px", marginBottom: "8px", boxSizing: "border-box" }}
                />
                <input
                  type="text"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Mô tả SEO 160 ký tự cho Google..."
                  style={{ width: "100%", padding: "8px 12px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "13px", boxSizing: "border-box" }}
                />
              </div>

              {/* Submit Buttons */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditProductModal(false);
                    setEditingProduct(null);
                  }}
                  className="admin-btn-secondary"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="admin-btn-success"
                  style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }}
                >
                  {isSubmitting ? "Đang lưu thay đổi..." : "Lưu Cập Nhật"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CONFIRM STATUS UPDATE */}
      {statusConfirmModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.82)",
            backdropFilter: "blur(6px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            animation: "fadeIn 0.2s ease-out",
          }}
          onClick={() => setStatusConfirmModal(null)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "460px",
              backgroundColor: "#161819",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "8px",
              padding: "28px 24px",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
              boxSizing: "border-box",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Title */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(234, 179, 8, 0.15)",
                  border: "1px solid rgba(234, 179, 8, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                  flexShrink: 0,
                }}
              >
                ⚠️
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "17px", fontWeight: 800, color: "#ffffff" }}>
                  {statusConfirmModal.title}
                </h3>
                <p style={{ margin: "2px 0 0 0", fontSize: "13px", color: "#a1a1aa" }}>
                  Mã tham chiếu: <strong style={{ color: "#fff" }}>{statusConfirmModal.itemCode}</strong>
                </p>
              </div>
            </div>

            {/* Change details box */}
            <div
              style={{
                backgroundColor: "#0d0e0f",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "6px",
                padding: "16px",
                marginBottom: "20px",
              }}
            >
              <div style={{ fontSize: "11px", color: "#a1a1aa", textTransform: "uppercase", fontWeight: 700, marginBottom: "8px", letterSpacing: "0.06em" }}>
                Thay đổi trạng thái:
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", fontSize: "13px" }}>
                <span
                  style={{
                    padding: "4px 10px",
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    borderRadius: "4px",
                    color: "#d4d4d8",
                    fontWeight: 600,
                  }}
                >
                  {statusConfirmModal.currentLabel}
                </span>
                <span style={{ color: "#22c55e", fontWeight: 800, fontSize: "16px" }}>➔</span>
                <span
                  style={{
                    padding: "4px 10px",
                    backgroundColor: "rgba(34, 197, 94, 0.18)",
                    border: "1px solid rgba(34, 197, 94, 0.4)",
                    borderRadius: "4px",
                    color: "#4ade80",
                    fontWeight: 800,
                  }}
                >
                  {statusConfirmModal.newLabel}
                </span>
              </div>
            </div>

            <p style={{ margin: "0 0 24px 0", fontSize: "13.5px", color: "#cbd5e1", lineHeight: 1.5 }}>
              Bạn có chắc chắn muốn xác nhận cập nhật trạng thái mới cho mục này không?
            </p>

            {/* Actions */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <button
                type="button"
                onClick={() => setStatusConfirmModal(null)}
                className="admin-btn-secondary"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleConfirmStatusChange}
                className="admin-btn-success"
              >
                Xác nhận cập nhật
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: DELETE PRODUCT CONFIRMATION */}
      {deleteConfirmModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(8px)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            animation: "fadeIn 0.2s ease-out",
          }}
          onClick={() => !isDeleting && setDeleteConfirmModal(null)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "480px",
              backgroundColor: "#141416",
              border: "1px solid rgba(239, 68, 68, 0.35)",
              borderRadius: "8px",
              padding: "28px",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(239, 68, 68, 0.15)",
              boxSizing: "border-box",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(239, 68, 68, 0.15)",
                  border: "1px solid rgba(239, 68, 68, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  flexShrink: 0,
                }}
              >
                🗑️
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 800, color: "#ffffff" }}>
                  Xác nhận xóa sản phẩm
                </h3>
                <p style={{ margin: "2px 0 0 0", fontSize: "13px", color: "#f87171" }}>
                  Hành động này không thể hoàn tác
                </p>
              </div>
            </div>

            {/* Product Details Box */}
            <div
              style={{
                backgroundColor: "#0d0e0f",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "6px",
                padding: "16px",
                marginBottom: "20px",
              }}
            >
              <div style={{ fontSize: "11px", color: "#a1a1aa", textTransform: "uppercase", fontWeight: 700, marginBottom: "6px", letterSpacing: "0.06em" }}>
                Sản phẩm sẽ bị gỡ bỏ:
              </div>
              <div style={{ fontSize: "15px", fontWeight: 800, color: "#ffffff", marginBottom: "4px" }}>
                {deleteConfirmModal.name}
              </div>
              {deleteConfirmModal.sku && (
                <div style={{ fontSize: "12px", color: "#71717a" }}>
                  Mã SKU: <span style={{ color: "#d4d4d8" }}>{deleteConfirmModal.sku}</span>
                </div>
              )}
            </div>

            <p style={{ margin: "0 0 24px 0", fontSize: "13.5px", color: "#cbd5e1", lineHeight: 1.5 }}>
              Sản phẩm này sẽ được gỡ khỏi danh sách bán hàng và cho thuê trên toàn bộ hệ thống website. Bạn có chắc chắn muốn xóa không?
            </p>

            {/* Actions */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <button
                type="button"
                disabled={isDeleting}
                onClick={() => setDeleteConfirmModal(null)}
                className="admin-btn-secondary"
                style={{ opacity: isDeleting ? 0.6 : 1, cursor: isDeleting ? "not-allowed" : "pointer" }}
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDeleteProduct}
                className="admin-btn-danger"
                style={{ opacity: isDeleting ? 0.7 : 1, cursor: isDeleting ? "not-allowed" : "pointer" }}
              >
                {isDeleting ? "Đang xóa..." : "Xác nhận xóa"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ORDER DETAIL (ADMIN) */}
      {selectedOrderDetail && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(6px)",
            zIndex: 99990,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            animation: "fadeIn 0.2s ease-out",
          }}
          onClick={() => setSelectedOrderDetail(null)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "760px",
              maxHeight: "90vh",
              overflowY: "auto",
              backgroundColor: "#141416",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "8px",
              padding: "32px",
              boxShadow: "0 30px 80px rgba(0, 0, 0, 0.9)",
              boxSizing: "border-box",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "16px" }}>
              <div>
                <span style={{ fontSize: "12px", color: "#22c55e", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Chi Tiết Đơn Hàng
                </span>
                <h3 style={{ margin: "4px 0 0 0", fontSize: "22px", fontWeight: 900, color: "#ffffff" }}>
                  #{selectedOrderDetail.order_number}
                </h3>
                <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#71717a" }}>
                  Ngày đặt: {new Date(selectedOrderDetail.created_at).toLocaleString("vi-VN")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrderDetail(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#a1a1aa",
                  fontSize: "24px",
                  cursor: "pointer",
                  padding: "4px",
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>

            {/* Info Summary 2-col */}
            <div className="mobile-stack" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "20px", marginBottom: "24px" }}>
              {/* Shipping info */}
              <div style={{ backgroundColor: "#0d0e0f", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "6px", padding: "16px" }}>
                <span style={{ fontSize: "11px", color: "#a1a1aa", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "10px" }}>
                  📦 Thông tin giao hàng
                </span>
                <div style={{ fontSize: "14px", color: "#fff", fontWeight: 700, marginBottom: "4px" }}>
                  {selectedOrderDetail.shipping_name}
                </div>
                <div style={{ fontSize: "13px", color: "#60a5fa", marginBottom: "6px" }}>
                  📞 {selectedOrderDetail.shipping_phone}
                </div>
                <div style={{ fontSize: "13px", color: "#cbd5e1", lineHeight: 1.4 }}>
                  📍 {selectedOrderDetail.shipping_address}
                </div>
                {selectedOrderDetail.customer_note && (
                  <div style={{ marginTop: "10px", paddingTop: "10px", borderTop: "1px dashed rgba(255,255,255,0.1)", fontSize: "12px", color: "#fbbf24" }}>
                    💬 Ghi chú: {selectedOrderDetail.customer_note}
                  </div>
                )}
              </div>

              {/* Status info */}
              <div style={{ backgroundColor: "#0d0e0f", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "6px", padding: "16px" }}>
                <span style={{ fontSize: "11px", color: "#a1a1aa", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "10px" }}>
                  📋 Trạng thái & Thanh toán
                </span>
                <div style={{ marginBottom: "12px" }}>
                  <span style={{ fontSize: "12px", color: "#71717a", display: "block", marginBottom: "4px" }}>Trạng thái đơn:</span>
                  <span style={{ padding: "4px 10px", backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "4px", fontSize: "13px", fontWeight: 700, color: "#fff" }}>
                    {ORDER_STATUS_LABELS[selectedOrderDetail.status] || selectedOrderDetail.status}
                  </span>
                </div>
                <div>
                  <span style={{ fontSize: "12px", color: "#71717a", display: "block", marginBottom: "4px" }}>Thanh toán:</span>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "4px",
                      fontSize: "13px",
                      fontWeight: 700,
                      backgroundColor: selectedOrderDetail.payment_status === "paid" ? "rgba(34,197,94,0.2)" : "rgba(234,179,8,0.2)",
                      color: selectedOrderDetail.payment_status === "paid" ? "#4ade80" : "#facc15",
                    }}
                  >
                    {ORDER_PAYMENT_STATUS_LABELS[selectedOrderDetail.payment_status] || selectedOrderDetail.payment_status}
                  </span>
                </div>
              </div>
            </div>

            {/* Products Table */}
            <div style={{ marginBottom: "24px" }}>
              <span style={{ fontSize: "12px", color: "#a1a1aa", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "12px" }}>
                🛒 Danh sách sản phẩm ({selectedOrderDetail.items?.length || 0})
              </span>
              <div style={{ backgroundColor: "#0d0e0f", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "6px", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", color: "#71717a", fontSize: "11px", textTransform: "uppercase" }}>
                      <th style={{ padding: "12px 16px" }}>Sản phẩm</th>
                      <th style={{ padding: "12px 16px", textAlign: "center" }}>SL</th>
                      <th style={{ padding: "12px 16px", textAlign: "right" }}>Đơn giá</th>
                      <th style={{ padding: "12px 16px", textAlign: "right" }}>Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrderDetail.items && selectedOrderDetail.items.length > 0 ? (
                      selectedOrderDetail.items.map((item, idx) => (
                        <tr key={idx} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                          <td style={{ padding: "12px 16px" }}>
                            <strong style={{ color: "#fff", display: "block", fontSize: "13.5px" }}>
                              {item.product_name}
                            </strong>
                            {(item.product_sku || item.sku) && (
                              <span style={{ fontSize: "11px", color: "#71717a" }}>
                                SKU: {item.product_sku || item.sku}
                              </span>
                            )}
                          </td>
                          <td style={{ padding: "12px 16px", textAlign: "center", color: "#fff", fontWeight: 700 }}>
                            {item.quantity}
                          </td>
                          <td style={{ padding: "12px 16px", textAlign: "right", color: "#cbd5e1" }}>
                            {formatCurrency(item.unit_price)}
                          </td>
                          <td style={{ padding: "12px 16px", textAlign: "right", color: "#fff", fontWeight: 700 }}>
                            {formatCurrency(item.line_total || item.subtotal || (item.unit_price * item.quantity))}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} style={{ padding: "16px", textAlign: "center", color: "#71717a" }}>
                          Không có dữ liệu chi tiết sản phẩm.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Financial Summary */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "28px" }}>
              <div style={{ width: "300px", display: "flex", flexDirection: "column", gap: "8px", fontSize: "13.5px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#a1a1aa" }}>
                  <span>Tạm tính tiền hàng:</span>
                  <span style={{ color: "#fff" }}>
                    {formatCurrency(selectedOrderDetail.subtotal || selectedOrderDetail.total_amount)}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#a1a1aa" }}>
                  <span>Phí vận chuyển:</span>
                  <span style={{ color: "#fff" }}>
                    {selectedOrderDetail.shipping_fee ? formatCurrency(selectedOrderDetail.shipping_fee) : "Miễn phí (0 ₫)"}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "10px", borderTop: "1px solid rgba(255,255,255,0.1)", fontSize: "16px", fontWeight: 800 }}>
                  <span style={{ color: "#fff" }}>Tổng thanh toán:</span>
                  <span style={{ color: "#22c55e", fontSize: "18px" }}>
                    {formatCurrency(selectedOrderDetail.total_amount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer button */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setSelectedOrderDetail(null)}
                style={{
                  padding: "10px 24px",
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  border: "none",
                  borderRadius: "4px",
                  fontWeight: 800,
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
