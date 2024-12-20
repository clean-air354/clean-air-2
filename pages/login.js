import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link'; // Import Link here
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // POST request for login
      const response = await axios.post('/api/users', { email, password, type: 'login' });

      // Save token to localStorage or sessionStorage if needed (optional)
      localStorage.setItem('token', response.data.token); 

      // Redirect to the account page after successful login
      router.push('/account');
    } catch (error) {
      alert('Login failed! Please check your credentials.');
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{' '}
        <Link href="/signup">
          <a>Sign Up</a> {/* Ensuring proper usage of <Link> and <a> tag */}
        </Link>
      </p>
      <Footer />
    </div>
  );
}
