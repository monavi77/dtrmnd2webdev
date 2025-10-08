import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Chips from "../components/Chips";
import ProductGrid from "../components/ProductGrid";
import Tabs from "../components/Tabs";
import CartButton from "../components/CartButton";
import { PRODUCTS } from "../data/products";

export default function Home() {
  const chips = [
    "All",
    "New In",
    "Tops",
    "Bottoms",
    "Denim",
    "Dresses",
    "Accessories",
  ];

  return (
    <>
      <Header title="DTRMND" right={<CartButton />} />

      {/* Desktop-first wrapper so content is centered and capped */}
      <div className="container">
        <div className="store__searchrow" style={{ marginTop: 8 }}>
          <SearchBar placeholder="Search" />
          {/* keep Filters pill on the right via SearchBar */}
        </div>

        <Chips items={chips} active={0} onSelect={() => {}} />

        <ProductGrid products={PRODUCTS} />
      </div>

      {/* Bottom tabs are optional on desktop; keep them for now */}
      <Tabs active="browse" />
    </>
  );
}
