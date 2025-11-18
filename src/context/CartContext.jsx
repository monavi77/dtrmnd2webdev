import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
const CartCtx = createContext(null);
export const useCart = () => useContext(CartCtx);
const STORAGE_KEY = "cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Migrate old format (array of products) to new format (array of {product, quantity})
        if (parsed.length > 0 && !parsed[0].quantity) {
          // Old format - convert to new format
          const grouped = {};
          parsed.forEach((p) => {
            if (grouped[p.id]) {
              grouped[p.id].quantity += 1;
            } else {
              grouped[p.id] = { product: p, quantity: 1 };
            }
          });
          return Object.values(grouped);
        }
        return parsed;
      }
      return [];
    } catch (err) {
      console.warn("Failed to read cart from storage", err);
      return [];
    }
  });
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  
  const add = (p) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === p.id);
      if (existingIndex >= 0) {
        // Item exists, increment quantity
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      } else {
        // New item, add with quantity 1
        return [...prev, { product: p, quantity: 1 }];
      }
    });
    setIsOverlayOpen(true);
  };
  
  const remove = (index) => {
    setItems((prev) => {
      const item = prev[index];
      if (item.quantity > 1) {
        // Decrement quantity
        const updated = [...prev];
        updated[index] = { ...updated[index], quantity: updated[index].quantity - 1 };
        return updated;
      } else {
        // Remove item completely
        return prev.filter((x, i) => i !== index);
      }
    });
  };
  
  const increment = (index) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        quantity: updated[index].quantity + 1,
      };
      return updated;
    });
  };
  
  const removeAll = (index) => {
    setItems((prev) => prev.filter((x, i) => i !== index));
  };
  
  const clear = () => setItems([]);
  
  // Calculate total item count (sum of quantities)
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const value = useMemo(
    () => ({
      items,
      add,
      remove,
      increment,
      removeAll,
      clear,
      totalItemCount,
      isOverlayOpen,
      setIsOverlayOpen,
    }),
    [items, isOverlayOpen, totalItemCount]
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.warn("Failed to persist cart", err);
    }
  }, [items]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}
