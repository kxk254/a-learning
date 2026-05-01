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
 //* B. State Logic
 //* - validate Input 
 //* - CRUD 
 //* - sum total 
 //* C. Commit Layer
 //* - setState 
 //* - history 
 //* - current Index
 //* D. Render UI 
 //* - render rows 
 //* - render total 
 //* - render input 
 //* E. Side Effects
 //* - DOM update 
 //* - local Storage
 */
// object
//* 0. app state
function createApp(initialState) {
  const state = initialState;

  function getState() {
    return state;
  }

  function setState(update) {
    state = { ...state, ...update };
    return state;
  }
  return { getState, setState };
}

const app = createApp({ rows: [] });
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
//* B. State Logic
//* - validate Input
function validateInput(input) {}
//* - CRUD
const crud = {
  addRow() {},
  updateRow() {},
  deleteRow() {},
};
//* - sum total
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
//* C. Commit Layer
//* - setState
//* - history
//* - current Index
//* D. Render UI
//* - render rows
function renderDataField() {}
//* - render total
function renderInputField() {}
//* - render input
function renderTotalField() {}
function renderErrorField() {}
//* E. Side Effects
//* - DOM update
//* - local Storage
function saveStorage() {}
function loadStorage() {}
function resetStorage() {}
