import { validateInputToNumber } from "../utils/validateInputToNumber.js";
export async function loadMockData() {
  const res = await fetch("/module/data/mockdata.json");
  const data = await res.json();
  const newPresent = {
    ...entities,
    rows: entities.rows.map((row) => ({
      id: row.id,
      price: validateInputToNumber(row.price),
      qty: validateInputToNumber(row.qty),
    })),
  };
  return newPresent;
}
