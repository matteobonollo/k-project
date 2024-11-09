import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/Main.jsx";
import Footer from "./components/Footer.jsx";
import Collection from "./pages/Collection.jsx";
import "./styles/App.css";

function App() {
  return (
    <div className="flex flex-col min-h-screen content">
      <Router>
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/collection" element={<Collection />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
