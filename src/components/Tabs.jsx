import { Heart, Home, Search, Sparkles, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Tabs({ active = "home" }) {
  const nav = useNavigate();
  const c = (k) => `tab ${active === k ? "tab--active" : ""}`;
  return (
    <nav className="tabs">
      <button className={c("home")} onClick={() => nav("/home")}>
        <Home size={20} />
        <span>Home</span>
      </button>
      <button className={c("browse")} onClick={() => nav("/browse")}>
        <Search size={20} />
        <span>Browse</span>
      </button>
      <button className={c("tryon")} onClick={() => nav("/try-on")}>
        <Sparkles size={20} />
        <span>Try-On</span>
      </button>
      <button className={c("wishlist")} onClick={() => nav("/favorites")}>
        <Heart size={20} />
        <span>Wishlist</span>
      </button>
      <button className={c("profile")} onClick={() => nav("/profile")}>
        <User size={20} />
        <span>Profile</span>
      </button>
    </nav>
  );
}
