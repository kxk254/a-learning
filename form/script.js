const dataField = document.querySelector("#dataField");
const inputField = document.querySelector("#inputField");
const myForm = document.querySelector("#myForm");
const resetBtn = document.querySelector("#resetBtn");
const loadBtn = document.querySelector("#loadBtn");
const totalField = document.querySelector("#totalField");

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
    state = newState;
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
  crud.createRow(state);
  saveStorage(state);
});
//* - edit
inputField.addEventListener("change", (e) => {
  const state = app.getState();
  const rowEl = e.target.closest(".row");
  if (!rowEl) return;
  const id = Number(rowEl.dataset.id);
  const name = e.target.name;
  const value = e.target.value;
  crud.updateRow(state, id, name, value);
  saveStorage(state);
});

//* - delete
inputField.addEventListener("click", (e) => {
  const state = app.getState();
  if (!e.target.classList.contains("delete-btn")) return;
  let rowEl = e.target.closest(".row");
  const id = Number(rowEl.dataset.id);
  const newState = crud.deleteRow(state, id);
  saveStorage(newState);
  renderAll(newState);
});
//* - buttons
resetBtn.addEventListener("click", () => {
  const state = app.getState();
  resetStorage(state);
  renderAll(state);
});
loadBtn.addEventListener("click", () => {
  const state = app.getState();
  loadStorage(state);
  renderAll(state);
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
      alert(err.message);
    }
  },
  updateRow(state, id, name, value) {
    return {
      ...state,
      rows: rows.map((row) =>
        row.id === Number(id) ? { ...row, [name]: value } : row,
      ),
    };
  },
  deleteRow(state, id) {
    return {
      ...state,
      rows: rows.map((row) => row.id !== Number(id)),
    };
  },
};
//* - sum total
function sumTotal(state) {
  return state.rows.reduce(
    (acc, row) => {
      acc.totalPrice += Number(row.price);
      acc.totalQty += Number(row.qty);
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
  toalField.innerHTML = `
<p>Total Price: ${sum.totalPrice} | Total Qty: ${sum.totalQty}</p>
	`;
}
//* - local Storage
function saveStorage(state) {
  localStorage.setItem("rows", JSON.stringify(state));
}
function loadStorage(state) {
  const temp = localStorage.getItem("rows");
  const newState = temp ? JSON.parse(temp) : { rows: [] };
  return state.setState(newState);
}
function resetStorage(state) {
  localStorage.removeItem("rows");
  const newState = { rows: [] };
  return state.setState(newState);
}
renderInput();
