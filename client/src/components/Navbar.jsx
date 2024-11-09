import React from 'react';
import k from '../k.png';
import { FaShoppingCart } from 'react-icons/fa'; // Per l'icona del carrello
import '../styles/App.css';

function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full bg-custom shadow-md z-50">
    <nav className=" flex items-center justify-between shadow-lg border-b border-gray-300 py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Link alla Home */}
        <div className="flex items-center">
          <a href="/" className="text-lg font-bold text-black hover:text-gray-600">
           &lt; Home
          </a>
        </div>

        {/* Logo Centrale */}
        <div className="flex justify-center">
        <img src={k} className="Main-logo" alt="logo" />
        </div>

        {/* Icona del Carrello */}
        <div className="flex items-center">
          <a href="/cart" className="text-black hover:text-gray-600">
            <FaShoppingCart size={24} />
          </a>
        </div>
      </div>
    </nav>
    </div>
  );
}

export default Navbar;
