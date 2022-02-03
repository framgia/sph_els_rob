/** @format */

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Login";
import Dashboard from "./Dashboard";

const App = () => {
  // const [token, setToken] = useState('')
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' exact element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
