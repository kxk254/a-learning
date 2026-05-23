export const reset =
  ({ getState }) =>
  (next) =>
  (action) => {
    const result = next(action);
    console.log("inside reset, action ==>", action.type);
    if (action.type === "reset") {
      console.log("now inside reset middleware to delete local storage");
      localStorage.removeItem("rows");
    }
    return result;
  };
