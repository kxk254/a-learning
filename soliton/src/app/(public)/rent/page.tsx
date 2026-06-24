"use client";
import TableRevenue from "@/src/components/table/TableRevenue";

export default function Page() {
  const columns = [
    { key: "name", name: "Name", path: "/" },
    { key: "age", name: "Age", path: "/age" },
    { key: "city", name: "City", path: "/city" },
  ];

  const data = [
    { name: "Alice", age: 20, city: "New York" },
    { name: "Bob", age: 33, city: "Denver" },
    { name: "Drew", age: 25, city: "Pittsburg" },
    { name: "Nacy", age: 45, city: "Toronto" },
    { name: "Dan", age: 35, city: "Ottawa" },
  ];
  return <TableRevenue columns={columns} data={data} />;
}
