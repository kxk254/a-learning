"use client";
import React from "react";

type Column<T> = {
  key: string;
  name: string;
  path?: string;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
};

const columns = [
  { key: "name", name: "Dashboard", path: "/" },
  { key: "age", name: "Age", path: "/age" },
  { key: "city", name: "City", path: "/city" },
];

export default function TableRevenue<T>({ columns, data }: TableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.name}</th>
          ))}
        </tr>
      </thead>
    </table>
  );
}
