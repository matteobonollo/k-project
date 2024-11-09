import React, { useState } from "react";
import k from "../k.png";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa"; 
import "../styles/App.css";
import Breadcrumbs from "./Breadcrumbs";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Stato per l'utente loggato
  const [dropdownOpen, setDropdownOpen] = useState(false); // Stato per il menu a tendina

  const handleLogout = () => {
    setIsLoggedIn(false);
    setDropdownOpen(false);
    // Logica per il logout (es. rimuovere token, reindirizzamento)
    console.log("Utente disconnesso");
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-custom shadow-md z-50">
      <nav className="flex items-center justify-between shadow-lg border-b border-gray-300 py-4">
        <div className="container mx-auto flex items-center justify-between">
          {/* Breadcrumbs */}
          <Breadcrumbs />

          {/* Logo Centrale */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <a href="/">
              <img src={k} className="Main-logo" alt="logo" />
            </a>
          </div>

          {/* Icona del Carrello e Utente */}
          <div className="flex items-center space-x-6">
            <a href="/cart" className="text-black hover:text-gray-600">
              <FaShoppingCart size={24} />
            </a>

            {/* Se l'utente è loggato */}
            {isLoggedIn ? (
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
              <a
                href="/login"
                className="custom-button"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
