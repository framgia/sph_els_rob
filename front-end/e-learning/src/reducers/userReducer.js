import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case "LIST_USERS":
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case "CHANGE_ROLE":
      if (!_.isNull(action.payload))
        return {
          ...state,
          [action.payload.id]: action.payload,
          change_role_error: action.error,
        };
      else {
        if (!_.isNull(action.error))
          return { ...state, change_role_error: action.error };
        else return { ...state, change_role_error: "no error" };
      }
    default:
      return state;
  }
};
