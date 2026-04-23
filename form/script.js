const inputField = document.querySelector("#inputField");
const newInputField = document.querySelector("#newInputField");
const myform = document.querySelector("#myform");
const save = document.querySelector("#save");
const deleteBtn = document.querySelector("#delete");
const retreive = document.querySelector("#retreive");

// object
let rows = [];

//  events
myform.addEventListener("submit", (e) => {
  e.preventDefault();
  const row = newInputField.querySelector(".row");
  const price = row.querySelector("input[name='price']").value;
  const qty = row.querySelector("input[name='qty']").value;

  const newRow = { id: Date.now(), price: Number(price), qty: Number(qty) };
  rows.push(newRow);
  renderData(rows);
  renderEmptyRow();
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
  return retreiveRows;
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
}
render();
