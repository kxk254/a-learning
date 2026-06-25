"use client";
import TableRevenue, { Column } from "@/src/components/table/TableRevenue";
import { Badge } from "@/src/components/ui/button/Badge";

type Person = { name: string; age: number; city: string };

export default function Rent() {
  const columns: Column<Person>[] = [
    { key: "name", label: "Name" },
    {
      key: "age",
      label: "Age",
      render: (d) => <Badge color={"primary"}>{d.age}</Badge>,
    },
    { key: "city", label: "City" },
  ];

  const data: Person[] = [
    { name: "Bob", age: 22, city: "New York" },
    { name: "Alice", age: 32, city: "Denver" },
  ];
  return <TableRevenue columns={columns} data={data} />;
}
