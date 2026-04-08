import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const navItems = [
  { label: 'Home', url: '/' },
  { label: 'About', url: '/about-us' },
  { label: 'DJ Services', url: '/dj-services' },
  { label: 'Lighting & Extras', url: '/lighting-extras' },
  { label: 'Testimonials', url: '/testimonials' },
  { label: 'Contact', url: '/contact-us' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  // Pages without a dark hero behind the header
  const lightPages = ['/login', '/register', '/admin', '/spotify-playlist'];
  const isLightPage = lightPages.includes(location.pathname);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''} ${menuOpen ? 'header--open' : ''} ${isLightPage ? 'header--light' : ''}`}>
      <div className="header__inner">
        <Link to="/" className="header__logo">
          <img
            src={isLightPage && !scrolled ? '/assets/brand/logo-dark.png' : '/assets/brand/logotrans.png'}
            alt="Quality Wedding DJ"
          />
        </Link>

        <nav className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.url}
              to={item.url}
              className={`header__link ${location.pathname === item.url ? 'header__link--active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
          {user && (
            <Link
              to="/spotify-playlist"
              className={`header__link ${location.pathname === '/spotify-playlist' ? 'header__link--active' : ''}`}
            >
              Share Playlist
            </Link>
          )}
          <Link to="/contact-us" className="btn btn--accent header__cta-mobile">
            Enquire Now
          </Link>
          {user && (
            <div className="header__user-mobile">
              <span className="header__user-name">{user.name}</span>
              {user.role === 'admin' && (
                <Link to="/admin" className="header__link">Dashboard</Link>
              )}
              <button onClick={handleLogout} className="header__link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                Sign Out
              </button>
            </div>
          )}
          {!user && (
            <Link to="/login" className="header__link header__link--signin-mobile">
              Sign In
            </Link>
          )}
        </nav>

        <div className="header__actions">
          {user ? (
            <div className="header__user-menu">
              <button
                className="header__user-btn"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              >
                {user.name.charAt(0).toUpperCase()}
              </button>
              {userMenuOpen && (
                <div className="header__dropdown">
                  <div className="header__dropdown-name">{user.name}</div>
                  <div className="header__dropdown-email">{user.email}</div>
                  <div className="header__dropdown-divider" />
                  <Link to="/spotify-playlist" className="header__dropdown-item">Share Playlist</Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="header__dropdown-item">Admin Dashboard</Link>
                  )}
                  <button onClick={handleLogout} className="header__dropdown-item header__dropdown-item--logout">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="header__signin">Sign In</Link>
          )}

          <Link to="/contact-us" className="btn btn--accent header__cta">
            Enquire Now
          </Link>
        </div>

        <button
          className={`header__burger ${menuOpen ? 'header__burger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
