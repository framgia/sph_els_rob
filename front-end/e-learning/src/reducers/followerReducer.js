import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case "FOLLOW":
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case "FOLLOWERS":
      return { ..._.mapKeys(action.payload, "id") };
    case "UNFOLLOW":
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
