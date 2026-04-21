const valA = document.getElementById("valueA");
const valB = document.getElementById("valueB");
const result = document.querySelector("#result");
const plus = document.querySelector("#plus");
const minus = document.querySelector("#minus");
const multiple = document.querySelector("#multiple");
const divide = document.querySelector("#divide");
const clean = document.querySelector("#clean");
const retreive = document.querySelector("#retreive");
const pop = document.querySelector("#pop");
const screen = document.querySelector("#screen");
const error = document.querySelector("#error");

history = [];
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
clean.addEventListener("click", () => {
  cleanLocalStorage();
  cleanScreen();
});
retreive.addEventListener("click", () => {});
pop.addEventListener("click", () => {});

// data update
function calcValue(operation) {
  const a = validateAndConvert(valA.value);
  const b = validateAndConvert(valB.value);
  let res = 0;
  if (a.error) {
    render(a);
  } else if (b.error) {
    render(b);
  }
  switch (operation) {
    case "add":
      res = a.value + b.value;
      history.push = (a, b, operation, res);
      break;
    case "minus":
      res = a.value - b.value;
      history.push = (a, b, operation, res);
      break;
    case "multiple":
      res = a.value * b.value;
      history.push = (a, b, operation, res);
      break;
    case "divide":
      res = a.value / b.value;
      history.push = (a, b, operation, res);
      break;
    default:
      console.log("error");
  }
  console.log("result", res);
  render({ value: res });
}

function validateAndConvert(value) {
  if (typeof value === "string" && value.trim() === "") {
    return { error: "string or empty is not allowed" };
  }

  const num = Number(value);
  if (!Number.isFinite(num)) {
    return { error: "input a valid number" };
  }

  return { value: num };
}
// local storage
function setLocalStorage() {}
function getLocalStorage() {}
function cleanLocalStorage() {
  localStorage.clear();
  history = [];
}

// UP rendering
function render(res) {
  console.log("res", res);
  if (res.value) {
    result.textContent = res.value;
    error.classList.remove("red");
    error.textContent = "";
  } else if (res.error) {
    error.textContent = res.error;
    result.textContent = "";
    error.classList.add("red");
  }
}

function cleanScreen() {
  result.textContent = "";
  error.textContent = "";
  error.classList.remove("red");
}
