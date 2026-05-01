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
