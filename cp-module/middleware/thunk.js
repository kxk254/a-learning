export const thunk =
  ({ getState, dispatch }) =>
  (next) =>
  (action) => {
    if (typeof action === "function") {
      console.log("thunk middleware dispatch", dispatch);
      return action(dispatch, getState);
    }
    return next(action);
  };
