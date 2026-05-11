import { validateInputToNumber } from "../utils/validateInputToNumber.js";
import { render } from "../render/index.js";
import { loadMockData, loadDataThunk } from "../store/index.js";

export function setupHandlers(app) {
  document.addEventListener("DOMContentLoaded", (e) => {
    const dataField = document.querySelector("#dataField");
    const inputField = document.querySelector("#inputField");
    const myForm = document.querySelector("#myForm");
    const resetBtn = document.querySelector("#resetBtn");
    const loadBtn = document.querySelector("#loadBtn");
    const totalField = document.querySelector("#totalField");
    const errorField = document.querySelector("#errorField");
    const undoBtn = document.querySelector("#undoBtn");
    const redoBtn = document.querySelector("#redoBtn");
  });
  let payload = {};
  myForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(myForm);
    try {
      payload = {
        id: crypto.randomUUID(),
        price: validateInputToNumber(data.get("price")),
        qty: validateInputToNumber(data.get("qty")),
      };
      app.dispatch({ type: "addRow", payload });
    } catch (err) {
      render.errorFieldRender(err.message);
    }
  });
  dataField.addEventListener("change", (e) => {
    const rowEl = e.target.closest(".row");
    if (!rowEl) return;
    payload = {
      id: rowEl.dataset.id,
      name: e.target.name,
      value: e.target.value,
    };
    app.dispatch({ type: "updateRow", payload });
  });
  dataField.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const rowEl = e.target.closest(".row");
      if (!rowEl) return;
      payload = { id: rowEl.dataset.id };
      app.dispatch({ type: "deleteRow", payload });
    }
  });
  resetBtn.addEventListener("click", () => {
    app.dispatch({ type: "resetData" });
  });
  loadBtn.addEventListener("click", () => {
    console.log("clicked load button");
    try {
      app.dispatch(loadDataThunk());
    } catch (err) {
      render.errorFieldRender(err.message);
    }
  });
  undoBtn.addEventListener("click", () => {
    app.dispatch({ type: "undo" });
  });
  redoBtn.addEventListener("click", () => {
    app.dispatch({ type: "redo" });
  });
}
