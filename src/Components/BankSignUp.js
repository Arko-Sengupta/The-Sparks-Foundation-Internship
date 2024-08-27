import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faPhone, faIdCard, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import "../Stylesheets/BankSignUp.css";

const SignUp = () => (
    <div className="signup-container">
        <div className="signup-box">
            <h2>USER SIGNUP</h2>
            <form>
                <div className="signup-input-group">
                    <FontAwesomeIcon icon={faUser} className="input-icon" />
                    <input type="text" placeholder="Full Name" required />
                </div>
                <div className="signup-input-group">
                    <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                    <input type="email" placeholder="Email" required />
                </div>
                <div className="signup-input-group">
                    <FontAwesomeIcon icon={faPhone} className="input-icon" />
                    <input type="text" placeholder="Phone" required />
                </div>
                <div className="signup-input-group">
                    <FontAwesomeIcon icon={faIdCard} className="input-icon" />
                    <input type="text" placeholder="PAN Number" required />
                </div>
                <div className="signup-input-group">
                    <FontAwesomeIcon icon={faLock} className="input-icon" />
                    <input type="password" placeholder="Password" required />
                </div>
                <button type="submit">Register</button>
            </form>
            <p>
                Already have an Account? <Link to="/login">Login Here</Link>
            </p>
        </div>
        <div className="signup-back-to-home signup-underline-expand">
            <Link to="/">
                <FontAwesomeIcon icon={faArrowLeft} className="signup-arrow-icon" />
                Back to Home
            </Link>
        </div>
    </div>
);

export default SignUp;