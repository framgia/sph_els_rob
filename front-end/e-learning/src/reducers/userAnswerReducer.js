import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case "SAVE_WORD":
      if (!_.isNull(action.payload))
        return {
          ...state,
          [action.payload.id]: action.payload,
          create_word_error: action.error,
        };
      else {
        if (!_.isNull(action.error))
          return { ...state, save_error: action.error };
        else return { ...state, save_error: "no error" };
      }
    default:
      return state;
  }
};
