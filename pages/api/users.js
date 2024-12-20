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

      // Check for missing fields
      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
      }

      try {
        if (type === 'register') {
          // Check if the email already exists
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already in use' });
          }

          // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);

          // Create a new user
          const user = await User.create({ name, email, password: hashedPassword });
          res.status(201).json({ success: true, data: user });
        } else if (type === 'login') {
          // Find the user by email
          const user = await User.findOne({ email });
          if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
          }

          // Compare the password
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
          }

          // Generate a JWT token
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
          res.status(200).json({ success: true, token });
        } else {
          return res.status(400).json({ success: false, message: 'Invalid request type' });
        }
      } catch (error) {
        console.error('Error during user authentication:', error);
        res.status(500).json({ success: false, error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
