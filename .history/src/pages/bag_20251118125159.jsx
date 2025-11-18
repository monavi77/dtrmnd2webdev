import Header from "../components/Header";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Bag() {
  const { items, remove } = useCart();
  const nav = useNavigate();

  const total = items.reduce(
    (acc, p) => acc + Number((p.price || "$0").replace(/[^0-9.]/g, "")),
    0
  );

  return (
    <>
      <Header title="Bag" />
      <div className="container" style={{ display: "grid", gap: 12 }}>
        <div className="card" style={{ padding: 12 }}>
          {items.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>Your bag is empty.</p>
          ) : (
            items.map((p, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "64px 1fr auto",
                  gap: 12,
                  alignItems: "center",
                  padding: "8px 0",
                  borderBottom: "1px solid var(--ring)",
                }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  style={{
                    width: 64,
                    height: 64,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
                <div>
                  <div style={{ fontWeight: 600 }}>{p.title}</div>
                  <div style={{ color: "var(--muted)", fontSize: 12 }}>
                    Size: M
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div>{p.price}</div>
                  <button className="linklike" onClick={() => remove(i)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
          {items.length > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: 12,
              }}
            >
              <div style={{ color: "var(--muted)" }}>Subtotal</div>
              <div>${total.toFixed(2)}</div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div style={{ display: "flex", gap: 12 }}>
            <button
              className="addtocart"
              onClick={() => nav("/checkout")}
              style={{ flex: 1 }}
            >
              Go to Checkout
            </button>
            <button
              className="addtocart"
              onClick={() => nav("/women")}
              style={{ 
                flex: 1,
                backgroundColor: "#e5e5e5",
                color: "#333",
              }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}

