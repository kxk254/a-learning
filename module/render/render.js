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
