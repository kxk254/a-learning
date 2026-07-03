"use client";
import TableNestedV, { Column } from "@/src/components/table/TableNestedV";
import { Badge } from "@/src/components/ui/button/Badge";
import { StatusDot } from "@/src/components/ui/button/StatusDot";
import { users as initialUsers, Order, User } from "@/src/data/test-data";
import { useState } from "react";

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
  const [users, setUsers] = useState<User[]>(initialUsers);
  const userUpdateCell = (row: React.Key, key: keyof User, value: string) => {
    setUsers((prev) =>
      prev.map((item, i) => (i === row ? { ...item, [key]: value } : item)),
    );
  };
  const pordersUpdateCell = (
    rowUser: React.Key,
    rowOrder: number,
    key: keyof Order,
    value: string,
  ) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id !== rowUser) return user;
        const updatedOrders = [...user.orders];
        updatedOrders[rowOrder] = { ...updatedOrders[rowOrder], [key]: value };
        return { ...user, orders: updatedOrders };
      }),
    );
  };

  return (
    <TableNestedV
      columns={userColumn}
      data={users}
      renderRow={(p) => (
        <TableNestedV
          columns={orderColumn}
          data={p.orders}
          onCellUpdate={(row, key, value) =>
            pordersUpdateCell(p.id, Number(row), key, value)
          }
        />
      )}
      onCellUpdate={userUpdateCell}
    />
  );
}
