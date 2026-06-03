import ComponentCard from "@/src/components/common/ComponentCard";
import PageBreadcrumb from "@/src/components/common/PageBreadCrumb";
import BasicTableOne from "@/src/components/tables/BasicTableOne";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Solition Core | Table",
  description: "This is our basic table page for Soliton Core",
};

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pagetitle="Basic Table" />
      <div>
        <ComponentCard title="Basic Table 1">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </div>
  );
}
