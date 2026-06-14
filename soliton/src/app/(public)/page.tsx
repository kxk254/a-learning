"use client";
import styles from "./Page.module.css";
import { useState } from "react";
import { GridLayout1 } from "@/src/components/grid/GridLayout1";

export default function Admin() {
  console.log("styles", styles.grid);
  return (
    <main>
      <section className={styles.grid}>
        <GridLayout1 title="Admin Page">Profile1</GridLayout1>
        <GridLayout1 title="RE Management">Profile1</GridLayout1>
        <GridLayout1 title="Invoice">Profile1</GridLayout1>
        <GridLayout1 title="Receipt">Profile1</GridLayout1>
        <GridLayout1 title="5">Profile1</GridLayout1>
      </section>
    </main>
  );
}
