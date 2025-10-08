import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartButton() {
  const { items } = useCart();
  const nav = useNavigate();
  const count = items.length;

  return (
    <button
      className="icon-btn cart-btn"
      aria-label="Open cart"
      onClick={() => nav("/checkout")}
    >
      <ShoppingBag size={18} />
      {count > 0 && <span className="badge badge--count">{count}</span>}
    </button>
  );
}
