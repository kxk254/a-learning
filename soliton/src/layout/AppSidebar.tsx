"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "../context/ThemeContext";
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
  HorizontalDots,
  GridIcon,
  ListIcon,
  TableIcon,
  PageIcon,
  ChevronDownIcon,
} from "@/src/icons/index";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string }[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    subItems: [
      { name: "Ecommerce", path: "/" },
      { name: "Chart", path: "/chart" },
      { name: "On-Line", path: "/c" },
      { name: "Amazon", path: "/d" },
      { name: "Google Shop", path: "/e" },
    ],
  },
  {
    icon: <CalendarIcon />,
    name: "Calendar",
    path: "/calendar",
  },
  {
    icon: <UserCircleIcon />,
    name: "User Profile",
    path: "/profile",
  },
  {
    icon: <UserCircleIcon />,
    name: "Login",
    path: "/login",
  },

  {
    name: "Forms",
    icon: <ListIcon />,
    subItems: [
      { name: "Form Elements", path: "/form-elements" },
      { name: "New Elements", path: "/form-elementsa" },
      { name: "Old Elements", path: "/form-elementsb" },
    ],
  },
  {
    name: "Tables",
    icon: <TableIcon />,
    subItems: [{ name: "Basic Tables", path: "/table" }],
  },
  {
    name: "Pages",
    icon: <PageIcon />,
    subItems: [
      { name: "Blank Page", path: "/blank" },
      { name: "404 Error", path: "/error-404" },
    ],
  },
];

const othersItems: NavItem[] = [
  {
    icon: <PieChartIcon />,
    name: "Charts",
    subItems: [
      { name: "Line Chart", path: "/line-chart" },
      { name: "Bar Chart", path: "/bar-chart" },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: "UI Elements",
    subItems: [
      { name: "Alerts", path: "/alerts" },
      { name: "Avatar", path: "/avatars" },
      { name: "Badge", path: "/badge" },
      { name: "Buttons", path: "/buttons" },
      { name: "Images", path: "/images" },
      { name: "Videos", path: "/videos" },
    ],
  },
  {
    icon: <PlugInIcon />,
    name: "Authentication",
    subItems: [
      { name: "Sign In", path: "/signin" },
      { name: "Sign Up", path: "/signup" },
    ],
  },
];

export const AppSidebar = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const theme = useTheme();

  const renderMenuItems = (
    navItems: NavItem[],
    menuType: "main" | "others",
  ) => (
    <ul className={styles.ulStyle}>
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`${styles.menuItem} ${styles.group} 
${
  openSubmenu?.type === menuType && openSubmenu?.index === index
    ? styles.menuItemActive
    : styles.menuItemInactive
}
		      ${
            !isExpanded && !isHovered && !isMobileOpen
              ? styles.justifyCenter
              : styles.justifyStart
          }`}
            >
              <span
                className={`${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? styles.menuItemIconActive
                    : styles.menuItemIconInactive
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span>{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`${styles.chevronDownIcon} ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? styles.chevronDownIconRotate
                      : null
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`${styles.menuItem} ${styles.group} ${
                  isActive(nav.path)
                    ? styles.menuItemActive
                    : styles.menuItemInactive
                }`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? styles.menuItemIconActive
                      : styles.menuItemIconInactive
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className={styles.menuItemText}>{nav.name}</span>
                )}
              </Link>
            )
          )}

          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className={styles.subItemsDiv}
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className={styles.subItemsUl}>
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`${styles.menuDropdownItem} ${
                        isActive(subItem.path)
                          ? styles.menuDropdownItemActive
                          : styles.menuDropdownItemInactive
                      }`}
                    >
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
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

  // Open Submenu and Close Previous Submenu
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

  // Measures haw tall the open submenu is and stores that height for animations
  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      const el = subMenuRefs.current[key];
      console.log("open submenu -->", key, "submenu refs elements :", el);
      if (el) {
        const height = el.scrollHeight || 0;
        console.log("submenu height ==", height);
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: height,
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

  console.log("theme === ", theme.theme);
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
            {theme.theme === "light" ? (
              isExpanded || isHovered ? (
                <Image
                  src="/images/logo/text-logo.svg"
                  alt="logo"
                  width={154}
                  height={40}
                />
              ) : (
                <Image
                  src="/images/logo/logo.svg"
                  alt="logo"
                  width={32}
                  height={32}
                />
              )
            ) : isExpanded || isHovered ? (
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
        {/* Menu Bar */}
        <div className={`${styles.menuBarOne} no-scrollbar`}>
          <nav className={styles.nav}>
            <div className={styles.menuBarTwo}>
              <div>
                <h2
                  className={`${styles.menuH2} ${
                    !isExpanded && !isHovered && !isMobileOpen
                      ? styles.justifyCenter
                      : styles.justifyStart
                  }`}
                >
                  {isExpanded || isHovered || isMobileOpen ? (
                    "Menu"
                  ) : (
                    <HorizontalDots />
                  )}
                </h2>
                {renderMenuItems(navItems, "main")}
              </div>
              <div>
                <h2
                  className={`${styles.menuH2} ${
                    !isExpanded && !isHovered && !isMobileOpen
                      ? styles.justifyCenter
                      : styles.justifyStart
                  }`}
                >
                  {isExpanded || isHovered || isMobileOpen ? (
                    "Others"
                  ) : (
                    <HorizontalDots />
                  )}
                </h2>
                {renderMenuItems(othersItems, "others")}
              </div>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};
