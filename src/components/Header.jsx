import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header({
  title = "DTRMND",
  right = null,
  showBack = true,
}) {
  const nav = useNavigate();
  return (
    <header className="store__header">
      {showBack ? (
        <button className="icon-btn" aria-label="Back" onClick={() => nav(-1)}>
          <ArrowLeft size={18} />
        </button>
      ) : (
        <div style={{ width: 40 }} />
      )}
      <h1 className="store__title">{title}</h1>
      <div
        style={{ display: "grid", placeItems: "center", height: 40, width: 40 }}
      >
        {right}
      </div>
    </header>
  );
}
