import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "./mock-data";
import { Category, Product } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

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
  try {
    const res = await fetch(`${API_BASE_URL}/categories`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch categories");
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) return data;
    return MOCK_CATEGORIES;
  } catch {
    return MOCK_CATEGORIES;
  }
}

export async function fetchProducts(params?: {
  category_slug?: string;
  sale_only?: boolean;
  rental_only?: boolean;
  search?: string;
}): Promise<Product[]> {
  try {
    const searchParams = new URLSearchParams();
    if (params?.sale_only) searchParams.set("sale_only", "true");
    if (params?.rental_only) searchParams.set("rental_only", "true");
    if (params?.search) searchParams.set("search", params.search);

    const url = `${API_BASE_URL}/products${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    const res = await fetch(url, {
      next: { revalidate: 30 },
    });
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) return data;
    return filterMockProducts(params);
  } catch {
    return filterMockProducts(params);
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/by-slug/${slug}`, {
      next: { revalidate: 30 },
    });
    if (res.ok) {
      return await res.json();
    }
    const products = await fetchProducts();
    const found = products.find((p) => p.slug === slug);
    if (found) return found;

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

    const res = await fetch(`${API_BASE_URL}/orders`, {
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
    const res = await fetch(`${API_BASE_URL}/store-settings`, {
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



