import { validateInputToNumber } from "../utils/index.js";

export async function loadMockData() {
  const res = await fetch("/module/data/mockdata.json");
  const data = await res.json();
  const newPresent = {
    ...data.entities,
    rows: data.entities.rows.map((r) => ({
      id: r.id,
      price: validateInputToNumber(r.price),
      qty: validateInputToNumber(r.qty),
    })),
  };
}
