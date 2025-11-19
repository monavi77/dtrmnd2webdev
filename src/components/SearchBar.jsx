import { Search, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SearchBar({
  placeholder = "Search…",
  onFilterToggle,
  filtersActive = false,
}) {
  const [q, setQ] = useState("");
  const nav = useNavigate();

  const triggerSearch = () => {
    const query = q.trim();
    if (!query) {
      nav("/search");
      return;
    }
    nav(`/search?query=${encodeURIComponent(query)}`);
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
