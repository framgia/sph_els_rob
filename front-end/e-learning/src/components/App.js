import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import Category from "./categories/Category";
import WordChoice from "./words_choices/WordChoice";
import User from "./User";
import Question from "./quizzes/Question";
import Result from "./quizzes/Result";
import Profile from "./profile/Profile";
import UserList from "./profile/UserList";
import UpdateProfile from "./profile/UpdateProfile";
import LearnedWord from "./profile/LearnedWord";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/admin-category" exact element={<Category />} />
          <Route path="/word_choices/:id" exact element={<WordChoice />} />
          <Route path="/category" exact element={<Category />} />
          <Route path="/admin-users" exact element={<User />} />
          <Route path="/quiz/:id" exact element={<Question />} />
          <Route path="/result/:id" exact element={<Result />} />
          <Route
            path="/profile/:id"
            exact
            element={<Profile type={"PROFILE"} />}
          />
          <Route
            path="/dashboard/:id"
            exact
            element={<Profile type={"DASHBOARD"} />}
          />
          <Route path="/users" exact element={<UserList />} />
          <Route path="/update" exact element={<UpdateProfile />} />
          <Route path="/learned-words/:id" exact element={<LearnedWord />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
