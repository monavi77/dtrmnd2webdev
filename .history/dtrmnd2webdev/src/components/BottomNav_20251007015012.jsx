import React from 'react'

const ITEMS = [
  { label: 'Home', icon: '🏠' },
  { label: 'Browse', icon: '🔲' },
  { label: 'Wishlist', icon: '♡' },
  { label: 'Profile', icon: '👤' }
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {ITEMS.map((item, idx) => (
        <button key={item.label} className="nav-item" aria-current={idx===0?'page':undefined}>
          <div className={`nav-pill ${idx===0 ? 'active' : ''}`}>
            <span className="nav-icon" aria-hidden>{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </div>
        </button>
      ))}
    </nav>
  )
}


