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
};

export default function TableNested<T>({
  columns,
  data,
  renderRow,
}: TableProp<T>) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const toggleRow = (index: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <td key={String(col.key)}>{col.label}</td>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, index) => (
          <Fragment key={index}>
            <tr>
              {renderRow && (
                <td>
                  <button onClick={() => toggleRow(index)}>
                    {expanded.has(index) ? "=" : "+"}
                  </button>
                </td>
              )}
              {columns.map((col) => (
                <td key={String(col.key)}>
                  {col.render ? col.render(row) : String(row[col.key])}
                </td>
              ))}
            </tr>
            {expanded.has(index) && (
              <tr>
                <td colSpan={columns.length + 1}>{renderRow?.(row)}</td>
              </tr>
            )}
          </Fragment>
        ))}
      </tbody>
    </table>
  );
}
