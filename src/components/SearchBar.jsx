import { Search, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SearchBar({
  placeholder = "Search…",
  onFilterToggle,
  filtersActive = false,
  target = "/search",
  initialValue = "",
}) {
  const [q, setQ] = useState(initialValue);
  const nav = useNavigate();

  useEffect(() => {
    setQ(initialValue);
  }, [initialValue]);

  const triggerSearch = () => {
    const query = q.trim();
    if (!query) {
      nav(target);
      return;
    }
    const params = new URLSearchParams();
    params.set("query", query);
    nav(`${target}?${params.toString()}`);
  };

  return (
    <form
      className="store__searchrow"
      onSubmit={(event) => {
        event.preventDefault();
        triggerSearch();
      }}
    >
      <div className="search">
        <Search size={18} />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          aria-label="Search products"
        />
      </div>
      <div className="search__actions">
        <button className="pill" type="submit">
          Search
        </button>
        {onFilterToggle && (
          <button
            className={`pill ${filtersActive ? "pill--active" : ""}`}
            type="button"
            aria-label="Toggle filters"
            aria-pressed={filtersActive}
            onClick={onFilterToggle}
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>
        )}
      </div>
    </form>
  );
}
