"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { BarsStaggered, CrossIcon } from "@/src/icons/index";
import styles from "./Header.module.css";
import { ThemeToggleBtn } from "@/src/components/header/ThemeToggleBtn";
import Image from "next/image";
import Link from "next/link";
import { useSidebar } from "@/src/context/SidebarContext";

export const AppHeader = () => {
  const { theme, toggleTheme } = useTheme();
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar, isExpanded } =
    useSidebar();

  const handleToggle = () => {
    let screenSize = window.innerWidth;
    const isLargeScreen = screenSize >= 1024;
    console.log("screen size :", screenSize, isLargeScreen);
    if (isLargeScreen) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  useEffect(() => {
    console.log("isExpanded changed", isExpanded);
  }, [isExpanded]);
  useEffect(() => {
    console.log("isMobileOpen changed =>", isMobileOpen);
  }, [isMobileOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.toolbar}>
          <button
            onClick={handleToggle}
            className={styles.handleBtn}
            aria-label="Toggle Sidebar"
          >
            {isMobileOpen ? (
              <BarsStaggered className={styles.barsStaggered} />
            ) : (
              <CrossIcon className={styles.barsStaggered} />
            )}
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
          {/* Three Dots for small screen hidden large */}
          {/*only large search input field
          <div>
            <form>
              <div></div>
            </form>
          </div>
	  only large search input field */}
        </div>
        {/* Application meny open  userDropDown*/}
        <div className={styles.headerRight}>
          <ThemeToggleBtn />
        </div>
        {/* Application meny open */}
      </div>
    </header>
  );
};
