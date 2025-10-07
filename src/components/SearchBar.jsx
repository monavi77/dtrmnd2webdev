import { Search, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SearchBar({ placeholder = "Search…" }) {
  const [q, setQ] = useState("");
  const nav = useNavigate();
  return (
    <div className="store__searchrow">
      <div className="search">
        <Search size={18} />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          onKeyDown={(e) =>
            e.key === "Enter" && nav(`/search?query=${encodeURIComponent(q)}`)
          }
        />
      </div>
      <button className="pill">
        <SlidersHorizontal size={16} />
        Filters
      </button>
    </div>
  );
}
