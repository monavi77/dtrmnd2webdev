import Header from "../components/Header";
import ProductGrid from "../components/ProductGrid";
import CartButton from "../components/CartButton";
import { PRODUCTS } from "../data/products";

export default function SearchResults() {
  return (
    <>
      <Header title="Search" right={<CartButton />} />
      <div className="container">
        <div style={{ marginBottom: 12, color: "var(--muted)" }}>
          Showing results for your query
        </div>
        <ProductGrid products={PRODUCTS} />
      </div>
    </>
  );
}
