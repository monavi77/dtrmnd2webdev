import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

export default function ProductCard({ product }) {
  const { add } = useCart();
  const { toggle, isFavorite } = useFavorites();
  const favorite = isFavorite(product.id);
  return (
    <article className="card">
      <Link to={`/product/${product.id}`} className="card__imagewrap">
        <img src={product.image} alt={product.title} loading="lazy" />
        {product.tag && <span className="badge">{product.tag}</span>}
        <button
          className={`fav ${favorite ? "fav--active" : ""}`}
          type="button"
          aria-label="Wishlist"
          aria-pressed={favorite}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            toggle(product);
          }}
        >
          <Heart size={16} fill={favorite ? "currentColor" : "none"} />
        </button>
      </Link>
      <div className="card__meta">
        <h3 className="card__title">{product.title}</h3>
        <span className="card__price">{product.price}</span>
      </div>
      <button className="addtocart" onClick={() => add(product)}>
        <ShoppingBag size={16} />
        Add to bag
      </button>
    </article>
  );
}
