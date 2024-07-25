import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import BankHome from "./Components/BankHome";
import BankLogin from "./Components/BankLogin";
import BankSignUp from "./Components/BankSignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<BankHome />} />
        <Route exact path="/login" element={<BankLogin />} />
        <Route exact path="/signup" element={<BankSignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
