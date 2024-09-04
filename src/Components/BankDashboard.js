import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHistory, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import {
    faEnvelope, faPhone, faIdCard, faLock, faPencilAlt, faSave, faEye, faEyeSlash,
    faUniversity, faCashRegister, faIndianRupee, faBank
} from '@fortawesome/free-solid-svg-icons';
import "../Stylesheets/BankDashboard.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar" style={{ position: "fixed" }}>
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
    const [formData, setFormData] = useState({
        "Full Name": '',
        "Email": '',
        "Phone": '',
        "Address": '',
    });

    const [editableField, setEditableField] = useState(null);
    const [showPassword, setShowPassword] = useState(true);

    useEffect(() => {
        const fetchData = () => {
            return {
                "Full Name": "John Doe",
                "Email": "john.doe@example.com",
                "Phone": "1234567890",
                "PAN Number": "ABCDE1234F",
                "Password": "John@1234"
            };
        };

        const initialData = fetchData();
        setFormData(initialData);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEdit = (field) => {
        setEditableField(field);
    };

    const handleSave = () => {
        console.log('Data saved:', formData);
        setEditableField(null);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const getIconForField = (fieldName) => {
        switch (fieldName) {
            case 'Full Name': return faUser;
            case 'Email': return faEnvelope;
            case 'Phone': return faPhone;
            case 'PAN Number': return faIdCard;
            case 'Password': return faLock;
            default: return null;
        }
    };

    return (
        <div className="account-form-container">
            <h2>Account Information</h2>
            {Object.keys(formData).map((field, index) => (
                <div key={index} className="account-input-group">
                    <FontAwesomeIcon icon={getIconForField(field)} className="account-field-icon" />
                    <input
                        type={field === 'Password' && showPassword ? 'password' : 'text'}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        disabled={editableField !== field}
                        className="account-input-field"
                    />
                    {field === 'Password' ? (
                        <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            className="account-toggle-password-icon"
                            onClick={toggleShowPassword}
                        />
                    ) : (null)}
                    <FontAwesomeIcon
                        icon={faPencilAlt}
                        className="account-edit-icon"
                        onClick={() => handleEdit(field)}
                    />
                </div>
            ))}
            <button className="account-save-button" onClick={handleSave}>
                <FontAwesomeIcon icon={faSave} /> Save
            </button>
        </div>
    );
};

const TransactionHistory = () => <div>Transaction History</div>;

const InitiateTransaction = () => {
    const [formData, setFormData] = useState({
        "BeneficiaryName": '',
        "BankName": '',
        "PANNumber": '',
        "TransactionCategory": '',
        "TransactionAmount": '',
    });

    const banks = ['Bank A', 'Bank B', 'Bank C'];
    const transactionCategories = ['IMPS', 'RTGS', 'NEFT'];

    const formFields = [
        {
            label: 'Beneficiary Name',
            name: 'BeneficiaryName',
            type: 'text',
            icon: faUser
        },
        {
            label: 'Bank Name',
            name: 'BankName',
            type: 'select',
            options: banks,
            icon: faUniversity
        },
        {
            label: 'PAN Number',
            name: 'PANNumber',
            type: 'text',
            icon: faIdCard
        },
        {
            label: 'Transaction Category',
            name: 'TransactionCategory',
            type: 'select',
            options: transactionCategories,
            icon: faCashRegister
        },
        {
            label: 'Transaction Amount',
            name: 'TransactionAmount',
            type: 'number',
            min: 1,
            icon: faIndianRupee
        },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'TransactionAmount' && value && (!/^\d+$/.test(value) || value <= 0)) {
            return;
        }
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
    };

    return (
        <form onSubmit={handleSubmit} className="initiate-transaction-form">
            <h2>Initiate Transaction</h2>
            {formFields.map((field, index) => (
                <div key={index} className="initiate-transaction-form-group">
                    <label>{field.label}</label>
                    <div className='initiate-transaction-input-with-icon'>
                        <FontAwesomeIcon icon={field.icon} className="initiate-transaction-input-icon" />
                        {field.type === 'select' ? (
                            <select
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select {field.label}</option>
                                {field.options.map((option, idx) => (
                                    <option key={idx} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type={field.type}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                min={field.min}
                                required
                            />
                        )}
                    </div>
                </div>
            ))}

            <button type="submit" className="initiate-transaction-submit-button">
                <FontAwesomeIcon icon={faBank} className="button-icon" />Initiate Transaction
            </button>
        </form>
    );
};

const UserDashboard = () => {
    return (
        <>
            <Navbar />
            <div className="content">
                <Routes>
                    <Route exact path="/" element={<AccountInfo />} />
                    <Route exact path="account" element={<AccountInfo />} />
                    <Route exact path="history" element={<TransactionHistory />} />
                    <Route exact path="transaction" element={<InitiateTransaction />} />
                </Routes>
            </div>
        </>
    );
};

export default UserDashboard;