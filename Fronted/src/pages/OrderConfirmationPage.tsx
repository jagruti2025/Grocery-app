import React from 'react';
import { CheckCircle, Package, Clock, MapPin, ArrowRight, Home } from 'lucide-react';

interface OrderConfirmationPageProps {
  orderId: string;
  onContinueShopping: () => void;
  onGoHome: () => void;
}

const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ 
  orderId, 
  onContinueShopping, 
  onGoHome 
}) => {
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 1);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        {/* Success Icon */}
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>

        {/* Success Message */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Thank you for your order. We've received your order and we're getting it ready.
        </p>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 max-w-2xl mx-auto">
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Order Details</h2>
            <p className="text-gray-600">Order ID: <span className="font-mono font-medium">#{orderId}</span></p>
            <p className="text-gray-600">Order Date: {new Date().toLocaleDateString()}</p>
          </div>

          {/* Order Timeline */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Order Confirmed</h3>
                <p className="text-sm text-gray-600">Your order has been received and confirmed</p>
                <p className="text-xs text-gray-500">{new Date().toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Preparing Order</h3>
                <p className="text-sm text-gray-600">We're preparing your items for delivery</p>
                <p className="text-xs text-gray-500">In progress...</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100">
                  <Clock className="h-6 w-6 text-gray-400" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-500">Estimated Delivery</h3>
                <p className="text-sm text-gray-600">Your order will be delivered within 24 hours</p>
                <p className="text-xs text-gray-500">{estimatedDelivery.toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-emerald-50 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <MapPin className="h-6 w-6 text-emerald-600 mr-2" />
            <h3 className="text-lg font-semibold text-emerald-800">Delivery Information</h3>
          </div>
          <div className="text-emerald-700 space-y-2">
            <p>📦 Free delivery on all orders</p>
            <p>🚚 Expected delivery: {estimatedDelivery.toLocaleDateString()}</p>
            <p>📞 We'll call you before delivery</p>
            <p>💳 Payment on delivery available</p>
          </div>
        </div>

        {/* What's Next */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h3>
          <div className="text-left space-y-3 text-gray-600">
            <div className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">1</span>
              <p>We'll prepare your order and ensure all items are fresh and ready</p>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">2</span>
              <p>Our delivery partner will pick up your order from our warehouse</p>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">3</span>
              <p>You'll receive a call from our delivery partner before they arrive</p>
            </div>
            <div className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">4</span>
              <p>Enjoy your fresh groceries!</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onContinueShopping}
            className="inline-flex items-center px-8 py-3 border border-emerald-600 text-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
          >
            <ArrowRight className="h-5 w-5 mr-2" />
            Continue Shopping
          </button>
          
          <button
            onClick={onGoHome}
            className="inline-flex items-center px-8 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            <Home className="h-5 w-5 mr-2" />
            Go to Home
          </button>
        </div>

        {/* Support Information */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            If you have any questions about your order, feel free to contact our support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <a href="tel:+1234567890" className="text-emerald-600 hover:text-emerald-700 font-medium">
              📞 Call Support: +1 (234) 567-890
            </a>
            <a href="mailto:support@grocerymart.com" className="text-emerald-600 hover:text-emerald-700 font-medium">
              ✉️ Email: support@grocerymart.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;