import { initialState } from "./initialState.js";

export function reducer(state, action) {
  let newPresent = {};
  let ap = action.payload;
  let present = state.present;
  switch (action.type) {
    case "addRow":
      newPresent = {
        ...present,
        entities: {
          ...present.entities,
          rows: [...present.entities.rows, ap],
        },
      };
      return applyAction(state, newPresent);
    case "updateRow":
      newPresent = {
        ...present,
        entities: {
          ...present.entities,
          rows: present.entities.rows.map((row) =>
            row.id === ap.id ? { ...row, [ap.name]: ap.value } : row,
          ),
        },
      };
      return applyAction(state, newPresent);
    case "deleteRow":
      newPresent = {
        ...present,
        entities: {
          ...present.entities,
          rows: present.entities.rows.filter((row) => row.id !== ap.id),
        },
      };
      return applyAction(state, newPresent);
    case "undo":
      return undo(state);
    case "redo":
      return redo(state);
    //case "loadData":
    //newPresent = state.present;

    case "loadStart":
      console.log("load Start");
      newPresent = {
        ...state.present,
        ui: { ...state.present.ui, loading: true, error: null },
      };
      console.log("load Start", newPresent);
      return applyAction(state, newPresent);
    case "loadSuccess":
      console.log("loadSuccess", ap);
      newPresent = {
        ...state.present,
        ui: { ...state.present.ui, loading: false },
        entities: { ...state.present.entities, rows: ap.entities.rows },
        user: ap.user,
      };
      console.log("load success in reducer", newPresent);
      return applyAction(state, newPresent);
    case "loadError":
      newPresent = {
        ...state.present,
        ui: { ...state.present.ui, loading: false, error: ap },
      };
      return applyAction(state, newPresent);

    case "resetData":
      return localData.resetData();
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

function undo(state) {
  if (state.past.length === 0) return state;
  const past = state.past[state.past.length - 1];
  console.log("undo state", past);
  return {
    past: state.past.slice(0, -1),
    present: past,
    future: [state.present, ...state.future],
  };
}
function redo(state) {
  if (state.future.length === 0) return state;
  const future = state.future[0];
  return {
    past: [...state.past, state.present],
    present: future,
    future: state.future.slice(1),
  };
}

export const localData = {
  loadData() {
    let temp = localStorage.getItem("rows");
    console.log("loadData in localData", JSON.parse(temp));
    return temp ? JSON.parse(temp) : initialState;
  },
  resetData() {
    localStorage.removeItem("rows");
    return initialState;
  },
};
