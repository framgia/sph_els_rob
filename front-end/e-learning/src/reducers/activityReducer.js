import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case "SUBMIT_LESSON":
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case "ACTIVITIES":
      return { ..._.mapKeys(action.payload, "id") };
    default:
      return state;
  }
};
