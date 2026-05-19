import { loadMockData } from "./loadMockData.js";

export function loadDataThunk() {
  return async (dispatch, getState) => {
    dispatch({ type: "loadStart" });
    try {
      console.log("load data thunk in the try");
      let payload = await loadMockData();
      console.log("load data thunk loading mock data payload :", payload);
      dispatch({ type: "loadSuccess", payload });
    } catch (err) {
      console.log("load data thunk error route");
      dispatch({ type: "loadError", payload: err.message });
    }
  };
}
