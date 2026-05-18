import { initialState } from "../store/initialState.js";
import { sumTotalFromRows } from "../utils/index.js";

const nameFieldHTML = (user) => `<p>ID : ${user.id} | Name : ${user.name}`;
const dataFieldHTML = (data) => `
<input type="text" name="price" value="${data.price}"/>
<input type="text" name="qty" value="${data.qty}"/>
<button type="button" class="delete-btn">DEL</button>
`;
const inputFieldHTML = `
<input type="text" name="price" value=""/>
<input type="text" name="qty" value=""/>
`;
const totalFieldHTML = (sum) =>
  `<p>Total Price :${sum.totalPrice} | Total Qty : ${sum.totalQty} </p>`;

export const render = {
  nameFieldRender(state) {
    let user = state.present.user;
    if (!user || user === null || user === undefined) {
      nameField.textContent = "No User Defined";
    } else {
      nameField.innerHTML = nameFieldHTML(user);
    }
  },
  dataFieldRender(state) {
    let rows = state.present.entities.rows;
    dataField.innerHTML = "";
    rows.forEach((row) => {
      const div = document.createElement("div");
      div.dataset.id = row.id;
      div.className = "row";
      div.innerHTML = dataFieldHTML(row);
      dataField.appendChild(div);
    });
  },
  inputFieldRender() {
    inputField.innerHTML = inputFieldHTML;
  },
  errorFieldRender(message) {
    errorField.textContent = message;
    errorField.classList.add("red");
  },
  cleanErrorField() {
    errorField.textContent = "";
    errorField.classList.remove("red");
  },
  totalFieldRender(state) {
    let sum = sumTotalFromRows(state.present.entities.rows);
    totalField.innerHTML = totalFieldHTML(sum);
  },
  initialUI(state) {
    this.nameFieldRender(state);
    this.inputFieldRender();
    this.totalFieldRender(state);
    this.cleanErrorField();
  },
  renderAll(state) {
    this.dataFieldRender(state);
    this.initialUI(state);
  },
};
