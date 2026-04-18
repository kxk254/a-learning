const quotes = [
  "first section",
  "Hello World Robots",
  "Do your best today",
  "Quite easy going",
];
const colors = ["black", "blue", "red", "greed"];

const btn = document.getElementById("btn");
const quote = document.getElementById("quote");

btn.addEventListener("click", () => {
  const random = Math.floor(Math.random() * quotes.length);
  const colorrand = Math.floor(Math.random() * colors.length);
  quote.textContent = quotes[random];
  quote.style.color = colors[colorrand];
});
