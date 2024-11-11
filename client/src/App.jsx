import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main.jsx";
import Footer from "./components/Footer.jsx";
import Collection from "./pages/Collection.jsx";
import Product from "./pages/Product.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Checkout from "./pages/Checkout.jsx";
import Favorite from "./pages/Favorite.jsx";
import Order from "./pages/Order.jsx";
import Profile from "./pages/Profile.jsx"
import "./styles/App.css";
import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen content">
          <Router>
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/collection/:id" element={<Product />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/favorite" element={<Favorite />} />
                <Route path="/order" element={<Order />} />
              </Routes>
            </div>
            <Footer />
          </Router>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
