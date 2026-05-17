export const logger =
  ({ getState }) =>
  (next) =>
  (action) => {
    console.log("ACTION", action);
    const result = next(action);
    console.log("LOGGER STATE", getState());
    return result;
  };
