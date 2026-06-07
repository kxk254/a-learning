"use client";
import type React from "React";
import styles from "./Input.module.css";
import clsx from "clsx";
import { CheckLineIcon } from "@/src/icons/index";

interface CheckboxProps {
  label?: string;
  checked: boolean;
  className?: string;
  id?: string;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const Checkbox = ({
  label,
  checked,
  className = "",
  id,
  onChange,
  disabled = false,
}) => {
  return (
    <label className={`${styles.checkboxLabel}${styles.checkboxLabelDisabled}`}>
      <div className={styles.checkboxDiv}>
        <input
          id={id}
          type="checkbox"
          className={`${styles.checkboxInput}${className}`}
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={disabled}
        />
        <CheckLineIcon
          className={clsx(
            checked && styles.checkboxIconChecked,
            disabled && styles.chgeckboxIconDisabled,
          )}
        />
      </div>
      {label && <span className={styles.checkboxSpan}>{label}</span>}
    </label>
  );
};
