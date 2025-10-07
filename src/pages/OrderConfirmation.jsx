import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

/* Matches your success screen copy. :contentReference[oaicite:6]{index=6} */
export default function OrderConfirmation() {
  const nav = useNavigate();
  return (
    <>
      <Header title="Success" />
      <div className="card" style={{ padding: 24, textAlign: "center" }}>
        <h2 className="card__title" style={{ fontSize: 22, marginBottom: 8 }}>
          Your Order Has Been Placed!
        </h2>
        <p style={{ color: "var(--muted)", marginBottom: 16 }}>
          You’ll receive an email confirmation shortly.
        </p>
        <button className="addtocart" onClick={() => nav("/women")}>
          Continue Shopping
        </button>
      </div>
    </>
  );
}
