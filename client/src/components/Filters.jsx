import React from "react";

function Filters({
  collections,
  selectedCategories,
  handleCategoryChange,
  minPrice,
  maxPrice,
  handleMinPriceChange,
  handleMaxPriceChange,
}) {
  return (
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
        <label className="block text-sm font-medium mb-1">Prezzo Minimo</label>
        <input
          type="number"
          value={minPrice === 0 ? "" : minPrice}
          onChange={handleMinPriceChange}
          className="border-gray-300 rounded-lg p-2"
          placeholder="0"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Prezzo Massimo</label>
        <input
          type="number"
          value={maxPrice === Infinity ? "" : maxPrice}
          onChange={handleMaxPriceChange}
          className="border-gray-300 rounded-lg p-2"
          placeholder="0"
        />
      </div>
    </div>
  );
}

export default Filters;
