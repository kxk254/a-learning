const dataField = document.querySelector("#dataField");
const newInputField = document.querySelector("#newInputField");
const myForm = document.querySelector("#myForm");
const save = document.querySelector("#save");
const deleteBtn = document.querySelector("#delete");
const retreive = document.querySelector("#retreive");
const totalField = document.querySelector("#totalField");

// object
let rows = [];

//  #####  events

// ''' submit '''
myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  compileData();
  saveStorage();
  showData();
});
// ''' delete  '''
deleteBtn.addEventListener("click", () => {
  deleteStorage();
});
// ''' retreive '''
retreive.addEventListener("click", () => {
  rows = loadStorage();
});
// ''' add delete delegate handler '''
dataField.addEventListener("click", (e) => {
  delegateHandler(e);
});

//  ##### data

// ''' calculate total '''
function sumTotal() {
  return rows.reduce(
    (acc, e) => {
      acc.totalPrice += Number(e.price);
      acc.totalQty += Number(e.qty);
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
  console.log("data-compile :", data);
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
  localStorage.setItem("rows", JSON.stringify(rows));
}
// ''' Revrieve Storage '''
function loadStorage() {
  try {
    rows = JSON.parse(localStorage.getItem("rows") || []);
    return rows;
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
function createEmptyCell() {
  newInputField.innerHTML = `
<input type="text" name="price" value=""/>
<input type="text" name="qty" value=""/>
`;
  showSumTotal();
}
// ''' show data field '''
function showData() {
  loadStorage();
  dataField.innerHTML = "";
  rows.forEach((e) => {
    const div = document.createElement("div");
    div.className = "row";
    div.dataset.id = e.id;
    div.innerHTML = `
<input type="text" name="price" value="${e.price}"/>
<input type="text" name="qty"  value="${e.qty}"/>
<button type="button" name="delete-btn">DEL</button>
		`;
    dataField.appendChild(div);
  });
}

// ''' show sum field '''
function showSumTotal() {
  const sum = sumTotal();
  totalField.innerHTML = `
<p> Total Price: <span>${sum.totalPrice}</span> Total Qty: <span>${sum.totalQty}</span></p>
`;
}
createEmptyCell();
