// pages/api/users.js

import dbConnect from '@/config/database';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'POST':
      const { name, email, password, type } = req.body;

      try {
        if (type === 'register') {
          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = await User.create({ name, email, password: hashedPassword });
          res.status(201).json({ success: true, data: user });
        } else if (type === 'login') {
          const user = await User.findOne({ email });
          if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
          }

          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
          res.status(200).json({ success: true, token });
        } else {
          res.status(400).json({ success: false, message: 'Invalid request type' });
        }
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
