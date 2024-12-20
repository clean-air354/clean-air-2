import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Added name for signup
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add `type: 'register'` to specify that this is a signup request
      await axios.post('/api/users', { name, email, password, type: 'register' });
      router.push('/login'); // Redirect to login page after successful signup
    } catch (error) {
      alert('Signup failed!');
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)} // Update name state
          required
        />
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
        <button type="submit">Signup</button>
      </form>
      <Footer />
    </div>
  );
}
