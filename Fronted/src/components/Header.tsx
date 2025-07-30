import React, { useState } from 'react';
import { ShoppingCart, User, Menu, X, Search, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onPageChange, searchQuery, onSearchChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { getTotalItems } = useCart();

  const handleNavigation = (page: string) => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    onPageChange('home');
    setIsMobileMenuOpen(false);
  };

  const getNavItems = () => {
    if (!isAuthenticated) {
      return [
        { label: 'Home', page: 'home' },
        { label: 'Products', page: 'products' },
        { label: 'Login', page: 'login' }
      ];
    }

    const commonItems = [
      { label: 'Home', page: 'home' },
      { label: 'Products', page: 'products' }
    ];

    if (user?.role === 'customer') {
      return [
        ...commonItems,
        { label: 'Orders', page: 'customer-orders' }
      ];
    }

    if (user?.role === 'seller') {
      return [
        ...commonItems,
        { label: 'Dashboard', page: 'seller-dashboard' }
      ];
    }

    if (user?.role === 'admin') {
      return [
        ...commonItems,
        { label: 'Admin Panel', page: 'admin-dashboard' }
      ];
    }

    return commonItems;
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => handleNavigation('home')}
              className="text-2xl font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              🛒 GroceryMart
            </button>
          </div>

          {/* Search Bar - Desktop */}
          {(currentPage === 'home' || currentPage === 'products') && (
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          )}

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {getNavItems().map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavigation(item.page)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === item.page
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                {item.label}
              </button>
            ))}

            {isAuthenticated && user?.role === 'customer' && (
              <button
                onClick={() => handleNavigation('cart')}
                className="relative p-2 text-gray-700 hover:text-emerald-600 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            )}

            {isAuthenticated && (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <User className="h-4 w-4" />
                  <span>{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-700 hover:text-red-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {isAuthenticated && user?.role === 'customer' && (
              <button
                onClick={() => handleNavigation('cart')}
                className="relative p-2 text-gray-700"
              >
                <ShoppingCart className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {(currentPage === 'home' || currentPage === 'products') && (
          <div className="md:hidden pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {getNavItems().map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavigation(item.page)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  currentPage === item.page
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-700 hover:text-emerald-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {isAuthenticated && (
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex items-center px-3 py-2 text-sm text-gray-700">
                  <User className="h-4 w-4 mr-2" />
                  <span>{user?.name} ({user?.role})</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;