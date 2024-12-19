import Link from 'next/link';

const Navbar = () => (
  <nav>
    <Link href="/">Home</Link>
    <Link href="/products">Products</Link>
    <Link href="/cart">Cart</Link>
    <Link href="/login">Login</Link>
  </nav>
);

export default Navbar;
