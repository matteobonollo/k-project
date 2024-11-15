import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaTrash } from "react-icons/fa";

function CartDrawer({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState([]);
  const { updateCartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const cart = storedCart ? JSON.parse(storedCart) : [];
    setCartItems(cart);
  }, [isOpen]);

  useEffect(() => {
    updateCartCount(cartItems.length);
  }, [cartItems, updateCartCount]);

  const updateLocalStorage = (items) => {
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
    );
    setCartItems(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      )
      .filter((item) => item.quantity > 0);
    setCartItems(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-300">
        <h2 className="text-xl font-bold">Il tuo carrello</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
          &times;
        </button>
      </div>

      {/* Contenuto del Carrello */}
      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-10rem)]">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-gray-600">
                  {item.quantity} x €{item.price}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                >
                  -
                </button>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 flex items-center"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Il carrello è vuoto.</p>
        )}
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-gray-300">
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium">Totale:</p>
          <p className="text-xl font-bold text-blue-600">€{calculateTotal()}</p>
        </div>
        <div>
          <button
            onClick={() => navigate("/checkout")}
            className="Main-button font-bold text-xl"
            disabled={cartItems.length === 0}
          >
            Procedi al pagamento
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartDrawer;
