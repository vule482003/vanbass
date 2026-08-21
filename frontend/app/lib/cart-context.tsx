"use client";

import React, { createContext, startTransition, useContext, useEffect, useState } from "react";
import { CartItem, Product } from "./types";
import { useAuth } from "./auth-context";

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

const getUserCartStorageKey = (userId?: string) => {
  return userId ? `vanbass_cart_items_${userId}` : null;
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Load cart specific to authenticated user
  useEffect(() => {
    if (isAuthLoading) return;

    try {
      // Clean up legacy global key if present to avoid cross-user contamination
      localStorage.removeItem("vanbass_cart_items");

      if (user && user.id) {
        const userKey = getUserCartStorageKey(user.id);
        if (userKey) {
          const saved = localStorage.getItem(userKey);
          if (saved) {
            startTransition(() => setItems(JSON.parse(saved)));
          } else {
            startTransition(() => setItems([]));
          }
        }
      } else {
        // Guest or logged out -> clear cart in memory
        startTransition(() => setItems([]));
      }
    } catch {
      startTransition(() => setItems([]));
    }
    setMounted(true);
  }, [user?.id, isAuthLoading]);

  // Persist cart whenever items change for the current user
  useEffect(() => {
    if (!mounted || isAuthLoading) return;

    if (user && user.id) {
      try {
        const userKey = getUserCartStorageKey(user.id);
        if (userKey) {
          localStorage.setItem(userKey, JSON.stringify(items));
        }
      } catch {
        // Ignore localStorage errors
      }
    }
  }, [items, user?.id, mounted, isAuthLoading]);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const addItem = (product: Product, quantity: number = 1) => {
    if (!isAuthenticated || !user) {
      showNotification("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      return;
    }

    if (!product.sale_enabled || !product.sale_price) {
      showNotification("Sản phẩm này chỉ hỗ trợ cho thuê hoặc chưa mở bán.");
      return;
    }

    if (product.stock_quantity <= 0) {
      showNotification(`Sản phẩm "${product.name}" hiện đang tạm hết hàng.`);
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
          image_url: product.images?.[0]?.image_url || product.image_url,
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
    if (user && user.id) {
      try {
        const userKey = getUserCartStorageKey(user.id);
        if (userKey) {
          localStorage.removeItem(userKey);
        }
      } catch {
        // Ignore
      }
    }
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
