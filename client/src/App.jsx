import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main.jsx";
import Footer from "./components/Footer.jsx";
import Collection from "./pages/Collection.jsx";
import Product from "./pages/Product.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import "./styles/App.css";


function App() {
  return (
    <div className="flex flex-col min-h-screen content">
      <Router>
        <div className="flex-grow ">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/collection/:id" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
