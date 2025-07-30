import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Plus, Minus, Star, Shield, Truck } from 'lucide-react';
import { Product } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onBack }) => {
  const [quantity, setQuantity] = useState(1);
  const { user, isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  const canAddToCart = isAuthenticated && user?.role === 'customer' && product.inStock;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center text-emerald-600 hover:text-emerald-700 mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Product Features */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-emerald-50 p-4 rounded-lg text-center">
              <Shield className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-emerald-700">Quality Assured</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <Truck className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-blue-700">Fast Delivery</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <Star className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
              <p className="text-sm font-medium text-yellow-700">Top Rated</p>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                {product.category}
              </span>
              {!product.inStock && (
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  Out of Stock
                </span>
              )}
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-4xl font-bold text-emerald-600">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-gray-500 ml-2">per unit</span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Sold by</p>
                <p className="font-semibold text-gray-900">{product.sellerName}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">Availability:</span>
                <span className={`font-semibold ${
                  product.quantity > 10 
                    ? 'text-green-600' 
                    : product.quantity > 0 
                    ? 'text-yellow-600' 
                    : 'text-red-600'
                }`}>
                  {product.quantity > 0 ? `${product.quantity} in stock` : 'Out of stock'}
                </span>
              </div>
            </div>

            {canAddToCart && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-gray-700">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full bg-emerald-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </button>
              </div>
            )}

            {!canAddToCart && isAuthenticated && user?.role !== 'customer' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-center">
                  Only customers can add products to cart
                </p>
              </div>
            )}

            {!isAuthenticated && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-center">
                  Please log in as a customer to add products to cart
                </p>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium">{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Seller:</span>
                <span className="font-medium">{product.sellerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Stock Quantity:</span>
                <span className="font-medium">{product.quantity} units</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Added:</span>
                <span className="font-medium">
                  {new Date(product.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;