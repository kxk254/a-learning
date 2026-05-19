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
    let data = new FormData(myForm);
    try {
      payload = {
        id: Math.random().toString(32).slice(2),
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
    try {
      payload = {
        id: rowEl.dataset.id,
        name: e.target.name,
        value: validateInputToNumber(e.target.value),
      };
      app.dispatch({ type: "updateRow", payload });
    } catch (err) {
      render.errorFieldRender(err.message);
    }
  });
  dataField.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
      const rowEl = e.target.closest(".row");
      if (!rowEl) return;
      try {
        payload = {
          id: rowEl.dataset.id,
        };
        app.dispatch({ type: "deleteRow", payload });
      } catch (err) {
        render.errorFieldRender(err.message);
      }
    }
  });
  resetBtn.addEventListener("click", () => {
    app.dispatch({ type: "reset" });
  });
  loadBtn.addEventListener("click", () => {
    try {
      app.dispatch(loadDataThunk());
    } catch (erro) {
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
