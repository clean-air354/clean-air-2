// pages/api/admin/stats.js
import dbConnect from '@/config/database';
import Product from '@/models/Product';
import Order from '@/models/Order';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  // Check for JWT token
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }

  switch (method) {
    case 'GET':
      try {
        const totalProducts = await Product.countDocuments({});
        const totalOrders = await Order.countDocuments({});
        res.status(200).json({ success: true, totalProducts, totalOrders });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
