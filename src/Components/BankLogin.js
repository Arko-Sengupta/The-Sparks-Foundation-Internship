import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import "../Stylesheets/BankLogin.css";

const Login = () => (
  <div className="login-container">
    <div className="login-box">
      <h2>USER LOGIN</h2>
      <form>
        <div className="login-input-group">
          <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
          <input type="email" placeholder="Email" required />
        </div>
        <div className="login-input-group">
          <FontAwesomeIcon icon={faLock} className="input-icon" />
          <input type="password" placeholder="Password" required />
        </div>
        <div className="login-options">
          <label>
            <input type="checkbox" id="remember" />
            Remember Me
          </label>
          <Link to="#">Forgot Password?</Link>
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="#">Register Here</Link>
      </p>
    </div>
    <div className="login-back-to-home">
      <Link to="/">
        <FontAwesomeIcon icon={faArrowLeft} className="login-arrow-icon" />
        Back to Home
      </Link>
    </div>
  </div>
);

export default Login;