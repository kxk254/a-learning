"use client";
import TableNested, { Column } from "@/src/components/table/TableNested";
import { Badge } from "@/src/components/ui/button/Badge";

type Person = {
  name: string;
  age: number;
  city: string;
};
const columns: Column<Person>[] = [
  { key: "name", label: "Name" },
  {
    key: "age",
    label: "Age",
    render: (a) => <Badge color={"primary"}>{a.age}</Badge>,
  },
  { key: "city", label: "City" },
];

const data: Person[] = [
  { name: "Bob", age: 22, city: "New York" },
  { name: "Alice", age: 32, city: "Denver" },
];

export default function Admin() {
  return <TableNested columns={columns} data={data} />;
}
