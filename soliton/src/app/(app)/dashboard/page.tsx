export default function dashboard() {
  const name: string = "john";
  const age: number = 25;

  type User = { id: string; name: string; age: number };

  const user: User = { id: "1", name: "Alice", age: 30 };

  function identity<T>(value: T): T {
    return value;
  }

  const message = identity<string>("Hello TypeScript");
  const number = identity<number>(100);

  type Column<T> = {
    id: string;
    header: string;
    accessor: (row: T) => unknown;
  };

  const nameColumn: Column<User> = {
    id: "name",
    header: "Name",
    accessor: (row) => {
      return row.name;
    },
  };

  return (
    <>
      DASHBOARD
      <p>{user.name}</p>
      <p>{message}</p>
      <p>{number}</p>
      <p>Column value:{String(nameColumn.accessor(user))}</p>
    </>
  );
}
