const valA = document.getElementById("valueA");
const valB = document.getElementById("valueB");
const result = document.querySelector("#result");
const plus = document.querySelector("#plus");
const minus = document.querySelector("#minus");
const multiple = document.querySelector("#multiple");
const divide = document.querySelector("#divide");

//event
plus.addEventListener("click", () => {
  calcValue("add");
});
minus.addEventListener("click", () => {
  calcValue("minus");
});
multiple.addEventListener("click", () => {
  calcValue("multiple");
});
divide.addEventListener("click", () => {
  calcValue("divide");
});

// data update
function calcValue(operation) {
  const a = convertToNumber(valA.value);
  const b = convertToNumber(valB.value);
  let res = 0;
  switch (operation) {
    case "add":
      res = a + b;
      console.log("answer", res);
      render(res);
      break;
    case "minus":
      res = a - b;
      console.log("answer", res);
      render(res);
      break;
    case "multiple":
      res = a * b;
      console.log("answer", res);
      render(res);
      break;
    case "divide":
      res = a / b;
      console.log("answer", res);
      render(res);
      break;
    default:
      console.log("error");
  }
}

function convertToNumber(str) {
  let num = Number(str);
  if (str === "") {
    alert("empty strings");
  } else if (!/^-?(?:\d+\.?\d*|\.\d+)$/.test(num)) {
    alert("too many dots");
  } else if (!Number.isFinite(num)) {
    alert("input valid number");
  }
  return num;
}

// UP rendering
function render(res) {
  convertToNumber(res);
  result.textContent = res;
}
