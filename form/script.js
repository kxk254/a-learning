const dataField = document.querySelector("#dataField");
const inputField = document.querySelector("#inputField");
const myForm = document.querySelector("#myForm");
const resetBtn = document.querySelector("#resetBtn");
const loadBtn = document.querySelector("#loadBtn");
const totalField = document.querySelector("#totalField");
const errorField = document.querySelector("#errorField");
const undoBtn = document.querySelector("#undoBtn");
const redoBtn = document.querySelector("#redoBtn");

/* tasks
 * noramlize DB
 * server state vs client state sepration
 * performance re-render optimization - only render state changes
 * distributed systems
 */
// 0. app state
// 1. Event
// 2. disptach / undo / redo /applyAction / validateInput / crud
// 3. render
// 4. storeData

// 0. app state
function createApp(initialState) {
  let state = initialState;

  function getState() {
    return state;
  }

  function setState(update) {
    state = update;
    return state;
  }
  return { getState, setState };
}

const app = createApp({
  past: [],
  present: { user: null, entities: { rows: [] } },
  future: [],
});
// 1. Event

myForm.addEventListener("DOMContentLoaded", (e) => {});
// 2. disptach / undo / redo /applyAction / validateInput / crud / sumTotal

function dispatch(action) {
  switch (action.type) {
    case "addRow":
      return;
    case "updateRow":
      return;
    case "deleteRow":
      return;
    case "undo":
      return;
    case "redo":
      return;
    default:
  }
}

function undo(state) {}
function redu(state) {}
function applyAction(state, newPresent) {}
function valudateInput(input) {}
const crud = {
  addRow(state, payload) {
    return {
      ...state,
      present: {
        ...state.present,
        entities: {
          ...state.present.entities,
          rows: [...state.present.entities.rows, payload],
        },
      },
    };
  },
  updateRow(state, payload) {
    return {
      ...state,
      present: {
        ...state.present,
        entities: {
          ...state.present.entities,
          rows: state.present.entities.rows.map((row) =>
            row.id === payload.id
              ? { ...row, [payload.name]: payload.value }
              : row,
          ),
        },
      },
    };
  },
  deleteRow(state, payload) {
    return {
      ...state,
      present: {
        ...state.present,
        entities: {
          ...state.present.entities,
          rows: state.present.entities.rows.filter(
            (row) => row.id !== payload.id,
          ),
        },
      },
    };
  },
};
function sumTotal(state) {
  return state.rows.reduce(
    (acc, row) => {
      acc.totalPrice += Number(row.price);
      acc.totalQty += Number(row.qty);
      return acc;
    },
    { totalPrice: 0, totalQty: 0 },
  );
}
// 3. render
const render = {
  dataField() {},
  inputField() {},
  totalField() {},
  errorField() {},
  cleanErrorField() {},
  renderAll() {},
  initialUI() {},
};
// 4. storeData
const storeData = {
  save() {},
  load() {},
  reset() {},
};
