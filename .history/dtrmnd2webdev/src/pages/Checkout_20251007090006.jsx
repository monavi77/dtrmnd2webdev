import React from 'react'
import BackButton from '../components/BackButton'
import ActionButton from '../components/ActionButton'
import '../styles/checkout.css'

export default function Checkout() {
  const handleBack = () => window.history.back()

  return (
    <div className="checkout-desktop">
      <header className="checkout-top">
        <div className="brand">DTRMND</div>
      </header>

      <div className="checkout-container">
        <BackButton onClick={handleBack} />

        <div className="checkout-grid">
          <section className="actions">
            <ActionButton
              variant="shipAddress"
              title="Shipping Address"
              subtitle="1600 Pennsylvania Avenue NW, Washington, DC 20500, USA"
              rightLabel="Change"
              onChangeClick={() => {}}
            />
            <ActionButton
              variant="shipmentMethod"
              title="Shipment Method"
              subtitle="Express 24 hours"
              rightLabel="Change"
              onChangeClick={() => {}}
            />
            <ActionButton
              variant="paymentMethod"
              title="Payment Method"
              subtitle="Credit card ending in 2648"
              rightLabel="Change"
              onChangeClick={() => {}}
            />
          </section>

          <aside className="summary-card">
            <div className="summary-row"><span>Subtotal</span><span>$264.76</span></div>
            <div className="summary-row"><span>Shipping</span><span>$9.99</span></div>
            <div className="summary-row"><span>Taxes</span><span>$21.37</span></div>
            <div className="summary-row summary-total"><span>Total</span><span>$296.12</span></div>
            <div className="summary-cta">
              <ActionButton variant="placeOrder" title="Place Your Order" onClick={() => {}} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}


