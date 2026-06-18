"use client";
import { useState } from "react";

type Column<T> = {
  id: string;
  header: string;
  accessor: (row: T) => unknown;
  update?: (row: T, value: unknown) => T;
};

type RowWithId = { id: string | number };
