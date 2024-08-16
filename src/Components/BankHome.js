import React from 'react';
import "../Stylesheets/BankHome.css";

const Home =  () => {
  return (
    <div className="home-container">
      <div className="home-main-content">
        <h1>Welcome to The Sparks Foundation Bank</h1>
        <p>
          Your Gateway to Financial Innovation and Empowerment
        </p>
        <div className="home-button-section">
          <button>LOGIN</button>
          <button>SIGNUP</button>
        </div>
      </div>
      <div className="home-footer">
        <span>Copyright © 2022 | Developed by The Sparks Foundation Bank</span>
      </div>
    </div>
  );
}

export default Home;
