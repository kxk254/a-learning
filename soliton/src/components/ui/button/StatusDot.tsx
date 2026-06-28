"use client";
import styles from "./StatusDot.module.css";
import React from "react";

type StatusDotProps = {
  status: "success" | "warning" | "error" | "info";
  children?: React.ReactNode;
};

export function StatusDot({ status, children }: StatusDotProps) {
  const statusEmoji = {
    success: "🟢",
    warning: "🟡",
    info: "🔵",
    error: "🔴",
  };
  return (
    <span>
      {statusEmoji[status]} {children}
    </span>
  );
}
