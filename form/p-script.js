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
    e.preventDefault();
    try {
      const data = new FormData(myForm);
      const payload = {
        id: crypto.randomUUID(),
        price: validateInput(data.get("price")),
        qty: validateInput(data.get("qty")),
      };
      dispatch({ type: "addRow", payload });
    } catch (err) {
      render.errorField(err.message);
    }
  });
  dataField.addEventListener("change", (e) => {
    const rowEl = e.target.closest(".row");
    if (!rowEl) return;
    try {
      const payload = {
        id: rowEl.dataset.id,
        name: e.target.name,
        value: validateInput(e.target.value),
      };
      dispatch({ type: "updateRow", payload });
    } catch (err) {
      render.errorField(err.message);
    }
  });
  dataField.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const rowEl = e.target.closest(".row");
      if (!rowEl) return;
      payload = { id: rowEl.dataset.id };
      dispatch({ type: "deleteRow", payload });
    }
  });
  loadBtn.addEventListener("click", () => {
    let newState = { past: [], present: saveLocal.load(), future: [] };
    app.setState(newState);
    render.renderAll(newState.present);
  });
  resetBtn.addEventListener("click", () => {
    let state = app.getState();
    let tempPresent = saveLocal.reset(state.present);
    let newState = applyAction(state, tempPresent);
    app.setState(newState);
    render.renderAll(newState);
  });
  undoBtn.addEventListener("click", () => {
    dispatch({ type: "undo" });
  });
});

function dispatch(action) {
  const state = app.getState();
  let newPresent = {};
  let newState = {};
  switch (action.type) {
    case "addRow":
      newPresent = crud.addRow(state.present, action.payload);
      newState = app.setState(applyAction(state, newPresent));
      render.renderAll(newState.present);
      saveLocal.save(newState.present);
      return;
    case "updateRow":
      newPresent = crud.updateRow(state.present, action.payload);
      newState = app.setState(applyAction(state, newPresent));
      render.renderAll(newState.present);
      saveLocal.save(newState.present);
      return;
    case "deleteRow":
      newPresent = crud.deleteRow(state.present, action.payload);
      newState = app.setState(applyAction(state, newPresent));
      render.renderAll(newState.present);
      saveLocal.save(newState.present);
      return;
    case "undo":
      newState = app.setState(undo(state));
      console.log("undo", state, "new", newState);
      render.renderAll(newState.present);
      saveLocal.save(newState.present);
      return;
    default:
      render.errorField(action.type);
  }
}
function applyAction(state, newPresent) {
  return {
    past: [...state.past, state.present],
    present: newPresent,
    future: [],
  };
}
function undo(state) {
  if (state.past.length === 0) return;
  const previous = state.past[state.past.length - 1];
  const newState = {
    past: state.past.slice(0, -1),
    present: previous,
    future: [state.present, ...state.future],
  };
  return newState;
}

const crud = {
  addRow(state, payload) {
    let newState = {
      ...state,
      rows: [
        ...state.rows,
        { id: payload.id, price: payload.price, qty: payload.qty },
      ],
    };
    return newState;
  },
  updateRow(state, payload) {
    let newState = {
      ...state,
      ...state.rows,
      rows: state.rows.map((row) =>
        row.id === payload.id ? { ...row, [payload.name]: payload.value } : row,
      ),
    };
    return newState;
  },
  deleteRow(state, payload) {
    let newState = {
      ...state,
      ...state.rows,
      rows: state.rows.filter((row) => row.id !== payload.id),
    };
    return newState;
  },
};

function validateInput(input) {
  if (String(input).trim() === "") {
    throw new Error("Empty value is not allowed");
  }
  const num = Number(input);
  if (!Number.isFinite(num)) {
    throw new Error("Enter a valid input");
  } else if (num < 0) {
    throw new Error("Enter a positive number");
  }
  return num;
}
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

const render = {
  dataField(state) {
    dataField.innerHTML = "";
    state.rows.forEach((row) => {
      const div = document.createElement("div");
      div.dataset.id = row.id;
      div.className = "row";
      div.innerHTML = `
<input type="text" name="price" value="${row.price}"/>
<input type="text" name="qty" value="${row.qty}"/>
<button type="button" class="delete-btn">DEL</button>
	`;
      dataField.appendChild(div);
    });
  },
  inputField() {
    inputField.innerHTML = `
<input type="text" name="price" value=""/>
<input type="text" name="qty" value=""/>
`;
  },
  totalField(state) {
    const sum = sumTotal(state);
    totalField.innerHTML = `
<p>Total Price :${sum.totalPrice} | Total Qty : ${sum.totalQty} </p>
	  `;
  },
  errorField(message) {
    errorField.textContent = message;
    errorField.classList.add("red");
  },
  cleanErrorField() {
    errorField.textContent = "";
    errorField.classList.remove("red");
  },
  renderAll(state) {
    this.dataField(state);
    this.inputField();
    this.totalField(state);
    this.cleanErrorField();
  },
  initialUI(state) {
    this.inputField();
    this.totalField(state);
  },
};

const saveLocal = {
  save(state) {
    localStorage.setItem("rows", JSON.stringify(state));
  },
  load() {
    let temp = localStorage.getItem("rows");
    return temp ? JSON.parse(temp) : { rows: [] };
  },
  reset() {
    localStorage.removeItem("rows");
    return { rows: [] };
  },
};
render.initialUI({ rows: [] });
