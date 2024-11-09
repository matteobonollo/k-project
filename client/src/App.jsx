import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main.jsx";
import Footer from "./components/Footer.jsx";
import Collection from "./pages/Collection.jsx";
import Product from "./pages/Product.jsx";
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
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
