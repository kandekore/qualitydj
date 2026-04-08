import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import DJServices from './pages/DJServices';
import LightingExtras from './pages/LightingExtras';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import ExclusiveVenues from './pages/ExclusiveVenues';
import SpotifyPlaylist from './pages/SpotifyPlaylist';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/dj-services" element={<DJServices />} />
            <Route path="/lighting-extras" element={<LightingExtras />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/exclusive-venues" element={<ExclusiveVenues />} />
            <Route path="/spotify-playlist" element={<SpotifyPlaylist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
