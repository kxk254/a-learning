"use client";
import { useState } from "react";
import styles from "./Table.module.css";

export type Column<T> = {
  key: keyof T;
  header: string;
  width?: string;
  headerClassName?: string;
  cellClassName?: string;
};

export type TableProps<T extends Record<string, unknown>> = {
  columns: Column<T>[];
  data: T[];
  onCellUpdate?: (rowIndex: number, key: keyof T, value: string) => void;
  rowHeight?: string;
};

export default function Table<T extends Record<string, unknown>>({
  columns,
  data,
  onCellUpdate,
  rowHeight = "48px",
}: TableProps<T>) {
  const [editingCell, setEditingCell] = useState<{
    row: number;
    key: keyof T;
  } | null>(null);

  const [editValue, setEditValue] = useState("");

  type CellKey = string; // "row-col key"
  const [editedCells, setEditedCells] = useState<Record<string, boolean>>({});

  const getCellKey = (row: number, key: keyof T) => `${row}-${String(key)}`;

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
            {columns.map((col) => {
              const isEdited = editedCells[getCellKey(index, col.key)] ?? false;
              console.log("isEdited", isEdited);
              return (
                <td
                  key={String(col.key)}
                  className={`${col.cellClassName ?? ""} ${isEdited ? styles.idEdited : ""}`}
                  style={{
                    width: col.width,
                    height: rowHeight,
                  }}
                  onClick={() => {
                    setEditingCell({ row: index, key: col.key });
                    setEditValue(String(row[col.key] ?? ""));
                  }}
                >
                  {editingCell?.row === index &&
                  editingCell?.key === col.key ? (
                    <input
                      autoFocus
                      value={editValue}
                      style={{
                        flex: 1,
                        width: "100%",
                        height: "100%",
                        border: "none",
                      }}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => {
                        const original = String(data[index][col.key] ?? "");
                        const updated = editValue;
                        if (original !== updated) {
                          setEditedCells((prev) => ({
                            ...prev,
                            [getCellKey(index, col.key)]: true,
                          }));
                          onCellUpdate?.(index, col.key, editValue);
                        }
                        setEditingCell(null);
                      }}
                    />
                  ) : (
                    String(row[col.key] ?? "")
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
