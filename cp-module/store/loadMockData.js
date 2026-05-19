import { validateInputToNumber } from "../utils/validateInputToNumber.js";
export async function loadMockData() {
  const res = await fetch("/module/data/mockdata.json");
  const data = await res.json();
  console.log("load mock data fetched data ::", data);
  const newPresent = {
    ...data,
    rows: data.entities.rows.map((row) => ({
      id: row.id,
      price: validateInputToNumber(row.price),
      qty: validateInputToNumber(row.qty),
    })),
  };
  console.log("load Mock Data inside :", newPresent);
  return newPresent;
}
