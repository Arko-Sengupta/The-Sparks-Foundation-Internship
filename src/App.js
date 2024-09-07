import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import BankHome from "./Components/BankHome";
import BankLogin from "./Components/BankLogin";
import BankSignUp from "./Components/BankSignUp";
import BankDashboard from "./Components/BankDashboard";
import BankFooter from "./Components/BankFooter";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<BankHome />} />
        <Route exact path="/login" element={<BankLogin />} />
        <Route exact path="/signup" element={<BankSignUp />} />
        <Route exact path="/userdashboard/*" element={<BankDashboard />} />
      </Routes>
      <BankFooter />
    </Router>
  );
}

export default App;