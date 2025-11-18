import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartButton() {
  const { totalItemCount } = useCart();
  const nav = useNavigate();

  return (
    <button
      className="icon-btn"
      aria-label="Cart"
      onClick={() => nav("/bag")}
      style={{ position: "relative" }}
    >
      <ShoppingBag size={18} />
      {totalItemCount > 0 && (
        <span
          style={{
            position: "absolute",
            top: -4,
            right: -4,
            backgroundColor: "var(--primary)",
            color: "white",
            borderRadius: "50%",
            width: 18,
            height: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10,
            fontWeight: 600,
          }}
        >
          {totalItemCount > 9 ? "9+" : totalItemCount}
        </span>
      )}
    </button>
  );
}

