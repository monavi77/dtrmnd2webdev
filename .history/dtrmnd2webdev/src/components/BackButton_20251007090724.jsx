import React from 'react'

export default function BackButton({ onClick }) {
  return (
    <button className="icon-button back-button" onClick={onClick} aria-label="Back">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M15 6L9 12L15 18" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 12H20" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </button>
  )
}


