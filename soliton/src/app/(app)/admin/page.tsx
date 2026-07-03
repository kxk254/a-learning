"use client";
import TableNested, { Column } from "@/src/components/table/TableNested";
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
  const [users, setUsers] = useState(initialUsers);
  const usersUpdateCell = (row: React.Key, key: keyof User, value: string) => {
    setUsers((prev) =>
      prev.map((item, index) =>
        index === row ? { ...item, [key]: value } : item,
      ),
    );
  };
  const ordersUpdateCell = (
    usersRow: React.Key,
    ordersRow: number,
    key: keyof Order,
    value: string,
  ) => {
    setUsers((users) =>
      users.map((user) =>
        user.id === Number(usersRow)
          ? {
              ...user,
              orders: user.orders.map((order, i) =>
                i === ordersRow ? { ...order, [key]: value } : order,
              ),
            }
          : user,
      ),
    );
  };

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
      onCellUpdate={usersUpdateCell}
    />
  );
}
