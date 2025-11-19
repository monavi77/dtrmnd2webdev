import Header from "../components/Header";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Checkout() {
  const { items, remove, increment, removeAll, clear } = useCart();
  const nav = useNavigate();

  // Helper functions for localStorage
  const loadFromLocalStorage = (key, defaultValue) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  };

  const saveToLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  // Load initial state from localStorage
  const defaultShippingAddress = "1600 Pennsylvania Avenue NW, Washington, DC 20500, USA";
  const defaultCardType = "Credit card";
  const defaultCardNumber = "1234567890122648";
  const defaultCvv = "123";
  const defaultExpirationDate = "12/25";
  const defaultShipmentMethod = "Express 24 hours";

  // State for shipping address
  const [shippingAddress, setShippingAddress] = useState(() =>
    loadFromLocalStorage("checkout_shippingAddress", defaultShippingAddress)
  );
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [tempAddress, setTempAddress] = useState(shippingAddress);

  // State for payment method
  const [cardType, setCardType] = useState(() =>
    loadFromLocalStorage("checkout_cardType", defaultCardType)
  );
  const [creditCardNumber, setCreditCardNumber] = useState(() =>
    loadFromLocalStorage("checkout_creditCardNumber", defaultCardNumber)
  );
  const [cvv, setCvv] = useState(() =>
    loadFromLocalStorage("checkout_cvv", defaultCvv)
  );
  const [expirationDate, setExpirationDate] = useState(() =>
    loadFromLocalStorage("checkout_expirationDate", defaultExpirationDate)
  );
  const [isEditingPayment, setIsEditingPayment] = useState(false);
  const [tempCardType, setTempCardType] = useState("");
  const [tempCardNumber, setTempCardNumber] = useState("");
  const [tempCvv, setTempCvv] = useState("");
  const [tempExpirationDate, setTempExpirationDate] = useState("");

  // State for shipment method
  const [shipmentMethod, setShipmentMethod] = useState(() =>
    loadFromLocalStorage("checkout_shipmentMethod", defaultShipmentMethod)
  );
  const [isEditingShipment, setIsEditingShipment] = useState(false);

  // Update tempAddress when shippingAddress changes
  useEffect(() => {
    setTempAddress(shippingAddress);
  }, [shippingAddress]);

  // Auto-save shipping address to localStorage when it changes
  useEffect(() => {
    if (shippingAddress) {
      saveToLocalStorage("checkout_shippingAddress", shippingAddress);
    }
  }, [shippingAddress]);

  // Auto-save payment information to localStorage when it changes
  useEffect(() => {
    if (cardType && creditCardNumber && cvv && expirationDate) {
      saveToLocalStorage("checkout_cardType", cardType);
      saveToLocalStorage("checkout_creditCardNumber", creditCardNumber);
      saveToLocalStorage("checkout_cvv", cvv);
      saveToLocalStorage("checkout_expirationDate", expirationDate);
    }
  }, [cardType, creditCardNumber, cvv, expirationDate]);

  // Auto-save shipment method to localStorage when it changes
  useEffect(() => {
    if (shipmentMethod) {
      saveToLocalStorage("checkout_shipmentMethod", shipmentMethod);
    }
  }, [shipmentMethod]);

  // Save all data on component unmount (when navigating away)
  useEffect(() => {
    return () => {
      // Cleanup function runs when component unmounts
      if (shippingAddress) {
        saveToLocalStorage("checkout_shippingAddress", shippingAddress);
      }
      if (cardType && creditCardNumber && cvv && expirationDate) {
        saveToLocalStorage("checkout_cardType", cardType);
        saveToLocalStorage("checkout_creditCardNumber", creditCardNumber);
        saveToLocalStorage("checkout_cvv", cvv);
        saveToLocalStorage("checkout_expirationDate", expirationDate);
      }
      if (shipmentMethod) {
        saveToLocalStorage("checkout_shipmentMethod", shipmentMethod);
      }
    };
  }, [shippingAddress, cardType, creditCardNumber, cvv, expirationDate, shipmentMethod]);

  // Helper function to get last 4 digits of credit card
  const getLastFourDigits = (cardNumber) => {
    const digits = cardNumber.replace(/\D/g, "");
    return digits.slice(-4);
  };

  // Helper function to format expiration date as MM/YY
  const formatExpirationDate = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");
    
    // Limit to 4 digits
    const limited = digits.slice(0, 4);
    
    // Format as MM/YY
    if (limited.length === 0) return "";
    if (limited.length <= 2) return limited;
    return `${limited.slice(0, 2)}/${limited.slice(2)}`;
  };

  // Handler for card number input (max 16 digits)
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Only digits
    if (value.length <= 16) {
      setTempCardNumber(value);
    }
  };

  // Handler for CVV input (max 3 digits)
  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Only digits
    if (value.length <= 3) {
      setTempCvv(value);
    }
  };

  // Handler for expiration date input
  const handleExpirationDateChange = (e) => {
    const formatted = formatExpirationDate(e.target.value);
    setTempExpirationDate(formatted);
  };

  // Helper function to check if all payment fields are valid
  const isPaymentFormValid = () => {
    if (!tempCardType || !tempCardNumber || !tempCvv || !tempExpirationDate) {
      return false;
    }
    const cardDigits = tempCardNumber.replace(/\D/g, "");
    const cvvDigits = tempCvv.replace(/\D/g, "");
    return (
      cardDigits.length === 16 &&
      cvvDigits.length === 3 &&
      /^\d{2}\/\d{2}$/.test(tempExpirationDate)
    );
  };

  // Handler functions for shipping address
  const handleAddressChange = () => {
    setIsEditingAddress(true);
    setTempAddress(shippingAddress);
  };

  const handleAddressSave = () => {
    setShippingAddress(tempAddress);
    saveToLocalStorage("checkout_shippingAddress", tempAddress);
    setIsEditingAddress(false);
  };

  const handleAddressCancel = () => {
    setTempAddress(shippingAddress);
    setIsEditingAddress(false);
  };

  // Handler functions for payment method
  const handlePaymentChange = () => {
    setIsEditingPayment(true);
    setTempCardType("");
    setTempCardNumber("");
    setTempCvv("");
    setTempExpirationDate("");
  };

  // Handler for card type change - clear fields when card type changes
  const handleCardTypeChange = (e) => {
    setTempCardType(e.target.value);
    // Clear card details when card type changes
    if (e.target.value === "") {
      setTempCardNumber("");
      setTempCvv("");
      setTempExpirationDate("");
    }
  };

  const handlePaymentSave = () => {
    // Validate that all fields are filled in
    if (
      !tempCardType ||
      !tempCardNumber ||
      !tempCvv ||
      !tempExpirationDate
    ) {
      return;
    }
    // Validate card number is 16 digits
    const cardDigits = tempCardNumber.replace(/\D/g, "");
    if (cardDigits.length !== 16) {
      return;
    }
    // Validate CVV is 3 digits
    const cvvDigits = tempCvv.replace(/\D/g, "");
    if (cvvDigits.length !== 3) {
      return;
    }
    // Validate expiration date format (MM/YY)
    if (!/^\d{2}\/\d{2}$/.test(tempExpirationDate)) {
      return;
    }
    setCardType(tempCardType);
    setCreditCardNumber(tempCardNumber);
    setCvv(tempCvv);
    setExpirationDate(tempExpirationDate);
    // Save to localStorage
    saveToLocalStorage("checkout_cardType", tempCardType);
    saveToLocalStorage("checkout_creditCardNumber", tempCardNumber);
    saveToLocalStorage("checkout_cvv", tempCvv);
    saveToLocalStorage("checkout_expirationDate", tempExpirationDate);
    setIsEditingPayment(false);
  };

  const handlePaymentCancel = () => {
    setTempCardType("");
    setTempCardNumber("");
    setTempCvv("");
    setTempExpirationDate("");
    setIsEditingPayment(false);
  };

  // Handler functions for shipment method
  const handleShipmentChange = () => {
    setIsEditingShipment(true);
  };

  const handleShipmentSave = () => {
    saveToLocalStorage("checkout_shipmentMethod", shipmentMethod);
    setIsEditingShipment(false);
  };

  const handleShipmentCancel = () => {
    setIsEditingShipment(false);
  };

  const total = items.reduce(
    (acc, item) => {
      const price = Number((item.product.price || "$0").replace(/[^0-9.]/g, ""));
      return acc + price * item.quantity;
    },
    0
  );

  return (
    <>
      <Header title="Checkout" />
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
                    <div style={{ marginBottom: 8 }}>${totalPrice.toFixed(2)}</div>
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

        <div className="card" style={{ padding: 12 }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>
            Shipping Address
          </div>
          {isEditingAddress ? (
            <div style={{ display: "grid", gap: 8 }}>
              <textarea
                value={tempAddress}
                onChange={(e) => setTempAddress(e.target.value)}
                style={{
                  padding: 8,
                  borderRadius: 4,
                  border: "1px solid var(--ring)",
                  fontFamily: "inherit",
                  fontSize: 14,
                  minHeight: 60,
                }}
                placeholder="Enter shipping address"
              />
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className="linklike"
                  onClick={handleAddressSave}
                  style={{ color: "var(--primary)" }}
                >
                  Save
                </button>
                <button className="linklike" onClick={handleAddressCancel}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div>{shippingAddress}</div>
              <button className="linklike" onClick={handleAddressChange}>
                Change
              </button>
            </>
          )}
        </div>

        <div className="card" style={{ padding: 12 }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>
            Shipment Method
          </div>
          {isEditingShipment ? (
            <div style={{ display: "grid", gap: 8 }}>
              <select
                value={shipmentMethod}
                onChange={(e) => setShipmentMethod(e.target.value)}
                style={{
                  padding: 8,
                  borderRadius: 4,
                  border: "1px solid var(--ring)",
                  fontFamily: "inherit",
                  fontSize: 14,
                }}
              >
                <option value="Express 24 hours">Express 24 hours</option>
                <option value="Standard Shipping">Standard Shipping</option>
                <option value="Faster Shipping">Faster Shipping</option>
              </select>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className="linklike"
                  onClick={handleShipmentSave}
                  style={{ color: "var(--primary)" }}
                >
                  Save
                </button>
                <button className="linklike" onClick={handleShipmentCancel}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div>{shipmentMethod}</div>
              <button className="linklike" onClick={handleShipmentChange}>
                Change
              </button>
            </>
          )}
        </div>

        <div className="card" style={{ padding: 12 }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Payment Method</div>
          {isEditingPayment ? (
            <div style={{ display: "grid", gap: 8 }}>
              <select
                value={tempCardType}
                onChange={handleCardTypeChange}
                style={{
                  padding: 8,
                  borderRadius: 4,
                  border: "1px solid var(--ring)",
                  fontFamily: "inherit",
                  fontSize: 14,
                }}
              >
                <option value="" style={{ color: "var(--muted)" }}>
                  Select card type
                </option>
                <option value="Credit card">Credit card</option>
                <option value="Debit card">Debit card</option>
              </select>
              {tempCardType && (
                <>
                  <input
                    type="text"
                    value={tempCardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="Card number (16 digits)"
                    maxLength={16}
                    style={{
                      padding: 8,
                      borderRadius: 4,
                      border: "1px solid var(--ring)",
                      fontFamily: "inherit",
                      fontSize: 14,
                    }}
                  />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    <input
                      type="text"
                      value={tempCvv}
                      onChange={handleCvvChange}
                      placeholder="CVV"
                      maxLength={3}
                      style={{
                        padding: 8,
                        borderRadius: 4,
                        border: "1px solid var(--ring)",
                        fontFamily: "inherit",
                        fontSize: 14,
                      }}
                    />
                    <input
                      type="text"
                      value={tempExpirationDate}
                      onChange={handleExpirationDateChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      style={{
                        padding: 8,
                        borderRadius: 4,
                        border: "1px solid var(--ring)",
                        fontFamily: "inherit",
                        fontSize: 14,
                      }}
                    />
                  </div>
                </>
              )}
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className="linklike"
                  onClick={handlePaymentSave}
                  disabled={!isPaymentFormValid()}
                  style={{
                    color: isPaymentFormValid() ? "var(--primary)" : "var(--muted)",
                    opacity: isPaymentFormValid() ? 1 : 0.6,
                    cursor: isPaymentFormValid() ? "pointer" : "not-allowed",
                  }}
                >
                  Save
                </button>
                <button className="linklike" onClick={handlePaymentCancel}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div>
                {cardType} ending in {getLastFourDigits(creditCardNumber)}
              </div>
              <button className="linklike" onClick={handlePaymentChange}>
                Change
              </button>
            </>
          )}
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
