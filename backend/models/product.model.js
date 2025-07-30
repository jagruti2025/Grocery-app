// product.model.js

// models/product.model.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  category: String,
  quantity: Number,
  inStock: Boolean,
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sellerName: String,
});


export default mongoose.model('Product', productSchema);
