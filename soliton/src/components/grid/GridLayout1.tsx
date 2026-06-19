import styles from "./Grid.module.css";
import { Badge } from "../ui/button/Badge";
import React, { ElementType } from "react";
import { DisabledIcon, CheckCircleIcon } from "@/src/icons/index";

type Props = {
  title: string;
  icon?: ElementType;
  children: React.ReactNode;
  path?: string;
  className?: string;
  disabled?: boolean;
};

export function GridLayout1({
  title,
  icon: Icon,
  children,
  path,
  className = "",
  disabled = false,
}: Props) {
  console.log("card style", Icon);
  return (
    <div
      className={`${disabled ? styles.disabledCard : styles.card} ${className}`}
    >
      <div className={styles.gridDiv1}>
        <span>{Icon && <Icon className={styles.gridIcon} />}</span>
        <h2 className={styles.gridH2}>{title}</h2>
      </div>
      <div className={styles.gridDiv2}>
        <div>{children}</div>
        {!disabled ? (
          <Badge startIcon={CheckCircleIcon}>Accessible</Badge>
        ) : (
          <Badge startIcon={DisabledIcon} color="warning">
            Disabled
          </Badge>
        )}
      </div>
    </div>
  );
}
