import { Home, Grid2x2, Heart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Tabs({ active = "home" }) {
  const nav = useNavigate();
  const c = (k) => `tab ${active === k ? "tab--active" : ""}`;
  return (
    <nav className="tabs">
      <button className={c("home")} onClick={() => nav("/women")}>
        <Home size={20} />
        <span>Home</span>
      </button>
      <button className={c("browse")} onClick={() => nav("/search")}>
        <Grid2x2 size={20} />
        <span>Browse</span>
      </button>
      <button className={c("wishlist")} onClick={() => nav("/favorites")}>
        <Heart size={20} />
        <span>Wishlist</span>
      </button>
      <button className={c("profile")}>
        <User size={20} />
        <span>Profile</span>
      </button>
    </nav>
  );
}
