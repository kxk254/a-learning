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
  saveStorage();
  render();
});
dataField.addEventListener("click", (e) => {
  delegateButton(e);
  render();
});
resetBtn.addEventListener("click", () => {
  resetStorage();
  render();
});
loadBtn.addEventListener("click", () => {
  loadStorage();
  render();
});

// State
// 1. input data
function inputData() {
  try {
    let price = validateData(inputField.querySelector("[name='price']").value);
    let qty = validateData(inputField.querySelector("[name='qty']").value);
    let data = { id: Date.now(), price: price, qty: qty };
    rows = [...rows, data];
  } catch (err) {
    alert(err.message);
  }
}
// 2. validate data
function validateData(input) {
  if (String(input).trim() === "") {
    throw new Error("Empty Value is not allowed");
  }
  const num = Number(input);
  if (!Number.isFinite(num)) {
    throw new Error("Enter a valid number");
  }
  return num;
}
// 3. sum data
function sumData() {
  return rows.reduce(
    (acc, c) => {
      ((acc.totalPrice += Number(c.price)), (acc.totalQty += Number(c.qty)));
      return acc;
    },
    { totalPrice: 0, totalQty: 0 },
  );
}
// 4. delegate button
function delegateButton(e) {
  if (e.target.classList.contains("delete-btn")) {
    const id = Number(e.target.closest(".row").dataset.id);
    rows = rows.filter((row) => row.id !== id);
  }
}

// STORAGE
// 1. save storage
function saveStorage() {
  localStorage.setItem("rows", JSON.stringify(rows));
}
// 2. load storage
function loadStorage() {
  const temp = localStorage.getItem("rows");
  rows = temp ? JSON.parse(temp) : [];
  return rows;
}
// 3. reset storage
function resetStorage() {
  localStorage.removeItem("rows");
}

// UI
// 1. data field
function dataFieldRender() {
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
// 2. input field
function inputFieldRender() {
  inputField.innerHTML = `
    <input type="text" name="price" value=""/>
    <input type="text" name="qty" value=""/>
`;
}

// 3. render Sum
function renderSum() {
  let sum = sumData();
  totalField.innerHTML = `
<p>Total Price: <span>${sum.totalPrice}</span> | Total Quantity: <span>${sum.totalQty}</span></p>
`;
}
// 4. total field
function render() {
  dataFieldRender();
  inputFieldRender();
  renderSum();
}
render();
