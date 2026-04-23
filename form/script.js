const inputField = document.querySelector("#inputField");
const newInputField = document.querySelector("#newInputField");
// object
let rows = [
  { id: 1, price: 20, qty: 3 },
  { id: 2, price: 15, qty: 2 },
  { id: 3, price: 30, qty: 5 },
];

//  events

// data state

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

renderData(rows);
renderEmptyRow();
