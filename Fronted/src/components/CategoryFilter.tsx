import React from 'react';
import { CATEGORIES } from '../types';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
      <div className="space-y-2">
        <button
          onClick={() => onCategoryChange('')}
          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
            selectedCategory === ''
              ? 'bg-emerald-600 text-white'
              : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
          }`}
        >
          All Categories
        </button>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === category
                ? 'bg-emerald-600 text-white'
                : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;