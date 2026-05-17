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
    let userinfo = state.present.user;
    nameField.innerHTML = nameFieldHTML(userinfo);
  },
  dataFieldRender(state) {
    let rows = state.present.entities.rows;
    dataField.innerHTML = "";
    rows.forEach((row) => {
      const div = document.createElement("div");
      div.dataset.id = row.id;
      div.className = "row";
      div.innherHTML = dataFieldHTML(row);
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
    console.log("total field render sum", state);
    let rows = state.present.entities.rows;
    let sum = sumTotalFromRows(rows);
    totalField.innerHTML = totalFieldHTML(sum);
  },
  cleanErrorField() {
    errorField.classList.remove("red");
    errorField.textContent = "";
  },
  initialUI(state) {
    this.inputFieldRender();
    this.totalFieldRender(initialState);
    this.cleanErrorField();
  },
  renderAll(state) {
    this.cleanErrorField();
    this.nameFieldRender(state);
    this.dataFieldRender(state);
    this.inputFieldRender();
    this.totalFieldRender(state);
  },
};
