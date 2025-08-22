import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Footer.css';

const Footer = () => {
  const { isAuthenticated } = useAuth();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>📚 Book Library</h3>
          <p>Your personal digital library management system</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            {isAuthenticated ? (
              <>
                <li><Link to="/">🏠 Home</Link></li>
                <li><Link to="/booklist">📖 Books</Link></li>
                <li><Link to="/createbook">➕ Add Book</Link></li>
                <li><Link to="/about">ℹ️ About</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/login">🔐 Login</Link></li>
                <li><Link to="/signup">📝 Signup</Link></li>
              </>
            )}
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Account</h4>
          <ul>
            {isAuthenticated ? (
              <>
                <li><Link to="/contact">📞 Contact</Link></li>
                <li><Link to="/about">ℹ️ About</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/login">🔐 Login</Link></li>
                <li><Link to="/signup">📝 Signup</Link></li>
                <li><Link to="/contact">📞 Contact</Link></li>
              </>
            )}
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Connect</h4>
          <div className="social-links">
            <button className="social-button" aria-label="Facebook">📘</button>
            <button className="social-button" aria-label="Twitter">🐦</button>
            <button className="social-button" aria-label="Instagram">📷</button>
            <button className="social-button" aria-label="LinkedIn">💼</button>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 Book Library. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 