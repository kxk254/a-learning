export const thunk =
  ({ getState, dispatch }) =>
  (next) =>
  (action) => {
    if (typeof action === "function") {
      console.log("thunk ", action);
      return action(dispatch, getState);
    }
    console.log("not passing the thunk");
    return next(action);
  };
