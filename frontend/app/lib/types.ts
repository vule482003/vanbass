export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  number?: string;
}

export interface ProductImage {
  id: string;
  image_url: string;
  alt_text?: string;
  sort_order: number;
}

export interface Product {
  id: string;
  category_id: string;
  category_name?: string;
  category_slug?: string;
  name: string;
  slug: string;
  sku: string;
  brand?: string;
  description?: string;
  specifications?: Record<string, string | number | boolean | string[]>;
  sale_enabled: boolean;
  sale_price?: number;
  rental_enabled: boolean;
  rental_price?: number;
  stock_quantity: number;
  is_active: boolean;
  images?: ProductImage[];
}

export interface CartItem {
  product_id: string;
  name: string;
  slug: string;
  sku: string;
  image_url?: string;
  sale_price: number;
  stock_quantity: number;
  quantity: number;
  subtotal: number;
  is_available: boolean;
  error_message?: string;
}

export interface Cart {
  items: CartItem[];
  total_items: number;
  subtotal: number;
  currency: string;
}

export interface RentalBookingItem {
  product_id: string;
  product_name: string;
  rental_price_per_day: number;
  quantity: number;
}

export interface RentalBookingPayload {
  start_date: string;
  end_date: string;
  pickup_location: string;
  pickup_note?: string;
  customer_note?: string;
  full_name: string;
  phone: string;
  email?: string;
  items: {
    product_id: string;
    quantity: number;
  }[];
}
