"use client";
import TableNestedV, { Column } from "@/src/components/table/TableNestedV";
import { Badge } from "@/src/components/ui/button/Badge";
import { StatusDot } from "@/src/components/ui/button/StatusDot";
import { users, Order, User } from "@/src/data/test-data";

export default function AdminAdmin() {
  const orderColumn: Column<Order>[] = [
    { key: "orderId", label: "OrderId" },
    { key: "total", label: "Total" },
    { key: "status", label: "Status" },
    { key: "products", label: "Products" },
  ];
  const userColumn: Column<User>[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
  ];

  return (
    <TableNestedV
      columns={userColumn}
      data={users}
      renderRow={(p) => <TableNestedV columns={orderColumn} data={p.orders} />}
    />
  );
}
