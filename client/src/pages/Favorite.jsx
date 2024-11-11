import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import apiClient from "../utils/apiClient";

function Favorite() {
  const [favorites, setFavorites] = useState([]); // Stato per gli articoli preferiti
  const [loading, setLoading] = useState(true); // Stato per il caricamento
  const [error, setError] = useState(null); // Stato per eventuali errori
  const { user, loading: authLoading } = useAuth(); // Ottieni l'utente autenticato e lo stato di caricamento
  const { isLoggedIn } = useAuth(); // Controlla se l'utente è loggato
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login"); // Reindirizza se l'utente non è autenticato
      return;
    }
    const fetchFavorites = async () => {
      try {
        const response = await apiClient.get("/collections?favorite=true"); // Endpoint per ottenere gli articoli preferiti
    
        // Filtra solo gli elementi che hanno favorite === true
        const filteredFavorites = response.data.filter((item) => item.favorite === true);
    
        setFavorites(filteredFavorites);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [isLoggedIn, navigate, authLoading, user]);


  if (loading) return <p>Loading favorites...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 pt-20">
        <h1 className="text-2xl font-bold mb-4">La mia lista</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.length > 0 ? (
            favorites.map((item) => (
              <div
                key={item._id}
                className="item-card bg-white rounded-lg shadow-md p-4 relative"
              >
                <a href={`/collection/${item._id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                </a>
                <a href={`/collection/${item._id}`}>
                  <h3 className="text-lg font-medium hover:underline">
                    {item.name}
                  </h3>
                </a>
                <p className="text-gray-800 font-semibold">{item.price} €</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              Nessun articolo nella lista desideri.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Favorite;
