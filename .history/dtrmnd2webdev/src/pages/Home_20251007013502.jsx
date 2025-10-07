import React from 'react'
import '../styles/home.css'

const TAGS = ['All', 'New', 'DTRMND', 'Tops', 'Bottoms', 'Caps']
const DATA = [
  { title: 'Minimal Chair', price: '$129', badge: 'New', img: 'https://images.unsplash.com/photo-1535930749574-1399327ce78f?w=1200' },
  { title: 'Table Lamp', price: '$59', badge: 'Light', img: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=1200' },
  { title: 'Ceramic Vase', price: '$39', badge: 'Home', img: 'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?w=1200' },
  { title: 'Modern Sofa', price: '$799', badge: 'Furniture', img: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=1200' }
]

function Chip({ label, active }) {
  return <button className={`chip ${active ? 'active' : ''}`}>{label}</button>
}

function Card({ title, price, img, badge }) {
  return (
    <div className="card">
      <div className="card-media" style={{ backgroundImage: `url(${img})` }}>
        <span className="badge">{badge}</span>
        <button className="heart" aria-label="favorite">♡</button>
      </div>
      <div className="card-meta">
        <div className="card-name">{title}</div>
        <div className="card-price">{price}</div>
      </div>
      <button className="add-line">
        <span>🛍</span>
        <span>Add to bag</span>
      </button>
    </div>
  )
}

export default function Home() {
  const items = [...DATA, ...DATA, ...DATA, ...DATA]
  return (
    <div className="home-root">
      <header className="home-bar">
        <button className="ghost back" aria-label="Back">←</button>
        <div className="title">DTRMND</div>
        <button className="ghost bookmark" aria-label="Bookmark">🔖</button>
      </header>

      <div className="container">
        <div className="search-row">
          <div className="search">
            <span className="magnify">🔍</span>
            <input placeholder="Search tees, hoodies, caps…" />
          </div>
          <button className="filters">⚙ Filters</button>
        </div>

        <div className="chips">
          {TAGS.map((t, i) => (
            <Chip key={t} label={t} active={i === 0} />
          ))}
        </div>

        <main className="grid">
          {items.map((it, i) => (
            <Card key={i} {...it} />
          ))}
        </main>
      </div>

      <nav className="tabs">
        {['Home', 'Browse', 'Wishlist', 'Profile'].map((t, i) => (
          <button key={t} className={`tab ${i === 0 ? 'active' : ''}`}>{t}</button>
        ))}
      </nav>
    </div>
  )
}


