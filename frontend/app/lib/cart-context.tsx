"use client";

import React, { createContext, startTransition, useContext, useEffect, useState, useCallback, useRef } from "react";
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
  warnings: string[];
  clearWarnings: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const GUEST_CART_KEY = "vanbass_guest_cart_items";
const GUEST_SESSION_KEY = "vanbass_guest_session_id";
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

const getUserCartStorageKey = (userId?: string) => {
  return userId ? `vanbass_cart_items_${userId}` : null;
};

const getOrCreateGuestSessionId = (): string => {
  try {
    let sid = localStorage.getItem(GUEST_SESSION_KEY);
    if (!sid) {
      sid =
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : `guest_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(GUEST_SESSION_KEY, sid);
    }
    return sid;
  } catch {
    return "guest_fallback_session";
  }
};

interface BackendCartItemResponse {
  product_id: string;
  name: string;
  slug: string;
  sku: string;
  image_url?: string | null;
  sale_price: number | string;
  stock_quantity: number;
  quantity: number;
  subtotal: number | string;
  is_available?: boolean;
  error_message?: string | null;
}

interface BackendCartResponse {
  items?: BackendCartItemResponse[];
  total_items?: number;
  subtotal?: number | string;
  warnings?: string[];
}

function mapBackendItemToCartItem(item: BackendCartItemResponse): CartItem {
  return {
    product_id: String(item.product_id),
    name: item.name,
    slug: item.slug,
    sku: item.sku,
    image_url: item.image_url || undefined,
    sale_price: Number(item.sale_price) || 0,
    stock_quantity: item.stock_quantity ?? 0,
    quantity: item.quantity,
    subtotal: Number(item.subtotal) || 0,
    is_available: item.is_available ?? true,
    error_message: item.error_message || undefined,
  };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user, token, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const prevAuthRef = useRef<boolean | null>(null);

  const showNotification = useCallback((message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification((prev) => (prev === message ? null : prev));
    }, 4000);
  }, []);

  const clearWarnings = useCallback(() => {
    setWarnings([]);
  }, []);

  // Initialize and synchronize cart state based on authentication state
  useEffect(() => {
    if (isAuthLoading) return;

    const syncCart = async () => {
      try {
        // Clean legacy generic key
        localStorage.removeItem("vanbass_cart_items");

        if (isAuthenticated && user?.id && token) {
          const userKey = getUserCartStorageKey(user.id);
          const guestSavedRaw = localStorage.getItem(GUEST_CART_KEY);
          let guestItems: CartItem[] = [];
          if (guestSavedRaw) {
            try {
              guestItems = JSON.parse(guestSavedRaw);
            } catch {
              guestItems = [];
            }
          }

          // Case 1: User just logged in and has guest items to merge
          if (guestItems.length > 0) {
            try {
              const sessionId = getOrCreateGuestSessionId();
              const mergePayload = {
                items: guestItems.map((it) => ({
                  product_id: it.product_id,
                  quantity: it.quantity,
                })),
              };

              const res = await fetch(`${apiUrl}/cart/merge`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                  "X-Session-ID": sessionId,
                },
                body: JSON.stringify(mergePayload),
              });

              if (res.ok) {
                const data: BackendCartResponse = await res.json();
                const mapped = (data.items || []).map(mapBackendItemToCartItem);

                startTransition(() => {
                  setItems(mapped);
                  if (data.warnings && data.warnings.length > 0) {
                    setWarnings(data.warnings);
                    showNotification(
                      `Lưu ý giỏ hàng: ${data.warnings.join(" | ")}`
                    );
                  }
                });

                if (userKey) {
                  localStorage.setItem(userKey, JSON.stringify(mapped));
                }
                localStorage.removeItem(GUEST_CART_KEY);
                return;
              }
            } catch (err) {
              console.warn("Backend cart merge failed, falling back to local merge:", err);
            }

            // Fallback if backend /cart/merge fails: merge locally
            let localUserItems: CartItem[] = [];
            if (userKey) {
              const localSaved = localStorage.getItem(userKey);
              if (localSaved) {
                try {
                  localUserItems = JSON.parse(localSaved);
                } catch {
                  localUserItems = [];
                }
              }
            }

            const mergedMap = new Map<string, CartItem>();
            for (const item of localUserItems) {
              mergedMap.set(item.product_id, { ...item });
            }
            for (const item of guestItems) {
              const existing = mergedMap.get(item.product_id);
              if (existing) {
                const newQty = Math.min(
                  existing.quantity + item.quantity,
                  existing.stock_quantity
                );
                mergedMap.set(item.product_id, {
                  ...existing,
                  quantity: newQty,
                  subtotal: newQty * existing.sale_price,
                });
              } else {
                mergedMap.set(item.product_id, { ...item });
              }
            }

            const mergedList = Array.from(mergedMap.values());
            startTransition(() => setItems(mergedList));
            if (userKey) {
              localStorage.setItem(userKey, JSON.stringify(mergedList));
            }
            localStorage.removeItem(GUEST_CART_KEY);
            return;
          }

          // Case 2: Authenticated user without guest items -> fetch backend cart with fallback
          try {
            const res = await fetch(`${apiUrl}/cart`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            if (res.ok) {
              const data: BackendCartResponse = await res.json();
              const mapped = (data.items || []).map(mapBackendItemToCartItem);
              startTransition(() => setItems(mapped));
              if (userKey) {
                localStorage.setItem(userKey, JSON.stringify(mapped));
              }
              return;
            }
          } catch (err) {
            console.warn("Fetch backend cart failed, reading localStorage:", err);
          }

          // Fallback to local storage for user
          if (userKey) {
            const saved = localStorage.getItem(userKey);
            if (saved) {
              startTransition(() => setItems(JSON.parse(saved)));
            } else {
              startTransition(() => setItems([]));
            }
          }
        } else {
          // Guest mode -> load from GUEST_CART_KEY
          const guestSaved = localStorage.getItem(GUEST_CART_KEY);
          if (guestSaved) {
            startTransition(() => setItems(JSON.parse(guestSaved)));
          } else {
            startTransition(() => setItems([]));
          }
        }
      } catch (err) {
        console.error("Cart sync error:", err);
        startTransition(() => setItems([]));
      } finally {
        prevAuthRef.current = isAuthenticated;
      }
    };

    syncCart();
  }, [isAuthenticated, user, token, isAuthLoading, showNotification]);

  // Persist items to local storage (and optimistic sync)
  const saveLocalCart = useCallback(
    (newItems: CartItem[]) => {
      try {
        if (isAuthenticated && user?.id) {
          const userKey = getUserCartStorageKey(user.id);
          if (userKey) {
            localStorage.setItem(userKey, JSON.stringify(newItems));
          }
        } else {
          localStorage.setItem(GUEST_CART_KEY, JSON.stringify(newItems));
        }
      } catch {
        // Ignore localStorage quota errors
      }
    },
    [isAuthenticated, user]
  );

  const addItem = (product: Product, quantity: number = 1) => {
    if (!product.sale_enabled || !product.sale_price) {
      showNotification("Sản phẩm này chỉ hỗ trợ cho thuê hoặc chưa mở bán.");
      return;
    }

    if (product.stock_quantity <= 0) {
      showNotification(`Sản phẩm "${product.name}" hiện đang tạm hết hàng.`);
      return;
    }

    let updatedItems: CartItem[] = [];

    setItems((prev) => {
      const existing = prev.find((item) => item.product_id === product.id);
      if (existing) {
        const newQty = existing.quantity + quantity;
        if (newQty > product.stock_quantity) {
          showNotification(`Đã đạt tối đa số lượng tồn kho (${product.stock_quantity})!`);
          return prev;
        }
        updatedItems = prev.map((item) =>
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
        updatedItems = [...prev, newItem];
      }
      return updatedItems;
    });

    // Persist immediately to localStorage
    if (updatedItems.length > 0) {
      saveLocalCart(updatedItems);
    }

    // If authenticated, sync with backend asynchronously
    if (isAuthenticated && token) {
      fetch(`${apiUrl}/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: product.id, quantity: quantity }),
      }).catch((err) => {
        console.warn("Async backend cart add sync failed (cached locally):", err);
      });
    }

    showNotification(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    let updatedItems: CartItem[] = [];

    setItems((prev) => {
      updatedItems = prev.map((item) => {
        if (item.product_id === productId) {
          const validQty = Math.min(quantity, item.stock_quantity);
          return {
            ...item,
            quantity: validQty,
            subtotal: validQty * item.sale_price,
          };
        }
        return item;
      });
      return updatedItems;
    });

    if (updatedItems.length > 0) {
      saveLocalCart(updatedItems);
    }

    if (isAuthenticated && token) {
      fetch(`${apiUrl}/cart/items/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: quantity }),
      }).catch((err) => {
        console.warn("Async backend cart update sync failed (cached locally):", err);
      });
    }
  };

  const removeItem = (productId: string) => {
    let updatedItems: CartItem[] = [];
    setItems((prev) => {
      updatedItems = prev.filter((item) => item.product_id !== productId);
      return updatedItems;
    });

    saveLocalCart(updatedItems);

    if (isAuthenticated && token) {
      fetch(`${apiUrl}/cart/items/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).catch((err) => {
        console.warn("Async backend cart delete sync failed (cached locally):", err);
      });
    }

    showNotification("Đã xoá sản phẩm khỏi giỏ hàng");
  };

  const clearCart = () => {
    setItems([]);
    if (isAuthenticated && user?.id) {
      const userKey = getUserCartStorageKey(user.id);
      if (userKey) {
        localStorage.removeItem(userKey);
      }
      if (token) {
        fetch(`${apiUrl}/cart`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).catch((err) => {
          console.warn("Async backend cart clear sync failed:", err);
        });
      }
    } else {
      localStorage.removeItem(GUEST_CART_KEY);
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
        warnings,
        clearWarnings,
      }}
    >
      {children}
      {notification && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            backgroundColor: "#18181b",
            color: "#f4f4f5",
            padding: "14px 22px",
            fontSize: "13px",
            fontWeight: 600,
            zIndex: 9999,
            borderRadius: "6px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,255,255,0.15)",
            animation: "fadeIn 0.2s ease-in-out",
            maxWidth: "380px",
            lineHeight: 1.5,
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
