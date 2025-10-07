import React from 'react'
import NavBar from '../components/NavBar'
import BackButton from '../components/BackButton'
import ActionButton from '../components/ActionButton'
import '../styles/checkout.css'

export default function Checkout() {
  const handleBack = () => window.history.back()

  return (
    <div className="checkout-root">
      <NavBar title="Bag" rightSlot={<div />}/>

      <div className="checkout-content">
        <BackButton onClick={handleBack} />

        <section className="bag-items">
          <div className="bag-item">
            <img src="https://images.unsplash.com/photo-1520975916090-3105956dac38?w=300" alt="Satin Effect Corset Dress" />
            <div className="bag-item-details">
              <div className="bag-item-title">Satin Effect Corset Dress</div>
              <div className="bag-item-sub">Size: M</div>
            </div>
            <div className="bag-item-price">$69.99</div>
          </div>
          <div className="bag-item">
            <img src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=300" alt="Relaxed Mid-rise Jeans" />
            <div className="bag-item-details">
              <div className="bag-item-title">Relaxed Mid-rise Jeans</div>
              <div className="bag-item-sub">Size: L</div>
            </div>
            <div className="bag-item-price">$55.99</div>
          </div>
          <div className="bag-item">
            <img src="https://images.unsplash.com/photo-1520974735194-3249f5423a67?w=300" alt="Mini Skirt With Pockets" />
            <div className="bag-item-details">
              <div className="bag-item-title">Mini Skirt With Pockets</div>
              <div className="bag-item-sub">Size: S</div>
            </div>
            <div className="bag-item-price">$49.79</div>
          </div>
          <div className="bag-item">
            <img src="https://images.unsplash.com/photo-1516826957135-700dedea698c?w=300" alt="Oversized Double Breasted Blazer" />
            <div className="bag-item-details">
              <div className="bag-item-title">Oversized Double Breasted Blazer</div>
              <div className="bag-item-sub">Size: M</div>
            </div>
            <div className="bag-item-price">$79.79</div>
          </div>
        </section>

        <section className="actions-sheet">
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


