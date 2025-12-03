import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { CartProvider, useCart } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ProductsProvider } from "./context/ProductsContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import ProductPage from "./pages/ProductPage";
import Checkout from "./pages/Checkout";
import Bag from "./pages/bag";
import OrderConfirmation from "./pages/OrderConfirmation";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import TryOn from "./pages/TryOn";
import BagOverlay from "./components/BagOverlay";
import FloatingBagButton from "./components/FloatingBagButton";

function AppContent() {
  const { isOverlayOpen, setIsOverlayOpen } = useCart();
  const location = useLocation();
  const isLandingPage = location.pathname === "/home";
  const isLoginPage = location.pathname === "/login" || location.pathname === "/";
  const hideBagButton =
    isLoginPage ||
    isLandingPage ||
    location.pathname === "/bag" ||
    location.pathname === "/checkout";
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/women" element={<Browse initialGender="Women" />} />
        <Route path="/men" element={<Browse initialGender="Men" />} />
        <Route path="/search" element={<Navigate to="/browse" replace />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/try-on" element={<TryOn />} />
        <Route path="/bag" element={<Bag />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/order-confirmation"
          element={<OrderConfirmation />}
        />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {!hideBagButton && <FloatingBagButton />}
      <BagOverlay
        isOpen={isOverlayOpen}
        onClose={() => setIsOverlayOpen(false)}
      />
    </>
  );
}

export default function App() {
  return (
    <ProductsProvider>
      <FavoritesProvider>
        <CartProvider>
          <BrowserRouter>
            <div className="store">
              <AppContent />
            </div>
          </BrowserRouter>
        </CartProvider>
      </FavoritesProvider>
    </ProductsProvider>
  );
}
