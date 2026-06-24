"use client";
import TableRevenue from "@/src/components/table/TableRevenue";

export default function Page() {
  const columns = [
    { key: "name", name: "Dashboard", path: "/" },
    { key: "age", name: "Age", path: "/age" },
    { key: "city", name: "City", path: "/city" },
  ];

  const data = [
    { key: "name", name: "Dashboard", path: "/" },
    { key: "age", name: "Age", path: "/age" },
    { key: "city", name: "City", path: "/city" },
  ];
  return <TableRevenue columns={columns} data={data} />;
}
