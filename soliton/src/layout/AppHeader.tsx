"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { BarsStaggered } from "@/src/icons/index";
import styles from "./Header.module.css";
import { ThemeToggleBtn } from "@/src/components/header/ThemeToggleBtn";
import Image from "next/image";
import Link from "next/link";
import { useSidebar } from "@/src/context/SidebarContext";

export const AppHeader = () => {
  const { theme, toggleTheme } = useTheme();
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const handleToggle = () => {
    console.log("handleToggle");
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  return (
    <header className={styles.header}>
      <button onClick={handleToggle} className={styles.handleBtn}>
        <BarsStaggered className={styles.barsStaggered} />
      </button>
      <Link href="/" className={styles.logo}>
        {theme === "light" ? (
          <Image
            className={styles.logoLight}
            src="./images/logo/text-logo.svg"
            alt="Logo"
            width={154}
            height={32}
          />
        ) : (
          <Image
            className={styles.logoDark}
            src="./images/logo/text-logo-dark.svg"
            alt="logo"
            width={154}
            height={32}
          />
        )}
      </Link>
      <div className={styles.headerRight}>
        <ThemeToggleBtn />
      </div>
    </header>
  );
};
