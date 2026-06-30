"use client";
import React, { useState } from "react";

export type Column<T> = {
  key: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode;
};

export type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  renderRow?: (row: T) => React.ReactNode;
};

export default function TableNested<T>({
  columns,
  data,
  renderRow,
}: TableProps<T>) {
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
            <th key={String(col.key)}>{col.label}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((data, index) => (
          <React.Fragment key={index}>
            <tr>
              <td>
                {renderRow && (
                  <button onClick={() => toggleRow(index)}>
                    {expanded.has(index) ? "=" : "+"}
                  </button>
                )}
              </td>
              {columns.map((col) => (
                <td key={String(col.key)}>
                  {col.render ? col.render(data) : String(data[col.key])}
                </td>
              ))}
            </tr>
            {expanded.has(index) && (
              <tr>
                <td colSpan={columns.length + 1}>{renderRow?.(data)}</td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}
