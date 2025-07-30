import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { DataProvider } from './contexts/DataContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import LoginPage from './pages/LoginPage';
import CustomerOrdersPage from './pages/CustomerOrdersPage';
import SellerDashboard from './pages/SellerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { useAuth } from './contexts/AuthContext';
import { useData } from './contexts/DataContext';
import { Product } from './types';

type Page = 
  | 'home' 
  | 'products' 
  | 'product-detail' 
  | 'cart' 
  | 'checkout' 
  | 'order-confirmation'
  | 'login' 
  | 'customer-orders' 
  | 'seller-dashboard' 
  | 'admin-dashboard';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderId, setOrderId] = useState('');
  
  const { isAuthenticated, user } = useAuth();
  const { products } = useData();

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePageChange = (page: Page) => {
    // Reset filters when navigating away from products/home
    if (page !== 'products' && page !== 'home') {
      setSearchQuery('');
      setSelectedCategory('');
    }
    setCurrentPage(page);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage('products');
  };

  const handleLoginSuccess = () => {
    if (user?.role === 'admin') {
      setCurrentPage('admin-dashboard');
    } else if (user?.role === 'seller') {
      setCurrentPage('seller-dashboard');
    } else {
      setCurrentPage('home');
    }
  };

  const handleOrderComplete = (newOrderId: string) => {
    setOrderId(newOrderId);
    setCurrentPage('order-confirmation');
  };

  const handleBackNavigation = () => {
    if (currentPage === 'product-detail') {
      setCurrentPage('products');
    } else if (currentPage === 'checkout') {
      setCurrentPage('cart');
    } else if (currentPage === 'cart') {
      setCurrentPage('products');
    } else {
      setCurrentPage('home');
    }
  };

  // Redirect to login if not authenticated and trying to access protected pages
  const protectedPages: Page[] = ['cart', 'checkout', 'customer-orders', 'seller-dashboard', 'admin-dashboard'];
  if (!isAuthenticated && protectedPages.includes(currentPage)) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  // Role-based access control
  if (isAuthenticated && user) {
    if (currentPage === 'seller-dashboard' && user.role !== 'seller') {
      setCurrentPage('home');
    }
    if (currentPage === 'admin-dashboard' && user.role !== 'admin') {
      setCurrentPage('home');
    }
    if (currentPage === 'customer-orders' && user.role !== 'customer') {
      setCurrentPage('home');
    }
    if ((currentPage === 'cart' || currentPage === 'checkout') && user.role !== 'customer') {
      setCurrentPage('home');
    }
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            products={filteredProducts}
            onProductClick={handleProductClick}
            onCategoryClick={handleCategoryClick}
          />
        );
      
      case 'products':
        return (
          <ProductsPage
            products={filteredProducts}
            searchQuery={searchQuery}
            onProductClick={handleProductClick}
          />
        );
      
      case 'product-detail':
        return selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            onBack={handleBackNavigation}
          />
        ) : (
          <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
            <button
              onClick={() => setCurrentPage('products')}
              className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Back to Products
            </button>
          </div>
        );
      
      case 'cart':
        return (
          <CartPage
            onCheckout={() => setCurrentPage('checkout')}
            onContinueShopping={() => setCurrentPage('products')}
          />
        );
      
      case 'checkout':
        return (
          <CheckoutPage
            onOrderComplete={handleOrderComplete}
            onBack={handleBackNavigation}
          />
        );
      
      case 'order-confirmation':
        return (
          <OrderConfirmationPage
            orderId={orderId}
            onContinueShopping={() => setCurrentPage('products')}
            onGoHome={() => setCurrentPage('home')}
          />
        );
      
      case 'login':
        return <LoginPage onLoginSuccess={handleLoginSuccess} />;
      
      case 'customer-orders':
        return <CustomerOrdersPage />;
      
      case 'seller-dashboard':
        return <SellerDashboard />;
      
      case 'admin-dashboard':
        return <AdminDashboard />;
      
      default:
        return (
          <HomePage
            products={filteredProducts}
            onProductClick={handleProductClick}
            onCategoryClick={handleCategoryClick}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentPage={currentPage}
        onPageChange={handlePageChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <main>
        {renderCurrentPage()}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
        <DataProvider>
      <CartProvider>
      
          <AppContent />
      </CartProvider>
        </DataProvider>
    </AuthProvider>
  );
}

export default App;