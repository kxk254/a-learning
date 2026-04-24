const inputField = document.querySelector("#inputField");
const newInputField = document.querySelector("#newInputField");
const myform = document.querySelector("#myform");
const save = document.querySelector("#save");
const deleteBtn = document.querySelector("#delete");
const retreive = document.querySelector("#retreive");
const sumField = document.querySelector("#sumField");

// object
let rows = [];

//  events
myform.addEventListener("submit", (e) => {
  e.preventDefault();
  try {
    const price = inputValidate(
      newInputField.querySelector("[name='price']").value,
    );
    const qty = inputValidate(
      newInputField.querySelector("[name='qty']").value,
    );

    const newRow = { id: Date.now(), price: price, qty: qty };
    rows.push(newRow);
    render();
    saveStorage();
    rows.forEach((e) => {
      console.log(e.id, e.price, e.qty);
    });
  } catch (err) {
    alert(err.message);
    return;
  }
});
save.addEventListener("click", () => {
  saveStorage();
});
deleteBtn.addEventListener("click", () => {
  deleteStorage();
  render();
});
retreive.addEventListener("click", () => {
  rows = retreiveStorage();
  render();
});
inputField.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const id = Number(e.target.closest(".row").dataset.id);
    rows = rows.filter((row) => row.id !== id);
    render();
    saveStorage();
  }
});

// data state

function saveStorage() {
  localStorage.setItem("rows", JSON.stringify(rows));
}

function deleteStorage() {
  localStorage.removeItem("rows");
  rows = [];
}

function retreiveStorage() {
  try {
    return JSON.parse(localStorage.getItem("rows")) || [];
  } catch {
    return [];
  }
}

function sumAll() {
  return rows.reduce(
    (acc, e) => {
      acc.totalPrice += Number(e.price);
      acc.totalQty += Number(e.qty);
      return acc;
    },
    { totalPrice: 0, totalQty: 0 },
  );
}

// data validation
function inputValidate(input) {
  if (String(input).trim() === "") {
    throw new Error("Input cannot be empty");
  }
  const num = Number(input);
  if (!Number.isFinite(num)) {
    throw new Error("Please input a valid number");
  }
  return num;
}

// UI
function renderData(data) {
  inputField.innerHTML = "";
  data.forEach((e) => {
    const div = document.createElement("div");
    div.className = "row";
    div.dataset.id = e.id;
    div.innerHTML = `
<input name="price" value="${e.price}"/>
<input name="qty" value="${e.qty}"/>
<button type="button" class="delete-btn">delete</button>
`;
    inputField.appendChild(div);
  });
}

function renderEmptyRow() {
  newInputField.innerHTML = "";
  const div = document.createElement("div");
  div.className = "row";
  div.innerHTML = `
<input name="price" value=""/>
<input name="qty" value=""/>
`;
  newInputField.appendChild(div);
}
function render() {
  renderData(rows);
  renderEmptyRow();
  sumRender();
}
function sumRender() {
  const sum = sumAll();
  sumField.innerHTML = `
	<span>${sum.totalPrice}</span>
	<span>${sum.totalQty}</span>`;
}
renderEmptyRow();
