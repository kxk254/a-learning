const title = document.querySelector("#title");
const btn = document.querySelector("#btn");
const info = document.querySelector("#info");
const body = document.body;
let isClick = false;

btn.addEventListener("click", () => {
  if (!isClick) {
    title.textContent = "JavScript a little bit!";
    info.textContent = "Observe changes!";
    btn.classList.add("black");
    btn.classList.remove("white");
    body.style.backgroundColor = "#525252";
  } else {
    title.textContent = "Hello, I am learning JS";
    info.textContent = "Nothing happened yet";
    btn.classList.remove("black");
    btn.classList.add("white");
    body.style.backgroundColor = "#ffffff";
  }
  isClick = !isClick;
});
