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
function createApp() {
  let state = { rows: [] };
  function setState(newState) {
    state = { ...state, ...newState };
    renderAll(state);
  }
  return { getState: () => state, setState };
}
const app = createApp();

//* A. Events
//* - submit
myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const state = app.getState();
  let newState = crud.createRow(state);
  app.setState(newState);
  saveStorage(app.getState());
});
//* - edit
dataField.addEventListener("change", (e) => {
  const state = app.getState();
  const rowEl = e.target.closest(".row");
  if (!rowEl) return;
  const id = Number(rowEl.dataset.id);
  const name = e.target.name;
  const value = e.target.value;
  const newState = crud.updateRow(state, id, name, value);
  saveStorage(newState);
  app.setState(newState);
});

//* - delete
dataField.addEventListener("click", (e) => {
  const state = app.getState();
  if (!e.target.classList.contains("delete-btn")) return;
  let rowEl = e.target.closest(".row");
  const id = Number(rowEl.dataset.id);
  const newState = crud.deleteRow(state, id);
  saveStorage(newState);
  app.setState(newState);
});
//* - buttons
resetBtn.addEventListener("click", () => {
  const state = app.getState();
  const newState = resetStorage(state);
  app.setState(newState);
});
loadBtn.addEventListener("click", () => {
  const state = app.getState();
  const newState = loadStorage(state);
  app.setState(newState);
});
//* B. State Logic
//* - validate Input
function validateInput(input) {
  if (String(input).trim() === "") {
    throw new Error("Do not input Empty value");
  }
  const num = Number(input);
  if (!Number.isFinite(num)) {
    throw new Error("Enter a valid input");
  } else if (num < 0) {
    throw new Error("Negative is not allowed");
  }
  return num;
}
//* - CRUD
const crud = {
  createRow(state) {
    try {
      const p = validateInput(inputField.querySelector("[name='price']").value);
      const q = validateInput(inputField.querySelector("[name='qty']").value);
      const row = { id: Date.now(), price: p, qty: q };
      console.log("create row", row);
      const newState = { ...state, rows: [...state.rows, row] };
      console.log("create new state", newState);
      return newState;
    } catch (err) {
      errorField.textContent = err.message;
    }
  },
  updateRow(state, id, name, value) {
    return {
      ...state,
      rows: state.rows.map((row) =>
        row.id === Number(id) ? { ...row, [name]: value } : row,
      ),
    };
  },
  deleteRow(state, id) {
    return {
      ...state,
      rows: state.rows.filter((row) => row.id !== Number(id)),
    };
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
//* C. Commit Layer
//* - setState
//* - history
//* - current Index
//* D. Render UI
//* - render rows
function renderRows(state) {
  dataFieldDOM(state);
}
//* - render total
function renderTotal(state) {
  totalFieldDOM(state);
}
//* - render input
function renderInput() {
  inputFieldDOM();
}
function renderAll(state) {
  dataFieldDOM(state);
  totalFieldDOM(state);
  inputFieldDOM();
}
//* E. Side Effects
//* - DOM update
function inputFieldDOM() {
  inputField.innerHTML = `
<input type="text" name="price" value=""/>
<input type="text" name="qty" value=""/>
		`;
}

function dataFieldDOM(state) {
  dataField.innerHTML = "";
  state.rows.forEach((row) => {
    const div = document.createElement("div");
    div.className = "row";
    div.dataset.id = Number(row.id);
    div.innerHTML = `
	<input type="text" name="price" value="${row.price}"/>
	<input type="text" name="qty" value="${row.qty}"/>
	<button type="button" class="delete-btn">DEL</button>
		`;
    dataField.appendChild(div);
  });
}

function totalFieldDOM(state) {
  const sum = sumTotal(state);
  console.log("totalFieldDom sum", sum);
  totalField.innerHTML = `
<p>Total Price: ${sum.totalPrice} | Total Qty: ${sum.totalQty}</p>
	`;
}
//* - local Storage
function saveStorage(state) {
  localStorage.setItem("rows", JSON.stringify(state));
}
function loadStorage(state) {
  const temp = localStorage.getItem("rows");
  console.log("load storage", temp);
  const newState = temp ? JSON.parse(temp) : { rows: [] };
  return newState;
}
function resetStorage(state) {
  localStorage.removeItem("rows");
  const newState = { rows: [] };
  return newState;
}
renderInput();
