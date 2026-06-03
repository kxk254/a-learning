"use client";

import { useTheme } from "../../context/ThemeContext";
import React from "react";

export default function ThemeTogglerTwo() {
  const { toggleTheme } = useTheme();
  return (
    <button>
      <svg></svg>
      <svg></svg>
    </button>
  );
}
