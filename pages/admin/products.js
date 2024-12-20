import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated as admin
    const token = localStorage.getItem('token'); // Get the JWT token from localStorage

    if (!token) {
      router.push('/login'); // Redirect to login if not authenticated
    }

    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products', {
          headers: {
            Authorization: `Bearer ${token}` // Include token in the request headers
          }
        });
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [router]);

  return (
    <div>
      <Navbar />
      <h1>Admin - Manage Products</h1>
      <div>
        {products.map((product) => (
          <div key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ₹{product.price}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
