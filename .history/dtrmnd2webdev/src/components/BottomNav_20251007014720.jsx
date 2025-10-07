import React from 'react'

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {['Home','Browse','Wishlist','Profile'].map((label, idx) => (
        <button key={label} className={`nav-item ${idx===0?'active':''}`}>{label}</button>
      ))}
    </nav>
  )
}


