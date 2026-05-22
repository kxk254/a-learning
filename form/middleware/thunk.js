export const thunk =
  ({ getState, dispatch }) =>
  (next) =>
  (action) => {
    if (typeof action === "function") {
      action(dispatch, getState);
    }
    return next(action);
  };
