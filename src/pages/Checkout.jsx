import Header from "../components/Header";
import CartButton from "../components/CartButton";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { items, remove, clear } = useCart();
  const nav = useNavigate();

  const total = items.reduce(
    (acc, p) => acc + Number((p.price || "$0").replace(/[^0-9.]/g, "")),
    0
  );

  return (
    <>
      <Header title="Bag" right={<CartButton />} />
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

        <div className="card" style={{ padding: 12 }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>
            Shipping Address
          </div>
          <div>1600 Pennsylvania Avenue NW, Washington, DC 20500, USA</div>
          <button className="linklike">Change</button>
        </div>

        <div className="card" style={{ padding: 12 }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>
            Shipment Method
          </div>
          <div>Express 24 hours</div>
          <button className="linklike">Change</button>
        </div>

        <div className="card" style={{ padding: 12 }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Payment Method</div>
          <div>Credit card ending in 2648</div>
          <button className="linklike">Change</button>
        </div>

        <button
          className="addtocart"
          onClick={() => {
            clear();
            nav("/order-confirmation");
          }}
        >
          Place Your Order
        </button>
      </div>
    </>
  );
}
