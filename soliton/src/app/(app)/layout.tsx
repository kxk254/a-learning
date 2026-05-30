import styles from "./layout.module.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>sidebar</aside>

      <div className={styles.main}>
        <header>Topbar</header>

        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
