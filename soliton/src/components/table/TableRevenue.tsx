"use client";
import React from "react";

export type Column<T> = {
  key: keyof T;
  name: string;
  path?: string;
};

type TableProps<T extends Record<string, unknown>> = {
  columns: Column<T>[];
  data: T[];
};

export default function TableRevenue<T extends Record<string, unknown>>({
  columns,
  data,
}: TableProps<T>) {
  console.log(data);
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)}>{col.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((r, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td key={String(col.key)}>{r[col.key] as React.ReactNode}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
