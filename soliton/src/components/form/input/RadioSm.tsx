import React from "react";
import styles from "./Input.module.css";

interface RadioProps {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  label: string;
  onChange: (value: string) => void;
  className?: string;
}

export const RadioSm = ({
  id,
  name,
  value,
  checked,
  label,
  onChange,
  className = "",
}) => {
  return (
    <label htmlFor={id} className={`${styles.label} ${className}`}>
      <span className={styles.span}>
        <input
          type="radio"
          id={id}
          name={name}
          checked={checked}
          onChange={() => onChange(value)}
          className={styles.input}
        />
        <span
          className={`${styles.span2} ${checked ? styles.span2checked : styles.span2checkedno}`}
        >
          <span
            className={`${styles.span3} ${checked ? styles.span3checked : styles.span3checkedno}`}
          ></span>
        </span>
        {label}
      </span>
    </label>
  );
};
