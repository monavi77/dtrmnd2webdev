import Header from "../components/Header";
import ProductGrid from "../components/ProductGrid";
import Tabs from "../components/Tabs";
import { useFavorites } from "../context/FavoritesContext";

export default function Favorites() {
  const { items } = useFavorites();
  return (
    <>
      <Header title="Wishlist" />
      {items.length ? (
        <ProductGrid products={items} />
      ) : (
        <p style={{ color: "var(--muted)", marginBottom: 32 }}>
          Tap the heart on any product to add it to your wishlist.
        </p>
      )}
      <Tabs active="wishlist" />
    </>
  );
}
