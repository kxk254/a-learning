export default function Dashboard() {
  type TableProps<T> = { data: T[] };

  type User = { id: number; name: string };

  const props: TableProps<User> = {
    data: [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ],
  };

  const badProps: TableProps<number> = { data: [1, 2, 3] };
}
