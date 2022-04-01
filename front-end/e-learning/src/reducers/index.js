import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";
import wordChoiceReducer from "./wordChoiceReducer";
import userReducer from "./userReducer";
import userAnswerReducer from "./userAnswerReducer";
import lessonReducer from "./lessonReducer";
import userCategoryReducer from "./userCategoryReducer";
import resultReducer from "./resultReducer";
import profileReducer from "./profileReducer";
import followingReducer from "./followingReducer";
import followerReducer from "./followerReducer";
import activityReducer from "./activityReducer";
import learnedWordReducer from "./learnedWordReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  categories: categoryReducer,
  words_choices: wordChoiceReducer,
  users: userReducer,
  answers: userAnswerReducer,
  lessons: lessonReducer,
  user_categories: userCategoryReducer,
  results: resultReducer,
  user: profileReducer,
  followings: followingReducer,
  followers: followerReducer,
  activities: activityReducer,
  learned_words: learnedWordReducer,
});
