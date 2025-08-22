import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './UpdateBook.css';

const UpdateBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    published_year: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [bookLoading, setBookLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(
          `http://localhost:8000/users/${user.id}/books/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        
        const book = response.data;
        setFormData({
          title: book.title,
          author: book.author,
          description: book.description,
          published_year: book.published_year
        });
      } catch (error) {
        setError('Failed to load book details.');
      } finally {
        setBookLoading(false);
      }
    };

    if (id && user) {
      fetchBook();
    }
  }, [id, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('access_token');
      await axios.put(
        `http://localhost:8000/users/${user.id}/books/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSuccess('Book updated successfully!');
      
      // Redirect to book list after a short delay
      setTimeout(() => {
        navigate('/booklist');
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.detail || 'Failed to update book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (bookLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">🔄</div>
        <p>Loading book details...</p>
      </div>
    );
  }

  return (
    <div className="update-book-container">
      <form className="update-book-form" onSubmit={handleSubmit}>
        <h2>📝 Update Book</h2>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        
        <label>Title:</label>
        <input 
          type="text" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          required 
        />

        <label>Author:</label>
        <input 
          type="text" 
          name="author" 
          value={formData.author} 
          onChange={handleChange} 
          required 
        />

        <label>Description:</label>
        <textarea 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          required 
        />

        <label>Published Year:</label>
        <input 
          type="number" 
          name="published_year" 
          value={formData.published_year} 
          onChange={handleChange} 
          min="1800"
          max={new Date().getFullYear()}
          required 
        />

        <button type="submit" disabled={loading}>
          {loading ? '🔄 Updating...' : 'Update Book'}
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
