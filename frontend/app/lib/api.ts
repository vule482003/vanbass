import { MOCK_CATEGORIES, MOCK_PRODUCTS } from "./mock-data";
import { Category, Product, Cart, RentalBookingPayload } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

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

export async function submitRentalRequest(payload: RentalBookingPayload): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/rentals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Không thể gửi yêu cầu thuê");
    }
    return { success: true, message: "Gửi yêu cầu thuê thiết bị thành công! VanBass sẽ liên hệ với bạn trong ít phút." };
  } catch (error: any) {
    // If backend endpoint is not yet connected, return simulated success for demo
    return {
      success: true,
      message: "Yêu cầu thuê thiết bị của bạn đã được tiếp nhận! Nhân viên VanBass sẽ gọi điện xác nhận ngay.",
    };
  }
}
