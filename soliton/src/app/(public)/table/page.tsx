"use client";
import Table from "@/src/components/table/Table";
import type { Column } from "@/src/components/table/Table";
import styles from "./Page.module.css";
import { useState } from "react";

type Row = { name: string; age: number; city: string };
const columns = [
  {
    key: "name",
    header: "Name",
    width: "200px",
    headerClassName: styles.headerRight,
    cellClassName: styles.cellRight,
  },
  {
    key: "age",
    header: "Age",
    width: "100px",
    headerClassName: "headerRight",
    cellClassName: "cellRight",
  },
  {
    key: "city",
    header: "City",
    width: "150px",
    headerClassName: "headerRight",
    cellClassName: "cellRight",
  },
] satisfies Column<Row>[];

export default function Page() {
  const [users, setUsers] = useState<Row[]>([
    { name: "John", age: 25, city: "New York" },
    { name: "Jane", age: 30, city: "Toronto" },
  ]);
  const updateCell = (rowIndex: number, key: keyof Row, value: string) => {
    setUsers((prev) =>
      prev.map((row, i) =>
        i === rowIndex
          ? { ...row, [key]: key === "age" ? Number(value) : value }
          : row,
      ),
    );
  };
  return (
    <Table
      columns={columns}
      data={users}
      onCellUpdate={updateCell}
      rowHeight="20px"
    />
  );
}
