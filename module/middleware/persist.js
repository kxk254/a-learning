export const persist =
  ({ getState }) =>
  (next) =>
  (action) => {
    const result = next(action);
    localStorage.setItem("rows", JSON.stringify(getState()));
    return result;
  };
