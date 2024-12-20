import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../app/globals.css';

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <h1>Welcome to Clean Air Startup</h1>
        <p>Your trusted source for clean air products.</p>
      </main>
      <Footer />
    </div>
  );
}
