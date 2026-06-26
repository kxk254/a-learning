"use client";
import TableNested, { Column } from "@/src/components/table/TableNested";
import { Badge } from "@/src/components/ui/button/Badge";

export type Product = {
  sku: string;
  name: string;
  price: number;
};

export type Order = {
  orderId: number;
  total: number;
  status: "Pending" | "Shipped" | "Delivered";
  products: Product[];
};

export type User = {
  id: number;
  name: string;
  email: string;
  orders: Order[];
};

export const users: User[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    orders: [
      {
        orderId: 1001,
        total: 149.97,
        status: "Delivered",
        products: [
          {
            sku: "KB-001",
            name: "Mechanical Keyboard",
            price: 89.99,
          },
          {
            sku: "MS-002",
            name: "Wireless Mouse",
            price: 59.98,
          },
        ],
      },
      {
        orderId: 1002,
        total: 29.99,
        status: "Pending",
        products: [
          {
            sku: "PD-003",
            name: "Mouse Pad",
            price: 29.99,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    orders: [
      {
        orderId: 2001,
        total: 999.99,
        status: "Shipped",
        products: [
          {
            sku: "LP-101",
            name: "Laptop",
            price: 999.99,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    orders: [
      {
        orderId: 3001,
        total: 259.97,
        status: "Delivered",
        products: [
          {
            sku: "HD-501",
            name: "External SSD",
            price: 129.99,
          },
          {
            sku: "CB-202",
            name: "USB-C Cable",
            price: 19.99,
          },
          {
            sku: "HC-303",
            name: "USB Hub",
            price: 109.99,
          },
        ],
      },
      {
        orderId: 3002,
        total: 79.99,
        status: "Pending",
        products: [
          {
            sku: "HP-404",
            name: "Headphones",
            price: 79.99,
          },
        ],
      },
    ],
  },
];

export default function Admin() {
  const productColumns: Column<Product>[] = [
    { key: "sku", label: "SKU" },
    { key: "price", label: "Price" },
  ];

  const orderColumns: Column<Order>[] = [
    { key: "orderId", label: "Order ID" },
    { key: "total", label: "Total" },
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

  return <TableNested columns={userColumns} data={users} />;
}
