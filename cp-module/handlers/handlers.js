import { validateInputToNumber } from "../utils/validateInputToNumber.js";
import { render } from "../render/render.js";
import { loadDataThunk } from "../store/index.js";

export function setupHandlers(app) {
  document.addEventListener("DOMContentLoaded", (e) => {
    const myForm = document.querySelector("#myForm");
    const dataField = document.querySelector("#dataField");
    const errorField = document.querySelector("#errorField");
    const totalField = document.querySelector("#totalField");
    const resetBtn = document.querySelector("#resetBtn");
    const loadBtn = document.querySelector("#loadBtn");
    const undoBtn = document.querySelector("#undoBtn");
    const redoBtn = document.querySelector("#redoBtn");
    const searchInput = document.querySelector("#searchInput");
    const sortSelect = document.querySelector("#sortSelect");
    const clearFiltersBtn = document.querySelector("#clearFilters");

    let payload;
    // === Form Submit ( Add Row ) ===
    myForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(myForm);
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

    // === inline editing ===
    let currentlyEditing = null;
    dataField.addEventListener("click", (e) => {
      if (!e.target.classList.contains("editable")) return;
      const span = e.target;
      console.log("datafield click event ", span);

      const rowId = span.closest(".row").dataset.id;
      const fieldName = span.dataset.name;
      const originalValue = span.textContent.trim();
      if (span.classList.contains("editing")) return;

      // store original value
      span.dataset.original = originalValue;

      const input = document.createElement("input");
      input.type = "text";
      input.value = originalValue;
      input.className = "inline-edit-input";

      span.classList.add("editing");
      span.innerHTML = "";
      span.appendChild(input);

      currentlyEditing = span;

      input.focus();
      input.select();

      const finishEditing = (success = true) => {
        if (success) {
          try {
            const newValue = validateInputToNumber(input.value);
            console.log("datafield finish editing span ", span);
            app.dispatch({
              type: "updateRow",
              payload: { id: rowId, name: fieldName, value: newValue },
            });
            span.textContent = newValue;
          } catch (err) {
            render.errorFieldRender(err.message);
            span.textContent = originalValue;
          }
        } else {
          span.textContent = originalValue;
        }

        span.classList.remove("editing");
        currentlyEditing = null;
        delete span.dataset.original;
      };
      input.addEventListener("blur", () => finishEditing(true));

      input.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter") {
          ev.preventDefault();
          finishEditing(true);
        }
        if (ev.key === "Escape") {
          ev.preventDefault();
          finishEditing(false);
        }
      });
    });
    // === data update in input field ===
    // dataField.addEventListener("change", (e) => {
    //   const rowEl = e.target;
    //   if (!rowEl.classList.contains("row-input")) return;
    //   try {
    //     payload = {
    //       id: rowEl.dataset.id,
    //       name: e.target.dataset.name,
    //       value: validateInputToNumber(e.target.value),
    //     };
    //     app.dispatch({ type: "updateRow", payload });
    //   } catch (err) {
    //     render.errorFieldRender(err.message);
    //   }
    // });
    // === data update delete row ===
    dataField.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) {
        const rowEl = e.target.closest(".row");
        if (!rowEl) return;
        payload = { id: rowEl.dataset.id };
        app.dispatch({ type: "deleteRow", payload });
      }
    });
    resetBtn.addEventListener("click", () => {
      app.dispatch({ type: "reset" });
    });
    loadBtn.addEventListener("click", () => {
      app.dispatch(loadDataThunk());
    });
    undoBtn.addEventListener("click", () => {
      app.dispatch({ type: "undo" });
    });
    redoBtn.addEventListener("click", () => {
      app.dispatch({ type: "redo" });
    });
    searchInput.addEventListener("change", (e) => {
      const value = e.target.value;
      console.log("search Input Value=>", value);
      app.dispatch({ type: "setSearchTerm", payload: value });
    });
    sortSelect.addEventListener("change", (e) => {
      const value = e.target.value;
      console.log("sort select value==>", value);
      app.dispatch({ type: "setSortBy", payload: value });
    });
    clearFiltersBtn.addEventListener("click", () => {
      payload = { sortSelect: "none", searchInput: "" };
      console.log("clicked clear Filters button :", payload);
      app.dispatch({ type: "clearFilters", payload });
    });

    // ===Drag and Drop Reordering ===
    dataField.addEventListener("dragstart", (e) => {
      if (e.target.classList.contains("row")) {
        e.dataTransfer.setData("text/plain", e.target.dataset.id);
        e.target.classList.add("dragging");
      }
    });
    dataField.addEventListener("dragover", (e) => {
      e.preventDefault();
      const row = e.target.closest(".row");
      if (row) row.classList.add("drag-over");
    });

    dataField.addEventListener("dragleave", (e) => {
      const row = e.target.closest(".row");
      if (row) row.classList.remove("drag-over");
    });

    dataField.addEventListener("drop", (e) => {
      e.preventDefault();
      const draggedId = e.dataTransfer.getData("text/plain");
      const targetRow = e.target.closest(".row");

      if (!targetRow || targetRow.dataset.id === draggedId) return;

      app.dispatch({
        type: "reorderRows",
        payload: { draggedId, targetId: targetRow.dataset.id },
      });

      document.querySelectorAll(".row").forEach((r) => {
        r.classList.remove("dragging", "drag-over");
      });
    });
    dataField.addEventListener("dragend", () => {
      document.querySelectorAll(".row").forEach((r) => {
        r.classList.remove("dragging", "drag-over");
      });
    });
  });
}
