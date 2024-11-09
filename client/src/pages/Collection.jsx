import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Filter from '../components/Filter';
import axios from 'axios';

function Collection() {
  const [collections, setCollections] = useState([]); // Stato per salvare le collezioni
  const [loading, setLoading] = useState(true); // Stato per gestire il caricamento
  const [error, setError] = useState(null); // Stato per eventuali errori

  useEffect(() => {
    // Funzione per chiamare l'API
    const fetchCollections = async () => {
      try {
        const response = await axios.get('http://localhost:5555/api/collections'); // Cambia con la tua API
        setCollections(response.data); // Salva i dati delle collezioni nello stato
      } catch (err) {
        setError(err.message); // Gestisce eventuali errori
      } finally {
        setLoading(false); // Termina il caricamento
      }
    };

    fetchCollections();
  }, []); // Effettua la chiamata API solo al primo render

  if (loading) return <p>Loading collections...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      
      <div className="p-4 pt-20"> 
        <div className="space-y-8">
          {collections.map((collection) => (
            <div key={collection._id} className="collection-card">
              <h2 className="text-xl font-semibold mb-2">{collection.name}</h2>
              <p className="text-gray-600 mb-4">{collection.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {collection.items.map((item) => (
                  <div
                    key={item._id}
                    className="item-card bg-white rounded-lg shadow-md p-4"
                  >
                    <img
                      src={item.itemImage}
                      alt={item.itemName}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-lg font-medium">{item.itemName}</h3>
                    <p className="text-gray-800 font-semibold">{item.itemPrice} €</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
  
}

export default Collection;
