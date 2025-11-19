import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Chips from "../components/Chips";
import ProductGrid from "../components/ProductGrid";
import Tabs from "../components/Tabs";
import { useProducts } from "../context/ProductsContext";

export default function Home({ gender: defaultGender = "Women" }) {
  const { products, loading, error } = useProducts();
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [gender, setGender] = useState("All");
  const [priceRange, setPriceRange] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => {
    const unique = new Set();
    products.forEach((product) => {
      if (product.tag) unique.add(product.tag);
    });
    return ["All", ...Array.from(unique)];
  }, [products]);

  useEffect(() => {
    if (categoryIndex > categories.length - 1) setCategoryIndex(0);
  }, [categories, categoryIndex]);

  const priceOptions = [
    { label: "All Prices", value: "all" },
    { label: "Under $50", value: "under-50" },
    { label: "$50 - $100", value: "50-100" },
    { label: "$100+", value: "100-plus" },
  ];

  const filtered = useMemo(() => {
    const category = categories[categoryIndex] || "All";
    const matchesCategory =
      category === "All" ? () => true : (product) => product.tag === category;
    const matchesGender =
      gender === "All" ? () => true : (product) => product.gender === gender;
    const matchesPrice = (product) => {
      const numeric =
        Number(String(product.price).replace(/[^0-9.]/g, "")) || 0;
      if (priceRange === "under-50") return numeric < 50;
      if (priceRange === "50-100") return numeric >= 50 && numeric <= 100;
      if (priceRange === "100-plus") return numeric > 100;
      return true;
    };
    return products.filter(
      (product) =>
        matchesCategory(product) &&
        matchesGender(product) &&
        matchesPrice(product)
    );
  }, [products, categories, categoryIndex, gender, priceRange]);

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
        <SearchBar
          placeholder="Search"
          onFilterToggle={() => setShowFilters((prev) => !prev)}
          filtersActive={showFilters}
        />
      </div>

      {showFilters && (
        <div className="filters">
          <div className="filter__group">
            <span className="filter__label">Category</span>
            <Chips
              items={categories}
              active={categoryIndex}
              onSelect={setCategoryIndex}
            />
          </div>
          <div className="filter__group">
            <span className="filter__label">Gender</span>
            <div className="filterchips">
              {["All", "Women", "Men"].map((option) => (
                <button
                  key={option}
                  className={`filterchip ${
                    gender === option ? "filterchip--active" : ""
                  }`}
                  type="button"
                  onClick={() => setGender(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="filter__group">
            <span className="filter__label">Price</span>
            <div className="filterchips">
              {priceOptions.map((option) => (
                <button
                  key={option.value}
                  className={`filterchip ${
                    priceRange === option.value ? "filterchip--active" : ""
                  }`}
                  type="button"
                  onClick={() => setPriceRange(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {error && (
        <p style={{ color: "#d9534f", marginBottom: 12 }}>
          {error}. Showing limited styles.
        </p>
      )}
      {loading && (
        <p style={{ color: "var(--muted)", marginBottom: 12 }}>
          Loading latest looks…
        </p>
      )}
      <ProductGrid products={filtered} />
      <Tabs active="home" />
    </>
  );
}
