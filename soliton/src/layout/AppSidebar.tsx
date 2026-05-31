"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { BoxCubeIcon, CalendarIcon, UserCircleIcon } from "@/src/icons/index";
import styles from "./sidebar.module.css";

type NavItem = {
  name: string;
  icon: react.ReactNode;
  path?: string;
  subItems?: { name: string; path: string }[];
};

const navItems: NavItem[] = [
  {
    icon: <BoxCubeIcon />,
    name: "Dashboard",
    subItems: [{ name: "Ecommerce", path: "/" }],
  },
  {
    icon: <CalendarIcon />,
    name: "Calendar",
    subItems: [
      { name: "Month", path: "/" },
      { name: "Year", path: "/" },
      { name: "Day", path: "/" },
    ],
  },
  {
    icon: <UserCircleIcon />,
    name: "User",
    path: "/",
  },
];

export const AppSidebar = () => {
  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "others",
  ) => (
    <ul>
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          <span>{nav.icon}</span>
          <span>{nav.name}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <aside className={styles.sidebar}>
      <BoxCubeIcon />
      {renderMenuItems(navItems, "main")}
      <h2 className={styles.logo}>Soliton Core</h2>
    </aside>
  );
};
