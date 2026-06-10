type Column<T> = {
  key: keyof T;
  header: string;
  width?: string;
  headerClassName?: string;
  cellClassName?: string;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  rowHeight?: string;
};

export default function Table<T>({
  columns,
  data,
  rowHeight = "48px",
}: TableProps<T>) {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={String(col.key)}
              style={{ width: col.width }}
              className={col.headerClassName}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, index) => (
          <tr key={index} style={{ height: rowHeight }}>
            {columns.map((col) => (
              <td key={String(col.key)} className={col.cellClassName}>
                {String(row[col.key] ?? "")}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
