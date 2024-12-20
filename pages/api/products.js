import dbConnect from '@/config/database';
import Product from '@/models/Product';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        // Pagination parameters
        const { page = 1, limit = 10 } = req.query;

        const products = await Product.find({})
          .skip((page - 1) * limit)
          .limit(parseInt(limit));

        const totalProducts = await Product.countDocuments();

        res.status(200).json({
          success: true,
          data: products,
          page: parseInt(page),
          totalPages: Math.ceil(totalProducts / limit),
        });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        // Check for token in the request headers
        const authHeader = req.headers.authorization;
        if (!authHeader) {
          return res.status(401).json({ success: false, error: 'Unauthorized: No token provided' });
        }

        const token = authHeader.split(' ')[1];
        let decoded;

        try {
          decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
          return res.status(401).json({ success: false, error: 'Unauthorized: Invalid token' });
        }

        // Validate product data
        const { name, price, description, image } = req.body;
        if (!name || !price) {
          return res.status(400).json({ success: false, error: 'Name and price are required fields' });
        }

        const product = await Product.create({ name, price, description, image });
        res.status(201).json({ success: true, data: product });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
