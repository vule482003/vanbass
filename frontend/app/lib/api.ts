import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "./mock-data";
import { Category, Product } from "./types";

// Check if running on Vercel without an external backend configured
function isVercelStandalone(): boolean {
  const isVercel = Boolean(process.env.VERCEL || process.env.NEXT_PUBLIC_VERCEL_ENV);
  if (!isVercel) return false;
  const externalApi = process.env.NEXT_PUBLIC_API_URL || process.env.BACKEND_INTERNAL_URL;
  // If no external URL or pointing to localhost on Vercel cloud, it has no reachable backend
  return !externalApi || externalApi.includes("127.0.0.1") || externalApi.includes("localhost");
}

export function getApiBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, "");
  }
  if (typeof window !== "undefined") {
    return "/api";
  }
  // When running standalone on Vercel, don't attempt 127.0.0.1 which hangs for seconds
  if (isVercelStandalone()) {
    return "";
  }
  return process.env.BACKEND_INTERNAL_URL || "http://127.0.0.1:8000/api";
}

export const API_BASE_URL = getApiBaseUrl();

interface ApiValidationError {
  msg?: string;
}

interface ApiErrorPayload {
  detail?: string | ApiValidationError[] | Record<string, unknown>;
}

interface OrderResponse {
  order_number: string;
  [key: string]: unknown;
}

export async function fetchCategories(): Promise<Category[]> {
  if (isVercelStandalone()) {
    return MOCK_CATEGORIES;
  }
  const baseUrl = getApiBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/categories`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(1500),
    });
    if (!res.ok) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`[Data Architecture] /api/categories returned HTTP ${res.status}, falling back to MOCK_CATEGORIES`);
      }
      return MOCK_CATEGORIES;
    }
    const data = await res.json();
    if (Array.isArray(data)) return data;
    return MOCK_CATEGORIES;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[Data Architecture] Failed to fetch categories from backend, falling back to MOCK_CATEGORIES:", error);
    }
    return MOCK_CATEGORIES;
  }
}

export async function fetchProducts(params?: {
  category_slug?: string;
  sale_only?: boolean;
  rental_only?: boolean;
  search?: string;
}): Promise<Product[]> {
  if (isVercelStandalone()) {
    return filterMockProducts(params);
  }
  const baseUrl = getApiBaseUrl();
  try {
    const searchParams = new URLSearchParams();
    if (params?.sale_only) searchParams.set("sale_only", "true");
    if (params?.rental_only) searchParams.set("rental_only", "true");
    if (params?.search) searchParams.set("search", params.search);

    const url = `${baseUrl}/products${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    const res = await fetch(url, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(1500),
    });
    if (!res.ok) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`[Data Architecture] /api/products returned HTTP ${res.status}, falling back to MOCK_PRODUCTS`);
      }
      return filterMockProducts(params);
    }
    const data = await res.json();
    if (Array.isArray(data)) {
      return data.map((p: Product & { image?: string }) => {
        const primaryImg =
          p.images?.[0]?.image_url ||
          p.image_url ||
          p.image ||
          (p.slug ? `/images/products/${p.slug}.png` : undefined);
        return {
          ...p,
          image_url: primaryImg || p.image_url,
          image: primaryImg || p.image,
        };
      });
    }
    return filterMockProducts(params);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[Data Architecture] Failed to fetch products from backend, falling back to MOCK_PRODUCTS:", error);
    }
    return filterMockProducts(params);
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  if (isVercelStandalone()) {
    return MOCK_PRODUCTS.find((p) => p.slug === slug) || null;
  }
  const baseUrl = getApiBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/products/by-slug/${slug}`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(1500),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.id) {
        return data;
      }
    }

    return MOCK_PRODUCTS.find((p) => p.slug === slug) || null;
  } catch {
    return MOCK_PRODUCTS.find((p) => p.slug === slug) || null;
  }
}

function filterMockProducts(params?: {
  category_slug?: string;
  sale_only?: boolean;
  rental_only?: boolean;
  search?: string;
}): Product[] {
  let list = [...MOCK_PRODUCTS];

  if (params?.category_slug) {
    list = list.filter((p) => p.category_slug === params.category_slug);
  }
  if (params?.sale_only) {
    list = list.filter((p) => p.sale_enabled);
  }
  if (params?.rental_only) {
    list = list.filter((p) => p.rental_enabled);
  }
  if (params?.search) {
    const q = params.search.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    );
  }

  return list;
}



export async function submitOrder(payload: {
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  customer_note?: string;
  items: Array<{ product_id: string; quantity: number }>;
  token?: string | null;
}): Promise<{ success: boolean; message: string; order?: OrderResponse }> {
  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (payload.token) {
      headers["Authorization"] = `Bearer ${payload.token}`;
    }

    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/orders`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        shipping_name: payload.shipping_name,
        shipping_phone: payload.shipping_phone,
        shipping_address: payload.shipping_address,
        customer_note: payload.customer_note || undefined,
        items: payload.items,
      }),
    });

    if (!res.ok) {
      const err: ApiErrorPayload = await res.json().catch(() => ({ detail: "Không thể tạo đơn hàng" }));
      let msg = "Không thể đặt hàng. Vui lòng kiểm tra lại thông tin.";
      if (typeof err.detail === "string") {
        msg = err.detail;
      } else if (Array.isArray(err.detail)) {
        msg = err.detail.map((d) => d.msg || "Lỗi dữ liệu").join(", ");
      }
      return { success: false, message: msg };
    }

    const data: OrderResponse = await res.json();
    return {
      success: true,
      message: `Đặt hàng thành công! Mã đơn: ${data.order_number}`,
      order: data,
    };
  } catch (error) {
    console.error("Order submit network error:", error);
    return {
      success: false,
      message: "Không thể kết nối đến máy chủ Backend.",
    };
  }
}

export interface StoreSettings {
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

export async function fetchStoreSettings(): Promise<StoreSettings | null> {
  try {
    const baseUrl = getApiBaseUrl();
    const res = await fetch(`${baseUrl}/store-settings`, {
      cache: "no-store",
    });
    if (res.ok) {
      return await res.json();
    }
    return null;
  } catch {
    return null;
  }
}

export function getMessengerRentalUrl(
  productName?: string,
  facebookPageId: string = "vanbassmusiccenter"
): string {
  const text = productName
    ? `Xin chào VanBass, tôi cần tư vấn thuê thiết bị: ${productName}`
    : "Xin chào VanBass, tôi cần tư vấn thuê thiết bị âm thanh.";
  const cleanId = (facebookPageId || "vanbassmusiccenter").trim();
  return `https://m.me/${encodeURIComponent(cleanId)}?text=${encodeURIComponent(text)}`;
}



