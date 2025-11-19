import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function BagOverlay({ isOpen, onClose }) {
  const { items, remove, increment, removeAll, totalItemCount } = useCart();
  const nav = useNavigate();
  const overlayRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  // Reset timer when items change (user added/removed items)
  useEffect(() => {
    if (isOpen) {
      // This will trigger the auto-close effect to reset its timer
      const event = new Event('bag-interaction');
      window.dispatchEvent(event);
    }
  }, [items, isOpen]);

  // Reset closing state when overlay opens
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  // Auto-close after 5 seconds of no interaction
  useEffect(() => {
    if (!isOpen || isClosing) return;

    let timeoutId;

    const startTimer = () => {
      clearTimeout(timeoutId);
      setIsClosing(false);
      timeoutId = setTimeout(() => {
        // Start fade-out animation
        setIsClosing(true);
        // Close after animation completes (300ms)
        setTimeout(() => {
          onClose();
        }, 300);
      }, 5000);
    };

    // Start timer when overlay opens
    startTimer();

    // Track meaningful user interactions
    const handleInteraction = () => {
      startTimer();
    };

    // Track interactions on the overlay itself
    const overlayElement = overlayRef.current;
    if (overlayElement) {
      overlayElement.addEventListener("click", handleInteraction);
      overlayElement.addEventListener("mousedown", handleInteraction);
      overlayElement.addEventListener("touchstart", handleInteraction);
    }

    // Track page-level interactions
    window.addEventListener("click", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("scroll", handleInteraction);
    window.addEventListener("bag-interaction", handleInteraction);

    return () => {
      clearTimeout(timeoutId);
      if (overlayElement) {
        overlayElement.removeEventListener("click", handleInteraction);
        overlayElement.removeEventListener("mousedown", handleInteraction);
        overlayElement.removeEventListener("touchstart", handleInteraction);
      }
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("bag-interaction", handleInteraction);
    };
  }, [isOpen, onClose, isClosing]);

  const total = items.reduce(
    (acc, item) => {
      const price = Number((item.product.price || "$0").replace(/[^0-9.]/g, ""));
      return acc + price * item.quantity;
    },
    0
  );

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        top: 80,
        right: 16,
        width: "400px",
        maxHeight: "80vh",
        backgroundColor: "white",
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        opacity: isClosing ? 0 : 1,
        transform: isClosing ? "translateY(-10px)" : "translateY(0)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 16px",
          borderBottom: "1px solid var(--ring)",
          backgroundColor: "var(--background)",
        }}
      >
        <div style={{ fontWeight: 600, fontSize: 16 }}>Bag ({totalItemCount})</div>
        <button
          onClick={() => {
            setIsClosing(true);
            setTimeout(() => {
              onClose();
            }, 300);
          }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
            display: "flex",
            alignItems: "center",
          }}
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      {/* Content */}
      <div
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
          {items.length === 0 ? (
            <p style={{ color: "var(--muted)", textAlign: "center", padding: 20 }}>
              Your bag is empty.
            </p>
          ) : (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {items.map((item, i) => {
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
                        minWidth: 0,
                        overflow: "hidden",
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
                      <div style={{ minWidth: 0, overflow: "hidden" }}>
                        <div style={{ fontWeight: 600, fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {p.title}
                        </div>
                        <div style={{ color: "var(--muted)", fontSize: 12 }}>
                          Size: M • Quantity: {item.quantity}
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 14, marginBottom: 8 }}>${totalPrice.toFixed(2)}</div>
                        <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "flex-end" }}>
                          <button
                            onClick={() => remove(i)}
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 4,
                              border: "1px solid var(--ring)",
                              backgroundColor: "white",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 18,
                              fontWeight: 600,
                              color: "var(--foreground)",
                            }}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span style={{ minWidth: 24, textAlign: "center", fontWeight: 600 }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increment(i)}
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 4,
                              border: "1px solid var(--ring)",
                              backgroundColor: "white",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 18,
                              fontWeight: 600,
                              color: "var(--foreground)",
                            }}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="linklike"
                          onClick={() => removeAll(i)}
                          style={{ fontSize: 12, marginTop: 4, display: "block", width: "100%" }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {items.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: 12,
                    borderTop: "1px solid var(--ring)",
                  }}
                >
                  <div style={{ color: "var(--muted)", fontWeight: 600 }}>
                    Subtotal
                  </div>
                  <div style={{ fontWeight: 600 }}>${total.toFixed(2)}</div>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  className="addtocart"
                  onClick={() => {
                    onClose();
                    nav("/bag");
                  }}
                  style={{
                    padding: "14px 24px",
                    fontSize: "16px",
                    fontWeight: 600,
                  }}
                >
                  View Bag
                </button>
              </div>
            </>
          )}
        </div>
    </div>
  );
}

