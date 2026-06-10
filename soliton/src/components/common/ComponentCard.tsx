import React from "react";
import styles from "./Common.module.css";

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  desc?: string;
}

export const ComponentCard = ({
  title,
  children,
  className = "",
  desc = "",
}: ComponentCardProps) => {
  return (
    <div className={styles.componentDiv}>
      <div className={styles.componentDiv2}>
        <h3 className={styles.componentH3}>{title}</h3>
        {desc && <p className={styles.componentP}>{desc}</p>}
      </div>

      <div className={styles.componentDiv3}>
        <div className={styles.componentDiv4}>{children}</div>
      </div>
    </div>
  );
};
