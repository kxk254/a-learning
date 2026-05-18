import { initialState } from "./initialState.js";

export function reducer(state = initialState, action) {
  let ap = action.payload;
  let newPresent;
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
      newPresent = {
        ...state.present,
        entities: {
          ...state.present.entities,
          rows: state.present.entities.rows.map((row) =>
            row.id === ap.id ? { ...row, [ap.name]: ap.value } : row,
          ),
        },
      };
      return applyAction(state, newPresent);
    case "deleteRow":
      newPresent = {
        ...state.present,
        entities: {
          ...state.present.entities,
          rows: state.present.entities.rows.filter((row) => row.id !== ap.id),
        },
      };
      return applyAction(state, newPresent);
    case "reset":
      return resetData();
    case "undo":
      return undo(state);
    case "redo":
      return redo(state);
    case "loadStart":
      newPresent = {
        ...state.present,
        ui: { loading: true, error: null },
      };
      return applyAction(state, newPresent);
    case "loadSuccess":
      newPresent = {
        ...ap,
        ui: { loading: false, error: null },
      };
      console.log("reducer load success", newPresent);
      return applyAction(state, newPresent);
    case "loadError":
      newPresent = {
        ...state.present,
        ui: { loading: false, error: ap },
      };
      return applyAction(state, newPresent);
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

function undo(state, newPresent) {
  if (state.past.length === 0) return state;
  let current = state.past[state.past.length - 1];
  return {
    past: state.past.slice(0, -1),
    present: current,
    future: [state.present, ...state.future],
  };
}

function redo(state, newPresent) {
  if (state.future.length === 0) return state;
  let current = state.future[0];
  return {
    past: [...state.past, state.present],
    present: current,
    future: state.future.slice(1),
  };
}

function resetData() {
  localStorage.removeItem("rows");
  return initialState;
}
