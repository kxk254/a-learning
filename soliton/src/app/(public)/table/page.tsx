import Table from "@/src/components/table/Table";
import styles from "./Page.module.css";

const columns = [
  {
    key: "name",
    header: "Name",
    width: "200px",
    headerClassName: styles.headerRight,
    cellClassName: styles.cellRight,
  },
  {
    key: "age",
    header: "Age",
    width: "100px",
    headerClassName: "headerRight",
    cellClassName: "cellRight",
  },
  {
    key: "city",
    header: "City",
    width: "150px",
    headerClassName: "headerRight",
    cellClassName: "cellRight",
  },
];

const data = [
  { name: "John", age: 25, city: "Tokyo" },
  { name: "Alice", age: 30, city: "Osaka" },
];

export default function Page() {
  return <Table columns={columns} data={data} rowHeight="20px" />;
}
