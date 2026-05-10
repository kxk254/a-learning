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
}
