import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './BookList.css';

function BookList() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const booksPerPage = 6;

  const { user } = useAuth();
  const accessToken = localStorage.getItem('access_token');

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:8000/users/${user.id}/books`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setBooks(res.data);
    } catch (error) {
      setError('Error fetching books. Please try again.');
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  }, [user, accessToken]);

  useEffect(() => {
    if (user) {
      fetchBooks();
    }
  }, [user, fetchBooks]);

  const handleDelete = async (bookId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/users/${user.id}/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setBooks(books.filter((book) => book.id !== bookId));
    } catch (error) {
      setError('Error deleting book. Please try again.');
      console.error('Error deleting book:', error);
    }
  };

  const filteredBooks = books
    .filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const aField = a[sortField];
      const bField = b[sortField];
      if (sortOrder === 'asc') {
        return aField > bField ? 1 : -1;
      } else {
        return aField < bField ? 1 : -1;
      }
    });

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">🔄</div>
        <p>Loading your books...</p>
      </div>
    );
  }

  return (
    <div className="book-list-container">
      <div className="book-list-header">
        <h1 className="book-list-title">📚 My Book Collection</h1>
        <p className="book-list-subtitle">Manage and organize your personal library</p>
      </div>
      
      {error && <div className="error-message">{error}</div>}

      <div className="book-controls">
        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Sort Options */}
        <div className="sort-container">
          <label className="sort-label">Sort by:</label>
          <select 
            value={sortField} 
            onChange={(e) => setSortField(e.target.value)}
            className="sort-select"
          >
            <option value="title">Title</option>
            <option value="published_year">Year</option>
          </select>
          <select 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)} 
            className="sort-select"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* Book Grid */}
      {currentBooks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📖</div>
          <h3>No books found</h3>
          <p>Start building your library by adding your first book!</p>
          <Link to="/createbook" className="add-book-button">
            ➕ Add Your First Book
          </Link>
        </div>
      ) : (
        <div className="books-grid">
          {currentBooks.map((book) => (
            <div key={book.id} className="book-card">
              <div className="book-card-header">
                <h3 className="book-title">{book.title}</h3>
                <div className="book-year">{book.published_year}</div>
              </div>
              
              <div className="book-author">
                <span className="author-label">Author:</span> {book.author}
              </div>
              
              <div className="book-description">
                <span className="description-label">Description:</span>
                <p>{book.description}</p>
              </div>

              <div className="book-actions">
                <Link to={`/updatebook/${book.id}`} className="edit-button">
                  ✏️ Edit
                </Link>
                <button 
                  onClick={() => handleDelete(book.id)} 
                  className="delete-button"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination-container">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Add Book Button */}
      <div className="add-book-section">
        <Link to="/createbook" className="add-book-link">
          ➕ Add New Book
        </Link>
      </div>
    </div>
  );
}

export default BookList;
