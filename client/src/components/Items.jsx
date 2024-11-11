import React from "react";
import { FaHeart } from "react-icons/fa";

function Items({
  filteredCollections,
  handleWishlistToggle,
  wishlist,
  isAnimating,
  searchTerm,
  handleSearch,
  sortCriteria,
  handleSortChange,
}) {
  return (
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
                  className="absolute bottom-2 right-2"
                >
                  <FaHeart
                    size={24}
                    className={
                      collection.favorite || wishlist.includes(collection._id)
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
  );
}

export default Items;
