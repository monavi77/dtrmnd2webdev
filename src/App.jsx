import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import ProductPage from "./pages/ProductPage";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="store">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/women" element={<Home gender="Women" />} />
            <Route path="/men" element={<Home gender="Men" />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
