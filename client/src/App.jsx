import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import DJServices from './pages/DJServices';
import LightingExtras from './pages/LightingExtras';
import SoundSystem from './pages/SoundSystem';
import WeddingDJPackages from './pages/WeddingDJPackages';
import RealWeddings from './pages/RealWeddings';
import RealWedding from './pages/RealWedding';
import FAQ from './pages/FAQ';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import ExclusiveVenues from './pages/ExclusiveVenues';
import SpotifyPlaylist from './pages/SpotifyPlaylist';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterSuccess from './pages/RegisterSuccess';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Admin from './pages/Admin';
import AreaPage from './pages/AreaPage';
import VenuePage from './pages/VenuePage';
import AreasCovered from './pages/AreasCovered';
import VenuesIndex from './pages/VenuesIndex';

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
            <Route path="/sound-system" element={<SoundSystem />} />
            <Route path="/lighting-extras" element={<LightingExtras />} />
            <Route path="/wedding-dj-packages" element={<WeddingDJPackages />} />
            <Route path="/real-weddings" element={<RealWeddings />} />
            <Route path="/real-weddings/:slug" element={<RealWedding />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/exclusive-venues" element={<ExclusiveVenues />} />
            <Route path="/spotify-playlist" element={<SpotifyPlaylist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-success" element={<RegisterSuccess />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/areas-covered" element={<AreasCovered />} />
            <Route path="/venues" element={<VenuesIndex />} />
            <Route path="/wedding-dj/venues/:slug" element={<VenuePage />} />
            <Route path="/wedding-dj/:slug" element={<AreaPage />} />
          </Routes>
        </main>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
