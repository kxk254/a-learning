let count = 0;

const input = document.querySelector("#input");
const plus = document.querySelector("#plus");
const text = document.querySelector("#text");
const minus = document.querySelector("#minus");
const reset = document.querySelector("#reset");
const log = document.querySelector("#log");
const body = document.body;

// Event
plus.addEventListener("click", () => {
  updateCount(Number(input.value) || 0);
});
minus.addEventListener("click", () => {
  updateCount(-(Number(input.value) || 0));
});
reset.addEventListener("click", () => {
  resetCounter();
});

// Action - state change
function updateCount(number) {
  count = Math.max(0, count + number);
  render();
}
function resetCounter() {
  count = 0;
  render();
}

// Render
function render() {
  text.textContent = count;
  body.classList.toggle("red", count >= 10);
  minus.disabled = count <= 0;
}
