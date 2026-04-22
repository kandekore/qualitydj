import { Link } from 'react-router-dom';
import './Footer.css';

const navItems = [
  { label: 'Home', url: '/' },
  { label: 'About', url: '/about-us' },
  { label: 'DJ Services', url: '/dj-services' },
  { label: 'Sound System', url: '/sound-system' },
  { label: 'Lighting & Extras', url: '/lighting-extras' },
  { label: 'Wedding DJ Packages', url: '/wedding-dj-packages' },
  { label: 'Real Weddings', url: '/real-weddings' },
  { label: 'Testimonials', url: '/testimonials' },
  { label: 'FAQ', url: '/faq' },
  { label: 'Contact', url: '/contact-us' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__brand">
          <div className="footer__badges">
            <img src="/assets/images/badge-rated.webp" alt="Rated 10 out of 10" />
            <img src="/assets/images/badge-awards.webp" alt="Wedding Awards" />
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
