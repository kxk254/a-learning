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
  myForm.addEventListener("submit", (e) => {});
  dataField.addEventListener("change", (e) => {});
  dataField.addEventListener("click", (e) => {});
  resetBtn.addEventListener("click", () => {});
  loadBtn.addEventListener("click", () => {});
});

function dispatch(action) {}

function validateInput(input) {}

const crud = {
  getState() {
    return app.getState();
  },
  addRow() {
    const state = this.getState();
    const newState = {
      ...state,
      rows: [
        ...rows,
        { id: payload.id, price: payload.price, qty: payload.qty },
      ],
    };
    return newState;
  },
  updateRow(payload) {
    const state = this.getState();
    const newState = {
      ...state,
      rows: state.rows.map((row) =>
        row.id === Number(payload.id)
          ? { ...row, [payload.name]: Number(payload.value) }
          : { row },
      ),
    };
    return newState;
  },
  deleteRow() {
    const state = this.getState();
    const newState = {
      ...state,
      rows: state.rows.filter((row) => row.id !== Number(payload.id)),
    };
    return newState;
  },
  sumTotal() {
    const state = this.getState();
    return state.rows.reducer(
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
    const sum = sumTotal(state);
    totalField.innerHTML = `
<p>Total Price : ${sum.totalPrice} | Total Qty ${sum.totalQty} </p>
	  `;
  },
  errorField() {},
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
    return temp ? JSON.parge(temp) : { rows: [] };
  },
  reset() {
    localStorage.removeItem("row");
    return { rows: [] };
  },
};
