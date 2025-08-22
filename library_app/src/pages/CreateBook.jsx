import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "./CreateBook.css";

const CreateBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    published_year: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem('access_token');
      await axios.post(
        `http://localhost:8000/users/${user.id}/books`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSuccess("Book created successfully!");
      setFormData({
        title: "",
        author: "",
        description: "",
        published_year: ""
      });

      // Redirect to book list after a short delay
      setTimeout(() => {
        navigate('/booklist');
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.detail || "Failed to create book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-book-container">
      <h2>📚 Create a New Book</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      
      <form className="create-book-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author Name"
          value={formData.author}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Book Description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="number"
          name="published_year"
          placeholder="Published Year"
          value={formData.published_year}
          onChange={handleChange}
          min="1800"
          max={new Date().getFullYear()}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "🔄 Creating..." : "Create Book"}
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
