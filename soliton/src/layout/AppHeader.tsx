"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { BarsStaggered, CrossIcon, ThreeDotsIcon } from "@/src/icons/index";
import styles from "./Header.module.css";
import { ThemeToggleBtn } from "@/src/components/header/ThemeToggleBtn";
import Image from "next/image";
import Link from "next/link";
import { useSidebar } from "@/src/context/SidebarContext";

export const AppHeader = () => {
  const { theme, toggleTheme } = useTheme();
  const [isApplicationMenuOpen, setIsApplicationMenuOpen] = useState(false);
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar, isExpanded } =
    useSidebar();

  const handleToggle = () => {
    let screenSize = window.innerWidth;
    const isLargeScreen = screenSize >= 1024;
    console.log("screen size :", screenSize, isLargeScreen);
    if (isLargeScreen) {
      toggleSidebar();
      console.log("handle toggle togglesidebar activated");
    } else {
      toggleMobileSidebar();
      console.log("handle toggle toggleMOBILEsidebar activated");
    }
  };

  useEffect(() => {
    console.log("isExpanded changed", isExpanded);
  }, [isExpanded]);
  useEffect(() => {
    console.log("isMobileOpen changed =>", isMobileOpen);
  }, [isMobileOpen]);

  const toggleApplicationMenu = () => {
    setIsApplicationMenuOpen(!isApplicationMenuOpen);
  };

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
              <CrossIcon className={styles.barsStaggered} />
            ) : (
              <BarsStaggered className={styles.barsStaggered} />
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
          <button
            onClick={toggleApplicationMenu}
            className={styles.threeDotsBtn}
          >
            <ThreeDotsIcon className={styles.threeDotsIcon} />
          </button>
          {/*only large search input field */}
          <div
            className={`${isApplicationMenuOpen ? styles.appOpen : styles.appClose}`}
          >
            this
            <form>
              <div>THIS</div>
            </form>
          </div>
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
