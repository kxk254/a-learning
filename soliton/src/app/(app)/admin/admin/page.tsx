"use client";
import TableNested, { Column } from "@/src/components/table/TableNested";
import { Badge } from "@/src/components/ui/button/Badge";
import { StatusDot } from "@/src/components/ui/button/StatusDot";
import Soliton from "@/src/data/soliton.json";

export type Product = { sku: string; name: string; price: number };
export type Order = {
  orderId: string;
  total: number;
  status: "Pending" | "Shipped" | "Delivered";
  products: Product[];
};
export type User = { id: number; name: string; orders: Order[] };

export const products: Product[] = [
  { sku: "ABC-01", name: "Machine-01", price: 100 },
  { sku: "ABC-02", name: "Machine-02", price: 200 },
  { sku: "ABC-03", name: "Machine-03", price: 300 },
];

export const orders: Order[] = [
  {
    orderId: "O001",
    total: 1,
    status: "Shipped",
    products: [products[0]],
  },
  {
    orderId: "O002",
    total: 3,
    status: "Pending",
    products: [products[1], products[2], products[1]],
  },
  {
    orderId: "O003",
    total: 4,
    status: "Delivered",
    products: [products[0], products[0], products[1], products[2]],
  },
];

export const users: User[] = [
  { id: 1, name: "McKenna", orders: [orders[0], orders[2]] },
  { id: 2, name: "Gavim", orders: [orders[1]] },
];

export default function AdminAdmin() {
  const productColumns: Column<Product>[] = [
    { key: "sku", label: "SKU" },
    { key: "price", label: "Price" },
  ];
  const orderColumns: Column<Order>[] = [
    { key: "orderId", label: "Order ID" },
    { key: "total", label: "Total" },
    {
      key: "status",
      label: "Status",
      render: (order) =>
        order.status === "Pending" ? (
          <StatusDot status="error">{order.status}</StatusDot>
        ) : order.status === "Shipped" ? (
          <StatusDot status="success">{order.status}</StatusDot>
        ) : (
          <StatusDot status="info">{order.status}</StatusDot>
        ),
    },
    {
      key: "products",
      label: "Products",
      render: (order) => (
        <TableNested columns={productColumns} data={order.products} />
      ),
    },
  ];

  const userColumns: Column<User>[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    {
      key: "orders",
      label: "Orders",
      render: (user) => (
        <TableNested columns={orderColumns} data={user.orders} />
      ),
    },
  ];
  return (
    <>
      <TableNested columns={userColumns} data={users} />{" "}
      <div>{Soliton[0].tenant_name}</div>
    </>
  );
}
