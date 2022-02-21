import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case "CREATE_CATEGORY":
      if (!_.isNull(action.payload))
        return {
          ...state,
          [action.payload.id]: action.payload,
          create_error: action.error,
        };
      else
      {
        if(!_.isNull(action.error)) return { ...state, create_error: action.error };
        else return { ...state, create_error: "no error" };
      }
    case "LIST_CATEGORY":
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case "UPDATE_CATEGORY":
      if (!_.isNull(action.payload))
        return {
          ...state,
          [action.payload.id]: action.payload,
          update_error: action.error,
        };
      else
      {
        if(!_.isNull(action.error)) return { ...state, update_error: action.error };
        else return { ...state, update_error: "no error" };
      }
    default:
      return state;
  }
};