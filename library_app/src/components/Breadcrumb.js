import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Breadcrumb.css';

const Breadcrumb = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const getBreadcrumbName = (pathname) => {
    const nameMap = {
      'about': 'About',
      'contact': 'Contact',
      'login': 'Login',
      'signup': 'Signup',
      'createbook': 'Add Book',
      'booklist': 'Books',
      'updatebook': 'Update Book'
    };
    return nameMap[pathname] || pathname.charAt(0).toUpperCase() + pathname.slice(1);
  };

  // Don't show breadcrumb for login/signup pages when not authenticated
  if (!isAuthenticated && (location.pathname === '/login' || location.pathname === '/signup')) {
    return null;
  }

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        <li className="breadcrumb-item">
          <Link to="/" className="breadcrumb-link">
            🏠 Home
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={name} className="breadcrumb-item">
              {isLast ? (
                <span className="breadcrumb-current">{getBreadcrumbName(name)}</span>
              ) : (
                <Link to={routeTo} className="breadcrumb-link">
                  {getBreadcrumbName(name)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb; 