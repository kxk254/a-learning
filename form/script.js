const dataField = document.querySelector("#dataField");
const inputField = document.querySelector("#inputField");
const myForm = document.querySelector("#myForm");
const resetBtn = document.querySelector("#resetBtn");
const loadBtn = document.querySelector("#loadBtn");
const totalField = document.querySelector("#totalField");
const errorField = document.querySelector("#errorField");
const undoBtn = document.querySelector("#undo");

// add undo button
// inline edition without re-render  => updateOnlyThatRowinDOM
// derived state  total=computed not stored dont assing to let memory
// prevent invalid states prevent minus
// persist + restore cleanly
/*
 //* 0. app state
 //* A. Events 
 //* - submit
 //* - edit 
 //* - delete 
 //* - buttons 
 //* B. Dispatch
 //* C. State Logic
 //* - validate Input 
 //* - CRUD  reducer
 //* - sum total 
 //* D. Commit Layer
 //* - history 
 //* E. Render UI 
 //* F. Side Effects
 //* - DOM update 
 //* - local Storage
 */
// object
//* 0. app state

function createApp(initialState) {
  let state = initialState;
  function getState() {
    return state;
  }
  function setState(update) {
    state = { ...state, ...update };
    return state;
  }
  return { getState, setState };
}

const app = createApp({
  past: [],
  present: { rows: [] },
  future: [],
});

document.addEventListener("DOMContentLoaded", (e) => {
  myForm.addEventListener("submit", (e) => {
    e.preventDefault;
  });
});

function dispatch(action) {
  switch (action.type) {
    case "addRow":
      return;
    case "updateRow":
      return;
    case "deleteRow":
      return;
    case "undo":
      return undo(state);
    default:
  }
}
function applyAction(state, newPresent) {
  return {
    past: [...state.past, state.present],
    present: newPresent,
    future: [],
  };
}
function undo(state) {}

const crud = {
  addRow() {},
  updateRow() {},
  deleteRow() {},
};

function validateInput(input) {}
function sumTotal(state) {}

const render = {
  dataField() {},
  inputField() {},
  totalField() {},
  errorField() {},
  cleanErrorField() {},
  renderAll() {},
};

const saveLocal = {
  save() {},
  load() {},
  reset() {},
};
