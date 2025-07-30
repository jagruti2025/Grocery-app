import React from 'react';
import { Star, TrendingUp, Award, Users } from 'lucide-react';
import { Product, CATEGORIES } from '../types';
import ProductCard from '../components/ProductCard';

interface HomePageProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onCategoryClick: (category: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ products, onProductClick, onCategoryClick }) => {
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Fresh Groceries
              <span className="block text-emerald-200">Delivered to You</span>
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-3xl mx-auto">
              Shop from the best local sellers and get fresh, quality groceries delivered right to your doorstep
            </p>
            <button
              onClick={() => onCategoryClick('')}
              className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-emerald-50 transition-colors transform hover:scale-105"
            >
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">10K+</h3>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">500+</h3>
              <p className="text-gray-600">Products</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">4.9</h3>
              <p className="text-gray-600">Rating</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">50+</h3>
              <p className="text-gray-600">Local Sellers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600">
              Find everything you need in our organized categories
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {CATEGORIES.slice(0, 10).map((category) => (
              <button
                key={category}
                onClick={() => onCategoryClick(category)}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-center group transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-3">
                  {category === 'Fresh Produce' && '🥬'}
                  {category === 'Dairy & Eggs' && '🥛'}
                  {category === 'Meat & Seafood' && '🐟'}
                  {category === 'Bakery' && '🍞'}
                  {category === 'Snacks' && '🥨'}
                  {category === 'Beverages' && '🥤'}
                  {category === 'Frozen Foods' && '🧊'}
                  {category === 'Pantry Staples' && '🌾'}
                  {category === 'Health & Beauty' && '💄'}
                  {category === 'Household' && '🧽'}
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  {category}
                </h3>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Discover our top-rated and most popular items
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
              key={product.id || product._id}
                product={product}
                onViewDetails={onProductClick}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button
              onClick={() => onCategoryClick('')}
              className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose GroceryMart?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">🚚</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fast Delivery</h3>
              <p className="text-gray-600">Get your groceries delivered within 24 hours to your doorstep</p>
            </div>
            
            <div className="text-center">
              <div className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">🌱</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fresh & Organic</h3>
              <p className="text-gray-600">All products are sourced from trusted local farmers and suppliers</p>
            </div>
            
            <div className="text-center">
              <div className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl text-white">💳</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Payment</h3>
              <p className="text-gray-600">Multiple payment options with secure checkout process</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;