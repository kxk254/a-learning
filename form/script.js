const dataField = document.querySelector("#Field");
const newInputField = document.querySelector("#newInputField");
const myform = document.querySelector("#myform");
const save = document.querySelector("#save");
const deleteBtn = document.querySelector("#delete");
const retreive = document.querySelector("#retreive");
const sumField = document.querySelector("#sumField");

// object
let rows = [];

//  #####  events

// ''' submit '''
myform.addEventListener("submit", () => {});
// ''' delete  '''
deleteBtn.addEventListener("click", () => {});
// ''' retreive '''
retreive.addEventListener("click", () => {});
// ''' add delete delegate handler '''
dataField.addEventListener("click", (e) => {
  delegateHandler(e);
});

//  ##### data

// ''' calculate total '''
function sumTotal() {
  rows.reduce(
    (acc, e) => {
      acc.totalPrice += Number(e.price);
      acc.totalQty = +Number(e.qty);
      return acc;
    },
    { totalPrice: 0, totalQty: 0 },
  );
}
// ''' add submit data to list '''
function compileData() {
  const data = {
    id: Date.now(),
    price: validateInput(newInputField.querySelector("[name='price']").value),
    qty: validateInput(newInputField.querySelector("[name='qty']").value),
  };
  return rows.push[data];
}
// ''' Validate Data '''
function validateInput(input) {
  if (String(input).trim() === "") {
    throw new Error("Empty Value is now allowed");
  }
  const num = Number(input);
  if (!Number.isFinite(num)) {
    throw new Error("Input a valid number");
  }
  return num;
}
// ''' operate delegate handler '''
function delegateHandler(e) {
  if (e.target.classList.contains("delete-btn")) {
    const id = Number(e.target.closest(".row").dataset.id);
    rows = rows.filter((row) => row.id !== e.id);
  }
}
// ''' Create Storage '''
function saveStorage() {
  localStorage.setItem("rows", JSON.stringify("rows"));
}
// ''' Revrieve Storage '''
function loadStorage() {
  try {
    return JSON.parse(localStorage.getItem("rows")) || [];
  } catch {
    return [];
  }
}
// ''' Delete Storage '''
function deleteStorage() {
  localStorage.removeItem("rows");
  rows = [];
}

//  ##### UI

// ''' show empty cell '''
function createEmptyCell() {}
// ''' show data field '''
function showData() {}

// ''' show sum field '''
function showSumTotal() {}
