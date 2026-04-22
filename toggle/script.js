const btn = document.querySelector("#btn");
const box = document.querySelector("#box");
const item = document.querySelector("#item");
const itemList = document.querySelector("#item-list");
const text = document.getElementById("text");
const sidebar = document.querySelector("#sidebar");
const closebtn = document.querySelector(".closebtn");
const openbtn = document.querySelector(".openbtn");
const main = document.querySelector("#main");

closebtn?.addEventListener("click", () => {
  hideSidebar();
});
openbtn?.addEventListener("click", () => {
  openSidebar();
});

btn?.addEventListener("click", () => {
  box?.classList.toggle("hidden");
});

item?.addEventListener("click", () => {
  //const title = text.textContent.value;
  console.log(text.value);
  const newDiv = document.createElement("div");
  newDiv.textContent = `add Item ${text.value}`;
  const newDel = document.createElement("button");
  newDel.textContent = "delete";
  newDel.addEventListener("click", () => {
    newDiv.remove();
    newDel.remove();
  });
  itemList?.appendChild(newDiv);
  itemList?.appendChild(newDel);
});

// UI
function hideSidebar() {
  sidebar?.classList.add("hidden");
  main?.classList.remove("hidden-main");
}
function openSidebar() {
  sidebar?.classList.remove("hidden");
  main?.classList.add("hidden-main");
}
