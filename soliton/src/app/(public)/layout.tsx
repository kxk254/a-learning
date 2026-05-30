import styles from "./layout.module.css";
import { AppHeader } from "@/src/layout/AppHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        sidebar
        <h1 className={styles.logo}>Soliton Core</h1>
      </aside>

      <div className={styles.main}>
        <AppHeader />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
