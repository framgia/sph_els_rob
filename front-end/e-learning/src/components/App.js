import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Category from "./categories/Category";
import WordChoice from "./words_choices/WordChoice";
import Create from "./words_choices/Create";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/admin-category" exact element={<Category />} />
          <Route path="/word_choices/:id" exact element={<WordChoice />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
