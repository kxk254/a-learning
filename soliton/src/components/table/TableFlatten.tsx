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
  getRowKey: (row: T) => React.Key;
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
          const rowKey = getRowKey(row);
          return (
            <Fragment key={rowKey}>
              <tr>
                <td>
                  <button onClick={() => toggleRow(Number(rowKey))}>
                    {expanded.has(rowKey) ? "=" : "+"}
                  </button>
                </td>
                {columns.map((col) => (
                  <td key={String(col.key)}>
                    {col.render ? col.render(row) : String(row[col.key])}
                  </td>
                ))}
                <td>
                  <button onClick={() => onDelete?.(rowKey)}>DEL</button>
                </td>
              </tr>
              {expanded.has(rowKey) && (
                <tr>
                  <td colSpan={columns.length + 2}>{renderRow?.(row)}</td>
                </tr>
              )}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
}
export function FlattenTable<T>({
  columns,
  data,
  renderRow,
  onCellUpdate,
  getRowKey,
  onDelete,
}: TableProp<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)}>{String(col.label)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((r, i) => {
          const rowKey = getRowKey(r);
          return (
            <tr key={rowKey}>
              {columns.map((col) => (
                <td key={String(col.key)}>{String(r[col.key])}</td>
              ))}
              <td>
                <button>DEL</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
