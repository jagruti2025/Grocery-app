// import React from 'react';
// import { ShoppingCart, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
// import { useCart } from '../contexts/CartContext';

// interface CartPageProps {
//   onCheckout: () => void;
//   onContinueShopping: () => void;
// }

// const CartPage: React.FC<CartPageProps> = ({ onCheckout, onContinueShopping }) => {
//   const { cartItems, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();

//   if (cartItems.length === 0) {
//     return (
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="text-center">
//           <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
//           <p className="text-gray-600 mb-8">Add some delicious groceries to get started!</p>
//           <button
//             onClick={onContinueShopping}
//             className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
//           >
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Cart Items */}
//         <div className="lg:col-span-2 space-y-4">
//           {cartItems.map((item) => (
//             <div key={item.product.id || item.product._id} className="bg-white rounded-lg shadow-md p-6">
//               <div className="flex items-center space-x-4">
//                 <img
//                   src={item.product.image}
//                   alt={item.product.title}
//                   className="w-20 h-20 object-cover rounded-lg"
//                 />
                
//                 <div className="flex-1">
//                   <h3 className="font-semibold text-gray-900 mb-1">{item.product.title}</h3>
//                   <p className="text-sm text-gray-600 mb-2">{item.product.category}</p>
//                   <p className="text-lg font-bold text-emerald-600">
//                     ${item.product.price.toFixed(2)}
//                   </p>
//                 </div>

//                 <div className="flex items-center space-x-3">
//                   <div className="flex items-center border border-gray-300 rounded-lg">
//                     <button
//                       onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
//                       className="p-2 hover:bg-gray-100 transition-colors"
//                     >
//                       <Minus className="h-4 w-4" />
//                     </button>
//                     <span className="px-4 py-2 font-medium">{item.quantity}</span>
//                     <button
//                       onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
//                       disabled={item.quantity >= item.product.quantity}
//                       className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       <Plus className="h-4 w-4" />
//                     </button>
//                   </div>

//                   <button
//                     onClick={() => removeFromCart(item.product.id)}
//                     className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
//                   >
//                     <Trash2 className="h-5 w-5" />
//                   </button>
//                 </div>
//               </div>
              
//               <div className="mt-4 pt-4 border-t border-gray-200">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-600">Subtotal for this item:</span>
//                   <span className="font-semibold text-gray-900">
//                     ${(item.product.price * item.quantity).toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Order Summary */}
//         <div className="bg-white rounded-lg shadow-md p-6 h-fit">
//           <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
          
//           <div className="space-y-4 mb-6">
//             <div className="flex justify-between">
//               <span className="text-gray-600">Items ({getTotalItems()}):</span>
//               <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-600">Delivery:</span>
//               <span className="font-medium text-green-600">Free</span>
//             </div>
//             <div className="border-t border-gray-200 pt-4">
//               <div className="flex justify-between">
//                 <span className="text-lg font-semibold text-gray-900">Total:</span>
//                 <span className="text-lg font-bold text-emerald-600">
//                   ${getTotalPrice().toFixed(2)}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-3">
//             <button
//               onClick={onCheckout}
//               className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center"
//             >
//               Proceed to Checkout
//               <ArrowRight className="h-5 w-5 ml-2" />
//             </button>
            
//             <button
//               onClick={onContinueShopping}
//               className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
//             >
//               Continue Shopping
//             </button>
//           </div>

//           <div className="mt-6 pt-6 border-t border-gray-200">
//             <div className="bg-emerald-50 rounded-lg p-4">
//               <p className="text-sm text-emerald-700 text-center">
//                 🚚 Free delivery on orders over $50
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;

import React from 'react';
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface CartPageProps {
  onCheckout: () => void;
  onContinueShopping: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ onCheckout, onContinueShopping }) => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some delicious groceries to get started!</p>
        <button
          onClick={onContinueShopping}
          className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.product.id || item.product._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-4">
                <img src={item.product.image} alt={item.product.title} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.product.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.product.category}</p>
                  <p className="text-lg font-bold text-emerald-600">${item.product.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-2 hover:bg-gray-100">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.quantity}
                      className="p-2 hover:bg-gray-100 disabled:opacity-50"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item.product.id)} className="p-2 text-red-600 hover:bg-red-50">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                <span className="text-sm text-gray-600">Subtotal for this item:</span>
                <span className="font-semibold text-gray-900">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Items ({getTotalItems()}):</span>
              <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery:</span>
              <span className="font-medium text-green-600">Free</span>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-lg font-bold text-emerald-600">${getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <button
              onClick={onCheckout}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 flex justify-center items-center"
            >
              Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button
              onClick={onContinueShopping}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
