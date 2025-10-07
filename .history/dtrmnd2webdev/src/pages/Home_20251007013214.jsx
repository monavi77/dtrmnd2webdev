import React from 'react'
import '../styles/home.css'

function Chip({ label, active }) {
  return (
    <button className={`chip ${active ? 'active' : ''}`}>{label}</button>
  )
}

function Card({ title, price, img }) {
  return (
    <div className="card">
      <div className="card-img" style={{ backgroundImage: `url(${img})` }} />
      <div className="card-footer">
        <div className="card-title">{title}</div>
        <div className="card-price">{price}</div>
      </div>
      <button className="add-btn">Add to bag</button>
    </div>
  )
}

export default function Home() {
  const imgs = [
    'https://images.unsplash.com/photo-1535930749574-1399327ce78f?w=800',
    'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=800',
    'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?w=800',
    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=800'
  ]
  const cards = new Array(8).fill(0).map((_, i) => ({
    title: ['Minimal Chair', 'Table Lamp', 'Ceramic Vase', 'Modern Sofa'][i % 4],
    price: ['$129', '$59', '$39', '$799'][i % 4],
    img: imgs[i % imgs.length]
  }))

  return (
    <div className="home-root">
      <header className="home-topbar">
        <button className="back-ghost" aria-label="Back">←</button>
        <div className="brand">DTRMND</div>
        <button className="bookmark" aria-label="Bookmark">🔖</button>
      </header>

      <div className="search-row">
        <div className="search-input">
          <span>🔍</span>
          <input placeholder="Search tees, hoodies, caps…" />
        </div>
        <button className="filters-btn">⚙ Filters</button>
      </div>

      <div className="chip-row">
        {['All', 'New', 'DTRMND', 'Tops', 'Bottoms', 'Caps'].map((c, i) => (
          <Chip key={c} label={c} active={i === 0} />
        ))}
      </div>

      <main className="grid">
        {cards.map((c, i) => (
          <Card key={i} {...c} />
        ))}
      </main>

      <nav className="tabbar">
        {['Home', 'Browse', 'Wishlist', 'Profile'].map((t, i) => (
          <button key={t} className={`tab ${i === 0 ? 'active' : ''}`}>{t}</button>
        ))}
      </nav>
    </div>
  )
}


