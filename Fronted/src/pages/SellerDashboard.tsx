import React, { useState } from 'react';
import { Plus, Edit, Trash2, Package, TrendingUp, DollarSign, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { Product, Order, CATEGORIES } from '../types';



const SellerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'add-product'>('overview');
  
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    category: '',
    quantity: ''
  });

  const { user } = useAuth();
  
  const { products, orders, addProduct, updateProduct, deleteProduct, updateOrder } = useData();

  const sellerProducts = products.filter(product =>
  product.sellerId === user?.id  // ✅ handle both id formats
);
  // const sellerProducts = products.filter(product => product.sellerId === user?.id);
  const sellerOrders = orders.filter(order => 
    order.items.some(item => item.product.sellerId === user?.id)
  );

  const totalRevenue = sellerOrders.reduce((sum, order) => {
    return sum + order.items
      .filter(item => item.product.sellerId === user?.id)
      .reduce((itemSum, item) => itemSum + (item.product.price * item.quantity), 0);
  }, 0);

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...productForm,
        price: parseFloat(productForm.price),
        quantity: parseInt(productForm.quantity)
      });
      setEditingProduct(null);
    } else {
      addProduct({
  title: productForm.title,
  description: productForm.description,
  price: parseFloat(productForm.price),
  image: productForm.image,
  category: productForm.category,
  quantity: parseInt(productForm.quantity),
  inStock: parseInt(productForm.quantity) > 0
});

    }
    
    setProductForm({
      title: '',
      description: '',
      price: '',
      image: '',
      category: '',
      quantity: ''
    });
    setActiveTab('products');
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      title: product.title,
      description: product.description,
      price: product.price.toString(),
      image: product.image,
      category: product.category,
      quantity: product.quantity.toString()
    });
    setActiveTab('add-product');
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
    }
  };

  const handleOrderStatusUpdate = (orderId: string, status: Order['status']) => {
     if (!orderId) return; 
    updateOrder(orderId, { status });
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{sellerProducts.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{sellerOrders.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Users className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Stock Items</p>
              <p className="text-2xl font-bold text-gray-900">
                {sellerProducts.filter(p => p.inStock).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
        {sellerOrders.length > 0 ? (
          <div className="space-y-4">
            {sellerOrders.slice(0, 5).map((order) => (
              <div key={order.id || order._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Order #{order.id}</p>
                  <p className="text-sm text-gray-600">{order.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    ${order.items
                      .filter(item => item.product.sellerId === user?.id)
                      .reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
                      .toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600 capitalize">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8">No orders yet</p>
        )}
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Products</h2>
        <button
          onClick={() => {
            setActiveTab('add-product');
            setEditingProduct(null);
            setProductForm({
              title: '',
              description: '',
              price: '',
              image: '',
              category: '',
              quantity: ''
            });
          }}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Product
        </button>
      </div>

      {sellerProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sellerProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-emerald-600">${product.price.toFixed(2)}</span>
                  <span className={`text-sm ${product.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    Stock: {product.quantity}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products yet</h3>
          <p className="text-gray-600 mb-6">Start by adding your first product to the marketplace</p>
          <button
            onClick={() => {
              
              setActiveTab('add-product');
            }}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          >
            Add Your First Product
          </button>
        </div>
      )}
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
      
      {sellerOrders.length > 0 ? (
        <div className="space-y-4">
          {sellerOrders.map((order) => (
            <div key={order.id || order._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <select
                  value={order.status}
                  onChange={(e) => handleOrderStatusUpdate((order.id || order._id)!, e.target.value as Order['status'])}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Customer Details</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-600">Name:</span> {order.customerName}</p>
                    <p><span className="text-gray-600">Email:</span> {order.customerEmail}</p>
                    <p><span className="text-gray-600">Phone:</span> {order.customerPhone}</p>
                    <p><span className="text-gray-600">Address:</span> {order.customerAddress}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
                  <div className="space-y-2">
                    {order.items
                      .filter(item => item.product.sellerId === user?.id)
                      .map((item, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <img
                            src={item.product.image}
                            alt={item.product.title}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{item.product.title}</p>
                            <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-600">Orders for your products will appear here</p>
        </div>
      )}
    </div>
  );

  const renderAddProduct = () => (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {editingProduct ? 'Edit Product' : 'Add New Product'}
      </h2>
      
      <form onSubmit={handleProductSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
          <input
            type="text"
            required
            value={productForm.title}
            onChange={(e) => setProductForm({...productForm, title: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="Enter product title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            required
            rows={3}
            value={productForm.description}
            onChange={(e) => setProductForm({...productForm, description: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
            placeholder="Enter product description"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              required
              value={productForm.price}
              onChange={(e) => setProductForm({...productForm, price: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              type="number"
              min="0"
              required
              value={productForm.quantity}
              onChange={(e) => setProductForm({...productForm, quantity: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            required
            value={productForm.category}
            onChange={(e) => setProductForm({...productForm, category: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="url"
            required
            value={productForm.image}
            onChange={(e) => setProductForm({...productForm, image: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="https://example.com/image.jpg"
          />
          {productForm.image && (
            <div className="mt-2">
              <img
                src={productForm.image}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          >
            {editingProduct ? 'Update Product' : 'Add Product'}
          </button>
          <button
            type="button"
            onClick={() => {
              setEditingProduct(null);
              setActiveTab('products');
            }}
            className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}!</p>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'orders', label: 'Orders', icon: Users },
            { id: 'add-product', label: 'Add Product', icon: Plus }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'products' && renderProducts()}
      {activeTab === 'orders' && renderOrders()}
      {activeTab === 'add-product' && renderAddProduct()}
    </div>
  );
};

export default SellerDashboard;