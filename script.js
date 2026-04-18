const title = document.querySelector("#title");
const btn = document.querySelector("#btn");
const info = document.querySelector("#info");
const body = document.body;
let isClick = false;

btn.addEventListener("click", () => {
  if (!isClick) {
    info.textContent = "Java Script is on!";
    btn.textContent = "clicked";
    btn.classList.remove("white");
    btn.classList.add("black");
    body.style.backgroundColor = "#8f8f8f";
  } else {
    info.textContent = "Nothing happened yet";
    btn.textContent = "Click me";
    btn.classList.remove("black");
    btn.classList.add("white");
    body.style.backgroundColor = "#ffffff";
  }
  isClick = !isClick;
});
