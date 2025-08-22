import React from 'react';
import Navbar from './Navbar';
import Breadcrumb from './Breadcrumb';
import Footer from './Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const showBreadcrumb = location.pathname !== '/' && isAuthenticated;

  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">
        {showBreadcrumb && <Breadcrumb />}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
