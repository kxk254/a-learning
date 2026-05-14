export const persist =
  ({ getState }) =>
  (next) =>
  (action) => {
    console.log("action persist", action);
    const result = next(action);
    localStorage.setItem("rows", JSON.stringify(getState()));
    return result;
  };
