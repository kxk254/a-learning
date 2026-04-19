let count = 0;

const input = document.querySelector("#input");
const plus = document.querySelector("#plus");
const text = document.querySelector("#text");
const minus = document.querySelector("#minus");
const reset = document.querySelector("#reset");
const body = document.body;

function addCalc(value) {
  count = count + value;
  text.textContent = count;
  body.classList.toggle("red", count >= 10);
}

plus.addEventListener("click", () => {
  addCalc(Number(input.value) || 0);
});
minus.addEventListener("click", () => {
  addCalc(-Number(input.value) || 0);
});
reset.addEventListener("click", () => {
  count = 0;
  text.textContent = count;
  body.classList.toggle("red", false);
});
