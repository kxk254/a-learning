"use client";
import TableNested from "@/src/components/table/TableNested";
import { Badge } from "@/src/components/ui/button/Badge";

type Person = {
  key: string;
  label: string;
  render: () => React.Reactnode;
};
const columns = [
  { key: "name", label: "Name" },
  {
    key: "age",
    label: "Age",
    render: (a) => <Badge color={"primary"}>{a.age}</Badge>,
  },
  { key: "city", label: "City" },
];

const data = [
  { name: "Bob", age: 22, city: "New York" },
  { name: "Alice", age: 32, city: "Denver" },
];

export default function Admin() {
  return <TableNested columns={columns} data={data} />;
}
