import React from 'react';
import { Package, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { Order } from '../types';

interface CustomerOrdersPageProps {
  onViewOrderDetails?: (order: Order) => void;
}

const CustomerOrdersPage: React.FC<CustomerOrdersPageProps> = ({ onViewOrderDetails }) => {
  const { user } = useAuth();
  const { orders } = useData();

  const customerOrders = orders.filter(order => order.customerId === user?.id);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'confirmed':
        return <Package className="h-5 w-5 text-blue-600" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-600" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
    }
  };

  if (customerOrders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Package className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">No Orders Yet</h2>
          <p className="text-gray-600 mb-8">You haven't placed any orders yet. Start shopping to see your orders here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
      
      <div className="space-y-6">
        {customerOrders.map((order) => (
          <div key={order.id || order._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order #{order.id}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="ml-2 capitalize">{order.status}</span>
                  </span>
                  {onViewOrderDetails && (
                    <button
                      onClick={() => onViewOrderDetails(order)}
                      className="text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
                  <div className="space-y-2">
                    {order.items.slice(0, 3).map((item, index) => (
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
                    {order.items.length > 3 && (
                      <p className="text-sm text-gray-600">
                        and {order.items.length - 3} more items...
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Delivery Details</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Name:</span>
                      <span className="ml-2 font-medium">{order.customerName}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Phone:</span>
                      <span className="ml-2 font-medium">{order.customerPhone}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Address:</span>
                      <span className="ml-2 font-medium">{order.customerAddress}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Payment:</span>
                      <span className="ml-2 font-medium capitalize">{order.paymentMethod}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {order.items.length} item{order.items.length > 1 ? 's' : ''}
                </div>
                <div className="text-xl font-bold text-emerald-600">
                  Total: ${order.total.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerOrdersPage;