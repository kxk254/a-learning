console.log("reading javascript");
const btn = document.getElementById("btn");
const title = document.getElementById("title");
const info = document.getElementById("info");
let isClicked = false;

btn.addEventListener("click", () => {
  if (!isClicked) {
    title.textContent = "You clicked the button!";
    info.textContent = "JS is working!";
    document.body.style.backgroundColor = "#f0f8ff";
  } else {
    title.textContent = "Hello, I am learning JS";
    info.textContent = "Nothing happened yet";
    document.body.style.backgroundColor = "#ffffff";
  }
  isClicked = !isClicked;
});
