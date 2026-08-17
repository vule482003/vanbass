"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/auth-context";

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
}

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
}

interface OrderItem {
  id: string;
  order_number: string;
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  total_amount: number;
  status: string;
  payment_status: string;
  created_at: string;
  items?: Array<{ product_name: string; quantity: number; unit_price: number }>;
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

  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders" | "rentals">("overview");

  // Data states
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [rentals, setRentals] = useState<RentalRequestItem[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  // Add Product Modal states
  const [showAddProductModal, setShowAddProductModal] = useState(false);
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
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState("");
  const [actionErrorMsg, setActionErrorMsg] = useState("");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

  // Check auth
  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login");
      }
    }
  }, [isAuthenticated, isLoading, router]);

  const loadAllData = useCallback(async () => {
    setIsDataLoading(true);
    try {
      // 1. Fetch categories
      const catRes = await fetch(`${apiUrl}/categories`);
      if (catRes.ok) {
        const catData = await catRes.json();
        setCategories(catData);
        if (catData.length > 0 && !categoryId) {
          setCategoryId(catData[0].id);
        }
      }

      // 2. Fetch products
      const prodRes = await fetch(`${apiUrl}/products`);
      if (prodRes.ok) {
        const prodData = await prodRes.json();
        setProducts(prodData);
      }

      // 3. Fetch orders (with admin auth token)
      if (token) {
        const orderRes = await fetch(`${apiUrl}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (orderRes.ok) {
          const orderData = await orderRes.json();
          setOrders(orderData.items || []);
        }

        // 4. Fetch rental requests
        const rentRes = await fetch(`${apiUrl}/rental-requests`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (rentRes.ok) {
          const rentData = await rentRes.json();
          setRentals(rentData.items || []);
        }
      }
    } catch (e) {
      console.error("Failed to fetch admin data:", e);
    } finally {
      setIsDataLoading(false);
    }
  }, [apiUrl, token, categoryId]);

  useEffect(() => {
    if (user?.role === "admin" && token) {
      loadAllData();
    }
  }, [user, token, loadAllData]);

  // Handle auto slug from name
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
      // 1. Upload image if selected
      let uploadedImageUrl: string | null = null;
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
          uploadedImageUrl = uploadData.url;
        }
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

        // 3. Link image to product if uploaded
        if (uploadedImageUrl && newProduct.id) {
          await fetch(`${apiUrl}/products/${newProduct.id}/images`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              image_url: uploadedImageUrl,
              is_primary: true,
              display_order: 1,
            }),
          });
        }

        setActionSuccessMsg(`✓ Đã thêm sản phẩm "${name}" thành công vào hệ thống!`);
        setShowAddProductModal(false);

        // Reset form
        setName("");
        setSlug("");
        setSku("");
        setSalePrice("");
        setRentalPrice("");
        setDescription("");
        setSelectedImageFile(null);
        setImagePreviewUrl(null);

        // Reload data
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

  const handleDeleteProduct = async (id: string, prodName: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${prodName}" khỏi hệ thống?`)) {
      return;
    }
    try {
      const res = await fetch(`${apiUrl}/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setActionSuccessMsg(`Đã gỡ sản phẩm "${prodName}"`);
        loadAllData();
      }
    } catch {
      alert("Không thể xóa sản phẩm.");
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
        <Link href="/" style={{ padding: "12px 24px", backgroundColor: "#fff", color: "#000", fontWeight: 700, textDecoration: "none" }}>
          ← Quay lại trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#090909", color: "#f4f4f5" }}>
      {/* Top Admin Navbar */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 32px",
          backgroundColor: "#121212",
          borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ backgroundColor: "#ffffff", color: "#000000", fontWeight: 900, padding: "4px 8px", fontSize: "14px" }}>
            VB ADMIN
          </span>
          <span style={{ fontSize: "16px", fontWeight: 800, color: "#fff" }}>
            VanBass Management Center
          </span>
        </div>

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
              router.push("/login");
            }}
            style={{
              padding: "6px 14px",
              backgroundColor: "rgba(239, 68, 68, 0.15)",
              border: "1px solid #ef4444",
              color: "#fca5a5",
              fontSize: "12px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Đăng xuất
          </button>
        </div>
      </header>

      {/* Main Admin Content */}
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", flex: 1 }}>
        {/* Sidebar */}
        <aside style={{ backgroundColor: "#0f0f11", borderRight: "1px solid rgba(255,255,255,0.08)", padding: "24px 16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <button
              onClick={() => setActiveTab("overview")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                textAlign: "left",
                backgroundColor: activeTab === "overview" ? "#ffffff" : "transparent",
                color: activeTab === "overview" ? "#000000" : "#a1a1aa",
                fontWeight: 700,
                fontSize: "14px",
                border: "none",
                cursor: "pointer",
              }}
            >
              📊 Tổng quan thống kê
            </button>

            <button
              onClick={() => setActiveTab("products")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                textAlign: "left",
                backgroundColor: activeTab === "products" ? "#ffffff" : "transparent",
                color: activeTab === "products" ? "#000000" : "#a1a1aa",
                fontWeight: 700,
                fontSize: "14px",
                border: "none",
                cursor: "pointer",
              }}
            >
              📦 Quản lý Sản phẩm ({products.length})
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                textAlign: "left",
                backgroundColor: activeTab === "orders" ? "#ffffff" : "transparent",
                color: activeTab === "orders" ? "#000000" : "#a1a1aa",
                fontWeight: 700,
                fontSize: "14px",
                border: "none",
                cursor: "pointer",
              }}
            >
              🛒 Quản lý Đơn hàng ({orders.length})
            </button>

            <button
              onClick={() => setActiveTab("rentals")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                textAlign: "left",
                backgroundColor: activeTab === "rentals" ? "#ffffff" : "transparent",
                color: activeTab === "rentals" ? "#000000" : "#a1a1aa",
                fontWeight: 700,
                fontSize: "14px",
                border: "none",
                cursor: "pointer",
              }}
            >
              📅 Yêu cầu Thuê máy ({rentals.length})
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main style={{ padding: "32px 40px", backgroundColor: "#090909" }}>
          {/* Notifications */}
          {actionSuccessMsg && (
            <div style={{ padding: "14px 20px", backgroundColor: "rgba(34, 197, 94, 0.15)", border: "1px solid #22c55e", color: "#4ade80", fontSize: "14px", marginBottom: "24px" }}>
              {actionSuccessMsg}
            </div>
          )}
          {actionErrorMsg && (
            <div style={{ padding: "14px 20px", backgroundColor: "rgba(239, 68, 68, 0.15)", border: "1px solid #ef4444", color: "#fca5a5", fontSize: "14px", marginBottom: "24px" }}>
              {actionErrorMsg}
            </div>
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div>
              <h2 style={{ fontSize: "24px", fontWeight: 800, margin: "0 0 24px 0", color: "#fff" }}>
                Bảng Thống kê Hoạt động
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "40px" }}>
                <div style={{ padding: "24px", backgroundColor: "#121212", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <p style={{ margin: "0 0 8px 0", color: "#a1a1aa", fontSize: "13px", textTransform: "uppercase" }}>Tổng Sản Phẩm</p>
                  <strong style={{ fontSize: "32px", fontWeight: 900, color: "#fff" }}>{products.length}</strong>
                  <p style={{ margin: "8px 0 0 0", color: "#22c55e", fontSize: "12px" }}>Trong kho PostgreSQL</p>
                </div>

                <div style={{ padding: "24px", backgroundColor: "#121212", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <p style={{ margin: "0 0 8px 0", color: "#a1a1aa", fontSize: "13px", textTransform: "uppercase" }}>Đơn Mua Hàng</p>
                  <strong style={{ fontSize: "32px", fontWeight: 900, color: "#60a5fa" }}>{orders.length}</strong>
                  <p style={{ margin: "8px 0 0 0", color: "#a1a1aa", fontSize: "12px" }}>Đơn đặt hàng trực tuyến</p>
                </div>

                <div style={{ padding: "24px", backgroundColor: "#121212", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <p style={{ margin: "0 0 8px 0", color: "#a1a1aa", fontSize: "13px", textTransform: "uppercase" }}>Yêu Cầu Thuê Máy</p>
                  <strong style={{ fontSize: "32px", fontWeight: 900, color: "#eab308" }}>{rentals.length}</strong>
                  <p style={{ margin: "8px 0 0 0", color: "#a1a1aa", fontSize: "12px" }}>Hợp đồng thuê sự kiện</p>
                </div>

                <div style={{ padding: "24px", backgroundColor: "#121212", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <p style={{ margin: "0 0 8px 0", color: "#a1a1aa", fontSize: "13px", textTransform: "uppercase" }}>Danh Mục Hoạt Động</p>
                  <strong style={{ fontSize: "32px", fontWeight: 900, color: "#a855f7" }}>{categories.length}</strong>
                  <p style={{ margin: "8px 0 0 0", color: "#a1a1aa", fontSize: "12px" }}>DJ, Mixer, Loa, Phụ kiện</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS MANAGEMENT */}
          {activeTab === "products" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <div>
                  <h2 style={{ fontSize: "24px", fontWeight: 800, margin: "0 0 6px 0", color: "#fff" }}>
                    Danh Sách Sản Phẩm Trong CSDL
                  </h2>
                  <p style={{ fontSize: "14px", color: "#a1a1aa", margin: 0 }}>
                    Thêm máy mới, tải ảnh trực tiếp lên server hoặc chỉnh sửa giá bán & giá thuê
                  </p>
                </div>

                <button
                  onClick={() => setShowAddProductModal(true)}
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "#ffffff",
                    color: "#000000",
                    fontWeight: 800,
                    fontSize: "13px",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span>＋</span> Thêm Sản Phẩm Mới
                </button>
              </div>

              {/* Table */}
              <div style={{ backgroundColor: "#111111", border: "1px solid rgba(255,255,255,0.1)", overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
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
                        <td style={{ padding: "16px", textAlign: "right" }}>
                          <button
                            onClick={() => handleDeleteProduct(p.id, p.name)}
                            style={{
                              padding: "6px 12px",
                              backgroundColor: "transparent",
                              border: "1px solid rgba(239, 68, 68, 0.4)",
                              color: "#f87171",
                              fontSize: "12px",
                              cursor: "pointer",
                            }}
                          >
                            Xóa
                          </button>
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
                Danh Sách Đơn Mua Hàng
              </h2>
              {orders.length === 0 ? (
                <div style={{ padding: "40px", textAlign: "center", backgroundColor: "#121212", color: "#71717a" }}>
                  Chưa có đơn mua hàng nào trong hệ thống.
                </div>
              ) : (
                <div style={{ backgroundColor: "#111111", border: "1px solid rgba(255,255,255,0.1)", overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#a1a1aa", fontSize: "12px", textTransform: "uppercase" }}>
                        <th style={{ padding: "16px" }}>Mã Đơn / Ngày</th>
                        <th style={{ padding: "16px" }}>Khách Hàng & SĐT</th>
                        <th style={{ padding: "16px" }}>Địa Chỉ Giao Hàng</th>
                        <th style={{ padding: "16px" }}>Tổng Tiền</th>
                        <th style={{ padding: "16px" }}>Trạng Thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o) => (
                        <tr key={o.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                          <td style={{ padding: "16px" }}>
                            <strong style={{ color: "#fff" }}>{o.order_number}</strong>
                            <div style={{ fontSize: "12px", color: "#71717a" }}>{new Date(o.created_at).toLocaleDateString("vi-VN")}</div>
                          </td>
                          <td style={{ padding: "16px", color: "#fff" }}>
                            <div>{o.shipping_name}</div>
                            <div style={{ fontSize: "12px", color: "#a1a1aa" }}>{o.shipping_phone}</div>
                          </td>
                          <td style={{ padding: "16px", color: "#d4d4d8", maxWidth: "260px" }}>{o.shipping_address}</td>
                          <td style={{ padding: "16px", color: "#fff", fontWeight: 800 }}>{formatCurrency(o.total_amount)}</td>
                          <td style={{ padding: "16px" }}>
                            <span style={{ padding: "4px 10px", backgroundColor: "rgba(34, 197, 94, 0.15)", color: "#4ade80", fontSize: "12px", fontWeight: 700 }}>
                              {o.status.toUpperCase()}
                            </span>
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
                Danh Sách Yêu Cầu Thuê Thiết Bị
              </h2>
              {rentals.length === 0 ? (
                <div style={{ padding: "40px", textAlign: "center", backgroundColor: "#121212", color: "#71717a" }}>
                  Chưa có yêu cầu thuê thiết bị nào trong hệ thống.
                </div>
              ) : (
                <div style={{ backgroundColor: "#111111", border: "1px solid rgba(255,255,255,0.1)", overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", color: "#a1a1aa", fontSize: "12px", textTransform: "uppercase" }}>
                        <th style={{ padding: "16px" }}>Mã Thuê / Ngày</th>
                        <th style={{ padding: "16px" }}>Thời Gian Thuê</th>
                        <th style={{ padding: "16px" }}>Tiền Thuê</th>
                        <th style={{ padding: "16px" }}>Tiền Cọc</th>
                        <th style={{ padding: "16px" }}>Trạng Thái</th>
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
                            <span style={{ padding: "4px 10px", backgroundColor: "rgba(59, 130, 246, 0.15)", color: "#60a5fa", fontSize: "12px", fontWeight: 700 }}>
                              {r.status.toUpperCase()}
                            </span>
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
          onClick={() => setShowAddProductModal(false)}
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
              <button onClick={() => setShowAddProductModal(false)} style={{ background: "none", border: "none", color: "#a1a1aa", fontSize: "20px", cursor: "pointer" }}>
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
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "6px", textTransform: "uppercase" }}>
                    Mã SKU *
                  </label>
                  <input
                    type="text"
                    required
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="XDJ-AZ-AT"
                    style={{ width: "100%", padding: "10px 14px", backgroundColor: "#000", border: "1px solid #27272a", color: "#fff", fontSize: "14px", boxSizing: "border-box" }}
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

              {/* Row 4: Image Upload */}
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#a1a1aa", marginBottom: "6px", textTransform: "uppercase" }}>
                  📸 Tải ảnh thật từ máy tính (Multipart Upload)
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    onChange={handleImageFileChange}
                    style={{ fontSize: "13px", color: "#a1a1aa" }}
                  />
                  {imagePreviewUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={imagePreviewUrl} alt="Preview" style={{ width: "48px", height: "48px", objectFit: "cover", border: "1px solid #fff" }} />
                  )}
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
                  onClick={() => setShowAddProductModal(false)}
                  style={{ padding: "12px 20px", backgroundColor: "transparent", border: "1px solid #3f3f46", color: "#fff", cursor: "pointer", fontWeight: 600 }}
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ padding: "12px 28px", backgroundColor: "#fff", color: "#000", fontWeight: 800, border: "none", cursor: isSubmitting ? "not-allowed" : "pointer" }}
                >
                  {isSubmitting ? "Đang lưu vào CSDL..." : "Lưu Sản Phẩm Vào CSDL"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
