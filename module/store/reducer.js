import { initialState } from "./initialState.js";

export function reducer(state = initialState, action) {
  const present = state.present;
  let ap = action.payload;
  switch (action.type) {
    case "addRow":
      console.log("add row reducer", action, "payload", ap);
      return applyAction(state, {
        ...present,
        ...present.entities,
        rows: [...present.entities.rows, ap],
      });
    case "updateRow":
      return applyAction(state, {
        ...present,
        ...present.entities,
        rows: present.entities.rows.map((row) =>
          row.id === ap.id ? { [ap.name]: ap.value } : row,
        ),
      });
    case "deleteRow":
      return applyAction(state, {
        ...present,
        ...present.entities,
        rows: present.entities.rows.filter((row) => row.id !== ap.id),
      });
    case "redo":
      return redo(state);
    case "undo":
      return undo(state);
    case "loadStart":
      return applyAction(state, {
        ...present,
        ...present.entities,
        ui: { loading: true, error: null },
      });
    case "loadSuccess":
      return applyAction(state, ap);
    case "loadFail":
      return applyAction(state, {
        ...present,
        ...present.entities,
        ui: { loading: false, error: ap },
      });
    case "resetData":
      localStorage.removeItem("rows");
      return initialState;
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

function redo(state) {
  if (state.future.length === 0) return state;
  present = state.future[0];
  return {
    past: [...state.past, state.present],
    present: present,
    future: state.future.slice(1),
  };
}

function undo(state) {
  if (state.past.length === 0) return state;
  present = state.past[state.past.length - 1];
  return {
    past: state.past.slice(0, -1),
    present: present,
    future: [state.present, ...state.future],
  };
}
