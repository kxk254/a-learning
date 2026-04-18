const valA = document.getElementById("valueA");
const valB = document.getElementById("valueB");
const result = document.querySelector("#result");
const btn = document.querySelector("#btn");

btn.addEventListener("click", () => {
  console.log("A", valA.value);
  const c = Number(valA.value) + Number(valB.value);
  result.textContent = c;
});
