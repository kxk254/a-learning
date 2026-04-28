const dataField = document.querySelector("#dataField");
const inputField = document.querySelector("#inputField");
const myForm = document.querySelector("#myForm");
const resetBtn = document.querySelector("#resetBtn");
const loadBtn = document.querySelector("#loadBtn");
const totalField = document.querySelector("#totalField");

// object
let rows = [];

// Event
myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  inputData();
  render();
});
dataField.addEventListener("click", (e) => {
  delegateHandler(e);
  saveStorage();
  renderTotalField();
});
dataField.addEventListener("change", (e) => {
  try {
    const rowEl = e.target.closest(".row");
    if (!rowEl) return;
    const id = Number(rowEl.dataset.id);
    const row = rows.find((row) => row.id === id);
    const value = validateInput(e.target.value.trim());

    row[e.target.name] = value;
    saveStorage();
    renderTotalField();
  } catch (err) {
    alert(err.message);
  }
});
resetBtn.addEventListener("click", () => {
  resetStorage();
  render();
});
loadBtn.addEventListener("click", () => {
  loadStorage();
  render();
});
// Status
// 0. data layer
const store = {
  create(data) {
    rows = [...rows, data];
  },
  read() {
    return rows;
  },
  update(id, changes) {
    const row = rows.find((row) => row.id === id);
    if (!row) return;
    Object.assign(row, changes);
  },
  delete(id) {
    rows = rows.filter((row) => row.id !== id);
  },
};
// 1. input data
function inputData() {
  try {
    let price = validateInput(inputField.querySelector("[name='price']").value);
    let qty = validateInput(inputField.querySelector("[name='qty']").value);
    let data = { id: Date.now(), price: price, qty: qty };
    rows = [...rows, data];
    saveStorage();
    return rows;
  } catch (err) {
    alert(err.message);
  }
}
// 2. validate input
function validateInput(value) {
  if (String(value).trim() === "") {
    throw new Error("Do not input Empty Value");
  }
  let num = Number(value);
  if (!Number.isFinite(num)) {
    throw new Error("Please input a valid number");
  }
  return num;
}
// 3. sum data
function sumData() {
  return rows.reduce(
    (acc, c) => {
      acc.totalPrice += Number(c.price);
      acc.totalQty += Number(c.qty);
      return acc;
    },
    { totalPrice: 0, totalQty: 0 },
  );
}
// 4. delegate handler
function delegateHandler(e) {
  if (e.target.classList.contains("delete-btn")) {
    const id = Number(e.target.closest(".row").dataset.id);
    rows = rows.filter((row) => row.id !== id);
  }
}

// Storage
function saveStorage() {
  localStorage.setItem("rows", JSON.stringify(rows));
}
function loadStorage() {
  let temp = localStorage.getItem("rows");
  rows = temp ? JSON.parse(temp) : [];
  console.log("load", rows);
  return rows;
}
function resetStorage() {
  localStorage.removeItem("rows");
  rows = [];
  return rows;
}

// UI
// 1. render data field
function renderDataField() {
  dataField.innerHTML = "";
  rows.forEach((e) => {
    const div = document.createElement("div");
    div.className = "row";
    div.dataset.id = e.id;
    div.innerHTML = `
	<input type="text" name="price" value="${e.price}"/>
	<input type="text" name="qty" value="${e.qty}"/>
	<button type="button" class="delete-btn">DEL</button>
	`;
    dataField.appendChild(div);
  });
}
// 2. render input field
function renderInputField() {
  inputField.innerHTML = `
<input type="text" name="price" value=""/>
<input type="text" name="qty" value=""/>
`;
}
// 3. render total field
function renderTotalField() {
  let sum = sumData();
  totalField.innerHTML = `
<p>Total Price: <span>${sum.totalPrice}</span> | Total Qty: <span>${sum.totalQty}</span></p>
`;
}
// 4. total render
function render() {
  renderDataField();
  renderInputField();
  renderTotalField();
}

render();
