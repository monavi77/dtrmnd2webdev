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

        <section className="placeholder-panel" aria-hidden />

        <section className="actions">
          <ActionButton
            variant="shipAddress"
            title="Shipping Address"
            subtitle="1600 Pennsylvania Avenue NW, Washington, DC 20500, USA"
            rightLabel="Change"
            onClick={() => {}}
          />
          <ActionButton
            variant="shipmentMethod"
            title="Shipment Method"
            subtitle="Express 24 hours"
            rightLabel="Change"
            onClick={() => {}}
          />
          <ActionButton
            variant="paymentMethod"
            title="Payment Method"
            subtitle="Credit card ending in 2648"
            rightLabel="Change"
            onClick={() => {}}
          />
          <ActionButton
            variant="placeOrder"
            title="Place Your Order"
            onClick={() => {}}
          />
        </section>
      </div>
    </div>
  )
}


