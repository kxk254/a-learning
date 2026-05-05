const dataField = document.querySelector("#dataField");
const inputField = document.querySelector("#inputField");
const myForm = document.querySelector("#myForm");
const resetBtn = document.querySelector("#resetBtn");
const loadBtn = document.querySelector("#loadBtn");
const totalField = document.querySelector("#totalField");
const errorField = document.querySelector("#errorField");
const undoBtn = document.querySelector("#undoBtn");
const redoBtn = document.querySelector("#redoBtn");

/* tasks
 * noramlize DB
 * server state vs client state sepration
 * performance re-render optimization - only render state changes
 * distributed systems
 */
// 0. app state (getState, baseDispatch, dispatch)
// middleware logger persist render
// 1. Event
// 2. disptach / undo / redo /applyAction / validateInput / crud
// 3. render
// 4. storeData

// 0. app state
function createApp(initialState, reducer, middlewares = []) {
  let state = initialState;

  function getState() {
    return state;
  }

  function baseDispatch(action) {
    state = reducer(state, action);
    return state;
  }
  const dispatch = middlewares
    .map((mw) => mw({ getState, dispatch: (a) => dispatch(a) }))
    .reduceRight((next, mw) => mw(next), baseDispatch);

  return { getState, dispatch };
}

const emptySet = {
  past: [],
  present: { user: null, entities: { rows: [] } },
  future: [],
};

const logger =
  ({ getState }) =>
  (next) =>
  (action) => {
    console.log("ACTION", action);
    const result = next(action);
    console.log("NEW STATE", getState());
    return result;
  };

const persist =
  ({ getState }) =>
  (next) =>
  (action) => {
    const result = next(action);
    localStorage.setItem("rows", JSON.stringify(getState()));
    return result;
  };

const renderMW =
  ({ getState }) =>
  (next) =>
  (action) => {
    const result = next(action);
    render.renderAll(getState());
    return result;
  };

const app = createApp(emptySet, reducer, [logger, persist, renderMW]);
// 1. Event

document.addEventListener("DOMContentLoaded", (e) => {
  myForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(myForm);
    try {
      let payload = {
        id: crypto.randomUUID(),
        price: validateInput(data.get("price")),
        qty: validateInput(data.get("qty")),
      };
      actionFn({ type: "addRow", payload });
    } catch (err) {
      render.errorField(err.message);
    }
  });
  dataField.addEventListener("change", (e) => {
    const rowEl = e.target.closest(".row");
    if (!rowEl) return;
    try {
      let payload = {
        id: rowEl.dataset.id,
        value: validateInput(e.target.value),
        name: e.target.name,
      };
      actionFn({ type: "updateRow", payload });
    } catch (err) {
      render.errorField(err.message);
    }
  });
  dataField.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const rowEl = e.target.closest(".row");
      if (!rowEl) return;
      let payload = { id: rowEl.dataset.id };
      actionFn({ type: "deleteRow", payload });
    }
  });
  resetBtn.addEventListener("click", () => {});
  loadBtn.addEventListener("click", () => {});
  undoBtn.addEventListener("click", () => {
    actionFn({ type: "undo" });
  });
  redoBtn.addEventListener("click", () => {
    actionFn({ type: "redo" });
  });
});
// 2. disptach / undo / redo /applyAction / validateInput / crud / sumTotal

function actionFn(action) {
  app.dispatch(action);
}
function reducer(state, action) {
  let tempStatePresent = {};
  let tempState = {};
  switch (action.type) {
    case "addRow":
      tempStatePresent = {
        ...state.present,
        entities: {
          ...state.present.entities,
          rows: [...state.present.entities.rows, action.payload],
        },
      };
      return applyAction(state, tempStatePresent);
    case "updateRow":
      tempStatePresent = {
        ...state.present,
        entities: {
          ...state.present.entities,
          rows: state.present.entities.rows.map((row) =>
            row.id === action.payload.id
              ? { ...row, [action.payload.name]: action.payload.value }
              : row,
          ),
        },
      };
      return applyAction(state, tempStatePresent);
    case "deleteRow":
      tempStatePresent = {
        ...state.present,
        entities: {
          ...state.present.entities,
          rows: state.present.entities.rows.filter(
            (row) => row.id !== action.payload.id,
          ),
        },
      };
      return applyAction(state, tempStatePresent);
    case "undo":
      return undo(state);
    case "redo":
      return redo(state);
    default:
      return state;
  }
}
function applyAction(state, tempPresent) {
  return {
    past: [...state.past, state.present],
    present: tempPresent,
    future: [],
  };
}
function undo(state) {
  if (state.past.length === 0) return state;
  const current = state.past[state.past.length - 1];
  return {
    past: state.past.slice(0, -1),
    present: current,
    future: [state.present, ...state.future],
  };
}
function redo(state) {
  if (state.future.length === 0) return state;
  const current = state.future[0];
  return {
    past: [...state.past, state.present],
    present: current,
    future: state.future.slice(1),
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
    throw new Error("Negative is not allowed");
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
// 3. render
const render = {
  dataField(state) {
    console.log("render datafile top line", state);
    console.log(
      "render datafield state breakdown",
      state.present,
      "entities",
      state.present.entities,
    );
    dataField.innerHTML = "";
    console.log("render dataField", state, "rows", state.present.entities.rows);
    state.present.entities.rows.forEach((row) => {
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
    let sum = sumTotal(state.present.entities);
    totalField.innerHTML = `
<p>Total Price :${sum.totalPrice} | Total Qty ${sum.totalQty} </p>
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
// 4. storeData
const storeData = {
  save(state) {
    localStorage.setItem("rows", JSON.stringify(state));
  },
  load() {
    let temp = localStorage.getItem("rows");
    return temp ? JSON.parse(temp) : emptySet;
  },
  reset() {
    localStorage.removeItem("rows");
    return emptySet;
  },
};
render.initialUI(emptySet);
