// // controllers/product.controller.js
// import Product from '../models/product.model.js';
// import mongoose from 'mongoose';

// export const getAllProducts = async (req, res) => {
//   const products = await Product.find();
//   const clean = products.map(p => ({
//     ...p.toObject(),
//     id: p._id
//   }));
//   res.json(clean);
// };

// export const getProductById = async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   if (!product) return res.status(404).json({ message: 'Product not found' });

//   const clean = {
//     ...product.toObject(),
//     id: product._id
//   };
//   res.json(clean);
// };

// export const createProduct = async (req, res) => {
//   const { title, description, price, image, category, quantity } = req.body;
//   const sellerId = req.user.id;
//   const sellerName = req.user.name;

//   // const newProduct = await Product.create({
//   //   title, description, price, image, category, quantity, sellerId, sellerName,
//   //   inStock: quantity > 0
//   // });
//   const newProduct = new Product({
//   title,
//   description,
//   price,
//   image,
//   category,
//   quantity,
//   inStock,
//   sellerId: req.user.id,         // ✅ make sure this comes from JWT
//   sellerName: req.user.name      // ✅ also from JWT
// });


//   const clean = {
//     ...newProduct.toObject(),
//     id: newProduct._id
//   };
//   res.status(201).json(clean);
// };

// export const updateProduct = async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   if (!product) return res.status(404).json({ message: 'Product not found' });

//   if (req.user.role !== 'admin' && req.user.id !== product.sellerId.toString()) {
//     return res.status(403).json({ message: 'Access denied' });
//   }

//   const updated = await Product.findByIdAndUpdate(
//     req.params.id,
//     { ...req.body, inStock: req.body.quantity > 0 },
//     { new: true }
//   );

//   const clean = {
//     ...updated.toObject(),
//     id: updated._id
//   };
//   res.json(clean);
// };

// export const deleteProduct = async (req, res) => {
//   const product = await Product.findById(req.params.id);
//   if (!product) return res.status(404).json({ message: 'Product not found' });

//   if (req.user.role !== 'admin' && req.user.id !== product.sellerId.toString()) {
//     return res.status(403).json({ message: 'Access denied' });
//   }

//   await product.deleteOne();
//   res.json({ message: 'Product deleted' });
// };


// controllers/product.controller.js
import Product from '../models/product.model.js';
import mongoose from 'mongoose';

// GET all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error('❌ Error fetching products:', err.message);
    res.status(500).json({ error: 'Server error while fetching products' });
  }
};

// POST create a product
export const createProduct = async (req, res) => {
  try {
    // Convert sellerId to ObjectId
    if (req.body.sellerId) {
      req.body.sellerId = new mongoose.Types.ObjectId(req.body.sellerId);
    }

    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    console.error('❌ Product creation error:', err.message);
    res.status(500).json({ error: 'Server error while creating product' });
  }
};

// PUT update a product
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.json(updated);
  } catch (err) {
    console.error('❌ Product update error:', err.message);
    res.status(500).json({ error: 'Server error while updating product' });
  }
};

// GET product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('❌ Error fetching product by ID:', err.message);
    res.status(500).json({ error: 'Server error while fetching product' });
  }
};

// DELETE a product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error('❌ Product delete error:', err.message);
    res.status(500).json({ error: 'Server error while deleting product' });
  }
};
