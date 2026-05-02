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

let app = createApp({ rows: [] });

//* A. Events
//* - submit
myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  try {
    let p = validateInput(inputField.querySelector("[name='price']").value);
    let q = validateInput(inputField.querySelector("[name='qty']").value);
    let rowData = { state: app.getState(), id: Date.now(), price: p, qty: q };
    dispatch({ type: "addRow", payload: rowData });
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
  dispatch({
    type: "update",
    payload: { state: app.getState(), id: id, name: name, value: value },
  });
});
//* - delete
dataField.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const rowEl = e.target.closest(".row");
    if (!rowEl) return;
    const id = rowEl.dataset.id;
    dispatch({ type: "delete", payload: { state: app.getState(), id: id } });
  }
});
//* - buttons
resetBtn.addEventListener("click", () => {
  dispatch({ type: "resetStorage" });
});
loadBtn.addEventListener("click", () => {
  dispatch({ type: "loadStorage" });
});
//* B. Dispatch
function dispatch(action) {
  switch (action.type) {
    case "addRow":
      console.log("dispatch add row", action.payload);
      app.setState(crud.addRow(action.payload));
      saveStorage(app.getState());
      renderTotalField(app.getState());
      renderInputField();
      renderDataField(app.getState());
      renderCleanErrorField();
      break;
    case "update":
      app.setState(crud.upddateRow(action.payload));
      saveStorage(app.getState());
      renderTotalField(app.getState());
      renderInputField();
      renderDataField(app.getState());
      renderCleanErrorField();
      break;
    case "delete":
      app.setState(crud.deleteRow(action.payload));
      saveStorage(app.getState());
      renderTotalField(app.getState());
      renderInputField();
      renderDataField(app.getState());
      renderCleanErrorField();
      break;
    case "resetStorage":
      resetStorage();
      renderTotalField(app.getState());
      renderInputField();
      renderDataField(app.getState());
      renderCleanErrorField();
      break;
    case "loadStorage":
      app.setState(loadStorage());
      renderTotalField(app.getState());
      renderInputField();
      renderDataField(app.getState());
      renderCleanErrorField();
      break;
    default:
      renderErrorField(action.type);
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
    const newState = {
      ...payload.state,
      rows: [
        ...payload.state.rows,
        { id: payload.id, price: payload.price, qty: payload.qty },
      ],
    };
    return newState;
  },
  upddateRow(payload) {
    const newState = {
      ...payload.state,
      rows: payload.state.rows.map((row) =>
        row.id === Number(payload.id)
          ? { ...row, [payload.name]: payload.value }
          : row,
      ),
    };
    return newState;
  },
  deleteRow(payload) {
    const newState = {
      ...payload.state,
      rows: payload.state.rows.filter((row) => row.id !== Number(payload.id)),
    };
    return newState;
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
//* D. Commit Layer
//* - history
//* - current Index
//* E. Render UI
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
function renderInputField() {
  inputField.innerHTML = `
<input type="text" name="price" value=""/>
<input type="text" name="qty" value=""/>
`;
}
function renderTotalField(state) {
  const sum = sumTotal(state);
  totalField.innerHTML = `
<p>Total Price: ${sum.totalPrice} | Total Qty : ${sum.totalQty} </p>
	`;
}
function renderErrorField(message) {
  errorField.textContent = message;
  errorField.classList.add("red");
  renderInputField();
}
function renderCleanErrorField() {
  errorField.classList.remove("red");
  errorField.textContent = "";
}
//* F. Side Effects
//* - local Storage
function saveStorage(state) {
  localStorage.setItem("rows", JSON.stringify(state));
}
function loadStorage() {
  let temp = localStorage.getItem("rows");
  return temp ? JSON.parse(temp) : { rows: [] };
}
function resetStorage() {
  localStorage.removeItem("rows");
  app.setState({ rows: [] });
}
renderInputField();
renderTotalField({ rows: [] });
