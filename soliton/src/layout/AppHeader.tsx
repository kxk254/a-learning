"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { BarsStaggered } from "@/src/icons/index";
import styles from "./Header.module.css";
import { ThemeToggleBtn } from "@/src/components/header/ThemeToggleBtn";

export const AppHeader = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <BarsStaggered />
      <div className={styles.headerRight}>
        <ThemeToggleBtn />
      </div>
    </header>
  );
};
