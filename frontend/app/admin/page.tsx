"use client";

import { startTransition, useState, useEffect, useCallback, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
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
  description?: string;
  image_url?: string;
  is_active?: boolean;
}

interface DashboardData {
  users: { total: number };
  products: { total: number; active: number };
  orders: { total: number };
  rental_requests: { total: number; pending: number };
  revenue: { order: number; rental: number; total: number; currency: string };
  recent_orders: OrderItem[];
  top_selling_products: Array<{
    id: string;
    name: string;
    sku: string;
    slug: string;
    units_sold: number;
    revenue: number;
    image_url?: string;
    sale_price: number;
    rental_enabled: boolean;
    stock_quantity: number;
  }>;
}

interface StoreSettingsData {
  id?: string;
  store_name: string;
  phone: string;
  rental_phone?: string;
  email?: string;
  rental_email?: string;
  address: string;
  city: string;
  country: string;
  business_hours?: string;
  facebook_page_id?: string;
  rental_information?: string;
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

const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: "Chờ xử lý",
  confirmed: "Đã xác nhận",
  processing: "Đang chuẩn bị",
  shipped: "Đang giao hàng",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
};

const ORDER_PAYMENT_STATUS_LABELS: Record<string, string> = {
  unpaid: "Chưa thanh toán",
  paid: "Đã thanh toán",
  refunded: "Đã hoàn tiền",
};

interface StatusConfirmModalState {
  type: "order_status" | "order_payment";
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

interface StaffUserItem {
  id: string;
  email: string;
  role: string;
  is_active: boolean;
  full_name: string;
  phone: string;
  created_at?: string;
}

function formatCurrency(amount?: number) {
  if (amount === undefined || amount === null) return "0 ₫";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

type AdminTab = "overview" | "home_cms" | "products" | "categories" | "orders" | "staff" | "settings";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, token, isAuthenticated, isLoading, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Staff / User management states
  const [staffUsers, setStaffUsers] = useState<StaffUserItem[]>([]);
  const [isStaffLoading, setIsStaffLoading] = useState(false);
  const [staffSearchQuery, setStaffSearchQuery] = useState("");
  const [staffRoleFilter, setStaffRoleFilter] = useState("all");
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [staffEmail, setStaffEmail] = useState("");
  const [staffPhone, setStaffPhone] = useState("");
  const [staffFullName, setStaffFullName] = useState("");
  const [staffPassword, setStaffPassword] = useState("");
  const [staffRole, setStaffRole] = useState("staff");
  const [isSubmittingStaff, setIsSubmittingStaff] = useState(false);

  // Shadcn Dashboard UI interactive states
  const [forecastPeriod, setForecastPeriod] = useState<"monthly" | "quarterly" | "yearly">("monthly");
  const [dateRangeFilter, setDateRangeFilter] = useState<"today" | "7days" | "month" | "year">("month");
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [hoveredChartPoint, setHoveredChartPoint] = useState<number | null>(5);
  const [sourcePeriod, setSourcePeriod] = useState<"weekly" | "monthly">("weekly");
  const [leaderboardPeriod, setLeaderboardPeriod] = useState<"month" | "all">("month");

  // Tab persistence: initialize from URL query or localStorage
  useEffect(() => {
    queueMicrotask(() => {
      try {
        const params = new URLSearchParams(window.location.search);
        const urlTab = params.get("tab") as AdminTab;
        const validTabs: AdminTab[] = ["overview", "home_cms", "products", "categories", "orders", "staff", "settings"];
        if (urlTab && validTabs.includes(urlTab)) {
          if (user?.role === "staff" && (urlTab === "staff" || urlTab === "settings")) {
            setActiveTab("overview");
          } else {
            setActiveTab(urlTab);
          }
        } else {
          const savedTab = localStorage.getItem("vanbass_admin_tab") as AdminTab;
          if (savedTab && validTabs.includes(savedTab)) {
            if (user?.role === "staff" && (savedTab === "staff" || savedTab === "settings")) {
              setActiveTab("overview");
            } else {
              setActiveTab(savedTab);
              const u = new URL(window.location.href);
              u.searchParams.set("tab", savedTab);
              window.history.replaceState(null, "", u.toString());
            }
          }
        }
      } catch {
        // Ignore
      }
    });
  }, [user]);

  // Guard activeTab if user role is staff
  useEffect(() => {
    if (user?.role === "staff" && (activeTab === "staff" || activeTab === "settings")) {
      queueMicrotask(() => {
        setActiveTab("overview");
      });
    }
  }, [user?.role, activeTab]);

  const handleTabChange = useCallback((tab: AdminTab) => {
    if (user?.role === "staff" && (tab === "staff" || tab === "settings")) {
      return;
    }
    setActiveTab(tab);
    try {
      localStorage.setItem("vanbass_admin_tab", tab);
      const u = new URL(window.location.href);
      u.searchParams.set("tab", tab);
      window.history.replaceState(null, "", u.toString());
    } catch {
      // Ignore
    }
  }, [user]);

  // Home CMS states
  const [homeConfig, setHomeConfig] = useState<HomeData>(DEFAULT_HOME_DATA);
  const [savedHomeConfig, setSavedHomeConfig] = useState<HomeData>(DEFAULT_HOME_DATA);
  const [, setIsHomeConfigLoading] = useState(false);
  const [isHomeConfigSaving, setIsHomeConfigSaving] = useState(false);
  const [, setActiveCmsAccordion] = useState<string>("hero");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [previewKey, setPreviewKey] = useState<number>(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const centerHeroFileRef = useRef<HTMLInputElement>(null);

  const [inlineEditor, setInlineEditor] = useState<{
    isOpen: boolean;
    fieldKey: string;
    label: string;
    fieldType: string;
    currentVal: string;
  } | null>(null);

  const getNestedVal = useCallback((obj: Record<string, unknown> | HomeData, path: string) => {
    if (!obj || !path) return "";
    const parts = path.split(".");
    let cur: unknown = obj;
    for (const p of parts) {
      if (cur == null || typeof cur !== "object") return "";
      cur = (cur as Record<string, unknown>)[p];
    }
    return typeof cur === "string" ? cur : "";
  }, []);

  const updateNestedVal = useCallback((path: string, val: string) => {
    setHomeConfig((prev) => {
      const next = JSON.parse(JSON.stringify(prev)) as Record<string, unknown>;
      const parts = path.split(".");
      let cur: Record<string, unknown> = next;
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!cur[part] || typeof cur[part] !== "object") {
          cur[part] = {};
        }
        cur = cur[part] as Record<string, unknown>;
      }
      cur[parts[parts.length - 1]] = val;
      return next as unknown as HomeData;
    });
  }, []);

  // Data states
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [, setIsDataLoading] = useState(true);

  // Products Tab Search, Filter & Pagination states
  const [productSearch, setProductSearch] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState("all");
  const [productBrandFilter] = useState("all");
  const [productStatusFilter, setProductStatusFilter] = useState("all");
  const [productSortBy] = useState("newest");
  const [productPage, setProductPage] = useState(1);
  const [productPageSize] = useState(20);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Text Search (Name, SKU, Slug, Brand, Description)
    const q = productSearch.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          (p.brand && p.brand.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // 2. Category Filter
    if (productCategoryFilter !== "all") {
      result = result.filter((p) => p.category_id === productCategoryFilter);
    }

    // 3. Brand Filter
    if (productBrandFilter !== "all") {
      result = result.filter(
        (p) => (p.brand || "").trim().toLowerCase() === productBrandFilter.toLowerCase()
      );
    }

    // 4. Status Filter
    if (productStatusFilter === "sale") {
      result = result.filter((p) => p.sale_enabled);
    } else if (productStatusFilter === "rental") {
      result = result.filter((p) => p.rental_enabled);
    } else if (productStatusFilter === "instock") {
      result = result.filter((p) => p.stock_quantity > 0);
    } else if (productStatusFilter === "outofstock") {
      result = result.filter((p) => p.stock_quantity <= 0);
    }

    // 5. Sorting
    if (productSortBy === "name_asc") {
      result.sort((a, b) => a.name.localeCompare(b.name, "vi"));
    } else if (productSortBy === "name_desc") {
      result.sort((a, b) => b.name.localeCompare(a.name, "vi"));
    } else if (productSortBy === "price_asc") {
      result.sort((a, b) => (a.sale_price || 0) - (b.sale_price || 0));
    } else if (productSortBy === "price_desc") {
      result.sort((a, b) => (b.sale_price || 0) - (a.sale_price || 0));
    } else if (productSortBy === "stock_asc") {
      result.sort((a, b) => a.stock_quantity - b.stock_quantity);
    } else if (productSortBy === "stock_desc") {
      result.sort((a, b) => b.stock_quantity - a.stock_quantity);
    }

    return result;
  }, [
    products,
    productSearch,
    productCategoryFilter,
    productBrandFilter,
    productStatusFilter,
    productSortBy,
  ]);

  // Total pages & Paginated slice
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / (productPageSize || 1)));
  const currentPage = Math.min(productPage, totalPages);
  const paginatedProducts = useMemo(() => {
    if (productPageSize === 0) return filteredProducts;
    const start = (currentPage - 1) * productPageSize;
    return filteredProducts.slice(start, start + productPageSize);
  }, [filteredProducts, currentPage, productPageSize]);

  // Category management states
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [catNameInput, setCatNameInput] = useState("");
  const [catSlugInput, setCatSlugInput] = useState("");
  const [catDescInput, setCatDescInput] = useState("");
  const [isSubmittingCat, setIsSubmittingCat] = useState(false);
  const [categorySearchQuery, setCategorySearchQuery] = useState("");

  const filteredCategories = useMemo(() => {
    const q = categorySearchQuery.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q) ||
        (c.description && c.description.toLowerCase().includes(q))
    );
  }, [categories, categorySearchQuery]);

  // Orders Search, Filter & Pagination states
  const [orderSearchQuery, setOrderSearchQuery] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [orderPaymentFilter, setOrderPaymentFilter] = useState("all");
  const [orderPage, setOrderPage] = useState(1);
  const [orderPageSize] = useState(15);

  const filteredOrders = useMemo(() => {
    let result = [...orders];
    const q = orderSearchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (o) =>
          o.order_number.toLowerCase().includes(q) ||
          o.shipping_name.toLowerCase().includes(q) ||
          o.shipping_phone.includes(q) ||
          o.shipping_address.toLowerCase().includes(q)
      );
    }
    if (orderStatusFilter !== "all") {
      result = result.filter((o) => o.status === orderStatusFilter);
    }
    if (orderPaymentFilter !== "all") {
      result = result.filter((o) => (o.payment_status || "unpaid") === orderPaymentFilter);
    }
    return result;
  }, [orders, orderSearchQuery, orderStatusFilter, orderPaymentFilter]);

  const orderTotalPages = Math.max(1, Math.ceil(filteredOrders.length / (orderPageSize || 1)));
  const currentOrderPage = Math.min(orderPage, orderTotalPages);
  const paginatedOrders = useMemo(() => {
    if (orderPageSize === 0) return filteredOrders;
    const start = (currentOrderPage - 1) * orderPageSize;
    return filteredOrders.slice(start, start + orderPageSize);
  }, [filteredOrders, currentOrderPage, orderPageSize]);

  // Store Settings states
  const [storeSettings, setStoreSettings] = useState<StoreSettingsData>({
    store_name: "VanBass Music Center",
    phone: "0905123456",
    rental_phone: "0905123456",
    email: "contact@vanbass.vn",
    rental_email: "rental@vanbass.vn",
    address: "123 Nguyen Van Linh, Da Nang",
    city: "Da Nang",
    country: "Vietnam",
    business_hours: "08:00 - 21:00 hàng ngày",
    facebook_page_id: "vanbassmusiccenter",
    rental_information: "Hỗ trợ tư vấn thuê âm thanh, ánh sáng, DJ chuyên nghiệp.",
  });
  const [isStoreSettingsLoading, setIsStoreSettingsLoading] = useState(false);
  const [isStoreSettingsSaving, setIsStoreSettingsSaving] = useState(false);

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
      } else if (user && user.role !== "admin" && user.role !== "staff") {
        router.push("/");
      }
    }
  }, [isAuthenticated, isLoading, user, router]);

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

  const fetchDashboardData = useCallback(async () => {
    if (!token) return;
    try {
      const cacheBust = `_t=${Date.now()}`;
      const res = await fetch(`${apiUrl}/admin/dashboard?${cacheBust}`, {
        cache: "no-store",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setDashboardData(data);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    }
  }, [apiUrl, token]);

  const fetchCategoriesData = useCallback(async () => {
    try {
      const cacheBust = `_t=${Date.now()}`;
      const res = await fetch(`${apiUrl}/categories?${cacheBust}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
        if (data.length > 0 && !categoryId) {
          setCategoryId(data[0].id);
        }
      }
    } catch (err) {
      console.error("Categories fetch error:", err);
    }
  }, [apiUrl, categoryId]);

  const fetchProductsData = useCallback(async () => {
    try {
      const cacheBust = `_t=${Date.now()}`;
      const res = await fetch(`${apiUrl}/products?${cacheBust}`, {
        cache: "no-store",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error("Products fetch error:", err);
    }
  }, [apiUrl, token]);

  const fetchOrdersData = useCallback(async () => {
    if (!token) return;
    try {
      const cacheBust = `_t=${Date.now()}`;
      const res = await fetch(`${apiUrl}/orders?${cacheBust}`, {
        cache: "no-store",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data.items || []);
      }
    } catch (err) {
      console.error("Orders fetch error:", err);
    }
  }, [apiUrl, token]);

  const fetchStaffData = useCallback(async () => {
    if (!token || user?.role === "staff") return;
    setIsStaffLoading(true);
    try {
      const cacheBust = `_t=${Date.now()}`;
      const res = await fetch(`${apiUrl}/admin/users?${cacheBust}`, {
        cache: "no-store",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setStaffUsers(data.items || []);
      }
    } catch (err) {
      console.error("Staff fetch error:", err);
    } finally {
      setIsStaffLoading(false);
    }
  }, [apiUrl, token, user?.role]);

  const fetchStoreSettingsData = useCallback(async () => {
    if (!token || user?.role === "staff") return;
    setIsStoreSettingsLoading(true);
    try {
      const cacheBust = `_t=${Date.now()}`;
      const res = await fetch(`${apiUrl}/store-settings?${cacheBust}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setStoreSettings(data);
      }
    } catch (err) {
      console.error("Store settings fetch error:", err);
    } finally {
      setIsStoreSettingsLoading(false);
    }
  }, [apiUrl, token, user?.role]);

  const fetchHomeConfigData = useCallback(async () => {
    setIsHomeConfigLoading(true);
    try {
      const cacheBust = `_t=${Date.now()}`;
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
      console.error("Failed to fetch home config:", e);
    } finally {
      setIsHomeConfigLoading(false);
    }
  }, [apiUrl]);

  const loadAllData = useCallback(async () => {
    setIsDataLoading(true);
    try {
      await Promise.all([
        fetchDashboardData(),
        fetchCategoriesData(),
      ]);
      fetchProductsData();
    } catch (e) {
      console.error("Failed to fetch admin data:", e);
    } finally {
      setIsDataLoading(false);
    }
  }, [fetchDashboardData, fetchCategoriesData, fetchProductsData]);

  // Lazy tab data loading
  useEffect(() => {
    if (!token) return;
    startTransition(() => {
      if (activeTab === "overview") {
        void fetchDashboardData();
      } else if (activeTab === "products") {
        void fetchProductsData();
      } else if (activeTab === "orders") {
        void fetchOrdersData();
      } else if (activeTab === "staff" && user?.role !== "staff") {
        void fetchStaffData();
      } else if (activeTab === "settings" && user?.role !== "staff") {
        void fetchStoreSettingsData();
      } else if (activeTab === "home_cms") {
        void fetchHomeConfigData();
      }
    });
  }, [activeTab, token, user?.role, fetchDashboardData, fetchProductsData, fetchOrdersData, fetchStaffData, fetchStoreSettingsData, fetchHomeConfigData]);

  // Category CRUD Handlers
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catNameInput.trim()) {
      setActionErrorMsg("Vui lòng nhập tên danh mục.");
      return;
    }
    const slug =
      catSlugInput.trim() ||
      catNameInput
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    setIsSubmittingCat(true);
    try {
      const res = await fetch(`${apiUrl}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: catNameInput.trim(),
          slug,
          description: catDescInput.trim() || undefined,
        }),
      });

      if (res.ok) {
        const newCat = await res.json();
        setCategories((prev) => [...prev, newCat]);
        setShowAddCategoryModal(false);
        setCatNameInput("");
        setCatSlugInput("");
        setCatDescInput("");
        setActionSuccessMsg(`✓ Đã tạo danh mục "${newCat.name}" thành công!`);
      } else {
        const err = await res.json().catch(() => ({ detail: "Lỗi tạo danh mục" }));
        setActionErrorMsg(err.detail || "Không thể tạo danh mục.");
      }
    } catch (err) {
      console.error(err);
      setActionErrorMsg("Lỗi kết nối máy chủ khi tạo danh mục.");
    } finally {
      setIsSubmittingCat(false);
    }
  };

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    if (!catNameInput.trim()) {
      setActionErrorMsg("Vui lòng nhập tên danh mục.");
      return;
    }
    const slug =
      catSlugInput.trim() ||
      catNameInput
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    setIsSubmittingCat(true);
    try {
      const res = await fetch(`${apiUrl}/categories/${editingCategory.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: catNameInput.trim(),
          slug,
          description: catDescInput.trim() || undefined,
        }),
      });

      if (res.ok) {
        const updatedCat = await res.json();
        setCategories((prev) => prev.map((c) => (c.id === updatedCat.id ? updatedCat : c)));
        setShowEditCategoryModal(false);
        setEditingCategory(null);
        setCatNameInput("");
        setCatSlugInput("");
        setCatDescInput("");
        setActionSuccessMsg(`✓ Đã cập nhật danh mục "${updatedCat.name}" thành công!`);
      } else {
        const err = await res.json().catch(() => ({ detail: "Lỗi cập nhật danh mục" }));
        setActionErrorMsg(err.detail || "Không thể cập nhật danh mục.");
      }
    } catch (err) {
      console.error(err);
      setActionErrorMsg("Lỗi kết nối máy chủ khi cập nhật danh mục.");
    } finally {
      setIsSubmittingCat(false);
    }
  };

  const handleDeleteCategory = async (cat: CategoryItem) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa danh mục "${cat.name}"?`)) return;
    try {
      const res = await fetch(`${apiUrl}/categories/${cat.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok || res.status === 204) {
        setCategories((prev) => prev.filter((c) => c.id !== cat.id));
        setActionSuccessMsg(`✓ Đã xóa danh mục "${cat.name}" thành công.`);
      } else {
        const err = await res.json().catch(() => ({ detail: "Không thể xóa danh mục" }));
        setActionErrorMsg(err.detail || "Không thể xóa danh mục.");
      }
    } catch (err) {
      console.error(err);
      setActionErrorMsg("Lỗi kết nối máy chủ khi xóa danh mục.");
    }
  };

  // Store Settings Handler
  const handleSaveStoreSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsStoreSettingsSaving(true);
    try {
      const res = await fetch(`${apiUrl}/store-settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(storeSettings),
      });

      if (res.ok) {
        const updated = await res.json();
        setStoreSettings(updated);
        setActionSuccessMsg("✓ Đã lưu cài đặt cửa hàng & Facebook Page ID thành công!");
      } else {
        const err = await res.json().catch(() => ({ detail: "Lỗi lưu cài đặt" }));
        setActionErrorMsg(err.detail || "Không thể lưu cài đặt cửa hàng.");
      }
    } catch (err) {
      console.error(err);
      setActionErrorMsg("Lỗi kết nối máy chủ khi lưu cài đặt cửa hàng.");
    } finally {
      setIsStoreSettingsSaving(false);
    }
  };

  const handleCreateStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffEmail.trim() || !staffPhone.trim() || !staffFullName.trim() || !staffPassword) {
      setActionErrorMsg("Vui lòng điền đầy đủ Email, Số điện thoại, Họ tên và Mật khẩu.");
      return;
    }
    if (staffPassword.length < 6) {
      setActionErrorMsg("Mật khẩu phải chứa ít nhất 6 ký tự.");
      return;
    }
    setIsSubmittingStaff(true);
    setActionErrorMsg("");
    try {
      const res = await fetch(`${apiUrl}/admin/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: staffEmail.trim(),
          phone: staffPhone.trim(),
          full_name: staffFullName.trim(),
          password: staffPassword,
          role: staffRole,
        }),
      });

      if (res.ok) {
        setActionSuccessMsg(`Đã tạo tài khoản nhân viên "${staffFullName}" thành công!`);
        setShowAddStaffModal(false);
        setStaffEmail("");
        setStaffPhone("");
        setStaffFullName("");
        setStaffPassword("");
        setStaffRole("admin");
        const reloadRes = await fetch(`${apiUrl}/admin/users?t=${Date.now()}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (reloadRes.ok) {
          const d = await reloadRes.json();
          setStaffUsers(d.items || []);
        }
      } else {
        const err = await res.json().catch(() => ({ detail: "Không thể tạo tài khoản nhân viên." }));
        setActionErrorMsg(err.detail || "Không thể tạo tài khoản nhân viên.");
      }
    } catch {
      setActionErrorMsg("Lỗi kết nối máy chủ khi tạo tài khoản nhân viên.");
    } finally {
      setIsSubmittingStaff(false);
    }
  };

  const handleToggleStaffStatus = async (targetUser: StaffUserItem) => {
    if (targetUser.id === user?.id || targetUser.email === user?.email) {
      setActionErrorMsg("Không thể tự khóa hoặc xóa chính mình");
      return;
    }
    try {
      const res = await fetch(`${apiUrl}/admin/users/${targetUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          is_active: !targetUser.is_active,
        }),
      });
      if (res.ok) {
        setActionSuccessMsg(`Đã ${targetUser.is_active ? "khóa" : "kích hoạt"} tài khoản "${targetUser.full_name}"!`);
        setStaffUsers((prev) =>
          prev.map((u) => (u.id === targetUser.id ? { ...u, is_active: !u.is_active } : u))
        );
      } else {
        const err = await res.json().catch(() => ({ detail: "Không thể cập nhật trạng thái." }));
        setActionErrorMsg(err.detail || "Không thể cập nhật trạng thái.");
      }
    } catch {
      setActionErrorMsg("Lỗi kết nối máy chủ khi cập nhật trạng thái.");
    }
  };

  const handleDeleteStaff = async (targetUser: StaffUserItem) => {
    if (targetUser.id === user?.id || targetUser.email === user?.email) {
      setActionErrorMsg("Không thể tự khóa hoặc xóa chính mình");
      return;
    }
    if (!window.confirm(`Bạn có chắc chắn muốn xóa tài khoản "${targetUser.full_name}" (${targetUser.email})?`)) {
      return;
    }
    try {
      const res = await fetch(`${apiUrl}/admin/users/${targetUser.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setActionSuccessMsg(`Đã xóa tài khoản "${targetUser.full_name}" thành công!`);
        setStaffUsers((prev) => prev.filter((u) => u.id !== targetUser.id));
      } else {
        const err = await res.json().catch(() => ({ detail: "Không thể xóa tài khoản." }));
        setActionErrorMsg(err.detail || "Không thể xóa tài khoản.");
      }
    } catch {
      setActionErrorMsg("Lỗi kết nối máy chủ khi xóa tài khoản.");
    }
  };

  useEffect(() => {
    if ((user?.role === "admin" || user?.role === "staff") && token) {
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

  const handleConfirmStatusChange = async () => {
    if (!statusConfirmModal) return;
    const { type, id, newStatus, newPaymentStatus } = statusConfirmModal;
    setStatusConfirmModal(null);

    if (type === "order_status") {
      await handleUpdateOrderStatus(id, newStatus);
    } else if (type === "order_payment") {
      await handleUpdateOrderStatus(id, undefined, newPaymentStatus);
    }
  };

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#090909", color: "#fff" }}>
        Đang xác thực quyền Admin...
      </div>
    );
  }

  if (!user || (user.role !== "admin" && user.role !== "staff")) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#090909", color: "#fff", textAlign: "center", padding: "20px" }}>
        
        <h1 style={{ fontSize: "24px", fontWeight: 800, margin: "0 0 12px 0" }}>Truy cập bị từ chối</h1>
        <p style={{ color: "#a1a1aa", maxWidth: "420px", marginBottom: "24px" }}>
          Tài khoản <strong>{user?.email}</strong> không có quyền Quản trị viên (Admin) hoặc Nhân viên (Staff) để truy cập trang này.
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/profile" style={{ padding: "12px 24px", backgroundColor: "#22c55e", color: "#000", fontWeight: 700, textDecoration: "none", borderRadius: "6px" }}>
            Về Hồ Sơ Cá Nhân (/profile)
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
          <div className="brand-logo-wrap" style={{ width: "38px", height: "38px" }}>
            <Image
              src="/images/logo.png"
              alt="VanBass Logo"
              width={38}
              height={38}
              className="brand-logo-img"
            />
          </div>
          <span className="brand-text" style={{ fontSize: "17px" }}>
            VANBASS
            <small style={{ color: "#22c55e", letterSpacing: "0.22em" }}>ADMIN PANEL</small>
          </span>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link href="/" target="_blank" style={{ fontSize: "13px", color: "#a1a1aa", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}>
            Xem Website Cửa hàng ↗
          </Link>
          <span style={{ fontSize: "13px", color: "#71717a" }}>|</span>
          <span style={{ fontSize: "13px", color: user.role === "staff" ? "#34d399" : "#22c55e", fontWeight: 600 }}>
            ● {user.email} ({user.role === "staff" ? "Staff" : "Admin"})
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
        {/* Shadcn Dark Sidebar */}
        <aside
          className="shadcn-sidebar"
          style={{
            padding: isSidebarCollapsed ? "12px 6px" : "16px 12px",
            position: "relative",
          }}
        >
          {/* Brand Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: isSidebarCollapsed ? "center" : "space-between",
              padding: "4px 6px 14px 6px",
              marginBottom: "8px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            {!isSidebarCollapsed && (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "6px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: "#000" }}>
                  <Image src="/images/logo.png" alt="Logo" width={24} height={24} />
                </div>
                <span style={{ fontSize: "14px", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.01em" }}>
                  VanBass <span style={{ color: "#22c55e", fontSize: "11px", fontWeight: 700 }}>Admin</span>
                </span>
              </div>
            )}
            <button
              type="button"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="shadcn-icon-btn-round"
              title={isSidebarCollapsed ? "Mở rộng thanh điều hướng" : "Thu gọn thanh điều hướng"}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="9" y1="3" x2="9" y2="21" />
                {isSidebarCollapsed ? <path d="M14 9l3 3-3 3" /> : <path d="M17 9l-3 3 3 3" />}
              </svg>
            </button>
          </div>

          {/* Navigation Groups */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1, overflowY: "auto", paddingRight: "2px" }}>
            {/* Group 1: CRM */}
            {!isSidebarCollapsed && <div className="shadcn-sidebar-group-title">CRM & Bán Hàng</div>}

            {([
              {
                id: "overview",
                label: "Dashboard",
                count: null,
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                  </svg>
                ),
              },
              {
                id: "products",
                label: "Sản phẩm",
                count: products.length || dashboardData?.products?.total || null,
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                ),
              },
              {
                id: "categories",
                label: "Danh mục",
                count: categories.length,
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                ),
              },
              {
                id: "orders",
                label: "Đơn hàng",
                count: orders.length || dashboardData?.orders?.total || null,
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                ),
              },
              {
                id: "home_cms",
                label: "Home CMS",
                count: null,
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                ),
              },
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`shadcn-nav-item ${activeTab === tab.id ? "active" : ""}`}
                style={{
                  justifyContent: isSidebarCollapsed ? "center" : "space-between",
                  padding: isSidebarCollapsed ? "10px 6px" : "9px 12px",
                }}
                title={tab.label}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                  <span style={{ color: activeTab === tab.id ? "#ffffff" : "#a1a1aa", display: "flex", alignItems: "center" }}>
                    {tab.icon}
                  </span>
                  {!isSidebarCollapsed && (
                    <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {tab.label}
                    </span>
                  )}
                </div>
                {!isSidebarCollapsed && tab.count !== null && (
                  <span className="admin-badge-count">{tab.count}</span>
                )}
              </button>
            ))}

            {/* Group 2: System */}
            {user?.role !== "staff" && (
              <>
                {!isSidebarCollapsed && <div className="shadcn-sidebar-group-title" style={{ marginTop: "12px" }}>Hệ Thống</div>}

                {([
                  {
                    id: "staff",
                    label: "Tài khoản Staff",
                    count: staffUsers.length || dashboardData?.users?.total || null,
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    ),
                  },
                  {
                    id: "settings",
                    label: "Cài đặt Cửa hàng",
                    count: null,
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                      </svg>
                    ),
                  },
                ] as const).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`shadcn-nav-item ${activeTab === tab.id ? "active" : ""}`}
                    style={{
                      justifyContent: isSidebarCollapsed ? "center" : "space-between",
                      padding: isSidebarCollapsed ? "10px 6px" : "9px 12px",
                    }}
                    title={tab.label}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                      <span style={{ color: activeTab === tab.id ? "#ffffff" : "#a1a1aa", display: "flex", alignItems: "center" }}>
                        {tab.icon}
                      </span>
                      {!isSidebarCollapsed && (
                        <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {tab.label}
                        </span>
                      )}
                    </div>
                    {!isSidebarCollapsed && tab.count !== null && (
                      <span className="admin-badge-count">{tab.count}</span>
                    )}
                  </button>
                ))}
              </>
            )}
          </div>

          {/* Sidebar Footer: User Profile */}
          <div className="shadcn-sidebar-footer">
            {!isSidebarCollapsed ? (
              <div className="shadcn-user-profile-row">
                <div className="shadcn-avatar">
                  {user?.email?.charAt(0).toUpperCase() || "A"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {user?.full_name || user?.email?.split("@")[0] || "Admin"}
                  </div>
                  <div style={{ fontSize: "11px", color: user?.role === "staff" ? "#34d399" : "#22c55e", fontWeight: 600 }}>
                    {user?.role === "staff" ? "Nhân viên Staff" : "Quản trị viên"}
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    router.push("/");
                  }}
                  className="shadcn-icon-btn-round"
                  title="Đăng xuất"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="shadcn-avatar" title={user?.email}>
                  {user?.email?.charAt(0).toUpperCase() || "A"}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Content Area */}
        <main
          style={{
            padding: activeTab === "home_cms" ? "10px 14px" : "24px 32px",
            backgroundColor: "#09090b",
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
          {/* TOP ADMIN HEADER BAR (MOCKUP DESIGN) */}
          {activeTab !== "home_cms" && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: "16px",
                marginBottom: "20px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#ffffff", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>Xin chào {user?.full_name || user?.email?.split("@")[0] || "Admin"}</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => handleTabChange("staff")}
                  className="admin-pill-btn-dark"
                  title="Quản lý tài khoản quản trị & nhân viên"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>Pick a admin</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={handleOpenAddModal}
                  className="admin-pill-btn-white"
                  title="Thêm sản phẩm mới vào kho"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  <span>Thêm sản phẩm</span>
                </button>
              </div>
            </div>
          )}

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

          {/* TAB 1: OVERVIEW (SHADCN DASHBOARD LAYOUT) */}
          {activeTab === "overview" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Top Dashboard Header */}
              <div className="shadcn-dashboard-header">
                <div>
                  <h1 className="shadcn-page-title">
                    Báo Cáo Tổng Quan
                  </h1>
                  <p className="shadcn-page-subtitle">
                    Theo dõi hoạt động kinh doanh, thống kê tài chính và kho thiết bị âm thanh VanBass.
                  </p>
                </div>

                <div className="shadcn-header-actions">
                  {/* Date Range Picker */}
                  <div style={{ position: "relative" }}>
                    <button
                      type="button"
                      onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
                      className="admin-pill-btn-dark"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span>
                        {dateRangeFilter === "today"
                          ? "Hôm nay"
                          : dateRangeFilter === "7days"
                            ? "7 ngày qua"
                            : dateRangeFilter === "year"
                              ? "Năm 2026"
                              : "Tháng này (30 ngày)"}
                      </span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>

                    {dateDropdownOpen && (
                      <div
                        style={{
                          position: "absolute",
                          top: "calc(100% + 6px)",
                          right: 0,
                          backgroundColor: "rgba(18, 18, 21, 0.95)",
                          backdropFilter: "blur(20px)",
                          border: "1px solid rgba(255, 255, 255, 0.14)",
                          borderRadius: "10px",
                          boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
                          padding: "6px",
                          zIndex: 100,
                          minWidth: "160px",
                        }}
                      >
                        {[
                          { id: "today", label: "Hôm nay" },
                          { id: "7days", label: "7 ngày qua" },
                          { id: "month", label: "Tháng này" },
                          { id: "year", label: "Năm 2026" },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => {
                              setDateRangeFilter(opt.id as typeof dateRangeFilter);
                              setDateDropdownOpen(false);
                            }}
                            style={{
                              display: "block",
                              width: "100%",
                              padding: "8px 12px",
                              fontSize: "12.5px",
                              fontWeight: dateRangeFilter === opt.id ? 700 : 500,
                              color: dateRangeFilter === opt.id ? "#22c55e" : "#e4e4e7",
                              background: dateRangeFilter === opt.id ? "rgba(34, 197, 94, 0.1)" : "transparent",
                              border: "none",
                              borderRadius: "6px",
                              textAlign: "left",
                              cursor: "pointer",
                            }}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Primary Action Button */}
                  <button
                    type="button"
                    onClick={handleOpenAddModal}
                    className="admin-pill-btn-green"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Thêm sản phẩm
                  </button>
                </div>
              </div>

              {/* ROW 1: 4 METRIC STAT CARDS WITH SPARKLINES */}
              <div className="shadcn-metric-grid">
                {/* Card 1: Total Revenue */}
                <div className="shadcn-metric-card">
                  <div className="shadcn-metric-header">
                    <span className="shadcn-metric-title">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="1" x2="12" y2="23" />
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                      Tổng Doanh Thu
                    </span>
                    <span className="shadcn-metric-info-icon" title="Tổng doanh thu bán và cho thuê thiết bị">ⓘ</span>
                  </div>
                  <div className="shadcn-metric-main">
                    <div>
                      <div className="shadcn-metric-val">
                        {formatCurrency(dashboardData?.revenue?.total || 278500000)}
                      </div>
                      <div className="shadcn-metric-trend up">
                        <span>↗ +2.1%</span>
                        <span className="shadcn-metric-subtext">vs tuần trước</span>
                      </div>
                    </div>
                    {/* Sparkline Bars */}
                    <div className="shadcn-sparkline">
                      {[30, 45, 60, 50, 75, 90, 100].map((h, i) => (
                        <div
                          key={i}
                          className={`shadcn-sparkline-bar ${i >= 5 ? "green" : ""}`}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 2: Total Visitors / Customers */}
                <div className="shadcn-metric-card">
                  <div className="shadcn-metric-header">
                    <span className="shadcn-metric-title">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                      </svg>
                      Lượt Khách Hàng
                    </span>
                    <span className="shadcn-metric-info-icon" title="Tổng tài khoản và khách tương tác">ⓘ</span>
                  </div>
                  <div className="shadcn-metric-main">
                    <div>
                      <div className="shadcn-metric-val">
                        {dashboardData?.users?.total || 611}
                      </div>
                      <div className="shadcn-metric-trend up">
                        <span>↗ +3.5%</span>
                        <span className="shadcn-metric-subtext">vs tuần trước</span>
                      </div>
                    </div>
                    {/* Sparkline Bars */}
                    <div className="shadcn-sparkline">
                      {[40, 55, 35, 70, 65, 85, 95].map((h, i) => (
                        <div
                          key={i}
                          className={`shadcn-sparkline-bar ${i >= 5 ? "highlight" : ""}`}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 3: Avg Sale Value */}
                <div className="shadcn-metric-card">
                  <div className="shadcn-metric-header">
                    <span className="shadcn-metric-title">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <line x1="2" y1="10" x2="22" y2="10" />
                      </svg>
                      Giá Trị Đơn TB
                    </span>
                    <span className="shadcn-metric-info-icon" title="Giá trị trung bình mỗi đơn hàng">ⓘ</span>
                  </div>
                  <div className="shadcn-metric-main">
                    <div>
                      <div className="shadcn-metric-val">
                        {formatCurrency(
                          Math.round((dashboardData?.revenue?.total || 278500000) / Math.max(dashboardData?.orders?.total || 150, 1))
                        )}
                      </div>
                      <div className="shadcn-metric-trend down">
                        <span>↘ -1.7%</span>
                        <span className="shadcn-metric-subtext">vs tuần trước</span>
                      </div>
                    </div>
                    {/* Sparkline Bars */}
                    <div className="shadcn-sparkline">
                      {[60, 50, 80, 45, 55, 70, 65].map((h, i) => (
                        <div
                          key={i}
                          className={`shadcn-sparkline-bar ${i >= 4 ? "highlight" : ""}`}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card 4: Total Products */}
                <div className="shadcn-metric-card">
                  <div className="shadcn-metric-header">
                    <span className="shadcn-metric-title">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 2 7 12 12 22 7 12 2" />
                        <polyline points="2 17 12 22 22 17" />
                        <polyline points="2 12 12 17 22 12" />
                      </svg>
                      Tổng Sản Phẩm
                    </span>
                    <span className="shadcn-metric-info-icon" title="Tổng thiết bị trong kho hàng">ⓘ</span>
                  </div>
                  <div className="shadcn-metric-main">
                    <div>
                      <div className="shadcn-metric-val">
                        {dashboardData?.products?.total ?? (products.length || 980)}
                      </div>
                      <div className="shadcn-metric-trend up">
                        <span>↗ +4.3%</span>
                        <span className="shadcn-metric-subtext">vs tuần trước</span>
                      </div>
                    </div>
                    {/* Sparkline Bars */}
                    <div className="shadcn-sparkline">
                      {[35, 50, 60, 75, 80, 90, 100].map((h, i) => (
                        <div
                          key={i}
                          className={`shadcn-sparkline-bar ${i >= 5 ? "green" : ""}`}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ROW 2: REVENUE FORECAST (65%) & SOURCE BREAKDOWN (35%) */}
              <div className="shadcn-row-grid-2">
                {/* Left Card: Revenue Forecast Chart */}
                <div className="shadcn-card">
                  <div className="shadcn-card-header">
                    <h3 className="shadcn-card-title">Dự báo doanh thu</h3>
                    <div className="shadcn-pill-group">
                      <button
                        type="button"
                        onClick={() => setForecastPeriod("monthly")}
                        className={`shadcn-pill-btn ${forecastPeriod === "monthly" ? "active" : ""}`}
                      >
                        Tháng
                      </button>
                      <button
                        type="button"
                        onClick={() => setForecastPeriod("quarterly")}
                        className={`shadcn-pill-btn ${forecastPeriod === "quarterly" ? "active" : ""}`}
                      >
                        Quý
                      </button>
                      <button
                        type="button"
                        onClick={() => setForecastPeriod("yearly")}
                        className={`shadcn-pill-btn ${forecastPeriod === "yearly" ? "active" : ""}`}
                      >
                        Năm
                      </button>
                    </div>
                  </div>

                  <div className="shadcn-forecast-stat-row">
                    <div className="shadcn-forecast-number">
                      {formatCurrency(dashboardData?.revenue?.total ? Math.round(dashboardData.revenue.total * 1.052) : 285500000)}
                      <span className="shadcn-metric-trend up" style={{ fontSize: "12px", padding: "2px 8px", background: "rgba(34, 197, 94, 0.12)", borderRadius: "6px" }}>
                        ↗ +5.2% so với kỳ trước
                      </span>
                    </div>
                    <div className="shadcn-chart-legend">
                      <span>
                        <span className="shadcn-legend-dot" style={{ background: "#22c55e" }} />
                        Kỳ này (This period)
                      </span>
                      <span>
                        <span className="shadcn-legend-dot" style={{ background: "#71717a" }} />
                        Kỳ trước (Last period)
                      </span>
                    </div>
                  </div>

                  {/* Interactive SVG Multi-Line Chart */}
                  <div style={{ position: "relative", width: "100%", height: "230px", marginTop: "10px" }}>
                    <svg viewBox="0 0 600 200" style={{ width: "100%", height: "100%", overflow: "visible" }}>
                      <defs>
                        <linearGradient id="chartGreenGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#22c55e" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Horizontal Grid Lines */}
                      {[30, 70, 110, 150, 190].map((y, idx) => (
                        <g key={idx}>
                          <line x1="30" y1={y} x2="590" y2={y} stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="3 3" />
                          <text x="5" y={y + 4} fill="#52525b" fontSize="9" textAnchor="start">
                            {idx === 0 ? "200tr" : idx === 1 ? "150tr" : idx === 2 ? "100tr" : idx === 3 ? "50tr" : "0₫"}
                          </text>
                        </g>
                      ))}

                      {/* Line 2: Last period (Gray) */}
                      <path
                        d="M 40 140 C 90 120, 140 150, 190 135 C 240 120, 290 140, 340 115 C 390 90, 440 130, 490 110 C 540 90, 570 120, 585 105"
                        fill="none"
                        stroke="#52525b"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                      />

                      {/* Line 1: This period (Green curve & gradient fill) */}
                      <path
                        d="M 40 130 C 90 90, 140 115, 190 85 C 240 60, 290 95, 340 50 C 390 75, 440 95, 490 80 C 540 65, 570 85, 585 60 L 585 190 L 40 190 Z"
                        fill="url(#chartGreenGrad)"
                      />
                      <path
                        d="M 40 130 C 90 90, 140 115, 190 85 C 240 60, 290 95, 340 50 C 390 75, 440 95, 490 80 C 540 65, 570 85, 585 60"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="2.5"
                      />

                      {/* Hover / Points markers */}
                      {[
                        { x: 40, y: 130, label: "T1" },
                        { x: 90, y: 90, label: "T2" },
                        { x: 140, y: 115, label: "T3" },
                        { x: 190, y: 85, label: "T4" },
                        { x: 240, y: 60, label: "T5" },
                        { x: 340, y: 50, label: "T6" },
                        { x: 390, y: 75, label: "T7" },
                        { x: 440, y: 95, label: "T8" },
                        { x: 490, y: 80, label: "T9" },
                        { x: 585, y: 60, label: "T12" },
                      ].map((pt, i) => (
                        <g key={i} onMouseEnter={() => setHoveredChartPoint(i)} style={{ cursor: "pointer" }}>
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={hoveredChartPoint === i ? 6 : 3}
                            fill="#22c55e"
                            stroke="#09090b"
                            strokeWidth={hoveredChartPoint === i ? 3 : 1.5}
                          />
                          <text x={pt.x} y="198" fill="#71717a" fontSize="10" textAnchor="middle">
                            {pt.label}
                          </text>
                        </g>
                      ))}

                      {/* Tooltip on active point */}
                      <g transform="translate(340, 20)">
                        <rect x="-65" y="-18" width="130" height="42" rx="8" fill="rgba(18, 18, 21, 0.95)" stroke="rgba(255, 255, 255, 0.16)" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.8))" />
                        <text x="0" y="-4" fill="#ffffff" fontSize="10" fontWeight="700" textAnchor="middle">
                          Tháng 6 (Điểm cao nhất)
                        </text>
                        <text x="0" y="10" fill="#22c55e" fontSize="9.5" fontWeight="800" textAnchor="middle">
                          ● Kỳ này: 179.000.000₫
                        </text>
                        <text x="0" y="20" fill="#a1a1aa" fontSize="8.5" textAnchor="middle">
                          ● Kỳ trước: 62.000.000₫
                        </text>
                      </g>
                    </svg>
                  </div>
                </div>

                {/* Right Card: Sales Channels Source */}
                <div className="shadcn-card">
                  <div className="shadcn-card-header">
                    <h3 className="shadcn-card-title">Nguồn Doanh Thu</h3>
                    <div style={{ position: "relative" }}>
                      <select
                        value={sourcePeriod}
                        onChange={(e) => setSourcePeriod(e.target.value as "weekly" | "monthly")}
                        style={{
                          background: "#18181b",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          color: "#e4e4e7",
                          fontSize: "12px",
                          borderRadius: "6px",
                          padding: "4px 8px",
                          outline: "none",
                        }}
                      >
                        <option value="weekly">Tuần này</option>
                        <option value="monthly">Tháng này</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px", margin: "4px 0" }}>
                    <span style={{ fontSize: "24px", fontWeight: 800, color: "#fff" }}>
                      12,569 <span style={{ fontSize: "13px", color: "#a1a1aa", fontWeight: 500 }}>lượt</span>
                    </span>
                    <span className="shadcn-metric-trend up" style={{ fontSize: "11px" }}>↗ +2.1%</span>
                  </div>

                  {/* Segmented bar */}
                  <div className="shadcn-segmented-bar">
                    <div className="shadcn-segmented-seg" style={{ width: "55%", background: "#22c55e" }} title="Website: 55%" />
                    <div className="shadcn-segmented-seg" style={{ width: "30%", background: "#06b6d4" }} title="Showroom: 30%" />
                    <div className="shadcn-segmented-seg" style={{ width: "15%", background: "#f97316" }} title="Thuê DJ sự kiện: 15%" />
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#a1a1aa", marginBottom: "14px" }}>
                    <span><span className="shadcn-legend-dot" style={{ background: "#22c55e" }} />Website (55%)</span>
                    <span><span className="shadcn-legend-dot" style={{ background: "#06b6d4" }} />Showroom (30%)</span>
                    <span><span className="shadcn-legend-dot" style={{ background: "#f97316" }} />Thuê DJ (15%)</span>
                  </div>

                  {/* Metrics breakdown */}
                  <table className="shadcn-source-metrics-table">
                    <tbody>
                      <tr>
                        <td style={{ color: "#a1a1aa" }}>Chi phí thu hút (Acquisition)</td>
                        <td style={{ textAlign: "right", fontWeight: 700, color: "#fff" }}>12.000 ₫</td>
                        <td style={{ textAlign: "right", width: "55px", color: "#22c55e", fontWeight: 700, fontSize: "11px" }}>↗ 1.1%</td>
                      </tr>
                      <tr>
                        <td style={{ color: "#a1a1aa" }}>Thời gian chuyển đổi (Conversion)</td>
                        <td style={{ textAlign: "right", fontWeight: 700, color: "#fff" }}>1.2 ngày</td>
                        <td style={{ textAlign: "right", width: "55px", color: "#ef4444", fontWeight: 700, fontSize: "11px" }}>↘ 2.0%</td>
                      </tr>
                      <tr>
                        <td style={{ color: "#a1a1aa" }}>Tỷ suất sinh lời (ROI)</td>
                        <td style={{ textAlign: "right", fontWeight: 700, color: "#fff" }}>98%</td>
                        <td style={{ textAlign: "right", width: "55px", color: "#22c55e", fontWeight: 700, fontSize: "11px" }}>↗ 1.7%</td>
                      </tr>
                    </tbody>
                  </table>

                  <button
                    type="button"
                    onClick={() => handleTabChange("orders")}
                    style={{
                      marginTop: "auto",
                      padding: "10px",
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "8px",
                      color: "#e4e4e7",
                      fontSize: "12px",
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                      textAlign: "center",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(34, 197, 94, 0.12)";
                      e.currentTarget.style.color = "#4ade80";
                      e.currentTarget.style.borderColor = "rgba(34, 197, 94, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                      e.currentTarget.style.color = "#e4e4e7";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                    }}
                  >
                    Xem chi tiết báo cáo doanh số →
                  </button>
                </div>
              </div>

              {/* ROW 3: LEADERBOARD (40%), ACTIVITY DONUT (30%), RECENT ORDERS (30%) */}
              <div className="shadcn-row-grid-3">
                {/* Column 1: Top Selling Leaderboard */}
                <div className="shadcn-card">
                  <div className="shadcn-card-header">
                    <h3 className="shadcn-card-title">Top Sản Phẩm Bán Chạy</h3>
                    <select
                      value={leaderboardPeriod}
                      onChange={(e) => setLeaderboardPeriod(e.target.value as "month" | "all")}
                      style={{
                        background: "#18181b",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        color: "#e4e4e7",
                        fontSize: "12px",
                        borderRadius: "6px",
                        padding: "3px 6px",
                        outline: "none",
                      }}
                    >
                      <option value="month">Tháng này</option>
                      <option value="all">Tất cả thời gian</option>
                    </select>
                  </div>

                  <div style={{ overflowX: "auto", flex: 1 }}>
                    <table className="shadcn-mini-table">
                      <thead>
                        <tr>
                          <th style={{ width: "24px" }}>#</th>
                          <th>Sản phẩm & SKU</th>
                          <th>Doanh số</th>
                          <th style={{ textAlign: "right" }}>Tăng trưởng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(dashboardData?.top_selling_products && dashboardData.top_selling_products.length > 0
                          ? dashboardData.top_selling_products.slice(0, 5)
                          : products.slice(0, 5).map((p, idx) => ({
                            id: p.id,
                            name: p.name,
                            sku: p.sku || `VBP-00${idx + 1}`,
                            units_sold: 120 - idx * 18,
                            revenue: (p.sale_price || 2500000) * (120 - idx * 18),
                            sale_price: p.sale_price || 2500000,
                            slug: p.slug,
                            rental_enabled: p.rental_enabled,
                            stock_quantity: p.stock_quantity,
                          }))
                        ).map((item, idx) => (
                          <tr key={item.id || idx}>
                            <td style={{ fontWeight: 800, color: idx === 0 ? "#f59e0b" : idx === 1 ? "#94a3b8" : idx === 2 ? "#b45309" : "#71717a" }}>
                              {idx + 1}
                            </td>
                            <td>
                              <div style={{ fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "160px" }}>
                                {item.name}
                              </div>
                              <div style={{ fontSize: "10.5px", color: "#71717a" }}>{item.sku}</div>
                            </td>
                            <td>
                              <div style={{ fontWeight: 700, color: "#e4e4e7" }}>{item.units_sold} <span style={{ fontSize: "10px", color: "#71717a" }}>/ tháng</span></div>
                              <div style={{ fontSize: "10.5px", color: "#4ade80" }}>{formatCurrency(item.revenue || item.sale_price * item.units_sold)}</div>
                            </td>
                            <td style={{ textAlign: "right" }}>
                              <span style={{ fontSize: "11px", fontWeight: 700, color: "#22c55e", background: "rgba(34, 197, 94, 0.1)", padding: "2px 6px", borderRadius: "4px" }}>
                                ↗ +{38 - idx * 4}%
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleTabChange("products")}
                    style={{
                      marginTop: "12px",
                      padding: "8px",
                      background: "transparent",
                      border: "1px dashed rgba(255, 255, 255, 0.12)",
                      borderRadius: "6px",
                      color: "#a1a1aa",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    Xem tất cả {products.length || 0} sản phẩm trong kho →
                  </button>
                </div>

                {/* Column 2: Order Activity Tracking (Donut Chart) */}
                <div className="shadcn-card">
                  <div className="shadcn-card-header">
                    <h3 className="shadcn-card-title">Trạng Thái Đơn Hàng</h3>
                    <span className="shadcn-metric-info-icon">•••</span>
                  </div>

                  {/* SVG Donut Chart */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, padding: "10px 0" }}>
                    <div style={{ position: "relative", width: "150px", height: "150px" }}>
                      <svg viewBox="0 0 160 160" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                        {/* Background track */}
                        <circle cx="80" cy="80" r="58" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="18" />
                        {/* Segment 1: Completed 65% (Green) */}
                        <circle
                          cx="80"
                          cy="80"
                          r="58"
                          fill="none"
                          stroke="#22c55e"
                          strokeWidth="18"
                          strokeDasharray="236 364"
                          strokeDashoffset="0"
                        />
                        {/* Segment 2: Shipping 25% (Teal) */}
                        <circle
                          cx="80"
                          cy="80"
                          r="58"
                          fill="none"
                          stroke="#06b6d4"
                          strokeWidth="18"
                          strokeDasharray="91 364"
                          strokeDashoffset="-236"
                        />
                        {/* Segment 3: Pending 10% (Amber) */}
                        <circle
                          cx="80"
                          cy="80"
                          r="58"
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="18"
                          strokeDasharray="37 364"
                          strokeDashoffset="-327"
                        />
                      </svg>

                      {/* Center label */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          pointerEvents: "none",
                        }}
                      >
                        <span style={{ fontSize: "20px", fontWeight: 800, color: "#fff" }}>65%</span>
                        <span style={{ fontSize: "10px", color: "#71717a", textTransform: "uppercase", letterSpacing: "0.05em" }}>Hoàn thành</span>
                      </div>
                    </div>

                    {/* Donut Legend */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "100%", marginTop: "14px", fontSize: "11.5px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ color: "#e4e4e7" }}><span className="shadcn-legend-dot" style={{ background: "#22c55e" }} />Hoàn thành</span>
                        <strong style={{ color: "#22c55e" }}>65%</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ color: "#e4e4e7" }}><span className="shadcn-legend-dot" style={{ background: "#06b6d4" }} />Đang giao</span>
                        <strong style={{ color: "#06b6d4" }}>25%</strong>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ color: "#e4e4e7" }}><span className="shadcn-legend-dot" style={{ background: "#f59e0b" }} />Chờ xử lý</span>
                        <strong style={{ color: "#f59e0b" }}>10%</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 3: Recent Orders / Contacts */}
                <div className="shadcn-card">
                  <div className="shadcn-card-header">
                    <h3 className="shadcn-card-title">Đơn Hàng Gần Đây</h3>
                    <span className="shadcn-metric-info-icon">•••</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "2px", flex: 1 }}>
                    {(dashboardData?.recent_orders && dashboardData.recent_orders.length > 0
                      ? dashboardData.recent_orders.slice(0, 5)
                      : orders.slice(0, 5)
                    ).map((ord) => {
                      const initials = ord.shipping_name
                        ? ord.shipping_name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
                        : "VB";

                      return (
                        <div key={ord.id} className="shadcn-recent-item">
                          <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                            <div className="shadcn-avatar">{initials}</div>
                            <div style={{ minWidth: 0 }}>
                              <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {ord.shipping_name}
                              </div>
                              <div style={{ fontSize: "11px", color: "#71717a" }}>
                                {ord.shipping_phone || `#${ord.order_number}`}
                              </div>
                            </div>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ fontSize: "12px", fontWeight: 800, color: "#4ade80", whiteSpace: "nowrap" }}>
                              {formatCurrency(ord.total_amount)}
                            </span>
                            <button
                              type="button"
                              onClick={() => setSelectedOrderDetail(ord)}
                              className="shadcn-icon-btn-round"
                              title="Xem chi tiết đơn hàng"
                            >
                              →
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    {orders.length === 0 && (
                      <div style={{ padding: "24px 0", textAlign: "center", color: "#71717a", fontSize: "13px" }}>
                        Chưa có đơn hàng nào gần đây.
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleTabChange("orders")}
                    style={{
                      marginTop: "10px",
                      padding: "8px",
                      background: "transparent",
                      border: "1px dashed rgba(255, 255, 255, 0.12)",
                      borderRadius: "6px",
                      color: "#a1a1aa",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    Xem tất cả {orders.length || 0} đơn hàng →
                  </button>
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
                        Visual Builder
                        <span style={{ fontSize: "10px", fontWeight: 800, padding: "2px 6px", backgroundColor: "rgba(34, 197, 94, 0.15)", color: "#4ade80", border: "1px solid rgba(34, 197, 94, 0.4)", borderRadius: "4px" }}>
                          0s DELAY
                        </span>
                      </span>
                    </div>

                    <div style={{ height: "16px", width: "1px", backgroundColor: "#27272a" }} />

                    {/* Device Selector */}
                    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      {[
                        { id: "desktop", label: "Desktop (100%)" },
                        { id: "tablet", label: "Tablet" },
                        { id: "mobile", label: "Mobile" },
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
                        Tải lại
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
                      Mặc định
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
                      Hủy bỏ
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
                  {inlineEditor.label}
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
                      Tải ảnh lên
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
                <span style={{ fontSize: "11px", color: "#71717a" }}>Cập nhật live...</span>
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

          {/* TAB 2: PRODUCTS MANAGEMENT (MOCKUP EXACT SYSTEM) */}
          {activeTab === "products" && (
            <div>
              {/* Header with Emerald Pill Button */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
                <div>
                  <h2 style={{ fontSize: "22px", fontWeight: 800, margin: 0, color: "#ffffff", letterSpacing: "-0.01em" }}>
                    Quản lý Sản phẩm
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={handleOpenAddModal}
                  className="admin-pill-btn-green"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Thêm sản phẩm mới
                </button>
              </div>

              {/* 3-COLUMN LABELED SEARCH & FILTER BAR */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
                {/* Col 1: Tìm kiếm */}
                <div style={{ flex: "1 1 280px", minWidth: "220px" }}>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 600, color: "#d4d4d8", marginBottom: "8px" }}>
                    Tìm kiếm
                  </label>
                  <div style={{ position: "relative" }}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#71717a"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                      type="text"
                      value={productSearch}
                      onChange={(e) => {
                        setProductSearch(e.target.value);
                        setProductPage(1);
                      }}
                      placeholder="Tìm kiếm sản phẩm..."
                      style={{
                        width: "100%",
                        height: "42px",
                        paddingLeft: "40px",
                        paddingRight: productSearch ? "36px" : "14px",
                        backgroundColor: "#121215",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        borderRadius: "8px",
                        color: "#ffffff",
                        fontSize: "13px",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                    {productSearch && (
                      <button
                        type="button"
                        onClick={() => {
                          setProductSearch("");
                          setProductPage(1);
                        }}
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "none",
                          border: "none",
                          color: "#71717a",
                          cursor: "pointer",
                          fontSize: "13px",
                          padding: "4px",
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {/* Col 2: Lọc theo Danh mục */}
                <div style={{ flex: "0 1 240px", minWidth: "180px" }}>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 600, color: "#d4d4d8", marginBottom: "8px" }}>
                    Lọc theo Danh mục
                  </label>
                  <select
                    value={productCategoryFilter}
                    onChange={(e) => {
                      setProductCategoryFilter(e.target.value);
                      setProductPage(1);
                    }}
                    style={{
                      width: "100%",
                      height: "42px",
                      padding: "0 14px",
                      backgroundColor: "#121215",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "8px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                      cursor: "pointer",
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="all">Tất cả Danh mục</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Col 3: Lọc theo Trạng thái */}
                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 600, color: "#d4d4d8", marginBottom: "8px" }}>
                    Lọc theo Trạng thái
                  </label>
                  <div className="admin-filter-segmented-container">
                    {[
                      { id: "all", label: "Tất cả" },
                      { id: "sale", label: "Đang bán" },
                      { id: "rental", label: "Cho thuê" },
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          setProductStatusFilter(s.id);
                          setProductPage(1);
                        }}
                        className={`admin-filter-segmented-btn ${productStatusFilter === s.id ? "active" : ""}`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reset button if active */}
                {(productSearch || productCategoryFilter !== "all" || productStatusFilter !== "all") && (
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        setProductSearch("");
                        setProductCategoryFilter("all");
                        setProductStatusFilter("all");
                        setProductPage(1);
                      }}
                      className="admin-pill-btn-dark"
                      style={{ height: "42px" }}
                      title="Đặt lại bộ lọc"
                    >
                      ↺ Đặt lại
                    </button>
                  </div>
                )}
              </div>

              {/* PRODUCTS DATA TABLE (CARD CONTAINER) */}
              <div className="admin-card-container">
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)", color: "#9ca3af", fontSize: "12.5px", fontWeight: 600, backgroundColor: "#0f0f12" }}>
                        <th style={{ padding: "14px 16px", width: "40px", textAlign: "center" }}>
                          <input type="checkbox" style={{ accentColor: "#22c55e", width: "15px", height: "15px", cursor: "pointer", verticalAlign: "middle" }} />
                        </th>
                        <th style={{ padding: "14px 16px", width: "60px" }}>Ảnh</th>
                        <th style={{ padding: "14px 16px" }}>Tên sản phẩm & SKU</th>
                        <th style={{ padding: "14px 16px" }}>Danh mục</th>
                        <th style={{ padding: "14px 16px" }}>Giá bán / Giá thuê</th>
                        <th style={{ padding: "14px 16px", textAlign: "center" }}>Tồn kho</th>
                        <th style={{ padding: "14px 16px", textAlign: "center" }}>Trạng thái</th>
                        <th style={{ padding: "14px 16px", textAlign: "right" }}>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedProducts.length === 0 ? (
                        <tr>
                          <td colSpan={8} style={{ padding: "60px 20px", textAlign: "center", color: "#71717a" }}>
                            
                            <div style={{ fontSize: "15px", fontWeight: 700, color: "#ffffff", marginBottom: "6px" }}>
                              Không tìm thấy sản phẩm nào phù hợp
                            </div>
                            <div style={{ fontSize: "13px", color: "#a1a1aa", marginBottom: "16px" }}>
                              Vui lòng thử tìm kiếm bằng từ khóa khác hoặc xóa bộ lọc.
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setProductSearch("");
                                setProductCategoryFilter("all");
                                setProductStatusFilter("all");
                                setProductPage(1);
                              }}
                              className="admin-pill-btn-dark"
                            >
                              Xóa bộ lọc
                            </button>
                          </td>
                        </tr>
                      ) : (
                        paginatedProducts.map((p) => {
                          const primaryImg = p.images?.find((img) => img.is_primary)?.image_url || p.images?.[0]?.image_url || p.image_url;
                          const cat = categories.find((c) => c.id === p.category_id);

                          return (
                            <tr
                              key={p.id}
                              style={{
                                borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                                transition: "background-color 0.15s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.02)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent";
                              }}
                            >
                              {/* Checkbox */}
                              <td style={{ padding: "12px 16px", textAlign: "center" }}>
                                <input type="checkbox" style={{ accentColor: "#22c55e", width: "15px", height: "15px", cursor: "pointer", verticalAlign: "middle" }} />
                              </td>

                              {/* Thumbnail Box */}
                              <td style={{ padding: "12px 16px" }}>
                                <div className="admin-table-thumb-box">
                                  {primaryImg ? (
                                    <Image
                                      src={primaryImg.startsWith("/") ? primaryImg : `/${primaryImg}`}
                                      alt={p.name}
                                      width={40}
                                      height={40}
                                      style={{ objectFit: "contain", width: "100%", height: "100%" }}
                                    />
                                  ) : (
                                    <span style={{ fontSize: "10px", color: "#71717a" }}>No img</span>
                                  )}
                                </div>
                              </td>

                              {/* Name & SKU */}
                              <td style={{ padding: "12px 16px" }}>
                                <div style={{ fontWeight: 700, color: "#ffffff", fontSize: "13.5px", marginBottom: "3px" }}>
                                  {p.name}
                                </div>
                                <div style={{ fontSize: "11.5px", color: "#71717a", fontFamily: "monospace" }}>
                                  SKU: {p.sku || "VBP001"}
                                </div>
                              </td>

                              {/* Category */}
                              <td style={{ padding: "12px 16px", color: "#d4d4d8", fontSize: "13px" }}>
                                {cat?.name || "Chưa phân loại"}
                              </td>

                              {/* Price */}
                              <td style={{ padding: "12px 16px" }}>
                                <span style={{ fontWeight: 700, color: "#ffffff", fontSize: "13.5px" }}>
                                  {p.sale_enabled && p.sale_price ? formatCurrency(p.sale_price) : "N/A"}
                                </span>
                                <span style={{ color: "#71717a", fontSize: "12.5px" }}>
                                  {" "}/{" "}
                                  {p.rental_enabled && p.rental_price ? formatCurrency(p.rental_price) : "N/A"}
                                </span>
                              </td>

                              {/* Stock */}
                              <td style={{ padding: "12px 16px", textAlign: "center" }}>
                                <span className={`admin-stock-badge ${p.stock_quantity >= 20 ? "high" : p.stock_quantity > 0 ? "medium" : "low"}`}>
                                  {p.stock_quantity}
                                </span>
                              </td>

                              {/* Status */}
                              <td style={{ padding: "12px 16px", textAlign: "center" }}>
                                <div style={{ display: "inline-flex", gap: "6px", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
                                  {p.sale_enabled && (
                                    <span className="admin-status-pill-sale">Đang bán</span>
                                  )}
                                  {p.rental_enabled && (
                                    <span className="admin-status-pill-rental">Cho thuê</span>
                                  )}
                                  {!p.sale_enabled && !p.rental_enabled && (
                                    <span style={{ fontSize: "11.5px", color: "#71717a", padding: "3px 8px", background: "rgba(255,255,255,0.05)", borderRadius: "9999px" }}>
                                      Tạm ẩn
                                    </span>
                                  )}
                                </div>
                              </td>

                              {/* Actions */}
                              <td style={{ padding: "12px 16px", textAlign: "right" }}>
                                <div className="admin-action-row">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditModal(p)}
                                    className="admin-action-btn-col edit"
                                    title="Chỉnh sửa sản phẩm"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                    <span>Sửa</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteProduct(p.id, p.name, p.sku)}
                                    className="admin-action-btn-col delete"
                                    title="Xóa sản phẩm"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                      <line x1="18" y1="6" x2="6" y2="18" />
                                      <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                    <span>Xóa</span>
                                  </button>
                                  <Link
                                    href={`/products/${p.slug}`}
                                    target="_blank"
                                    className="admin-action-btn-col view"
                                    title="Xem trên trang cửa hàng"
                                  >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                      <circle cx="12" cy="12" r="3" />
                                    </svg>
                                    <span>Xem</span>
                                  </Link>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* MOCKUP EXACT PAGINATION BAR */}
                {productPageSize > 0 && totalPages > 0 && (
                  <div className="admin-pagination-bar">
                    {/* Left: < Trang 1 / 5 > */}
                    <div className="admin-pagination-stepper">
                      <button
                        type="button"
                        onClick={() => setProductPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="admin-pagination-stepper-btn"
                        title="Trang trước"
                      >
                        ‹
                      </button>
                      <span>
                        Trang <strong style={{ color: "#ffffff" }}>{currentPage}</strong> / {totalPages}
                      </span>
                      <button
                        type="button"
                        onClick={() => setProductPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="admin-pagination-stepper-btn"
                        title="Trang sau"
                      >
                        ›
                      </button>
                    </div>

                    {/* Right: « ‹ [ 1 ] 2 3 4 5 › » */}
                    <div className="admin-pagination-numbers">
                      <button
                        type="button"
                        onClick={() => setProductPage(1)}
                        disabled={currentPage === 1}
                        className="admin-pagination-nav-btn"
                        title="Trang đầu"
                      >
                        «
                      </button>
                      <button
                        type="button"
                        onClick={() => setProductPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="admin-pagination-nav-btn"
                        title="Trang trước"
                      >
                        ‹
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
                        .map((p, idx, arr) => {
                          const prev = arr[idx - 1];
                          const showEllipsis = prev && p - prev > 1;
                          return (
                            <span key={p} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                              {showEllipsis && <span style={{ color: "#71717a", padding: "0 2px" }}>...</span>}
                              <button
                                type="button"
                                onClick={() => setProductPage(p)}
                                className={`admin-pagination-page-btn ${p === currentPage ? "active" : ""}`}
                              >
                                {p}
                              </button>
                            </span>
                          );
                        })}

                      <button
                        type="button"
                        onClick={() => setProductPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="admin-pagination-nav-btn"
                        title="Trang sau"
                      >
                        ›
                      </button>
                      <button
                        type="button"
                        onClick={() => setProductPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className="admin-pagination-nav-btn"
                        title="Trang cuối"
                      >
                        »
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: ORDERS MANAGEMENT */}
          {activeTab === "orders" && (
            <div>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px", flexWrap: "wrap", gap: "16px" }}>
                <div>
                  <h2 style={{ fontSize: "24px", fontWeight: 800, margin: "0 0 6px 0", color: "#fff", display: "flex", alignItems: "center", gap: "10px" }}>
                    Quản Lý Đơn Hàng & Giao Nhận
                  </h2>
                  <p style={{ fontSize: "14px", color: "#a1a1aa", margin: 0 }}>
                    Theo dõi tiến độ đơn hàng bán thiết bị, trạng thái thanh toán và cập nhật giao vận
                  </p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={() => {
                      setOrderSearchQuery("");
                      setOrderStatusFilter("all");
                      setOrderPaymentFilter("all");
                      setOrderPage(1);
                    }}
                    style={{
                      padding: "8px 14px",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "6px",
                      color: "#e4e4e7",
                      fontSize: "12.5px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    Làm mới bộ lọc
                  </button>
                </div>
              </div>

              {/* 4 Metric Cards for Orders */}
              <div className="shadcn-metric-grid" style={{ marginBottom: "20px" }}>
                {/* Metric 1: Tổng đơn hàng */}
                <div className="shadcn-metric-card">
                  <div className="shadcn-metric-header">
                    <span className="shadcn-metric-title">Tổng Đơn Hàng</span>
                    
                  </div>
                  <div className="shadcn-metric-main">
                    <div className="shadcn-metric-val">{orders.length}</div>
                    <div className="shadcn-metric-subtext">Toàn bộ đơn trên hệ thống</div>
                  </div>
                </div>

                {/* Metric 2: Chờ xử lý */}
                <div className="shadcn-metric-card">
                  <div className="shadcn-metric-header">
                    <span className="shadcn-metric-title">Chờ Xử Lý</span>
                    
                  </div>
                  <div className="shadcn-metric-main">
                    <div className="shadcn-metric-val" style={{ color: "#facc15" }}>
                      {orders.filter((o) => o.status === "pending").length}
                    </div>
                    <div className="shadcn-metric-subtext">Cần xác nhận sớm</div>
                  </div>
                </div>

                {/* Metric 3: Đang giao hàng */}
                <div className="shadcn-metric-card">
                  <div className="shadcn-metric-header">
                    <span className="shadcn-metric-title">Đang Vận Chuyển</span>
                    
                  </div>
                  <div className="shadcn-metric-main">
                    <div className="shadcn-metric-val" style={{ color: "#60a5fa" }}>
                      {orders.filter((o) => o.status === "shipped" || o.status === "processing").length}
                    </div>
                    <div className="shadcn-metric-subtext">Đang chuẩn bị & giao hàng</div>
                  </div>
                </div>

                {/* Metric 4: Hoàn thành */}
                <div className="shadcn-metric-card">
                  <div className="shadcn-metric-header">
                    <span className="shadcn-metric-title">Đã Hoàn Thành</span>
                    
                  </div>
                  <div className="shadcn-metric-main">
                    <div className="shadcn-metric-val" style={{ color: "#4ade80" }}>
                      {orders.filter((o) => o.status === "completed").length}
                    </div>
                    <div className="shadcn-metric-subtext">Giao hàng thành công</div>
                  </div>
                </div>
              </div>

              {/* 3-COLUMN LABELED SEARCH & FILTER BAR */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
                {/* Col 1: Tìm kiếm */}
                <div style={{ flex: "1 1 280px", minWidth: "220px" }}>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 600, color: "#d4d4d8", marginBottom: "8px" }}>
                    Tìm kiếm đơn hàng
                  </label>
                  <div style={{ position: "relative" }}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#71717a"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                      type="text"
                      value={orderSearchQuery}
                      onChange={(e) => {
                        setOrderSearchQuery(e.target.value);
                        setOrderPage(1);
                      }}
                      placeholder="Mã đơn (#VNB...), tên khách, SĐT..."
                      style={{
                        width: "100%",
                        height: "42px",
                        paddingLeft: "40px",
                        paddingRight: orderSearchQuery ? "36px" : "14px",
                        backgroundColor: "#121215",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        borderRadius: "8px",
                        color: "#ffffff",
                        fontSize: "13px",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                    {orderSearchQuery && (
                      <button
                        type="button"
                        onClick={() => {
                          setOrderSearchQuery("");
                          setOrderPage(1);
                        }}
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "none",
                          border: "none",
                          color: "#71717a",
                          cursor: "pointer",
                          fontSize: "13px",
                          padding: "4px",
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {/* Col 2: Lọc Trạng Thái Đơn Hàng (Segmented) */}
                <div style={{ flex: "1 1 auto", overflowX: "auto" }}>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 600, color: "#d4d4d8", marginBottom: "8px" }}>
                    Trạng thái Đơn hàng
                  </label>
                  <div className="admin-filter-segmented-container" style={{ width: "max-content" }}>
                    {[
                      { id: "all", label: "Tất cả" },
                      { id: "pending", label: "Chờ xử lý" },
                      { id: "processing", label: "Chuẩn bị" },
                      { id: "shipped", label: "Đang giao" },
                      { id: "completed", label: "Hoàn thành" },
                      { id: "cancelled", label: "Đã hủy" },
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          setOrderStatusFilter(s.id);
                          setOrderPage(1);
                        }}
                        className={`admin-filter-segmented-btn ${orderStatusFilter === s.id ? "active" : ""}`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Col 3: Thanh toán */}
                <div style={{ minWidth: "150px" }}>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 600, color: "#d4d4d8", marginBottom: "8px" }}>
                    Thanh toán
                  </label>
                  <select
                    value={orderPaymentFilter}
                    onChange={(e) => {
                      setOrderPaymentFilter(e.target.value);
                      setOrderPage(1);
                    }}
                    style={{
                      width: "100%",
                      height: "42px",
                      padding: "0 14px",
                      backgroundColor: "#121215",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      borderRadius: "8px",
                      color: "#ffffff",
                      fontSize: "13px",
                      outline: "none",
                      cursor: "pointer",
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="all">Tất cả thanh toán</option>
                    <option value="paid">Đã thanh toán</option>
                    <option value="unpaid">Chưa thanh toán</option>
                    <option value="refunded">Đã hoàn tiền</option>
                  </select>
                </div>
              </div>

              {/* ORDERS DATA TABLE */}
              <div className="admin-card-container">
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)", color: "#9ca3af", fontSize: "12.5px", fontWeight: 600, backgroundColor: "#0f0f12" }}>
                        <th style={{ padding: "14px 16px", width: "40px", textAlign: "center" }}>
                          <input type="checkbox" style={{ accentColor: "#22c55e", width: "15px", height: "15px", cursor: "pointer", verticalAlign: "middle" }} />
                        </th>
                        <th style={{ padding: "14px 16px" }}>Mã Đơn / Ngày</th>
                        <th style={{ padding: "14px 16px" }}>Khách Hàng</th>
                        <th style={{ padding: "14px 16px" }}>Địa Chỉ</th>
                        <th style={{ padding: "14px 16px" }}>Số lượng</th>
                        <th style={{ padding: "14px 16px" }}>Tổng Tiền</th>
                        <th style={{ padding: "14px 16px", textAlign: "center" }}>Trạng Thái Đơn</th>
                        <th style={{ padding: "14px 16px", textAlign: "center" }}>Thanh Toán</th>
                        <th style={{ padding: "14px 16px", textAlign: "right" }}>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={9} style={{ padding: "60px 20px", textAlign: "center", color: "#71717a" }}>
                            
                            <div style={{ fontSize: "15px", fontWeight: 700, color: "#ffffff", marginBottom: "6px" }}>
                              Không tìm thấy đơn hàng nào
                            </div>
                            <div style={{ fontSize: "13px", color: "#a1a1aa", marginBottom: "16px" }}>
                              Thử thay đổi từ khóa hoặc bộ lọc trạng thái.
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setOrderSearchQuery("");
                                setOrderStatusFilter("all");
                                setOrderPaymentFilter("all");
                                setOrderPage(1);
                              }}
                              className="admin-pill-btn-dark"
                            >
                              Xóa bộ lọc
                            </button>
                          </td>
                        </tr>
                      ) : (
                        paginatedOrders.map((o) => {
                          const itemCount = o.items ? o.items.reduce((sum, item) => sum + item.quantity, 0) : 0;
                          return (
                            <tr
                              key={o.id}
                              style={{
                                borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                                transition: "background-color 0.15s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.02)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent";
                              }}
                            >
                              {/* Checkbox */}
                              <td style={{ padding: "12px 16px", textAlign: "center" }}>
                                <input type="checkbox" style={{ accentColor: "#22c55e", width: "15px", height: "15px", cursor: "pointer", verticalAlign: "middle" }} />
                              </td>

                              {/* Order number & Date */}
                              <td style={{ padding: "12px 16px" }}>
                                <div style={{ color: "#22c55e", fontWeight: 700, fontFamily: "monospace", fontSize: "13.5px" }}>
                                  #{o.order_number}
                                </div>
                                <div style={{ fontSize: "11.5px", color: "#71717a" }}>
                                  {new Date(o.created_at).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })}
                                </div>
                              </td>

                              {/* Customer */}
                              <td style={{ padding: "12px 16px" }}>
                                <div style={{ fontWeight: 700, color: "#ffffff", fontSize: "13px" }}>{o.shipping_name}</div>
                                <div style={{ fontSize: "11.5px", color: "#a1a1aa" }}>SĐT: {o.shipping_phone}</div>
                              </td>

                              {/* Shipping Address */}
                              <td style={{ padding: "12px 16px", maxWidth: "200px" }}>
                                <div
                                  style={{
                                    fontSize: "12px",
                                    color: "#cbd5e1",
                                    lineHeight: 1.4,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                  title={o.shipping_address}
                                >
                                  {o.shipping_address}
                                </div>
                              </td>

                              {/* Items count */}
                              <td style={{ padding: "12px 16px" }}>
                                <span style={{ fontSize: "12px", color: "#d4d4d8", fontWeight: 600 }}>
                                  {itemCount > 0 ? `${itemCount} SP` : `${o.items?.length || 1} SP`}
                                </span>
                              </td>

                              {/* Total amount */}
                              <td style={{ padding: "12px 16px" }}>
                                <strong style={{ color: "#ffffff", fontSize: "13.5px", fontWeight: 800 }}>
                                  {formatCurrency(o.total_amount)}
                                </strong>
                              </td>

                              {/* Status select */}
                              <td style={{ padding: "12px 16px", textAlign: "center" }}>
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
                                    padding: "4px 10px",
                                    backgroundColor:
                                      o.status === "completed"
                                        ? "rgba(34, 197, 94, 0.15)"
                                        : o.status === "cancelled"
                                          ? "rgba(239, 68, 68, 0.15)"
                                          : o.status === "shipped"
                                            ? "rgba(168, 85, 247, 0.15)"
                                            : o.status === "processing"
                                              ? "rgba(59, 130, 246, 0.15)"
                                              : "rgba(234, 179, 8, 0.15)",
                                    color:
                                      o.status === "completed"
                                        ? "#4ade80"
                                        : o.status === "cancelled"
                                          ? "#f87171"
                                          : o.status === "shipped"
                                            ? "#c084fc"
                                            : o.status === "processing"
                                              ? "#60a5fa"
                                              : "#facc15",
                                    border: `1px solid ${o.status === "completed"
                                      ? "rgba(34, 197, 94, 0.4)"
                                      : o.status === "cancelled"
                                        ? "rgba(239, 68, 68, 0.4)"
                                        : o.status === "shipped"
                                          ? "rgba(168, 85, 247, 0.4)"
                                          : o.status === "processing"
                                            ? "rgba(59, 130, 246, 0.4)"
                                            : "rgba(234, 179, 8, 0.4)"
                                      }`,
                                    borderRadius: "9999px",
                                    fontSize: "11.5px",
                                    fontWeight: 700,
                                    cursor: "pointer",
                                    outline: "none",
                                  }}
                                >
                                  <option value="pending">Chờ xử lý</option>
                                  <option value="confirmed">Đã xác nhận</option>
                                  <option value="processing">Đang chuẩn bị</option>
                                  <option value="shipped">Đang giao hàng</option>
                                  <option value="completed">Hoàn thành</option>
                                  <option value="cancelled">Đã hủy</option>
                                </select>
                              </td>

                              {/* Payment status */}
                              <td style={{ padding: "12px 16px", textAlign: "center" }}>
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
                                    padding: "4px 10px",
                                    backgroundColor:
                                      o.payment_status === "paid"
                                        ? "rgba(34, 197, 94, 0.15)"
                                        : o.payment_status === "refunded"
                                          ? "rgba(239, 68, 68, 0.15)"
                                          : "rgba(234, 179, 8, 0.15)",
                                    color:
                                      o.payment_status === "paid"
                                        ? "#4ade80"
                                        : o.payment_status === "refunded"
                                          ? "#f87171"
                                          : "#facc15",
                                    border: `1px solid ${o.payment_status === "paid"
                                      ? "rgba(34, 197, 94, 0.4)"
                                      : o.payment_status === "refunded"
                                        ? "rgba(239, 68, 68, 0.4)"
                                        : "rgba(234, 179, 8, 0.4)"
                                      }`,
                                    borderRadius: "9999px",
                                    fontSize: "11.5px",
                                    fontWeight: 700,
                                    cursor: "pointer",
                                    outline: "none",
                                  }}
                                >
                                  <option value="unpaid">Chưa TT</option>
                                  <option value="paid">Đã TT</option>
                                  <option value="refunded">Hoàn tiền</option>
                                </select>
                              </td>

                              {/* Actions */}
                              <td style={{ padding: "12px 16px", textAlign: "right" }}>
                                <button
                                  type="button"
                                  onClick={() => setSelectedOrderDetail(o)}
                                  className="admin-action-btn-col view"
                                  title="Xem chi tiết đơn hàng"
                                >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                  </svg>
                                  <span>Xem</span>
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* MOCKUP PAGINATION FOOTER */}
                {orderPageSize > 0 && orderTotalPages > 0 && (
                  <div className="admin-pagination-bar">
                    <div className="admin-pagination-stepper">
                      <button
                        type="button"
                        onClick={() => setOrderPage((p) => Math.max(1, p - 1))}
                        disabled={currentOrderPage === 1}
                        className="admin-pagination-stepper-btn"
                        title="Trang trước"
                      >
                        ‹
                      </button>
                      <span>
                        Trang <strong style={{ color: "#ffffff" }}>{currentOrderPage}</strong> / {orderTotalPages}
                      </span>
                      <button
                        type="button"
                        onClick={() => setOrderPage((p) => Math.min(orderTotalPages, p + 1))}
                        disabled={currentOrderPage === orderTotalPages}
                        className="admin-pagination-stepper-btn"
                        title="Trang sau"
                      >
                        ›
                      </button>
                    </div>

                    <div className="admin-pagination-numbers">
                      <button
                        type="button"
                        onClick={() => setOrderPage(1)}
                        disabled={currentOrderPage === 1}
                        className="admin-pagination-nav-btn"
                        title="Trang đầu"
                      >
                        «
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderPage((p) => Math.max(1, p - 1))}
                        disabled={currentOrderPage === 1}
                        className="admin-pagination-nav-btn"
                        title="Trang trước"
                      >
                        ‹
                      </button>

                      {Array.from({ length: orderTotalPages }, (_, i) => i + 1)
                        .filter((p) => p === 1 || p === orderTotalPages || Math.abs(p - currentOrderPage) <= 2)
                        .map((p, idx, arr) => {
                          const prev = arr[idx - 1];
                          const showEllipsis = prev && p - prev > 1;
                          return (
                            <span key={p} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                              {showEllipsis && <span style={{ color: "#71717a", padding: "0 2px" }}>...</span>}
                              <button
                                type="button"
                                onClick={() => setOrderPage(p)}
                                className={`admin-pagination-page-btn ${p === currentOrderPage ? "active" : ""}`}
                              >
                                {p}
                              </button>
                            </span>
                          );
                        })}

                      <button
                        type="button"
                        onClick={() => setOrderPage((p) => Math.min(orderTotalPages, p + 1))}
                        disabled={currentOrderPage === orderTotalPages}
                        className="admin-pagination-nav-btn"
                        title="Trang sau"
                      >
                        ›
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderPage(orderTotalPages)}
                        disabled={currentOrderPage === orderTotalPages}
                        className="admin-pagination-nav-btn"
                        title="Trang cuối"
                      >
                        »
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: STAFF & ACCOUNT MANAGEMENT */}
          {activeTab === "staff" && user?.role === "admin" && (
            <div>
              {/* Header with Emerald Pill Button */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
                <div>
                  <h2 style={{ fontSize: "22px", fontWeight: 800, margin: 0, color: "#ffffff", letterSpacing: "-0.01em" }}>
                    Quản trị Tài khoản & Phân quyền Nhân sự
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStaffFullName("");
                    setStaffEmail("");
                    setStaffPhone("");
                    setStaffPassword("");
                    setStaffRole("staff");
                    setShowAddStaffModal(true);
                  }}
                  className="admin-pill-btn-green"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Thêm nhân sự mới
                </button>
              </div>

              {/* 4 Metric Cards for Staff */}
              <div className="shadcn-metric-grid" style={{ marginBottom: "20px" }}>
                <div className="shadcn-metric-card">
                  <div className="shadcn-metric-header">
                    <span className="shadcn-metric-title">Tổng Nhân Sự</span>
                  </div>
                  <div className="shadcn-metric-main">
                    <div className="shadcn-metric-val">{staffUsers.length}</div>
                    <div className="shadcn-metric-subtext">Tài khoản trong hệ thống</div>
                  </div>
                </div>

                <div className="shadcn-metric-card">
                  <div className="shadcn-metric-header">
                    <span className="shadcn-metric-title">Quản Trị Viên (Admin)</span>
                  </div>
                  <div className="shadcn-metric-main">
                    <div className="shadcn-metric-val" style={{ color: "#eab308" }}>
                      {staffUsers.filter((u) => u.role === "admin").length}
                    </div>
                    <div className="shadcn-metric-subtext">Toàn quyền kiểm soát</div>
                  </div>
                </div>

                <div className="shadcn-metric-card">
                  <div className="shadcn-metric-header">
                    <span className="shadcn-metric-title">Nhân Viên (Staff)</span>
                  </div>
                  <div className="shadcn-metric-main">
                    <div className="shadcn-metric-val" style={{ color: "#4ade80" }}>
                      {staffUsers.filter((u) => u.role === "staff").length}
                    </div>
                    <div className="shadcn-metric-subtext">Vận hành đơn & sản phẩm</div>
                  </div>
                </div>

                <div className="shadcn-metric-card">
                  <div className="shadcn-metric-header">
                    <span className="shadcn-metric-title">Đang Hoạt Động</span>
                  </div>
                  <div className="shadcn-metric-main">
                    <div className="shadcn-metric-val" style={{ color: "#22c55e" }}>
                      {staffUsers.filter((u) => u.is_active).length}
                    </div>
                    <div className="shadcn-metric-subtext">Được phép đăng nhập</div>
                  </div>
                </div>
              </div>

              {/* 3-COLUMN LABELED SEARCH & FILTER BAR */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
                {/* Col 1: Tìm kiếm */}
                <div style={{ flex: "1 1 280px", minWidth: "220px" }}>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 600, color: "#d4d4d8", marginBottom: "8px" }}>
                    Tìm kiếm nhân sự
                  </label>
                  <div style={{ position: "relative" }}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#71717a"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                      type="text"
                      value={staffSearchQuery}
                      onChange={(e) => setStaffSearchQuery(e.target.value)}
                      placeholder="Gmail, SĐT, Tên nhân viên..."
                      style={{
                        width: "100%",
                        height: "42px",
                        paddingLeft: "40px",
                        paddingRight: staffSearchQuery ? "36px" : "14px",
                        backgroundColor: "#121215",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        borderRadius: "8px",
                        color: "#ffffff",
                        fontSize: "13px",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                    {staffSearchQuery && (
                      <button
                        type="button"
                        onClick={() => setStaffSearchQuery("")}
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "none",
                          border: "none",
                          color: "#71717a",
                          cursor: "pointer",
                          fontSize: "13px",
                          padding: "4px",
                        }}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {/* Col 2: Segmented Role Pills */}
                <div>
                  <label style={{ display: "block", fontSize: "12.5px", fontWeight: 600, color: "#d4d4d8", marginBottom: "8px" }}>
                    Vai trò
                  </label>
                  <div className="admin-filter-segmented-container">
                    {[
                      { id: "all", label: `Tất cả (${staffUsers.length})` },
                      { id: "admin", label: `Admin (${staffUsers.filter((u) => u.role === "admin").length})` },
                      { id: "staff", label: `Staff (${staffUsers.filter((u) => u.role === "staff").length})` },
                    ].map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setStaffRoleFilter(s.id)}
                        className={`admin-filter-segmented-btn ${staffRoleFilter === s.id ? "active" : ""}`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Staff Table */}
              <div className="admin-card-container">
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)", color: "#9ca3af", fontSize: "12.5px", fontWeight: 600, backgroundColor: "#0f0f12" }}>
                        <th style={{ padding: "14px 16px", width: "40px", textAlign: "center" }}>
                          <input type="checkbox" style={{ accentColor: "#22c55e", width: "15px", height: "15px", cursor: "pointer", verticalAlign: "middle" }} />
                        </th>
                        <th style={{ padding: "14px 16px" }}>Nhân Viên</th>
                        <th style={{ padding: "14px 16px" }}>Email / Gmail</th>
                        <th style={{ padding: "14px 16px" }}>Số Điện Thoại</th>
                        <th style={{ padding: "14px 16px", textAlign: "center" }}>Vai Trò</th>
                        <th style={{ padding: "14px 16px", textAlign: "center" }}>Trạng Thái</th>
                        <th style={{ padding: "14px 16px", textAlign: "right" }}>Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {staffUsers
                        .filter((u) => {
                          const matchRole = staffRoleFilter === "all" || u.role === staffRoleFilter;
                          const matchSearch =
                            !staffSearchQuery.trim() ||
                            u.email.toLowerCase().includes(staffSearchQuery.toLowerCase().trim()) ||
                            (u.phone && u.phone.includes(staffSearchQuery.trim())) ||
                            (u.full_name && u.full_name.toLowerCase().includes(staffSearchQuery.toLowerCase().trim()));
                          return matchRole && matchSearch;
                        })
                        .map((u) => {
                          const isSelf = u.id === user?.id || u.email === user?.email;
                          return (
                            <tr
                              key={u.id}
                              style={{
                                borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                                transition: "background-color 0.15s ease",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.02)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent";
                              }}
                            >
                              {/* Checkbox */}
                              <td style={{ padding: "12px 16px", textAlign: "center" }}>
                                <input type="checkbox" style={{ accentColor: "#22c55e", width: "15px", height: "15px", cursor: "pointer", verticalAlign: "middle" }} />
                              </td>

                              {/* Name & Avatar */}
                              <td style={{ padding: "12px 16px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                  <div
                                    style={{
                                      width: "34px",
                                      height: "34px",
                                      borderRadius: "50%",
                                      backgroundColor:
                                        u.role === "admin"
                                          ? "rgba(234, 179, 8, 0.18)"
                                          : "rgba(34, 197, 94, 0.2)",
                                      color:
                                        u.role === "admin"
                                          ? "#facc15"
                                          : "#4ade80",
                                      border: `1px solid ${u.role === "admin"
                                        ? "rgba(234, 179, 8, 0.4)"
                                        : "rgba(34, 197, 94, 0.4)"
                                        }`,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      fontWeight: 800,
                                      fontSize: "13px",
                                      flexShrink: 0,
                                    }}
                                  >
                                    {(u.full_name || u.email).charAt(0).toUpperCase()}
                                  </div>
                                  <div>
                                    <div style={{ fontWeight: 700, color: "#ffffff", fontSize: "13.5px" }}>
                                      {u.full_name || "Chưa đặt tên"}
                                    </div>
                                    {isSelf && (
                                      <span style={{ fontSize: "10.5px", color: "#22c55e", fontWeight: 700, display: "block" }}>
                                        (Tài khoản của bạn)
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </td>

                              {/* Email */}
                              <td style={{ padding: "12px 16px", color: "#e4e4e7", fontFamily: "monospace", fontSize: "12.5px" }}>
                                {u.email}
                              </td>

                              {/* Phone */}
                              <td style={{ padding: "12px 16px" }}>
                                {u.phone ? (
                                  <span style={{ color: "#4ade80", fontWeight: 700, fontSize: "12.5px" }}>
                                    SĐT: {u.phone}
                                  </span>
                                ) : (
                                  <span style={{ color: "#71717a", fontStyle: "italic", fontSize: "12px" }}>
                                    Chưa cập nhật
                                  </span>
                                )}
                              </td>

                              {/* Role */}
                              <td style={{ padding: "12px 16px", textAlign: "center" }}>
                                <span
                                  className={`shadcn-badge-pill ${u.role === "admin" ? "warning" : u.role === "staff" ? "info" : "neutral"}`}
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "3px 12px",
                                    borderRadius: "9999px",
                                    fontSize: "11.5px",
                                    fontWeight: 700,
                                    backgroundColor: u.role === "admin" ? "#eab308" : u.role === "staff" ? "#2563eb" : "#475569",
                                    color: u.role === "admin" ? "#000000" : "#ffffff",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {u.role === "admin" ? "Admin" : u.role === "staff" ? "Staff" : "User"}
                                </span>
                              </td>

                              {/* Status */}
                              <td style={{ padding: "12px 16px", textAlign: "center" }}>
                                <span
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "6px",
                                    padding: "3px 12px",
                                    borderRadius: "9999px",
                                    fontSize: "11.5px",
                                    fontWeight: 600,
                                    backgroundColor: u.is_active ? "#16a34a" : "#dc2626",
                                    color: "#ffffff",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  <span
                                    style={{
                                      width: "6px",
                                      height: "6px",
                                      borderRadius: "50%",
                                      backgroundColor: "#ffffff",
                                    }}
                                  />
                                  {u.is_active ? "Hoạt động" : "Đã khóa"}
                                </span>
                              </td>

                              {/* Actions */}
                              <td style={{ padding: "12px 16px", textAlign: "right" }}>
                                {isSelf ? (
                                  <span style={{ fontSize: "12px", color: "#71717a", fontStyle: "italic" }}>
                                    Đang đăng nhập
                                  </span>
                                ) : (
                                  <div style={{ display: "inline-flex", gap: "8px" }}>
                                    <button
                                      type="button"
                                      onClick={() => handleToggleStaffStatus(u)}
                                      className="admin-action-btn-text"
                                      title={u.is_active ? "Khóa tài khoản" : "Mở khóa tài khoản"}
                                    >
                                      {u.is_active ? "Khóa" : "Mở"}
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteStaff(u)}
                                      className="admin-action-btn-text delete"
                                      title="Xóa tài khoản vĩnh viễn"
                                    >
                                      ✕ Xóa
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      {staffUsers.length === 0 && !isStaffLoading && (
                        <tr>
                          <td colSpan={7} style={{ padding: "40px", textAlign: "center", color: "#71717a" }}>
                            Chưa có tài khoản nhân sự nào. Bấm nút &quot;+ Thêm nhân sự mới&quot; ở góc trên để tạo mới.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CATEGORIES MANAGEMENT */}
          {activeTab === "categories" && (
            <div>
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "20px",
                  flexWrap: "wrap",
                  gap: "14px",
                }}
              >
                <div>
                  <h2 style={{ fontSize: "24px", fontWeight: 800, margin: "0 0 6px 0", color: "#fff", display: "flex", alignItems: "center", gap: "10px" }}>
                    Quản Lý Danh Mục Thiết Bị
                  </h2>
                  <p style={{ margin: 0, fontSize: "14px", color: "#a1a1aa" }}>
                    Phân loại thiết bị âm thanh, DJ, sân khấu và phụ kiện chuyên nghiệp cho cửa hàng
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setCatNameInput("");
                    setCatSlugInput("");
                    setCatDescInput("");
                    setShowAddCategoryModal(true);
                  }}
                  className="admin-pill-btn-green"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  <span>Thêm danh mục mới</span>
                </button>
              </div>

              {/* 3 Metric Cards for Categories */}
              <div className="shadcn-metric-grid" style={{ marginBottom: "20px" }}>
                <div className="shadcn-metric-card">
                  <div className="shadcn-metric-header">
                    <span className="shadcn-metric-title">Tổng Số Danh Mục</span>
                    
                  </div>
                  <div className="shadcn-metric-main">
                    <div className="shadcn-metric-val">{categories.length}</div>
                    <div className="shadcn-metric-subtext">Danh mục trong hệ thống</div>
                  </div>
                </div>

                <div className="shadcn-metric-card">
                  <div className="shadcn-metric-header">
                    <span className="shadcn-metric-title">Sản Phẩm Đã Phân Loại</span>
                    
                  </div>
                  <div className="shadcn-metric-main">
                    <div className="shadcn-metric-val" style={{ color: "#4ade80" }}>
                      {products.length}
                    </div>
                    <div className="shadcn-metric-subtext">Thiết bị đang gán danh mục</div>
                  </div>
                </div>

                <div className="shadcn-metric-card">
                  <div className="shadcn-metric-header">
                    <span className="shadcn-metric-title">Danh Mục Đang Có Hàng</span>
                    
                  </div>
                  <div className="shadcn-metric-main">
                    <div className="shadcn-metric-val" style={{ color: "#60a5fa" }}>
                      {categories.filter((c) => products.some((p) => p.category_id === c.id)).length}
                    </div>
                    <div className="shadcn-metric-subtext">Có ít nhất 1 sản phẩm</div>
                  </div>
                </div>
              </div>

              {/* Quick Search */}
              <div
                style={{
                  backgroundColor: "#161618",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "12px",
                  padding: "16px 20px",
                  marginBottom: "20px",
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.35)",
                }}
              >
                <div style={{ position: "relative", flex: 1 }}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#a1a1aa"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    value={categorySearchQuery}
                    onChange={(e) => setCategorySearchQuery(e.target.value)}
                    placeholder="Tìm nhanh danh mục theo tên, đường dẫn (slug), mô tả..."
                    style={{
                      width: "100%",
                      height: "44px",
                      paddingLeft: "42px",
                      paddingRight: categorySearchQuery ? "40px" : "16px",
                      backgroundColor: "#0d0d0f",
                      border: "1px solid rgba(255, 255, 255, 0.14)",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "13.5px",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 0.2s, box-shadow 0.2s",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#22c55e";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(34, 197, 94, 0.15)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.14)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                  {categorySearchQuery && (
                    <button
                      type="button"
                      onClick={() => setCategorySearchQuery("")}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        color: "#71717a",
                        cursor: "pointer",
                        fontSize: "14px",
                        padding: "4px 6px",
                      }}
                      title="Xóa tìm kiếm"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Table of categories */}
              <div className="admin-card-container">
                <div style={{ overflowX: "auto" }}>
                  <table className="shadcn-data-table">
                    <thead>
                      <tr>
                        <th>Tên Danh Mục</th>
                        <th>Đường Dẫn (Slug)</th>
                        <th>Mô Tả</th>
                        <th>Số Sản Phẩm</th>
                        <th style={{ textAlign: "right" }}>Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCategories.map((cat) => {
                        const prodCount = products.filter((p) => p.category_id === cat.id).length;
                        return (
                          <tr key={cat.id}>
                            <td style={{ fontWeight: 700, color: "#fff" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                
                                <span style={{ fontSize: "14px" }}>{cat.name}</span>
                              </div>
                            </td>
                            <td style={{ color: "#4ade80", fontFamily: "monospace", fontSize: "12.5px" }}>
                              /{cat.slug}
                            </td>
                            <td style={{ color: "#a1a1aa", maxWidth: "280px" }}>
                              <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontSize: "13px" }}>
                                {cat.description || "—"}
                              </div>
                            </td>
                            <td>
                              <span
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  padding: "3px 12px",
                                  borderRadius: "9999px",
                                  fontSize: "11.5px",
                                  fontWeight: 600,
                                  backgroundColor: prodCount > 0 ? "#16a34a" : "rgba(255, 255, 255, 0.05)",
                                  color: prodCount > 0 ? "#ffffff" : "#a1a1aa",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {prodCount} sản phẩm
                              </span>
                            </td>
                            <td style={{ textAlign: "right" }}>
                              <div className="admin-action-row">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingCategory(cat);
                                    setCatNameInput(cat.name);
                                    setCatSlugInput(cat.slug);
                                    setCatDescInput(cat.description || "");
                                    setShowEditCategoryModal(true);
                                  }}
                                  className="admin-action-btn-col edit"
                                  title="Chỉnh sửa danh mục"
                                >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                  </svg>
                                  <span>Sửa</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteCategory(cat)}
                                  className="admin-action-btn-col delete"
                                  title="Xóa danh mục"
                                >
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                  </svg>
                                  <span>Xóa</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      {filteredCategories.length === 0 && (
                        <tr>
                          <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: "#71717a" }}>
                            Không tìm thấy danh mục nào phù hợp.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: STORE SETTINGS */}
          {activeTab === "settings" && user?.role === "admin" && (
            <div>
              {/* Header with Save Button */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
                <div>
                  <h2 style={{ fontSize: "24px", fontWeight: 800, margin: "0 0 6px 0", color: "#fff", display: "flex", alignItems: "center", gap: "10px" }}>
                    Cài Đặt Hệ Thống & Cửa Hàng
                  </h2>
                  <p style={{ margin: 0, fontSize: "14px", color: "#a1a1aa" }}>
                    Quản lý thông tin thương hiệu, hotline bán hàng, hệ thống showroom (Đà Nẵng, Huế, TP.HCM), dịch vụ thuê và tích hợp Messenger
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const form = document.getElementById("store-settings-form") as HTMLFormElement;
                    if (form) form.requestSubmit();
                  }}
                  disabled={isStoreSettingsSaving}
                  className="admin-pill-btn-green"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                  <span>{isStoreSettingsSaving ? "Đang lưu..." : "Lưu thay đổi"}</span>
                </button>
              </div>

              {isStoreSettingsLoading ? (
                <div style={{ padding: "60px 20px", textAlign: "center", color: "#a1a1aa" }}>
                  Đang tải thông tin cài đặt cửa hàng...
                </div>
              ) : (
                <form id="store-settings-form" onSubmit={handleSaveStoreSettings}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "20px", marginBottom: "24px" }}>
                    {/* Card 1: Thương hiệu & Bán hàng */}
                    <div
                      style={{
                        backgroundColor: "#121215",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "12px",
                        padding: "24px",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.35)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "12px" }}>
                        
                        <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#fff", margin: 0 }}>
                          Thông Tin Thương Hiệu & Bán Hàng
                        </h3>
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#d4d4d8", marginBottom: "6px" }}>
                          Tên Cửa Hàng / Thương Hiệu <span style={{ color: "#ef4444" }}>*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={storeSettings.store_name}
                          onChange={(e) => setStoreSettings({ ...storeSettings, store_name: e.target.value })}
                          className="shadcn-input-control"
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#d4d4d8", marginBottom: "6px" }}>
                          Số Điện Thoại Bán Hàng (Hotline) <span style={{ color: "#ef4444" }}>*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={storeSettings.phone}
                          onChange={(e) => setStoreSettings({ ...storeSettings, phone: e.target.value })}
                          className="shadcn-input-control"
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#d4d4d8", marginBottom: "6px" }}>
                          Email Chăm Sóc Khách Hàng
                        </label>
                        <input
                          type="email"
                          value={storeSettings.email || ""}
                          onChange={(e) => setStoreSettings({ ...storeSettings, email: e.target.value })}
                          className="shadcn-input-control"
                          placeholder="contact@vanbass.vn"
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#d4d4d8", marginBottom: "6px" }}>
                          Giờ Mở Cửa & Phục Vụ
                        </label>
                        <input
                          type="text"
                          placeholder="08:00 - 21:00 từ Thứ 2 đến Chủ Nhật"
                          value={storeSettings.business_hours || ""}
                          onChange={(e) => setStoreSettings({ ...storeSettings, business_hours: e.target.value })}
                          className="shadcn-input-control"
                        />
                      </div>
                    </div>

                    {/* Card 2: Hệ thống Showroom & Chi nhánh */}
                    <div
                      style={{
                        backgroundColor: "#121215",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "12px",
                        padding: "24px",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.35)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "12px" }}>
                        
                        <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#fff", margin: 0 }}>
                          Hệ Thống Showroom & Chi Nhánh
                        </h3>
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#d4d4d8", marginBottom: "6px" }}>
                          Địa Chỉ Showroom Chính <span style={{ color: "#ef4444" }}>*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={storeSettings.address}
                          onChange={(e) => setStoreSettings({ ...storeSettings, address: e.target.value })}
                          className="shadcn-input-control"
                          placeholder="123 Nguyễn Văn Linh, Q. Hải Châu"
                        />
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#d4d4d8", marginBottom: "6px" }}>
                            Tỉnh / Thành Phố
                          </label>
                          <input
                            type="text"
                            value={storeSettings.city}
                            onChange={(e) => setStoreSettings({ ...storeSettings, city: e.target.value })}
                            className="shadcn-input-control"
                            placeholder="Đà Nẵng"
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#d4d4d8", marginBottom: "6px" }}>
                            Quốc Gia
                          </label>
                          <input
                            type="text"
                            value={storeSettings.country}
                            onChange={(e) => setStoreSettings({ ...storeSettings, country: e.target.value })}
                            className="shadcn-input-control"
                            placeholder="Việt Nam"
                          />
                        </div>
                      </div>

                      {/* Chi nhánh Huế Highlight Badge */}
                      <a
                        href="https://www.google.com/maps/place/V%26B+STUDIO+(Training+DJ+Pioneer)/@16.4946002,107.5903409,17z/data=!3m1!4b1!4m6!3m5!1s0x3141a10047a15223:0x298a389a412fb2d1!8m2!3d16.4946002!4d107.5903409!16s%2Fg%2F11m6bydlgc?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          backgroundColor: "rgba(34, 197, 94, 0.08)",
                          border: "1px dashed rgba(34, 197, 94, 0.35)",
                          borderRadius: "8px",
                          padding: "12px 14px",
                          marginTop: "4px",
                          display: "block",
                          textDecoration: "none",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                          <span style={{ color: "#4ade80", fontWeight: 700, fontSize: "12px" }}>
                            Showroom Miền Trung - Huế
                          </span>
                          <span style={{ color: "#22c55e", fontSize: "11px" }}>
                            Xem bản đồ ↗
                          </span>
                        </div>
                        <div style={{ color: "#fff", fontSize: "13px", fontWeight: 600 }}>
                          442 Chi Lăng, P. Phú Xuân, TP. Huế
                        </div>
                        <div style={{ color: "#a1a1aa", fontSize: "11.5px", marginTop: "2px" }}>
                          Hỗ trợ tư vấn, trải nghiệm âm thanh DJ trực tiếp
                        </div>
                      </a>
                    </div>

                    {/* Card 3: Dịch vụ Thuê thiết bị */}
                    <div
                      style={{
                        backgroundColor: "#121215",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "12px",
                        padding: "24px",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.35)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "12px" }}>
                        
                        <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#fff", margin: 0 }}>
                          Dịch Vụ Cho Thuê Thiết Bị DJ & Âm Thanh
                        </h3>
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#d4d4d8", marginBottom: "6px" }}>
                          Hotline Thuê Thiết Bị
                        </label>
                        <input
                          type="text"
                          value={storeSettings.rental_phone || ""}
                          onChange={(e) => setStoreSettings({ ...storeSettings, rental_phone: e.target.value })}
                          className="shadcn-input-control"
                          placeholder="0905123456"
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#d4d4d8", marginBottom: "6px" }}>
                          Email Thuê Thiết Bị
                        </label>
                        <input
                          type="email"
                          value={storeSettings.rental_email || ""}
                          onChange={(e) => setStoreSettings({ ...storeSettings, rental_email: e.target.value })}
                          className="shadcn-input-control"
                          placeholder="rental@vanbass.vn"
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#d4d4d8", marginBottom: "6px" }}>
                          Quy Trình & Hướng Dẫn Thuê
                        </label>
                        <textarea
                          rows={3}
                          value={storeSettings.rental_information || ""}
                          onChange={(e) => setStoreSettings({ ...storeSettings, rental_information: e.target.value })}
                          className="shadcn-textarea-control"
                          placeholder="Chính sách đặt cọc CCCD, giao nhận thiết bị tận nơi, hướng dẫn kết nối..."
                        />
                      </div>
                    </div>

                    {/* Card 4: Mạng xã hội & Chat Messenger */}
                    <div
                      style={{
                        backgroundColor: "#121215",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "12px",
                        padding: "24px",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.35)",
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid rgba(255, 255, 255, 0.06)", paddingBottom: "12px" }}>
                        
                        <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#fff", margin: 0 }}>
                          Kênh Mạng Xã Hội & Fanpage Messenger
                        </h3>
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#d4d4d8", marginBottom: "6px" }}>
                          Facebook Page ID / Username <span style={{ color: "#ef4444" }}>*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="vanbassmusiccenter"
                          value={storeSettings.facebook_page_id || ""}
                          onChange={(e) => setStoreSettings({ ...storeSettings, facebook_page_id: e.target.value })}
                          className="shadcn-input-control"
                        />
                        <small style={{ color: "#71717a", fontSize: "11.5px", display: "block", marginTop: "6px" }}>
                          Tên người dùng hoặc ID Fanpage (phục vụ nút &quot;Thuê qua Messenger&quot; trên toàn website)
                        </small>
                      </div>

                      {/* Messenger Preview Box */}
                      <div
                        style={{
                          backgroundColor: "rgba(59, 130, 246, 0.08)",
                          border: "1px solid rgba(59, 130, 246, 0.25)",
                          borderRadius: "8px",
                          padding: "14px",
                          marginTop: "8px",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#60a5fa", fontWeight: 700, fontSize: "12.5px", marginBottom: "6px" }}>
                          Đường dẫn Messenger kết nối trực tiếp:
                        </div>
                        <div
                          style={{
                            fontFamily: "monospace",
                            fontSize: "12px",
                            color: "#93c5fd",
                            backgroundColor: "rgba(0, 0, 0, 0.4)",
                            padding: "8px 10px",
                            borderRadius: "4px",
                            wordBreak: "break-all",
                          }}
                        >
                          https://m.me/{storeSettings.facebook_page_id || "vanbassmusiccenter"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit bar */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      padding: "20px",
                      backgroundColor: "#161618",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      borderRadius: "12px",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.35)",
                    }}
                  >
                    <button
                      type="submit"
                      disabled={isStoreSettingsSaving}
                      className="admin-pill-btn-green"
                      style={{
                        padding: "10px 24px",
                        fontSize: "14px",
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                        <polyline points="17 21 17 13 7 13 7 21" />
                        <polyline points="7 3 7 8 15 8" />
                      </svg>
                      <span>{isStoreSettingsSaving ? "Đang lưu cài đặt..." : "Lưu Thay Đổi Cài Đặt"}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </main>
      </div>

      {/* MODAL: ADD CATEGORY */}
      {showAddCategoryModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(8px)",
            zIndex: 99990,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            animation: "fadeIn 0.2s ease-out",
          }}
          onClick={() => setShowAddCategoryModal(false)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "520px",
              backgroundColor: "#121215",
              border: "1px solid rgba(255, 255, 255, 0.16)",
              borderRadius: "12px",
              padding: "28px",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
              boxSizing: "border-box",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "14px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 800, margin: 0, color: "#fff", display: "flex", alignItems: "center", gap: "8px" }}>
                Thêm Danh Mục Thiết Bị Mới
              </h3>
              <button
                onClick={() => setShowAddCategoryModal(false)}
                style={{ background: "none", border: "none", color: "#a1a1aa", fontSize: "20px", cursor: "pointer", padding: "4px" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCategory} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#d4d4d8", marginBottom: "6px" }}>
                  Tên danh mục <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Bàn DJ All-in-one, Loa Sân Khấu..."
                  value={catNameInput}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCatNameInput(val);
                    if (!catSlugInput || catSlugInput === catNameInput.toLowerCase().replace(/[^a-z0-9]/g, "-")) {
                      setCatSlugInput(val.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""));
                    }
                  }}
                  className="shadcn-input-control"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#d4d4d8", marginBottom: "6px" }}>
                  Đường dẫn (Slug SEO)
                </label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#4ade80", fontFamily: "monospace", fontSize: "13px" }}>
                    /
                  </span>
                  <input
                    type="text"
                    placeholder="ban-dj-all-in-one"
                    value={catSlugInput}
                    onChange={(e) => setCatSlugInput(e.target.value)}
                    className="shadcn-input-control"
                    style={{ paddingLeft: "24px", fontFamily: "monospace", color: "#4ade80" }}
                  />
                </div>
                <small style={{ color: "#71717a", fontSize: "11px", display: "block", marginTop: "4px" }}>
                  Để trống để hệ thống tự động sinh từ tên danh mục
                </small>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#d4d4d8", marginBottom: "6px" }}>
                  Mô tả tóm tắt danh mục
                </label>
                <textarea
                  rows={3}
                  placeholder="Mô tả các dòng thiết bị thuộc danh mục này..."
                  value={catDescInput}
                  onChange={(e) => setCatDescInput(e.target.value)}
                  className="shadcn-textarea-control"
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
                <button
                  type="button"
                  onClick={() => setShowAddCategoryModal(false)}
                  className="admin-pill-btn-dark"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingCat}
                  className="admin-pill-btn-green"
                >
                  {isSubmittingCat ? "Đang tạo..." : "✓ Tạo danh mục"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT CATEGORY */}
      {showEditCategoryModal && editingCategory && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(8px)",
            zIndex: 99990,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            animation: "fadeIn 0.2s ease-out",
          }}
          onClick={() => {
            setShowEditCategoryModal(false);
            setEditingCategory(null);
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "520px",
              backgroundColor: "#121215",
              border: "1px solid rgba(255, 255, 255, 0.16)",
              borderRadius: "12px",
              padding: "28px",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
              boxSizing: "border-box",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "14px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 800, margin: 0, color: "#fff", display: "flex", alignItems: "center", gap: "8px" }}>
                Chỉnh Sửa Danh Mục
              </h3>
              <button
                onClick={() => {
                  setShowEditCategoryModal(false);
                  setEditingCategory(null);
                }}
                style={{ background: "none", border: "none", color: "#a1a1aa", fontSize: "20px", cursor: "pointer", padding: "4px" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateCategory} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#d4d4d8", marginBottom: "6px" }}>
                  Tên danh mục <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  value={catNameInput}
                  onChange={(e) => setCatNameInput(e.target.value)}
                  className="shadcn-input-control"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#d4d4d8", marginBottom: "6px" }}>
                  Đường dẫn (Slug SEO) <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#4ade80", fontFamily: "monospace", fontSize: "13px" }}>
                    /
                  </span>
                  <input
                    type="text"
                    required
                    value={catSlugInput}
                    onChange={(e) => setCatSlugInput(e.target.value)}
                    className="shadcn-input-control"
                    style={{ paddingLeft: "24px", fontFamily: "monospace", color: "#4ade80" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#d4d4d8", marginBottom: "6px" }}>
                  Mô tả tóm tắt
                </label>
                <textarea
                  rows={3}
                  value={catDescInput}
                  onChange={(e) => setCatDescInput(e.target.value)}
                  className="shadcn-textarea-control"
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditCategoryModal(false);
                    setEditingCategory(null);
                  }}
                  className="admin-pill-btn-dark"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingCat}
                  className="admin-pill-btn-green"
                >
                  {isSubmittingCat ? "Đang lưu..." : "✓ Lưu thay đổi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                      Đổi mã
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
                  Hình ảnh thiết bị (Dán link URL hoặc Tải từ máy tính)
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
                  Cấu hình SEO Google (Tùy chọn)
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
                  className="admin-pill-btn-dark"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="admin-pill-btn-green"
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
                  Chỉnh Sửa & Cập Nhật Sản Phẩm
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
                      Tạo mã mới
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
                  Hình ảnh thiết bị (Dán link URL hoặc Tải file ảnh mới)
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
                  Cấu hình SEO Google (Tùy chọn)
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
                  className="admin-pill-btn-dark"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="admin-pill-btn-green"
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
                className="admin-pill-btn-dark"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleConfirmStatusChange}
                className="admin-pill-btn-green"
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
                className="admin-pill-btn-dark"
                style={{ opacity: isDeleting ? 0.6 : 1, cursor: isDeleting ? "not-allowed" : "pointer" }}
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleConfirmDeleteProduct}
                className="admin-pill-btn-danger"
                style={{ opacity: isDeleting ? 0.7 : 1, cursor: isDeleting ? "not-allowed" : "pointer" }}
              >
                {isDeleting ? "Đang xóa..." : "✕ Xác nhận xóa"}
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
                  Thông tin giao hàng
                </span>
                <div style={{ fontSize: "14px", color: "#fff", fontWeight: 700, marginBottom: "4px" }}>
                  {selectedOrderDetail.shipping_name}
                </div>
                <div style={{ fontSize: "13px", color: "#60a5fa", marginBottom: "6px" }}>
                  SĐT: {selectedOrderDetail.shipping_phone}
                </div>
                <div style={{ fontSize: "13px", color: "#cbd5e1", lineHeight: 1.4 }}>
                  Địa chỉ: {selectedOrderDetail.shipping_address}
                </div>
                {selectedOrderDetail.customer_note && (
                  <div style={{ marginTop: "10px", paddingTop: "10px", borderTop: "1px dashed rgba(255,255,255,0.1)", fontSize: "12px", color: "#fbbf24" }}>
                    Ghi chú: {selectedOrderDetail.customer_note}
                  </div>
                )}
              </div>

              {/* Status info */}
              <div style={{ backgroundColor: "#0d0e0f", border: "1px solid rgba(255, 255, 255, 0.08)", borderRadius: "6px", padding: "16px" }}>
                <span style={{ fontSize: "11px", color: "#a1a1aa", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "10px" }}>
                  Trạng thái & Thanh toán
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
                Danh sách sản phẩm ({selectedOrderDetail.items?.length || 0})
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
                className="admin-pill-btn-white"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD NEW STAFF ACCOUNT */}
      {showAddStaffModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            backdropFilter: "blur(8px)",
            zIndex: 99990,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            animation: "fadeIn 0.2s ease-out",
          }}
          onClick={() => setShowAddStaffModal(false)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "520px",
              backgroundColor: "#121215",
              border: "1px solid rgba(255, 255, 255, 0.16)",
              borderRadius: "12px",
              padding: "28px",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.9)",
              boxSizing: "border-box",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", paddingBottom: "14px" }}>
              <h3 style={{ fontSize: "18px", fontWeight: 800, margin: 0, color: "#fff", display: "flex", alignItems: "center", gap: "8px" }}>
                Thêm Nhân Sự / Quản Trị Mới
              </h3>
              <button
                type="button"
                onClick={() => setShowAddStaffModal(false)}
                style={{ background: "none", border: "none", color: "#a1a1aa", fontSize: "20px", cursor: "pointer", padding: "4px" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateStaff} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#d4d4d8", marginBottom: "6px" }}>
                  Họ và tên nhân viên <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="text"
                  value={staffFullName}
                  onChange={(e) => setStaffFullName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn A"
                  required
                  className="shadcn-input-control"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#d4d4d8", marginBottom: "6px" }}>
                  Email / Gmail nhân viên <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="email"
                  value={staffEmail}
                  onChange={(e) => setStaffEmail(e.target.value)}
                  placeholder="Ví dụ: nhanvien@vanbass.vn"
                  required
                  className="shadcn-input-control"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#d4d4d8", marginBottom: "6px" }}>
                  Số điện thoại (SĐT) <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="tel"
                  value={staffPhone}
                  onChange={(e) => setStaffPhone(e.target.value)}
                  placeholder="Ví dụ: 0905123456"
                  required
                  className="shadcn-input-control"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#d4d4d8", marginBottom: "6px" }}>
                  Mật khẩu khởi tạo <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="password"
                  value={staffPassword}
                  onChange={(e) => setStaffPassword(e.target.value)}
                  placeholder="Tối thiểu 6 ký tự"
                  required
                  minLength={6}
                  className="shadcn-input-control"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12.5px", fontWeight: 700, color: "#d4d4d8", marginBottom: "6px" }}>
                  Vai trò & Phân quyền
                </label>
                <select
                  value={staffRole}
                  onChange={(e) => setStaffRole(e.target.value)}
                  className="shadcn-select-control"
                  style={{ width: "100%" }}
                >
                  <option value="staff">Staff - Nhân viên vận hành (Quản lý đơn, sản phẩm)</option>
                  <option value="admin">Admin - Quản trị viên (Toàn quyền hệ thống & cài đặt)</option>
                </select>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
                <button
                  type="button"
                  onClick={() => setShowAddStaffModal(false)}
                  className="admin-pill-btn-dark"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingStaff}
                  className="admin-pill-btn-green"
                  style={{
                    cursor: isSubmittingStaff ? "wait" : "pointer",
                  }}
                >
                  {isSubmittingStaff ? "Đang tạo..." : "✓ Lưu nhân sự"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
