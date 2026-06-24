"use client";
import React from "react";

type Column<T> = {
  key: keyof T;
  name: string;
  path?: string;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
};

export default function TableRevenue<T>({ columns, data }: TableProps<T>) {
  console.log(data);
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((r, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td key={col.key}>{r[col.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
