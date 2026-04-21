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

calcHistory = [];
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
retreive.addEventListener("click", () => {
  showScreen();
});
pop.addEventListener("click", () => {
  popHistory();
});

// data update
function calcValue(operation) {
  const a = validateAndConvert(valA.value);
  const b = validateAndConvert(valB.value);
  let res = 0;
  if (a.error) {
    render(a);
    return;
  } else if (b.error) {
    render(b);
    return;
  }
  switch (operation) {
    case "add":
      res = a.value + b.value;
      break;
    case "minus":
      res = a.value - b.value;
      break;
    case "multiple":
      res = a.value * b.value;
      break;
    case "divide":
      res = a.value / b.value;
      break;
    default:
      console.log("error");
  }
  calcHistory.push({
    a: a.value,
    b: b.value,
    operation: operation,
    result: res,
  });
  console.log("result", res, calcHistory, operation);
  addLocalStorage();
  render({ value: res });
}

function validateAndConvert(value) {
  if (
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "")
  ) {
    return { error: "string or empty is not allowed" };
  }

  const num = Number(value);
  if (!Number.isFinite(num)) {
    return { error: "input a valid number" };
  }

  return { value: num };
}
// local storag
function addLocalStorage() {
  localStorage.setItem("history", JSON.stringify(calcHistory));
}
function getLocalStorage() {
  const data = JSON.parse(localStorage.getItem("history"));
  calcHistory = data || [];
  return calcHistory;
}
function cleanLocalStorage() {
  localStorage.clear();
  calcHistory = [];
}

function popHistory() {
  if (calcHistory.length === 0) return;
  calcHistory.pop();
  screen.innerHTML = "";

  calcHistory.forEach((e) => {
    const div = document.createElement("div");
    div.textContent = `a:${e.a} b:${e.b} operation:${e.operation} result:${e.result}`;
    screen.appendChild(div);
  });
  addLocalStorage();
}

// UP rendering
function render(res) {
  console.log("res", res);

  if (res.error) {
    error.textContent = res.error;
    result.textContent = "";
    error.classList.add("red");
  } else if (res.value !== undefined) {
    result.textContent = res.value;
    error.classList.remove("red");
    error.textContent = "";
    showScreen();
  }
}

function cleanScreen() {
  result.textContent = "";
  error.textContent = "";
  error.classList.remove("red");
  valA.value = "";
  valB.value = "";
  screen.innerHTML = "";
}

function showScreen() {
  screenMemory = getLocalStorage();
  screen.innerHTML = "";

  screenMemory.forEach((e) => {
    const div = document.createElement("div");
    div.textContent = `a:${e.a} b:${e.b} operation:${e.operation} result:${e.result}`;
    screen.appendChild(div);
  });
}
