import React, { useEffect, useState } from "react";
import "../styles/App.css";
import { FaShoppingCart } from "react-icons/fa";
import CartDrawer from "./CartDrawer";
import { useCart } from "../context/CartContext"; // Assicurati che il percorso sia corretto

function Cart() {
  const { cartCount, updateCartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    updateCartCount(); // Aggiorna il conteggio quando il componente viene montato
  }, [isCartOpen]);

  return (
    <>
      {/* Icona del carrello */}
      <div
        onClick={() => setIsCartOpen(true)} // Usa onClick per aprire il drawer
        className="text-black hover:text-gray-600 cursor-pointer flex items-center justify-center"
      >
        <FaShoppingCart size={24} />
        {cartCount > 0 && (
          <div className="relative bottom-2 right-8 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </div>
        )}
      </div>

      {/* Drawer del carrello */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default Cart;
