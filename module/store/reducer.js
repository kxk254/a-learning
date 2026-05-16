import { initialState } from "./initialState.js";

export function reducer(state = initialState, action) {
  let present = state.present;
  let ap = action.payload;
  switch (action.type) {
    case "addRow":
      return applyAction(state, {
        ...present,
        entities: {
          ...present.entities,
          rows: [...present.entities.rows, ap],
        },
      });
    case "updateRow":
      return applyAction(state, {
        ...present,
        entities: {
          ...present.entities,
          rows: present.entities.rows.map((row) =>
            row.id === ap.id ? { ...row, [ap.name]: ap.value } : row,
          ),
        },
      });
    case "deleteRow":
      return applyAction(state, {
        ...present,
        entities: {
          ...present.entities,
          rows: present.entities.rows.filter((row) => row.id !== ap.id),
        },
      });
    case "loadStart":
      let a = applyAction(state, {
        ...ap,
        entities: { rows: [] },
        ui: { loading: true, error: null },
        user: {},
      });
      console.log("load start inside reducer", a);
      return a;
    case "loadSuccess":
      console.log("load success inside reducer", ap);
      let b = applyAction(state, ap);
      console.log("reducer load success data:", b);
      return b;
    case "loadError":
      return applyAction(state, {
        ...ap,
        ui: { loading: false, error: ap },
      });
    case "undo":
      return undo(state);
    case "redo":
      return redo(state);
    case "loadData":
      return;
    case "resetData":
      return resetData();
    default:
      console.log("default path under reducer");
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
  const present = state.past[state.past.length - 1];
  return {
    past: state.past.slice(0, -1),
    present: present,
    future: [state.present, ...state.future],
  };
}

function redo(state) {
  if (state.future.length === 0) return state;
  const present = state.future[0];
  return {
    past: [...state.past, state.present],
    present: present,
    future: state.future.slice(1),
  };
}

function resetData() {
  localStorage.removeItem("rows");
  return {
    past: [],
    present: {
      user: null,
      entities: { rows: [] },
      ui: { loading: false, error: null },
    },
    future: [],
  };
}
