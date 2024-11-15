import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import k from "../k.png";
import { FaUserCircle } from "react-icons/fa";
import Cart from "./Cart";
import "../styles/App.css";
import Breadcrumbs from "./Breadcrumbs";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout, loading } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  const hideUserIcon =
    location.pathname === "/login" || location.pathname === "/register";
  const hideCart = location.pathname === "/checkout";

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full bg-custom shadow-md z-50">
      <nav className="flex items-center justify-between shadow-lg border-b border-gray-300 h-[60px]">
        <div className="container mx-auto flex items-center justify-between">
          <Breadcrumbs />

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <a href="/collection">
              <img src={k} className="Main-logo" alt="logo" />
            </a>
          </div>

          <div className="flex items-center space-x-6">
            {!hideCart && <Cart />}

            {!hideUserIcon &&
              (user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center text-black hover:text-gray-600 focus:outline-none"
                  >
                    <FaUserCircle size={24} />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                      <a
                        href="/profile"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Il mio profilo
                      </a>
                      <a
                        href="/order"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        I miei ordini
                      </a>
                      <a
                        href="/favorite"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Lista desideri
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
                <a href="/login" className="custom-button">
                  Login
                </a>
              ))}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
