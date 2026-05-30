"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { BoxCubeIcon, CalenderIcon, UserCircleIcon } from "@/src/icons/index";

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
    icon: <CalenderIcon />,
    name: "Calender",
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

export const AppSidebar = () => {};
