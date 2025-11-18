import ProductCard from "./ProductCard";
export default function ProductGrid({ products, onAdd }) {
  if (!products.length)
    return <p style={{ color: "var(--muted)" }}>No products.</p>;
  return (
    <section className="store__grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onAdd={onAdd} />
      ))}
    </section>
  );
}
