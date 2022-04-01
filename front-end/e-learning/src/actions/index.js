import axios from "../apis/api";

export const logIn = (formValues) => async (dispatch) => {
  try {
    const response = await axios.post("/api/login", formValues);
    dispatch({
      type: "LOG_IN",
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: "LOG_IN",
      payload: { error_message: e.message },
    });
  }
};

export const signUp = (formValues) => async (dispatch) => {
  try {
    const response = await axios.post("/api/signup", formValues);
    dispatch({
      type: "SIGN_UP",
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: "SIGN_UP",
      payload: { error_message: e.message },
    });
  }
};

export const createCategory = (formValues, token) => async (dispatch) => {
  try {
    const response = await axios.post("/api/create-category", formValues, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "CREATE_CATEGORY",
      payload: response.data,
      error: null,
    });
  } catch (e) {
    dispatch({
      type: "CREATE_CATEGORY",
      payload: null,
      error: e.message,
    });
  }
};

export const listCategory = (token) => async (dispatch) => {
  try {
    const response = await axios.get("/api/list-category", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "LIST_CATEGORY",
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: "LIST_CATEGORY",
      payload: { error_message: e.message },
    });
  }
};

export const updateCategory = (id, formValues, token) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/update-category/${id}`, formValues, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "UPDATE_CATEGORY",
      payload: response.data,
      error: null,
    });
  } catch (e) {
    dispatch({
      type: "UPDATE_CATEGORY",
      payload: null,
      error: e.message,
    });
  }
};

export const deleteCategory = (id, token) => async (dispatch) => {
  try {
    await axios.delete(`/api/remove-category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "DELETE_CATEGORY",
      payload: id,
      error: null,
    });
  } catch (e) {
    dispatch({
      type: "DELETE_CATEGORY",
      payload: null,
      error: e.message,
    });
  }
};

export const createWord = (formValues, token, id) => async (dispatch) => {
  try {
    const response = await axios.post(`/api/create-word/${id}`, formValues, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "CREATE_WORD",
      payload: response.data,
      error: null,
    });
  } catch (e) {
    dispatch({
      type: "CREATE_WORD",
      payload: null,
      error: e.message,
    });
  }
};

export const listWord = (token, id) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/list-word/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "LIST_WORD",
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: "LIST_WORD",
    });
  }
};

export const updateWord = (id, formValues, token) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/update-word/${id}`, formValues, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "UPDATE_WORD",
      payload: response.data,
      error: null,
    });
  } catch (e) {
    dispatch({
      type: "UPDATE_WORD",
      payload: null,
      error: e.message,
    });
  }
};

export const deleteWord = (id, token) => async (dispatch) => {
  try {
    await axios.delete(`/api/remove-word/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "DELETE_WORD",
      payload: id,
      error: null,
    });
  } catch (e) {
    dispatch({
      type: "DELETE_WORD",
      payload: null,
      error: e.message,
    });
  }
};

export const listUser = (token) => async (dispatch) => {
  try {
    const response = await axios.get("/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "LIST_USERS",
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: "LIST_USERS",
      payload: { error_message: e.message },
    });
  }
};

export const changeRole = (id, token) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/change-role/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "CHANGE_ROLE",
      payload: response.data,
      error: null,
    });
  } catch (e) {
    dispatch({
      type: "CHANGE_ROLE",
      payload: null,
      error: e.message,
    });
  }
};

export const saveAnswer =
  (category_id, word_id, choice_id, token) => async (dispatch) => {
    try {
      const response = await axios.post(
        `/api/save-answer/${category_id}/${word_id}/${choice_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: "SAVE_ANSWER",
        payload: response.data,
        error: null,
      });
    } catch (e) {
      dispatch({
        type: "SAVE_ANSWER",
        payload: null,
        error: e.message,
      });
    }
  };

export const addQuiz = (id, token) => async (dispatch) => {
  try {
    const response = await axios.post(`/api/add-quiz/${id}`);
    dispatch({
      type: "ADD_QUIZ",
      payload: response.data,
      error: null,
    });
  } catch (e) {
    dispatch({
      type: "ADD_QUIZ",
      payload: null,
      error: e.message,
    });
  }
};

export const userCategory = (token) => async (dispatch) => {
  try {
    const response = await axios.get("/api/user-category", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "USER_CATEGORY",
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: "USER_CATEGORY",
      payload: { error_message: e.message },
    });
  }
};

export const logOut = (token) => async (dispatch) => {
  try {
    const response = await axios.post("/api/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "LOG_OUT",
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: "LOG_OUT",
      payload: { error_message: e.message },
    });
  }
};

export const result = (id, token) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/result/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "QUIZ_RESULT",
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: "QUIZ_RESULT",
      payload: { error_message: e.message },
    });
  }
};

export const profile = (id, token) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/profile/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "PROFILE",
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: "PROFILE",
      payload: { error_message: e.message },
    });
  }
};

export const errorReset = (type) => (dispatch) => {
  dispatch({
    type: type,
    payload: null,
    error: null,
  });
};

export const follow = (id, token) => async (dispatch) => {
  try {
    const response = await axios.post(`/api/follow/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "FOLLOW",
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: "FOLLOW",
      payload: null,
    });
  }
};

export const unfollow = (id, token) => async (dispatch) => {
  try {
    const response = await axios.post(`/api/unfollow/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "UNFOLLOW",
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: "UNFOLLOW",
      payload: null,
    });
  }
};

export const followerList = (id, token) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/followers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "FOLLOWERS",
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: "FOLLOWERS",
      payload: null,
    });
  }
};

export const followingList = (id, token) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/followings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "FOLLOWINGS",
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: "FOLLOWINGS",
      payload: null,
    });
  }
};

export const updateProf = (formValues, token) => async (dispatch) => {
  try {
    const response = await axios.post("/api/update-profile", formValues, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: "UPDATE_PROFILE",
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: "UPDATE_PROFILE",
      payload: { error_message: e.message },
    });
  }
};

export const submitLesson = (id, token) => async (dispatch) => {
  try {
    const response = await axios.post(`/api/submit-lesson/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: "SUBMIT_LESSON",
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: "SUBMIT_LESSON",
      payload: { error_message: e.message },
    });
  }
};

export const activityList = (id, token) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/activities/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "ACTIVITIES",
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: "ACTIVITIES",
      payload: null,
    });
  }
};

export const allActivityList = (token) => async (dispatch) => {
  try {
    const response = await axios.get("/api/activities", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "ACTIVITIES",
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: "ACTIVITIES",
      payload: null,
    });
  }
};

export const learnedWord = (id, token) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/learned-words/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: "LEARNED_WORDS",
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: "LEARNED_WORDS",
      payload: { error_message: e.message },
    });
  }
};
