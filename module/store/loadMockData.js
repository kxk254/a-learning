import { validateInputToNumber } from "../utils/index.js";

export async function loadMockData() {
  const res = await fetch("../data/mockdata.json");
  const data = res.json();
  return {
    ...data,
    entities: {
      ...data.entities,
      rows: data.entries.rows.map((row) => ({
        id: row.id,
        price: validateInputToNumber(row.price),
        qty: validateInputToNumber(row.qty),
      })),
    },
  };
}
