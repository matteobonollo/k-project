import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import CartDrawer from "../components/CartDrawer";
import { useCart } from "../context/CartContext";
import apiClient from "../utils/apiClient";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState({}); 
  const [quantity, setQuantity] = useState(1); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { updateCartCount } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(`/collection/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); 

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProductIndex = cart.findIndex(
      (item) => item.id === product._id,
    );

    if (existingProductIndex >= 0) {
      
      cart[existingProductIndex].quantity += quantity;
    } else {
      
      cart.push({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart)); 
    setIsCartOpen(true);
    updateCartCount();
  };

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-8">
          {/* Immagine prodotto */}
          <div className="w-full lg:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover rounded-3xl"
            />
          </div>

          {/* Dettagli prodotto */}
          <div className="pt-16 w-full lg:w-1/2 space-y-4">
            <h1 className="text-6xl font-bold">{product.name}</h1>

            <p className="text-gray-600">{product.description}</p>
            <div className="pt-16">
              <p className="text-4xl font-semibold text-black-600">
                {product.price} €
              </p>
              <p className="pt-4 text-gray-500">
                Categoria: {product.category}
              </p>

              {/* Numeratore per la quantità */}
              <div className="pt-4 flex items-center space-x-4">
                <button
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  disabled={quantity === 1} 
                  className={`bg-gray-300 px-3 py-2 rounded-lg hover:bg-gray-400 ${
                    quantity === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  -
                </button>
                <span className="text-xl font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="bg-gray-300 px-3 py-2 rounded-lg hover:bg-gray-400"
                >
                  +
                </button>
              </div>
            </div>
            <div className="pt-16">
              <button
                onClick={addToCart}
                className="Main-button font-bold text-2xl"
              >
                Aggiungi al carrello
              </button>
            </div>
          </div>
        </div>
      </div>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default Product;
