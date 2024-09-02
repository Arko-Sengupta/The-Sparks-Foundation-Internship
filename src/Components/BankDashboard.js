import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHistory, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope, faPhone, faIdCard, faLock, faPen, faSave } from '@fortawesome/free-solid-svg-icons';
import "../Stylesheets/BankDashboard.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className={`navbar-menu ${isOpen ? 'hidden' : ''}`}>
                <ul className="navbar-items">
                    <li className="navbar-item"><Link to="account"><FontAwesomeIcon icon={faUser} className="navbar-icon" /> Account Info</Link></li>
                    <li className="navbar-item"><Link to="history"><FontAwesomeIcon icon={faHistory} className="navbar-icon" /> Transaction History</Link></li>
                    <li className="navbar-item"><Link to="transaction"><FontAwesomeIcon icon={faMoneyBillWave} className="navbar-icon" /> Initiate Transaction</Link></li>
                </ul>
            </div>
            <button className={`navbar-toggler ${isOpen ? 'active' : ''}`} onClick={toggleNavbar} style={{ color: '#ffffff' }}>
                <div className="sidebar-hamburger-line"></div>
                <div className="sidebar-hamburger-line"></div>
                <div className="sidebar-hamburger-line"></div>
            </button>
            <div className={`sidebar ${isOpen ? 'active' : ''}`}>
                <button className="sidebar-close-btn" onClick={toggleNavbar}>
                    ×
                </button>
                <ul className="sidebar-menu">
                    <li className="sidebar-item"><Link to="account"><FontAwesomeIcon icon={faUser} className="navbar-icon" /> Account Info</Link></li>
                    <li className="sidebar-item"><Link to="history"><FontAwesomeIcon icon={faHistory} className="navbar-icon" /> Transaction History</Link></li>
                    <li className="sidebar-item"><Link to="transaction"><FontAwesomeIcon icon={faMoneyBillWave} className="navbar-icon" /> Initiate Transaction</Link></li>
                </ul>
            </div>
        </nav>
    );
};


const AccountInfo = () => {
    const [isEditing, setIsEditing] = useState(null);
    const [accountData, setAccountData] = useState({
        "Full Name": "John Doe",
        "Email": "john.doe@example.com",
        "Phone": "+1234567890",
        "PAN Number": "ABCDE1234F",
        "Password": "John@1234"
    });
    const [editedData, setEditedData] = useState({});

    const handleEditClick = (field) => {
        setIsEditing(field);
        setEditedData({ [field]: '' });
    };

    const handleSaveClick = () => {
        setAccountData({
            ...accountData,
            ...editedData
        });
        setIsEditing(null);
        setEditedData({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData({
            ...editedData,
            [name]: value
        });
    };

    return (
        <div className="account-info">
            <h2>Account Information</h2>
            <div className="account-info-container">
                {Object.keys(accountData).map((field, index) => (
                    <div className="account-info-item" key={index}>
                        {isEditing === field ? (
                            <>
                                <input
                                    type={field === 'Password' ? 'password' : 'text'}
                                    id={field}
                                    name={field}
                                    value={editedData[field] || ''}
                                    onChange={handleChange}
                                />
                            </>
                        ) : (
                            <div className="account-info-display">
                                <p>
                                    <FontAwesomeIcon icon={
                                        field === 'Full Name' ? faUser :
                                            field === 'Email' ? faEnvelope :
                                                field === 'Phone' ? faPhone :
                                                    field === 'PAN Number' ? faIdCard :
                                                        faLock
                                    } className="account-icon" />
                                    {accountData[field]}
                                </p>
                                <FontAwesomeIcon
                                    icon={faPen}
                                    className="account-edit-icon"
                                    onClick={() => handleEditClick(field)}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {isEditing && (
                <button className="account-save-button" onClick={handleSaveClick}>
                    <FontAwesomeIcon icon={faSave} /> Save
                </button>
            )}
        </div>
    );
};

const TransactionHistory = () => <div>Transaction History Content</div>;
const InitiateTransaction = () => <div>Initiate Transaction Content</div>;

const UserDashboard = () => {
    return (
        <>
            <Navbar />
            <div className="content">
                <Routes>
                    <Route path="/" element={<AccountInfo />} />
                    <Route path="account" element={<AccountInfo />} />
                    <Route path="history" element={<TransactionHistory />} />
                    <Route path="transaction" element={<InitiateTransaction />} />
                </Routes>
            </div>
        </>
    );
};

export default UserDashboard;