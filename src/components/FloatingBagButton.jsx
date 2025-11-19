import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function FloatingBagButton() {
  const { totalItemCount, isOverlayOpen, setIsOverlayOpen } = useCart();

  const handleClick = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        position: "fixed",
        top: 16,
        right: 16,
        width: 56,
        height: 56,
        borderRadius: "50%",
        backgroundColor: "var(--brand)",
        color: "white",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        zIndex: 999,
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
      aria-label="Open bag"
    >
      <ShoppingBag size={24} />
      {totalItemCount > 0 && (
        <span
          style={{
            position: "absolute",
            top: -4,
            right: -4,
            backgroundColor: "white",
            color: "var(--brand)",
            borderRadius: "50%",
            width: 20,
            height: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 700,
            border: "2px solid var(--brand)",
          }}
        >
          {totalItemCount > 9 ? "9+" : totalItemCount}
        </span>
      )}
    </button>
  );
}

