import React, { useState } from "react";

const Filter = ({ categories, onFilter }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleFilter = () => {
    onFilter({
      category: selectedCategory,
      minPrice: minPrice || 0,
      maxPrice: maxPrice || Infinity,
    });
  };

  const resetFilters = () => {
    setSelectedCategory("");
    setMinPrice("");
    setMaxPrice("");
    onFilter({ category: "", minPrice: 0, maxPrice: Infinity });
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Filtri</h2>

      {/* Filtro Categoria */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Categoria
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border-gray-300 rounded-lg p-2"
        >
          <option value="">Tutte le categorie</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Filtro Prezzo Minimo */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Prezzo Minimo
        </label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-full border-gray-300 rounded-lg p-2"
          placeholder="0"
        />
      </div>

      {/* Filtro Prezzo Massimo */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Prezzo Massimo
        </label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full border-gray-300 rounded-lg p-2"
          placeholder="0"
        />
      </div>

      {/* Pulsanti */}
      <div className="flex justify-between">
        <button
          onClick={resetFilters}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
        >
          Resetta
        </button>
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Applica Filtri
        </button>
      </div>
    </div>
  );
};

export default Filter;
