import { sumTotalFromRows } from "../utils/sumTotalFromRows.js";

const nameFieldHTML = (user) => `ID: ${user.id} | NAME: ${user.name}`;
const dataFieldHTML = (data) => `
<input type="text" name="price" value="${data.id}"\>
<input type="text" name="price" value="${data.price}"\>
<input type="text" name="qty" value="${data.qty}"\>
<button type="button" class="delete-btn">DEL</button>
`;
const totalFieldHTML = (sum) =>
  `Total Price : ${sum.totalPrice} | Total Qty : ${sum.totalQty}`;
const inputFieldHTML = `
<input type="text" name="price" value=""\>
<input type="text" name="qty" value=""\>
`;

export const render = {
  nameFieldRender(state) {
    if (!state || !state.present.user || state.present.user == undefined) {
      nameField.textContent = "No User Defined";
    } else {
      const user = state.present.user;
      nameField.textContent = nameFieldHTML(user);
    }
  },
  dataFieldRender(state) {
    const rows = state.present.entities.rows;
    if (!rows) return;
    dataField.innerHTML = "";
    rows.forEach((row) => {
      const div = document.createElement("div");
      div.dataset.id = row.id;
      div.className = "row";
      div.innerHTML = dataFieldHTML(row);
      dataField.appendChild(div);
    });
  },
  errorFieldRender(message) {
    errorField.textContent = message;
    errorField.classList.add("red");
  },
  inputFieldRender() {
    inputField.innerHTML = inputFieldHTML;
  },
  totalFieldRender(state) {
    const sum = sumTotalFromRows(state.present.entities.rows);
    if (!sum) return;
    totalField.innerHTML = totalFieldHTML(sum);
  },
  clearErrorField() {
    errorField.textContent = "";
    errorField.classList.remove("red");
  },
  initialUI(state) {
    this.clearErrorField();
    this.nameFieldRender(state);
    this.inputFieldRender();
    this.totalFieldRender(state);
  },
  renderAll(state) {
    this.initialUI(state);
    this.dataFieldRender(state);
  },
};
