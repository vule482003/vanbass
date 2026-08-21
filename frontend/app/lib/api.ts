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

interface RentalRequestResponse {
  request_number: string;
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

export async function fetchProductAvailability(
  productId: string,
  startDate?: string,
  endDate?: string
): Promise<{
  product_id: string;
  product_name: string;
  total_stock: number;
  calendar: Array<{
    date: string;
    total_stock: number;
    booked_count: number;
    available_count: number;
  }>;
} | null> {
  try {
    const searchParams = new URLSearchParams();
    if (startDate) searchParams.set("start_date", startDate);
    if (endDate) searchParams.set("end_date", endDate);

    const url = `${API_BASE_URL}/rental-requests/availability/${productId}${
      searchParams.toString() ? `?${searchParams.toString()}` : ""
    }`;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
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

export async function submitRentalRequest(payload: {
  start_date: string;
  end_date: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  delivery_address?: string;
  note?: string;
  items: Array<{ product_id: string; quantity: number; daily_rate?: number }>;
  token?: string | null;
}): Promise<{ success: boolean; message: string; request_number?: string; rental_request?: RentalRequestResponse }> {
  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (payload.token) {
      headers["Authorization"] = `Bearer ${payload.token}`;
    }

    const res = await fetch(`${API_BASE_URL}/rental-requests`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        start_date: payload.start_date,
        end_date: payload.end_date,
        customer_name: payload.customer_name,
        customer_phone: payload.customer_phone,
        customer_email: payload.customer_email || undefined,
        delivery_address: payload.delivery_address || undefined,
        note: payload.note || undefined,
        items: payload.items.map((i) => ({
          product_id: i.product_id,
          quantity: i.quantity,
          daily_rate: i.daily_rate || 0,
        })),
      }),
    });

    if (!res.ok) {
      const err: ApiErrorPayload = await res.json().catch(() => ({ detail: "Không thể tạo hợp đồng thuê" }));
      let msg = "Không thể gửi yêu cầu thuê. Vui lòng kiểm tra lại thông tin.";
      if (typeof err.detail === "string") {
        msg = err.detail;
      } else if (Array.isArray(err.detail)) {
        msg = err.detail.map((d) => d.msg || "Lỗi dữ liệu").join(", ");
      } else if (typeof err.detail === "object" && err.detail !== null) {
        msg = JSON.stringify(err.detail);
      }

      return {
        success: false,
        message: msg,
      };
    }

    const data: RentalRequestResponse = await res.json();
    return {
      success: true,
      message: `Tạo yêu cầu thuê thành công! Mã hợp đồng: ${data.request_number}`,
      request_number: data.request_number,
      rental_request: data,
    };
  } catch (error) {
    console.error("Rental request network error:", error);
    return {
      success: false,
      message: "Không thể kết nối đến máy chủ Backend (FastAPI).",
    };
  }
}
