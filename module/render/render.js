import { initialState } from "../store/initialState.js";
import { sumTotalFromRows } from "../utils/index.js";

export const render = {
  dataFieldRender(state) {
    dataField.innerHTML = "";
    state.present.entities.rows.forEach((row) => {
      const div = document.createElement("div");
      div.dataset.id = row.id;
      div.className = "row";
      div.innerHTML = `
<input type="text" name="price" value=""/>
<input type="text" name="qty" value=""/>`;
      dataField.appendChild(div);
    });
  },
  inputFieldRender() {
    inputField.innerHTML = `
<input type="text" name="price" value=""/>
<input type="text" name="qty" value=""/>
`;
  },
  totalFieldRender(state) {
    const sum = sumTotalFromRows(state.present.entities.rows);
    totalField.innerHTML = `
<p>Total Price : ${sum.totalPrice} | Total Qty : ${sum.totalQty} </p>
	  `;
  },
  errorFieldRender(message) {
    errorField.textContent = message;
    errorField.classList.add("red");
  },
  clearErrorField() {
    errorField.textContent = "";
    errorField.classList.remove("red");
  },
  renderAll(state) {
    this.dataFieldRender(state);
    this.inputFieldRender();
    this.totalFieldRender(state);
    this.clearErrorField();
  },
  initalUI(initialState) {
    this.inputFieldRender();
    this.totalFieldRender(initialState);
  },
};
