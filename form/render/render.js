import { sumTotalFromRows } from "../utils/sumTotalFromRows.js";
import { getVisibleRows } from "../store/index.js";

const nameFieldHTML = (user) => `ID: ${user.id} | NAME: ${user.name}`;
const dataFieldHTML = (row) => `
<div class="row" draggable="true" data-id="${row.id}">
<span class-"drag-handle">≡</span>
<span class="row-id">${row.id}</span>
<input type="text" name="price" value="${row.price}" class="price-input"\>
<input type="text" name="qty" value="${row.qty}" class="qty-input"\>
<button type="button" class="delete-btn">DEL</button>
</div>
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
    const rows = getVisibleRows(state);
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
  controlsField(state) {
    const uiState = state.present.ui;
    searchInput.value = uiState.searchTerm;
    sortSelect.value = uiState.sortBy;
  },
  initialUI(state) {
    this.clearErrorField();
    this.nameFieldRender(state);
    this.inputFieldRender();
    this.totalFieldRender(state);
    this.controlsField(state);
  },
  renderAll(state) {
    this.initialUI(state);
    this.dataFieldRender(state);
  },
};
