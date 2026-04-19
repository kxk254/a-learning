let count = 0;
let history = [];

const input = document.querySelector("#input");
const plus = document.querySelector("#plus");
const text = document.querySelector("#text");
const minus = document.querySelector("#minus");
const reset = document.querySelector("#reset");
const log = document.querySelector("#log");
const undo = document.querySelector("#undo");
const retrieve = document.querySelector("#retrieve");
const body = document.body;

// Event
plus.addEventListener("click", () => {
  const value = input.value;
  updateCount(Number(value) || 0, "add");
});
minus.addEventListener("click", () => {
  const value = input.value;
  updateCount(-(Number(value) || 0), "minus");
});
reset.addEventListener("click", () => {
  resetCounter();
});
undo.addEventListener("click", () => {
  undoLast();
});
retrieve.addEventListener("click", () => {
  retrieveData();
});

// Action - state change
function updateCount(input, operation) {
  count = Math.max(0, count + input);
  history.push({ operation: operation, input: input, count: count });
  saveData();
  render();
}
function resetCounter() {
  count = 0;
  history = [];
  localStorage.removeItem("history");
  render();
}
function undoLast() {
  history.pop();
  compileHistory();
  saveData();
  render();
}
function retrieveData() {
  const saved = localStorage.getItem("history");
  history = saved ? JSON.parse(saved) : [];
  compileHistory();
  render();
}
function saveData() {
  localStorage.setItem("history", JSON.stringify(history));
}
function compileHistory() {
  count = 0;
  temp = history.length ? history[history.length - 1] : 0;
  count = temp.count;
}

// Render
function render() {
  text.textContent = count;
  log.innerHTML = "";
  body.classList.toggle("red", count >= 10);
  minus.disabled = count <= 0;

  history.forEach((e) => {
    const p = document.createElement("p");
    p.textContent = `operation:${e.operation} - count: ${e.count} - input:${e.input}`;
    log.appendChild(p);
  });
}
