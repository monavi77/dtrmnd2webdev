import { createContext, useContext, useMemo, useState } from "react";

const FavoritesCtx = createContext(null);

export const useFavorites = () => useContext(FavoritesCtx);

export function FavoritesProvider({ children }) {
  const [items, setItems] = useState([]);

  const add = (product) =>
    setItems((prev) =>
      prev.some((item) => item.id === product.id) ? prev : [...prev, product]
    );

  const remove = (id) =>
    setItems((prev) => prev.filter((product) => product.id !== id));

  const toggle = (product) =>
    setItems((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product]
    );

  const isFavorite = (id) => items.some((product) => product.id === id);

  const value = useMemo(
    () => ({
      items,
      add,
      remove,
      toggle,
      isFavorite,
    }),
    [items]
  );

  return (
    <FavoritesCtx.Provider value={value}>{children}</FavoritesCtx.Provider>
  );
}
