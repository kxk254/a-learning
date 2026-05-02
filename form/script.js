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
    return state;
  }

  function setState(update) {
    state = { ...state, ...update };
    console.log("set state", state);
    return state;
  }
  return { getState, setState };
}

const app = createApp({ rows: [] });
//* A. Events
//* - submit
myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  try {
    renderAll(app.setState(crud.addRow(app.getState())));
    saveStorage(app.getState());
  } catch (err) {
    renderErrorField(err.message);
  }
});
//* - edit
dataField.addEventListener("change", (e) => {
  const rowEl = e.target.closest(".row");
  if (!rowEl) return;
  const id = rowEl.dataset.id;
  const name = e.target.name;
  const value = e.target.value;
  try {
    renderAll(app.setState(crud.updateRow(app.getState(), id, name, value)));
    saveStorage(app.getState());
  } catch (err) {
    renderErrorField(err.message);
  }
});
//* - delete
dataField.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const rowEl = e.target.closest(".row");
    const id = rowEl.dataset.id;
    renderAll(app.setState(crud.deleteRow(app.getState(), id)));
    saveStorage(app.getState());
  }
});
//* - buttons
resetBtn.addEventListener("click", () => {
  renderAll(app.setState(resetStorage()));
});
loadBtn.addEventListener("click", () => {
  renderAll(app.setState(loadStorage()));
});
//* B. State Logic
//* - validate Input
function validateInput(input) {
  if (String(input).trim() === "") {
    throw new Error("Empty is now allowed");
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
  addRow(state) {
    const p = validateInput(inputField.querySelector("[name='price']").value);
    const q = validateInput(inputField.querySelector("[name='qty']").value);
    return {
      ...state,
      rows: [...state.rows, { id: Date.now(), price: p, qty: q }],
    };
  },
  updateRow(state, id, name, value) {
    const newState = {
      ...state,
      rows: state.rows.map((row) =>
        row.id === Number(id) ? { ...row, [name]: value } : row,
      ),
    };

    console.log("update state", newState);
    return newState;
  },
  deleteRow(state, id) {
    const newState = state.rows.filter((row) => row.id !== Number(id));
    return { ...state, rows: newState };
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
function renderDataField(state) {
  dataField.innerHTML = "";
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
function renderInputField() {
  inputField.innerHTML = `
<label>Price:</label><input type="text" name="price" value="" />
<label>Qty:</label><input type="text" name="qty" value="" />
`;
}
//* - render input
function renderTotalField(state) {
  const sum = sumTotal(state);
  totalField.innerHTML = `
<p>Total Price :${sum.totalPrice} | Total Qty :${sum.totalQty}</p>
	`;
}
function renderErrorField(message) {
  errorField.textContent = message;
  errorField.classList.add("red");
}
function cleanErrorField() {
  errorField.classList.remove("red");
}
function renderAll(state) {
  renderTotalField(state);
  cleanErrorField();
  renderInputField();
  renderDataField(state);
}

//* E. Side Effects
//* - DOM update
//* - local Storage
function saveStorage(state) {
  localStorage.setItem("rows", JSON.stringify(state));
}
function loadStorage() {
  const temp = localStorage.getItem("rows");
  return (newState = temp ? JSON.parse(temp) : { rows: [] });
}
function resetStorage() {
  localStorage.removeItem("rows");
  return { rows: [] };
}
renderInputField();
renderTotalField(app.getState());
