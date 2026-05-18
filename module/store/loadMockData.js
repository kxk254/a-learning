import { validateInputToNumber } from "../utils/validateInputToNumber.js";

export async function loadMockData() {
  let res = await fetch("/module/data/mockdata.json");
  const data = await res.json();
  let newPresent = {
    ...data,
    entities: {
      ...data.entities,
      rows: data.entities.rows.map((a) => ({
        id: a.id,
        price: validateInputToNumber(a.price),
        qty: validateInputToNumber(a.qty),
      })),
    },
  };
  return newPresent;
}
