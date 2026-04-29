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
A. Event 1. (form - submit) 2.(data field - del / update) 3. (buttons - reset / load) 
B. State 1 (Input Data / validate Input) 2. (sumTotal) 3,(delegate - delete / edit) 4. (crud) 
C. 1. (commit) 2. (history) 3. (currentIndex)
D. Side effects 
1. (storage - save/load/reset) 2. (DOM partual updates)
E. UI 1. (input field) 2. (data field - all by id) 3. (sum total) 
 */
// object
let rows = [];

// Event
myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  inputData();
});
// update input
dataField.addEventListener("change", (e) => {
  editableInput(e);
});
// delete delgator
dataField.addEventListener("click", (e) => {
  delegateDeleteButton(e);
});
resetBtn.addEventListener("click", () => {
  resetStorage();
});
loadBtn.addEventListener("click", () => {
  loadStorage();
});

// Data State
// 1. input data
function inputData() {
  try {
    let price = validateInput(inputField.querySelector("[name='price']").value);
    let qty = validateInput(inputField.querySelector("[name='qty']").value);
    let data = crud.create(price, qty);
    rows = [...rows, data];
    saveStorage();
    renderDataField();
    renderInputField();
    renderTotalField();
  } catch (err) {
    alert(err.message);
  }
}
// 2. validate input
function validateInput(input) {
  if (String(input).trim() === "") {
    throw new Error("Empty value is not allowed");
  }
  const num = Number(input);
  if (!Number.isFinite(num)) {
    throw new Error("Enter a valid input");
  }
  return num;
}
// 3. sum total
function sumTotal() {
  return rows.reduce(
    (acc, row) => {
      acc.totalPrice += Number(row.price);
      acc.totalQty += Number(row.qty);
      return acc;
    },
    { totalPrice: 0, totalQty: 0 },
  );
}
// 4. delegate delete button
function delegateDeleteButton(e) {
  if (e.target.classList.contains("delete-btn")) {
    const rowEl = e.target.closest(".row");
    if (!rowEl) return;
    const id = Number(rowEl.dataset.id);
    crud.delData(id);
    saveStorage();
    renderDataField();
    renderTotalField();
  }
}
// 5. editable input
function editableInput(e) {
  const rowEl = e.target.closest(".row");
  if (!rowEl) return;
  const id = rowEl.dataset.id;
  const name = e.target.name;
  const value = validateInput(e.target.value.trim());
  console.log("editing id:", id, "name", name, "value", value);
  crud.update(id, name, value);
  saveStorage();
  renderDataField();
  renderTotalField();
}
// 6. data operator
const crud = {
  create(p, q) {
    const temp = { id: Date.now(), price: p, qty: q };
    const data = temp ? temp : [];
    return data;
  },
  read() {},
  update(id, name, value) {
    rows = rows.map((row) =>
      row.id === Number(id) ? { ...row, [name]: Number(value) } : row,
    );
  },

  delData(id) {
    rows = rows.filter((row) => row.id !== id);
    return rows;
  },
};
// LOCALSTORAGE
// 1. save storage
function saveStorage() {
  console.log("save store", rows);
  localStorage.setItem("rows", JSON.stringify(rows));
}
// 2. load storage
function loadStorage() {
  let temp = localStorage.getItem("rows");
  rows = temp ? JSON.parse(temp) : [];
  console.log("load ", rows);
  renderDataField();
  renderTotalField();
  return rows;
}
// 3. reset storage
function resetStorage() {
  localStorage.removeItem("rows");
  rows = [];
  renderDataField();
  renderTotalField();
  return rows;
}

// UI
// 1. daia field
function renderDataField() {
  dataField.innerHTML = "";
  rows.forEach((row) => {
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
// 2. input field
function renderInputField() {
  inputField.innerHTML = `
<input type="text" name="price" value=""/>
<input type="text" name="qty" value=""/>
`;
}
// 3. total field
function renderTotalField() {
  let sum = sumTotal();
  totalField.innerHTML = `
<p>Total Price :<span>${sum.totalPrice}</span> | Total Qty: <span>${sum.totalQty}</span></p>
	`;
}
renderInputField();
