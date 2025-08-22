import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './Home.css';

function Home() {
  // Removed profile-related state and effect
  return (
    <div className="home-container">
      <div className="home-body">
        {/* Left content section */}
        <div className="main-content">
          <h1 className="home-title">Welcome to the Book Library App</h1>
          <p className="home-subtitle">
            Kickstart your reading adventure – from logging in to building your dream bookshelf,
            your bookish journey begins here!
          </p>
        </div> 

        {/* Right image */} 
        <div className="home-image">
          <img src="/bookshelf.png" alt="Bookshelf" className="background-image" />
        </div>
      </div>
    </div>
  );
}

export default Home;
