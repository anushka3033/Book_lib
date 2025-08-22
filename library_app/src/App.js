// App.js
import React from 'react';
import {Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreateBook from './pages/CreateBook';
import BookList from './pages/BookList';
import UpdateBook from './pages/UpdateBook';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          {/* Public routes - only accessible when not authenticated */}
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/signup" element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          } />

          {/* Protected routes - require authentication */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="createbook" element={<CreateBook />} />
            <Route path="booklist" element={<BookList />} />
            <Route path="updatebook/:id" element={<UpdateBook />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;


