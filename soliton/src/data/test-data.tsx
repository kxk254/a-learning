export interface Order {
  orderId: number;
  total: number;
  status: "Pending" | "Shipped" | "Delivered";
  products: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  orders: Order[];
}

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
        products: "KB-001",
      },
      {
        orderId: 1002,
        total: 29.99,
        status: "Pending",
        products: "KB-002",
      },
      {
        orderId: 1003,
        total: 29.99,
        status: "Pending",
        products: "KB-001",
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
        products: "KB-001",
      },
      {
        orderId: 2001,
        total: 999.99,
        status: "Shipped",
        products: "KB-002",
      },
      {
        orderId: 2001,
        total: 999.99,
        status: "Shipped",
        products: "KB-003",
      },
      {
        orderId: 2001,
        total: 999.99,
        status: "Shipped",
        products: "KB-001",
      },
    ],
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    orders: [
      {
        orderId: 2001,
        total: 999.99,
        status: "Shipped",
        products: "KB-001",
      },
      {
        orderId: 2001,
        total: 999.99,
        status: "Shipped",
        products: "KB-002",
      },
      {
        orderId: 2001,
        total: 999.99,
        status: "Shipped",
        products: "KB-003",
      },
    ],
  },
];
