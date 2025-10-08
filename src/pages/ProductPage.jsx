import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import CartButton from "../components/CartButton";
import { PRODUCTS } from "../data/products";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ProductPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { add } = useCart();
  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  return (
    <>
      <Header title="DTRMND" right={<CartButton />} />
      <div className="container">
        <div className="product">
          {/* GALLERY */}
          <section className="product__gallery">
            <div className="product__hero">
              <img src={product.image} alt={product.title} loading="lazy" />
            </div>
            {/* Thumbs (static placeholders for now) */}
            <div className="product__thumbs">
              {[product.image, product.image, product.image].map((src, i) => (
                <button key={i} className="product__thumb">
                  <img src={src} alt={`${product.title} ${i + 1}`} />
                </button>
              ))}
            </div>
          </section>

          {/* SUMMARY */}
          <aside className="product__summary">
            <h1 className="product__title">{product.title}</h1>
            <div className="product__price">{product.price}</div>
            <div className="product__rating">(58)</div>

            <div className="product__section">
              <div className="product__label">COLOR</div>
              <div className="product__value">Grey</div>
            </div>

            <div className="product__section">
              <div className="product__label">SIZE</div>
              <div className="product__sizes">
                {["XS", "S", "M", "L", "XL"].map((s) => (
                  <button
                    key={s}
                    className={`chip ${s === "M" ? "chip--active" : ""}`}
                    aria-label={`Select size ${s}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="addtocart product__cta"
              onClick={() => {
                add(product);
                nav("/checkout");
              }}
            >
              <ShoppingBag size={16} />
              ADD TO BAG
            </button>

            <div className="product__tabs">
              {[
                "DESCRIPTION & SIZE",
                "MATERIALS",
                "CARE GUIDE",
                "REVIEWS",
                "DELIVERY AND PAYMENT",
              ].map((t, i) => (
                <button
                  key={t}
                  className={`product__tab ${i === 0 ? "is-active" : ""}`}
                >
                  {t}
                </button>
              ))}
            </div>

            <p className="product__copy">
              Minimal, premium fit crafted with soft-hand fabric. True to size
              with a relaxed silhouette. Model is 5'9" wearing size M.
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}
