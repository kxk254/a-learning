"use client";
import TableRevenue, { Column } from "@/src/components/table/TableRevenue";

type Person = { name: string; age: number; city: string };

export default function Page() {
  const columns: Column<Person>[] = [
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
    { key: "city", label: "City" },
  ];

  const data: Person[] = [
    { name: "Alice", age: 20, city: "New York" },
    { name: "Bob", age: 33, city: "Denver" },
  ];

  return <TableRevenue columns={columns} data={data} />;
}
