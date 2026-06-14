import styles from "./Grid.module.css";
import React from "react";

type Props = { title: string; children: React.ReactNode };

export function GridLayout1({ title, children }: Props) {
  console.log("card style", styles.card);
  return (
    <div className={styles.card}>
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
}
