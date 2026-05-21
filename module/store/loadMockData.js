import { validateInputToNumber } from "../utils/validateInputToNumber.js";

export async function loadMockData() {
  let res = await fetch("/module/data/mockdata.json");
  let data = await res.json();
  let newPresent = {
    ...data,
    entities: {
      ...data.entities,
      rows: data.entities.rows.map((row) => ({
        id: row.id,
        price: validateInputToNumber(row.price),
        qty: validateInputToNumber(row.qty),
      })),
    },
  };
  return newPresent;
}
