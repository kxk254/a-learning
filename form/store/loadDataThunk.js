export function loadDataThunk() {
  return async (dispatch, getState) => {
    dispatch({ type: "loadStart" });
    try {
      const payload = await loadMockData();
      dispatch({ type: "loadSuccess", payload });
    } catch (err) {
      dispatch({ type: "loadError", payload: err });
    }
  };
}
