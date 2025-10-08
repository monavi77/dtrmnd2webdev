import Header from "../components/Header";
import CartButton from "../components/CartButton";
import ProductGrid from "../components/ProductGrid";
import { PRODUCTS } from "../data/products";
import { useNavigate } from "react-router-dom";
import Tabs from "../components/Tabs";

export default function Homepage() {
  const nav = useNavigate();
  return (
    <>
      <Header title="DTRMND" right={<CartButton />} />

      <div className="home-hero">
        <picture>
          {/* drop a wide hero in /public/hero.jpg or swap src below */}
          <img src="/00.png" alt="DTRMND collection hero" />
        </picture>
        <div className="home-hero__content">
          <h1>New Season. Same Determination.</h1>
          <p>Elevated basics and statement pieces built to move with you.</p>
          <div className="home-hero__actions">
            <button className="addtocart" onClick={() => nav("/browse")}>
              Shop now
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Collections / categories */}
        <section className="home-collections">
          <article className="home-collection" onClick={() => nav("/browse")}>
            <img src="/2.jpg" alt="Outerwear" />
            <div className="home-collection__label">Outerwear</div>
          </article>
          <article className="home-collection" onClick={() => nav("/browse")}>
            <img src="/3.jpg" alt="Tops" />
            <div className="home-collection__label">Tops</div>
          </article>
          <article className="home-collection" onClick={() => nav("/browse")}>
            <img src="/4.jpg" alt="Bottoms" />
            <div className="home-collection__label">Bottoms</div>
          </article>
        </section>

        {/* Featured products */}
        <section className="home-featured">
          <div className="home-section__head">
            <h2>Featured</h2>
            <button className="linklike" onClick={() => nav("/browse")}>
              See all
            </button>
          </div>
          <ProductGrid products={PRODUCTS.slice(0, 4)} />
        </section>
      </div>
      <Tabs active="home" />
    </>
  );
}
