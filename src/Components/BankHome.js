import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../Stylesheets/BankHome.css";
import logo from "../Utils/TSF Logo.png";

const TypingText = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <div className="home-typing-container">
      <span>{displayedText}</span>
      {currentIndex < text.length && <span className="home-typing-dot"></span>}
    </div>
  );
};

const Home = () => {
  return (
    <div className="home-container">
      <main className="home-content">
        <div className="home-img-container">
          <img alt="logo" src={logo} />
        </div>
        <h1><TypingText text={"Welcome to The Sparks Foundation Bank"} speed={50} /></h1>
        <p><TypingText text={"Your Gateway to Financial Innovation and Empowerment"} speed={50} /></p>
        <div className="home-buttons">
          <Link to="/login">
            <button>LOGIN</button>
          </Link>
          <Link to="/signup">
            <button>SIGNUP</button>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Home;