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
      newPresent = undo(state);
      return applyAction(state, newPresent);
    case "redo":
      newPresent = redo(state);
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

function undo(state) {
  if (state.past.length === 0) return state;
  const past = state.past[state.past.length - 1];
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
