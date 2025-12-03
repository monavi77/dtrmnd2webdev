import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { PRODUCTS as STATIC_PRODUCTS } from "../data/products";

const ProductsCtx = createContext(null);
const MIN_PRODUCTS = 30;
const DUMMY_BASE = "https://dummyjson.com/products/category";
const CATEGORIES = [
  "womens-dresses",
  "womens-shoes",
  "womens-bags",
  "womens-watches",
  "womens-jewellery",
  "womens-dresses",
  "tops",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "mens-shirts",
  "mens-shorts",
];

const normalize = (value = "") =>
  String(value).toLowerCase().replace(/[^a-z\s]/g, " ");

const detectGender = (item) => {
  const text = normalize(`${item?.title || ""} ${item?.category || ""}`);
  if (text.includes("women") || text.includes("womens")) return "Women";
  if (text.includes("men") || text.includes("mens")) return "Men";
  return "Women"; // default to women-first catalog
};

const pickImage = (item) => {
  if (Array.isArray(item?.images)) {
    const first = item.images.find(
      (url) => typeof url === "string" && url.startsWith("http")
    );
    if (first) return first;
  }
  if (item?.thumbnail?.startsWith?.("http")) return item.thumbnail;
  return null;
};

const mapProduct = (item) => {
  const image = pickImage(item);
  if (!image) return null;
  return {
    id: `dummy-${item.id}`,
    title: item.title,
    price: `$${Number(item.price || 0).toFixed(2)}`,
    tag: item.category || "Apparel",
    image,
    gender: detectGender(item),
    source: "dummyjson",
  };
};

const mergeProducts = (primary, fallback = []) => {
  const unique = [];
  const seen = new Set();
  const add = (item) => {
    if (!item || !item.id) return;
    if (seen.has(item.id)) return;
    unique.push(item);
    seen.add(item.id);
  };
  primary.forEach(add);
  fallback.forEach(add);
  return unique
    .sort((a, b) => {
      if (a.gender === b.gender) return 0;
      if (a.gender === "Women") return -1;
      if (b.gender === "Women") return 1;
      return 0;
    })
    .slice(0, MIN_PRODUCTS);
};

export const useProducts = () => useContext(ProductsCtx);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(
    mergeProducts(
      STATIC_PRODUCTS.map((p) => ({ ...p, source: "static" })),
      []
    )
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        setLoading(true);
        const responses = await Promise.all(
          CATEGORIES.map((cat) =>
            fetch(`${DUMMY_BASE}/${encodeURIComponent(cat)}`).then((res) => {
              if (!res.ok) throw new Error(`Failed ${cat} (${res.status})`);
              return res.json();
            })
          )
        );

        const allProducts = responses
          .flatMap((entry) => entry?.products || [])
          .map(mapProduct)
          .filter(Boolean);

        const merged = mergeProducts(
          allProducts,
          STATIC_PRODUCTS.map((p) => ({ ...p, source: "static" }))
        );

        if (!active) return;
        setProducts(merged);
        setError(null);
      } catch (err) {
        if (!active) return;
        console.warn("DummyJSON fetch failed, using static fallback", err);
        setProducts(
          mergeProducts(
            STATIC_PRODUCTS.map((p) => ({ ...p, source: "static" })),
            []
          )
        );
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

  return <ProductsCtx.Provider value={value}>{children}</ProductsCtx.Provider>;
}
