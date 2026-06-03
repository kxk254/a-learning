import BarChartOne from "@/src/components/charts/bar/BarChartOne";
import ComponentCard from "@/src/components/common/ComponentCard";
import PageBreadcrumb from "@/src/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Soliton Core | Chart",
  description: "Soliton Core Chart Examples for Dashboard",
};

export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Bar Chart" />
      <div className="space-y-6">
        <ComponentCard title="Bar Chart1">
          <BarChartOne />
        </ComponentCard>
      </div>
    </div>
  );
}
