import { validateInputToNumber } from "../utils/index.js";

export async function loadMockData() {
  const res = await fetch("/module/data/mockdata.json");
  const data = await res.json();
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
