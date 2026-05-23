export function getVisibleRows(state) {
  let rows = [...state.present.entities.rows];
  const { searchTerm, sortBy } = state.present.ui;

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    rows = rows.filter(
      (row) =>
        row.id.toLowerCase().include(term) ||
        String(row.price).includes(term) ||
        String(row.qty).includes(term),
    );
  }

  if (sortBy !== "none") {
    const [field, direction] = sortBy.split("-");
    rows.sort((a, b) => {
      const valA = a[field];
      const valB = b[field];
      return direction === "asc" ? valA - valB : valB - valA;
    });
  }
  return rows;
}
