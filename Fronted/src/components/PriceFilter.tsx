import React from 'react';

interface PriceFilterProps {
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ priceRange, onPriceRangeChange }) => {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    onPriceRangeChange([value, priceRange[1]]);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 999;
    onPriceRangeChange([priceRange[0], value]);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Range</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Min Price
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={priceRange[0]}
            onChange={handleMinChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Price
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={priceRange[1]}
            onChange={handleMaxChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="999.00"
          />
        </div>
        <button
          onClick={() => onPriceRangeChange([0, 999])}
          className="w-full px-4 py-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
        >
          Clear Filter
        </button>
      </div>
    </div>
  );
};

export default PriceFilter;