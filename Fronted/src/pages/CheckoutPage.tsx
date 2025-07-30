// import React, { useState } from 'react';
// import { CreditCard, MapPin, Phone, User, ArrowLeft } from 'lucide-react';
// import { useCart } from '../contexts/CartContext';
// import { useAuth } from '../contexts/AuthContext';
// import { useData } from '../contexts/DataContext';
// import { Order } from '../types';

// interface CheckoutPageProps {
//   onOrderComplete: (orderId: string) => void;
//   onBack: () => void;
// }

// const CheckoutPage: React.FC<CheckoutPageProps> = ({ onOrderComplete, onBack }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     paymentMethod: 'cod' as 'cod' | 'upi'
//   });
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState<Record<string, string>>({});
  
//   const { cartItems, getTotalPrice, clearCart } = useCart();
//   const { user } = useAuth();
//   const { addOrder } = useData();

//   React.useEffect(() => {
//     if (user) {
//       setFormData(prev => ({
//         ...prev,
//         name: user.name || '',
//         email: user.email || '',
//         phone: user.phone || '',
//         address: user.address || ''
//       }));
//     }
//   }, [user]);

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     if (!formData.name.trim()) newErrors.name = 'Name is required';
//     if (!formData.email.trim()) newErrors.email = 'Email is required';
//     if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
//     if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
//     if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) newErrors.phone = 'Phone number is invalid';
//     if (!formData.address.trim()) newErrors.address = 'Address is required';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;
    
//     setLoading(true);

//     try {
//       const orderData: Omit<Order, 'id' | 'createdAt'> = {
//         customerId: user!.id,
//         customerName: formData.name,
//         customerEmail: formData.email,
//         customerPhone: formData.phone,
//         customerAddress: formData.address,
//         items: cartItems,
//         total: getTotalPrice(),
//         paymentMethod: formData.paymentMethod,
//         status: 'pending'
//       };

//       addOrder(orderData);
      
//       // Simulate processing time
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       clearCart();
//       const orderId = Date.now().toString();
//       onOrderComplete(orderId);
//     } catch (error) {
//       console.error('Order submission failed:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <button
//         onClick={onBack}
//         className="flex items-center text-emerald-600 hover:text-emerald-700 mb-6 transition-colors"
//       >
//         <ArrowLeft className="h-5 w-5 mr-2" />
//         Back to Cart
//       </button>

//       <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Checkout Form */}
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold text-gray-900 mb-6">Delivery Information</h2>
          
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                 Full Name *
//               </label>
//               <div className="relative">
//                 <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleInputChange}
//                   className={`pl-10 w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
//                     errors.name ? 'border-red-300' : 'border-gray-300'
//                   }`}
//                   placeholder="Enter your full name"
//                 />
//               </div>
//               {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                 Email Address *
//               </label>
//               <div className="relative">
//                 <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className={`pl-10 w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
//                     errors.email ? 'border-red-300' : 'border-gray-300'
//                   }`}
//                   placeholder="Enter your email"
//                 />
//               </div>
//               {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
//             </div>

//             <div>
//               <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
//                 Phone Number *
//               </label>
//               <div className="relative">
//                 <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   type="tel"
//                   id="phone"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleInputChange}
//                   className={`pl-10 w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
//                     errors.phone ? 'border-red-300' : 'border-gray-300'
//                   }`}
//                   placeholder="Enter your phone number"
//                 />
//               </div>
//               {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
//             </div>

//             <div>
//               <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
//                 Delivery Address *
//               </label>
//               <div className="relative">
//                 <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <textarea
//                   id="address"
//                   name="address"
//                   rows={3}
//                   value={formData.address}
//                   onChange={handleInputChange}
//                   className={`pl-10 w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none ${
//                     errors.address ? 'border-red-300' : 'border-gray-300'
//                   }`}
//                   placeholder="Enter your complete address"
//                 />
//               </div>
//               {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">
//                 Payment Method *
//               </label>
//               <div className="space-y-3">
//                 <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     value="cod"
//                     checked={formData.paymentMethod === 'cod'}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
//                   />
//                   <div className="ml-3">
//                     <div className="font-medium text-gray-900">Cash on Delivery</div>
//                     <div className="text-sm text-gray-600">Pay when your order arrives</div>
//                   </div>
//                 </label>

//                 <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     value="upi"
//                     checked={formData.paymentMethod === 'upi'}
//                     onChange={handleInputChange}
//                     className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
//                   />
//                   <div className="ml-3">
//                     <div className="font-medium text-gray-900">UPI Payment</div>
//                     <div className="text-sm text-gray-600">Pay instantly using UPI</div>
//                   </div>
//                 </label>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-emerald-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
//             >
//               {loading ? (
//                 <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
//               ) : (
//                 `Place Order - $${getTotalPrice().toFixed(2)}`
//               )}
//             </button>
//           </form>
//         </div>

//         {/* Order Summary */}
//         <div className="bg-white rounded-lg shadow-md p-6 h-fit">
//           <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
          
//           <div className="space-y-4">
//             {cartItems.map((item) => (
//               <div key={item.product.id} className="flex items-center space-x-3">
//                 <img
//                   src={item.product.image}
//                   alt={item.product.title}
//                   className="w-12 h-12 object-cover rounded-lg"
//                 />
//                 <div className="flex-1">
//                   <h4 className="font-medium text-gray-900 text-sm">{item.product.title}</h4>
//                   <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
//                 </div>
//                 <span className="font-medium text-gray-900">
//                   ${(item.product.price * item.quantity).toFixed(2)}
//                 </span>
//               </div>
//             ))}
//           </div>

//           <div className="border-t border-gray-200 mt-6 pt-6 space-y-3">
//             <div className="flex justify-between">
//               <span className="text-gray-600">Subtotal:</span>
//               <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-600">Delivery Fee:</span>
//               <span className="font-medium text-green-600">Free</span>
//             </div>
//             <div className="flex justify-between text-lg font-semibold">
//               <span>Total:</span>
//               <span className="text-emerald-600">${getTotalPrice().toFixed(2)}</span>
//             </div>
//           </div>

//           <div className="mt-6 pt-6 border-t border-gray-200">
//             <div className="bg-emerald-50 rounded-lg p-4">
//               <p className="text-sm text-emerald-700 text-center">
//                 🚚 Free delivery • 📞 24/7 Support
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;

import React, { useState, useEffect } from 'react';
import { CreditCard, MapPin, Phone, User, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { Order } from '../types';

interface CheckoutPageProps {
  onOrderComplete: (orderId: string) => void;
  onBack: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ onOrderComplete, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'cod' as 'cod' | 'upi',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { addOrder } = useData();

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      }));
    }
  }, [user]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) newErrors.phone = 'Phone number is invalid';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const orderData: Omit<Order, 'id' | 'createdAt'> = {
        customerId: user!._id,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        customerAddress: formData.address,
        items: cartItems,
        total: getTotalPrice(),
        paymentMethod: formData.paymentMethod,
        status: 'pending',
      };

      await addOrder(orderData);
      await new Promise((res) => setTimeout(res, 1000));
      clearCart();
      const fakeOrderId = Date.now().toString();
      onOrderComplete(fakeOrderId);
    } catch (error) {
      console.error('Order submission failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button onClick={onBack} className="flex items-center text-emerald-600 hover:text-emerald-700 mb-6">
        <ArrowLeft className="h-5 w-5 mr-2" /> Back to Cart
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Delivery Information</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`pl-10 w-full px-3 py-3 border rounded-lg focus:ring-emerald-500 ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email *</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`pl-10 w-full px-3 py-3 border rounded-lg focus:ring-emerald-500 ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`pl-10 w-full px-3 py-3 border rounded-lg focus:ring-emerald-500 ${
                    errors.phone ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your phone number"
                />
              </div>
              {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium mb-1">Address *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`pl-10 w-full px-3 py-3 border rounded-lg focus:ring-emerald-500 resize-none ${
                    errors.address ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter delivery address"
                />
              </div>
              {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
            </div>

            {/* Payment */}
            <div>
              <label className="block text-sm font-medium mb-3">Payment Method *</label>
              <div className="space-y-3">
                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-emerald-600"
                  />
                  <div className="ml-3">
                    <div className="font-medium">Cash on Delivery</div>
                    <div className="text-sm text-gray-600">Pay when the order arrives</div>
                  </div>
                </label>

                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-emerald-600"
                  />
                  <div className="ml-3">
                    <div className="font-medium">UPI Payment</div>
                    <div className="text-sm text-gray-600">Pay instantly with UPI</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-emerald-700 disabled:opacity-50 flex justify-center"
            >
              {loading ? (
                <div className="animate-spin h-6 w-6 border-b-2 border-white rounded-full"></div>
              ) : (
                `Place Order - $${getTotalPrice().toFixed(2)}`
              )}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.product.id || item.product._id} className="flex items-center space-x-3">
                <img src={item.product.image} alt={item.product.title} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{item.product.title}</h4>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 mt-6 pt-6 space-y-3">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Delivery Fee:</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span className="text-emerald-600">${getTotalPrice().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
