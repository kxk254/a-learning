"use client";
import React from "react";

export type Column<T> = {
  key: keyof T;
  name: string;
  render?: (row: T) => React.ReactNode;
};

export type TableProps<T> = {
  column: Column<T>;
  data: T[];
};
