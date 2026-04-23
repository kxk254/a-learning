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
  const row = newInputField.querySelector(".row");
  const price = inputValidate(row.querySelector("input[name='price']").value);
  const qty = inputValidate(row.querySelector("input[name='qty']").value);

  const newRow = { id: Date.now(), price: Number(price), qty: Number(qty) };
  rows.push(newRow);
  render();
  saveStorage();
  rows.forEach((e) => {
    console.log(e.id, e.price, e.qty);
  });
});
save.addEventListener("click", () => {
  saveStorage();
});
deleteBtn.addEventListener("click", () => {
  deleteStorage();
  render();
});
retreive.addEventListener("click", () => {
  rows = [];
  rows = retreiveStorage();
  render();
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
  const retreiveRows = JSON.parse(localStorage.getItem("rows"));
  return retreiveRows || [];
}

function sumAll() {
  return rows.reduce(
    (acc, e) => {
      acc.sumA += e.price;
      acc.sumB += e.qty;
      return acc;
    },
    { sumA: 0, sumB: 0 },
  );
}

// data validation
function inputValidate(input) {
  if (input.trim() === "") {
    alert("Input cannot be empty");
  }
  const num = Number(input);
  if (!Number.isFinite(num)) {
    alert("please input valid numbers");
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
    div.querySelector(".delete-btn").addEventListener("click", () => {
      rows = rows.filter((row) => row.id !== e.id);
      render();
      saveStorage();
    });
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
  sumField.innerHTML = "";
  const spanA = document.createElement("span");
  spanA.innerHTML = `
	<span>${sum.sumA}</span>
	<span>${sum.sumB}</span>`;
  sumField.appendChild(spanA);
}
render();
