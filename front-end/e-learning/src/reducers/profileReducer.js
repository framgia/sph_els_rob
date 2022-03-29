export default (state = null, action) => {
  switch (action.type) {
    case "PROFILE":
      return action.payload;
    default:
      return state;
  }
};
