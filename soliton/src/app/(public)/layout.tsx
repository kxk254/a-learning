import styles from "./Layout.module.css";
import { AppHeader } from "@/src/layout/AppHeader";
import { AppSidebar } from "@/src/layout/AppSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.shell}>
      <AppSidebar />
      <div className={styles.main}>
        <AppHeader />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
