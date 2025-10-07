import ProductCard from "./ProductCard";
export default function ProductGrid({ products }) {
  if (!products.length)
    return <p style={{ color: "var(--muted)" }}>No products.</p>;
  return (
    <section className="store__grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </section>
  );
}
