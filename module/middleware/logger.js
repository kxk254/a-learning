export const logger =
  ({ getState }) =>
  (next) =>
  (action) => {
    console.log("ACTION", action, next);
    const result = next(action);
    console.log("NEW STATE", getState());
    return result;
  };
