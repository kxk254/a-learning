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
  let state = initialState;
  function getState() {
    renderAll(state);
    return state;
  }
  function setState(update) {
    state = { ...state, ...update };
    console.log("setState", state, "newState", update);
    renderAll(state);
    return state;
  }
  return { getState, setState };
}
const app = createApp({ rows: [] });
renderInputField();
renderTotalField(app.getState());
//* A. Events
//* - submit
myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  try {
    const newRow = crud.createRow();
    app.setState(newRow);
  } catch (err) {
    renderErrorField(err.message);
    errorField.classList.add("red");
  }
});
//* - edit
dataField.addEventListener("click", (e) => {});
//* - delete
dataField.addEventListener("change", (e) => {});
//* - buttons
resetBtn.addEventListener("click", () => {
  resetStorage();
  app.getState();
});
loadBtn.addEventListener("click", () => {
  loadStorage();
  app.getState();
});
//* B. State Logic
//* - validate Input
function validateInput(input) {
  if (String(input).trim() === "") {
    throw new Error("Empty value is not allowed");
  }
  const num = Number(input);
  if (!Number.isFinite(num)) {
    throw new Error("Enter a valid number");
  } else if (num < 0) {
    throw new Error("Negative cannot be allowed, pls input positive number");
  }
  return num;
}
//* - CRUD
const crud = {
  createRow() {
    const p = validateInput(inputField.querySelector("[name='price']").value);
    const q = validateInput(inputField.querySelector("[name='qty']").value);
    const tempRow = { id: Date.now(), price: p, qty: q };
    const newRow = { rows: [...app.getState().rows, tempRow] };
    return app.setState(newRow);
  },
  updateRow(state, id, name, value) {
    const update = state.rows.map((row) => {
      row.id === Number(id) ? { ...row, [name]: value } : row;
    });
    return app.setState(update);
  },
  deleteRow(state, id) {
    const update = state.rows.filter((row) => row.id !== Number(id));
    return app.setState(update);
  },
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
//* D. Render UI
//* - render rows
function renderDataField(state) {
  dataField.innerHTML = "";
  console.log("render data field", state.rows);
  state.rows.forEach((row) => {
    const div = document.createElement("div");
    div.className = "row";
    div.dataset.id = row.id;
    div.innerHTML = `
	<input type="text" name="price" value="${row.price}"/>
	<input type="text" name="qty" value="${row.qty}"/>
	<button type="button" class="delete-btn">DEL</button>
		`;
    dataField.appendChild(div);
  });
}
//* - render total
function renderTotalField(state) {
  const sum = sumTotal(state);
  totalField.innerHTML = `
<p>Total Price :${sum.totalPrice} | Total Qty ${sum.totalQty} </p>
	`;
}
//* - render input
function renderInputField() {
  inputField.innerHTML = `
<label>Price :</label><input type="text" name="price" value="" />
<label>Qty :</label><input type="text" name="qty" value="" />
`;
}
function renderErrorField(text) {
  errorField.textContent = text;
}
function cleanErrorField() {
  errorField.textContent = "";
  errorField.classList.remove("red");
}
function renderAll(state) {
  renderDataField(state);
  renderInputField();
  renderTotalField(state);
  cleanErrorField();
}
//* E. Side Effects
//* - DOM update
//* - local Storage
function saveStorage(state) {
  localStorage.setItem("rows", JSON.stringify(state));
}
function loadStorage() {
  const temp = localStorage.getItem("rows");
  const loadState = temp ? JSON.parse(temp) : { rows: [] };
  return app.setState(loadState);
}
function resetStorage() {
  localStorage.removeItem("rows");
  const removeState = { rows: [] };
  return app.setState(removeState);
}
