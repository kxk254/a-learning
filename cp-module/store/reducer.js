import { initialState } from "./initialState.js";
import { getVisibleRows } from "./selectors.js";

export function reducer(state = initialState, action) {
  console.log("reducer state", state);
  let newPresent;
  let ap = action.payload;
  console.log("reducer ap", ap);
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
          rows: state.present.entities.rows.map((r) =>
            r.id === ap.id ? { ...r, [ap.name]: [ap.value] } : r,
          ),
        },
      };
      return applyAction(state, newPresent);
    case "deleteRow":
      newPresent = {
        ...state.present,
        entities: {
          ...state.present.entities,
          rows: state.present.entities.rows.filter((r) => r.id !== ap.id),
        },
      };
      return applyAction(state, newPresent);
    case "reset":
      return initialState;
    case "undo":
      console.log("reducer undo");
      return undo(state);
    case "redo":
      return redo(state);
    case "loadStart":
      newPresent = {
        ...state.present,
        ui: { ...state.present.ui, loading: true, error: null },
      };
      return applyAction(state, newPresent);
    case "loadSuccess":
      newPresent = ap;
      return applyAction(state, newPresent);
    case "loadError":
      newPresent = {
        ...state.present,
        ui: { ...state.present.ui, loading: false, error: ap },
      };
      return applyAction(state, newPresent);
    case "setSearchTerm":
      newPresent = {
        ...state.present,
        ui: { ...state.present.ui, searchTerm: ap },
      };
      return applyAction(state, newPresent);
    case "setSortBy":
      newPresent = {
        ...state.present,
        ui: { ...state.present.ui, sortBy: ap },
      };
      return applyAction(state, newPresent);
    case "clearFilters":
      newPresent = {
        ...state.present,
        ui: { ...state.present.ui, searchTerm: "", sortBy: "none" },
      };
      console.log("reducer clear filters: ", newPresent);
      return applyAction(state, newPresent);
    case "reorderRows":
      const { draggedId, targetId } = action.payload;
      const rows = [...state.present.entities.rows];

      const draggedIndex = rows.findIndex((r) => r.id === draggedId);
      const targetIndex = rows.findIndex((r) => r.id === targetId);

      const [draggedRow] = rows.splice(draggedIndex, 1);
      rows.splice(targetIndex, 0, draggedRow);

      newPresent = {
        ...state.present,
        entities: { ...state.present.entities, rows },
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

function redo(state) {
  if (state.future.length === 0) return state;
  let current = state.future[0];
  return {
    past: [...state.past, state.present],
    present: current,
    future: state.future.slice(1),
  };
}
function undo(state) {
  if (state.past.length === 0) return state;
  let current = state.past[state.past.length - 1];
  return {
    past: state.past.slice(0, -1),
    present: current,
    future: [state.present, ...state.future],
  };
}
