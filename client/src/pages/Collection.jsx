import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

function Collection() {
  const [collections, setCollections] = useState([]); // Stato per salvare le collezioni
  const [filteredCollections, setFilteredCollections] = useState([]); // Stato per collezioni filtrate
  const [loading, setLoading] = useState(true); // Stato per gestire il caricamento
  const [error, setError] = useState(null); // Stato per eventuali errori
  const [selectedCategories, setSelectedCategories] = useState([]); // Stato per categorie selezionate

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get('http://localhost:5555/api/collections'); // Cambia con la tua API
        setCollections(response.data);
        setFilteredCollections(response.data); // Inizialmente tutte le collezioni sono filtrate
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  useEffect(() => {
    // Filtra le collezioni in base alle categorie selezionate
    if (selectedCategories.length > 0) {
      const filtered = collections.filter((collection) =>
        selectedCategories.includes(collection.name)
      );
      setFilteredCollections(filtered);
    } else {
      setFilteredCollections(collections); // Mostra tutte le collezioni se non ci sono filtri
    }
  }, [selectedCategories, collections]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category) // Rimuovi categoria se già selezionata
        : [...prev, category] // Aggiungi categoria se non presente
    );
  };

  if (loading) return <p>Loading collections...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />

      <div className="flex pt-20">
        {/* Sezione Filtri */}
        <div className="w-1/5 p-4 bg-custom">
          <h2 className="text-lg font-bold mb-4">Filtra per Categoria</h2>
          <ul className="space-y-2">
            {collections.map((collection) => (
              <li key={collection._id}>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    value={collection.name}
                    checked={selectedCategories.includes(collection.name)}
                    onChange={() => handleCategoryChange(collection.name)}
                    className="mr-2"
                  />
                  {collection.name}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Sezione Contenuto */}
        <div className="w-3/4 p-4">
          <div className="space-y-8">
            {filteredCollections.map((collection) => (
              <div key={collection._id} className="collection-card">
              
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
      </div>
    </>
  );
}

export default Collection;
