import React from 'react'

const VARIANT_TO_ICON = {
  shipAddress: '📍',
  shipmentMethod: '🚚',
  paymentMethod: '💳',
  placeOrder: '🛒'
}

export default function ActionButton({
  variant = 'default',
  title,
  subtitle,
  onClick,
  rightLabel
}) {
  const isPrimary = variant === 'placeOrder'
  const icon = VARIANT_TO_ICON[variant]

  return (
    <button
      className={`action-button ${variant} ${isPrimary ? 'primary' : ''}`}
      onClick={onClick}
    >
      <div className="action-button-left">
        {icon ? <span className="action-icon" aria-hidden>{icon}</span> : null}
        <div className="action-texts">
          <div className="action-title">{title}</div>
          {subtitle ? <div className="action-subtitle">{subtitle}</div> : null}
        </div>
      </div>
      {rightLabel ? (
        <span className="action-right-label">{rightLabel}</span>
      ) : null}
    </button>
  )
}


