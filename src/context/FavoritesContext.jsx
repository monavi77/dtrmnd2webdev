import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const FavoritesCtx = createContext(null);
const STORAGE_KEY = "favorites";

export const useFavorites = () => useContext(FavoritesCtx);

export function FavoritesProvider({ children }) {
  const [items, setItems] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.warn("Failed to read favorites from storage", err);
      return [];
    }
  });

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

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.warn("Failed to persist favorites", err);
    }
  }, [items]);

  return (
    <FavoritesCtx.Provider value={value}>{children}</FavoritesCtx.Provider>
  );
}
