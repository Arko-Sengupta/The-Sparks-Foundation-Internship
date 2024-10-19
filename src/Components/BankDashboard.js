import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser, faHistory, faMoneyBillWave, faSignOutAlt,
    faEnvelope, faPhone, faIdCard, faLock, faPencilAlt, faSave, faEye, faEyeSlash,
    faUniversity, faCashRegister, faIndianRupee, faBank
} from '@fortawesome/free-solid-svg-icons';

import logo from "../Utils/TSF Logo.png";
import navLogo from "../Utils/Nav-Logo.png";
import "../Stylesheets/BankDashboard.css";


/**
 * Navbar Component - Displays the Navigation Menu with Options for Account Info, Transaction History, and Initiate Transactions.
 */
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleNavbar = () => setIsOpen(prev => !prev);

    const handleLogout = () => {
        navigate('/login');
    };

    const renderNavItems = () => (
        <ul className="navbar-items">
            <li className="navbar-item">
                <Link to="account">
                    <FontAwesomeIcon icon={faUser} className="navbar-icon" /> Account Info
                </Link>
            </li>
            <li className="navbar-item">
                <Link to="history">
                    <FontAwesomeIcon icon={faHistory} className="navbar-icon" /> Transaction History
                </Link>
            </li>
            <li className="navbar-item">
                <Link to="transaction">
                    <FontAwesomeIcon icon={faMoneyBillWave} className="navbar-icon" /> Initiate Transaction
                </Link>
            </li>
        </ul>
    );

    return (
        <nav className="navbar" style={{ position: "fixed" }}>
            <div className="navbar-logo">
                <img src={navLogo} alt="Logo" className="navbar-logo-image" />
            </div>
            <div className={`navbar-menu ${isOpen ? 'hidden' : ''}`}>
                {renderNavItems()}
                <button className="navbar-logout-btn-web" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </button>
            </div>
            <button className={`navbar-toggler ${isOpen ? 'active' : ''}`} onClick={toggleNavbar} style={{ color: '#ffffff' }}>
                <div className="navbar-sidebar-hamburger-line"></div>
                <div className="navbar-sidebar-hamburger-line"></div>
                <div className="navbar-sidebar-hamburger-line"></div>
            </button>
            <div className={`navbar-sidebar ${isOpen ? 'active' : ''}`}>
                <button className="navbar-sidebar-close-btn" onClick={toggleNavbar}>
                    ×
                </button>
                {renderNavItems()}
                <button className="navbar-logout-btn-mobile" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </button>
            </div>
        </nav>
    );
};

/**
 * AccountInfo Component - Manages User Account Information with Editable Fields and Validation.
 */
const AccountInfo = () => {
    const [formData, setFormData] = useState({
        "Full Name": '',
        "Email": '',
        "Phone": '',
        "Address": '',
        "Account Number": '',
        "Password": ''
    });
    const [editableField, setEditableField] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const fetchData = () => ({
            "Full Name": "Arko Sengupta",
            "Email": "arkosengupta9@gmail.com",
            "Phone": "7488422648",
            "Account Number": "123456789012",
            "Password": "Arko@1234"
        });

        setFormData(fetchData());
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEdit = (field) => setEditableField(field);

    const handleSave = () => {
        const validations = {
            "Full Name": /^[a-zA-Z\s]{4,}$/,
            "Email": /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Phone": /^\d{10}$/,
            "Account Number": /^\d{11,17}$/,
            "Password": /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        };

        for (let key in formData) {
            if (!validations[key].test(formData[key])) {
                alert(`Please Enter a Valid ${key}`);
                setFormData(prev => ({ ...prev, [key]: '' }));
                return;
            }
        }

        alert('Saved Successfully!');
        setEditableField(null);
    };

    const toggleShowPassword = () => setShowPassword(prev => !prev);

    const getIconForField = (fieldName) => {
        const icons = {
            "Full Name": faUser,
            "Email": faEnvelope,
            "Phone": faPhone,
            "Account Number": faIdCard,
            "Password": faLock
        };
        return icons[fieldName] || null;
    };

    const handleKeyPress = (e) => {
        const { name, value } = e.target;
        const key = e.key;

        if (name === 'Full Name' && !/^[a-zA-Z\s]$/.test(key)) {
            e.preventDefault();
        } else if (name === 'Phone' && (!/^\d$/.test(key) || value.length >= 10)) {
            e.preventDefault();
        } else if (name === 'Account Number' && (!/^\d$/.test(key) || value.length >= 17)) {
            e.preventDefault();
        }
    };

    return (
        <div className="account-form-container">
            <div className="logo-img-container">
                <img alt="logo" src={logo} />
            </div>
            <h2>Account Information</h2>
            {Object.keys(formData).map((field, index) => (
                <div key={index} className="account-input-group">
                    <FontAwesomeIcon icon={getIconForField(field)} className="account-field-icon" />
                    <input
                        type={field === 'Password' && !showPassword ? 'password' : 'text'}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        disabled={editableField !== field}
                        className="account-input-field"
                    />
                    {field === 'Password' && (
                        <FontAwesomeIcon
                            icon={!showPassword ? faEyeSlash : faEye}
                            className="account-toggle-password-icon"
                            onClick={toggleShowPassword}
                        />
                    )}
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





const TransactionHistory = ({ data }) => {
    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    // State for filters
    const [filters, setFilters] = useState({
        fromDate: '',
        toDate: '',
        transactionType: '',
        transactionCategory: '',
        minAmount: '',
        maxAmount: ''
    });

    // Function to apply filters
    const applyFilters = (transactions) => {
        return transactions.filter((transaction) => {
            const transactionDate = new Date(transaction.date);

            // Check Date Filter
            const fromDateValid = filters.fromDate ? new Date(filters.fromDate) <= transactionDate : true;
            const toDateValid = filters.toDate ? new Date(filters.toDate) >= transactionDate : true;

            // Check Transaction Type, Category, and Amount Filters
            const typeValid = filters.transactionType ? transaction.type === filters.transactionType : true;
            const categoryValid = filters.transactionCategory ? transaction.category === filters.transactionCategory : true;
            const minAmountValid = filters.minAmount ? transaction.amount >= parseFloat(filters.minAmount) : true;
            const maxAmountValid = filters.maxAmount ? transaction.amount <= parseFloat(filters.maxAmount) : true;

            return fromDateValid && toDateValid && typeValid && categoryValid && minAmountValid && maxAmountValid;
        });
    };

    // Get filtered data
    const filteredData = applyFilters(data);

    // Pagination logic
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

    // Navigate to next/previous page
    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredData.length / recordsPerPage)));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    return (
        <div className="transaction-table-container">
            <div className="logo-img-container">
                <img alt="logo" src={logo} />
            </div>
            <h2>Transaction History</h2>
            {/* Filter Section */}
            <div className="transaction-filters">
                <div>
                    <label>From Date </label>
                    <input
                        type="date"
                        value={filters.fromDate}
                        onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
                    />
                </div>
                <div>
                    <label>To Date </label>
                    <input
                        type="date"
                        value={filters.toDate}
                        onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
                    />
                </div>
                <div>
                    <label>Transaction Type </label>
                    <select
                        value={filters.transactionType}
                        onChange={(e) => setFilters({ ...filters, transactionType: e.target.value })}
                    >
                        <option value="">All</option>
                        <option value="Credit">Credit</option>
                        <option value="Debit">Debit</option>
                    </select>
                </div>
                <div>
                    <label>Transaction Category </label>
                    <select
                        value={filters.transactionCategory}
                        onChange={(e) => setFilters({ ...filters, transactionCategory: e.target.value })}
                    >
                        <option value="">All</option>
                        <option value="IMPS">IMPS</option>
                        <option value="RTGS">RTGS</option>
                        <option value="NEFT">NEFT</option>
                    </select>
                </div>
                <div>
                    <label>Min Amount </label>
                    <input
                        type="number"
                        value={filters.minAmount}
                        onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
                    />
                </div>
                <div>
                    <label>Max Amount </label>
                    <input
                        type="number"
                        value={filters.maxAmount}
                        onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
                    />
                </div>
            </div>

            {/* Table Section */}
            <table className="transaction-table">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Beneficiary Name</th>
                        <th>Beneficiary Bank Name</th>
                        <th>Transaction Date</th>
                        <th>Transaction Type</th>
                        <th>Transaction Category</th>
                        <th>Transaction Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map((transaction, index) => (
                        <tr key={index}>
                            <td>{indexOfFirstRecord + index + 1 + "."}</td>
                            <td>{transaction.beneficiaryName}</td>
                            <td>{transaction.bankName}</td>
                            <td>{new Date(transaction.date).toLocaleDateString()}</td>
                            <td>{transaction.type}</td>
                            <td>{transaction.category}</td>
                            <td>${transaction.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Section */}
            <div className="transaction-pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>
                    Page {currentPage} of {Math.ceil(filteredData.length / recordsPerPage)}
                </span>
                <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredData.length / recordsPerPage)}>
                    Next
                </button>
            </div>
        </div>
    );
};

const InitiateTransaction = () => {
    const [formData, setFormData] = useState({
        "BeneficiaryName": '',
        "BankName": '',
        "AccountNumber": '',
        "TransactionCategory": '',
        "TransactionAmount": '',
    });

    const banks = ['TSF', 'HDFC', 'Bank of India', 'SBI', 'Punjab National Bank', 'Axis Bank', 'Kotak Mahindra', 'Bank of Baroda'];
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
            label: 'Account Number',
            name: 'AccountNumber',
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
        console.log('Form Data Submitted:', formData);
    };

    return (
        <form onSubmit={handleSubmit} className="initiate-transaction-form">
            <div className="logo-img-container">
                <img alt="logo" src={logo} />
            </div>
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

const sampleData = [
    {
        beneficiaryName: 'John Doe',
        bankName: 'Bank of America',
        date: '2024-09-01',
        type: 'Credit',
        category: 'IMPS',
        amount: 500
    },
    {
        beneficiaryName: 'Jane Smith',
        bankName: 'Chase Bank',
        date: '2024-09-02',
        type: 'Debit',
        category: 'NEFT',
        amount: 1200
    },
    {
        beneficiaryName: 'Alice Johnson',
        bankName: 'Wells Fargo',
        date: '2024-09-03',
        type: 'Credit',
        category: 'RTGS',
        amount: 750
    },
    {
        beneficiaryName: 'Bob Williams',
        bankName: 'Citibank',
        date: '2024-09-04',
        type: 'Debit',
        category: 'IMPS',
        amount: 2000
    },
    {
        beneficiaryName: 'Charlie Brown',
        bankName: 'HSBC',
        date: '2024-09-05',
        type: 'Credit',
        category: 'UPI',
        amount: 300
    },
    {
        beneficiaryName: 'Daisy Ridley',
        bankName: 'PNC Bank',
        date: '2024-09-06',
        type: 'Debit',
        category: 'NEFT',
        amount: 1800
    },
    {
        beneficiaryName: 'Evan Taylor',
        bankName: 'TD Bank',
        date: '2024-09-07',
        type: 'Credit',
        category: 'RTGS',
        amount: 1400
    },
    {
        beneficiaryName: 'Fiona Green',
        bankName: 'Standard Chartered',
        date: '2024-09-08',
        type: 'Debit',
        category: 'IMPS',
        amount: 2500
    },
    {
        beneficiaryName: 'George Clark',
        bankName: 'US Bank',
        date: '2024-09-09',
        type: 'Credit',
        category: 'UPI',
        amount: 900
    },
    {
        beneficiaryName: 'Helen Carter',
        bankName: 'Santander',
        date: '2024-09-10',
        type: 'Debit',
        category: 'NEFT',
        amount: 1100
    },
    {
        beneficiaryName: 'Ian Thomas',
        bankName: 'Axis Bank',
        date: '2024-09-11',
        type: 'Credit',
        category: 'RTGS',
        amount: 1600
    },
    {
        beneficiaryName: 'Julia Evans',
        bankName: 'HDFC Bank',
        date: '2024-09-12',
        type: 'Debit',
        category: 'IMPS',
        amount: 1900
    },
    {
        beneficiaryName: 'Kevin Scott',
        bankName: 'ICICI Bank',
        date: '2024-09-13',
        type: 'Credit',
        category: 'UPI',
        amount: 500
    },
    {
        beneficiaryName: 'Laura Parker',
        bankName: 'Kotak Mahindra Bank',
        date: '2024-09-14',
        type: 'Debit',
        category: 'NEFT',
        amount: 2300
    },
    {
        beneficiaryName: 'Mike Wilson',
        bankName: 'SBI Bank',
        date: '2024-09-15',
        type: 'Credit',
        category: 'RTGS',
        amount: 1500
    },
    {
        beneficiaryName: 'Nina Anderson',
        bankName: 'Bank of Baroda',
        date: '2024-09-16',
        type: 'Debit',
        category: 'IMPS',
        amount: 800
    },
    {
        beneficiaryName: 'Oscar Davis',
        bankName: 'Yes Bank',
        date: '2024-09-17',
        type: 'Credit',
        category: 'UPI',
        amount: 1200
    },
    {
        beneficiaryName: 'Paula Harris',
        bankName: 'Union Bank',
        date: '2024-09-18',
        type: 'Debit',
        category: 'NEFT',
        amount: 950
    },
    {
        beneficiaryName: 'Quinn Lewis',
        bankName: 'IDFC First Bank',
        date: '2024-09-19',
        type: 'Credit',
        category: 'RTGS',
        amount: 1700
    },
    {
        beneficiaryName: 'Rachel Martinez',
        bankName: 'IndusInd Bank',
        date: '2024-09-20',
        type: 'Debit',
        category: 'IMPS',
        amount: 1400
    },
    {
        beneficiaryName: 'Steve Edwards',
        bankName: 'RBL Bank',
        date: '2024-09-21',
        type: 'Credit',
        category: 'UPI',
        amount: 600
    }
];


const UserDashboard = () => {
    return (
        <>
            <Navbar />
            <div className="background-content">
                <Routes>
                    <Route exact path="/" element={<AccountInfo />} />
                    <Route exact path="account" element={<AccountInfo />} />
                    <Route exact path="history" element={<TransactionHistory data={sampleData} />} />
                    <Route exact path="transaction" element={<InitiateTransaction />} />
                </Routes>
            </div>
        </>
    );
};

export default UserDashboard;