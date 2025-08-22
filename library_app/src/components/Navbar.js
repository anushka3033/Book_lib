import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const res = await axios.get('http://localhost:8000/users/me/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data);
      } catch (err) {
        setProfile(null);
      }
    };
    if (isAuthenticated) fetchProfile();
  }, [isAuthenticated]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const handleTitleClick = () => {
    navigate('/');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-title" onClick={handleTitleClick}>
        📚 Book Library
      </div>
      <ul className="navbar-links">
        {isAuthenticated ? (
          // Authenticated user navigation
          <>
            <li className={location.pathname === '/' ? 'active' : ''}>
              <Link to="/">🏠 Home</Link>
            </li>
            <li className={location.pathname === '/booklist' ? 'active' : ''}>
              <Link to="/booklist">📖 Books</Link>
            </li>
            <li className={location.pathname === '/about' ? 'active' : ''}>
              <Link to="/about">ℹ️ About</Link>
            </li>
            <li className={location.pathname === '/contact' ? 'active' : ''}>
              <Link to="/contact">📞 Contact</Link>
            </li>
            {/* Profile Dropdown */}
            <li className={`profile-nav${showDropdown ? ' active' : ''}`} ref={dropdownRef}>
              <button className={`profile-btn${showDropdown ? ' active' : ''}`} onClick={() => setShowDropdown((v) => !v)}>
                👤 Profile
              </button>
              {showDropdown && profile && (
                <div className="profile-dropdown">
                  <div><b>Username:</b> {profile.username}</div>
                  <div><b>Books Created:</b> {profile.book_count}</div>
                </div>
              )}
            </li>
            <li>
              <button onClick={handleLogout} className="logout-button">
                🚪 Logout
              </button>
            </li>
          </>
        ) : (
          // Non-authenticated user navigation
          <>
            <li className={location.pathname === '/login' ? 'active' : ''}>
              <Link to="/login">🔐 Login</Link>
            </li>
            <li className={location.pathname === '/signup' ? 'active' : ''}>
              <Link to="/signup">📝 Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
