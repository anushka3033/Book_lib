import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">🔄</div>
        <p>Loading...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    // Redirect to home page if user is already authenticated
    return <Navigate to="/" replace />;
  }

  if (!isAuthenticated && window.location.pathname === '/') {
    return <Navigate to="/signup" replace />;
  }

  return children;
};

export default PublicRoute; 