"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  BarsStaggered,
  CrossIcon,
  ThreeDotsIcon,
  SearchIcon,
  SignOutIcon,
} from "@/src/icons/index";
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
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggle = () => {
    let screenSize = window.innerWidth;
    const isLargeScreen = screenSize >= 1024;
    if (isLargeScreen) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  useEffect(() => {}, [isMobileOpen]);

  const toggleApplicationMenu = () => {
    setIsApplicationMenuOpen(!isApplicationMenuOpen);
  };
  useEffect(() => {}, [isApplicationMenuOpen]);

  const [open, setOpen] = useState(false);

  const renderSearchInput = () => (
    <>
      <div className={styles.searchSection}>
        <form>
          <div className={styles.searchInnerDiv}>
            <span className={styles.searchIconField}>
              <SearchIcon className={styles.searchIcon} />
            </span>
            <input
              className={styles.searchInput}
              ref={inputRef}
              type="text"
              placeholder="Search or type command..."
            />
            <button className={styles.searchBtn}>
              <span>⌘</span>
              <span>K</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div
          className={styles.toolbar}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => {
            setOpen(false);
          }}
        >
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
                src="/images/logo/text-logo.svg"
                alt="Logo"
                width={154}
                height={32}
              />
            ) : (
              <Image
                className={styles.logoDark}
                src="/images/logo/text-logo-dark.svg"
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
          {renderSearchInput()}
        </div>
        {/* Application meny open  userDropDown*/}
        <div
          className={`${isApplicationMenuOpen && open ? styles.appOpen : styles.appClose} ${styles.appOpenLg}`}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => {
            setOpen(false);
            setIsApplicationMenuOpen(false);
          }}
        >
          <div
            className={`${
              isApplicationMenuOpen ? styles.appMenuOpen : styles.appMenuClose
            }`}
          >
            <div>
              <ThemeToggleBtn />
            </div>
            <Link href="#" className={styles.signOutLink}>
              <SignOutIcon className={styles.signOutIcon} />
            </Link>
          </div>
        </div>
        {/* Application meny open */}
      </div>
    </header>
  );
};
