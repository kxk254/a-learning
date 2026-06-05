"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./Sidebar.module.css";
import { useSidebar } from "@/src/context/SidebarContext";
import {
  BoxCubeIcon,
  CalendarIcon,
  UserCircleIcon,
  PieChartIcon,
  PlugInIcon,
} from "@/src/icons/index";

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

const othersItems: NavItem[] = [
  {
    icon: <PieChartIcon />,
    name: "Charts",
    subItems: [
      { name: "Line Chart", path: "/line-chart", pro: false },
      { name: "Bar Chart", path: "/bar-chart", pro: false },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: "UI Elements",
    subItems: [
      { name: "Alerts", path: "/alerts", pro: false },
      { name: "Avatar", path: "/avatars", pro: false },
      { name: "Badge", path: "/badge", pro: false },
      { name: "Buttons", path: "/buttons", pro: false },
      { name: "Images", path: "/images", pro: false },
      { name: "Videos", path: "/videos", pro: false },
    ],
  },
  {
    icon: <PlugInIcon />,
    name: "Authentication",
    subItems: [
      { name: "Sign In", path: "/signin", pro: false },
      { name: "Sign Up", path: "/signup", pro: false },
    ],
  },
];

export const AppSidebar = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "others",
  ) => (
    <ul className={styles.ulStyle}>
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button>
              <span>{nav.icon}</span>
              <span>{nav.name}</span>
            </button>
          ) : (
            nav.path && (
              <Link href={nav.path}>
                <span>{nav.icon}</span>
              </Link>
            )
          )}
        </li>
      ))}
    </ul>
  );
  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {},
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  useEffect(() => {
    let subMenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({ type: menuType as "main" | "others", index });
              subMenuMatched = true;
            }
          });
        }
      });
    });

    if (!subMenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  return (
    <>
      <aside
        className={`${styles.sidebar} 
	${
    isExpanded || isMobileOpen
      ? styles.wide
      : isHovered
        ? styles.wide
        : styles.narrow
  }
	${isMobileOpen ? styles.mobileVisible : styles.mobileHidden}
	      `}
        onMouseEnter={() => !isExpanded && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Logo Link */}
        <div className={styles.asideLogoWrapper}>
          <Link href="/">
            {isExpanded || isHovered ? (
              <Image
                src="/images/logo/text-logo-dark.svg"
                alt="logo"
                width={154}
                height={40}
              />
            ) : (
              <Image
                src="/images/logo/logo-dark.svg"
                alt="logo"
                width={32}
                height={32}
              />
            )}
          </Link>
        </div>
        {renderMenuItems(navItems, "main")}
        <h2 className={styles.logo}>Soliton Core</h2>
      </aside>
    </>
  );
};
