const btn = document.getElementById("btn");
const title = document.getElementById("title");
const info = document.getElementById("info");

btn.addEventListner("click", () => {
  title.textContent = "You clicked the button!";
  info.textContent = "JS is working!";
  document.body.style.backgroundColor = "#f0f8ff";
});
