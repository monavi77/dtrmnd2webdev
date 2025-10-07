import React from 'react'

export default function NavBar({ title, rightSlot }) {
  return (
    <header className="nav-bar">
      <div className="nav-left">
        {/** left slot left empty for alignment or back button overlay on page */}
      </div>
      <div className="nav-title">{title}</div>
      <div className="nav-right">{rightSlot}</div>
    </header>
  )
}


