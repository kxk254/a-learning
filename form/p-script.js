const dataField = document.querySelector("#dataField");
const inputField = document.querySelector("#inputField");
const myForm = document.querySelector("#myForm");
const resetBtn = document.querySelector("#resetBtn");
const loadBtn = document.querySelector("#loadBtn");
const totalField = document.querySelector("#totalField");
const errorField = document.querySelector("#errorField");
const undoBtn = document.querySelector("#undoBtn");
const redoBtn = document.querySelector("#redoBtn");

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
    state = update;
    return state;
  }

  return { getState, setState };
}

const app = createApp({ past: [], present: { rows: [] }, future: [] });

document.addEventListener("DOMContentLoaded", (e) => {
  myForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(myForm);
    try {
      dispatch({
        type: "addRow",
        payload: {
          id: crypto.randomUUID(),
          price: validateInput(data.get("price")),
          qty: validateInput(data.get("qty")),
        },
      });
    } catch (err) {
      render.errorField(err.message);
    }
  });
  dataField.addEventListener("change", (e) => {
    const rowEl = e.target.closest(".row");
    if (!rowEl) return;
    try {
      dispatch({
        type: "updateRow",
        payload: {
          id: rowEl.dataset.id,
          name: e.target.name,
          value: validateInput(e.target.value),
        },
      });
    } catch (err) {
      render.errorField(err.message);
    }
  });
  dataField.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const rowEl = e.target.closest(".row");
      if (!rowEl) return;
      console.log("row El", rowEl);
      dispatch({ type: "deleteRow", payload: { id: rowEl.dataset.id } });
    }
  });
  resetBtn.addEventListener("click", () => {
    let state = localData.reset();
    app.setState(applyAction(app.getState(), state));
    render.renderAll(state);
  });
  loadBtn.addEventListener("click", () => {
    let state = localData.load();
    app.setState(applyAction(app.getState(), state));
    render.renderAll(state);
  });
  undoBtn.addEventListener("click", () => {
    dispatch({ type: "undo" });
  });
  redoBtn.addEventListener("click", () => {
    dispatch({ type: "redo" });
  });
});

function dispatch(action) {
  const state = app.getState();
  let newPresent = {};
  let newState = {};
  switch (action.type) {
    case "addRow":
      newPresent = crud.addRow(state.present, action.payload);
      newState = applyAction(state, newPresent);
      app.setState(newState);
      render.renderAll(newPresent);
      localData.save(newPresent);
      return;
    case "updateRow":
      newPresent = crud.updateRow(state.present, action.payload);
      newState = applyAction(state, newPresent);
      app.setState(newState);
      render.renderAll(newPresent);
      localData.save(newPresent);
      return;
    case "deleteRow":
      newPresent = crud.deleteRow(state.present, action.payload);
      newState = applyAction(state, newPresent);
      app.setState(newState);
      render.renderAll(newPresent);
      localData.save(newPresent);
      return;
    case "undo":
      newState = undo(state);
      render.renderAll(newState.present);
      localData.save(newState.present);
      return;
    case "redo":
      newState = redo(state);
      render.renderAll(newState.present);
      localData.save(newState.present);
      return;
    default:
  }
}

function undo(state) {
  if (state.past.length === 0) return state;
  const present = state.past[state.past.length - 1];
  return {
    past: state.past.slice(0, -1),
    present: present,
    future: [state.present, ...state.future],
  };
}
function redo(state) {
  if (state.future.length === 0) return state;
  const present = state.future[0];
  return {
    past: [...state.past, state.present],
    present: present,
    future: state.future.slice(1),
  };
}
function applyAction(state, newPresent) {
  return {
    past: [...state.past, state.present],
    present: newPresent,
    future: [],
  };
}
function validateInput(input) {
  if (String(input).trim() === "") {
    throw new Error("Empty is not allowed");
  }
  const num = Number(input);
  if (!Number.isFinite(num)) {
    throw new Error("Enter a valid input");
  } else if (num < 0) {
    throw new Error("Negtive is not allowed");
  }
  return num;
}
const crud = {
  addRow(state, payload) {
    return {
      ...state,
      rows: [
        ...state.rows,
        { id: payload.id, price: payload.price, qty: payload.qty },
      ],
    };
  },
  updateRow(state, payload) {
    return {
      ...state,
      rows: state.rows.map((row) =>
        row.id === payload.id ? { ...row, [payload.name]: payload.value } : row,
      ),
    };
  },
  deleteRow(state, payload) {
    return {
      ...state,
      rows: state.rows.filter((row) => row.id !== payload.id),
    };
  },
};
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
<p>Total Price: ${sum.totalPrice} | Total Qty ${sum.totalQty}</p>
	  `;
  },

  errorField(msg) {
    errorField.textContent = msg;
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

const localData = {
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
