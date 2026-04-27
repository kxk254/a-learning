const dataField = document.querySelector("#dataField");
const inputField = document.querySelector("#inputField");
const myForm = document.querySelector("#myForm");
const resetBtn = document.querySelector("#resetBtn");
const loadBtn = document.querySelector("#loadBtn");
const totalField = document.querySelector("#totalField");

// object
let rows = [];

// Event

// submit - input - validation (try error) - save - render
myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  dataInput();
  render();
});
// reset - delete - render
resetBtn.addEventListener("click", () => {
  deleteStorage();
  render();
});
// load - load - render
loadBtn.addEventListener("click", () => {
  loadStorage();
  render();
});
// event delegation
dataField.addEventListener("click", (e) => {
  delegateHandler(e);
  render();
});

// State - Data

// input
function dataInput() {
  try {
    const inputPrice = inputField.querySelector("[name='price']").value;
    const inputQty = inputField.querySelector("[name='qty']").value;
    const row = { id: Date.now(), price: inputPrice, qty: inputQty };
    rows = [...rows, row];
    saveStorage();
  } catch (err) {
    alert(err.message);
  }
}
// validation
function validateInput(value) {
  if (String(value).trim() === "") {
    throw new Error("Do not input empty value");
  }
  const num = Number(value);
  if (!Number.isFinite(num)) {
    throw new Error("Input a valid number");
  }
  return num;
}
// calculate sum
function calcTotal() {
  return rows.reduce(
    (acc, e) => {
      ((acc.totalPrice += Number(e.price)), (acc.totalQty += Number(e.qty)));
      return acc;
    },
    { totalPrice: 0, totalQty: 0 },
  );
}
// delegate and delete item

function delegateHandler(e) {
  if (e.target.classList.contains("delete-btn")) {
    const id = Number(e.target.closest(".row").dataset.id);
    rows = rows.filter((row) => row.id !== id);
    saveStorage();
  }
}

// 1. create local Storage
function saveStorage() {
  localStorage.setItem("rows", JSON.stringify(rows));
}
// 3. load storage
function loadStorage() {
  const store = localStorage.getItem("rows");
  rows = store ? JSON.parse(store) : [];
  return rows;
}
// 4. delete storage
function deleteStorage() {
  localStorage.removeItem("rows");
  rows = [];
}

// UI
// render dataField
function renderDataField() {
  dataField.innerHTML = "";
  rows.forEach((e) => {
    const div = document.createElement("div");
    div.className = "row";
    div.dataset.id = e.id;
    div.innerHTML = `
<input type="text" name="price" value="${e.price}"/>
<input type="text" name="price" value="${e.qty}"/>
<button type="button" class="delete-btn">DEL</button>
		`;
    dataField.appendChild(div);
  });
}
// render inputField
function renderInputField() {
  inputField.innerHTML = `
<input type="text" name="price" value=""/>
<input type="text" name="qty" value=""/>
		`;
}
function renderTotal() {
  const result = calcTotal();
  totalField.innerHTML = `
<p>Total Price: <span>${result.totalPrice}</span> | Total Quantity: <span>${result.totalQty}</span></p>
`;
}
// render
function render() {
  renderDataField();
  renderInputField();
  renderTotal();
}
render();
