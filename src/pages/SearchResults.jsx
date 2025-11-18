import Header from "../components/Header";
import ProductGrid from "../components/ProductGrid";
import Tabs from "../components/Tabs";
import { PRODUCTS } from "../data/products";

/* Uses item names/prices from your Search Results mock. :contentReference[oaicite:3]{index=3} */
export default function SearchResults() {
  return (
    <>
      <Header title="Search" />
      <div style={{ marginBottom: 12, color: "var(--muted)" }}>
        Showing results for your query
      </div>
      <ProductGrid products={PRODUCTS.filter(Boolean)} />
      <Tabs active="browse" />
    </>
  );
}
