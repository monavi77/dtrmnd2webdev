import React from 'react'

export default function ActionButton({
  variant,
  title,
  subtitle,
  rightLabel,
  onChangeClick,
  onClick
}) {
  const isPrimary = variant === 'placeOrder'

  if (!isPrimary) {
    return (
      <div className="action-button">
        <div className="action-button-left">
          <div className="action-texts">
            <div className="action-title">{title}</div>
            {subtitle ? <div className="action-subtitle">{subtitle}</div> : null}
          </div>
        </div>
        {rightLabel ? (
          <button className="action-right-label" onClick={onChangeClick}>{rightLabel}</button>
        ) : null}
      </div>
    )
  }

  return (
    <button className={`action-button primary`} onClick={onClick}>
      <div className="action-texts">
        <div className="action-title">{title}</div>
      </div>
    </button>
  )
}


