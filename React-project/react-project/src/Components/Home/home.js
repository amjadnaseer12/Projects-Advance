import React, { useState } from 'react';
import './Home.css';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <span>LOGO</span>
        </div>
        
        <div 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
        >
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li onClick={toggleMenu}>Home</li>
          <li onClick={toggleMenu}>About</li>
          <li onClick={toggleMenu}>Services</li>
          <li onClick={toggleMenu}>Portfolio</li>
          <li onClick={toggleMenu}>Contact</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Our Website</h1>
        <p>Discover amazing experiences with our services</p>
        <button className="cta-button">Get Started</button>
      </section>

      {/* Content Section */}
      {/* <section className="content-section">
        <div className="content-card">
          <h2>Feature One</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="content-card">
          <h2>Feature Two</h2>
          <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div className="content-card">
          <h2>Feature Three</h2>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
        </div>
      </section> */}
    </div>
  );
};

export default Home;