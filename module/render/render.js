import { initialState } from "../store/initialState.js";
import { sumTotalFromRows } from "../utils/index.js";

const dfHTML = (row) => `
	<input type="text" name="price" value="${row.price}"/>
	<input type="text" name="qty" value="${row.qty}"/>
	<button type="button" class="delete-btn">DEL</button>
	`;

const inputHTML = `
	<input type="text" name="price" value=""/>
	<input type="text" name="qty" value=""/>
	`;

const sumTotalHTML = (sum) =>
  `<p>Total Price :${sum.totalPrice} | Total Qty :${sum.totalQty}</p>`;

const nameFieldHTML = (user) =>
  `<p> ID No : ${user.id} | User Name :${user.name}</p>`;

export const render = {
  dataFieldRender(state) {
    const rows = state.present.entities.rows;
    dataField.innerHTML = "";
    rows.forEach((row) => {
      const div = document.createElement("div");
      div.dataset.id = row.id;
      div.className = "row";
      div.innerHTML = dfHTML(row);
      dataField.appendChild(div);
    });
  },
  inputFieldRender() {
    console.log("inputField", inputHTML);
    inputField.innerHTML = inputHTML;
  },
  totalFieldRender(state) {
    const sum = sumTotalFromRows(state.present.entities.rows);
    totalField.innerHTML = sumTotalHTML(sum);
  },
  errorFieldRender(message) {
    errorField.textContent = message;
    errorField.classList.add("red");
  },
  nameFieldRender(state) {
    const user = state.present.user;
    if (!user) {
      nameField.textContent = "No User Data Available";
    } else {
      nameField.innerHTML = nameFieldHTML(user);
    }
  },
  cleanErrorField() {
    errorField.textContent = "";
    errorField.classList.remove("red");
  },
  renderAll(state) {
    console.log("render All", state);
    this.dataFieldRender(state);
    this.inputFieldRender();
    this.totalFieldRender(state);
    this.cleanErrorField();
    this.nameFieldRender(state);
  },
  initialUI(state) {
    console.log("initial UI", state);
    this.inputFieldRender();
    this.totalFieldRender(state);
    this.cleanErrorField();
    this.nameFieldRender(state);
  },
};
