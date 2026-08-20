"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem, Product } from "./types";

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  notification: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "vanbass_cart_items";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // Ignore localstorage errors
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch {
        // Ignore localstorage errors
      }
    }
  }, [items, mounted]);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const addItem = (product: Product, quantity: number = 1) => {
    if (!product.sale_enabled || !product.sale_price) {
      showNotification("Sản phẩm này chỉ hỗ trợ cho thuê hoặc chưa mở bán.");
      return;
    }

    setItems((prev) => {
      const existing = prev.find((item) => item.product_id === product.id);
      if (existing) {
        const newQty = existing.quantity + quantity;
        if (newQty > product.stock_quantity) {
          showNotification(`Đã đạt tối đa số lượng tồn kho (${product.stock_quantity})!`);
          return prev;
        }
        return prev.map((item) =>
          item.product_id === product.id
            ? { ...item, quantity: newQty, subtotal: newQty * item.sale_price }
            : item
        );
      } else {
        const salePrice = product.sale_price || 0;
        const newItem: CartItem = {
          product_id: product.id,
          name: product.name,
          slug: product.slug,
          sku: product.sku,
          image_url: product.images?.[0]?.image_url,
          sale_price: salePrice,
          stock_quantity: product.stock_quantity,
          quantity: quantity,
          subtotal: salePrice * quantity,
          is_available: true,
        };
        return [...prev, newItem];
      }
    });

    showNotification(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((prev) =>
      prev.map((item) => {
        if (item.product_id === productId) {
          const validQty = Math.min(quantity, item.stock_quantity);
          return {
            ...item,
            quantity: validQty,
            subtotal: validQty * item.sale_price,
          };
        }
        return item;
      })
    );
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product_id !== productId));
    showNotification("Đã xoá sản phẩm khỏi giỏ hàng");
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        subtotal,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        notification,
      }}
    >
      {children}
      {notification && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            backgroundColor: "#f5f5f0",
            color: "#0a0a0a",
            padding: "12px 20px",
            fontSize: "13px",
            fontWeight: "600",
            zIndex: 9999,
            borderRadius: "2px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            border: "1px solid rgba(255,255,255,0.2)",
            animation: "fadeIn 0.2s ease-in-out",
          }}
        >
          {notification}
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
