"use client";
import TableFlatten, { Column } from "@/src/components/table/TableFlatten";
import { Badge } from "@/src/components/ui/button/Badge";
import { StatusDot } from "@/src/components/ui/button/StatusDot";
import { Invoice, Revenue } from "@/src/data/soliton-type";
import { useState, useEffect } from "react";

type Data = { invoices: []; revenues: [] };

export default function AdminAdmin() {
  const [data, setData] = useState<Data | null>(null);
  useEffect(() => {
    fetch("/soliton.json")
      .then((res) => res.json())
      .then(setData);
  }, []);
  if (!data) return <div>Loading...</div>;

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
      <TableFlatten data={invoices} columns={invoiceColumn} />
    </>
  );
}
