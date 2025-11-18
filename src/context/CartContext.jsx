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
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.warn("Failed to read cart from storage", err);
      return [];
    }
  });
  const add = (p) => setItems((prev) => [...prev, p]);
  const remove = (id) => setItems((prev) => prev.filter((x, i) => i !== id));
  const clear = () => setItems([]);
  const value = useMemo(() => ({ items, add, remove, clear }), [items]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.warn("Failed to persist cart", err);
    }
  }, [items]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}
