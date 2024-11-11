import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import Items from "../components/Items";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import apiClient from "../utils/apiClient";

function Collection() {
  const { user, loading: authLoading } = useAuth();
  const [collections, setCollections] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [sortCriteria, setSortCriteria] = useState("name");
  const [isAnimating, setIsAnimating] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [showMessage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchCollections = async () => {
      try {
        const response = await apiClient.get("/collections?favorite=true");
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
    return () => (isMounted = false);
  }, []);

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

  const handleWishlistToggle = async (productId) => {
    if (!authLoading && !user) {
      navigate("/login");
      return;
    }

    try {
      if (wishlist.includes(productId)) {
        // Rimuove dai preferiti
        await apiClient.delete(`/favorites/${productId}`);
        setWishlist((prev) => prev.filter((id) => id !== productId));
      } else {
        // Aggiunge ai preferiti
        await apiClient.post("/favorites", { productId });
        setWishlist((prev) => [...prev, productId]);
      }
    } catch (error) {
      console.error(
        "Errore nel gestire il toggle della lista desideri:",
        error,
      );
    }
  };

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
        <Filters
          collections={collections}
          selectedCategories={selectedCategories}
          handleCategoryChange={(category) =>
            setSelectedCategories((prev) =>
              prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category],
            )
          }
          minPrice={minPrice}
          maxPrice={maxPrice}
          handleMinPriceChange={(e) => setMinPrice(Number(e.target.value))}
          handleMaxPriceChange={(e) =>
            setMaxPrice(Number(e.target.value) || Infinity)
          }
        />
        <Items
          filteredCollections={filteredCollections}
          handleWishlistToggle={handleWishlistToggle}
          wishlist={wishlist}
          isAnimating={isAnimating}
          searchTerm={searchTerm}
          handleSearch={(e) => setSearchTerm(e.target.value)}
          sortCriteria={sortCriteria}
          handleSortChange={(e) => setSortCriteria(e.target.value)}
        />
      </div>
    </>
  );
}

export default Collection;
