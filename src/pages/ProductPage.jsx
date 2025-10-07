import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";

/* Tabs and content labels mirror the mock: description, materials, care, reviews, delivery & payment,
   title, price, rating count, color/size, and "ADD TO BAG". :contentReference[oaicite:4]{index=4} */
export default function ProductPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { add } = useCart();
  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  return (
    <>
      <Header title="Product" />
      <div className="card" style={{ overflow: "hidden" }}>
        <div className="card__imagewrap">
          <img src={product.image} alt={product.title} />
        </div>
        <div style={{ padding: 16, display: "grid", gap: 12 }}>
          <h2 className="card__title" style={{ fontSize: 18 }}>
            {product.title}
          </h2>
          <div style={{ color: "var(--brand)", fontWeight: 700 }}>
            {product.price}
          </div>
          <div style={{ color: "var(--muted)", fontSize: 12 }}>(58)</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              "DESCRIPTION & SIZE",
              "MATERIALS",
              "CARE GUIDE",
              "REVIEWS",
              "DELIVERY AND PAYMENT",
            ].map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>
              COLOR: GREY
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["S", "XS", "M", "L", "XL"].map((s, i) => (
                <button
                  key={s}
                  className={`chip ${i === 2 ? "chip--active" : ""}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <button
            className="addtocart"
            onClick={() => {
              add(product);
              nav("/checkout");
            }}
          >
            ADD TO BAG
          </button>
        </div>
      </div>
    </>
  );
}
