import { validateInputToNumber } from "../utils/index.js";

export async function loadMockData() {
  const res = await fetch("/form/data/mockdata.json");
  const data = await res.json();
  console.log("load mock data", data);
  const newPresent = data;
  return newPresent;
}
