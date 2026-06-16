"use client";
import styles from "./Page.module.css";
import { useState } from "react";
import { GridLayout1 } from "@/src/components/grid/GridLayout1";
import Calendar from "@/src/components/calendar/Calendar";
import {
  RealEstateIcon,
  AdminIcon,
  AccountingIcon,
  PhotoUploadIcon,
} from "@/src/icons/index";

export default function Admin() {
  console.log("styles", styles.grid);
  return (
    <main>
      <section className={styles.grid}>
        <GridLayout1
          title="Admin Page"
          icon={AdminIcon}
          path="/"
          disabled={false}
        >
          Profile1
        </GridLayout1>
        <GridLayout1 title="RE Management" icon={RealEstateIcon}>
          Profile1
        </GridLayout1>
        <GridLayout1 title="Invoice" icon={AccountingIcon}>
          Profile1
        </GridLayout1>
        <GridLayout1 title="Receipt" icon={PhotoUploadIcon} disabled={true}>
          Profile1
        </GridLayout1>
        <Calendar />
      </section>
    </main>
  );
}
