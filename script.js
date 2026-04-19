const title = document.querySelector("#title");
const btn = document.querySelector("#btn");
const info = document.querySelector("#info");
const body = document.body;
let isClick = false;

btn.addEventListener("click", () => {
  if (!isClick) {
    title.textContent = "Now Applying JavaScript";
    btn.textContent = "now clicked";
    info.textContent = "You can see the difference";
    btn.classList.remove("white");
    btn.classList.add("black");
    body.classList.toggle("background");
  } else {
    title.textContent = "Hello, I am learning JS";
    btn.textContent = "Click me";
    info.textContent = "Nothing happened yet";
    btn.classList.remove("black");
    btn.classList.add("white");
    body.classList.toggle("background");
  }

  isClick = !isClick;
});
