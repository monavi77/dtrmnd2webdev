import React from 'react'

const VARIANT_ICON = {
  shipAddress: '📍',
  shipmentMethod: '🚚',
  paymentMethod: '💳',
  placeOrder: '🛒'
}

export default function ActionButton({ variant, title, subtitle, rightLabel, onClick }) {
  const icon = VARIANT_ICON[variant]
  const primary = variant === 'placeOrder'

  return (
    <button className={`action-button ${primary ? 'primary' : ''}`} onClick={onClick}>
      <div className="action-button-left">
        {icon ? <span className="action-icon" aria-hidden>{icon}</span> : null}
        <div className="action-texts">
          <div className="action-title">{title}</div>
          {subtitle ? <div className="action-subtitle">{subtitle}</div> : null}
        </div>
      </div>
      {rightLabel ? <span className="action-right-label">{rightLabel}</span> : null}
    </button>
  )
}


