import { loadMockData } from "./index.js";
export function loadDataThunk() {
  return async (dispatch, getState) => {
    dispatch({ type: "loadStart" });

    try {
      const newPresent = await loadMockData();
      console.log("loadDataThunk", newPresent);
      dispatch({ type: "loadSuccess", payload: newPresent });
    } catch (err) {
      dispatch({ type: "loadError", payload: err.message });
    }
  };
}
