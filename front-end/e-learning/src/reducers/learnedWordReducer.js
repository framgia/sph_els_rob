import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case "LEARNED_WORDS":
      return { ..._.mapKeys(action.payload, "id") };
    default:
      return state;
  }
};
