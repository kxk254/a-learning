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
  const usersUpdateCell = (row: React.Key, key: keyof User, value: string) => {
    setUsers((users) =>
      users.map((user, index) =>
        index === row ? { ...user, [key]: value } : user,
      ),
    );
  };
  const ordersUpdateCell = (
    userRow: React.Key,
    orderRow: number,
    key: keyof Order,
    value: number,
  ) => {
    setUsers((users) =>
      users.map((user) =>
        user.id === userRow
          ? {
              ...user,
              orders: user.orders.map((order, i) =>
                i === orderRow ? { ...order, [key]: value } : order,
              ),
            }
          : user,
      ),
    );
  };

  const addUser = () => {
    const newUser = { id: Date.now(), name: "", email: "", orders: [] };
    setUsers((prev) => [...prev, newUser]);
  };

  return (
    <>
      <TableNestedV
        columns={userColumn}
        data={users}
        renderRow={(p) => (
          <TableNestedV
            columns={orderColumn}
            data={p.orders}
            onCellUpdate={(row, key, value) =>
              ordersUpdateCell(p.id, Number(row), key, value)
            }
          />
        )}
        onCellUpdate={usersUpdateCell}
      />
      <button onClick={addUser}>AddUser</button>
    </>
  );
}
