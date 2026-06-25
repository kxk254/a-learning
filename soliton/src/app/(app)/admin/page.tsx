"use client";
import TableNested, { Column } from "@/src/components/table/TableNested";
import { Badge } from "@/src/components/ui/button/Badge";

type Person = {
  name: string;
  age: number;
  city: string;
};

export default function Admin() {
  const columns: Column<Person>[] = [
    { key: "name", label: "Name" },
    {
      key: "age",
      label: "Age",
      render: (person) => <Badge color={"primary"}>{person.age}</Badge>,
    },
    { key: "city", label: "City" },
  ];

  const data: Person[] = [
    { name: "Alice", age: 22, city: "New York" },
    { name: "Bob", age: 32, city: "Denver" },
    { name: "Roy", age: 28, city: "Toronto" },
  ];

  return <TableNested columns={columns} data={data} />;
}
