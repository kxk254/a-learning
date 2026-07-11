"use client";
import TableFlatten, {
  Column,
  FlattenTable,
} from "@/src/components/table/TableFlatten";
import { Badge } from "@/src/components/ui/button/Badge";
import { StatusDot } from "@/src/components/ui/button/StatusDot";
import { Invoice, Revenue } from "@/src/data/soliton-type";
import { useState, useEffect, useReducer } from "react";
import { LoadingSpinner } from "@/src/components/ui/button/LoadingSpinner";

type Data = {
  invoices: Invoice[];
  revenues: Revenue[];
};
type History<T> = { past: T[]; present: T; future: T[] };

export default function AdminAdmin() {
  const [data, setData] = useState<Data | null>(null);
  const [state, setState] = useState<History<Data> | null>(null);
  const [todos, dispatch] = useReducer(stateReducer, {});
  useEffect(() => {
    const load = async () => {
      const res = await fetch("/soliton.json");
      const json = await res.json();
      setData(json);
      setState({ past: [], present: json, future: [] });
    };
    load();
  }, []);
  if (!state)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );

  const { invoices, revenues } = state.present;
  console.log("data invoices", invoices);

  const invoiceColumn: Column<Invoice>[] = [
    { key: "id", label: "Id" },
    { key: "tenant_name", label: "TenantName" },
    { key: "bukken_name", label: "BukkenName" },
    { key: "invoiceid", label: "InvoiceId" },
  ];
  const revenueColumn: Column<Revenue>[] = [
    { key: "id", label: "ID" },
    { key: "tenant_name", label: "TenantName" },
    { key: "bukken_name", label: "BukkenName" },
    { key: "account_code_name", label: "AccountCode" },
  ];

  return (
    <>
      <TableFlatten
        data={invoices}
        columns={invoiceColumn}
        getRowKey={(invoice) => invoice.id}
        onCellUpdate={(a) => {
          setState((prev) => ({
            ...prev.present,
            present: prev.present.map((r) =>
              r.id === a.row ? { ...r, [a.key]: a.value } : r,
            ),
          }));
          console.log("update", a);
          dispatch({ state: a, type: "UPDATE" });
        }}
        onDelete={(d) => {
          d;
          console.log("del", d);
        }}
        onAdd={(a) => {
          a;
          dispatch({ state: a, action: "CREATE" });
          console.log("onAdd page", a);
        }}
        renderRow={(invoice) => (
          <FlattenTable
            data={revenues.filter((r) => r.invoiceid === invoice.invoiceid)}
            columns={revenueColumn}
            getRowKey={(revenue) => revenue.id}
            onCellUpdate={(u) => {
              u;
              console.log("updated", u);
            }}
            onDelete={(d) => {
              d;
              console.log("delete", d);
            }}
            onAdd={(a) => {
              a;
              console.log("on Add", a);
            }}
          />
        )}
      />
    </>
  );
}

function stateReducer(state: any, action: any) {
  switch (action.type) {
    case "CREATE":
      return "added";
    case "UPDATE":
      console.log("updated in reducer", state);
      return "updated";
    case "DELETE":
      return "deleted";
    default:
      return state;
  }
}
