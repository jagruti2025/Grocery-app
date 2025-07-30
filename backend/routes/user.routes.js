// routes/user.routes.js
import express from 'express';
import { getAllUsers, deleteUser } from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.js';
import { allowRoles } from '../middleware/role.js';

const router = express.Router();

// Admin-only access
router.use(protect, allowRoles('admin'));

router.get('/', getAllUsers);
router.delete('/:id', deleteUser);

export default router;
