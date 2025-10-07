import React from 'react'

export default function BackButton({ onClick }) {
  return (
    <button className="icon-button back-button" onClick={onClick} aria-label="Back">←</button>
  )
}


