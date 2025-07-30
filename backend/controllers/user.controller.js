// user.controller.js
// controllers/user.controller.js
import User from '../models/user.model.js';

export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password'); // hide passwords
  res.json(users);
};

export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  await user.deleteOne();
  res.json({ message: 'User deleted' });
};
