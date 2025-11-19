import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import ProductGrid from "../components/ProductGrid";
import Tabs from "../components/Tabs";
import { useProducts } from "../context/ProductsContext";

export default function SearchResults() {
  const [params] = useSearchParams();
  const { products, loading } = useProducts();
  const query = params.get("query")?.trim() || "";

  const filtered = useMemo(() => {
    if (!query) return products;
    const q = query.toLowerCase();
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(q) ||
        product.tag?.toLowerCase().includes(q)
    );
  }, [products, query]);

  return (
    <>
      <Header title={query ? "Search" : "Browse"} />
      {query && (
        <div style={{ marginBottom: 12, color: "var(--muted)" }}>
          Showing results for "{query}"
        </div>
      )}
      {loading && (
        <p style={{ color: "var(--muted)", marginBottom: 12 }}>
          Loading styles…
        </p>
      )}
      <ProductGrid products={filtered} />
      <Tabs active={query ? "" : "browse"} />
    </>
  );
}
