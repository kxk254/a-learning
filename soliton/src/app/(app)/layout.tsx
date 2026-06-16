"use client";
import styles from "./Layout.module.css";
import { AppHeader } from "@/src/layout/AppHeader";
import { AppSidebar } from "@/src/layout/AppSidebar";
import { useSidebar } from "@/src/context/SidebarContext";
import { navItems, othersItems } from "@/src/data/base-nav-items";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  const mainContentMargin = isMobileOpen
    ? styles.ml0
    : isExpanded || isHovered
      ? styles.ml290
      : styles.ml90;

  return (
    <div className={styles.shell}>
      <AppSidebar navItems={navItems} othersItems={othersItems} />
      <div className={`${styles.main} ${mainContentMargin}`}>
        <AppHeader />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
