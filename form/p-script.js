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
function createApp(InitialState) {
  let state = InitialState;
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

document.addEventListener("DOMContentLoaded", () => {
  myForm.addEventListener("submit", (e) => {
    e.preventDefault();
    try {
      const data = new FormData(myForm);
      const payload = {
        id: Date.now(),
        price: validateInput(data.get("price")),
        qty: validateInput(data.get("qty")),
      };
      dispatch({ type: "addRow", payload });
    } catch (err) {
      console.log("validation error", err.message);
      render.errorField(err.message);
    }
  });
  dataField.addEventListener("change", (e) => {
    try {
      const rowEl = e.target.closest(".row");
      if (!rowEl) return;
      const payload = {
        id: rowEl.dataset.id,
        value: validateInput(e.target.value),
        name: e.target.name,
      };
      console.log("change data", payload);
      dispatch({ type: "updateRow", payload });
    } catch (err) {
      render.errorField(err.message);
    }
  });
  dataField.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const rowEl = e.target.closest(".row");
      if (!rowEl) return;
      const payload = { id: rowEl.dataset.id };
      dispatch({ type: "deleteRow", payload });
    }
  });
  resetBtn.addEventListener("click", () => {
    dispatch({ type: "resetState" });
  });
  loadBtn.addEventListener("click", () => {
    dispatch({ type: "loadState" });
  });
});

function dispatch(action) {
  console.log("dispatch", action);
  switch (action.type) {
    case "addRow":
      console.log("dispatch addrow", action.payload);
      app.setState(crud.addRow(action.payload));
      render.renderAll();
      storage.save();
      break;
    case "updateRow":
      app.setState(crud.updateRow(action.payload));
      render.renderAll();
      storage.save();
      break;
    case "deleteRow":
      app.setState(crud.deleteRow(action.payload));
      render.renderAll();
      storage.save();
      break;
    case "resetState":
      app.setState(storage.reset());
      render.renderAll();
      break;
    case "loadState":
      app.setState(storage.load());
      console.log("load storage", app.getState());
      render.renderAll();
      break;
    default:
      render.errorField(action.type);
  }
}

function validateInput(input) {
  if (String(input).trim() === "") {
    throw new Error("Empty value is not allowed");
  }
  const num = Number(input);
  if (!Number.isFinite(num)) {
    throw new "Input a valid number"();
  } else if (num < 0) {
    throw new Error("Negative is not allowed, input positive number");
  }
  return num;
}

const crud = {
  getState() {
    return app.getState();
  },
  addRow(payload) {
    const state = this.getState();
    const newState = {
      ...state,
      rows: [
        ...state.rows,
        { id: payload.id, price: payload.price, qty: payload.qty },
      ],
    };
    return newState;
  },
  updateRow(payload) {
    const state = this.getState();
    console.log("paylod value", payload.value);
    const newState = {
      ...state,
      rows: state.rows.map((row) =>
        row.id === Number(payload.id)
          ? { ...row, [payload.name]: Number(payload.value) }
          : row,
      ),
    };
    return newState;
  },
  deleteRow(payload) {
    const state = this.getState();
    const newState = {
      ...state,
      rows: state.rows.filter((row) => row.id !== Number(payload.id)),
    };
    return newState;
  },
  sumTotal() {
    const state = this.getState();
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
  getState() {
    return app.getState();
  },
  dataField() {
    const state = this.getState();
    dataField.innerHTML = "";
    state.rows.forEach((row) => {
      const div = document.createElement("div");
      div.dataset.id = row.id;
      div.className = "row";
      div.innerHTML = `
<input type="text" name="price" value="${row.price}" />
<input type="text" name="qty" value="${row.qty}" />
<button type="button" class="delete-btn">DEL</button>
		  `;
      dataField.appendChild(div);
    });
  },
  inputField() {
    inputField.innerHTML = `
<label>Price </label><input type="text" name="price" value=""/>
<label>Qty </label><input type="text" name="qty" value=""/>
`;
  },
  totalField() {
    const state = this.getState();
    const sum = crud.sumTotal(state);
    totalField.innerHTML = `
<p>Total Price : ${sum.totalPrice} | Total Qty ${sum.totalQty} </p>
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
  renderAll() {
    this.dataField();
    this.inputField();
    this.totalField();
    this.cleanErrorField();
  },
  renderInitialUI() {
    this.inputField();
    this.totalField();
  },
};

const storage = {
  getState() {
    return app.getState();
  },
  save() {
    localStorage.setItem("row", JSON.stringify(this.getState()));
  },
  load() {
    const temp = localStorage.getItem("row");
    return temp ? JSON.parse(temp) : { rows: [] };
  },
  reset() {
    localStorage.removeItem("row");
    return { rows: [] };
  },
};

render.renderInitialUI();
