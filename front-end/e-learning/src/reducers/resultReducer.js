import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case "QUIZ_RESULT":
      return { ..._.mapKeys(action.payload, "id") };
    default:
      return state;
  }
};
