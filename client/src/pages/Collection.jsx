import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function Collection() {
  const [collections, setCollections] = useState([]); // Stato per salvare le collezioni
  const [filteredCollections, setFilteredCollections] = useState([]); // Stato per collezioni filtrate
  const [searchTerm, setSearchTerm] = useState(""); // Stato per la barra di ricerca
  const [loading, setLoading] = useState(true); // Stato per gestire il caricamento
  const [error, setError] = useState(null); // Stato per eventuali errori
  const [selectedCategories, setSelectedCategories] = useState([]); // Stato per categorie selezionate
  const [minPrice, setMinPrice] = useState(0); // Stato per prezzo minimo
  const [maxPrice, setMaxPrice] = useState(Infinity); // Stato per prezzo massimo
  const [sortCriteria, setSortCriteria] = useState("name"); // Stato per criterio di ordinamento
  const [isAnimating, setIsAnimating] = useState(false); // Stato per attivare l'animazione

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5555/api/collections",
        ); // Cambia con la tua API
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
    // Filtra le collezioni in base alle categorie selezionate, ai prezzi e al termine di ricerca
    let filtered = collections
      .filter((collection) =>
        selectedCategories.length > 0
          ? selectedCategories.includes(collection.category)
          : true,
      )
      .filter(
        (collection) =>
          collection.price >= minPrice &&
          collection.price <= maxPrice &&
          collection.name.toLowerCase().includes(searchTerm.toLowerCase()), // Filtra per termine di ricerca
      );

    filtered = filtered.sort((a, b) => {
      if (sortCriteria === "price-asc") return a.price - b.price;
      if (sortCriteria === "price-desc") return b.price - a.price;
      if (sortCriteria === "name") return a.name.localeCompare(b.name);
      return 0;
    });

    setFilteredCollections(filtered);

    // Attiva l'animazione
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300); // Durata animazione
    return () => clearTimeout(timer);
  }, [
    selectedCategories,
    minPrice,
    maxPrice,
    searchTerm,
    sortCriteria,
    collections,
  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category) // Rimuovi categoria se già selezionata
          : [...prev, category], // Aggiungi categoria se non presente
    );
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(Number(e.target.value) || 0);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(Number(e.target.value) || Infinity);
  };

  if (loading) return <p>Loading collections...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />

      <div className="flex pt-20">
        {/* Sezione Filtri */}
        <div className="w-1/5 p-4">
          <h2 className="text-lg font-bold mb-4">Categoria</h2>
          <ul className="space-y-2">
            {[...new Set(collections.map((col) => col.category))].map(
              (category) => (
                <li key={category}>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      value={category}
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="mr-2"
                    />
                    {category}
                  </label>
                </li>
              ),
            )}
          </ul>
          <h2 className="text-lg font-bold mt-6 mb-4">Prezzo</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Prezzo Minimo
            </label>
            <input
              type="number"
              value={minPrice === 0 ? "" : minPrice}
              onChange={handleMinPriceChange}
              className="border-gray-300 rounded-lg p-2"
              placeholder="0"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Prezzo Massimo
            </label>
            <input
              type="number"
              value={maxPrice === Infinity ? "" : maxPrice}
              onChange={handleMaxPriceChange}
              className="border-gray-300 rounded-lg p-2"
              placeholder="0"
            />
          </div>
        </div>

        {/* Sezione Contenuto */}
        <div className={`w-3/4 p-4 ${isAnimating ? "animate-fade-in" : ""}`}>
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Cerca..."
              className="transition-all duration-300 ease-in-out w-40 focus:w-60 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={sortCriteria}
              onChange={handleSortChange}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Ordina per Nome</option>
              <option value="price-asc">Prezzo: dal più basso</option>
              <option value="price-desc">Prezzo: dal più alto</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCollections.length > 0 ? (
              filteredCollections.map((collection) => (
                <a href={"/collection/" + collection._id}>
                  <div key={collection._id} className="collection-card">
                    <div className="item-card bg-white rounded-lg shadow-md p-4">
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className="w-full h-48 object-cover rounded-md mb-4"
                      />
                      <h3 className="text-lg font-medium">{collection.name}</h3>
                      <p className="text-gray-800 font-semibold">
                        {collection.price} €
                      </p>
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <div className="flex items-center justify-center h-[50vh]">
                <p className="text-center text-gray-500 text-lg">
                  Nessun prodotto trovato
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Collection;
