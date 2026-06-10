"use client";
import { useState } from "react";

export type Column<T> = {
  key: keyof T;
  header: string;
  width?: string;
  headerClassName?: string;
  cellClassName?: string;
};

export type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  onCellUpdate?: (rowIndex: number, key: keyof T, value: string) => void;
  rowHeight?: string;
};

export default function Table<T>({
  columns,
  data,
  onCellUpdate,
  rowHeight = "48px",
}: TableProps<T>) {
  const [editingCell, setEditingCell] = useState<{
    row: number;
    key: string;
  } | null>(null);

  const updateCell = (rowIndex: number, key: keyof User, value: string) => {
    setUsers((prev) =>
      prev.map((row, i) => (i === rowIndex ? { ...row, [key]: value } : row)),
    );
  };

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
              <td
                key={String(col.key)}
                className={col.cellClassName}
                onClick={() => {
                  setEditingCell({ row: index, key: String(col.key) });
                  setEditValue(String(row[col.key] ?? ""));
                }}
              >
                {editingCell?.row === index &&
                editingCell?.key === String(col.key) ? (
                  <input
                    autoFocus
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => {
                      onCellUpdate?.(index, col.key, editValue);
                      setEditingCell(null);
                    }}
                  />
                ) : (
                  String(row[col.key] ?? "")
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
