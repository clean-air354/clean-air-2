import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';



export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        if (!token) {
          throw new Error('No token found. Please log in.');
        }
  
        const response = await axios.get('/api/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setProducts(response.data.data); // Ensure you're accessing the correct key in the API response
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  

  return (
    <div>
      <Navbar />
      <h1>Our Products</h1>
      
      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="product-list">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => <ProductCard key={product._id} product={product} />)
        ) : (
          !loading && <p>No products available.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}
