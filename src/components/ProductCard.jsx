import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { add } = useCart();
  return (
    <article className="card">
      <Link to={`/product/${product.id}`} className="card__imagewrap">
        <img src={product.image} alt={product.title} loading="lazy" />
        {product.tag && <span className="badge">{product.tag}</span>}
        <button className="fav" type="button" aria-label="Wishlist">
          <Heart size={16} />
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
