import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Checkout = ({ cartItems }) => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await axios.post('/api/orders', { items: cartItems });
    await stripe.redirectToCheckout({ sessionId: response.data.id });
  };

  return <button onClick={handleCheckout}>Proceed to Checkout</button>;
};

export default Checkout;
