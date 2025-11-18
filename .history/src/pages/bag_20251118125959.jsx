import Header from "../components/Header";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Bag() {
  const { items, remove, removeAll } = useCart();
  const nav = useNavigate();

  const total = items.reduce(
    (acc, item) => {
      const price = Number((item.product.price || "$0").replace(/[^0-9.]/g, ""));
      return acc + price * item.quantity;
    },
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
            items.map((item, i) => {
              const p = item.product;
              const itemPrice = Number((p.price || "$0").replace(/[^0-9.]/g, ""));
              const totalPrice = itemPrice * item.quantity;
              return (
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
                      Size: M • Quantity: {item.quantity}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div>${totalPrice.toFixed(2)}</div>
                    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 4 }}>
                      <button className="linklike" onClick={() => remove(i)}>
                        {item.quantity > 1 ? "-" : "Remove"}
                      </button>
                      {item.quantity > 1 && (
                        <button className="linklike" onClick={() => removeAll(i)}>
                          Remove All
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
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

