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
    <>
      <div>Title</div>
      <div>{columns[1].key}</div>
    </>
  );
}
