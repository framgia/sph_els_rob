import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";
import categoryReducer from "./categoryReducer";
import wordChoiceReducer from "./wordChoiceReducer";
import userReducer from "./userReducer";
import userAnswerReducer from "./userAnswerReducer";
import lessonReducer from "./lessonReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  categories: categoryReducer,
  words_choices: wordChoiceReducer,
  users: userReducer,
  answers: userAnswerReducer,
  lessons: lessonReducer,
});
