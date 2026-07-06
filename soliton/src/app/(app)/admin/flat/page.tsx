"use client";
import TableFlatten, { Column } from "@/src/components/table/TableFlatten";
import { Badge } from "@/src/components/ui/button/Badge";
import { StatusDot } from "@/src/components/ui/button/StatusDot";
import { inovoices, revenues } from "@/src/data/soliton-type";
import { useState } from "react";

export default function AdminAdmin() {
  const res = await fetch("@/src/data/soliton.json");
  const data = await res.json();
  const revenues = data.revenues;
  const invoices = data.invoices;

  const invoiceColumn: Column<invoices>[] = [
    { key: "orderId", label: "OrderId" },
    { key: "total", label: "Total" },
    { key: "status", label: "Status" },
    { key: "products", label: "Products" },
  ];
  const revenueColumn: Column<revenues>[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
  ];
  const [users, setUsers] = useState(initialUsers);

  return (
    <TableNested
      columns={userColumn}
      data={users}
      renderRow={(p) => (
        <TableNested
          columns={orderColumn}
          data={p.orders}
          onCellUpdate={(row, key, value) =>
            ordersUpdateCell(p.id, Number(row), key, value)
          }
        />
      )}
    />
  );
}
