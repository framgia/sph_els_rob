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
      type: "LIST_WORD",
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
    console.log(response);
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

export const errorReset = (type) => (dispatch) => {
  dispatch({
    type: type,
    payload: null,
    error: null,
  });
};
