// // order.controller.js
// import Order from '../models/order.model.js';

// export const createOrder = async (req, res) => {
//   try {
//     const {
//       customerId,
//       customerName,
//       customerEmail,
//       customerPhone,
//       customerAddress,
//       items,
//       total,
//       paymentMethod,
//       status,
//     } = req.body;

//     if (!customerId || !items || items.length === 0 || !total) {
//       return res.status(400).json({ message: 'Missing required order fields.' });
//     }

//     const order = new Order({
//       customerId,
//       customerName,
//       customerEmail,
//       customerPhone,
//       customerAddress,
//       items,
//       total,
//       paymentMethod,
//       status,
//     });

//     const savedOrder = await order.save();
//     res.status(201).json(savedOrder);
//   } catch (error) {
//     console.error('❌ Order creation error:', error);
//     res.status(500).json({ message: 'Internal server error while creating order' });
//   }
// };
// // Get orders by customer ID
// exports.getOrdersByCustomerId = async (req, res) => {
//   try {
//     const customerId = req.params.id;
//     const orders = await Order.find({ customerId }).sort({ createdAt: -1 });
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch customer orders' });
//   }
// };
// // Get all orders
// exports.getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 });
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to fetch orders' });
//   }
// };

import Order from '../models/order.model.js';

// Create new order (for customers)
export const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      items,
      total,
      paymentMethod,
    } = req.body;

    if (!items || items.length === 0 || !total) {
      return res.status(400).json({ message: 'Missing required order fields.' });
    }

    const order = new Order({
      customerId: req.user.id,  // ✅ Trust authenticated ID
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      items,
      total,
      paymentMethod,
      status: 'pending',
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('❌ Order creation error:', error);
    res.status(500).json({ message: 'Internal server error while creating order' });
  }
};

// Get orders for logged-in customer
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch your orders' });
  }
};

// Admin: Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch all orders' });
  }
};

// Admin: Get orders by customer ID
export const getOrdersByCustomerId = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await Order.find({ customerId: id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch customer orders' });
  }
};

// Admin: Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order status' });
  }
};
