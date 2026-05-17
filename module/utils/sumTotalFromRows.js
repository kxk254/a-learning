export function sumTotalFromRows(rows) {
  return rows.reduce(
    (acc, row) => {
      acc.totalPrice += row.price;
      acc.totalQty += row.qty;
      return acc;
    },
    { totalPrice: 0, totalQty: 0 },
  );
}
