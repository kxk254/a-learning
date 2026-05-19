import { loadMockData } from "./loadMockData.js";

export function loadDataThunk() {
  return async (dispatch, getState) => {
    dispatch({ type: "loadStart" });
    try {
      let newPresent = await loadMockData();
      dispatch({ type: "loadSuccess", payload: newPresent });
    } catch (err) {
      dispatch({ type: "loadError", payload: err.message });
    }
  };
}
