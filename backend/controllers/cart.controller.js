// cart.controller.js
// controllers/cart.controller.js
import Cart from '../models/cart.model.js';

export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ customerId: req.user.id });
  res.json(cart || { items: [] });
};

export const addOrUpdateItem = async (req, res) => {
  const { product, quantity } = req.body;

  let cart = await Cart.findOne({ customerId: req.user.id });
  if (!cart) cart = new Cart({ customerId: req.user.id, items: [] });

  const index = cart.items.findIndex((item) => item.product.id === product.id);

  if (index !== -1) {
    // If item exists, update quantity
    cart.items[index].quantity += quantity;
  } else {
    // Else push new item
    cart.items.push({ product, quantity });
  }

  await cart.save();
  res.json(cart);
};

export const updateItemQuantity = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  const cart = await Cart.findOne({ customerId: req.user.id });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  const item = cart.items.find((item) => item.product.id === productId);
  if (!item) return res.status(404).json({ message: 'Item not in cart' });

  item.quantity = quantity;
  await cart.save();
  res.json(cart);
};

export const removeItem = async (req, res) => {
  const { productId } = req.params;
  const cart = await Cart.findOne({ customerId: req.user.id });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  cart.items = cart.items.filter((item) => item.product.id !== productId);
  await cart.save();
  res.json(cart);
};

export const clearCart = async (req, res) => {
  await Cart.findOneAndDelete({ customerId: req.user.id });
  res.json({ message: 'Cart cleared' });
};
