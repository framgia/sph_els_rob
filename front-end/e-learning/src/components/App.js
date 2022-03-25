import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Category from "./categories/Category";
import WordChoice from "./words_choices/WordChoice";
import User from "./User";
import Question from "./quizzes/Question";
import Result from "./quizzes/Result";
import Home from "./dashboard/Home";
import Profile from "./Profile";
import UserList from "./UserList";

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
          <Route path="/category" exact element={<Category />} />
          <Route path="/admin-users" exact element={<User />} />
          <Route path="/quiz/:id" exact element={<Question />} />
          <Route path="/result/:id" exact element={<Result />} />
          <Route path="/home" exact element={<Home />} />
          <Route path="/profile/:id" exact element={<Profile />} />
          <Route path="/users" exact element={<UserList />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
