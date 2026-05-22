import { initialState } from "./initialState.js";

export function reducer(state = initialState, action) {
  console.log("reducer state", state);
  let newPresent;
  let ap = action.payload;
  switch (action.type) {
    case "addRow":
      newPresent = {
        ...state.present,
        entities: {
          ...state.present.entities,
          rows: [...state.present.entities.rows, ap],
        },
      };
      return applyAction(state, newPresent);
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
      return state;
  }
}

function applyAction(state, newPresent) {
  return {
    past: [...state.past, state.present],
    present: newPresent,
    future: [],
  };
}
