import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PRODUCTS as STATIC_PRODUCTS } from "../data/products";

const ProductsCtx = createContext(null);
const API_URL =
  "https://api.escuelajs.co/api/v1/products?offset=0&limit=60"; // fakeapi.platzi.com
const MIN_PRODUCTS = 30;

const mapProduct = (item) => {
  const categoryName = item.category?.name || item.category || "Apparel";
  const normalizedCategory = categoryName.toLowerCase();
  const gender = normalizedCategory.includes("women")
    ? "Women"
    : normalizedCategory.includes("men")
    ? "Men"
    : "All";
  const image = Array.isArray(item.images)
    ? item.images.find((url) => typeof url === "string" && url.startsWith("http"))
    : item.thumbnail || item.image;
  return {
    id: `platzi-${item.id}`,
    title: item.title,
    price: `$${Number(item.price || 0).toFixed(2)}`,
    tag: categoryName,
    image,
    gender,
    source: "platzi",
  };
};

const mergeProducts = (primary, fallback = []) => {
  const unique = [];
  const seen = new Set();
  const add = (item) => {
    if (!item || !item.image) return;
    if (seen.has(item.id)) return;
    unique.push(item);
    seen.add(item.id);
  };
  primary.forEach(add);
  fallback.forEach(add);
  return unique.slice(0, MIN_PRODUCTS);
};

export const useProducts = () => useContext(ProductsCtx);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(STATIC_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok)
          throw new Error(`Failed to load products (${response.status})`);
        const data = await response.json();
        if (!active) return;
        const mapped = (Array.isArray(data) ? data : []).map(mapProduct);
        const merged = mergeProducts(mapped, STATIC_PRODUCTS);
        setProducts(merged.length ? merged : mergeProducts(STATIC_PRODUCTS));
        setError(null);
      } catch (err) {
        if (!active) return;
        console.warn("Product fetch failed, using static fallback", err);
        setProducts(mergeProducts(STATIC_PRODUCTS));
        setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
    }),
    [products, loading, error]
  );

  return (
    <ProductsCtx.Provider value={value}>{children}</ProductsCtx.Provider>
  );
}
