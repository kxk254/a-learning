import { initialState } from "./initialState.js";

export function reducer(state = initialState, action) {
  switch (action.type) {
    case "addRow":
      return;
    case "updateRow":
      return;
    case "deleteRow":
      return;
    case "reset":
      return;
    case "undo":
      return;
    case "redo":
      return;
    case "loadStart":
      return;
    case "loadSuccess":
      return;
    case "loadError":
      return;
    default:
      return;
  }
}
