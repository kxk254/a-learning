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

const app = createApp({ past: [], present: { rows: [] }, future: [] });

document.addEventListener("DOMContentLoaded", (e) => {
  myForm.addEventListener("submit", (e) => {
    e.preventDefault();
    try {
      const data = new FormData(myForm);
      dispatch({
        type: "addRow",
        payload: {
          id: Date.now(),
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
          value: validateInput(e.target.value),
          name: e.target.name,
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
      dispatch({ type: "deleteRow", payload: { id: rowEl.dataset.id } });
    }
  });
  resetBtn.addEventListener("click", () => {
    dispatch({ type: "resetStorage" });
  });
  loadBtn.addEventListener("click", () => {
    dispatch({ type: "loadStorage" });
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
      newState = {
        past: [...state.past, state.present],
        present: newPresent,
        future: [],
      };
      app.setState(newState);
      localSave.set(newPresent);
      render.renderAll(newPresent);
      return;
    case "updateRow":
      newPresent = crud.updateRow(state.present, action.payload);
      newState = {
        past: [...state.past, state.present],
        present: newPresent,
        future: [],
      };

      app.setState(newState);
      localSave.set(newPresent);
      render.renderAll(newPresent);
      return;
    case "deleteRow":
      newPresent = crud.deleteRow(state.present, action.payload);
      newState = {
        past: [...state.past, state.present],
        present: newPresent,
        future: [],
      };
      app.setState(newState);
      localSave.set(newPresent);
      render.renderAll(newPresent);
      return;
    case "loadStorage":
      const loaded = localSave.load();
      newState = { past: [], present: loaded, future: [] };
      app.setState(newState);
      render.renderAll(loaded);
      return;
    case "undo":
      newState = undo(state);
      app.setState(newState);
      render.renderAll(newState.present);
      return;
    case "resetStorage":
      newState = { past: [], present: { rows: [] }, future: [] };
      app.setState(newState);
      localSave.set(newState.present);
      render.renderAll(newState.present);
      return;
    default:
      render.errorField(action.type);
  }
}

function undo(state) {
  if (state.past.length === 0) return state;
  const previous = state.past[state.past.length - 1];
  return {
    past: state.past.slice(0, -1),
    present: previous,
    future: [state.present, ...state.future],
  };
}

function validateInput(input) {
  if (String(input).trim() === "") {
    throw new Error("Empty is not allowed");
  }
  const num = Number(input);
  if (!Number.isFinite(num)) {
    throw new Error("Enter a valid number");
  } else if (num < 0) {
    throw new Error("Negative is not allowed");
  }
  return num;
}

const crud = {
  addRow(state, payload) {
    const newState = {
      ...state,
      rows: [
        ...state.rows,
        { id: payload.id, price: payload.price, qty: payload.qty },
      ],
    };

    return newState;
  },
  updateRow(state, payload) {
    const newState = {
      ...state,
      rows: state.rows.map((row) =>
        row.id === Number(payload.id)
          ? { ...row, [payload.name]: payload.value }
          : row,
      ),
    };
    return newState;
  },
  deleteRow(state, payload) {
    const newState = {
      ...state,
      rows: state.rows.filter((row) => row.id !== Number(payload.id)),
    };
    return newState;
  },
  sumTotal(state) {
    return state.rows.reduce(
      (acc, row) => {
        acc.totalPrice += Number(row.price);
        acc.totalQty += Number(row.qty);
        return acc;
      },
      { totalPrice: 0, totalQty: 0 },
    );
  },
};

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
    const sum = crud.sumTotal(state);
    totalField.innerHTML = `
<p>Total Price :${sum.totalPrice} | Total Qty :${sum.totalQty}</p>
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

const localSave = {
  set(state) {
    localStorage.setItem("rows", JSON.stringify(state));
  },
  load() {
    const temp = localStorage.getItem("rows");
    return temp ? JSON.parse(temp) : { rows: [] };
  },
  remove() {
    localStorage.removeItem("rows");
    return { rows: [] };
  },
};
render.initialUI(app.getState().present);
