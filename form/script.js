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
});
// update input
dataField.addEventListener("change", (e) => {});
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
    let data = { id: Date.now(), price: price, qty: qty };
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
    let rowEl = e.target.closest(".row");
    if (!rowEl) return;
    const id = Number(rowEl.dataset.id);
    rows = rows.filter((row) => row.id !== id);
    saveStorage();
    renderDataField();
    renderTotalField();
  }
}
// 5. editable input
function editableInput(e) {}
// 6. data operator
const ops = {};
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
	<button type="button" class="delete-btn">DEL<b/button>
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
