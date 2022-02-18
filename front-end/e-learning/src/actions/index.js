import axios from "../apis/api";

export const logIn = formValues => async dispatch => {
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

export const signUp = formValues => async dispatch =>{
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

export const createCategory = (formValues, token) => async dispatch =>{
  try {
    const response = await axios.post("/api/create-category", formValues, {
      headers: {
        "Authorization": `Bearer ${token}` 
      }
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
      error: e.message
    });
  }
}