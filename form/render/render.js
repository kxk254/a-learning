import { sumTotalFromRows } from "../utils/sumTotalFromRows.js";
import { getVisibleRows } from "../store/index.js";

const nameFieldHTML = (user) => `ID: ${user.id} | NAME: ${user.name}`;
const dataFieldHTML = (row) => `
<span class="drag-handle">≡</span>
<span class="row-id">${row.id}</span>
<span class="editable price" data-name="price">${row.price}</span>
<span class="editable qty" data-name="qty">${row.qty}</span>
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
    const existingRows = new Map();

    if (document.querySelector(".editable.editing")) {
      return;
    }

    // Step 1: Collect current DOM rows
    document.querySelectorAll(".row").forEach((el) => {
      existingRows.set(el.dataset.id, el);
    });

    // Step 2: Clear container only once
    const fragment = document.createDocumentFragment();

    rows.forEach((row) => {
      let rowEl = existingRows.get(row.id);
      if (rowEl) {
        const priceSpan = rowEl.querySelector('[data-name="price"]');
        const qtySpan = rowEl.querySelector('[data-qty="qty"]');
        if (priceSpan) priceSpan.textContent = row.price;
        if (qtySpan) qtySpan.textContent = row.qty;
      } else {
        rowEl = document.createElement("div");
        rowEl.dataset.id = row.id;
        rowEl.className = "row";
        rowEl.draggable = true;
        rowEl.innerHTML = dataFieldHTML(row);
      }
      fragment.appendChild(rowEl);
    });
    dataField.innerHTML = "";
    dataField.appendChild(fragment);
  },

  // Error Field
  errorFieldRender(message) {
    errorField.textContent = message;
    errorField.classList.add("red");
  },
  inputFieldRender() {
    inputField.innerHTML = inputFieldHTML;
  },
  totalFieldRender(state) {
    console.log("total field render state", state);
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
