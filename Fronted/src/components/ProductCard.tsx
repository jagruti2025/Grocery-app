import React from 'react';
import { ShoppingCart, Eye, Edit, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
  showActions?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onViewDetails, 
  onEdit, 
  onDelete, 
  showActions = true 
}) => {
  const { user, isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(product);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this product?')) {
      onDelete?.(product.id);
    }
  };

  const canEdit = user?.role === 'seller' && user.id === product.sellerId;
  const canDelete = user?.role === 'admin' || (user?.role === 'seller' && user.id === product.sellerId);
  const canAddToCart = isAuthenticated && user?.role === 'customer' && product.inStock;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:-translate-y-1">
      <div className="relative" onClick={() => onViewDetails(product)}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Out of Stock</span>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span className="bg-emerald-600 text-white px-2 py-1 rounded-md text-xs font-medium">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-2 group-hover:text-emerald-600 transition-colors">
            {product.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-emerald-600">${product.price.toFixed(2)}</span>
            <span className="text-xs text-gray-500">by {product.sellerName}</span>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-600">In Stock:</span>
            <span className={`block font-medium ${product.quantity > 10 ? 'text-green-600' : product.quantity > 0 ? 'text-yellow-600' : 'text-red-600'}`}>
              {product.quantity}
            </span>
          </div>
        </div>

        {showActions && (
          <div className="flex items-center justify-between space-x-2">
            <button
              onClick={() => onViewDetails(product)}
              className="flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </button>

            {canAddToCart && (
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm flex-1"
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add to Cart
              </button>
            )}

            {canEdit && (
              <button
                onClick={handleEdit}
                className="flex items-center justify-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
              >
                <Edit className="h-4 w-4" />
              </button>
            )}

            {canDelete && (
              <button
                onClick={handleDelete}
                className="flex items-center justify-center px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;