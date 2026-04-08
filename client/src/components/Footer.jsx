import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Footer.css';

const navItems = [
  { label: 'Home', url: '/' },
  { label: 'About', url: '/about-us' },
  { label: 'DJ Services', url: '/dj-services' },
  { label: 'Lighting & Extras', url: '/lighting-extras' },
  { label: 'Testimonials', url: '/testimonials' },
  { label: 'Contact', url: '/contact-us' },
];

export default function Footer() {
  const { user } = useAuth();

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__brand">
          <div className="footer__badges">
            <img src="/assets/images/badge-rated.png" alt="Rated 10 out of 10" />
            <img src="/assets/images/badge-awards.png" alt="Wedding Awards" />
          </div>
          <p className="footer__tagline">
            "Your Wedding, Your Music: Expertly Mixed for an Unforgettable Celebration"
          </p>
        </div>

        <div className="footer__nav">
          <h4>Quick Links</h4>
          <ul>
            {navItems.map((item) => (
              <li key={item.url}>
                <Link to={item.url}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__contact">
          <h4>Get in Touch</h4>
          <p>Ready to create your perfect wedding soundtrack?</p>
          <Link to="/contact-us" className="btn btn--accent">
            Enquire Now
          </Link>
          {user ? (
            <Link to="/spotify-playlist" className="footer__spotify">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              Share Playlist
            </Link>
          ) : (
            <Link to="/login" className="footer__spotify">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              Share Playlist
            </Link>
          )}
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Quality Wedding DJ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
