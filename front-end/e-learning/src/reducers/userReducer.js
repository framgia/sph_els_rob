import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case "LIST_USERS":
      return { ...state, ..._.mapKeys(action.payload, "id") };
    default:
      return state;
  }
};
