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
 //* - history 
 //* E. Render UI 
 //* F. Side Effects
 //* - DOM update 
 //* - local Storage
 */
// object
//* 0. app state
