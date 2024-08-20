import React from 'react';
import { Link } from 'react-router-dom';
import "../Stylesheets/BankHome.css";

const Home = () => (
  <div className="home-container">
    <main className="home-content">
      <h1>Welcome to The Sparks Foundation Bank</h1>
      <p>Your Gateway to Financial Innovation and Empowerment</p>
      <div className="home-buttons">
        <Link to="/login">
          <button>LOGIN</button>
        </Link>
        <Link to="/signup">
          <button>SIGNUP</button>
        </Link>
      </div>
    </main>
    <footer className="home-footer">
      <span>Copyright © 2022 | Developed by The Sparks Foundation Bank</span>
    </footer>
  </div>
);

export default Home;
