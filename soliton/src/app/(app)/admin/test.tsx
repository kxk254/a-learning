"use client";
import TableFlatten, {
  Column,
  FlattenTable,
} from "@/src/components/table/TableFlatten";
import { Badge } from "@/src/components/ui/button/Badge";
import { StatusDot } from "@/src/components/ui/button/StatusDot";
import { Invoice, Revenue } from "@/src/data/soliton-type";
import { useState, useEffect } from "react";
import { LoadingSpinner } from "@/src/components/ui/button/LoadingSpinner";

type Data = { invoices: Invoice[]; revenues: Revenue[] };

export default function AdminAdmin() {
  const [data, setData] = useState<Data | null>(null);
  useEffect(() => {
    const load = async () => {
      fetch("/soliton.json")
        .then((res) => res.json())
        .then(setData);
    };
    load();
  }, []);
  if (!data)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );

  const { invoices, revenues } = data;

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
        renderRow={(invoice) => (
          <FlattenTable
            data={revenues.filter((r) => r.invoiceid === invoice.invoiceid)}
            columns={revenueColumn}
            getRowKey={(revenue) => revenue.id}
          />
        )}
      />
    </>
  );
}
