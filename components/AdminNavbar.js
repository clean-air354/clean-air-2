import Link from 'next/link';

const AdminNavbar = () => {
  return (
    <nav>
      <ul>
        <li><Link href="/admin/dashboard">Dashboard</Link></li>
        <li><Link href="/admin/products">Manage Products</Link></li>
        <li><Link href="/admin/orders">Manage Orders</Link></li>
        {/* Add other admin links as needed */}
      </ul>
    </nav>
  );
};

export default AdminNavbar;
