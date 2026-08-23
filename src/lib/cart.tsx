"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useSyncExternalStore,
} from "react";

export type ProductKey = "non-la" | "to-he" | "chuon-chuon";

export interface ProductInfo {
  key: ProductKey;
  label: string;
  village: string;
  price: number;
  image: string;
}

export const PRODUCTS_CATALOG: Record<ProductKey, ProductInfo> = {
  "non-la": {
    key: "non-la",
    label: "Hộp DIY Nón Lá Mini",
    village: "Làng Nón Chuông",
    price: 160000,
    image: "/products/non-chuong.jpg",
  },
  "to-he": {
    key: "to-he",
    label: "Hộp DIY Tò He Dân Gian",
    village: "Làng Tò He Xuân La",
    price: 160000,
    image: "/products/to-he.jpg",
  },
  "chuon-chuon": {
    key: "chuon-chuon",
    label: "Hộp DIY Chuồn Chuồn Tre",
    village: "Làng Tre Thạch Xá",
    price: 160000,
    image: "/products/chuon-chuon-tre.jpg",
  },
};

const STORAGE_KEY = "cham_thuc_multi_cart";

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

interface CartContextType {
  cartState: Record<ProductKey, number>;
  totalCount: number;
  totalPrice: number;
  cartEntries: ProductKey[];
  isCartOpen: boolean;
  activeInitialKey?: ProductKey;
  openCart: (productKey?: ProductKey) => void;
  closeCart: () => void;
  addItem: (key: ProductKey) => void;
  updateQuantity: (key: ProductKey, qty: number) => void;
  removeItem: (key: ProductKey) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isMounted = useIsClient();

  const [cartState, setCartState] = useState<Record<ProductKey, number>>(() => {
    if (typeof window === "undefined") return {} as Record<ProductKey, number>;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed === "object" && parsed !== null) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return {} as Record<ProductKey, number>;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeInitialKey, setActiveInitialKey] = useState<ProductKey | undefined>(undefined);

  const updateQuantity = useCallback((key: ProductKey, qty: number) => {
    setCartState((prev) => {
      const next = { ...prev };
      if (qty <= 0) {
        delete next[key];
      } else {
        next[key] = Math.min(99, qty);
      }
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
      }
      return next;
    });
  }, []);

  const addItem = useCallback((key: ProductKey) => {
    setCartState((prev) => {
      const currentQty = prev[key] || 0;
      const next = { ...prev, [key]: Math.min(99, currentQty + 1) };
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
      }
      return next;
    });
  }, []);

  const removeItem = useCallback(
    (key: ProductKey) => {
      updateQuantity(key, 0);
    },
    [updateQuantity]
  );

  const clearCart = useCallback(() => {
    setCartState({} as Record<ProductKey, number>);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({}));
      } catch {
        // ignore
      }
    }
  }, []);

  const openCart = useCallback((productKey?: ProductKey) => {
    if (productKey) {
      setActiveInitialKey(productKey);
      setCartState((prev) => {
        const currentQty = prev[productKey] || 0;
        const next = { ...prev, [productKey]: Math.max(1, currentQty) };
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
          } catch {
            // ignore
          }
        }
        return next;
      });
    } else {
      setActiveInitialKey(undefined);
    }
    setIsCartOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
    setActiveInitialKey(undefined);
  }, []);

  const cartEntries = useMemo(() => {
    if (!isMounted) return [];
    return (Object.keys(cartState) as ProductKey[]).filter(
      (k) => (cartState[k] || 0) > 0 && PRODUCTS_CATALOG[k]
    );
  }, [cartState, isMounted]);

  const totalCount = useMemo(() => {
    if (!isMounted) return 0;
    return cartEntries.reduce((sum, k) => sum + (cartState[k] || 0), 0);
  }, [cartEntries, cartState, isMounted]);

  const totalPrice = useMemo(() => {
    if (!isMounted) return 0;
    return cartEntries.reduce(
      (sum, k) => sum + (PRODUCTS_CATALOG[k]?.price || 0) * (cartState[k] || 0),
      0
    );
  }, [cartEntries, cartState, isMounted]);

  return (
    <CartContext.Provider
      value={{
        cartState,
        totalCount,
        totalPrice,
        cartEntries,
        isCartOpen,
        activeInitialKey,
        openCart,
        closeCart,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
