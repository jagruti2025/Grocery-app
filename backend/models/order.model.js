// models/order.model.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerId: { type :mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  customerAddress: String,
  items: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['cod', 'upi'], default: 'cod' },
  status: { type: String, enum: ['pending', 'confirmed', 'delivered', 'cancelled'], default: 'pending' },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
