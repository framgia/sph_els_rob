import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case "CREATE_WORD":
      if (!_.isNull(action.payload))
        return {
          ...state,
          [action.payload.word.id]: action.payload,
          create_word_error: action.error,
        };
      else {
        if (!_.isNull(action.error))
          return { ...state, create_word_error: action.error };
        else return { ...state, create_word_error: "no error" };
      }
    case "LIST_WORD":
      return { ..._.mapKeys(action.payload, "word.id") };
    case "UPDATE_WORD":
      if (!_.isNull(action.payload))
        return {
          ...state,
          [action.payload.word.id]: action.payload,
          update_word_error: action.error,
        };
      else {
        if (!_.isNull(action.error))
          return { ...state, update_word_error: action.error };
        else return { ...state, update_word_error: "no error" };
      }
    default:
      return state;
  }
};
