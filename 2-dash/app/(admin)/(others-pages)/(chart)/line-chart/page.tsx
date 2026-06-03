import LineChartOne from "@/src/components/charts/line/LineChartOne";
import ComponentCard from "@/src/components/common/ComponentCard";
import PageBreadcrumb from "@/src/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Soliton Core | Line Chart",
  description: "Soliton Core Line Chart for Dashboard",
};

export default function LineChart() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Line Chart" />
      <div className="space-y-6">
        <ComponentCard title="Line Chart1">
          <LineChartOne />
        </ComponentCard>
      </div>
    </div>
  );
}
