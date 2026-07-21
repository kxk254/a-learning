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
type LookupData = { tenants: Tenant[]; bukkens: Bukken[] };
type History<T> = { past: T[]; present: T; future: T[] };

export default function AdminAdmin() {
  const [state, dispatch] = useReducer(
    stateReducer,
    null as History<Data> | null,
  );
  const [lookups, setLookups] = useState<LookupData>(null);
  useEffect(() => {
    const load = async () => {
      const res = await fetch("/soliton.json");
      const json = await res.json();
      dispatch({
        type: "INIT",
        payload: json,
      });
    };
    load();
  }, []);
  if (!state)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );

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
        data={state.present.invoices}
        columns={invoiceColumn}
        getRowKey={(invoice) => invoice.id}
        onCellUpdate={(a) => {
          console.log("update", a, "apply action --->");
          dispatch({ payload: a, type: "UPDATE", section: "invoices" });
        }}
        onDelete={(d) => {
          console.log("del", d);
          dispatch({ payload: { id: d }, type: "DELETE", section: "invoices" });
        }}
        onAdd={(a) => {
          console.log("onAdd page", a);
          dispatch({ payload: a, type: "CREATE", section: "invoices" });
        }}
        renderRow={(invoice) => (
          <FlattenTable
            data={state.present.revenues.filter(
              (r) => r.invoiceid === invoice.invoiceid,
            )}
            columns={revenueColumn}
            getRowKey={(revenue) => revenue.id}
            onCellUpdate={(u) => {
              console.log("updated", u);
              dispatch({ payload: u, type: "UPDATE", section: "revenues" });
            }}
            onDelete={(d) => {
              console.log("delete", d);
              dispatch({
                payload: { id: d },
                type: "DELETE",
                section: "revenues",
              });
            }}
            onAdd={(a) => {
              console.log("on Add", a, "invoiceid", invoice.invoiceid);
              dispatch({
                payload: { ...a, invoiceid: invoice.invoiceid },
                type: "CREATE",
                section: "revenues",
              });
            }}
          />
        )}
      />
    </>
  );
}

type Action =
  | { type: "INIT"; payload: Data }
  | {
      type: "UPDATE";
      section: keyof Data;
      payload: { id: React.Key; key: string; value: string };
    }
  | {
      type: "CREATE";
      section: keyof Data;
      payload: Partial<Revenue> | Partial<Invoice>;
    }
  | {
      type: "DELETE";
      section: keyof Data;
      payload: { id: React.Key };
    };
function stateReducer(
  state: History<Data> | null,
  action: Action,
): History<Data> | null {
  let newState;
  switch (action.type) {
    case "CREATE":
      if (!state) return state;
      newState = {
        ...state,
        present: {
          ...state.present,
          [action.section]: [...state.present[action.section], action.payload],
        },
      };
      console.log("new state at CREATE", newState);
      return newState;
    case "UPDATE":
      if (!state) return state;
      newState = {
        ...state,
        present: {
          ...state.present,
          [action.section]: state.present[action.section].map((row) =>
            row.id === action.payload.id
              ? { ...row, [action.payload.key]: action.payload.value }
              : row,
          ),
        },
      };
      console.log("updated in reducer", newState);
      return newState;
    case "DELETE":
      if (!state) return state;
      newState = {
        ...state,
        present: {
          ...state.present,
          [action.section]: state.present[action.section].filter(
            (row) => row.id !== action.payload.id,
          ),
        },
      };
      return newState;
    case "INIT":
      return { past: [], present: action.payload, future: [] };
    default:
      return state;
  }
}
