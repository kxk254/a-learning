"use client";
import React, { useState, ReactNode, Fragment } from "react";

// onCellUpdate,getRowKey
// resolveRowKey, editingCell, editValue,editedCells,getCellKey

export type Column<T> = {
  key: keyof T;
  label: string;
  render?: (row: T) => ReactNode;
};

export type TableProp<T> = {
  columns: Column<T>[];
  data: T[];
  renderRow?: (row: T) => ReactNode;
  onCellUpdate?: (row: React.Key, key: keyof T, value: string) => void;
  getRowKey?: (row: T) => React.Key;
};

export default function TableNestedV<T>({
  columns,
  data,
  renderRow,
  onCellUpdate,
  getRowKey,
}: TableProp<T>) {
  const resolveRowKey = (row: T, index: number) => getRowKey?.(row) ?? index;
  const [expanded, setExpanded] = useState<Set<React.Key>>(new Set());
  const [editingCell, setEditingCell] = useState<{
    row: React.Key;
    key: keyof T;
  } | null>(null);
  const [editValue, setEditValue] = useState("");
  const [editedCells, setEditedCells] = useState<Record<string, boolean>>({});
  const getCellKey = (rowKey: React.Key, key: keyof T) =>
    `${String(rowKey)}-${String(key)}`;

  const toggleRow = (key: React.Key) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => {
          const rowKey = resolveRowKey(row, index);
          return (
            <Fragment key={rowKey}>
              <tr>
                {renderRow && (
                  <td>
                    <button onClick={() => toggleRow(rowKey)}>
                      {expanded.has(rowKey) ? "=" : "+"}
                    </button>
                  </td>
                )}
                {columns.map((col) => {
                  const isEdit =
                    editedCells[getCellKey(rowKey, col.key)] ?? false;
                  return (
                    <td
                      key={String(col.key)}
                      onClick={() => {
                        setEditingCell({ row: rowKey, key: col.key });
                        setEditValue(String(row[col.key]) ?? "");
                      }}
                    >
                      {editingCell?.row === rowKey &&
                      editingCell?.key === col.key ? (
                        <input
                          autoFocus
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.currentTarget.blur();
                            }
                            if (e.key === "Escape") {
                              setEditingCell(null);
                            }
                          }}
                          onBlur={(e) => {
                            const original = String(row[col.key]) ?? "";
                            if (original !== editValue) {
                              setEditedCells((prev) => ({
                                ...prev,
                                [getCellKey(rowKey, col.key)]: true,
                              }));
                              onCellUpdate?.(rowKey, col.key, editValue);
                            }
                            setEditingCell(null);
                          }}
                        />
                      ) : col.render ? (
                        col.render(row)
                      ) : (
                        String(row[col.key])
                      )}
                    </td>
                  );
                })}
              </tr>
              {expanded.has(rowKey) && (
                <tr>
                  <td colSpan={columns.length + 1}>{renderRow?.(row)}</td>
                </tr>
              )}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
}
