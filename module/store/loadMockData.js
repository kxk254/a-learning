import { validateInputToNumber } from "../utils/index.js";

export async function loadMockData() {
  const res = await fetch("/module/data/mockdata.json");
  const data = await res.json();
  console.log("loadMockData", data);
  return {
    ...data,
    user: { id: data.user.id, name: data.user.name },
    entities: {
      ...data.entities,
      rows: data.entities.rows.map((row) => ({
        id: row.id,
        price: validateInputToNumber(row.price),
        qty: validateInputToNumber(row.qty),
      })),
    },
  };
}
