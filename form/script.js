const dataField = document.querySelector("#dataField");
const inputField = document.querySelector("#inputField");
const myForm = document.querySelector("#myForm");
const resetBtn = document.querySelector("#resetBtn");
const loadBtn = document.querySelector("#loadBtn");
const totalField = document.querySelector("#totalField");
const errorField = document.querySelector("#errorField");

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
 //* - setState 
 //* - history 
 //* - current Index
 //* E. Render UI 
 //* - render rows 
 //* - render total 
 //* - render input 
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
    state = [...state, ...update];
    return state;
  }
  return { getState, setState };
}

let app = createApp({ rows: [] });

//* A. Events
//* - submit
myForm.addEventListener("submit", (e) => {
  e.preventDefault();
});
//* - edit
dataField.addEventListener("change", (e) => {});
//* - delete
dataField.addEventListener("click", (e) => {});
//* - buttons
resetBtn.addEventListener("click", () => {});
loadBtn.addEventListener("click", () => {});
//* B. Dispatch
function dispatch(action) {
  switch (action.type) {
    case "addRow":
      break;
    case "update":
      break;
    case "delete":
      break;
    default:
      errorField.textContent = action.type;
  }
}
//* C. State Logic
//* - validate Input
function validateInput(input) {
  if (String(input).trim() === "") {
    throw new Error("Empty is not allowed");
  }
  const num = Number(input);
  if (!Number.isFinite(num)) {
    throw new Error("Input a valid number");
  } else if (num < 0) {
    throw new Error("Negative is not allowed here");
  }
  return num;
}
//* - CRUD  reducer
const crud = {
  addRow(payload) {
const newState = {...payload.state, {id:payload.id, price:payload.price, qty:payload.qty}}
  },
  upddateRow() {},
  deleteRow() {},
};

//* - sum total
//* D. Commit Layer
//* - setState
//* - history
//* - current Index
//* E. Render UI
//* - render rows
//* - render total
//* - render input
//* F. Side Effects
//* - DOM update
//* - local Storage
