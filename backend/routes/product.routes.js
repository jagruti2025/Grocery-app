// product.routes.js

// routes/product.routes.js
import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller.js';
import { protect } from '../middleware/auth.js';
import { allowRoles } from '../middleware/role.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Seller/Admin access
router.post('/', protect, allowRoles('seller', 'admin'), createProduct);
router.put('/:id', protect, allowRoles('seller', 'admin'), updateProduct);
router.delete('/:id', protect, allowRoles('seller', 'admin'), deleteProduct);

export default router;
