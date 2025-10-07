import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Header({ title = "DTRMND" }) {
  const nav = useNavigate();
  return (
    <header className="store__header">
      <button className="icon-btn" aria-label="Back" onClick={() => nav(-1)}>
        <ArrowLeft size={18} />
      </button>
      <h1 className="store__title">{title}</h1>
    </header>
  );
}
