"use client";
import React, { useState, ReactNode, Fragment } from "react";

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
  onDelete?: (row: React.Key) => void;
};

export default function TableFlatten<T>({
  columns,
  data,
  renderRow,
  onCellUpdate,
  getRowKey,
  onDelete,
}: TableProp<T>) {
  const [expanded, setExpanded] = useState<Set<React.Key>>(new Set());

  const toggleRow = (id: React.Key) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
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
          const key = getRowKey(row);
          return (
            <Fragment key={key}>
              <tr>
                <td>
                  <button onClick={() => toggleRow(Number(key))}>
                    {expanded.has(key) ? "=" : "+"}
                  </button>
                </td>
                {columns.map((col) => (
                  <td key={String(col.key)}>
                    {col.render ? col.render(row) : String(row[col.key])}
                  </td>
                ))}
                <td>
                  <button>DEL</button>
                </td>
              </tr>
              {expanded.has(key) && (
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
