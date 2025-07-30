// cart.routes.js
// routes/cart.routes.js
import express from 'express';
import {
  getCart,
  addOrUpdateItem,
  updateItemQuantity,
  removeItem,
  clearCart
} from '../controllers/cart.controller.js';
import { protect } from '../middleware/auth.js';
import { allowRoles } from '../middleware/role.js';

const router = express.Router();

// Only customers use cart
router.use(protect, allowRoles('customer'));

router.get('/', getCart);
router.post('/', addOrUpdateItem);
router.put('/:productId', updateItemQuantity);
router.delete('/:productId', removeItem);
router.delete('/', clearCart);

export default router;
