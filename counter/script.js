let count = 0;

const plus = document.getElementById("plus");
const text = document.getElementById("text");
const minus = document.getElementById("minus");
const p = document.getElementsByTagName("p")[0];

plus.addEventListener("click", () => {
  count = count + 1;

  text.textContent = `Count: ${count}`;

  if (count % 2 === 0) {
    document.body.style.backgroundColor = "#242424";
    p.style.color = "#ffffff";
  } else {
    document.body.style.backgroundColor = "#ffffff";
    p.style.color = "#242424";
  }
});

minus.addEventListener("click", () => {
  count = count - 1;

  text.textContent = `Count: ${count}`;
  if (count % 2 === 0) {
    document.body.style.backgroundColor = "#575757";

    p.style.color = "#ffffff";
  } else {
    document.body.style.backgroundColor = "#ffffff";
    p.style.color = "#242424";
  }
});
