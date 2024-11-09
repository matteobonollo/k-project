import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1); // Stato per la quantità
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/api/collection/${id}`,
        ); // Cambia con la tua API
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading) return <p>Loading collections...</p>;
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
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))} // Decrementa, minimo 1
                  className="bg-gray-300 px-3 py-2 rounded-lg hover:bg-gray-400"
                >
                  -
                </button>
                <span className="text-xl font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)} // Incrementa la quantità
                  className="bg-gray-300 px-3 py-2 rounded-lg hover:bg-gray-400"
                >
                  +
                </button>
              </div>
            </div>
            <div className="pt-16">
              <button className="Main-button font-bold text-2xl">
                Aggiungi al carrello
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
