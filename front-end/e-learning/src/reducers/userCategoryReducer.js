import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case "USER_CATEGORY":
      return { ...state, ..._.mapKeys(action.payload, "id") };
    default:
      return state;
  }
};
