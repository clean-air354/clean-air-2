import { useEffect, useState } from 'react';
import Checkout from '../components/Checkout';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Checkout</h1>
      {cartItems.length > 0 ? (
        <Checkout cartItems={cartItems} />
      ) : (
        <p>Your cart is empty.</p>
      )}
      <Footer />
    </div>
  );
}
