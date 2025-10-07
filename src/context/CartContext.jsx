import { createContext, useContext, useMemo, useState } from "react";
const CartCtx = createContext(null);
export const useCart = () => useContext(CartCtx);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const add = (p) => setItems((prev) => [...prev, p]);
  const remove = (id) => setItems((prev) => prev.filter((x, i) => i !== id));
  const clear = () => setItems([]);
  const value = useMemo(() => ({ items, add, remove, clear }), [items]);
  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}
