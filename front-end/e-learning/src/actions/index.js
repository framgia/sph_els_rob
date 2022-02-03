/** @format */

import axios from "../apis/api";

export const logIn = formValues => async dispatch => {
  console.log(formValues);
  var response = null;
  try {
    response = await axios.post("/api/login", formValues);
    dispatch({
      type: "LOG_IN",
      payload: response.data,
    });
  } catch (e) {
    console.log(response)
    dispatch({
      type: "LOG_IN",
      payload: { error_message: "Unauthorized user!" },
    });
  }
};
