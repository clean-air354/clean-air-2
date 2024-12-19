// pages/api/orders.js

import dbConnect from '@/config/database';
import Order from '@/models/Order';
import stripe from '@/config/stripe';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const orders = await Order.find({});
        res.status(200).json({ success: true, data: orders });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        const { products, totalAmount, paymentMethod } = req.body;

        // Create Stripe Payment Intent if payment method is card
        if (paymentMethod === 'card') {
          const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount * 100, // Amount in cents
            currency: 'usd',
          });

          const order = await Order.create({ products, totalAmount, paymentIntentId: paymentIntent.id });
          res.status(201).json({ success: true, data: order, clientSecret: paymentIntent.client_secret });
        } else {
          // For other payment methods (e.g., COD)
          const order = await Order.create({ products, totalAmount });
          res.status(201).json({ success: true, data: order });
        }
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
