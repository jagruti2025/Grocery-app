// cart.model.js
// models/cart.model.js
import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: { type: Object, required: true },
  quantity: { type: Number, required: true }
});

const cartSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [cartItemSchema]
  },
  { timestamps: true }
);

export default mongoose.model('Cart', cartSchema);
