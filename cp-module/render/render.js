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
	<input type="text" name="price" value="${row.price}"/>
	<input type="text" name="qty" value="${row.qty}"/>
	<button type="button" class="delete-btn">DEL</button>`;
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
  nameFieldRender(state) {
    const name = state.present.user;
    console.log("name in render", name);
    if (name === undefined || name === null) {
      nameField.textContent = "no user logged in";
    } else {
      nameField.textContent = `${name.id} | ${name.name}`;
    }
  },
  renderAll(state) {
    this.nameFieldRender(state);
    this.dataFieldRender(state);
    this.inputFieldRender();
    this.totalFieldRender(state);
    this.clearErrorField();
  },
  initalUI(state) {
    this.nameFieldRender(state);
    this.inputFieldRender();
    this.totalFieldRender(state);
  },
};
