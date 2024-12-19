import Cart from '../components/Cart';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CartPage() {
  return (
    <div>
      <Navbar />
      <h1>Your Cart</h1>
      <Cart />
      <Footer />
    </div>
  );
}
