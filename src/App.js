import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import BankHome from "./Components/BankHome";
import BankLogin from "./Components/BankLogin";
import BankSignUp from "./Components/BankSignUp";
import UserDashboard from "./Components/BankDashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BankHome />} />
        <Route path="/login" element={<BankLogin />} />
        <Route path="/signup" element={<BankSignUp />} />
        <Route path="/userdashboard/*" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;