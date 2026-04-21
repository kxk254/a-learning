const valA = document.getElementById("valueA");
const valB = document.getElementById("valueB");
const result = document.querySelector("#result");
const plus = document.querySelector("#plus");
const minus = document.querySelector("#minus");
const multiple = document.querySelector("#multiple");
const divide = document.querySelector("#divide");
const error = document.querySelector("#error");
const log = document.querySelector("#log");
const retreive = document.querySelector("#retreive");
const clean = document.querySelector("#clean");
const pop = document.querySelector("#pop");
let history = [];

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
  cleanStorage();
});
retreive.addEventListener("click", () => {
  retreiveStorage();
});
pop.addEventListener("click", () => {
  popStorage();
});

// data update
function calcValue(operation) {
  const a = validateValue(valA.value);
  const b = validateValue(valB.value);
  let res = 0;
  switch (operation) {
    case "add":
      res = a.value + b.value;
      console.log("answer", res);
      history.push({ a: a, b: b, operation: "add", result: res });
      render(res);
      saveStorage();
      break;
    case "minus":
      res = a.value - b.value;
      console.log("answer", res);
      history.push({ a: a, b: b, operation: "minus", result: res });
      render(res);
      saveStorage();
      break;
    case "multiple":
      res = a.value * b.value;
      console.log("answer", res);
      history.push({ a: a, b: b, operation: "multiple", result: res });
      render(res);
      saveStorage();
      break;
    case "divide":
      res = a.value / b.value;
      console.log("answer", res);
      history.push({ a: a, b: b, operation: "divide", result: res });
      render(res);
      saveStorage();
      break;
    default:
      console.log("error");
  }
}

function validateValue(value) {
  if (typeof value === "string" && value.trim() === "") {
    return { error: "empty string" };
  }

  const num = Number(value);
  if (!Number.isFinite(num)) {
    return { error: "enter a valid input" };
  }

  return { value: num };
}

function saveStorage() {
  localStorage.setItem("history", JSON.stringify(history));
}
function cleanStorage() {
  localStorage.clear();
}
function retreiveStorage() {
  const history = JSON.parse(localStorage.getItem("history"));
  console.log(history);
  calcLog(history);
}
function popStorage() {
  history.pop();
  calcLog(history);
}

// UP rendering
function render(res) {
  const resultObj = validateValue(res);
  console.log(`"value":${resultObj.value}, "error":${resultObj.error}`);

  if (resultObj.error) {
    error.textContent = resultObj.error;
    error.classList.add("red");
  } else if (resultObj.value !== undefined) {
    result.textContent = resultObj.value;
    error.classList.remove("red");
    error.textContent = "";
    calcLog(history);
  }
}

function calcLog(history) {
  console.log("history", history);
  history.forEach((e) => {
    const div = document.createElement("div");
    log.appendChild(div);
    div.textContent = `a: ${e.a.value} b:${e.b.value} operation:${e.operation} result:${e.result}`;
  });
}
