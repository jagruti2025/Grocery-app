// order.routes.js
// routes/order.routes.js
import express from 'express';
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrdersByCustomerId,
  updateOrderStatus
} from '../controllers/order.controller.js';
import { protect } from '../middleware/auth.js';
import { allowRoles } from '../middleware/role.js';

const router = express.Router();

// customer: place order, view their orders
router.post('/', protect, allowRoles('customer'), createOrder);
router.get('/me', protect, allowRoles('customer'), getMyOrders);

// admin: all orders, update
router.get('/customer/:id',protect,allowRoles('admin'), getOrdersByCustomerId)
router.get('/', protect, allowRoles('admin'), getAllOrders);
router.put('/:id', protect, allowRoles('admin'), updateOrderStatus);

export default router;
