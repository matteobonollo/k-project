import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import k from "../k.png";
import { FaUserCircle } from "react-icons/fa";
import Cart from "./Cart";
import "../styles/App.css";
import Breadcrumbs from "./Breadcrumbs";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Stato per l'utente loggato
  const [dropdownOpen, setDropdownOpen] = useState(false); // Stato per il menu a tendina
  const location = useLocation(); // Ottieni il percorso corrente

  const handleLogout = () => {
    setIsLoggedIn(false);
    setDropdownOpen(false);
    console.log("Utente disconnesso");
  };

  // Nascondi icone carrello e utente su pagine specifiche
  const hideUserIcon =
    location.pathname === "/login" || location.pathname === "/register";
  const hideCart = location.pathname === "/checkout";

  return (
    <div className="fixed top-0 left-0 w-full bg-custom shadow-md z-50">
      <nav className="flex items-center justify-between shadow-lg border-b border-gray-300 h-[60px]">
        <div className="container mx-auto flex items-center justify-between">
          {/* Breadcrumbs */}
          <Breadcrumbs />

          {/* Logo Centrale */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <a href="/">
              <img src={k} className="Main-logo" alt="logo" />
            </a>
          </div>

          {/* Icone del Carrello e Utente */}
          <div className="flex items-center space-x-6">
            {/* Cart Icon */}
            {!hideCart && <Cart />}

            {/* Icona Utente */}
            {!hideUserIcon && (
              isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center text-black hover:text-gray-600 focus:outline-none"
                  >
                    <FaUserCircle size={24} />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                      <a
                        href="/profile"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Il mio profilo
                      </a>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Esci
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                // Se l'utente non è loggato
                <a href="/login" className="custom-button">
                  Login
                </a>
              )
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
