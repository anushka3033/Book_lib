import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1 className="about-title">📚 About Book Library</h1>
        <p className="about-subtitle">
          Your digital bookshelf, reimagined for the modern reader.
        </p>
      </div>
      <div className="about-content">
        <section className="about-section">
          <h2>✨ Our Mission</h2>
          <p>
            Book Library is designed to empower book lovers to organize, track, and celebrate their reading journey. Whether you’re a casual reader or a passionate bibliophile, our platform provides a seamless, beautiful, and secure way to manage your personal library from anywhere.
          </p>
        </section>
        <section className="about-section">
          <h2>🌟 Features</h2>
          <ul className="about-features">
            <li>Effortlessly <b>add, update, and delete</b> books in your collection</li>
            <li>Intuitive <b>search and sort</b> to quickly find your next read</li>
            <li>Secure <b>user authentication</b> to protect your library</li>
            <li>Modern, <b>responsive design</b> for all devices</li>
            <li>Personalized experience—your books, your way</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
