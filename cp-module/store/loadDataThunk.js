import { loadMockData } from "./index.js";

export function loadDataThunk() {
  return async (dispatch, getState) => {
    dispatch({ type: "loadStart" });
    try {
      const newPresent = await loadMockData();
      console.log("loadDataThunk success", newPresent);
      dispatch({ type: "loadSuccess", payload: newPresent });
    } catch (err) {
      console.log("loadDataThunk error", err.message);
      dispatch({ type: "loadError", payload: err.message });
    }
  };
}
