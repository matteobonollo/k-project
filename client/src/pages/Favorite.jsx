import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import apiClient from "../utils/apiClient";

function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await apiClient.get("/favorites"); // Endpoint per ottenere la lista desideri
        setFavorites(response.data); // Imposta i dati dei preferiti
      } catch (err) {
        setError("Errore durante il recupero della lista desideri.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return <p>Caricamento dei preferiti...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (favorites.length === 0) {
    return <p className="text-center">La tua lista desideri è vuota.</p>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Lista Desideri</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <div key={item._id} className="item-card bg-white rounded-lg shadow-md p-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-medium">{item.name}</h3>
              <p className="text-gray-800 font-semibold">{item.price} €</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Favorite;
