"use client";
import React from "react";

export type Column<T> = {
  key: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode;
};

export type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
};

export default function TableNested<T>({ columns, data }: TableProps<T>) {
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
          <tr key={index}>
            {columns.map((col) => (
              <td key={String(col.key)}>
                {col.render ? col.render(data) : String(data[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
