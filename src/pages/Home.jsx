import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Chips from "../components/Chips";
import ProductGrid from "../components/ProductGrid";
import Tabs from "../components/Tabs";
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
      <Header title={`DTRMND`} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <SearchBar placeholder="Search" />
      </div>

      <Chips items={chips} active={0} onSelect={() => {}} />
      <ProductGrid products={PRODUCTS} />
      <Tabs active="home" />
    </>
  );
}
