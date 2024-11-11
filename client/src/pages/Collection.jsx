import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import apiClient from "../utils/apiClient";

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
  const [wishlist, setWishlist] = useState([]); // Stato per wishlist
  const [showMessage, setShowMessage] = useState(false);

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleWishlistToggle = (productId) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    setWishlist((prev) => {
      const isInWishlist = prev.includes(productId);
      if (isInWishlist) {
        return prev.filter((id) => id !== productId);
      } else {
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 7000);
        return [...prev, productId];
      }
    });
  };

  // Utilizza un flag per garantire che fetchCollections venga chiamato una sola volta
  useEffect(() => {
    let isMounted = true; // Flag per prevenire il setState dopo lo smontaggio

    const fetchCollections = async () => {
      try {
        const response = await apiClient.get("/collections");
        if (isMounted) {
          setCollections(response.data);
          setFilteredCollections(response.data);
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCollections();

    return () => {
      isMounted = false; // Aggiorna il flag quando il componente si smonta
    };
  }, []); // Dipendenza vuota per garantire l'esecuzione una sola volta

  useEffect(() => {
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
          collection.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          collection.stock > 0,
      );

    filtered = filtered.sort((a, b) => {
      if (sortCriteria === "price-asc") return a.price - b.price;
      if (sortCriteria === "price-desc") return b.price - a.price;
      if (sortCriteria === "name") return a.name.localeCompare(b.name);
      return 0;
    });

    setFilteredCollections(filtered);

    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [
    selectedCategories,
    minPrice,
    maxPrice,
    searchTerm,
    sortCriteria,
    collections,
  ]);

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleSortChange = (e) => setSortCriteria(e.target.value);
  const handleCategoryChange = (category) =>
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );

  const handleMinPriceChange = (e) => setMinPrice(Number(e.target.value) || 0);
  const handleMaxPriceChange = (e) =>
    setMaxPrice(Number(e.target.value) || Infinity);

  if (loading) return <p>Loading collections...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Navbar />
      {showMessage && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white py-2 px-4 rounded shadow-lg fade-in-out">
          Articolo aggiunto alla tua lista desideri
        </div>
      )}
      <div className="flex pt-20">
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

        <div className={`w-4/5 p-4 ${isAnimating ? "animate-fade-in" : ""}`}>
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
                <div key={collection._id} className="collection-card relative">
                  <div className="item-card bg-white rounded-lg shadow-md p-4">
                    <a href={`/collection/${collection._id}`}>
                      <img
                        src={collection.image}
                        alt={collection.name}
                        className="w-full h-48 object-cover rounded-md mb-4"
                      />
                    </a>
                    <a href={`/collection/${collection._id}`}>
                      <h3 className="text-lg font-medium hover:underline">
                        {collection.name}
                      </h3>
                    </a>
                    <p className="text-gray-800 font-semibold">
                      {collection.price} €
                    </p>
                    <button
                      onClick={() => handleWishlistToggle(collection._id)}
                      className="absolute bottom-2 right-2 text-gray-400 hover:text-red-600"
                    >
                      <FaHeart
                        size={24}
                        className={
                          wishlist.includes(collection._id)
                            ? "text-red-600"
                            : "text-gray-400"
                        }
                      />
                    </button>
                  </div>
                </div>
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
