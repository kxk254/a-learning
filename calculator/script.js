const valA = document.getElementById("valueA");
const valB = document.getElementById("valueB");
const result = document.querySelector("#result");
const plus = document.querySelector("#plus");
const minus = document.querySelector("#minus");
const multiple = document.querySelector("#multiple");
const divide = document.querySelector("#divide");

btn.addEventListener("click", () => {
  console.log("A", valA.value);
  const c = Number(valA.value) + Number(valB.value);
  result.textContent = c;
});
