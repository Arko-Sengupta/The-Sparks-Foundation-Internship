import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faArrowLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "../Stylesheets/BankLogin.css";
import logo from "../Utils/TSF Logo.png";

const useHandleSubmit = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Dummy Validation
    const dummyEmail = "arkosengupta9@gmail.com";
    const dummyPassword = "Arko@1234";

    const email = event.target.email.value;
    const password = event.target.password.value;

    if (email === dummyEmail && password === dummyPassword) {
      // Redirect to the User Dashboard
      navigate('/userdashboard');
    } else {
      // Handle Login Failure
      alert("Invalid Email or Password");
    }
  };

  return handleSubmit;
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const handleSubmit = useHandleSubmit();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-img-container">
          <img alt="logo" src={logo} />
        </div>
        <h2>USER LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="login-input-group">
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            <input type="email" name="email" placeholder="Email" required />
          </div>
          <div className="login-input-group">
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <input type={showPassword ? 'password' : 'text'} name="password" placeholder="Password" required />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="login-toggle-password-icon"
              onClick={toggleShowPassword}
            />
          </div>
          <div className="login-options">
            <label>
              <input type="checkbox" />
              Remember Me
            </label>
            <Link to="#">Forgot Password?</Link>
          </div>
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Register Here</Link>
        </p>
      </div>
      <div className="login-back-to-home login-underline-expand">
        <Link to="/">
          <FontAwesomeIcon icon={faArrowLeft} className="login-arrow-icon" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Login;